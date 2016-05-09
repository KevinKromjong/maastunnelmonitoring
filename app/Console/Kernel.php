<?php

namespace App\Console;

use App\Sensor;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use MongoDB\BSON\Javascript;

class Kernel extends ConsoleKernel
{

    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\Inspire::class,
    ];

    function calculatePower($tunnel, $direction, $number)
    {
        $random = rand(0, 10);
        $powerChange = 0.15;

        $sensor = Sensor::where('tunnel', '=', $tunnel)->where('direction', '=', $direction)->where('fan_number', '=', $number)->orderBy('created_at', 'desc')->first();
        $newId = $sensor->count() + 1;

        if ($sensor->is_on == true) {
            if ($random >= 5) {
                $newValue = $sensor['power_usage'] + $powerChange;
                Sensor::create(['mod_id' => $newId, 'sensor_type' => 'fan', 'tunnel' => $tunnel, 'direction' => $direction, 'fan_number' => $number, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => $newValue]);
            } else if ($random < 5) {
                $newValue = $sensor['power_usage'] - $powerChange;
                Sensor::create(['mod_id' => $newId, 'sensor_type' => 'fan', 'tunnel' => $tunnel, 'direction' => $direction, 'fan_number' => $number, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => $newValue]);
            }
        } else {
            Sensor::create(['mod_id' => $newId, 'sensor_type' => 'fan', 'tunnel' => $tunnel, 'direction' => $direction, 'fan_number' => $number, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);
        }
    }

    public function firstTimeSetup()
    {
        //WESTBUIS
        //Noord 1
        Sensor::create(['mod_id' => 1, 'sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'north', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Noord 2
        Sensor::create(['mod_id' => 2, 'sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'north', 'fan_number' => 2, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);
        //Noord 3
        Sensor::create(['mod_id' => 3, 'sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'north', 'fan_number' => 3, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Zuid 1
        Sensor::create(['mod_id' => 4, 'sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'south', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Zuid 2
        Sensor::create(['mod_id' => 5, 'sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'south', 'fan_number' => 2, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);
        //Zuid3
        Sensor::create(['mod_id' => 6, 'sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'south', 'fan_number' => 3, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);


        //OOSTBUIS
        //Noord 1
        Sensor::create(['mod_id' => 7, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Noord 2
        Sensor::create(['mod_id' => 8, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 2, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Noord 3
        Sensor::create(['mod_id' => 9, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 3, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);
        //Noord 4
        Sensor::create(['mod_id' => 10, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 4, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);
        //Noord 5
        Sensor::create(['mod_id' => 11, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 5, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Zuid 1
        Sensor::create(['mod_id' => 12, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'south', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Zuid 2
        Sensor::create(['mod_id' => 13, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'south', 'fan_number' => 2, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);
        //Zuid 3
        Sensor::create(['mod_id' => 14, 'sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'south', 'fan_number' => 3, 'is_on' => false, 'blow_direction' => 'south', 'power_usage' => 0]);
    }

    public function fiveColourTest()
    {
        //WESTBUIS
        //Noord 1
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'north', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 120]);
        //Noord 2
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'north', 'fan_number' => 2, 'is_on' => true, 'blow_direction' => 'south', 'power_usage' => 121]);
        //Noord 3
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'north', 'fan_number' => 3, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 122]);
        //Zuid 1
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'south', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 123]);
        //Zuid 2
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'south', 'fan_number' => 2, 'is_on' => true, 'blow_direction' => 'south', 'power_usage' => 124]);
        //Zuid3
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'west', 'direction' => 'south', 'fan_number' => 3, 'is_on' => true, 'blow_direction' => 'south', 'power_usage' => 125]);


        //OOSTBUIS
        //Noord 1
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 121]);
        //Noord 2
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 2, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 122]);
        //Noord 3
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 3, 'is_on' => true, 'blow_direction' => 'south', 'power_usage' => 123]);
        //Noord 4
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 4, 'is_on' => true, 'blow_direction' => 'south', 'power_usage' => 134]);
        //Noord 5
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'north', 'fan_number' => 5, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 125]);
        //Zuid 1
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'south', 'fan_number' => 1, 'is_on' => true, 'blow_direction' => 'north', 'power_usage' => 126]);
        //Zuid 2
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'south', 'fan_number' => 2, 'is_on' => true, 'blow_direction' => 'south', 'power_usage' => 127]);
        //Zuid 3
        Sensor::create(['sensor_type' => 'fan', 'tunnel' => 'east', 'direction' => 'south', 'fan_number' => 3, 'is_on' => true, 'blow_direction' => 'south', 'power_usage' => 129]);
    }

    public function addFansToDatabase()
    {
        //WESTBUIS
        $this->calculatePower('west', 'north', 1);
        $this->calculatePower('west', 'north', 2);
        $this->calculatePower('west', 'north', 3);
        $this->calculatePower('west', 'south', 1);
        $this->calculatePower('west', 'south', 2);
        $this->calculatePower('west', 'south', 3);

        //OOSTBUIS
        $this->calculatePower('east', 'north', 1);
        $this->calculatePower('east', 'north', 2);
        $this->calculatePower('east', 'north', 3);
        $this->calculatePower('east', 'north', 4);
        $this->calculatePower('east', 'north', 5);
        $this->calculatePower('east', 'south', 1);
        $this->calculatePower('east', 'south', 2);
        $this->calculatePower('east', 'south', 3);

    }

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
          $this->addFansToDatabase();
//            $this->firstTimeSetup();
        });
    }
}


