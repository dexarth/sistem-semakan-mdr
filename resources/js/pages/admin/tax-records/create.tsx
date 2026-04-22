import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { Premise } from '@/types';

type Props = { premise: Premise; statuses: string[]; currentYear: number };

export default function TaxRecordCreate({ premise, statuses, currentYear }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        tax_year: String(currentYear),
        payment_status: statuses[0],
        amount_due: '',
        amount_paid: '',
        payment_date: '',
        remarks: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(`/admin/premises/${premise.id}/tax-records`);
    }

    return (
        <>
            <Head title="Tambah Rekod Cukai" />
            <div className="p-6 max-w-lg space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Rekod Cukai Pintu</h1>
                    <p className="text-sm text-muted-foreground">Premis: {premise.owner_name}</p>
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
                            <InputError message={errors.payment_status} />
                        </div>
                        <div className="space-y-1">
                            <Label>Amaun Tertunggak (RM)</Label>
                            <Input type="number" step="0.01" value={data.amount_due} onChange={e => setData('amount_due', e.target.value)} />
                            <InputError message={errors.amount_due} />
                        </div>
                        <div className="space-y-1">
                            <Label>Amaun Dibayar (RM)</Label>
                            <Input type="number" step="0.01" value={data.amount_paid} onChange={e => setData('amount_paid', e.target.value)} />
                            <InputError message={errors.amount_paid} />
                        </div>
                        <div className="space-y-1">
                            <Label>Tarikh Bayar</Label>
                            <Input type="date" value={data.payment_date} onChange={e => setData('payment_date', e.target.value)} />
                            <InputError message={errors.payment_date} />
                        </div>
                        <div className="space-y-1">
                            <Label>Catatan</Label>
                            <Input value={data.remarks} onChange={e => setData('remarks', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>{processing && <Spinner />} Simpan</Button>
                        <Button type="button" variant="outline" onClick={() => history.back()}>Batal</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

TaxRecordCreate.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Premis', href: '/admin/premises' },
        { title: 'Profil', href: '#' },
        { title: 'Tambah Cukai', href: '#' },
    ],
};
