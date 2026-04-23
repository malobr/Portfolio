<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('live_projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('client');
            $table->string('tagline');
            $table->text('description');
            $table->string('year');
            $table->string('role');
            $table->string('category');
            $table->string('live_url');
            $table->string('repo_url')->nullable();
            $table->json('technologies')->nullable();
            $table->text('problem');
            $table->text('solution');
            $table->json('features')->nullable();
            $table->json('results')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_projects');
    }
};
