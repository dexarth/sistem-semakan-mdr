import { Head, useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CheckingLog, PaginatedData } from '@/types';

type Props = {
    logs: PaginatedData<CheckingLog>;
    filters: { search?: string };
};

export default function CheckingLogsIndex({ logs, filters }: Props) {
    const { data, setData, get } = useForm({ search: filters.search ?? '' });

    function search(e: React.FormEvent) {
        e.preventDefault();
        get('/admin/checking-logs', { preserveState: true, replace: true });
    }

    return (
        <>
            <Head title="Log Semakan" />
            <div className="p-6 space-y-4">
                <h1 className="text-xl font-semibold">Log Semakan (Audit Trail)</h1>

                <form onSubmit={search} className="flex gap-2 max-w-sm">
                    <Input placeholder="Cari nama pemilik..." value={data.search} onChange={e => setData('search', e.target.value)} />
                    <Button type="submit" size="icon" variant="outline"><Search className="size-4" /></Button>
                </form>

                <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Tarikh & Masa</th>
                                <th className="px-4 py-3 text-left font-medium">Staf</th>
                                <th className="px-4 py-3 text-left font-medium">Premis</th>
                                <th className="px-4 py-3 text-left font-medium">Catatan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {logs.data.map(log => (
                                <tr key={log.id} className="hover:bg-muted/40">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {new Date(log.checked_at).toLocaleString('ms-MY')}
                                    </td>
                                    <td className="px-4 py-3">{log.user?.name ?? '—'}</td>
                                    <td className="px-4 py-3">{log.premise?.owner_name ?? '—'}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{log.remarks ?? '—'}</td>
                                </tr>
                            ))}
                            {logs.data.length === 0 && (
                                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Tiada log dijumpai.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="text-sm text-muted-foreground">Jumlah: {logs.total} rekod</p>
            </div>
        </>
    );
}

CheckingLogsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Log Semakan', href: '/admin/checking-logs' },
    ],
};
