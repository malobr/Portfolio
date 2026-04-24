<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LiveProject extends Model
{
    protected $fillable = [
        'slug', 'name', 'client', 'tagline', 'description', 'year',
        'role', 'category', 'live_url', 'repo_url', 'technologies',
        'problem', 'solution', 'features', 'results'
    ];

    protected $casts = [
        'tagline' => 'array',
        'description' => 'array',
        'category' => 'array',
        'role' => 'array',
        'problem' => 'array',
        'solution' => 'array',
        'technologies' => 'array',
        'features' => 'array',
        'results' => 'array'
    ];
}
