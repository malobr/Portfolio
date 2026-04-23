<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database documentation.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'marcelotc1202@gmail.com'],
            [
                'name' => 'Admin Malobr',
                'password' => Hash::make('Admin@malobr!#'),
                'phone' => '+5541987115697',
            ]
        );
    }
}
