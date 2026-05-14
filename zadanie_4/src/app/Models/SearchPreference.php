<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SearchPreference extends Model
{
    public $timestamps = false;
    protected $fillable = ['type', 'category', 'searched_at'];
}