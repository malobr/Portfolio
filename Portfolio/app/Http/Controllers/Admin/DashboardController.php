<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visit;
use App\Models\Project;
use App\Models\LiveProject;
use App\Models\Post;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalVisits = Visit::count();
        $uniqueVisitors = Visit::distinct('ip_address')->count();
        $visitsToday = Visit::whereDate('created_at', Carbon::today())->count();
        
        // Get visits for the last 7 days for a chart
        $chartData = Visit::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'total_visits' => $totalVisits,
            'unique_visitors' => $uniqueVisitors,
            'visits_today' => $visitsToday,
            'chart_data' => $chartData,
            'counts' => [
                'projects' => Project::count(),
                'live_projects' => LiveProject::count(),
                'posts' => Post::count(),
            ]
        ]);
    }
}
