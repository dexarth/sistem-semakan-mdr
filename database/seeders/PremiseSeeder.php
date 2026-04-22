<?php

namespace Database\Seeders;

use App\Models\BuildingRecord;
use App\Models\Premise;
use App\Models\PremiseCategory;
use App\Models\TaxRecord;
use Illuminate\Database\Seeder;

class PremiseSeeder extends Seeder
{
    public function run(): void
    {
        $residential = PremiseCategory::where('code', 'RES')->first();
        $commercial  = PremiseCategory::where('code', 'KOM')->first();
        $homestay    = PremiseCategory::where('code', 'HOM')->first();

        // Sample 1 — Residential, tax paid
        $p1 = Premise::updateOrCreate(
            ['ic_number' => '850101-14-1234'],
            [
                'premise_category_id' => $residential->id,
                'owner_name'          => 'Ahmad bin Ali',
                'premise_name'        => null,
                'grant_number'        => 'GM-1234/2005',
                'mailing_address'     => 'No. 12, Jalan Mawar, Taman Indah, 87000 Labuan',
                'phone_number'        => '0148881234',
                'zone'                => 'A',
                'area'                => 'Taman Indah',
                'status'              => 'active',
            ]
        );
        TaxRecord::updateOrCreate(
            ['premise_id' => $p1->id, 'tax_year' => now()->year],
            ['payment_status' => 'Sudah Bayar Tahun Semasa', 'amount_due' => 180.00, 'amount_paid' => 180.00, 'payment_date' => now()->startOfYear()->addMonths(1)]
        );

        // Sample 2 — Commercial, tax unpaid
        $p2 = Premise::updateOrCreate(
            ['ic_number' => '780512-12-5678'],
            [
                'premise_category_id' => $commercial->id,
                'owner_name'          => 'Siti Aminah binti Hassan',
                'premise_name'        => 'Kedai Runcit Siti',
                'grant_number'        => 'GM-5678/2010',
                'mailing_address'     => 'No. 3, Jalan Perdana, Pusat Bandar, 87000 Labuan',
                'phone_number'        => '0167776543',
                'zone'                => 'B',
                'area'                => 'Pusat Bandar',
                'status'              => 'active',
            ]
        );
        TaxRecord::updateOrCreate(
            ['premise_id' => $p2->id, 'tax_year' => now()->year],
            ['payment_status' => 'Belum Bayar Tahun Semasa', 'amount_due' => 560.00, 'amount_paid' => null, 'payment_date' => null]
        );
        TaxRecord::updateOrCreate(
            ['premise_id' => $p2->id, 'tax_year' => now()->year - 1],
            ['payment_status' => 'Ada Tunggakan', 'amount_due' => 560.00, 'amount_paid' => null]
        );

        // Sample 3 — Homestay, building plan submitted
        $p3 = Premise::updateOrCreate(
            ['ic_number' => '900225-15-9012'],
            [
                'premise_category_id' => $homestay->id,
                'owner_name'          => 'Mohd Razif bin Daud',
                'premise_name'        => 'Labuan Seaview Homestay',
                'grant_number'        => 'GM-9012/2018',
                'mailing_address'     => 'No. 88, Jalan Pantai, Kampung Air, 87010 Labuan',
                'phone_number'        => '0199991234',
                'zone'                => 'C',
                'area'                => 'Kampung Air',
                'status'              => 'active',
            ]
        );
        TaxRecord::updateOrCreate(
            ['premise_id' => $p3->id, 'tax_year' => now()->year],
            ['payment_status' => 'Sudah Bayar Tahun Semasa', 'amount_due' => 320.00, 'amount_paid' => 320.00, 'payment_date' => now()->startOfYear()->addMonth()]
        );
        BuildingRecord::updateOrCreate(
            ['premise_id' => $p3->id],
            ['submission_status' => 'Sudah Hantar Pelan', 'approval_status' => 'Dalam Semakan', 'submission_date' => now()->subMonths(3)->toDateString(), 'remarks' => 'Pelan dikemukakan kepada Jabatan Perancangan']
        );
    }
}
