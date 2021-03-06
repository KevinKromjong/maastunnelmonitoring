<?php

namespace App\Http\Controllers\Sensors\Fans;

use Illuminate\Support\Facades\Auth;
use Javascript;
use App\Sensor;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class FanController extends Controller
{
    private $tunnel;
    private $direction;

    public function index(Request $request)
    {
        if(!Auth::check()) {
            return redirect()->to('login');
        }
        
        $this->tunnel = $request->segment(3);
        $this->direction = $request->segment(4);

        $translate = translateTubeAndDirection($this->tunnel, $this->direction);

        //Oostbuis - Noord = 5 buizen
        if ($translate['tunnel'] == 'east' && $translate['direction'] == 'north') {
            $fansOverview = Sensor::where('tunnel', '=', $translate['tunnel'])
                ->where('direction', '=', $translate['direction'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->orderBy('created_at', 'asc')
                ->get();

            $fansOverview = $fansOverview->sortBy('fan_number');

            $fansGraph = Sensor::where('tunnel', '=', $translate['tunnel'])
                ->where('direction', '=', $translate['direction'])
                ->orderBy('created_at', 'desc')
                ->take(7200)
                ->get();
        }
        //Andere buizen = 3 buizen
        else {
            $fansOverview = Sensor::where('tunnel', '=', $translate['tunnel'])
                ->where('direction', '=', $translate['direction'])
                ->orderBy('created_at', 'desc')
                ->take(3)
                ->orderBy('created_at', 'asc')
                ->get();
            
            $fansGraph = Sensor::where('tunnel', '=', $translate['tunnel'])
                ->where('direction', '=', $translate['direction'])
                ->orderBy('created_at', 'desc')
                ->take(4320)
                ->get();
        }

        Javascript::put([
            'fansOverview' => $fansOverview->sortBy('fan_number'),
            'fansGraph' => $fansGraph,
            'fanDirection' => $this->direction,
            'fanTunnel' => $this->tunnel
        ]);

        return view('sensors.fans.fan')
            ->with('tunnel', $this->tunnel)
            ->with('direction', $this->direction)
            ->with('fansOverview', $fansOverview)
            ->with('mobile', getUserAgent());
    }
}
