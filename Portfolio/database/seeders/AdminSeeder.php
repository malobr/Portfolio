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
            ['email' => 'admin@malobr.com'],
            [
                'name' => 'Admin Malobr',
                'password' => Hash::make('Admin@Strong123!#'),
            ]
        );
    }
}
