<?php
namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Search;
use App\Models\SearchPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use Illuminate\Support\Facades\Log;

class DestinationController extends Controller
{
    public function search(Request $request)
    {
        $month    = (int) $request->input('month', 7);
        $types    = $request->input('types', []);
        $temp     = $request->input('temperature', 'jedno');
        $distance = (float) $request->input('distance', 0);

        $destinations = Destination::with(['climates' => function ($q) use ($month) {
            $q->where('month', $month);
        }])->get();

        $results = $destinations->map(function ($dest) use ($types, $temp, $distance) {
            $score   = 0;
            $reasons = [];
            $climate = $dest->climates->first();

            // types
            foreach ($types as $type) {
                if (in_array($type, $dest->types)) {
                    $score += 2;
                    $label = match($type) {
                        'more'       => 'More a pláž',
                        'hory'       => 'Hory a príroda',
                        'historicke' => 'Historické mestá',
                        'mestsky'    => 'Mestský výlet',
                        'aktivita'   => 'Aktivity a dobrodružstvo',
                        default      => $type,
                    };
                    $reasons[] = "✓ $label";
                }
            }

            // temperature
            if ($climate) {
                $avg      = $climate->temp_avg;
                $tempMatch = match($temp) {
                    'horuco'   => $avg >= 30,
                    'teplo'    => $avg >= 20 && $avg < 30,
                    'prijemne' => $avg >= 10 && $avg < 20,
                    default    => true,
                };
                if ($tempMatch) {
                    $score += 2;
                    $reasons[] = "✓ Priemerná teplota {$avg}°C";
                } else {
                    // temp doesn't match, lower score but don't exclude destination
                    $score -= 1;
                }
            }

            // distance
            if ($distance == 0 || $dest->flight_hours_from_vienna <= $distance) {
                $score += 1;
                $reasons[] = "✓ Let z Viedne: {$dest->flight_hours_from_vienna}h";
            } else {
                return null;
            }

            // score cannot be negative
            if ($score <= 0) return null;

            return [
                'id'          => $dest->id,
                'name'        => $dest->name,
                'country'     => $dest->country,
                'country_code'=> $dest->country_code,
                'types'       => $dest->types,
                'flight_hours'=> $dest->flight_hours_from_vienna,
                'currency'    => $dest->currency_code,
                'score'       => $score,
                'reasons'     => $reasons,
                'climate'     => $climate ? [
                    'avg' => $climate->temp_avg,
                    'min' => $climate->temp_min,
                    'max' => $climate->temp_max,
                ] : null,
            ];
        })->filter()->sortByDesc('score')->values();

        // store search preferences and top results for stats
        foreach ($results->take(10) as $r) {
            Search::create(['destination_id' => $r['id'], 'searched_at' => now()]);
        }

        foreach ($types as $type) {
            SearchPreference::create([
                'type' => $type,
                'category' => 'vacation_type',
                'searched_at' => now(),
            ]);
        }
        if ($temp !== 'jedno') {
            SearchPreference::create([
                'type' => $temp,
                'category' => 'temperature',
                'searched_at' => now(),
            ]);
        }

        Log::info('types: ' . json_encode($types));
        Log::info('temp: ' . $temp);

        return response()->json($results);
    }

    public function show($id)
    {
        $dest    = Destination::with('climates')->findOrFail($id);
        $climate = $dest->climates;

        // current weather from Open-Meteo
        $weather = null;
        try {
            $res = Http::get('https://api.open-meteo.com/v1/forecast', [
                'latitude'       => $dest->lat,
                'longitude'      => $dest->lon,
                'current'        => 'temperature_2m,weathercode,windspeed_10m',
                'forecast_days'  => 1,
            ]);
            $weather = $res->json('current');
        } catch (\Exception $e) {
            $weather = null;
        }

        // exchange rate from Frankfurter API
        $exchangeRate = null;
        if ($dest->currency_code !== 'EUR') {
            try {
                $res = Http::get("https://api.frankfurter.app/latest", [
                    'from' => 'EUR',
                    'to'   => $dest->currency_code,
                ]);
                $rates        = $res->json('rates');
                $exchangeRate = $rates[$dest->currency_code] ?? null;
            } catch (\Exception $e) {
                $exchangeRate = null;
            }
        }

        return response()->json([
            'id'           => $dest->id,
            'name'         => $dest->name,
            'country'      => $dest->country,
            'country_code' => $dest->country_code,
            'capital'      => $dest->capital,
            'currency'     => $dest->currency_code,
            'lat'          => $dest->lat,
            'lon'          => $dest->lon,
            'types'        => $dest->types,
            'flight_hours' => $dest->flight_hours_from_vienna,
            'climate'      => $climate,
            'weather'      => $weather,
            'exchange_rate'=> $exchangeRate,
        ]);
    }

    // compare multiple destinations
    public function compare(Request $request)
    {
        $ids  = $request->input('ids', []);
        $month = (int) $request->input('month', 7);

        $destinations = Destination::with(['climates' => function ($q) use ($month) {
            $q->where('month', $month);
        }])->whereIn('id', $ids)->get();

        return response()->json($destinations->map(function ($dest) {
            return [
                'id'           => $dest->id,
                'name'         => $dest->name,
                'country'      => $dest->country,
                'country_code' => $dest->country_code,
                'currency'     => $dest->currency_code,
                'types'        => $dest->types,
                'flight_hours' => $dest->flight_hours_from_vienna,
                'climate'      => $dest->climates->first(),
            ];
        }));
    }
}