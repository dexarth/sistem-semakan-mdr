import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { Premise, PremiseCategory } from '@/types';

type Props = { premise: Premise; categories: PremiseCategory[] };

export default function PremiseEdit({ premise, categories }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        premise_category_id: String(premise.premise_category_id),
        owner_name: premise.owner_name,
        premise_name: premise.premise_name ?? '',
        grant_number: premise.grant_number ?? '',
        ic_number: premise.ic_number ?? '',
        mailing_address: premise.mailing_address ?? '',
        phone_number: premise.phone_number ?? '',
        zone: premise.zone ?? '',
        area: premise.area ?? '',
        status: premise.status,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/premises/${premise.id}`);
    }

    return (
        <>
            <Head title="Edit Premis" />
            <div className="p-6 max-w-2xl space-y-6">
                <h1 className="text-xl font-semibold">Edit Premis</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1">
                            <Label>Kategori Premis *</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.premise_category_id}
                                onChange={e => setData('premise_category_id', e.target.value)}
                            >
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <InputError message={errors.premise_category_id} />
                        </div>

                        <div className="space-y-1">
                            <Label>Nama Pemilik *</Label>
                            <Input value={data.owner_name} onChange={e => setData('owner_name', e.target.value)} required />
                            <InputError message={errors.owner_name} />
                        </div>

                        <div className="space-y-1">
                            <Label>Nama Premis</Label>
                            <Input value={data.premise_name} onChange={e => setData('premise_name', e.target.value)} />
                        </div>

                        <div className="space-y-1">
                            <Label>No. IC</Label>
                            <Input value={data.ic_number} onChange={e => setData('ic_number', e.target.value)} />
                        </div>

                        <div className="space-y-1">
                            <Label>No. Geran</Label>
                            <Input value={data.grant_number} onChange={e => setData('grant_number', e.target.value)} />
                        </div>

                        <div className="space-y-1">
                            <Label>No. Telefon</Label>
                            <Input value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                        </div>

                        <div className="space-y-1">
                            <Label>Status</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Tidak Aktif</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <Label>Zon</Label>
                            <Input value={data.zone} onChange={e => setData('zone', e.target.value)} />
                        </div>

                        <div className="space-y-1">
                            <Label>Kawasan</Label>
                            <Input value={data.area} onChange={e => setData('area', e.target.value)} />
                        </div>

                        <div className="col-span-2 space-y-1">
                            <Label>Alamat Surat-menyurat</Label>
                            <textarea
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]"
                                value={data.mailing_address}
                                onChange={e => setData('mailing_address', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />} Kemaskini
                        </Button>
                        <Button type="button" variant="outline" onClick={() => history.back()}>Batal</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

PremiseEdit.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Premis', href: '/admin/premises' },
        { title: 'Edit', href: '#' },
    ],
};
