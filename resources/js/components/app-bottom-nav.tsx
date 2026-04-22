import { Link, router, usePage } from '@inertiajs/react';
import {
    Building2,
    ClipboardList,
    FileText,
    LogOut,
    Menu,
    Search,
    Settings,
    ShieldCheck,
    Tag,
    Truck,
} from 'lucide-react';
import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import type { Auth, NavItem } from '@/types';

const adminNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard', icon: ShieldCheck },
    { title: 'Premis', href: '/admin/premises', icon: Building2 },
    { title: 'Kategori Premis', href: '/admin/categories', icon: Tag },
    { title: 'Rekod Cukai Pintu', href: '/admin/tax-records', icon: FileText },
    { title: 'Jadual Kutipan', href: '/admin/waste-schedules', icon: Truck },
    { title: 'Log Semakan', href: '/admin/checking-logs', icon: ClipboardList },
];

const staffNavItems: NavItem[] = [
    { title: 'Cari Premis', href: '/staff/premises/search', icon: Search },
];

const MAX_VISIBLE = 3;

export function AppBottomNav() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isAdmin = auth.user.role === 'admin';
    const navItems = isAdmin ? adminNavItems : staffNavItems;
    const { isCurrentUrl } = useCurrentUrl();
    const [moreOpen, setMoreOpen] = useState(false);

    const visibleItems = navItems.slice(0, MAX_VISIBLE);
    const overflowItems = navItems.slice(MAX_VISIBLE);

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-stretch border-t bg-background md:hidden">
                {visibleItems.map((item) => {
                    const active = isCurrentUrl(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex flex-1 flex-col items-center justify-center gap-0.5 px-1 text-[11px] transition-colors',
                                active
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground',
                            )}
                        >
                            {item.icon && <item.icon className="size-5 shrink-0" />}
                            <span className="w-full truncate text-center leading-tight">{item.title}</span>
                        </Link>
                    );
                })}

                <button
                    onClick={() => setMoreOpen(true)}
                    className="flex flex-1 flex-col items-center justify-center gap-0.5 px-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Menu className="size-5 shrink-0" />
                    <span>Lagi</span>
                </button>
            </nav>

            <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
                <SheetContent side="bottom" className="rounded-t-2xl pb-safe-bottom max-h-[70vh] overflow-y-auto">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Menu Lagi</SheetTitle>
                    </SheetHeader>

                    <div className="space-y-1 pb-2 pt-4">
                        {overflowItems.map((item) => {
                            const active = isCurrentUrl(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMoreOpen(false)}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors',
                                        active
                                            ? 'bg-primary/10 font-medium text-primary'
                                            : 'text-foreground hover:bg-muted',
                                    )}
                                >
                                    {item.icon && <item.icon className="size-5 shrink-0" />}
                                    {item.title}
                                </Link>
                            );
                        })}

                        {overflowItems.length > 0 && <div className="my-2 border-t" />}

                        <Link
                            href="/settings/profile"
                            onClick={() => setMoreOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                        >
                            <Settings className="size-5 shrink-0" />
                            Tetapan
                        </Link>

                        <button
                            onClick={() => router.post('/logout')}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-destructive transition-colors hover:bg-destructive/10"
                        >
                            <LogOut className="size-5 shrink-0" />
                            Log Keluar
                        </button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
