<?php

namespace Database\Seeders;

use App\Models\BuildingRecord;
use App\Models\CheckingLog;
use App\Models\Premise;
use App\Models\PremiseCategory;
use App\Models\TaxRecord;
use App\Models\User;
use Illuminate\Database\Seeder;

class PremiseSeeder extends Seeder
{
    public function run(): void
    {
        $res = PremiseCategory::where('code', 'RES')->first();
        $kom = PremiseCategory::where('code', 'KOM')->first();
        $hom = PremiseCategory::where('code', 'HOM')->first();
        $cht = PremiseCategory::where('code', 'CHT')->first();
        $ind = PremiseCategory::where('code', 'IND')->first();
        $agr = PremiseCategory::where('code', 'AGR')->first();

        $year  = now()->year;
        $year1 = $year - 1;
        $year2 = $year - 2;

        $premises = [

            // ── RUMAH KEDIAMAN ─────────────────────────────────────────────────

            [
                'cat' => $res, 'ic' => '840315-12-5021', 'grant' => 'NT-0421/RAN',
                'owner' => 'Simon Gunsanad bin Kibul',
                'name'  => null,
                'addr'  => 'No. 7, Kampung Tombovo, 89308 Ranau, Sabah',
                'phone' => '0168821001', 'zone' => 'Zon 4', 'area' => 'Kampung Tombovo',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 150.00, 150.00, now()->startOfYear()->addDays(20)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 150.00, 150.00, now()->subYear()->startOfYear()->addDays(35)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 120.00, 120.00, now()->subYears(2)->startOfYear()->addDays(15)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Sudah Lulus', '-3 months', '-1 month', 'Pelan bangunan sudah diluluskan.'],
            ],
            [
                'cat' => $res, 'ic' => '760820-12-3344', 'grant' => 'NT-0889/RAN',
                'owner' => 'Rosalind Ginuhon binti Ginsandol',
                'name'  => null,
                'addr'  => 'No. 14, Jalan Penampang Lama, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0134422011', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Belum Bayar Tahun Semasa', 180.00, null, null],
                    [$year1, 'Ada Tunggakan',            180.00, null, null],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '910512-12-6677', 'grant' => 'NT-1102/RAN',
                'owner' => 'Jeffrey Kulinting anak Tingang',
                'name'  => null,
                'addr'  => 'No. 3, Jalan Mesilou, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0198833451', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 160.00, 160.00, now()->startOfYear()->addDays(45)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 160.00, 160.00, now()->subYear()->startOfYear()->addDays(60)],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '880601-12-2213', 'grant' => 'NT-0774/RAN',
                'owner' => 'Florence Tangkau binti Ampal',
                'name'  => null,
                'addr'  => 'No. 22, Jalan Kaingaran, 89306 Ranau, Sabah',
                'phone' => '0112277889', 'zone' => 'Zon 4', 'area' => 'Kaingaran',
                'tax' => [
                    [$year,  'Ada Tunggakan', 140.00, null, null],
                    [$year1, 'Ada Tunggakan', 140.00, null, null],
                    [$year2, 'Ada Tunggakan', 120.00, null, null],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '720418-12-4455', 'grant' => 'NT-0310/RAN',
                'owner' => 'Benedict Gonsanad bin Langkob',
                'name'  => null,
                'addr'  => 'No. 8, Jalan Bundu Tuhan, 89309 Ranau, Sabah',
                'phone' => '0168890023', 'zone' => 'Zon 2', 'area' => 'Bundu Tuhan',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 155.00, 155.00, now()->startOfYear()->addDays(12)],
                ],
                'building' => ['Belum Hantar Pelan', 'Belum Diproses', null, null, null],
            ],
            [
                'cat' => $res, 'ic' => '951103-12-8890', 'grant' => 'NT-1456/RAN',
                'owner' => 'Christina Limbong anak Miking',
                'name'  => null,
                'addr'  => 'No. 5, Jalan Nalapak, 89307 Ranau, Sabah',
                'phone' => '0107723456', 'zone' => 'Zon 4', 'area' => 'Nalapak',
                'tax' => [
                    [$year,  'Belum Bayar Tahun Semasa', 135.00, null, null],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '830907-12-1122', 'grant' => 'NT-0612/RAN',
                'owner' => 'Patrick Ginsandol bin Rimbar',
                'name'  => null,
                'addr'  => 'No. 11, Jalan Poring, 89309 Ranau, Sabah',
                'phone' => '0198812345', 'zone' => 'Zon 3', 'area' => 'Poring',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 145.00, 145.00, now()->startOfYear()->addDays(30)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 145.00, 145.00, now()->subYear()->startOfYear()->addDays(22)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 130.00, 130.00, now()->subYears(2)->startOfYear()->addDays(18)],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '790214-12-3301', 'grant' => 'NT-0523/RAN',
                'owner' => 'Agnes Lunsing binti Ginting',
                'name'  => null,
                'addr'  => 'No. 19, Kampung Singgon, 89308 Ranau, Sabah',
                'phone' => '0134561234', 'zone' => 'Zon 4', 'area' => 'Kampung Singgon',
                'tax' => [
                    [$year,  'Ada Tunggakan', 140.00, null, null],
                    [$year1, 'Ada Tunggakan', 130.00, null, null],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '861225-12-7745', 'grant' => 'NT-0987/RAN',
                'owner' => 'Raymond Titing anak Surip',
                'name'  => null,
                'addr'  => 'No. 6, Kampung Luanti Baru, 89308 Ranau, Sabah',
                'phone' => '0178801234', 'zone' => 'Zon 4', 'area' => 'Luanti Baru',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 130.00, 130.00, now()->startOfYear()->addDays(50)],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '920801-12-5566', 'grant' => 'NT-1234/RAN',
                'owner' => 'Lorna Gonsanad binti Guntabid',
                'name'  => null,
                'addr'  => 'No. 2, Jalan Kibarambang, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0109923456', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 165.00, 165.00, now()->startOfYear()->addDays(25)],
                    [$year1, 'Ada Tunggakan',            160.00, null,   null],
                ],
                'building' => ['Sudah Hantar Pelan', 'Dalam Semakan', '-2 months', null, 'Pelan dikemukakan untuk semakan JKT.'],
            ],
            [
                'cat' => $res, 'ic' => '750330-12-9988', 'grant' => 'NT-0278/RAN',
                'owner' => 'Mohd Ridzuan bin Hamid',
                'name'  => null,
                'addr'  => 'No. 31, Jalan Penampang Lama, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0168845678', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 175.00, 175.00, now()->startOfYear()->addDays(10)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 170.00, 170.00, now()->subYear()->startOfYear()->addDays(14)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 165.00, 165.00, now()->subYears(2)->startOfYear()->addDays(8)],
                ],
                'building' => null,
            ],
            [
                'cat' => $res, 'ic' => '030610-12-4412', 'grant' => 'NT-1678/RAN',
                'owner' => 'Nurul Izzah binti Sabardin',
                'name'  => null,
                'addr'  => 'No. 9, Jalan Kaingaran, 89306 Ranau, Sabah',
                'phone' => '0112233445', 'zone' => 'Zon 4', 'area' => 'Kaingaran',
                'tax' => [
                    [$year, 'Belum Bayar Tahun Semasa', 140.00, null, null],
                ],
                'building' => null,
            ],

            // ── KEDAI / PERNIAGAAN ─────────────────────────────────────────────

            [
                'cat' => $kom, 'ic' => '680715-12-2233', 'grant' => 'TL-0056/RAN',
                'owner' => 'Lim Kim Huat',
                'name'  => 'Kedai Runcit Kim Huat',
                'addr'  => 'No. 5, Jalan Kibarambang, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0198834512', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 680.00, 680.00, now()->startOfYear()->addDays(15)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 650.00, 650.00, now()->subYear()->startOfYear()->addDays(20)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 620.00, 620.00, now()->subYears(2)->startOfYear()->addDays(12)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Sudah Lulus', '-6 months', '-4 months', 'Pelan pengubahsuaian premis.'],
            ],
            [
                'cat' => $kom, 'ic' => '820430-12-6601', 'grant' => 'TL-0112/RAN',
                'owner' => 'Mohd Faizal bin Salleh',
                'name'  => 'Restoran Selera Ranau',
                'addr'  => 'No. 12, Jalan Pasar Lama, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0138823456', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Ada Tunggakan',            750.00, null, null],
                    [$year1, 'Ada Tunggakan',            720.00, null, null],
                    [$year2, 'Sudah Bayar Tahun Semasa', 700.00, 700.00, now()->subYears(2)->startOfYear()->addDays(30)],
                ],
                'building' => null,
            ],
            [
                'cat' => $kom, 'ic' => '780901-12-4422', 'grant' => 'TL-0089/RAN',
                'owner' => 'Mary Ann Gonsanad binti Kibul',
                'name'  => 'Kedai Dobi & Laundry Kundasang',
                'addr'  => 'No. 3, Jalan Kundasang, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0119934567', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 520.00, 520.00, now()->startOfYear()->addDays(40)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 500.00, 500.00, now()->subYear()->startOfYear()->addDays(55)],
                ],
                'building' => null,
            ],
            [
                'cat' => $kom, 'ic' => '751204-12-8831', 'grant' => 'TL-0034/RAN',
                'owner' => 'Chen Wei Ming',
                'name'  => 'Farmasi Wei Ming Ranau',
                'addr'  => 'No. 8, Jalan Kibarambang, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0168877654', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 890.00, 890.00, now()->startOfYear()->addDays(7)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 860.00, 860.00, now()->subYear()->startOfYear()->addDays(10)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 830.00, 830.00, now()->subYears(2)->startOfYear()->addDays(9)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Sudah Lulus', '-12 months', '-10 months', 'Pengubahsuaian kaunter farmasi.'],
            ],
            [
                'cat' => $kom, 'ic' => '860210-12-3318', 'grant' => 'TL-0201/RAN',
                'owner' => 'Ramli bin Hj. Salleh',
                'name'  => 'Bengkel Kereta & Motor Ramli',
                'addr'  => 'No. 24, Jalan Penampang Lama, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0177789012', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Ada Tunggakan', 560.00, null, null],
                    [$year1, 'Ada Tunggakan', 540.00, null, null],
                ],
                'building' => ['Belum Hantar Pelan', 'Belum Diproses', null, null, null],
            ],
            [
                'cat' => $kom, 'ic' => '730505-12-7723', 'grant' => 'TL-0145/RAN',
                'owner' => 'Tommy Lim Chin Siong',
                'name'  => 'Tommy Elektrik & IT Ranau',
                'addr'  => 'No. 17, Jalan Kibarambang, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0198812233', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 720.00, 720.00, now()->startOfYear()->addDays(18)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 700.00, 700.00, now()->subYear()->startOfYear()->addDays(21)],
                ],
                'building' => null,
            ],
            [
                'cat' => $kom, 'ic' => '901118-12-5544', 'grant' => 'TL-0267/RAN',
                'owner' => 'Freddy Ginsandol bin Kulinting',
                'name'  => 'Minimarket Ginsandol Kundasang',
                'addr'  => 'No. 9, Jalan Mesilou, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0139923456', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 640.00, 640.00, now()->startOfYear()->addDays(33)],
                    [$year1, 'Ada Tunggakan',            620.00, null,   null],
                ],
                'building' => ['Sudah Hantar Pelan', 'Dalam Semakan', '-1 month', null, 'Permohonan penambahan ruang niaga.'],
            ],
            [
                'cat' => $kom, 'ic' => '880620-12-1199', 'grant' => 'TL-0318/RAN',
                'owner' => 'Stella Tangkau binti Ampal',
                'name'  => 'Restoran Dusun Kitchen',
                'addr'  => 'No. 6, Jalan Kundasang, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0107734567', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 580.00, 580.00, now()->startOfYear()->addDays(22)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 560.00, 560.00, now()->subYear()->startOfYear()->addDays(28)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 540.00, 540.00, now()->subYears(2)->startOfYear()->addDays(25)],
                ],
                'building' => null,
            ],
            [
                'cat' => $kom, 'ic' => '690815-12-4489', 'grant' => 'TL-0021/RAN',
                'owner' => 'Tan Siew Eng',
                'name'  => 'Kedai Emas Tan Siew Eng',
                'addr'  => 'No. 2, Jalan Pasar Lama, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0168867890', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 1100.00, 1100.00, now()->startOfYear()->addDays(5)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 1050.00, 1050.00, now()->subYear()->startOfYear()->addDays(7)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 1000.00, 1000.00, now()->subYears(2)->startOfYear()->addDays(6)],
                ],
                'building' => null,
            ],
            [
                'cat' => $kom, 'ic' => '810325-12-7712', 'grant' => 'TL-0178/RAN',
                'owner' => 'Rohani binti Hamid',
                'name'  => 'Butik Rohani Fashion',
                'addr'  => 'No. 15, Jalan Kibarambang, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0138856789', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Belum Bayar Tahun Semasa', 610.00, null, null],
                    [$year1, 'Sudah Bayar Tahun Semasa', 590.00, 590.00, now()->subYear()->startOfYear()->addDays(42)],
                ],
                'building' => null,
            ],
            [
                'cat' => $kom, 'ic' => '771020-12-3345', 'grant' => 'TL-0099/RAN',
                'owner' => 'Mohd Azlan bin Darus',
                'name'  => 'Hardware Store Ranau',
                'addr'  => 'No. 28, Jalan Penampang Lama, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0177745678', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 780.00, 780.00, now()->startOfYear()->addDays(17)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 760.00, 760.00, now()->subYear()->startOfYear()->addDays(19)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Sudah Lulus', '-8 months', '-6 months', 'Tambahan stor di bahagian belakang kedai.'],
            ],
            [
                'cat' => $kom, 'ic' => '940715-12-6623', 'grant' => 'TL-0391/RAN',
                'owner' => 'Dayang Norsyafiqah binti Awang',
                'name'  => 'Kafe Sinar Pagi Ranau',
                'addr'  => 'No. 11, Jalan Pasar Lama, Pekan Ranau, 89300 Ranau, Sabah',
                'phone' => '0109912345', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 490.00, 490.00, now()->startOfYear()->addDays(28)],
                ],
                'building' => null,
            ],

            // ── HOMESTAY / PENGINAPAN ──────────────────────────────────────────

            [
                'cat' => $hom, 'ic' => '820614-12-8801', 'grant' => 'CL-0341/RAN',
                'owner' => 'Nordin bin Tulis',
                'name'  => 'Kundasang Valley Homestay',
                'addr'  => 'No. 1, Jalan Mesilou, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0199934521', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 420.00, 420.00, now()->startOfYear()->addDays(25)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 400.00, 400.00, now()->subYear()->startOfYear()->addDays(30)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 380.00, 380.00, now()->subYears(2)->startOfYear()->addDays(28)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Sudah Lulus', '-18 months', '-15 months', 'Pembinaan chalet tambahan.'],
            ],
            [
                'cat' => $hom, 'ic' => '851130-12-2277', 'grant' => 'CL-0289/RAN',
                'owner' => 'Linda Kulinting binti Ginting',
                'name'  => 'Mountain View Guesthouse Ranau',
                'addr'  => 'No. 4, Jalan Kinabalu Park, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0178823456', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Ada Tunggakan', 380.00, null, null],
                    [$year1, 'Ada Tunggakan', 360.00, null, null],
                ],
                'building' => ['Sudah Hantar Pelan', 'Dalam Semakan', '-4 months', null, 'Permohonan bangunan baharu dikemukakan.'],
            ],
            [
                'cat' => $hom, 'ic' => '780912-12-9944', 'grant' => 'CL-0198/RAN',
                'owner' => 'Samuel Ginsandol bin Rimbar',
                'name'  => 'Poring Jungle Homestay',
                'addr'  => 'No. 7, Jalan Poring, 89309 Ranau, Sabah',
                'phone' => '0138890123', 'zone' => 'Zon 3', 'area' => 'Poring',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 350.00, 350.00, now()->startOfYear()->addDays(35)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 330.00, 330.00, now()->subYear()->startOfYear()->addDays(40)],
                ],
                'building' => null,
            ],
            [
                'cat' => $hom, 'ic' => '920302-12-1134', 'grant' => 'CL-0422/RAN',
                'owner' => 'Grace Lunsing binti Ampal',
                'name'  => 'Ranau Highland Homestay',
                'addr'  => 'No. 16, Jalan Kundasang, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0109901234', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 360.00, 360.00, now()->startOfYear()->addDays(20)],
                ],
                'building' => null,
            ],

            // ── CHALET / RESORT ────────────────────────────────────────────────

            [
                'cat' => $cht, 'ic' => '761108-12-5512', 'grant' => 'CL-0067/RAN',
                'owner' => 'Peter Gonsanad bin Langkob',
                'name'  => 'Kinabalu Pine Resort',
                'addr'  => 'Lot 5, Jalan Kinabalu Park, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0168856789', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 1800.00, 1800.00, now()->startOfYear()->addDays(8)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 1750.00, 1750.00, now()->subYear()->startOfYear()->addDays(10)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 1700.00, 1700.00, now()->subYears(2)->startOfYear()->addDays(7)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Sudah Lulus', '-24 months', '-20 months', 'Pembinaan 10 unit chalet baharu telah diluluskan.'],
            ],
            [
                'cat' => $cht, 'ic' => '810719-12-4478', 'grant' => 'CL-0134/RAN',
                'owner' => 'Wong Kok Leong',
                'name'  => 'Sabah Highland Retreat',
                'addr'  => 'Lot 12, Jalan Mesilou, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0198845678', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Ada Tunggakan',            1600.00, null,    null],
                    [$year1, 'Ada Tunggakan',            1550.00, null,    null],
                    [$year2, 'Sudah Bayar Tahun Semasa', 1500.00, 1500.00, now()->subYears(2)->startOfYear()->addDays(15)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Ditolak', '-5 months', '-3 months', 'Pelan ditolak — perlu pindaan mengikut garis panduan JTBN.'],
            ],
            [
                'cat' => $cht, 'ic' => '870404-12-3356', 'grant' => 'CL-0256/RAN',
                'owner' => 'Mohd Razif bin Daud',
                'name'  => 'Ranau Eco Chalet & Campsite',
                'addr'  => 'Lot 3, Jalan Poring, 89309 Ranau, Sabah',
                'phone' => '0177812345', 'zone' => 'Zon 3', 'area' => 'Poring',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 1200.00, 1200.00, now()->startOfYear()->addDays(12)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 1150.00, 1150.00, now()->subYear()->startOfYear()->addDays(14)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Dalam Semakan', '-2 months', null, 'Permohonan tapak perkhemahan baharu.'],
            ],

            // ── INDUSTRI / BENGKEL ─────────────────────────────────────────────

            [
                'cat' => $ind, 'ic' => '790623-12-7744', 'grant' => 'CL-0078/RAN',
                'owner' => 'Mohd Zaidi bin Othman',
                'name'  => 'Kilang Ais Ranau Sejuk',
                'addr'  => 'Lot 8, Kawasan Perindustrian Ranau, 89300 Ranau, Sabah',
                'phone' => '0168834567', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 1450.00, 1450.00, now()->startOfYear()->addDays(10)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 1400.00, 1400.00, now()->subYear()->startOfYear()->addDays(12)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 1350.00, 1350.00, now()->subYears(2)->startOfYear()->addDays(9)],
                ],
                'building' => ['Sudah Hantar Pelan', 'Sudah Lulus', '-30 months', '-27 months', 'Perluasan kapasiti pengeluaran ais.'],
            ],
            [
                'cat' => $ind, 'ic' => '840929-12-2211', 'grant' => 'CL-0145/RAN',
                'owner' => 'Alex Wong Shan Shan',
                'name'  => 'Bengkel Fabrikasi Besi Ranau',
                'addr'  => 'Lot 14, Kawasan Perindustrian Ranau, 89300 Ranau, Sabah',
                'phone' => '0199878901', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Ada Tunggakan', 1800.00, null, null],
                    [$year1, 'Ada Tunggakan', 1750.00, null, null],
                ],
                'building' => ['Sudah Hantar Pelan', 'Dalam Semakan', '-3 months', null, 'Permohonan gudang simpanan bahan.'],
            ],
            [
                'cat' => $ind, 'ic' => '870112-12-6634', 'grant' => 'CL-0223/RAN',
                'owner' => 'Siti Rahmah binti Khalid',
                'name'  => 'Gudang Simpanan SRK Ranau',
                'addr'  => 'Lot 6, Kawasan Perindustrian Ranau, 89300 Ranau, Sabah',
                'phone' => '0138867890', 'zone' => 'Zon 1', 'area' => 'Pekan Ranau',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 1100.00, 1100.00, now()->startOfYear()->addDays(20)],
                ],
                'building' => null,
            ],

            // ── PERTANIAN / LADANG ─────────────────────────────────────────────

            [
                'cat' => $agr, 'ic' => '651015-12-3388', 'grant' => 'FR-0056/RAN',
                'owner' => 'Bernard Ginuhon bin Gonsanad',
                'name'  => 'Ladang Sayur Organik Kundasang',
                'addr'  => 'Lot 3, Jalan Mesilou, Kundasang, 89309 Ranau, Sabah',
                'phone' => '0168812345', 'zone' => 'Zon 2', 'area' => 'Kundasang',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 180.00, 180.00, now()->startOfYear()->addDays(45)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 160.00, 160.00, now()->subYear()->startOfYear()->addDays(50)],
                    [$year2, 'Sudah Bayar Tahun Semasa', 150.00, 150.00, now()->subYears(2)->startOfYear()->addDays(42)],
                ],
                'building' => null,
            ],
            [
                'cat' => $agr, 'ic' => '710820-12-7766', 'grant' => 'FR-0112/RAN',
                'owner' => 'Andrew Titing bin Surip',
                'name'  => 'Ladang Cili & Tomato Ranau',
                'addr'  => 'Lot 9, Jalan Nalapak, 89307 Ranau, Sabah',
                'phone' => '0177756789', 'zone' => 'Zon 4', 'area' => 'Nalapak',
                'tax' => [
                    [$year,  'Belum Bayar Tahun Semasa', 160.00, null, null],
                    [$year1, 'Ada Tunggakan',            150.00, null, null],
                ],
                'building' => null,
            ],
            [
                'cat' => $agr, 'ic' => '690505-12-5523', 'grant' => 'FR-0034/RAN',
                'owner' => 'Philip Tangkau bin Kulinting',
                'name'  => 'Ladang Kentang Nalapak',
                'addr'  => 'Lot 2, Nalapak, 89307 Ranau, Sabah',
                'phone' => '0198823456', 'zone' => 'Zon 4', 'area' => 'Nalapak',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 140.00, 140.00, now()->startOfYear()->addDays(60)],
                    [$year1, 'Sudah Bayar Tahun Semasa', 130.00, 130.00, now()->subYear()->startOfYear()->addDays(65)],
                ],
                'building' => null,
            ],
            [
                'cat' => $agr, 'ic' => '750310-12-4499', 'grant' => 'FR-0089/RAN',
                'owner' => 'John Gonsanad bin Limbong',
                'name'  => 'Tanah Pertanian Bundu Tuhan',
                'addr'  => 'Lot 7, Jalan Bundu Tuhan, 89309 Ranau, Sabah',
                'phone' => '0138812345', 'zone' => 'Zon 2', 'area' => 'Bundu Tuhan',
                'tax' => [
                    [$year,  'Sudah Bayar Tahun Semasa', 170.00, 170.00, now()->startOfYear()->addDays(38)],
                ],
                'building' => null,
            ],
            [
                'cat' => $agr, 'ic' => '820808-12-6612', 'grant' => 'FR-0178/RAN',
                'owner' => 'Zainuddin bin Mohd Noor',
                'name'  => 'Kebun Buah-buahan Kaingaran',
                'addr'  => 'Lot 11, Jalan Kaingaran, 89306 Ranau, Sabah',
                'phone' => '0168845671', 'zone' => 'Zon 4', 'area' => 'Kaingaran',
                'tax' => [
                    [$year,  'Ada Tunggakan', 150.00, null, null],
                ],
                'building' => null,
            ],
        ];

        foreach ($premises as $data) {
            $premise = Premise::updateOrCreate(
                ['ic_number' => $data['ic']],
                [
                    'premise_category_id' => $data['cat']?->id,
                    'owner_name'          => $data['owner'],
                    'premise_name'        => $data['name'],
                    'grant_number'        => $data['grant'],
                    'ic_number'           => $data['ic'],
                    'mailing_address'     => $data['addr'],
                    'phone_number'        => $data['phone'],
                    'zone'                => $data['zone'],
                    'area'                => $data['area'],
                    'status'              => 'active',
                ]
            );

            foreach ($data['tax'] as [$taxYear, $status, $due, $paid, $date]) {
                TaxRecord::updateOrCreate(
                    ['premise_id' => $premise->id, 'tax_year' => $taxYear],
                    [
                        'payment_status' => $status,
                        'amount_due'     => $due,
                        'amount_paid'    => $paid,
                        'payment_date'   => $date ? $date->toDateString() : null,
                    ]
                );
            }

            if ($data['building']) {
                [$subStatus, $appStatus, $subOffset, $appOffset, $remarks] = $data['building'];
                BuildingRecord::updateOrCreate(
                    ['premise_id' => $premise->id],
                    [
                        'submission_status' => $subStatus,
                        'approval_status'   => $appStatus,
                        'submission_date'   => $subOffset ? now()->modify($subOffset . ' months')->toDateString() : null,
                        'approval_date'     => $appOffset ? now()->modify($appOffset . ' months')->toDateString() : null,
                        'remarks'           => $remarks,
                    ]
                );
            }
        }

        // ── Checking logs ────────────────────────────────────────────────────
        $staffUsers = User::where('role', 'staff')->get();
        if ($staffUsers->isNotEmpty()) {
            $allPremises = Premise::all();
            foreach ($staffUsers as $staff) {
                $sample = $allPremises->random(min(10, $allPremises->count()));
                foreach ($sample as $i => $premise) {
                    CheckingLog::create([
                        'user_id'    => $staff->id,
                        'premise_id' => $premise->id,
                        'checked_at' => now()->subDays(rand(1, 60))->subMinutes(rand(0, 1440)),
                        'remarks'    => null,
                    ]);
                }
            }
        }
    }
}
