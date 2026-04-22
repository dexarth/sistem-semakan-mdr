import { Head, Link, router } from '@inertiajs/react';
import { Building2, Calendar, FileText, Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BuildingRecord, Premise, TaxRecord, WasteCollectionSchedule } from '@/types';

type Props = {
    premise: Premise & {
        tax_records: TaxRecord[];
        building_records: BuildingRecord[];
    };
    wasteSchedule: WasteCollectionSchedule | null;
};

function taxBadgeVariant(status: string) {
    if (status === 'Sudah Bayar Tahun Semasa') return 'default';
    if (status === 'Ada Tunggakan') return 'destructive';
    return 'secondary';
}

function buildingBadgeVariant(status: string) {
    if (status === 'Sudah Lulus') return 'default';
    if (status === 'Ditolak') return 'destructive';
    return 'secondary';
}

export default function PremiseShow({ premise, wasteSchedule }: Props) {
    function destroyTax(id: number) {
        if (confirm('Padam rekod cukai ini?')) {
            router.delete(`/admin/premises/${premise.id}/tax-records/${id}`);
        }
    }

    function destroyBuilding(id: number) {
        if (confirm('Padam rekod bangunan ini?')) {
            router.delete(`/admin/premises/${premise.id}/building-records/${id}`);
        }
    }

    return (
        <>
            <Head title={`Profil: ${premise.owner_name}`} />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">{premise.owner_name}</h1>
                        {premise.premise_name && <p className="text-muted-foreground">{premise.premise_name}</p>}
                        <Badge className="mt-1">{premise.category?.name}</Badge>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/premises/${premise.id}/edit`}>
                            <Pencil className="mr-1 size-4" /> Edit Premis
                        </Link>
                    </Button>
                </div>

                {/* Info Grid */}
                <Card>
                    <CardHeader><CardTitle>Maklumat Premis</CardTitle></CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                            <div><dt className="text-muted-foreground">No. IC</dt><dd className="font-medium">{premise.ic_number ?? '—'}</dd></div>
                            <div><dt className="text-muted-foreground">No. Geran</dt><dd className="font-medium">{premise.grant_number ?? '—'}</dd></div>
                            <div><dt className="text-muted-foreground">No. Telefon</dt><dd className="font-medium">{premise.phone_number ?? '—'}</dd></div>
                            <div><dt className="text-muted-foreground">Status</dt><dd><Badge variant={premise.status === 'active' ? 'default' : 'secondary'}>{premise.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</Badge></dd></div>
                            <div><dt className="text-muted-foreground">Zon</dt><dd className="font-medium">{premise.zone ?? '—'}</dd></div>
                            <div><dt className="text-muted-foreground">Kawasan</dt><dd className="font-medium">{premise.area ?? '—'}</dd></div>
                            <div className="col-span-2"><dt className="text-muted-foreground">Alamat</dt><dd className="font-medium">{premise.mailing_address ?? '—'}</dd></div>
                        </dl>
                    </CardContent>
                </Card>

                {/* Tax Records */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2"><FileText className="size-4" /> Rekod Cukai Pintu</CardTitle>
                        <Button asChild size="sm">
                            <Link href={`/admin/premises/${premise.id}/tax-records/create`}>
                                <Plus className="mr-1 size-4" /> Tambah
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {premise.tax_records.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Tiada rekod cukai.</p>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-muted text-muted-foreground">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Tahun</th>
                                        <th className="px-3 py-2 text-left">Status</th>
                                        <th className="px-3 py-2 text-left">Amaun Tertunggak</th>
                                        <th className="px-3 py-2 text-left">Amaun Dibayar</th>
                                        <th className="px-3 py-2 text-left">Tarikh Bayar</th>
                                        <th className="px-3 py-2 text-right">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {premise.tax_records.map(t => (
                                        <tr key={t.id} className="hover:bg-muted/40">
                                            <td className="px-3 py-2 font-medium">{t.tax_year}</td>
                                            <td className="px-3 py-2"><Badge variant={taxBadgeVariant(t.payment_status)}>{t.payment_status}</Badge></td>
                                            <td className="px-3 py-2">{t.amount_due ? `RM ${t.amount_due}` : '—'}</td>
                                            <td className="px-3 py-2">{t.amount_paid ? `RM ${t.amount_paid}` : '—'}</td>
                                            <td className="px-3 py-2">{t.payment_date ?? '—'}</td>
                                            <td className="px-3 py-2 text-right space-x-1">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/admin/premises/${premise.id}/tax-records/${t.id}/edit`}><Pencil className="size-3" /></Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => destroyTax(t.id)}>
                                                    <Trash2 className="size-3 text-destructive" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>

                {/* Building Records */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2"><Building2 className="size-4" /> Rekod Bangunan</CardTitle>
                        <Button asChild size="sm">
                            <Link href={`/admin/premises/${premise.id}/building-records/create`}>
                                <Plus className="mr-1 size-4" /> Tambah
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {premise.building_records.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Tiada rekod bangunan.</p>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-muted text-muted-foreground">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Status Hantar</th>
                                        <th className="px-3 py-2 text-left">Status Lulus</th>
                                        <th className="px-3 py-2 text-left">Tarikh Hantar</th>
                                        <th className="px-3 py-2 text-left">Tarikh Lulus</th>
                                        <th className="px-3 py-2 text-left">Catatan</th>
                                        <th className="px-3 py-2 text-right">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {premise.building_records.map(b => (
                                        <tr key={b.id} className="hover:bg-muted/40">
                                            <td className="px-3 py-2"><Badge variant={buildingBadgeVariant(b.submission_status)}>{b.submission_status}</Badge></td>
                                            <td className="px-3 py-2">{b.approval_status ? <Badge variant={buildingBadgeVariant(b.approval_status)}>{b.approval_status}</Badge> : '—'}</td>
                                            <td className="px-3 py-2">{b.submission_date ?? '—'}</td>
                                            <td className="px-3 py-2">{b.approval_date ?? '—'}</td>
                                            <td className="px-3 py-2 max-w-[200px] truncate">{b.remarks ?? '—'}</td>
                                            <td className="px-3 py-2 text-right space-x-1">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/admin/premises/${premise.id}/building-records/${b.id}/edit`}><Pencil className="size-3" /></Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => destroyBuilding(b.id)}>
                                                    <Trash2 className="size-3 text-destructive" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>

                {/* Waste Schedule */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="size-4" /> Jadual Kutipan Sampah</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {wasteSchedule ? (
                            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                <div><dt className="text-muted-foreground">Kawasan</dt><dd className="font-medium">{wasteSchedule.area ?? '—'}</dd></div>
                                <div><dt className="text-muted-foreground">Zon</dt><dd className="font-medium">{wasteSchedule.zone ?? '—'}</dd></div>
                                <div><dt className="text-muted-foreground">Nama Jalan</dt><dd className="font-medium">{wasteSchedule.road_name ?? '—'}</dd></div>
                                <div><dt className="text-muted-foreground">Hari Kutipan</dt><dd className="font-medium">{wasteSchedule.collection_day}</dd></div>
                                <div><dt className="text-muted-foreground">Masa Kutipan</dt><dd className="font-medium">{wasteSchedule.collection_time ?? '—'}</dd></div>
                                <div><dt className="text-muted-foreground">Nota</dt><dd className="font-medium">{wasteSchedule.notes ?? '—'}</dd></div>
                            </dl>
                        ) : (
                            <p className="text-sm text-muted-foreground">Tiada jadual kutipan untuk kawasan/zon ini.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PremiseShow.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Premis', href: '/admin/premises' },
        { title: 'Profil', href: '#' },
    ],
};
