<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(){
        
        if(!Auth::check()) {
            return redirect()->to('login');
        }

        $types = ['Temperatuur', 'Luchtvochtigheid', 'Lichtintensiteit', 'Luchtkwaliteit', 'Ventilatoren', 'Lampen'];
        $colors = ['green', '#FFCC00', '#FFCC00', '#CC0000;', 'green', 'green'];
        $icons = ['thermometer.png', 'humidity.png', 'intensity.png', 'pollution.png', 'icon-fan.png', 'lightbulb.png'];

        return view('home')->with('mobile', getUserAgent());
    }

    function getFanURL()
    {
        return action('Sensors\Fans\FanController@index', ['buis' => 'oostbuis', 'zijde' => 'noordzijde']);
    }
}
