<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Sensor extends Eloquent {

    protected $collection = 'maastunnelmonitoring';

    protected $guarded = [];

}