<?php
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\StatsController;
use Illuminate\Support\Facades\Route;

Route::post('/search', [DestinationController::class, 'search']);
Route::get('/destinations/{id}', [DestinationController::class, 'show']);
Route::get('/compare', [DestinationController::class, 'compare']);
Route::get('/stats', [StatsController::class, 'index']);
Route::post('/visit', [StatsController::class, 'recordVisit']);