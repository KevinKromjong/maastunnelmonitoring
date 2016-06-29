<?php

namespace App\Http\Controllers;

use App\Sensor;
use Carbon\Carbon;
use Faker\Provider\DateTime;
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
        switch (Input::get('option')) {
            case 'filter' :
                return $this->filterFans(Input::get('fan'), Input::get('tunnel'), Input::get('direction'), Input::get('filternumber'), Input::get('filterunit'));
                break;
            case 'compare' :
                return $this->compareFans(Input::get('timeOne'), Input::get('timeTwo'), Input::get('tunnelOne'), Input::get('tunnelTwo'), Input::get('directionOne'), Input::get('directionTwo'), Input::get('fanOne'), Input::get('fanTwo'));
                break;
            case 'updateMainGraph' :
                return $this->updateMainGraph(Input::get('dateOne'), Input::get('dateTwo'), Input::get('tunnel'), Input::get('direction'));
                break;
            default :
                $fans = Sensor::paginate(30);
                return Response(['fans' => $fans]);
                break;
        }
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
    public function filterFans($fan, $tunnel, $direction, $number, $unit)
    {
        $translation = translateTubeAndDirection($tunnel, $direction);

        switch ($unit) {
            case 'days' :
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subDays(intval($number)))->where('mod_id', 'mod', [15, 0])->get();
                break;
            case 'weeks' :
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subWeeks(intval($number)))->where('mod_id', 'mod', [15, 0])->get();
                break;
            case 'months' :
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subMonths(intval($number)))->where('mod_id', 'mod', [15, 0])->get();
                break;
            case 'years' :
                $fans = Sensor::where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->where('fan_number', '=', intval($fan))->where('created_at', '>=', $this->now->subYears(intval($number)))->where('mod_id', 'mod', [15, 0])->get();
                break;
            default :
                return Response(['error' => 'het ingevulde filternummer bestaat niet. Maak een keuze tussen 1, 2, 3 of 4']);
                break;
        }

        return Response(['fans' => $fans]);
    }

    /**
     * Get the data for the comparison from the choices on the popup menu screen
     *
     * @param $timeOne : the first time to compare
     * @param $timeTwo : the second time to compare
     * @param $tunnelOne : the first tunnel to compare
     * @param $tunnelTwo : the second tunnel to compare
     * @param $directionOne : the first direction to compare
     * @param $directionTwo : the second direction to compare
     * @param $fanOne : the first fan to compare
     * @param $fanTwo : the second function to compare
     * @return : the datasetFanValues of the first and the second fan
     */
    public function compareFans($timeOne, $timeTwo, $tunnelOne, $tunnelTwo, $directionOne, $directionTwo, $fanOne, $fanTwo)
    {
        $translationOne = translateTubeAndDirection($tunnelOne, $directionOne);
        $translationTwo = translateTubeAndDirection($tunnelTwo, $directionTwo);

        $dateFanOne = Carbon::createFromFormat('d/m/Y', $timeOne);
        $dateFanTwo = Carbon::createFromFormat('d/m/Y', $timeTwo);

        //where('mod_id', 'mod', [2, 0])
        $fanOne = Sensor::where('created_at', '>', $dateFanOne)->where('created_at', '<', $dateFanTwo)->where('tunnel', $translationOne['tunnel'])->where('direction', $translationOne['direction'])->where('fan_number', '=', intval($fanOne))->where('mod_id', 'mod', [15, 0])->get();
        $fanTwo = Sensor::where('created_at', '>', $dateFanOne)->where('created_at', '<', $dateFanTwo)->where('tunnel', $translationTwo['tunnel'])->where('direction', $translationTwo['direction'])->where('fan_number', '=', intval($fanTwo))->where('mod_id', 'mod', [15, 0])->get();

        return Response(['fanOne' => $fanOne, 'fanTwo' => $fanTwo]);
    }

    public function updateMainGraph($dateOne, $dateTwo, $tunnel, $direction)
    {
        $translation = translateTubeAndDirection($tunnel, $direction);
        
        $dateTimeOne = Carbon::createFromTimestamp(floor($dateOne / 1000));
        $dateTimeTwo = Carbon::createFromTimestamp(floor($dateTwo / 1000));

        $newMainGraphData = Sensor::where('created_at', '>', $dateTimeOne)->where('created_at', '<', $dateTimeTwo)->where('tunnel', $translation['tunnel'])->where('direction', $translation['direction'])->get();

        return Response($newMainGraphData);
    }
}
