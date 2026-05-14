<?php
namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\Search;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function recordVisit(Request $request)
    {
        $ip   = $request->ip();
        $hash = hash('sha256', $ip);

        Visit::create([
            'ip_hash'    => $hash,
            'visited_at' => now(),
        ]);

        return response()->json(['ok' => true]);
    }

    public function index()
    {
        // total visits
        $total = Visit::count();

        // unique visitors in last 60 minutes
        $unique = Visit::where('visited_at', '>=', now()->subMinutes(60))
            ->distinct('ip_hash')
            ->count('ip_hash');

        // visits by time of day
        $byHour = Visit::selectRaw('HOUR(visited_at) as hour, COUNT(*) as count')
            ->groupBy('hour')
            ->get();

        $timeSlots = [
            '6-15'  => 0,
            '15-21' => 0,
            '21-24' => 0,
            '0-6'   => 0,
        ];
        foreach ($byHour as $row) {
            $h = $row->hour;
            if ($h >= 6 && $h < 15)       $timeSlots['6-15']  += $row->count;
            elseif ($h >= 15 && $h < 21)  $timeSlots['15-21'] += $row->count;
            elseif ($h >= 21)              $timeSlots['21-24'] += $row->count;
            else                           $timeSlots['0-6']   += $row->count;
        }

        // seared destinations
        $searches = Search::select('destination_id', DB::raw('COUNT(*) as count'))
            ->with('destination')
            ->groupBy('destination_id')
            ->orderByDesc('count')
            ->get()
            ->map(fn($s) => [
                'destination' => $s->destination->name ?? '?',
                'country'     => $s->destination->country ?? '?',
                'count'       => $s->count,
            ]);

        // search preferences
        $preferences = \App\Models\SearchPreference::select('type', 'category', DB::raw('COUNT(*) as count'))
            ->groupBy('type', 'category')
            ->get();


        return response()->json([
            'total'      => $total,
            'unique'     => $unique,
            'time_slots' => $timeSlots,
            'searches'   => $searches,
            'preferences' => $preferences,
        ]);
    }
}