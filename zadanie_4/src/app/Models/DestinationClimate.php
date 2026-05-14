<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DestinationClimate extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'destination_id', 'month', 'temp_avg', 'temp_min', 'temp_max'
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}