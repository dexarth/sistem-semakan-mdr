import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { PremiseCategory } from '@/types';

type Props = { categories: PremiseCategory[] };

export default function PremiseCreate({ categories }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        premise_category_id: '',
        owner_name: '',
        premise_name: '',
        grant_number: '',
        ic_number: '',
        mailing_address: '',
        phone_number: '',
        zone: '',
        area: '',
        status: 'active',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/premises');
    }

    return (
        <>
            <Head title="Tambah Premis" />
            <div className="p-6 max-w-2xl space-y-6">
                <h1 className="text-xl font-semibold">Tambah Premis</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1">
                            <Label>Kategori Premis *</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.premise_category_id}
                                onChange={e => setData('premise_category_id', e.target.value)}
                                required
                            >
                                <option value="">— Pilih kategori —</option>
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
                            <InputError message={errors.premise_name} />
                        </div>

                        <div className="space-y-1">
                            <Label>No. IC</Label>
                            <Input value={data.ic_number} onChange={e => setData('ic_number', e.target.value)} />
                            <InputError message={errors.ic_number} />
                        </div>

                        <div className="space-y-1">
                            <Label>No. Geran</Label>
                            <Input value={data.grant_number} onChange={e => setData('grant_number', e.target.value)} />
                            <InputError message={errors.grant_number} />
                        </div>

                        <div className="space-y-1">
                            <Label>No. Telefon</Label>
                            <Input value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                            <InputError message={errors.phone_number} />
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
                            <InputError message={errors.mailing_address} />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />} Simpan
                        </Button>
                        <Button type="button" variant="outline" onClick={() => history.back()}>Batal</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

PremiseCreate.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Premis', href: '/admin/premises' },
        { title: 'Tambah', href: '/admin/premises/create' },
    ],
};
