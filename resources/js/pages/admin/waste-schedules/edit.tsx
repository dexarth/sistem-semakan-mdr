import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { PremiseCategory, WasteCollectionSchedule } from '@/types';

type Props = { schedule: WasteCollectionSchedule; categories: PremiseCategory[]; days: string[] };

export default function WasteScheduleEdit({ schedule, categories, days }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        area: schedule.area ?? '',
        zone: schedule.zone ?? '',
        road_name: schedule.road_name ?? '',
        premise_category_id: schedule.premise_category_id ? String(schedule.premise_category_id) : '',
        collection_day: schedule.collection_day,
        collection_time: schedule.collection_time ?? '',
        notes: schedule.notes ?? '',
        status: schedule.status,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/waste-schedules/${schedule.id}`);
    }

    return (
        <>
            <Head title="Edit Jadual Kutipan" />
            <div className="p-6 max-w-lg space-y-6">
                <h1 className="text-xl font-semibold">Edit Jadual Kutipan Sampah</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Kawasan</Label>
                            <Input value={data.area} onChange={e => setData('area', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Zon</Label>
                            <Input value={data.zone} onChange={e => setData('zone', e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label>Nama Jalan</Label>
                            <Input value={data.road_name} onChange={e => setData('road_name', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Kategori Premis</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.premise_category_id}
                                onChange={e => setData('premise_category_id', e.target.value)}
                            >
                                <option value="">— Semua Kategori —</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
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
                            <Label>Hari Kutipan *</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.collection_day}
                                onChange={e => setData('collection_day', e.target.value)}
                            >
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <InputError message={errors.collection_day} />
                        </div>
                        <div className="space-y-1">
                            <Label>Masa Kutipan</Label>
                            <Input value={data.collection_time} onChange={e => setData('collection_time', e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label>Nota</Label>
                            <textarea
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                            />
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

WasteScheduleEdit.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Jadual Kutipan', href: '/admin/waste-schedules' },
        { title: 'Edit', href: '#' },
    ],
};
