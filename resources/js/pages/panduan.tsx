import { Head, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Building2,
    ClipboardList,
    FileText,
    Info,
    Search,
    ShieldCheck,
    Tag,
    Truck,
    User,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Auth } from '@/types';

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="size-5 shrink-0 text-primary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
                {children}
            </CardContent>
        </Card>
    );
}

function MenuItem({ icon: Icon, label, description }: { icon: React.ElementType; label: string; description: string }) {
    return (
        <div className="flex gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Icon className="size-4 text-foreground" />
            </div>
            <div>
                <p className="font-medium text-foreground">{label}</p>
                <p className="mt-0.5 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function Step({ number, text }: { number: number; text: string }) {
    return (
        <div className="flex gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {number}
            </div>
            <p className="leading-relaxed">{text}</p>
        </div>
    );
}

export default function Panduan() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isAdmin = auth.user.role === 'admin';

    return (
        <>
            <Head title="Panduan Pengguna" />
            <div className="space-y-6 p-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold">Panduan Pengguna</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Maklumat sistem dan panduan penggunaan mengikut peranan anda
                    </p>
                </div>

                {/* System intro */}
                <Section icon={Info} title="Tentang Sistem Ini">
                    <p className="leading-relaxed">
                        <span className="font-semibold text-foreground">Sistem Semakan MDR</span> adalah
                        platform pengurusan rekod premis untuk kegunaan Majlis Daerah Ranau. Sistem ini
                        membolehkan pentadbir menguruskan maklumat premis, rekod cukai pintu, rekod
                        bangunan, dan jadual kutipan sampah secara berpusat.
                    </p>
                    <p className="leading-relaxed">
                        Staf lapangan pula boleh menggunakan sistem ini untuk mencari dan menyemak
                        profil premis semasa menjalankan tugas di lapangan. Setiap semakan yang
                        dilakukan oleh staf akan direkodkan secara automatik sebagai log audit.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Badge variant="secondary">Pengurusan Premis</Badge>
                        <Badge variant="secondary">Cukai Pintu</Badge>
                        <Badge variant="secondary">Rekod Bangunan</Badge>
                        <Badge variant="secondary">Jadual Sampah</Badge>
                        <Badge variant="secondary">Log Audit</Badge>
                    </div>
                </Section>

                {/* Roles */}
                <Section icon={Users} title="Peranan Pengguna">
                    <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <ShieldCheck className="size-4 text-primary" />
                                <span className="font-semibold text-foreground">Pentadbir (Admin)</span>
                            </div>
                            <p className="leading-relaxed">
                                Bertanggungjawab menguruskan keseluruhan sistem. Pentadbir boleh menambah,
                                mengemaskini dan memadam semua rekod termasuk premis, cukai, bangunan,
                                kategori dan jadual kutipan sampah. Pentadbir juga boleh melihat semua
                                log aktiviti semakan staf.
                            </p>
                        </div>
                        <div className="rounded-lg border p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <User className="size-4 text-primary" />
                                <span className="font-semibold text-foreground">Staf</span>
                            </div>
                            <p className="leading-relaxed">
                                Staf lapangan boleh mencari premis dan melihat profil lengkap premis
                                termasuk status cukai, rekod bangunan dan jadual kutipan sampah.
                                Staf tidak boleh mengubah sebarang rekod. Setiap kali staf melihat
                                profil premis, aktiviti tersebut akan dicatat secara automatik.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Admin manual */}
                {isAdmin && (
                    <Section icon={ShieldCheck} title="Panduan Pentadbir">
                        <p className="font-medium text-foreground">Menu yang tersedia untuk Pentadbir:</p>
                        <div className="space-y-4 pt-1">
                            <MenuItem
                                icon={ShieldCheck}
                                label="Dashboard"
                                description="Papan pemuka yang memaparkan ringkasan sistem — jumlah premis aktif, status cukai tahun semasa, rekod bangunan dalam semakan, dan aktiviti semakan terkini."
                            />
                            <MenuItem
                                icon={Building2}
                                label="Premis"
                                description="Senarai semua premis berdaftar. Pentadbir boleh menambah premis baharu, mengemaskini maklumat pemilik, menukar kategori, serta menguruskan rekod cukai dan bangunan bagi setiap premis."
                            />
                            <MenuItem
                                icon={Tag}
                                label="Kategori Premis"
                                description="Menguruskan kategori premis seperti Rumah Kediaman, Kedai/Perniagaan, Homestay dan sebagainya. Kategori ini digunakan untuk mengklasifikasikan premis dan memadankan jadual kutipan sampah."
                            />
                            <MenuItem
                                icon={FileText}
                                label="Rekod Cukai Pintu"
                                description="Melihat semua rekod cukai dari semua premis dalam satu senarai. Boleh ditapis mengikut tahun dan status pembayaran (Sudah Bayar, Belum Bayar, Ada Tunggakan)."
                            />
                            <MenuItem
                                icon={Truck}
                                label="Jadual Kutipan Sampah"
                                description="Menguruskan jadual kutipan sampah mengikut kawasan, zon, jalan dan kategori premis. Jadual ini boleh dilihat oleh staf melalui profil premis."
                            />
                            <MenuItem
                                icon={ClipboardList}
                                label="Log Semakan"
                                description="Rekod audit yang mencatat setiap kali staf menyemak profil premis. Memaparkan nama staf, premis yang disemak, tarikh dan masa semakan."
                            />
                        </div>

                        <div className="mt-2 rounded-lg bg-muted/50 p-4">
                            <p className="mb-3 font-medium text-foreground">Cara menguruskan rekod cukai premis:</p>
                            <div className="space-y-2">
                                <Step number={1} text='Pergi ke menu "Premis" dan cari premis berkenaan.' />
                                <Step number={2} text='Klik ikon mata (👁) pada premis untuk membuka panel maklumat.' />
                                <Step number={3} text='Tatal ke bahagian "Rekod Cukai Pintu" dalam panel.' />
                                <Step number={4} text='Klik "Tambah Rekod" untuk menambah rekod cukai baharu, atau klik ikon pensil untuk mengemaskini rekod sedia ada.' />
                            </div>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <p className="mb-3 font-medium text-foreground">Cara menguruskan rekod bangunan premis:</p>
                            <div className="space-y-2">
                                <Step number={1} text='Buka panel premis seperti langkah di atas.' />
                                <Step number={2} text='Tatal ke bahagian "Rekod Bangunan".' />
                                <Step number={3} text='Kemaskini status penghantaran pelan dan status kelulusan mengikut perkembangan semasa.' />
                            </div>
                        </div>
                    </Section>
                )}

                {/* Staff manual */}
                <Section icon={User} title={isAdmin ? 'Panduan Staf' : 'Panduan Penggunaan'}>
                    <p className="font-medium text-foreground">Menu yang tersedia untuk Staf:</p>
                    <div className="space-y-4 pt-1">
                        <MenuItem
                            icon={Search}
                            label="Cari Premis"
                            description="Cari premis menggunakan kata kunci seperti nama pemilik, nama premis, nombor IC, nombor geran, alamat atau nombor telefon. Hasil carian akan memaparkan senarai premis yang sepadan."
                        />
                        <MenuItem
                            icon={BookOpen}
                            label="Profil Premis"
                            description='Klik "Lihat Profil" pada mana-mana premis dalam hasil carian untuk melihat maklumat lengkap — status cukai tahun semasa, rekod bangunan terkini, dan jadual kutipan sampah yang berkaitan.'
                        />
                    </div>

                    <div className="mt-2 rounded-lg bg-muted/50 p-4">
                        <p className="mb-3 font-medium text-foreground">Cara mencari dan menyemak premis:</p>
                        <div className="space-y-2">
                            <Step number={1} text='Pergi ke menu "Cari Premis".' />
                            <Step number={2} text='Masukkan kata kunci dalam kotak carian — boleh menggunakan nama pemilik, nama premis, no. IC, no. geran, alamat atau no. telefon.' />
                            <Step number={3} text='Klik butang "Cari" atau tekan Enter.' />
                            <Step number={4} text='Klik "Lihat Profil" pada premis yang dikehendaki untuk melihat maklumat lengkap.' />
                            <Step number={5} text='Semakan anda akan dicatat secara automatik sebagai rekod audit. Tiada tindakan tambahan diperlukan.' />
                        </div>
                    </div>

                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/30">
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">Peringatan</p>
                        <p className="mt-1 leading-relaxed text-yellow-700 dark:text-yellow-300">
                            Staf tidak dibenarkan mengubah sebarang maklumat dalam sistem. Sekiranya
                            terdapat kesilapan atau kemaskini diperlukan, sila hubungi pentadbir sistem.
                        </p>
                    </div>
                </Section>

                {/* Contact */}
                <Section icon={Info} title="Hubungi Pentadbir">
                    <p className="leading-relaxed">
                        Sekiranya anda menghadapi masalah teknikal, perlu kemaskini maklumat atau
                        memerlukan akaun baharu, sila hubungi pentadbir sistem anda.
                    </p>
                </Section>

            </div>
        </>
    );
}

Panduan.layout = {
    breadcrumbs: [
        { title: 'Panduan Pengguna', href: '/panduan' },
    ],
};
