<?php

namespace App\Http\Controllers;

use App\Sensor;
use Barryvdh\Debugbar\Middleware\Debugbar;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\Input;


class APIController extends Controller
{
    private $now;

    public function __construct()
    {
        $this->now = Carbon::now();
    }

    public function index()
    {
        if(!empty(Input::get('filter'))){
            return $this->filterFans(Input::get('filter'), Input::get('fan'), Input::get('tunnel'), Input::get('direction'));
        }

        $fans = Sensor::all();
        return Response(['fans' => $fans]);
    }

    public function filterFans($filter, $fan, $tunnel, $direction)
    {
        $translation = translateTubeAndDirection($tunnel, $direction);

        switch ($filter) {
            case 6 : // 6 uur
                \Debugbar::error($this->now->subHours(6));
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subHours(6))->get();
                break;
            case 12 :  // 12 uur
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subHours(12))->get();
                break;
            case 1 : // 1 dag
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subDay())->get();
                break;
            case 2 : // 2 dagen
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subDays(2))->get();
                break;
            default :
                return Response(['error' => 'het ingevulde filternummer bestaat niet. Maak een keuze tussen 1, 2, 3 of 4']);
                break;
        }

        return Response(['fans' => $fans]);
    }
}
