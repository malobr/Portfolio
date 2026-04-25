<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = $request->path();
        
        // Don't track admin or api requests
        if (!str_starts_with($path, 'admin') && !str_starts_with($path, 'api') && !str_starts_with($path, 'login')) {
            /*
            \App\Models\Visit::create([
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'page_url' => $request->fullUrl(),
            ]);
            */
        }

        return $next($request);
    }
}
