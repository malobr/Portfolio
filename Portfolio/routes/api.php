<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LiveProjectController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ContactController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/verify-mfa', [AuthController::class, 'verifyMfa'])->middleware('throttle:10,1');
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/check-auth', [AuthController::class, 'check']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/slug/{slug}', [ProjectController::class, 'showBySlug']);

Route::get('/live-projects', [LiveProjectController::class, 'index']);
Route::get('/live-projects/slug/{slug}', [LiveProjectController::class, 'showBySlug']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/slug/{slug}', [PostController::class, 'getBySlug']);

Route::post('/contact/send', [ContactController::class, 'send']);

use App\Http\Controllers\Admin\DashboardController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    Route::post('/live-projects', [LiveProjectController::class, 'store']);
    Route::put('/live-projects/{live_project}', [LiveProjectController::class, 'update']);
    Route::delete('/live-projects/{live_project}', [LiveProjectController::class, 'destroy']);

    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
});
