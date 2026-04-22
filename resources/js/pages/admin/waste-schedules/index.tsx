import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
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
import type { PaginatedData, PremiseCategory, WasteCollectionSchedule } from '@/types';

type Props = {
    schedules: PaginatedData<WasteCollectionSchedule>;
    filters: { search?: string };
    categories: PremiseCategory[];
    days: string[];
};

const selectCls = 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm';

export default function WasteSchedulesIndex({ schedules, filters, categories, days }: Props) {
    const { data: searchData, setData: setSearchData, get } = useForm({ search: filters.search ?? '' });
    function doSearch(e: React.SyntheticEvent) {
        e.preventDefault();
        get('/admin/waste-schedules', { preserveState: true, replace: true });
    }

    /* ── create ── */
    const [createOpen, setCreateOpen] = useState(false);
    const createForm = useForm({
        area: '', zone: '', road_name: '',
        premise_category_id: '',
        collection_day: days[0] ?? '',
        collection_time: '', notes: '', status: 'active',
    });
    function submitCreate(e: React.SyntheticEvent) {
        e.preventDefault();
        createForm.post('/admin/waste-schedules', {
            onSuccess: () => { setCreateOpen(false); createForm.reset(); },
        });
    }

    /* ── edit ── */
    const [editTarget, setEditTarget] = useState<WasteCollectionSchedule | null>(null);
    const editForm = useForm({
        area: '', zone: '', road_name: '',
        premise_category_id: '',
        collection_day: days[0] ?? '',
        collection_time: '', notes: '', status: 'active',
    });
    function openEdit(s: WasteCollectionSchedule) {
        editForm.setData({
            area: s.area ?? '',
            zone: s.zone ?? '',
            road_name: s.road_name ?? '',
            premise_category_id: s.premise_category_id ? String(s.premise_category_id) : '',
            collection_day: s.collection_day,
            collection_time: s.collection_time ?? '',
            notes: s.notes ?? '',
            status: s.status,
        });
        setEditTarget(s);
    }
    function submitEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!editTarget) return;
        editForm.put(`/admin/waste-schedules/${editTarget.id}`, {
            onSuccess: () => setEditTarget(null),
        });
    }

    function destroy(id: number) {
        if (confirm('Padam jadual ini?')) router.delete(`/admin/waste-schedules/${id}`);
    }

    return (
        <>
            <Head title="Jadual Kutipan Sampah" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Jadual Kutipan Sampah</h1>
                    <Button size="sm" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-1 size-4" /> Tambah
                    </Button>
                </div>

                <form onSubmit={doSearch} className="flex gap-2 max-w-sm">
                    <Input placeholder="Cari kawasan, zon, jalan..." value={searchData.search} onChange={e => setSearchData('search', e.target.value)} />
                    <Button type="submit" size="icon" variant="outline"><Search className="size-4" /></Button>
                </form>

                <div className="rounded-lg border overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Kawasan</th>
                                <th className="px-4 py-3 text-left font-medium">Zon</th>
                                <th className="px-4 py-3 text-left font-medium">Nama Jalan</th>
                                <th className="px-4 py-3 text-left font-medium">Kategori</th>
                                <th className="px-4 py-3 text-left font-medium">Hari Kutipan</th>
                                <th className="px-4 py-3 text-left font-medium">Masa</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-right font-medium">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {schedules.data.map(s => (
                                <tr key={s.id} className="hover:bg-muted/40">
                                    <td className="px-4 py-3">{s.area ?? '—'}</td>
                                    <td className="px-4 py-3">{s.zone ?? '—'}</td>
                                    <td className="px-4 py-3">{s.road_name ?? '—'}</td>
                                    <td className="px-4 py-3">{s.category?.name ?? 'Semua'}</td>
                                    <td className="px-4 py-3 font-medium">{s.collection_day}</td>
                                    <td className="px-4 py-3">{s.collection_time ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={s.status === 'active' ? 'default' : 'secondary'}>
                                            {s.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-1">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(s)}>
                                            <Pencil className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => destroy(s.id)}>
                                            <Trash2 className="size-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {schedules.data.length === 0 && (
                                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Tiada jadual dijumpai.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-muted-foreground">Jumlah: {schedules.total} jadual</p>
            </div>

            {/* ═══ Create Dialog ═══ */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Tambah Jadual Kutipan Sampah</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitCreate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Kawasan</Label>
                                <Input value={createForm.data.area} onChange={e => createForm.setData('area', e.target.value)} />
                                <InputError message={createForm.errors.area} />
                            </div>
                            <div className="space-y-1">
                                <Label>Zon</Label>
                                <Input value={createForm.data.zone} onChange={e => createForm.setData('zone', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Nama Jalan</Label>
                                <Input value={createForm.data.road_name} onChange={e => createForm.setData('road_name', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Kategori Premis (pilihan)</Label>
                                <select className={selectCls} value={createForm.data.premise_category_id} onChange={e => createForm.setData('premise_category_id', e.target.value)}>
                                    <option value="">— Semua Kategori —</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Status</Label>
                                <select className={selectCls} value={createForm.data.status} onChange={e => createForm.setData('status', e.target.value)}>
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Tidak Aktif</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Hari Kutipan *</Label>
                                <select className={selectCls} value={createForm.data.collection_day} onChange={e => createForm.setData('collection_day', e.target.value)}>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <InputError message={createForm.errors.collection_day} />
                            </div>
                            <div className="space-y-1">
                                <Label>Masa Kutipan</Label>
                                <Input value={createForm.data.collection_time} onChange={e => createForm.setData('collection_time', e.target.value)} placeholder="cth: 7:00 pagi" />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Nota</Label>
                                <textarea className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]" value={createForm.data.notes} onChange={e => createForm.setData('notes', e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={createForm.processing}>{createForm.processing && <Spinner />} Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ═══ Edit Dialog ═══ */}
            <Dialog open={editTarget !== null} onOpenChange={open => !open && setEditTarget(null)}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Jadual Kutipan Sampah</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Kawasan</Label>
                                <Input value={editForm.data.area} onChange={e => editForm.setData('area', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Zon</Label>
                                <Input value={editForm.data.zone} onChange={e => editForm.setData('zone', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Nama Jalan</Label>
                                <Input value={editForm.data.road_name} onChange={e => editForm.setData('road_name', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Kategori Premis</Label>
                                <select className={selectCls} value={editForm.data.premise_category_id} onChange={e => editForm.setData('premise_category_id', e.target.value)}>
                                    <option value="">— Semua Kategori —</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Status</Label>
                                <select className={selectCls} value={editForm.data.status} onChange={e => editForm.setData('status', e.target.value)}>
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Tidak Aktif</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Hari Kutipan *</Label>
                                <select className={selectCls} value={editForm.data.collection_day} onChange={e => editForm.setData('collection_day', e.target.value)}>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <InputError message={editForm.errors.collection_day} />
                            </div>
                            <div className="space-y-1">
                                <Label>Masa Kutipan</Label>
                                <Input value={editForm.data.collection_time} onChange={e => editForm.setData('collection_time', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Nota</Label>
                                <textarea className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]" value={editForm.data.notes} onChange={e => editForm.setData('notes', e.target.value)} />
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

WasteSchedulesIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Jadual Kutipan', href: '/admin/waste-schedules' },
    ],
};