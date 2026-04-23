<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'slug', 'name', 'year', 'language', 'category', 'tagline',
        'description', 'role', 'repo_url', 'technologies',
        'problem', 'solution', 'features'
    ];

    protected $casts = [
        'technologies' => 'array',
        'features' => 'array'
    ];
}
