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
        'technologies' => 'array',
        'features' => 'array',
        'results' => 'array'
    ];
}
