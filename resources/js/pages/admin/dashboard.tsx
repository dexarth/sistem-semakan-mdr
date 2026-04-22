import { Head, router, usePage } from '@inertiajs/react';
import { Building2, ClipboardList, FileText, Home, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { Auth } from '@/types';

type TaxStats = {
    total: number;
    paid: number;
    arrears: number;
    unpaid: number;
};

type BuildingStats = {
    total: number;
    in_review: number;
    approved: number;
};

type Stats = {
    totalPremises: number;
    totalSchedules: number;
    currentYear: number;
    tax: TaxStats;
    building: BuildingStats;
};

type ArrearRecord = {
    id: number;
    premise_id: number;
    tax_year: number;
    payment_status: string;
    amount_due: string | null;
    amount_paid: string | null;
    premise: { id: number; owner_name: string; zone: string | null; area: string | null } | null;
};

type PendingBuilding = {
    id: number;
    premise_id: number;
    submission_status: string;
    approval_status: string | null;
    submission_date: string | null;
    premise: { id: number; owner_name: string } | null;
};

type RecentLog = {
    id: number;
    checked_at: string;
    remarks: string | null;
    user: { id: number; name: string } | null;
    premise: { id: number; owner_name: string } | null;
};

type Props = {
    stats: Stats;
    arrearsRecords: ArrearRecord[];
    pendingBuilding: PendingBuilding[];
    recentLogs: RecentLog[];
};

function StatCard({
    title,
    value,
    sub,
    icon: Icon,
    onClick,
}: {
    title: string;
    value: number | string;
    sub?: string;
    icon: React.ElementType;
    onClick?: () => void;
}) {
    return (
        <Card className={onClick ? 'cursor-pointer transition-shadow hover:shadow-md' : ''} onClick={onClick}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{value}</p>
                {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard({ stats, arrearsRecords, pendingBuilding, recentLogs }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const taxPaidPct = stats.tax.total > 0
        ? Math.round((stats.tax.paid / stats.tax.total) * 100)
        : 0;

    return (
        <>
            <Head title="Papan Pemuka Admin" />
            <div className="space-y-6 p-6">
                {/* Greeting */}
                <div>
                    <h1 className="text-2xl font-semibold">Papan Pemuka Admin</h1>
                    <p className="text-sm text-muted-foreground">Selamat kembali, {auth.user.name}</p>
                </div>

                {/* ── Summary Cards ── */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Jumlah Premis Aktif"
                        value={stats.totalPremises}
                        icon={Home}
                        onClick={() => router.get('/admin/premises')}
                    />
                    <StatCard
                        title={`Cukai Sudah Bayar (${stats.currentYear})`}
                        value={stats.tax.paid}
                        sub={`${taxPaidPct}% daripada ${stats.tax.total} rekod tahun ini`}
                        icon={FileText}
                        onClick={() => router.get('/admin/tax-records', { year: stats.currentYear, status: 'Sudah Bayar Tahun Semasa' })}
                    />
                    <StatCard
                        title="Rekod Bangunan Dalam Semakan"
                        value={stats.building.in_review}
                        sub={`${stats.building.total} rekod bangunan keseluruhan`}
                        icon={Building2}
                    />
                    <StatCard
                        title="Jadual Kutipan Aktif"
                        value={stats.totalSchedules}
                        icon={Truck}
                        onClick={() => router.get('/admin/waste-schedules')}
                    />
                </div>

                {/* ── Tax breakdown bar ── */}
                {stats.tax.total > 0 && (
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Status Cukai Pintu {stats.currentYear}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="bg-green-500 transition-all"
                                    style={{ width: `${(stats.tax.paid / stats.tax.total) * 100}%` }}
                                />
                                <div
                                    className="bg-destructive transition-all"
                                    style={{ width: `${(stats.tax.arrears / stats.tax.total) * 100}%` }}
                                />
                                <div
                                    className="bg-yellow-400 transition-all"
                                    style={{ width: `${(stats.tax.unpaid / stats.tax.total) * 100}%` }}
                                />
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <span className="inline-block size-2.5 rounded-sm bg-green-500" />
                                    Sudah Bayar — {stats.tax.paid}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="inline-block size-2.5 rounded-sm bg-destructive" />
                                    Ada Tunggakan — {stats.tax.arrears}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="inline-block size-2.5 rounded-sm bg-yellow-400" />
                                    Belum Bayar — {stats.tax.unpaid}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ── Two urgent tables ── */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Arrears */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Ada Tunggakan — {stats.currentYear}</CardTitle>
                            <Button variant="ghost" size="sm" className="text-xs"
                                onClick={() => router.get('/admin/tax-records', { year: stats.currentYear, status: 'Ada Tunggakan' })}>
                                Lihat semua
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {arrearsRecords.length === 0 ? (
                                <p className="px-6 py-4 text-sm text-muted-foreground">Tiada tunggakan tahun ini.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-t bg-muted text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium">Pemilik</th>
                                            <th className="px-4 py-2 text-left font-medium">Kawasan</th>
                                            <th className="px-4 py-2 text-right font-medium">Tertunggak</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {arrearsRecords.map(r => (
                                            <tr key={r.id} className="cursor-pointer hover:bg-muted/40"
                                                onClick={() => r.premise && router.get('/admin/premises', { show: r.premise.id })}>
                                                <td className="px-4 py-2 font-medium">{r.premise?.owner_name ?? '—'}</td>
                                                <td className="px-4 py-2 text-muted-foreground">{r.premise?.area ?? '—'}</td>
                                                <td className="px-4 py-2 text-right text-destructive font-medium">
                                                    {r.amount_due ? `RM ${r.amount_due}` : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pending building */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Rekod Bangunan Dalam Semakan</CardTitle>
                            <Badge variant="secondary">{stats.building.in_review}</Badge>
                        </CardHeader>
                        <CardContent className="p-0">
                            {pendingBuilding.length === 0 ? (
                                <p className="px-6 py-4 text-sm text-muted-foreground">Tiada rekod dalam semakan.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-t bg-muted text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium">Pemilik</th>
                                            <th className="px-4 py-2 text-left font-medium">Status Hantar</th>
                                            <th className="px-4 py-2 text-left font-medium">Tarikh Hantar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {pendingBuilding.map(b => (
                                            <tr key={b.id} className="cursor-pointer hover:bg-muted/40"
                                                onClick={() => b.premise && router.get('/admin/premises', { show: b.premise.id })}>
                                                <td className="px-4 py-2 font-medium">{b.premise?.owner_name ?? '—'}</td>
                                                <td className="px-4 py-2">
                                                    <Badge variant="secondary">{b.submission_status}</Badge>
                                                </td>
                                                <td className="px-4 py-2 text-muted-foreground">{formatDate(b.submission_date)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* ── Recent checking logs ── */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <ClipboardList className="size-4" /> Aktiviti Semakan Terkini
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-xs"
                            onClick={() => router.get('/admin/checking-logs')}>
                            Lihat semua
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {recentLogs.length === 0 ? (
                            <p className="px-6 py-4 text-sm text-muted-foreground">Tiada log semakan.</p>
                        ) : (
                            <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-t bg-muted text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium">Staf</th>
                                        <th className="px-4 py-2 text-left font-medium">Premis</th>
                                        <th className="px-4 py-2 text-left font-medium">Tarikh Semak</th>
                                        <th className="px-4 py-2 text-left font-medium">Catatan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {recentLogs.map(log => (
                                        <tr key={log.id} className="cursor-pointer hover:bg-muted/40"
                                            onClick={() => log.premise && router.get('/admin/premises', { show: log.premise.id })}>
                                            <td className="px-4 py-2 font-medium">{log.user?.name ?? '—'}</td>
                                            <td className="px-4 py-2">{log.premise?.owner_name ?? '—'}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{formatDate(log.checked_at)}</td>
                                            <td className="px-4 py-2 text-muted-foreground">{log.remarks ?? '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        { title: 'Papan Pemuka Admin', href: '/admin/dashboard' },
    ],
};
