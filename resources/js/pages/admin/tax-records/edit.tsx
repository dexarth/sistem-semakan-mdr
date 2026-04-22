import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { Premise, TaxRecord } from '@/types';

type Props = { premise: Premise; taxRecord: TaxRecord; statuses: string[] };

export default function TaxRecordEdit({ premise, taxRecord, statuses }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        tax_year: String(taxRecord.tax_year),
        payment_status: taxRecord.payment_status,
        amount_due: taxRecord.amount_due ?? '',
        amount_paid: taxRecord.amount_paid ?? '',
        payment_date: taxRecord.payment_date ?? '',
        remarks: taxRecord.remarks ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/premises/${premise.id}/tax-records/${taxRecord.id}`);
    }

    return (
        <>
            <Head title="Edit Rekod Cukai" />
            <div className="p-6 max-w-lg space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Rekod Cukai Pintu</h1>
                    <p className="text-sm text-muted-foreground">Premis: {premise.owner_name} — Tahun {taxRecord.tax_year}</p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Tahun Cukai *</Label>
                            <Input type="number" value={data.tax_year} onChange={e => setData('tax_year', e.target.value)} required />
                            <InputError message={errors.tax_year} />
                        </div>
                        <div className="space-y-1">
                            <Label>Status Pembayaran *</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.payment_status}
                                onChange={e => setData('payment_status', e.target.value)}
                            >
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <Label>Amaun Tertunggak (RM)</Label>
                            <Input type="number" step="0.01" value={data.amount_due} onChange={e => setData('amount_due', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Amaun Dibayar (RM)</Label>
                            <Input type="number" step="0.01" value={data.amount_paid} onChange={e => setData('amount_paid', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Tarikh Bayar</Label>
                            <Input type="date" value={data.payment_date} onChange={e => setData('payment_date', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Catatan</Label>
                            <Input value={data.remarks} onChange={e => setData('remarks', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>{processing && <Spinner />} Kemaskini</Button>
                        <Button type="button" variant="outline" onClick={() => history.back()}>Batal</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

TaxRecordEdit.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Premis', href: '/admin/premises' },
        { title: 'Edit Cukai', href: '#' },
    ],
};
