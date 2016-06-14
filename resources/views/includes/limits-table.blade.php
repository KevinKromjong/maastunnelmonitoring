<div id="limits-table-wrapper">
    <div class="col-lg-12">

        <h2>Laatst overschreden grenswaarden</h2>
        <h4>{{ ucfirst($tunnel) }} - {{ ucfirst($direction) }}</h4>

        <div class="limits-table">
            <div class="table-responsive">


                <table id="example" class="display" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ventilator</th>
                        <th>Begin Overschrijding</th>
                        <th>Einde Overschrijding</th>
                        <th>Duur</th>
                        <th>Extra informatie</th>
                        {{--<th>Overschrijding vroegtijdig opgemerkt</th>--}}
                        {{--<th>Melding gegeven</th>--}}
                        {{--<th>Mogelijke reden</th>--}}
                        {{--<th>Opmerking</th>--}}
                    </tr>
                    </thead>
                </table>

                {{--<table id="example" class="table table-condensed table-bordered table-limits">--}}
                {{--<thead>--}}
                {{--<tr>--}}
                {{--<th>#</th>--}}
                {{--<th>Ventilator</th>--}}
                {{--<th>Begin overschrijding</th>--}}
                {{--<th>Einde overschrijding</th>--}}
                {{--<th>Duur</th>--}}
                {{--<th>Meer informatie</th>--}}
                {{--</tr>--}}
                {{--</thead>--}}

                {{--Eerste rij--}}
                {{--<tbody>--}}
                {{--<tr class="clickable grey" data-toggle="collapse" id="row1" data-target=".row1">--}}
                {{--<td>1</td>--}}
                {{--<td>5</td>--}}
                {{--<td>Donderdag 2 juni 2016 <br/> 16:50:23</td>--}}
                {{--<td>Donderdag 2 juni 2016 <br/> 17:01:44</td>--}}
                {{--<td>00:11:21</td>--}}
                {{--<td><i class="glyphicon glyphicon-plus"></i></td>--}}

                {{--</tr>--}}

                {{--<tr class="collapse row1">--}}
                {{--<th colspan="2" rowspan="2"></th>--}}
                {{--<th>Overschrijding vroegtijdig opgemerkt</th>--}}
                {{--<th>Melding gegeven</th>--}}
                {{--<th>Mogelijke reden</th>--}}
                {{--<th>Opmerking</th>--}}
                {{--</tr>--}}

                {{--<tr class="collapse row1">--}}
                {{--<td>Ja</td>--}}
                {{--<td>Ja</td>--}}
                {{--<td>--}}
                {{--<ul>--}}
                {{--<li>Verkeersdrukte in de Maastunnel</li>--}}
                {{--<li>Ventilator stond lang op stand 8</li>--}}
                {{--</ul>--}}
                {{--</td>--}}
                {{--<td>Chef van de wacht Bert Bakker heeft <br/> de melding ingezien maar niet gereageerd</td>--}}
                {{--</tr>--}}

                {{--Tweede rij--}}
                {{--<tr class="clickable grey" data-toggle="collapse" id="row1" data-target=".row2">--}}
                {{--<td>2</td>--}}
                {{--<td>2</td>--}}
                {{--<td>Dinsdag 7 juni 2016 <br/> 12:36:25</td>--}}
                {{--<td>Dinsdag 7 juni 2016 <br/> 13:54:09</td>--}}
                {{--<td>01:18:16</td>--}}
                {{--<td><i class="glyphicon glyphicon-plus"></i></td>--}}
                {{--</tr>--}}

                {{--<tr class="collapse row2">--}}
                {{--<th colspan="2" rowspan="2"></th>--}}
                {{--<th>Overschrijding vroegtijdig opgemerkt</th>--}}
                {{--<th>Melding gegeven</th>--}}
                {{--<th>Mogelijke reden</th>--}}
                {{--<th>Opmerking</th>--}}
                {{--</tr>--}}

                {{--<tr class="collapse row2">--}}
                {{--<td>Ja</td>--}}
                {{--<td>Ja</td>--}}
                {{--<td>--}}
                {{--<ul>--}}
                {{--<li>Defect motoronderdeel</li>--}}
                {{--</ul>--}}
                {{--</td>--}}
                {{--<td>Defect motoronderdeel is vervangen</td>--}}
                {{--</tr>--}}

                {{--Derde rij--}}

                {{--<tr class="clickable grey" data-toggle="collapse" id="row3" data-target=".row3">--}}
                {{--<td>3</td>--}}
                {{--<td>2</td>--}}
                {{--<td>Zaterdag 11 juni 2016 <br/> 22:02:56</td>--}}
                {{--<td>Zaterdag 11 juni 2016 <br/> 22:04:33</td>--}}
                {{--<td>00:01:37</td>--}}
                {{--<td><i class="glyphicon glyphicon-plus"></i></td>--}}
                {{--</tr>--}}

                {{--<tr class="collapse row3">--}}
                {{--<th colspan="2" rowspan="2"></th>--}}
                {{--<th>Overschrijding vroegtijdig opgemerkt</th>--}}
                {{--<th>Melding gegeven</th>--}}
                {{--<th>Mogelijke reden</th>--}}
                {{--<th>Opmerking</th>--}}
                {{--</tr>--}}

                {{--<tr class="collapse row3">--}}
                {{--<td>Ja</td>--}}
                {{--<td>Ja</td>--}}
                {{--<td>--}}
                {{--<ul>--}}
                {{--<li>Geen mogelijke oorzaak gevonden</li>--}}
                {{--</ul>--}}
                {{--</td>--}}
                {{--<td>-</td>--}}
                {{--</tr>--}}

                {{--Vierde rij--}}

                {{--<tr class="clickable grey" data-toggle="collapse" id="row4" data-target=".row4">--}}
                {{--<td>4</td>--}}
                {{--<td>1</td>--}}
                {{--<td>Maandag 13 juni 2016 <br/> 17:20:19</td>--}}
                {{--<td>Maandag 13 juni 2016 <br/> 18:01:22</td>--}}
                {{--<td>00:41:03</td>--}}
                {{--<td><i class="glyphicon glyphicon-plus"></i></td>--}}
                {{--</tr>--}}

                {{--<tr class="collapse row4">--}}
                {{--<th colspan="2" rowspan="2"></th>--}}
                {{--<th>Overschrijding vroegtijdig opgemerkt</th>--}}
                {{--<th>Melding gegeven</th>--}}
                {{--<th>Mogelijke reden</th>--}}
                {{--<th>Opmerking</th>--}}
                {{--</tr>--}}

                {{--<tr class="collapse row4">--}}
                {{--<td>Ja</td>--}}
                {{--<td>Ja</td>--}}
                {{--<td>--}}
                {{--<ul>--}}
                {{--<li>Verkeersdrukte in de Maastunnel</li>--}}
                {{--<li>Ventilator stond lang op stand 8</li>--}}
                {{--</ul>--}}
                {{--</td>--}}
                {{--<td>Chef van de wacht W. Acht heeft de melding ingezien maar <br/> te laat gereageerd op de--}}
                {{--melding--}}
                {{--</td>--}}
                {{--</tr>--}}

                {{--</tbody>--}}
                {{--</table>--}}
            </div>
        </div>
    </div>
</div>