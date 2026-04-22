import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function formatDate(value: string | null | undefined): string {
    if (!value) return '—';
    try {
        const d = new Date(value);
        if (isNaN(d.getTime())) return '—';
        return d.toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
        return '—';
    }
}

export function toDateInput(value: string | null | undefined): string {
    if (!value) return '';
    return value.split('T')[0];
}
