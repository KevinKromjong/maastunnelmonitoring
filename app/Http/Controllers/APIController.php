<?php

namespace App\Http\Controllers;

use App\Sensor;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;


class APIController extends Controller
{
    private $now;

    /**
     * APIController constructor.
     *
     */
    public function __construct()
    {
        $this->now = Carbon::now();
    }

    /**
     * Check the incoming request on parameters and execute the correct function
     *
     * @return: all the fan entries in the database
     */
    public function index()
    {
        if (!empty(Input::get('filter'))) {
            return $this->filterFans(Input::get('filter'), Input::get('fan'), Input::get('tunnel'), Input::get('direction'));
        } else if (!empty(Input::get('translate'))) {
            return $this->translate(Input::get('tunnel'), Input::get('direction'));
        } else if (!empty(Input::get('compare'))) {
            return $this->getFilteredData(Input::get('firstTime'), Input::get('secondTime'), Input::get('tunnelOne'), Input::get('tunnelTwo'), Input::get('directionOne'), Input::get('directionTwo'), Input::get('fanOne'), Input::get('fanTwo'));
        }


        $fans = Sensor::paginate(30);
        return Response(['fans' => $fans]);
    }

    /**
     * Filter the fans according to given parameters
     *
     * @param $filter : The amount of time to go back. Options: 6 hours, 12 hours, 1 day, 2 days
     * @param $fan : The fan to search for. Options: 1 to 5
     * @param $tunnel : The tunnel to search for. Options: east or west
     * @param $direction : The direction to search for. Options: north or south
     * @return: The fans that are searched for
     */
    public function filterFans($filter, $fan, $tunnel, $direction)
    {
        $translation = translateTubeAndDirection($tunnel, $direction);

        switch ($filter) {
            case 6 : // 6 uur
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subHours(6))->get();
                break;
            case 12 :  // 12translateTubeAndDirection uur
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

    /**
     * Get the filtered data from the choices on the popup menu screen
     *
     * @param $firstTime : the first time to compare
     * @param $secondTime : the second time to compare
     * @param $tunnelOne : the first tunnel to compare
     * @param $tunnelTwo : the second tunnel to compare
     * @param $directionOne : the first direction to compare
     * @param $directionTwo : the second direction to compare
     * @param $fanOne : the first fan to compare
     * @param $fanTwo : the second function to compare
     * @return : the dataset of the first and the second fan
     */
    public function getFilteredData($firstTime, $secondTime, $tunnelOne, $tunnelTwo, $directionOne, $directionTwo, $fanOne, $fanTwo)
    {
        $translationOne = translateTubeAndDirection($tunnelOne, $directionOne);
        $translationTwo = translateTubeAndDirection($tunnelTwo, $directionTwo);

        $dateFanOne = Carbon::createFromFormat('d/m/Y', $firstTime);
        $dateFanTwo = Carbon::createFromFormat('d/m/Y', $secondTime);

        //where('mod_id', 'mod', [2, 0])
        $fanOne = Sensor::where('created_at', '>', $dateFanOne)->where('created_at', '<', $dateFanTwo)->where('tunnel', $translationOne['tunnel'])->where('direction', $translationOne['direction'])->where('fan_number', '=', intval($fanOne))->get();
        $fanTwo = Sensor::where('created_at', '>', $dateFanOne)->where('created_at', '<', $dateFanTwo)->where('tunnel', $translationTwo['tunnel'])->where('direction', $translationTwo['direction'])->where('fan_number', '=', intval($fanTwo))->get();

        return Response(['fanOne' => $fanOne, 'fanTwo' => $fanTwo]);
    }
}
