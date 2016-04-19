<?php

namespace App\Http\Controllers;

use App\Sensor;
use App\Http\Requests;
use Carbon\Carbon;
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
            return $this->filterFans(Input::get('filter'));
        }

        $fans = Sensor::all();
        return Response(['fans' => $fans]);
    }

    public function filterFans($filter)
    {
        switch ($filter) {
            case 1 : // 6 uur
                $fans = Sensor::where('created_at', '>=', $this->now->subHours(6))->get();
                break;
            case 2 :  // 12 uur
                $fans = Sensor::where('created_at', '>=', $this->now->subHours(12))->get();
                break;
            case 3 : // 1 dag
                $fans = Sensor::where('created_at', '>=', $this->now->subDay())->get();
                break;
            case 4 : // 2 dagen
                $fans = Sensor::where('created_at', '>=', $this->now->subDays(2))->get();
                break;
            default :
                return Response(['error' => 'het ingevulde filternummer bestaat niet. Maak een keuze tussen 1, 2, 3 of 4']);
                break;
        }

        return Response(['fans' => $fans]);
    }
}
