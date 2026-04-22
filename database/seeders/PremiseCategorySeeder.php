<?php

namespace Database\Seeders;

use App\Models\PremiseCategory;
use Illuminate\Database\Seeder;

class PremiseCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Rumah Kediaman',            'code' => 'RES'],
            ['name' => 'Kedai / Premis Perniagaan', 'code' => 'KOM'],
            ['name' => 'Homestay / Penginapan',     'code' => 'HOM'],
            ['name' => 'Chalet / Resort',           'code' => 'CHT'],
            ['name' => 'Industri / Bengkel',        'code' => 'IND'],
            ['name' => 'Pertanian / Ladang',        'code' => 'AGR'],
        ];

        foreach ($categories as $cat) {
            PremiseCategory::updateOrCreate(['code' => $cat['code']], $cat);
        }
    }
}
