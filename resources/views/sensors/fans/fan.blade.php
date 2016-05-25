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
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        @endif

                                        <article class="fan" data-index="{{$fan->fan_number -1}}">
                                            <div class="fan-information-basic">
                                                @if($direction == 'noordzijde')
                                                    <h1 class="fan-name">ventilator <br/> N-0{{$fan->fan_number}}</h1>
                                                @else
                                                    <h1 class="fan-name">ventilator <br/> Z-0{{$fan->fan_number}}</h1>
                                                @endif

                                                <hr/>

                                                <h2 class="fan-status-heading">stand</h2>

                                                @if($fan->is_on === true)
                                                    <p class="fan-status green">AAN</p>
                                                @else
                                                    <p class="fan-status blue">UIT</p>
                                                @endif

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                    <h2 class="fan-direction-heading">blaasrichting</h2>

                                                    <div class="fan-blowing-direction">
                                                        @if($fan->is_on === true)
                                                            @if($fan->blow_direction == 'north')
                                                                <p class="arrow-squiggly-up">&#8604;</p>
                                                                <p class="arrow-squiggly-up">&#8604;</p>
                                                                <p class="arrow-squiggly-up">&#8604;</p>

                                                                <p>Noord</p>
                                                            @else
                                                                <p class="arrow-squiggly-down">&#8604;</p>
                                                                <p class="arrow-squiggly-down">&#8604;</p>
                                                                <p class="arrow-squiggly-down">&#8604;</p>

                                                                <p>Zuid</p>
                                                            @endif
                                                        @else
                                                            @if($fan->blow_direction == 'north')
                                                                <p class="arrow-straight-up">&#8593;</p>
                                                                <p class="arrow-straight-up">&#8593;</p>
                                                                <p class="arrow-straight-up">&#8593;</p>

                                                                <p>Noord</p>
                                                            @else
                                                                <p class="arrow-straight-down">&#8593;</p>
                                                                <p class="arrow-straight-down">&#8593;</p>
                                                                <p class="arrow-straight-down">&#8593;</p>

                                                                <p>Zuid</p>
                                                            @endif
                                                        @endif

                                                    </div>

                                                    <hr/>

                                                    <div class="expand-fan-button"
                                                         style="float: right; margin-right: 20px; margin-top: -20px; font-size: 20px">
                                                        <i style="color: grey" class="fa fa-plus-square-o"
                                                           aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                    @endforeach


                                    <div class="col-lg-12">
                                        <div class="fan-information-technical">

                                            {{--<div class="spinner-container-container">--}}
                                            {{--<svg class="spinner-container" viewBox="0 0 44 44">--}}
                                            {{--<circle class="path" cx="22" cy="22" r="20" fill="none"--}}
                                            {{--stroke-width="4"></circle>--}}
                                            {{--</svg>--}}
                                            {{--</div>--}}

                                            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                @if($direction == 'noordzijde')
                                                    <h1 class="fan-name">ventilator <br/> N-0{{$fan->fan_number}}</h1>
                                                @else
                                                    <h1 class="fan-name">ventilator <br/> Z-0{{$fan->fan_number}}</h1>
                                                @endif

                                                <div class="fan-information-technical-details">
                                                    <div class="col-lg-6 col-md-5 col-sm-5 col-xs-6">
                                                        <div class="fan-technical-keys">
                                                            <p>Stand</p>
                                                            <hr/>
                                                            <p>Blaasrichting</p>
                                                            <hr/>
                                                            <p>Draaiuren</p>
                                                            <hr/>
                                                            <p>Gemiddeld stroomverbruik</p>
                                                            <hr/>
                                                            <p>Technische <br/> levensduur</p>
                                                            <hr/>
                                                            <p>Theoretische <br/> levensduur</p>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6 col-md-5 col-sm-6 col-xs-6">
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

                                                            <div>

                                                            </div>

                                                            @if($fan->is_on === true)
                                                                <p class="fan-time-on interval">Berekenen...</p>
                                                            @else
                                                                <p class="fan-time-on">0</p>
                                                            @endif

                                                            <hr/>

                                                            <p class="fan-power-usage"> 125.4 Watt <br/> <span
                                                                        style="font-size: 11px">vanaf 6 uur geleden</span>
                                                            </p>
                                                            <hr/>

                                                            <p class="fan-technical-life-expectancy">Nog {{ rand(2,5) }}
                                                                jaar <br/> <span
                                                                        style="font-size: 11px">vanaf 2016</span></p>
                                                            <hr/>

                                                            <p class="fan-theoretical-life-expectancy">{{ rand(4,6) }}
                                                                jaar <br/> <span style="font-size: 11px">vanaf aanschafjaar: {{ rand( 2010, 2012) }}
                                                                    </span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-8 col-md-6 col-sm-6 col-xs-12">

                                                <div class="col-lg-offset-7">
                                                    <div style="position: absolute">

                                                        <div class="input-group">
                                                            <button type="button"
                                                                    class="btn btn-primary btn-filter-screen">
                                                                Filter ventilatordata
                                                                <span class="glyphicon glyphicon-filter"></span>
                                                            </button>

                                                            <div class="col-lg-offset-7">
                                                                <div class="share mrl filter-screen">
                                                                    <ul>
                                                                        <li>
                                                                            <label class="share-label"
                                                                                   style="width: 100%;"
                                                                                   for="share-toggle2">Aantal</label>
                                                                            <input type="number" style="width: 100px;"
                                                                                   value=""
                                                                                   placeholder="6.."
                                                                                   class="form-control filter-number">
                                                                        </li>
                                                                        <li>
                                                                            <label class="share-label"
                                                                                   style="width: 30%;"
                                                                                   for="share-toggle4">Eenheid</label>
                                                                            <select data-toggle="select"
                                                                                    class="form-control select select-default mrs mbm filter-unit">
                                                                                <option value="days">Dagen</option>
                                                                                <option value="weeks">Weken</option>
                                                                                <option value="months">Maanden</option>
                                                                                <option value="years">Jaren</option>
                                                                            </select></li>

                                                                    </ul>
                                                                    <a href="#"
                                                                       class="btn btn-primary btn-block btn-large btn-filter"
                                                                       data-tunnel="{{$tunnel}}"
                                                                       data-direction="{{$direction}}"
                                                                       data-fan-number="{{$fan->fan_number}}"
                                                                       style="background: #27AE60">Filter</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <section id="technical-graph">
                                                    <div class="modal"><!-- Place at bottom of page --></div>

                                                </section>

                                            </div>

                                        </div>
                                    </div>
                            </div>
                </section>
            </div>

            <div id="fan-graph-container">
                <h1>Overzichtsgrafiek ventilatoren</h1>
                <button class="btn-compare hvr-underline-from-left fancybox btn btn-block btn-lg btn-default"
                        rel="group" href="#compare-fans">
                    <p>Vergelijk ventilatoren</p>
                </button>
                <hr/>

                <div id="fan-graph-legend"></div>
                <section id="fan-graph">

                </section>
            </div>
        </div>
    </div>

    @include('includes.compare-fans')

@endsection


