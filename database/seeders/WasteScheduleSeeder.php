<?php

namespace Database\Seeders;

use App\Models\PremiseCategory;
use App\Models\WasteCollectionSchedule;
use Illuminate\Database\Seeder;

class WasteScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $residential = PremiseCategory::where('code', 'RES')->first();
        $commercial  = PremiseCategory::where('code', 'KOM')->first();

        $schedules = [
            [
                'area' => 'Taman Indah', 'zone' => 'A', 'road_name' => 'Jalan Mawar',
                'premise_category_id' => $residential?->id,
                'collection_day' => 'Isnin', 'collection_time' => '7:00 pagi',
                'notes' => 'Sila letakkan tong di tepi jalan sebelum 7 pagi.', 'status' => 'active',
            ],
            [
                'area' => 'Pusat Bandar', 'zone' => 'B', 'road_name' => 'Jalan Perdana',
                'premise_category_id' => $commercial?->id,
                'collection_day' => 'Selasa', 'collection_time' => '6:30 pagi',
                'notes' => 'Premis perniagaan — kutipan dua kali seminggu (Selasa & Jumaat).', 'status' => 'active',
            ],
            [
                'area' => 'Kampung Air', 'zone' => 'C', 'road_name' => 'Jalan Pantai',
                'premise_category_id' => null,
                'collection_day' => 'Rabu', 'collection_time' => '8:00 pagi',
                'notes' => null, 'status' => 'active',
            ],
        ];

        foreach ($schedules as $schedule) {
            WasteCollectionSchedule::updateOrCreate(
                ['area' => $schedule['area'], 'zone' => $schedule['zone']],
                $schedule
            );
        }
    }
}
