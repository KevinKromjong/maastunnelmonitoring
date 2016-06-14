<?php

namespace App\Http\Controllers\Sensors\Fans;


use App\Http\Requests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class TubeController extends Controller
{
    public function index(){

        if(!Auth::check()) {
            return redirect()->to('login');
        }

        return view('sensors.fans.tubes')->with('mobile', getUserAgent());
    }
}
