<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function index(){
        $types = ['Temperatuur', 'Luchtvochtigheid', 'Lichtintensiteit', 'Luchtkwaliteit', 'Ventilatoren', 'Lampen'];
        $colors = ['green', '#FFCC00', '#FFCC00', '#CC0000;', 'green', 'green'];
        $icons = ['thermometer.png', 'humidity.png', 'intensity.png', 'pollution.png', 'icon-fan.png', 'lightbulb.png'];

        return view('home');
    }
}
