import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { PremiseCategory } from '@/types';

type Props = { category: PremiseCategory };

export default function CategoryEdit({ category }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        name: category.name,
        code: category.code ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/categories/${category.id}`);
    }

    return (
        <>
            <Head title="Edit Kategori" />
            <div className="p-6 max-w-lg space-y-6">
                <h1 className="text-xl font-semibold">Edit Kategori Premis</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Nama Kategori</Label>
                        <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        <InputError message={errors.name} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="code">Kod (pilihan)</Label>
                        <Input id="code" value={data.code} onChange={e => setData('code', e.target.value)} />
                        <InputError message={errors.code} />
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

CategoryEdit.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Kategori Premis', href: '/admin/categories' },
        { title: 'Edit', href: '#' },
    ],
};
