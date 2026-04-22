import { Head, router, useForm } from '@inertiajs/react';
import { Building2, Calendar, Eye, FileText, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { cn, formatDate, toDateInput } from '@/lib/utils';
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import type {
    BuildingRecord,
    PaginatedData,
    Premise,
    PremiseCategory,
    TaxRecord,
    WasteCollectionSchedule,
} from '@/types';

type FullPremise = Premise & {
    tax_records: TaxRecord[];
    building_records: BuildingRecord[];
    waste_schedule: WasteCollectionSchedule | null;
};

type Props = {
    premises: PaginatedData<Premise>;
    filters: { search?: string };
    categories: PremiseCategory[];
    selectedPremise: FullPremise | null;
    taxStatuses: string[];
    taxCurrentYear: number;
    buildingSubmissionStatuses: string[];
    buildingApprovalStatuses: string[];
};

const selectCls = 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm';

function taxBadgeVariant(status: string) {
    if (status === 'Sudah Bayar Tahun Semasa') return 'default' as const;
    if (status === 'Ada Tunggakan') return 'destructive' as const;
    return 'secondary' as const;
}
function buildingBadgeVariant(status: string) {
    if (status === 'Sudah Lulus') return 'default' as const;
    if (status === 'Ditolak') return 'destructive' as const;
    return 'secondary' as const;
}

export default function PremisesIndex({
    premises,
    filters,
    categories,
    selectedPremise,
    taxStatuses,
    taxCurrentYear,
    buildingSubmissionStatuses,
    buildingApprovalStatuses,
}: Props) {
    /* ── search ── */
    const { data: searchData, setData: setSearchData, get } = useForm({ search: filters.search ?? '' });
    function doSearch(e: React.SyntheticEvent) {
        e.preventDefault();
        get('/admin/premises', { preserveState: true, replace: true });
    }

    /* ── sheet ── */
    const [sheetOpen, setSheetOpen] = useState(!!selectedPremise);
    useEffect(() => { setSheetOpen(!!selectedPremise); }, [selectedPremise]);
    function openSheet(id: number) {
        router.get('/admin/premises', { ...filters, show: id }, { preserveState: true, replace: true });
    }
    function closeSheet() {
        setSheetOpen(false);
        router.get('/admin/premises', filters.search ? { search: filters.search } : {}, { preserveState: true, replace: true });
    }

    /* ── premise create ── */
    const [createOpen, setCreateOpen] = useState(false);
    const createForm = useForm({
        premise_category_id: '', owner_name: '', premise_name: '',
        grant_number: '', ic_number: '', mailing_address: '',
        phone_number: '', zone: '', area: '', status: 'active',
    });
    function submitCreate(e: React.SyntheticEvent) {
        e.preventDefault();
        createForm.post('/admin/premises', {
            onSuccess: () => { setCreateOpen(false); createForm.reset(); },
        });
    }

    /* ── premise edit ── */
    const [editPremise, setEditPremise] = useState<Premise | null>(null);
    const editForm = useForm({
        premise_category_id: '', owner_name: '', premise_name: '',
        grant_number: '', ic_number: '', mailing_address: '',
        phone_number: '', zone: '', area: '', status: 'active',
    });
    function openEdit(p: Premise) {
        editForm.setData({
            premise_category_id: String(p.premise_category_id ?? ''),
            owner_name: p.owner_name,
            premise_name: p.premise_name ?? '',
            grant_number: p.grant_number ?? '',
            ic_number: p.ic_number ?? '',
            mailing_address: p.mailing_address ?? '',
            phone_number: p.phone_number ?? '',
            zone: p.zone ?? '',
            area: p.area ?? '',
            status: p.status,
        });
        setEditPremise(p);
    }
    function submitEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!editPremise) return;
        editForm.put(`/admin/premises/${editPremise.id}`, {
            onSuccess: () => setEditPremise(null),
        });
    }

    /* ── tax record create ── */
    const [taxCreateOpen, setTaxCreateOpen] = useState(false);
    const taxCreateForm = useForm({
        tax_year: String(taxCurrentYear), payment_status: taxStatuses?.[0] ?? '',
        amount_due: '', amount_paid: '', payment_date: '', remarks: '',
    });
    function submitTaxCreate(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!selectedPremise) return;
        taxCreateForm.post(`/admin/premises/${selectedPremise.id}/tax-records`, {
            onSuccess: () => { setTaxCreateOpen(false); taxCreateForm.reset(); },
        });
    }

    /* ── tax record edit ── */
    const [editTax, setEditTax] = useState<TaxRecord | null>(null);
    const taxEditForm = useForm({
        tax_year: '', payment_status: taxStatuses?.[0] ?? '',
        amount_due: '', amount_paid: '', payment_date: '', remarks: '',
    });
    function openTaxEdit(t: TaxRecord) {
        taxEditForm.setData({
            tax_year: String(t.tax_year),
            payment_status: t.payment_status,
            amount_due: t.amount_due ?? '',
            amount_paid: t.amount_paid ?? '',
            payment_date: toDateInput(t.payment_date),
            remarks: t.remarks ?? '',
        });
        setEditTax(t);
    }
    function submitTaxEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!selectedPremise || !editTax) return;
        taxEditForm.put(`/admin/premises/${selectedPremise.id}/tax-records/${editTax.id}`, {
            onSuccess: () => setEditTax(null),
        });
    }

    /* ── building record create ── */
    const [bldgCreateOpen, setBldgCreateOpen] = useState(false);
    const bldgCreateForm = useForm({
        submission_status: buildingSubmissionStatuses?.[0] ?? '',
        approval_status: '', submission_date: '', approval_date: '', remarks: '',
    });
    function submitBldgCreate(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!selectedPremise) return;
        bldgCreateForm.post(`/admin/premises/${selectedPremise.id}/building-records`, {
            onSuccess: () => { setBldgCreateOpen(false); bldgCreateForm.reset(); },
        });
    }

    /* ── building record edit ── */
    const [editBldg, setEditBldg] = useState<BuildingRecord | null>(null);
    const bldgEditForm = useForm({
        submission_status: buildingSubmissionStatuses?.[0] ?? '',
        approval_status: '', submission_date: '', approval_date: '', remarks: '',
    });
    function openBldgEdit(b: BuildingRecord) {
        bldgEditForm.setData({
            submission_status: b.submission_status,
            approval_status: b.approval_status ?? '',
            submission_date: toDateInput(b.submission_date),
            approval_date: toDateInput(b.approval_date),
            remarks: b.remarks ?? '',
        });
        setEditBldg(b);
    }
    function submitBldgEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!selectedPremise || !editBldg) return;
        bldgEditForm.put(`/admin/premises/${selectedPremise.id}/building-records/${editBldg.id}`, {
            onSuccess: () => setEditBldg(null),
        });
    }

    /* ── destroy helpers ── */
    function destroyPremise(id: number) {
        if (confirm('Padam premis ini?')) router.delete(`/admin/premises/${id}`);
    }
    function destroyTax(taxId: number) {
        if (!selectedPremise) return;
        if (confirm('Padam rekod cukai ini?'))
            router.delete(`/admin/premises/${selectedPremise.id}/tax-records/${taxId}`);
    }
    function destroyBldg(bldgId: number) {
        if (!selectedPremise) return;
        if (confirm('Padam rekod bangunan ini?'))
            router.delete(`/admin/premises/${selectedPremise.id}/building-records/${bldgId}`);
    }

    return (
        <>
            <Head title="Premis" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Pengurusan Premis</h1>
                    <Button size="sm" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-1 size-4" /> Tambah Premis
                    </Button>
                </div>

                <form onSubmit={doSearch} className="flex gap-2 max-w-sm">
                    <Input
                        placeholder="Cari nama, IC, geran, alamat..."
                        value={searchData.search}
                        onChange={e => setSearchData('search', e.target.value)}
                    />
                    <Button type="submit" size="icon" variant="outline"><Search className="size-4" /></Button>
                </form>

                <div className="rounded-lg border overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Nama Pemilik</th>
                                <th className="px-4 py-3 text-left font-medium">Nama Premis</th>
                                <th className="px-4 py-3 text-left font-medium">Kategori</th>
                                <th className="px-4 py-3 text-left font-medium">No. IC</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-right font-medium">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {premises.data.map(p => (
                                <tr key={p.id} className={cn('hover:bg-muted/40', selectedPremise?.id === p.id && 'bg-primary/5')}>
                                    <td className="px-4 py-3 font-medium">{p.owner_name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{p.premise_name ?? '—'}</td>
                                    <td className="px-4 py-3">{p.category?.name ?? '—'}</td>
                                    <td className="px-4 py-3">{p.ic_number ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={p.status === 'active' ? 'default' : 'secondary'}>
                                            {p.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-1">
                                        <Button
                                            variant={selectedPremise?.id === p.id ? 'secondary' : 'ghost'}
                                            size="icon"
                                            onClick={() => openSheet(p.id)}
                                            title="Lihat"
                                        >
                                            <Eye className={cn('size-4', selectedPremise?.id === p.id && 'text-primary')} />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(p)} title="Edit">
                                            <Pencil className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => destroyPremise(p.id)} title="Padam">
                                            <Trash2 className="size-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {premises.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Tiada premis dijumpai.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Jumlah: {premises.total} premis</span>
                    <div className="flex gap-1">
                        {premises.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ Premise Create Dialog ═══ */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Tambah Premis</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitCreate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1">
                                <Label>Kategori Premis *</Label>
                                <select className={selectCls} value={createForm.data.premise_category_id} onChange={e => createForm.setData('premise_category_id', e.target.value)} required>
                                    <option value="">— Pilih kategori —</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <InputError message={createForm.errors.premise_category_id} />
                            </div>
                            <div className="space-y-1">
                                <Label>Nama Pemilik *</Label>
                                <Input value={createForm.data.owner_name} onChange={e => createForm.setData('owner_name', e.target.value)} required />
                                <InputError message={createForm.errors.owner_name} />
                            </div>
                            <div className="space-y-1">
                                <Label>Nama Premis</Label>
                                <Input value={createForm.data.premise_name} onChange={e => createForm.setData('premise_name', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>No. IC</Label>
                                <Input value={createForm.data.ic_number} onChange={e => createForm.setData('ic_number', e.target.value)} />
                                <InputError message={createForm.errors.ic_number} />
                            </div>
                            <div className="space-y-1">
                                <Label>No. Geran</Label>
                                <Input value={createForm.data.grant_number} onChange={e => createForm.setData('grant_number', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>No. Telefon</Label>
                                <Input value={createForm.data.phone_number} onChange={e => createForm.setData('phone_number', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Status</Label>
                                <select className={selectCls} value={createForm.data.status} onChange={e => createForm.setData('status', e.target.value)}>
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Tidak Aktif</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Zon</Label>
                                <Input value={createForm.data.zone} onChange={e => createForm.setData('zone', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Kawasan</Label>
                                <Input value={createForm.data.area} onChange={e => createForm.setData('area', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Alamat Surat-menyurat</Label>
                                <textarea className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]" value={createForm.data.mailing_address} onChange={e => createForm.setData('mailing_address', e.target.value)} />
                                <InputError message={createForm.errors.mailing_address} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={createForm.processing}>{createForm.processing && <Spinner />} Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ═══ Premise Edit Dialog ═══ */}
            <Dialog open={editPremise !== null} onOpenChange={open => !open && setEditPremise(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Premis</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1">
                                <Label>Kategori Premis *</Label>
                                <select className={selectCls} value={editForm.data.premise_category_id} onChange={e => editForm.setData('premise_category_id', e.target.value)}>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <InputError message={editForm.errors.premise_category_id} />
                            </div>
                            <div className="space-y-1">
                                <Label>Nama Pemilik *</Label>
                                <Input value={editForm.data.owner_name} onChange={e => editForm.setData('owner_name', e.target.value)} required />
                                <InputError message={editForm.errors.owner_name} />
                            </div>
                            <div className="space-y-1">
                                <Label>Nama Premis</Label>
                                <Input value={editForm.data.premise_name} onChange={e => editForm.setData('premise_name', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>No. IC</Label>
                                <Input value={editForm.data.ic_number} onChange={e => editForm.setData('ic_number', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>No. Geran</Label>
                                <Input value={editForm.data.grant_number} onChange={e => editForm.setData('grant_number', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>No. Telefon</Label>
                                <Input value={editForm.data.phone_number} onChange={e => editForm.setData('phone_number', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Status</Label>
                                <select className={selectCls} value={editForm.data.status} onChange={e => editForm.setData('status', e.target.value)}>
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Tidak Aktif</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Zon</Label>
                                <Input value={editForm.data.zone} onChange={e => editForm.setData('zone', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Kawasan</Label>
                                <Input value={editForm.data.area} onChange={e => editForm.setData('area', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Alamat Surat-menyurat</Label>
                                <textarea className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]" value={editForm.data.mailing_address} onChange={e => editForm.setData('mailing_address', e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditPremise(null)}>Batal</Button>
                            <Button type="submit" disabled={editForm.processing}>{editForm.processing && <Spinner />} Kemaskini</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ═══ Premise Show Sheet ═══ */}
            <Sheet open={sheetOpen} onOpenChange={open => !open && closeSheet()}>
                <SheetContent side="right" className="flex flex-col gap-0 p-0 sm:max-w-lg">
                    {selectedPremise && (
                        <>
                            {/* Pinned header — leave pr-12 so the Sheet's own X button doesn't overlap */}
                            <SheetHeader className="flex shrink-0 flex-row items-start justify-between gap-3 border-b px-6 pb-4 pt-5 pr-12">
                                <div className="min-w-0">
                                    <SheetTitle className="truncate text-base">{selectedPremise.owner_name}</SheetTitle>
                                    {selectedPremise.premise_name && (
                                        <p className="mt-0.5 truncate text-sm text-muted-foreground">{selectedPremise.premise_name}</p>
                                    )}
                                    <Badge variant="secondary" className="mt-2">{selectedPremise.category?.name}</Badge>
                                </div>
                                <Button variant="outline" size="sm" className="mt-0.5 shrink-0" onClick={() => openEdit(selectedPremise)}>
                                    <Pencil className="mr-1 size-3" /> Edit
                                </Button>
                            </SheetHeader>

                            {/* Scrollable body */}
                            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
                                {/* Basic Info */}
                                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                    <div><dt className="text-muted-foreground">No. IC</dt><dd className="font-medium">{selectedPremise.ic_number ?? '—'}</dd></div>
                                    <div><dt className="text-muted-foreground">No. Geran</dt><dd className="font-medium">{selectedPremise.grant_number ?? '—'}</dd></div>
                                    <div><dt className="text-muted-foreground">No. Telefon</dt><dd className="font-medium">{selectedPremise.phone_number ?? '—'}</dd></div>
                                    <div><dt className="text-muted-foreground">Status</dt><dd><Badge variant={selectedPremise.status === 'active' ? 'default' : 'secondary'}>{selectedPremise.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</Badge></dd></div>
                                    <div><dt className="text-muted-foreground">Zon</dt><dd className="font-medium">{selectedPremise.zone ?? '—'}</dd></div>
                                    <div><dt className="text-muted-foreground">Kawasan</dt><dd className="font-medium">{selectedPremise.area ?? '—'}</dd></div>
                                    <div className="col-span-2"><dt className="text-muted-foreground">Alamat</dt><dd className="font-medium">{selectedPremise.mailing_address ?? '—'}</dd></div>
                                </dl>

                                <div className="border-t" />

                                {/* Tax Records */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="flex items-center gap-1.5 text-sm font-semibold"><FileText className="size-4" /> Rekod Cukai Pintu</h3>
                                        <Button size="sm" variant="outline" onClick={() => setTaxCreateOpen(true)}>
                                            <Plus className="mr-1 size-3" /> Tambah
                                        </Button>
                                    </div>
                                    {selectedPremise.tax_records.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">Tiada rekod cukai.</p>
                                    ) : (
                                        <div className="rounded-md border overflow-hidden">
                                            <table className="w-full text-sm">
                                                <thead className="bg-muted text-muted-foreground">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left font-medium">Tahun</th>
                                                        <th className="px-3 py-2 text-left font-medium">Status</th>
                                                        <th className="px-3 py-2 text-left font-medium">Tertunggak</th>
                                                        <th className="px-3 py-2 text-left font-medium">Dibayar</th>
                                                        <th className="px-3 py-2 text-right font-medium">Tindakan</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {selectedPremise.tax_records.map(t => (
                                                        <tr key={t.id} className="hover:bg-muted/40">
                                                            <td className="px-3 py-2 font-medium">{t.tax_year}</td>
                                                            <td className="px-3 py-2"><Badge variant={taxBadgeVariant(t.payment_status)}>{t.payment_status}</Badge></td>
                                                            <td className="px-3 py-2">{t.amount_due ? `RM ${t.amount_due}` : '—'}</td>
                                                            <td className="px-3 py-2">{t.amount_paid ? `RM ${t.amount_paid}` : '—'}</td>
                                                            <td className="px-3 py-2 text-right space-x-1">
                                                                <Button variant="ghost" size="icon" onClick={() => openTaxEdit(t)}><Pencil className="size-3" /></Button>
                                                                <Button variant="ghost" size="icon" onClick={() => destroyTax(t.id)}><Trash2 className="size-3 text-destructive" /></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t" />

                                {/* Building Records */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="flex items-center gap-1.5 text-sm font-semibold"><Building2 className="size-4" /> Rekod Bangunan</h3>
                                        <Button size="sm" variant="outline" onClick={() => setBldgCreateOpen(true)}>
                                            <Plus className="mr-1 size-3" /> Tambah
                                        </Button>
                                    </div>
                                    {selectedPremise.building_records.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">Tiada rekod bangunan.</p>
                                    ) : (
                                        <div className="rounded-md border overflow-hidden">
                                            <table className="w-full text-sm">
                                                <thead className="bg-muted text-muted-foreground">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left font-medium">Status Hantar</th>
                                                        <th className="px-3 py-2 text-left font-medium">Status Lulus</th>
                                                        <th className="px-3 py-2 text-left font-medium">Tarikh Hantar</th>
                                                        <th className="px-3 py-2 text-right font-medium">Tindakan</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {selectedPremise.building_records.map(b => (
                                                        <tr key={b.id} className="hover:bg-muted/40">
                                                            <td className="px-3 py-2"><Badge variant={buildingBadgeVariant(b.submission_status)}>{b.submission_status}</Badge></td>
                                                            <td className="px-3 py-2">{b.approval_status ? <Badge variant={buildingBadgeVariant(b.approval_status)}>{b.approval_status}</Badge> : '—'}</td>
                                                            <td className="px-3 py-2">{formatDate(b.submission_date)}</td>
                                                            <td className="px-3 py-2 text-right space-x-1">
                                                                <Button variant="ghost" size="icon" onClick={() => openBldgEdit(b)}><Pencil className="size-3" /></Button>
                                                                <Button variant="ghost" size="icon" onClick={() => destroyBldg(b.id)}><Trash2 className="size-3 text-destructive" /></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t" />

                                {/* Waste Schedule */}
                                <div className="space-y-2">
                                    <h3 className="flex items-center gap-1.5 text-sm font-semibold"><Calendar className="size-4" /> Jadual Kutipan Sampah</h3>
                                    {selectedPremise.waste_schedule ? (
                                        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                            <div><dt className="text-muted-foreground">Kawasan</dt><dd>{selectedPremise.waste_schedule.area ?? '—'}</dd></div>
                                            <div><dt className="text-muted-foreground">Zon</dt><dd>{selectedPremise.waste_schedule.zone ?? '—'}</dd></div>
                                            <div><dt className="text-muted-foreground">Hari Kutipan</dt><dd className="font-medium">{selectedPremise.waste_schedule.collection_day}</dd></div>
                                            <div><dt className="text-muted-foreground">Masa</dt><dd>{selectedPremise.waste_schedule.collection_time ?? '—'}</dd></div>
                                            {selectedPremise.waste_schedule.notes && (
                                                <div className="col-span-2"><dt className="text-muted-foreground">Nota</dt><dd>{selectedPremise.waste_schedule.notes}</dd></div>
                                            )}
                                        </dl>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">Tiada jadual kutipan untuk kawasan/zon ini.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            {/* ═══ Tax Record Create Dialog ═══ */}
            <Dialog open={taxCreateOpen} onOpenChange={setTaxCreateOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Tambah Rekod Cukai Pintu</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitTaxCreate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Tahun Cukai *</Label>
                                <Input type="number" value={taxCreateForm.data.tax_year} onChange={e => taxCreateForm.setData('tax_year', e.target.value)} required />
                                <InputError message={taxCreateForm.errors.tax_year} />
                            </div>
                            <div className="space-y-1">
                                <Label>Status Pembayaran *</Label>
                                <select className={selectCls} value={taxCreateForm.data.payment_status} onChange={e => taxCreateForm.setData('payment_status', e.target.value)}>
                                    {taxStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Amaun Tertunggak (RM)</Label>
                                <Input type="number" step="0.01" value={taxCreateForm.data.amount_due} onChange={e => taxCreateForm.setData('amount_due', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Amaun Dibayar (RM)</Label>
                                <Input type="number" step="0.01" value={taxCreateForm.data.amount_paid} onChange={e => taxCreateForm.setData('amount_paid', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Tarikh Bayar</Label>
                                <Input type="date" value={taxCreateForm.data.payment_date} onChange={e => taxCreateForm.setData('payment_date', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Catatan</Label>
                                <Input value={taxCreateForm.data.remarks} onChange={e => taxCreateForm.setData('remarks', e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setTaxCreateOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={taxCreateForm.processing}>{taxCreateForm.processing && <Spinner />} Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ═══ Tax Record Edit Dialog ═══ */}
            <Dialog open={editTax !== null} onOpenChange={open => !open && setEditTax(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Rekod Cukai Pintu</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitTaxEdit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Tahun Cukai *</Label>
                                <Input type="number" value={taxEditForm.data.tax_year} onChange={e => taxEditForm.setData('tax_year', e.target.value)} required />
                                <InputError message={taxEditForm.errors.tax_year} />
                            </div>
                            <div className="space-y-1">
                                <Label>Status Pembayaran *</Label>
                                <select className={selectCls} value={taxEditForm.data.payment_status} onChange={e => taxEditForm.setData('payment_status', e.target.value)}>
                                    {taxStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Amaun Tertunggak (RM)</Label>
                                <Input type="number" step="0.01" value={taxEditForm.data.amount_due} onChange={e => taxEditForm.setData('amount_due', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Amaun Dibayar (RM)</Label>
                                <Input type="number" step="0.01" value={taxEditForm.data.amount_paid} onChange={e => taxEditForm.setData('amount_paid', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Tarikh Bayar</Label>
                                <Input type="date" value={taxEditForm.data.payment_date} onChange={e => taxEditForm.setData('payment_date', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Catatan</Label>
                                <Input value={taxEditForm.data.remarks} onChange={e => taxEditForm.setData('remarks', e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditTax(null)}>Batal</Button>
                            <Button type="submit" disabled={taxEditForm.processing}>{taxEditForm.processing && <Spinner />} Kemaskini</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ═══ Building Record Create Dialog ═══ */}
            <Dialog open={bldgCreateOpen} onOpenChange={setBldgCreateOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Tambah Rekod Bangunan</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitBldgCreate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Status Penghantaran Pelan *</Label>
                                <select className={selectCls} value={bldgCreateForm.data.submission_status} onChange={e => bldgCreateForm.setData('submission_status', e.target.value)}>
                                    {buildingSubmissionStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <InputError message={bldgCreateForm.errors.submission_status} />
                            </div>
                            <div className="space-y-1">
                                <Label>Status Kelulusan</Label>
                                <select className={selectCls} value={bldgCreateForm.data.approval_status} onChange={e => bldgCreateForm.setData('approval_status', e.target.value)}>
                                    <option value="">— Tiada —</option>
                                    {buildingApprovalStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Tarikh Hantar</Label>
                                <Input type="date" value={bldgCreateForm.data.submission_date} onChange={e => bldgCreateForm.setData('submission_date', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Tarikh Lulus</Label>
                                <Input type="date" value={bldgCreateForm.data.approval_date} onChange={e => bldgCreateForm.setData('approval_date', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Catatan</Label>
                                <textarea className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]" value={bldgCreateForm.data.remarks} onChange={e => bldgCreateForm.setData('remarks', e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setBldgCreateOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={bldgCreateForm.processing}>{bldgCreateForm.processing && <Spinner />} Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ═══ Building Record Edit Dialog ═══ */}
            <Dialog open={editBldg !== null} onOpenChange={open => !open && setEditBldg(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Rekod Bangunan</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitBldgEdit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Status Penghantaran Pelan *</Label>
                                <select className={selectCls} value={bldgEditForm.data.submission_status} onChange={e => bldgEditForm.setData('submission_status', e.target.value)}>
                                    {buildingSubmissionStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <InputError message={bldgEditForm.errors.submission_status} />
                            </div>
                            <div className="space-y-1">
                                <Label>Status Kelulusan</Label>
                                <select className={selectCls} value={bldgEditForm.data.approval_status} onChange={e => bldgEditForm.setData('approval_status', e.target.value)}>
                                    <option value="">— Tiada —</option>
                                    {buildingApprovalStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Tarikh Hantar</Label>
                                <Input type="date" value={bldgEditForm.data.submission_date} onChange={e => bldgEditForm.setData('submission_date', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Tarikh Lulus</Label>
                                <Input type="date" value={bldgEditForm.data.approval_date} onChange={e => bldgEditForm.setData('approval_date', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label>Catatan</Label>
                                <textarea className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px]" value={bldgEditForm.data.remarks} onChange={e => bldgEditForm.setData('remarks', e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditBldg(null)}>Batal</Button>
                            <Button type="submit" disabled={bldgEditForm.processing}>{bldgEditForm.processing && <Spinner />} Kemaskini</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

PremisesIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Premis', href: '/admin/premises' },
    ],
};