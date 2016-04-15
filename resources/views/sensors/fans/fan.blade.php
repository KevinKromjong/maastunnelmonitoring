@extends('layouts.default')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-lg-12">

                <div id="segment">
                    <h1>{{ ucfirst($tunnel) }}</h1>
                    <hr/>
                    <h3> {{ ucfirst($direction) }}</h3>
                </div>

                <section id="fans">

                    @foreach($fansOverview as $index => $fan)

                        @if(count($fansOverview) == 5)
                            <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 five-fans">
                                @else
                                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        @endif

                                        <article class="fan" data-index="{{$fan->fan_number -1}}">
                                            <div class="fan-information-basic">
                                                <h1 class="fan-name">ventilator <br/> Z-0{{$fan->fan_number}}</h1>

                                                <hr/>

                                                <h2>status</h2>

                                                @if($fan->is_on === true)
                                                    <p class="fan-status green">AAN</p>
                                                @else
                                                    <p class="fan-status red">UIT</p>
                                                @endif

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                    <div class="col-lg-12 col-md-6 col-sm-6 col-xs-6">
                                                        <h2>blaasrichting</h2>

                                                        <div class="fan-blowing-direction">
                                                            @if($fan->blow_direction == 'north')

                                                                <p class="arrow-squiggly-up">&#8604;</p>
                                                                <p class="arrow-squiggly-up">&#8604;</p>
                                                                <p class="arrow-squiggly-up">&#8604;</p>

                                                                <p>Noord</p>
                                                            @else
                                                                <p class="arrow-squiggly-down">&#8593;</p>
                                                                <p class="arrow-squiggly-down">&#8593;</p>
                                                                <p class="arrow-squiggly-down">&#8593;</p>

                                                                <p>Zuid</p>
                                                            @endif
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                    @endforeach

                                    <div class="col-lg-12">
                                        <div class="fan-information-technical">
                                            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-6">
                                                <h1>Ventilator Z-0{{$fan->fan_number}}</h1>


                                                <hr/>

                                                <div class="col-lg-6">
                                                    <div class="fan-technical-keys">
                                                        <p>Status</p>
                                                        <hr/>
                                                        <p>Blaasrichting</p>
                                                        <hr/>
                                                        <p>Draaiuren</p>
                                                        <hr/>
                                                        <p>Gemiddeld stroomverbruik</p>
                                                        <hr/>
                                                        <p>Technische levensduur</p>
                                                        <hr/>
                                                        <p>Theoretische levensduur</p>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6">
                                                    <div class="fan-technical-values">
                                                        @if($fan->is_on === true)
                                                            <p class="fan-status green">AAN</p>
                                                        @else
                                                            <p class="fan-status red">UIT</p>
                                                        @endif

                                                        <hr/>

                                                        @if($fan->blow_direction == 'north')
                                                            <p class="fan-blowing-direction">Noord</p>
                                                        @else
                                                            <p class="fan-blowing-direction">Zuid</p>
                                                        @endif

                                                        <hr/>

                                                        @if($fan->is_on === true)
                                                            <p class="fan-time-on">12:45:13</p>
                                                        @else
                                                            <p class="fan-time-on">0</p>
                                                        @endif

                                                        <hr/>

                                                        <p class="fan-power-usage"> 125.4 Watt <br/> (sinds 6 uur terug)
                                                        </p>

                                                        <hr/>

                                                        <p class="fan-technical-life-expectancy">Nog {{ rand(2,5)}} jaar</p>

                                                        <hr/>

                                                        <p class="fan-theoretical-life-expectancy">{{ rand(4,6) }} jaar</p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-8 col-md-6 col-sm-6 col-xs-6">
                                                <section id="technical-graph">

                                                </section>
                                            </div>
                                        </div>
                                    </div>
                </section>
            </div>

            <div id="fan-graph-container">
                <div id="fan-graph-legend"></div>
                <p id="choices" style="float:right; width:135px;"></p>

                <section id="fan-graph">

                </section>
            </div>
        </div>
    </div>
    </div>
@endsection


