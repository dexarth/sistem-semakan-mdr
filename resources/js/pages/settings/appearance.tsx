import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Tetapan Paparan" />

            <h1 className="sr-only">Tetapan Paparan</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Tetapan Paparan"
                    description="Kemaskini tetapan paparan akaun anda"
                />
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Tetapan Paparan',
            href: editAppearance(),
        },
    ],
};
