<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'slug', 'name', 'year', 'language', 'category', 'tagline',
        'description', 'role', 'repo_url', 'technologies',
        'problem', 'solution', 'features', 'is_visible'
    ];

    protected $casts = [
        'tagline' => 'array',
        'description' => 'array',
        'category' => 'array',
        'role' => 'array',
        'problem' => 'array',
        'solution' => 'array',
        'technologies' => 'array',
        'features' => 'array'
    ];
}
