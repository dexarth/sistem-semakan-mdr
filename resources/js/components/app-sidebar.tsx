import { Link, usePage } from '@inertiajs/react';
import { Building2, ClipboardList, FileText, Search, ShieldCheck, Tag, Truck } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { Auth, NavItem } from '@/types';

const adminNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard', icon: ShieldCheck },
    { title: 'Premis', href: '/admin/premises', icon: Building2 },
    { title: 'Kategori Premis', href: '/admin/categories', icon: Tag },
    { title: 'Rekod Cukai Pintu', href: '/admin/tax-records', icon: FileText },
    { title: 'Jadual Kutipan Sampah', href: '/admin/waste-schedules', icon: Truck },
    { title: 'Log Semakan', href: '/admin/checking-logs', icon: ClipboardList },
];

const staffNavItems: NavItem[] = [
    { title: 'Cari Premis', href: '/staff/premises/search', icon: Search },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isAdmin = auth.user.role === 'admin';
    const homeHref = isAdmin ? '/admin/dashboard' : '/staff/dashboard';
    const navItems = isAdmin ? adminNavItems : staffNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
