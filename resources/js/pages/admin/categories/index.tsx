import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
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
import type { PaginatedData, PremiseCategory } from '@/types';

type Props = {
    categories: PaginatedData<PremiseCategory>;
};

export default function CategoriesIndex({ categories }: Props) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<PremiseCategory | null>(null);

    const createForm = useForm({ name: '', code: '' });
    const editForm = useForm({ name: '', code: '' });

    function submitCreate(e: React.FormEvent) {
        e.preventDefault();
        createForm.post('/admin/categories', {
            onSuccess: () => {
                setCreateOpen(false);
                createForm.reset();
            },
        });
    }

    function openEdit(cat: PremiseCategory) {
        editForm.setData({ name: cat.name, code: cat.code ?? '' });
        setEditTarget(cat);
    }

    function submitEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editTarget) return;
        editForm.put(`/admin/categories/${editTarget.id}`, {
            onSuccess: () => setEditTarget(null),
        });
    }

    function destroy(id: number) {
        if (confirm('Padam kategori ini?')) {
            router.delete(`/admin/categories/${id}`);
        }
    }

    return (
        <>
            <Head title="Kategori Premis" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Kategori Premis</h1>
                    <Button size="sm" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-1 size-4" /> Tambah Kategori
                    </Button>
                </div>

                <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">#</th>
                                <th className="px-4 py-3 text-left font-medium">Nama</th>
                                <th className="px-4 py-3 text-left font-medium">Kod</th>
                                <th className="px-4 py-3 text-left font-medium">Bil. Premis</th>
                                <th className="px-4 py-3 text-right font-medium">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {categories.data.map((cat) => (
                                <tr key={cat.id} className="hover:bg-muted/40">
                                    <td className="px-4 py-3 text-muted-foreground">{cat.id}</td>
                                    <td className="px-4 py-3 font-medium">{cat.name}</td>
                                    <td className="px-4 py-3">
                                        {cat.code ? <Badge variant="outline">{cat.code}</Badge> : <span className="text-muted-foreground">—</span>}
                                    </td>
                                    <td className="px-4 py-3">{cat.premises_count ?? 0}</td>
                                    <td className="px-4 py-3 text-right space-x-1">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                                            <Pencil className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => destroy(cat.id)}>
                                            <Trash2 className="size-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {categories.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                        Tiada kategori dijumpai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="text-sm text-muted-foreground">Jumlah: {categories.total} kategori</p>
            </div>

            {/* Create Dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Tambah Kategori Premis</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitCreate} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Nama Kategori *</Label>
                            <Input
                                value={createForm.data.name}
                                onChange={e => createForm.setData('name', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={createForm.errors.name} />
                        </div>
                        <div className="space-y-1">
                            <Label>Kod (pilihan)</Label>
                            <Input
                                value={createForm.data.code}
                                onChange={e => createForm.setData('code', e.target.value)}
                                placeholder="cth: RES, KOM, HOM"
                            />
                            <InputError message={createForm.errors.code} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing && <Spinner />} Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editTarget !== null} onOpenChange={open => !open && setEditTarget(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Kategori Premis</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Nama Kategori *</Label>
                            <Input
                                value={editForm.data.name}
                                onChange={e => editForm.setData('name', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={editForm.errors.name} />
                        </div>
                        <div className="space-y-1">
                            <Label>Kod (pilihan)</Label>
                            <Input
                                value={editForm.data.code}
                                onChange={e => editForm.setData('code', e.target.value)}
                            />
                            <InputError message={editForm.errors.code} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditTarget(null)}>Batal</Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing && <Spinner />} Kemaskini
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

CategoriesIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Kategori Premis', href: '/admin/categories' },
    ],
};