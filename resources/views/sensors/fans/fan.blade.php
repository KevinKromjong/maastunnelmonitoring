@extends('layouts.default')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-lg-12">

                <!-- Modal -->
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Modal Header</h4>
                            </div>
                            <div class="modal-body">
                                <p>Some text in the modal.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

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

                                                <h2 class="fan-status-heading">stand <span
                                                            style="font-size: 14px;">{{$fan->fan_state}}</span></h2>

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

                                    <div class="fan-information-technical">
                                        <div class="col-lg-12">
                                            @if($direction == 'noordzijde')
                                                <h1 class="fan-name">ventilator <br/> N-0{{$fan->fan_number}}</h1>
                                            @else
                                                <h1 class="fan-name">ventilator <br/> Z-0{{$fan->fan_number}}</h1>
                                            @endif

                                            <div class="col-lg-5">

                                                <table class="table table-sm table-technical-information-left">
                                                    <tbody>
                                                    <tr>
                                                        <th scope="row">Stand</th>
                                                        @if($fan->is_on === true)
                                                            <td class="fan-status green">{{$fan->fan_state}} - AAN</td>
                                                        @else
                                                            <td class="fan-status blue">{{$fan->fan_state}} - UIT</td>
                                                        @endif
                                                        <td><i rel="popover" class="fa fa-info"
                                                               aria-hidden="true" data-container="body"
                                                               data-toggle="popover" data-placement="right"
                                                               data-title="<strong>Advies ventilatorstand</strong>"
                                                               data-content="Aangeraden wordt om deze ventilator voor de <br/> periode <strong>16:00 tot en met 18:00</strong> op stand <strong>6</strong> te <br/> zetten, vanwege het toenemende verkeer en de <br/> slechte regen die wordt verwacht."></i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Blaasrichting</th>
                                                        @if($fan->blow_direction == 'north')
                                                            <td class="fan-blowing-direction">Noord</td>
                                                        @else
                                                            <td class="fan-blowing-direction">Zuid</td>
                                                        @endif
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Draaiuren</th>
                                                        @if($fan->is_on === true)
                                                            <td class="fan-time-on interval">Berekenen...</td>
                                                        @else
                                                            <td class="fan-time-on">0</td>
                                                        @endif

                                                        <td><i rel="popover" class="fa fa-info"
                                                               aria-hidden="true"
                                                               data-toggle="popover" data-placement="right"
                                                               data-title="<strong>Voorgaande draaiuren</strong>"
                                                               data-popover-content="<span>De vorige draaiuren van deze ventilator waren:</span>
                                                               <table class='table table-bordered table-sm'>
                                                                <thead>
                                                                <th scope='row'>Datum</th>
                                                                <th scope='row'>Tijd</th>
                                                                <th scope='row'>Duur</th>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>Woensdag 18 juni</td>
                                                                    <td>14:23 - 18:54</td>
                                                                    <td>2:14 uur</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Donderdag 19 juni</td>
                                                                    <td>10:45 - 18:23</td>
                                                                    <td>6:04 uur</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>">
                                                            </i>
                                                        </td>
                                                    </tr>

                                                    <span id="apu" class="hide">
                                                        Dit is content
                                                    </span>

                                                    <span id="tle" class="hide">
                                                        De technische levensduur is berekend met behulp van onderstaande factoren:
                                                    <ul>
                                                    <li>Huidige en voorgaande <i>standen</i></li>
                                                    <li>Huidige en voorgaande <i>draaiuren</i></li>
                                                    <li>Huidige en voorgaande <i>stroomverbruik</i></li>
                                                    </ul>
                                                    </span>

                                                    <tr>
                                                        <th scope="row">Gemiddeld stroomverbruik</th>
                                                        <td class="fan-power-usage"> 125.4 Watt <br/>
                                                            <span>style="font-size: 11px">vanaf 6 uur geleden</span>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Technische levensduur</th>
                                                        <td class="fan-technical-life-expectancy">Nog {{ rand(2,5) }}
                                                            jaar <br/> <span style="font-size: 11px">vanaf 2016</span>
                                                        </td>
                                                        <td><i rel="popover"
                                                               class="fa fa-info"
                                                               aria-hidden="true"
                                                               data-toggle="popover" data-placement="right"
                                                               data-title="<strong>Berekening technische levensduur</strong>"
                                                               data-popover-content="#tle">

                                                            </i>
                                                        </td>


                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Theoretische levensduur</th>
                                                        <td class="fan-theoretical-life-expectancy">{{ rand(4,6) }}
                                                            jaar <br/> <span
                                                                    style="font-size: 11px">vanaf aanschaf: {{ rand( 2010, 2012) }}</span>
                                                        </td>
                                                        <td></td>
                                                    </tr>

                                                    </tbody>
                                                </table>

                                            </div>

                                            <div class="col-lg-6 col-lg-offset-1">
                                                <div class="col-lg-offset-5">
                                                    <div class="filter-screen-wrapper">

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
                                                                       style="background: #27AE60">Filter
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <section id="technical-graph">
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

                <div class="col-lg-11">
                    <section id="fan-graph">

                    </section>
                </div>

                <div class="col-lg-1">
                    <button style=" width: 155px; margin-top: 8px; float:right;"
                            class="btn-compare hvr-underline-from-left fancybox btn btn-block btn-lg btn-default"
                            rel="group" href="#limits-table-wrapper">
                        <p>Overschreden grenswaarden</p>
                    </button>

                <div id="fan-graph-legend"></div>
                </div>
            </div>
        </div>
    </div>
    </div>

    @include('includes.compare-fans')
    @include('includes.limits-table')

    <div class="ajax-modal"><!-- Place at bottom of page --></div>


@endsection