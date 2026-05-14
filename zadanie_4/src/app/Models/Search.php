<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Search extends Model
{
    public $timestamps = false;
    
    protected $fillable = ['destination_id', 'searched_at'];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}