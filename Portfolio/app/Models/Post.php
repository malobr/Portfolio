<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'content',
        'publish_date',
        'read_time',
        'tags',
        'status'
    ];

    protected $casts = [
        'title' => 'array',
        'excerpt' => 'array',
        'content' => 'array',
        'tags' => 'array'
    ];
}
