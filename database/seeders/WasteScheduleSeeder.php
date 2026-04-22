<?php

namespace Database\Seeders;

use App\Models\PremiseCategory;
use App\Models\WasteCollectionSchedule;
use Illuminate\Database\Seeder;

class WasteScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $res = PremiseCategory::where('code', 'RES')->first();
        $kom = PremiseCategory::where('code', 'KOM')->first();
        $hom = PremiseCategory::where('code', 'HOM')->first();
        $cht = PremiseCategory::where('code', 'CHT')->first();

        $schedules = [
            // ── Pekan Ranau ───────────────────────────────────────────────────
            [
                'area' => 'Pekan Ranau', 'zone' => 'Zon 1',
                'road_name' => 'Jalan Kibarambang',
                'premise_category_id' => $kom?->id,
                'collection_day' => 'Isnin', 'collection_time' => '6:30 pagi',
                'notes' => 'Kutipan dua kali seminggu (Isnin & Khamis) untuk kawasan perniagaan.',
                'status' => 'active',
            ],
            [
                'area' => 'Pekan Ranau', 'zone' => 'Zon 1',
                'road_name' => 'Jalan Penampang Lama',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Selasa', 'collection_time' => '7:00 pagi',
                'notes' => 'Sila letakkan tong sampah di tepi jalan sebelum 7 pagi.',
                'status' => 'active',
            ],
            [
                'area' => 'Pekan Ranau', 'zone' => 'Zon 1',
                'road_name' => 'Jalan Pasar Lama',
                'premise_category_id' => $kom?->id,
                'collection_day' => 'Khamis', 'collection_time' => '6:30 pagi',
                'notes' => null,
                'status' => 'active',
            ],

            // ── Kundasang ─────────────────────────────────────────────────────
            [
                'area' => 'Kundasang', 'zone' => 'Zon 2',
                'road_name' => 'Jalan Kundasang',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Rabu', 'collection_time' => '7:30 pagi',
                'notes' => 'Kawasan tanah tinggi — kenderaan besar tidak boleh masuk lorong sempit.',
                'status' => 'active',
            ],
            [
                'area' => 'Kundasang', 'zone' => 'Zon 2',
                'road_name' => 'Jalan Mesilou',
                'premise_category_id' => $hom?->id,
                'collection_day' => 'Jumaat', 'collection_time' => '7:00 pagi',
                'notes' => 'Kawasan homestay dan chalet pelancongan.',
                'status' => 'active',
            ],
            [
                'area' => 'Kundasang', 'zone' => 'Zon 2',
                'road_name' => 'Jalan Kinabalu Park',
                'premise_category_id' => $cht?->id,
                'collection_day' => 'Sabtu', 'collection_time' => '7:00 pagi',
                'notes' => 'Resort dan chalet berhampiran Taman Negara Kinabalu.',
                'status' => 'active',
            ],

            // ── Poring ────────────────────────────────────────────────────────
            [
                'area' => 'Poring', 'zone' => 'Zon 3',
                'road_name' => 'Jalan Poring',
                'premise_category_id' => null,
                'collection_day' => 'Rabu', 'collection_time' => '8:00 pagi',
                'notes' => 'Kawasan pelancongan Poring Hot Springs.',
                'status' => 'active',
            ],

            // ── Kaingaran ─────────────────────────────────────────────────────
            [
                'area' => 'Kaingaran', 'zone' => 'Zon 4',
                'road_name' => 'Jalan Kaingaran',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Khamis', 'collection_time' => '8:00 pagi',
                'notes' => null,
                'status' => 'active',
            ],

            // ── Nalapak ───────────────────────────────────────────────────────
            [
                'area' => 'Nalapak', 'zone' => 'Zon 4',
                'road_name' => 'Jalan Nalapak',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Sabtu', 'collection_time' => '8:30 pagi',
                'notes' => 'Kawasan luar bandar — jadual mungkin berubah bergantung cuaca.',
                'status' => 'active',
            ],

            // ── Bundu Tuhan ───────────────────────────────────────────────────
            [
                'area' => 'Bundu Tuhan', 'zone' => 'Zon 2',
                'road_name' => 'Jalan Bundu Tuhan',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Isnin', 'collection_time' => '8:00 pagi',
                'notes' => null,
                'status' => 'active',
            ],

            // ── Kampung Tombovo ───────────────────────────────────────────────
            [
                'area' => 'Kampung Tombovo', 'zone' => 'Zon 4',
                'road_name' => 'Jalan Tombovo',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Jumaat', 'collection_time' => '8:00 pagi',
                'notes' => null,
                'status' => 'active',
            ],

            // ── Luanti Baru ───────────────────────────────────────────────────
            [
                'area' => 'Luanti Baru', 'zone' => 'Zon 4',
                'road_name' => 'Jalan Luanti',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Sabtu', 'collection_time' => '9:00 pagi',
                'notes' => 'Kawasan pedalaman — akses terhad.',
                'status' => 'active',
            ],

            // ── Kampung Singgon ───────────────────────────────────────────────
            [
                'area' => 'Kampung Singgon', 'zone' => 'Zon 4',
                'road_name' => 'Jalan Singgon',
                'premise_category_id' => $res?->id,
                'collection_day' => 'Selasa', 'collection_time' => '8:30 pagi',
                'notes' => null,
                'status' => 'active',
            ],
        ];

        foreach ($schedules as $s) {
            WasteCollectionSchedule::updateOrCreate(
                ['area' => $s['area'], 'zone' => $s['zone'], 'road_name' => $s['road_name']],
                $s
            );
        }
    }
}
