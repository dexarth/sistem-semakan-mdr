import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function CategoryCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        code: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/categories');
    }

    return (
        <>
            <Head title="Tambah Kategori" />
            <div className="p-6 max-w-lg space-y-6">
                <h1 className="text-xl font-semibold">Tambah Kategori Premis</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Nama Kategori</Label>
                        <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        <InputError message={errors.name} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="code">Kod (pilihan)</Label>
                        <Input id="code" value={data.code} onChange={e => setData('code', e.target.value)} placeholder="cth: RES, KOM, HOM" />
                        <InputError message={errors.code} />
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

CategoryCreate.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Kategori Premis', href: '/admin/categories' },
        { title: 'Tambah', href: '/admin/categories/create' },
    ],
};
