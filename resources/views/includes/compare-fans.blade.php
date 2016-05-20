<div id="compare-fans" style="display: none;">
    <div class="col-lg-12 col-md-12">
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 9px; margin: 20px">Vergelijk gegevens</h2>

        <span class="warning-placeholder"></span>

        <div id="compare-inputs">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="col-lg-8 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
                        <div class="form-group">
                            <label for="fan-to-compare-one">Ventilator 1</label>
                            <select class="form-control" id="fan-to-compare-one">
                                <option value="" disabled selected>-- Ventilator 1 --</option>
                                <optgroup label="Oostbuis - Noordzijde">
                                    <option value="Oostbuis <br/> N-01">N-01</option>
                                    <option value="Oostbuis <br/> N-02">N-02</option>
                                    <option value="Oostbuis <br/> N-03">N-03</option>
                                    <option value="Oostbuis <br/> N-04">N-04</option>
                                    <option value="Oostbuis <br/> N-05">N-05</option>
                                </optgroup>
                                <optgroup label="Oostbuis - Zuidzijde">
                                    <option value="Oostbuis <br/> Z-01">Z-01</option>
                                    <option value="Oostbuis <br/> Z-02">Z-02</option>
                                    <option value="Oostbuis <br/> Z-03">Z-03</option>
                                </optgroup>
                                <optgroup label="Westbuis - Noordzijde">
                                    <option value="Westbuis <br/> N-01">N-01</option>
                                    <option value="Westbuis <br/> N-02">N-02</option>
                                    <option value="Westbuis <br/> N-03">N-03</option>
                                </optgroup>
                                <optgroup label="Westbuis - Zuidzijde">
                                    <option value="Westbuis <br/> Z-01">Z-01</option>
                                    <option value="Westbuis <br/> Z-02">Z-02</option>
                                    <option value="Westbuis <br/> Z-03">Z-03</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-8 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
                        <div class="form-group">
                            <label for="fan-to-compare-two">Ventilator 2</label>
                            <select class="form-control" id="fan-to-compare-two">
                                <option value="" disabled selected>-- Ventilator 2 --</option>
                                <optgroup label="Oostbuis - Noordzijde">
                                    <option value="Oostbuis <br/> N-01">N-01</option>
                                    <option value="Oostbuis <br/> N-02">N-02</option>
                                    <option value="Oostbuis <br/> N-03">N-03</option>
                                    <option value="Oostbuis <br/> N-04">N-04</option>
                                    <option value="Oostbuis <br/> N-05">N-05</option>
                                </optgroup>
                                <optgroup label="Oostbuis - Zuidzijde">
                                    <option value="Oostbuis <br/> Z-01">Z-01</option>
                                    <option value="Oostbuis <br/> Z-02">Z-02</option>
                                    <option value="Oostbuis <br/> Z-03">Z-03</option>
                                </optgroup>
                                <optgroup label="Westbuis - Noordzijde">
                                    <option value="Westbuis <br/> N-01">N-01</option>
                                    <option value="Westbuis <br/> N-02">N-02</option>
                                    <option value="Westbuis <br/> N-03">N-03</option>
                                </optgroup>
                                <optgroup label="Westbuis - Zuidzijde">
                                    <option value="Westbuis <br/> Z-01">Z-01</option>
                                    <option value="Westbuis <br/> Z-02">Z-02</option>
                                    <option value="Westbuis <br/> Z-03">Z-03</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>

                </div>

                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1'>
                        <div class="form-group">
                            <label for="datetimepicker1">Datum 1</label>
                            <div class='input-group date' id='datetimepicker1'>
                                <input readonly="readonly" type='text' class="form-control"/>
                                    <span class="input-group-addon calendar-button-one">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                            </div>
                        </div>
                    </div>

                    <div class='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1'>
                        <div class="form-group">
                            <label for="datetimepicker2">Datum 2</label>
                            <div class='input-group date' id='datetimepicker2'>
                                <input readonly="readonly" type='text' class="form-control"/>
                                    <span class="input-group-addon calendar-button-two">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-offset-9 col-md-offset-9 col-sm-offset-9">
                    <button class="btn btn-primary" id="compare-chosen-button" style="width: 165px;">Vergelijk</button>
                </div>
            </div>

        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <hr/>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div id="graph-circle-container">
                    <div id="graph-comparison" style="width: 400px; height: 385px; display: none;"></div>
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
                <table class="table table-bordered table-responsive table-striped table-compare" style="display: none;">
                    <thead>
                    <tr>
                        <th>Onderdeel</th>
                        <th id="chosen-fan-one">Ventilator 1</th>
                        <th id="chosen-fan-two">Ventilator 2</th>
                        <th id="chosen-fan-difference-unit">Verschil eenheid</th>
                        <th id="chosen-fan-difference-percentage">Procentuele verschil</th>
                        {{--<th id="chosen-fan-prediction">Voorspelling</th>--}}
                        {{--<th>Plotten</th>--}}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Kw/h</td>
                        <td id="fan-one-power">440 Kilowatt</td>
                        <td id="fan-two-power">320 Kilowatt</td>
                        <td id="fan-power-difference-unit" class="danger">220 Kilowatt</td>
                        <td id="fan-power-difference-percentage" class="danger">-12%</td>
                        {{--<td id="fan-power-predicition"></td>--}}
                        {{--<td><input id="checkbox-power-usage" data-name-label="Stroomverbruik" data-name="power_usage" type="checkbox"/></td>--}}
                    </tr>
                    <tr>
                        <td>Draaiuren</td>
                        <td id="fan-one-time-on">110 dagen</td>
                        <td id="fan-two-time-on">120 dagen</td>
                        <td id="fan-time-on-difference-unit">12 dagen</td>
                        <td id="fan-time-on-difference-percentage">+7%</td>
                        {{--<td id="fan-time-on-prediction"></td>--}}
                        {{--<td><input id="checkbox-time-on" data-name-label="Draaiuren" type="checkbox"/></td>--}}

                    </tr>
                    <tr>
                        <td>Technische levensduur</td>
                        <td id="fan-one-technical-life-expectancy">Nog <br/>6 jaar</td>
                        <td id="fan-two-technical-life-expectancy">Nog <br/>5 jaar</td>
                        <td id="fan-technical-life-expectancy-difference">1 jaar</td>
                        <td id="fan-technical-life-expectancy-difference-percentage">-20%</td>
                        {{--<td id="fan-technical-life-expectancy-predicition">4 jaar</td>--}}
                        {{--<td><input id="checkbox-technical-life-expectancy" data-name-label="Technische levensverwachting" type="checkbox"/></td>--}}

                    </tr>
                    <tr>
                        <td>Theoretische levensduur</td>
                        <td id="fan-one-theoretical-life-expectancy">8 jaar</td>
                        <td id="fan-two-theoretical-life-expectancy">7 jaar</td>
                        <td>-</td>
                        <td>-</td>
                        {{--<td>-</td>--}}
                        {{--<td><input id="checkbox-theoretical-life-expectancy" data-name-label="Theoretische levensverwachting" type="checkbox"/></td>--}}

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal"><!-- Place at bottom of page --></div>

</div>
</div>
