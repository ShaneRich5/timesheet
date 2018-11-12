<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'address', 'description', 'created_by'];

    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by');
    }
}
