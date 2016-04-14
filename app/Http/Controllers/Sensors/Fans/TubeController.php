<?php

namespace App\Http\Controllers\Sensors\Fans;


use App\Http\Requests;
use Illuminate\Routing\Controller;

class TubeController extends Controller
{
    public function index(){
        return view('sensors.fans.tubes');
    }
}
