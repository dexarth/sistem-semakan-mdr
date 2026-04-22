import { Head, Link, useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { PaginatedData, Premise } from '@/types';

type Props = {
    premises: PaginatedData<Premise> | null;
    filters: { search?: string };
};

export default function PremisesSearch({ premises, filters }: Props) {
    const { data, setData, get, processing } = useForm({ search: filters.search ?? '' });

    function search(e: React.FormEvent) {
        e.preventDefault();
        get('/staff/premises/search', { preserveState: true, replace: true });
    }

    return (
        <>
            <Head title="Cari Premis" />
            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">Carian Premis / Klien</h1>
                    <p className="text-sm text-muted-foreground mt-1">Cari menggunakan nama pemilik, nama premis, no. IC, no. geran, alamat atau no. telefon.</p>
                </div>

                <form onSubmit={search} className="flex gap-2 max-w-xl">
                    <Input
                        autoFocus
                        placeholder="Masukkan kata kunci carian..."
                        value={data.search}
                        onChange={e => setData('search', e.target.value)}
                        className="text-base"
                    />
                    <Button type="submit" disabled={processing}>
                        {processing ? <Spinner /> : <Search className="size-4" />}
                        <span className="ml-2">Cari</span>
                    </Button>
                </form>

                {premises === null && (
                    <div className="text-sm text-muted-foreground">Masukkan kata kunci untuk mencari premis.</div>
                )}

                {premises !== null && premises.data.length === 0 && (
                    <div className="rounded-lg border p-8 text-center text-muted-foreground">
                        Tiada premis dijumpai untuk kata kunci "<strong>{filters.search}</strong>".
                    </div>
                )}

                {premises !== null && premises.data.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Menunjukkan {premises.from}–{premises.to} daripada {premises.total} hasil
                        </p>
                        <div className="rounded-lg border overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Nama Pemilik</th>
                                        <th className="px-4 py-3 text-left font-medium">Nama Premis</th>
                                        <th className="px-4 py-3 text-left font-medium">Kategori</th>
                                        <th className="px-4 py-3 text-left font-medium">No. IC</th>
                                        <th className="px-4 py-3 text-left font-medium">Kawasan</th>
                                        <th className="px-4 py-3 text-right font-medium">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {premises.data.map(p => (
                                        <tr key={p.id} className="hover:bg-muted/40">
                                            <td className="px-4 py-3 font-medium">{p.owner_name}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{p.premise_name ?? '—'}</td>
                                            <td className="px-4 py-3">{p.category?.name ?? '—'}</td>
                                            <td className="px-4 py-3">{p.ic_number ?? '—'}</td>
                                            <td className="px-4 py-3">{p.area ?? '—'}</td>
                                            <td className="px-4 py-3 text-right">
                                                <Button asChild size="sm">
                                                    <Link href={`/staff/premises/${p.id}`}>Lihat Profil</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

PremisesSearch.layout = {
    breadcrumbs: [
        { title: 'Cari Premis', href: '/staff/premises/search' },
    ],
};
