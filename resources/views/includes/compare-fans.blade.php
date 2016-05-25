<div id="compare-fans">
    <div class="col-lg-12 col-md-12">
        <h2>Vergelijk gegevens</h2>

        <span class="warning-placeholder"></span>

        <div id="compare-inputs">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="col-lg-8 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
                        <div class="form-group">
                            <label for="fan-to-compare-one">Ventilator 1</label>
                            <select data-toggle="select" class="form-control select mrs mbm" id="fan-to-compare-one">
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
                            <select data-toggle="select" class="form-control select mrs mbm" id="fan-to-compare-two">
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
                            <label for="datetimepicker1">Vanaf</label>
                            <div class="input-group date" id='datetimepicker1'>
                                <input readonly="readonly" type="text" class="form-control" placeholder="01-02-2003"/>
                                <span class="input-group-addon calendar-button-one">
                                    <span class="glyphicon glyphicon-calendar">
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1'>
                        <div class="form-group">

                            <label for="datetimepicker1">Tot en met</label>
                            <div class="input-group date" id='datetimepicker2'>
                                <input readonly="readonly" type="text" class="form-control" placeholder="01-02-2003"/>
                                <span class="input-group-addon calendar-button-two">
                                    <span class="glyphicon glyphicon-calendar">
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="col-lg-offset-9 col-md-offset-9 col-sm-offset-9">
                <button class="btn btn-info" id="compare-chosen-button" style="width: 165px;">Vergelijk</button>
            </div>
        </div>

    </div>

    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <hr/>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="graph-comparison"></div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">

            <span class="warning-placeholder"></span>

            <table class="table table-bordered table-responsive table-striped table-compare">
                <thead>
                <tr>
                    <th>Onderdeel</th>
                    <th id="chosen-fan-one">Ventilator 1</th>
                    <th id="chosen-fan-two">Ventilator 2</th>
                    <th id="chosen-fan-difference">Verschil eenheid</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Kilowatt (totaal)</td>
                    <td id="fan-one-power-total">440 Kilowatt</td>
                    <td id="fan-two-power-total">320 Kilowatt</td>
                    <td id="fan-power-difference-total">220 Kilowatt</td>
                </tr>
                <tr>
                    <td>Kilowatt per uur</td>
                    <td id="fan-one-power-hour">1.5 Kilowatt</td>
                    <td id="fan-two-power-hour">2.5 Kilowatt</td>
                    <td id="fan-power-difference-hour">220 Kilowatt</td>
                </tr>
                <tr>
                    <td>Draaiuren</td>
                    <td id="fan-one-time-on">110 dagen</td>
                    <td id="fan-two-time-on">120 dagen</td>
                    <td id="fan-time-on-difference">12 dagen</td>

                </tr>
                <tr>
                    <td>Technische levensduur</td>
                    <td id="fan-one-technical-life-expectancy">Nog 6 jaar</td>
                    <td id="fan-two-technical-life-expectancy">Nog 5 jaar</td>
                    <td id="fan-technical-life-expectancy-difference">1 jaar</td>

                </tr>
                <tr>
                    <td>Theoretische levensduur</td>
                    <td id="fan-one-theoretical-life-expectancy">8 jaar</td>
                    <td id="fan-two-theoretical-life-expectancy">7 jaar</td>
                    <td>-</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal"><!-- Place at bottom of page --></div>

</div>
</div>

