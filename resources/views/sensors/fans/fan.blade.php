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

                        <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <article class="fan">
                                <div class="fan-information-basic">
                                    @include('includes.fan-counting')
                                    <h1 class="fan-name">ventilator</h1>

                                    {{--<hr/>--}}


                                    <h2>status</h2>

                                    @if($fan->is_on === true)
                                        <p class="fan-status green">AAN</p>
                                    @else
                                        <p class="fan-status red">UIT</p>
                                    @endif

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <h2>richting</h2>

                                            <div class="fan-blowing-direction">
                                                @if($fan->blow_direction == 'north')

                                                    <i class="fa fa-long-arrow-up"></i>
                                                    <i class="fa fa-long-arrow-up"></i>
                                                    <i class="fa fa-long-arrow-up"></i>
                                                @else
                                                    <i class="fa fa-long-arrow-down"></i>
                                                    <i class="fa fa-long-arrow-down"></i>
                                                    <i class="fa fa-long-arrow-down"></i>
                                                @endif
                                            </div>


                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <h2>draaiuren</h2>
                                            @if($fan->is_on === true)
                                                <p class="fan-time-on">12:45:13</p>
                                            @else
                                                <p class="fan-time-on">0</p>
                                            @endif

                                        </div>
                                    </div>
                                </div>

                                <div class="fan-information-technical">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <div class="fan-power-usage">
                                            <p>
                                                Gemiddeld stroomverbruik
                                            </p>
                                            <p> 125.4 Watt</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <div class="fan-life-expectancy">
                                            <p>Verwachte <br/> levensduur</p>
                                            <p>{{ rand(4,6) }} jaar</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    @endforeach
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


