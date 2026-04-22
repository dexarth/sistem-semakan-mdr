import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { Premise } from '@/types';

type Props = { premise: Premise; submissionStatuses: string[]; approvalStatuses: string[] };

export default function BuildingRecordCreate({ premise, submissionStatuses, approvalStatuses }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        submission_status: submissionStatuses[0],
        approval_status: '',
        submission_date: '',
        approval_date: '',
        remarks: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(`/admin/premises/${premise.id}/building-records`);
    }

    return (
        <>
            <Head title="Tambah Rekod Bangunan" />
            <div className="p-6 max-w-lg space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Rekod Bangunan</h1>
                    <p className="text-sm text-muted-foreground">Premis: {premise.owner_name}</p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Status Penghantaran Pelan *</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.submission_status}
                                onChange={e => setData('submission_status', e.target.value)}
                            >
                                {submissionStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <InputError message={errors.submission_status} />
                        </div>
                        <div className="space-y-1">
                            <Label>Status Kelulusan</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={data.approval_status}
                                onChange={e => setData('approval_status', e.target.value)}
                            >
                                <option value="">— Tiada —</option>
                                {approvalStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <Label>Tarikh Hantar</Label>
                            <Input type="date" value={data.submission_date} onChange={e => setData('submission_date', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Tarikh Lulus</Label>
                            <Input type="date" value={data.approval_date} onChange={e => setData('approval_date', e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label>Catatan</Label>
                            <textarea
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]"
                                value={data.remarks}
                                onChange={e => setData('remarks', e.target.value)}
                            />
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

BuildingRecordCreate.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Premis', href: '/admin/premises' },
        { title: 'Tambah Rekod Bangunan', href: '#' },
    ],
};
