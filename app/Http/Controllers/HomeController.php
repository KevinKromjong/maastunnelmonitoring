<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(){
        if(!Auth::check()) {
            return redirect()->to('login');
        }
        
        return view('home')->with('mobile', getUserAgent());
    }

    function getFanURL()
    {
        return action('Sensors\Fans\FanController@index', ['buis' => 'oostbuis', 'zijde' => 'noordzijde']);
    }
}
