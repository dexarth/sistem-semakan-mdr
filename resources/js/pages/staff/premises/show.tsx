import { Head } from '@inertiajs/react';
import { Building2, Calendar, CheckCircle2, FileText, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BuildingRecord, Premise, TaxRecord, WasteCollectionSchedule } from '@/types';

type Props = {
    premise: Premise & {
        tax_records: TaxRecord[];
        building_records: BuildingRecord[];
        current_year_tax: TaxRecord | null;
        latest_building_record: BuildingRecord | null;
    };
    wasteSchedule: WasteCollectionSchedule | null;
    currentYear: number;
};

function TaxStatusBadge({ status }: { status: string }) {
    const variants: Record<string, 'default' | 'destructive' | 'secondary' | 'outline'> = {
        'Sudah Bayar Tahun Semasa': 'default',
        'Ada Tunggakan': 'destructive',
        'Belum Bayar Tahun Semasa': 'secondary',
        'Tiada Rekod': 'outline',
    };
    return <Badge variant={variants[status] ?? 'outline'}>{status}</Badge>;
}

function BuildingStatusBadge({ status }: { status: string }) {
    const variants: Record<string, 'default' | 'destructive' | 'secondary' | 'outline'> = {
        'Sudah Lulus': 'default',
        'Ditolak': 'destructive',
        'Dalam Semakan': 'secondary',
        'Sudah Hantar Pelan': 'secondary',
        'Belum Hantar Pelan': 'outline',
        'Tiada Rekod': 'outline',
    };
    return <Badge variant={variants[status] ?? 'outline'}>{status}</Badge>;
}

export default function StaffPremiseProfile({ premise, wasteSchedule, currentYear }: Props) {
    const taxStatus = premise.current_year_tax?.payment_status ?? 'Tiada Rekod';
    const buildingStatus = premise.latest_building_record?.submission_status ?? 'Tiada Rekod';
    const approvalStatus = premise.latest_building_record?.approval_status ?? null;

    return (
        <>
            <Head title={`Profil: ${premise.owner_name}`} />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold">{premise.owner_name}</h1>
                        <Badge>{premise.category?.name}</Badge>
                    </div>
                    {premise.premise_name && <p className="text-muted-foreground mt-1 text-lg">{premise.premise_name}</p>}
                </div>

                {/* Status Summary Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="py-4">
                        <CardContent className="px-4 flex flex-col gap-1">
                            <p className="text-xs text-muted-foreground">Cukai Pintu {currentYear}</p>
                            <TaxStatusBadge status={taxStatus} />
                        </CardContent>
                    </Card>
                    <Card className="py-4">
                        <CardContent className="px-4 flex flex-col gap-1">
                            <p className="text-xs text-muted-foreground">Status Penghantaran Pelan</p>
                            <BuildingStatusBadge status={buildingStatus} />
                        </CardContent>
                    </Card>
                    <Card className="py-4">
                        <CardContent className="px-4 flex flex-col gap-1">
                            <p className="text-xs text-muted-foreground">Status Kelulusan Bangunan</p>
                            {approvalStatus
                                ? <BuildingStatusBadge status={approvalStatus} />
                                : <Badge variant="outline">Tiada Rekod</Badge>
                            }
                        </CardContent>
                    </Card>
                    <Card className="py-4">
                        <CardContent className="px-4 flex flex-col gap-1">
                            <p className="text-xs text-muted-foreground">Jadual Kutipan Sampah</p>
                            {wasteSchedule
                                ? <Badge variant="default">{wasteSchedule.collection_day}</Badge>
                                : <Badge variant="outline">Tiada Rekod</Badge>
                            }
                        </CardContent>
                    </Card>
                </div>

                {/* Premise Info */}
                <Card>
                    <CardHeader><CardTitle>Maklumat Premis</CardTitle></CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                            <div><dt className="text-muted-foreground">No. IC</dt><dd className="font-medium">{premise.ic_number ?? '—'}</dd></div>
                            <div><dt className="text-muted-foreground">No. Geran</dt><dd className="font-medium">{premise.grant_number ?? '—'}</dd></div>
                            <div><dt className="text-muted-foreground">No. Telefon</dt><dd className="font-medium">{premise.phone_number ?? '—'}</dd></div>
                            <div><dt className="text-muted-foreground">Zon / Kawasan</dt><dd className="font-medium">{[premise.zone, premise.area].filter(Boolean).join(' / ') || '—'}</dd></div>
                            <div className="col-span-2"><dt className="text-muted-foreground">Alamat</dt><dd className="font-medium">{premise.mailing_address ?? '—'}</dd></div>
                        </dl>
                    </CardContent>
                </Card>

                {/* Tax History */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileText className="size-4" /> Sejarah Cukai Pintu</CardTitle>
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {premise.tax_records.map(t => (
                                        <tr key={t.id} className="hover:bg-muted/40">
                                            <td className="px-3 py-2 font-medium">{t.tax_year}</td>
                                            <td className="px-3 py-2"><TaxStatusBadge status={t.payment_status} /></td>
                                            <td className="px-3 py-2">{t.amount_due ? `RM ${t.amount_due}` : '—'}</td>
                                            <td className="px-3 py-2">{t.amount_paid ? `RM ${t.amount_paid}` : '—'}</td>
                                            <td className="px-3 py-2">{t.payment_date ?? '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>

                {/* Building Records */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Building2 className="size-4" /> Rekod Bangunan</CardTitle>
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {premise.building_records.map(b => (
                                        <tr key={b.id} className="hover:bg-muted/40">
                                            <td className="px-3 py-2"><BuildingStatusBadge status={b.submission_status} /></td>
                                            <td className="px-3 py-2">{b.approval_status ? <BuildingStatusBadge status={b.approval_status} /> : '—'}</td>
                                            <td className="px-3 py-2">{b.submission_date ?? '—'}</td>
                                            <td className="px-3 py-2">{b.approval_date ?? '—'}</td>
                                            <td className="px-3 py-2 text-muted-foreground">{b.remarks ?? '—'}</td>
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
                                <div><dt className="text-muted-foreground">Hari Kutipan</dt><dd className="font-semibold text-base">{wasteSchedule.collection_day}</dd></div>
                                <div><dt className="text-muted-foreground">Masa Kutipan</dt><dd className="font-medium">{wasteSchedule.collection_time ?? '—'}</dd></div>
                                {wasteSchedule.notes && <div className="col-span-2"><dt className="text-muted-foreground">Nota</dt><dd>{wasteSchedule.notes}</dd></div>}
                            </dl>
                        ) : (
                            <p className="text-sm text-muted-foreground">Tiada jadual kutipan dijumpai untuk kawasan/zon ini.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

StaffPremiseProfile.layout = {
    breadcrumbs: [
        { title: 'Cari Premis', href: '/staff/premises/search' },
        { title: 'Profil Premis', href: '#' },
    ],
};
