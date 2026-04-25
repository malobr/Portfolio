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
        Schema::table('projects', function (Blueprint $blueprint) {
            $blueprint->json('tagline')->change();
            $blueprint->json('description')->change();
            $blueprint->json('problem')->change();
            $blueprint->json('solution')->change();
            $blueprint->json('category')->nullable()->change();
            $blueprint->json('role')->nullable()->change();
        });

        Schema::table('live_projects', function (Blueprint $blueprint) {
            $blueprint->json('tagline')->change();
            $blueprint->json('description')->change();
            $blueprint->json('problem')->change();
            $blueprint->json('solution')->change();
            $blueprint->json('category')->nullable()->change();
            $blueprint->json('role')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $blueprint) {
            $blueprint->text('tagline')->change();
            $blueprint->text('description')->change();
            $blueprint->text('problem')->change();
            $blueprint->text('solution')->change();
            $blueprint->string('category')->change();
            $blueprint->string('role')->change();
        });

        Schema::table('live_projects', function (Blueprint $blueprint) {
            $blueprint->text('tagline')->change();
            $blueprint->text('description')->change();
            $blueprint->text('problem')->change();
            $blueprint->text('solution')->change();
            $blueprint->string('category')->change();
            $blueprint->string('role')->change();
        });
    }
};
