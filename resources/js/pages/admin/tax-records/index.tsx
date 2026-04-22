import { Head, router, useForm } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { formatDate, toDateInput } from '@/lib/utils';
import type { PaginatedData, Premise, TaxRecord } from '@/types';

type TaxRecordWithPremise = TaxRecord & { premise: Premise | null };

type Props = {
    records: PaginatedData<TaxRecordWithPremise>;
    filters: { year?: string; status?: string };
    statuses: string[];
    currentYear: number;
};

const selectCls = 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm';

function statusVariant(status: string) {
    if (status === 'Sudah Bayar Tahun Semasa') return 'default' as const;
    if (status === 'Ada Tunggakan') return 'destructive' as const;
    return 'secondary' as const;
}

export default function TaxRecordsIndex({ records, filters, statuses, currentYear }: Props) {
    const { data: filterData, setData: setFilterData, get } = useForm({
        year: filters.year ?? '',
        status: filters.status ?? '',
    });
    function doFilter(e: React.SyntheticEvent) {
        e.preventDefault();
        get('/admin/tax-records', { preserveState: true, replace: true });
    }

    /* ── edit ── */
    const [editTarget, setEditTarget] = useState<TaxRecordWithPremise | null>(null);
    const editForm = useForm({
        tax_year: '', payment_status: statuses?.[0] ?? '',
        amount_due: '', amount_paid: '', payment_date: '', remarks: '',
    });
    function openEdit(r: TaxRecordWithPremise) {
        editForm.setData({
            tax_year: String(r.tax_year),
            payment_status: r.payment_status,
            amount_due: r.amount_due ?? '',
            amount_paid: r.amount_paid ?? '',
            payment_date: toDateInput(r.payment_date),
            remarks: r.remarks ?? '',
        });
        setEditTarget(r);
    }
    function submitEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        editForm.put(`/admin/premises/${editTarget?.premise?.id}/tax-records/${editTarget?.id}`, {
            onSuccess: () => setEditTarget(null),
        });
    }

    function destroy(premiseId: number | undefined, taxId: number) {
        if (!premiseId) return;
        if (confirm('Padam rekod cukai ini?')) router.delete(`/admin/premises/${premiseId}/tax-records/${taxId}`);
    }

    return (
        <>
            <Head title="Rekod Cukai Pintu" />
            <div className="p-6 space-y-4">
                <h1 className="text-xl font-semibold">Rekod Cukai Pintu</h1>

                <form onSubmit={doFilter} className="flex flex-wrap gap-2">
                    <Input
                        type="number"
                        placeholder={`Tahun (cth. ${currentYear})`}
                        className="w-40"
                        value={filterData.year}
                        onChange={e => setFilterData('year', e.target.value)}
                    />
                    <select className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm w-56" value={filterData.status} onChange={e => setFilterData('status', e.target.value)}>
                        <option value="">Semua Status</option>
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <Button type="submit" variant="outline" size="sm">Tapis</Button>
                    {(filters.year || filters.status) && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => router.get('/admin/tax-records')}>
                            Padam Penapis
                        </Button>
                    )}
                </form>

                <div className="rounded-lg border overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Pemilik Premis</th>
                                <th className="px-4 py-3 text-left font-medium">Tahun</th>
                                <th className="px-4 py-3 text-left font-medium">Status Pembayaran</th>
                                <th className="px-4 py-3 text-left font-medium">Tertunggak</th>
                                <th className="px-4 py-3 text-left font-medium">Dibayar</th>
                                <th className="px-4 py-3 text-left font-medium">Tarikh Bayar</th>
                                <th className="px-4 py-3 text-right font-medium">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {records.data.map(r => (
                                <tr key={r.id} className="hover:bg-muted/40">
                                    <td className="px-4 py-3 font-medium">{r.premise?.owner_name ?? '—'}</td>
                                    <td className="px-4 py-3">{r.tax_year}</td>
                                    <td className="px-4 py-3"><Badge variant={statusVariant(r.payment_status)}>{r.payment_status}</Badge></td>
                                    <td className="px-4 py-3">{r.amount_due ? `RM ${r.amount_due}` : '—'}</td>
                                    <td className="px-4 py-3">{r.amount_paid ? `RM ${r.amount_paid}` : '—'}</td>
                                    <td className="px-4 py-3">{formatDate(r.payment_date)}</td>
                                    <td className="px-4 py-3 text-right space-x-1">
                                        <Button variant="ghost" size="icon" title="Lihat Premis" disabled={!r.premise?.id}
                                            onClick={() => r.premise?.id && router.get('/admin/premises', { show: r.premise.id })}>
                                            <Eye className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="Edit" onClick={() => openEdit(r)}>
                                            <Pencil className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="Padam" onClick={() => destroy(r.premise?.id, r.id)}>
                                            <Trash2 className="size-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {records.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Tiada rekod cukai dijumpai.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Jumlah: {records.total} rekod</span>
                    <div className="flex gap-1">
                        {records.links.map((link, i) => (
                            <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ Edit Dialog ═══ */}
            <Dialog open={editTarget !== null} onOpenChange={open => !open && setEditTarget(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            Edit Rekod Cukai Pintu
                            {editTarget && <span className="block text-sm font-normal text-muted-foreground mt-0.5">{editTarget.premise?.owner_name} — Tahun {editTarget.tax_year}</span>}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Tahun Cukai *</Label>
                                <Input type="number" value={editForm.data.tax_year} onChange={e => editForm.setData('tax_year', e.target.value)} required />
                                <InputError message={editForm.errors.tax_year} />
                            </div>
                            <div className="space-y-1">
                                <Label>Status Pembayaran *</Label>
                                <select className={selectCls} value={editForm.data.payment_status} onChange={e => editForm.setData('payment_status', e.target.value)}>
                                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Amaun Tertunggak (RM)</Label>
                                <Input type="number" step="0.01" value={editForm.data.amount_due} onChange={e => editForm.setData('amount_due', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Amaun Dibayar (RM)</Label>
                                <Input type="number" step="0.01" value={editForm.data.amount_paid} onChange={e => editForm.setData('amount_paid', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Tarikh Bayar</Label>
                                <Input type="date" value={editForm.data.payment_date} onChange={e => editForm.setData('payment_date', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Catatan</Label>
                                <Input value={editForm.data.remarks} onChange={e => editForm.setData('remarks', e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditTarget(null)}>Batal</Button>
                            <Button type="submit" disabled={editForm.processing}>{editForm.processing && <Spinner />} Kemaskini</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

TaxRecordsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Rekod Cukai Pintu', href: '/admin/tax-records' },
    ],
};