<?php

namespace Database\Seeders;

use App\Models\PremiseCategory;
use Illuminate\Database\Seeder;

class PremiseCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Rumah Kediaman', 'code' => 'RES'],
            ['name' => 'Kedai / Premis Perniagaan', 'code' => 'KOM'],
            ['name' => 'Homestay / Penginapan', 'code' => 'HOM'],
            ['name' => 'Industri', 'code' => 'IND'],
        ];

        foreach ($categories as $cat) {
            PremiseCategory::updateOrCreate(['code' => $cat['code']], $cat);
        }
    }
}
