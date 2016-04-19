<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Sensor extends Eloquent {

    protected $collection = 'maastunnelmonitoring';
    protected $dates = ['created_at', 'updated_at'];

    protected $guarded = [];

}