<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            // Admins
            [
                'name' => 'Pentadbir Sistem', 'email' => 'admin@example.com',
                'role' => 'admin',
            ],
            [
                'name' => 'Norhaslinda binti Mohd Sani', 'email' => 'haslinda@mdr.gov.my',
                'role' => 'admin',
            ],

            // Staff
            [
                'name' => 'Staff Demo', 'email' => 'staff@example.com',
                'role' => 'staff',
            ],
            [
                'name' => 'Rizal bin Amiruddin', 'email' => 'rizal@mdr.gov.my',
                'role' => 'staff',
            ],
            [
                'name' => 'Josephine Ginsandol', 'email' => 'josephine@mdr.gov.my',
                'role' => 'staff',
            ],
            [
                'name' => 'Hairul Nizam bin Saad', 'email' => 'hairul@mdr.gov.my',
                'role' => 'staff',
            ],
        ];

        foreach ($users as $u) {
            User::updateOrCreate(
                ['email' => $u['email']],
                [
                    'name'              => $u['name'],
                    'password'          => Hash::make('password'),
                    'role'              => $u['role'],
                    'email_verified_at' => now(),
                ]
            );
        }

        $this->call([
            PremiseCategorySeeder::class,
            WasteScheduleSeeder::class,
            PremiseSeeder::class,
        ]);
    }
}
