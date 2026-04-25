<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Sanitize projects table
        DB::statement('UPDATE projects SET tagline = JSON_QUOTE(tagline) WHERE tagline IS NOT NULL');
        DB::statement('UPDATE projects SET description = JSON_QUOTE(description) WHERE description IS NOT NULL');
        DB::statement('UPDATE projects SET problem = JSON_QUOTE(problem) WHERE problem IS NOT NULL');
        DB::statement('UPDATE projects SET solution = JSON_QUOTE(solution) WHERE solution IS NOT NULL');
        DB::statement('UPDATE projects SET category = JSON_QUOTE(category) WHERE category IS NOT NULL');
        DB::statement('UPDATE projects SET role = JSON_QUOTE(role) WHERE role IS NOT NULL');

        Schema::table('projects', function (Blueprint $blueprint) {
            $blueprint->json('tagline')->change();
            $blueprint->json('description')->change();
            $blueprint->json('problem')->change();
            $blueprint->json('solution')->change();
            $blueprint->json('category')->nullable()->change();
            $blueprint->json('role')->nullable()->change();
        });

        // Sanitize live_projects table
        DB::statement('UPDATE live_projects SET tagline = JSON_QUOTE(tagline) WHERE tagline IS NOT NULL');
        DB::statement('UPDATE live_projects SET description = JSON_QUOTE(description) WHERE description IS NOT NULL');
        DB::statement('UPDATE live_projects SET problem = JSON_QUOTE(problem) WHERE problem IS NOT NULL');
        DB::statement('UPDATE live_projects SET solution = JSON_QUOTE(solution) WHERE solution IS NOT NULL');
        DB::statement('UPDATE live_projects SET category = JSON_QUOTE(category) WHERE category IS NOT NULL');
        DB::statement('UPDATE live_projects SET role = JSON_QUOTE(role) WHERE role IS NOT NULL');

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
