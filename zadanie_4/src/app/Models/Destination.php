<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = [
        'name', 'country', 'country_code', 'capital',
        'currency_code', 'flight_hours_from_vienna', 'types', 'lat', 'lon'
    ];

    protected $casts = [
        'types' => 'array',
    ];

    public function climates()
    {
        return $this->hasMany(DestinationClimate::class);
    }

    public function searches()
    {
        return $this->hasMany(Search::class);
    }
}