@extends('layouts.default')

@section('content')

    <div class="container">
        <div class="row">
            <section class="tunnel-tubes">

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="tunnel-tube">
                        <div class="tunnel-tube-block-left">
                            <a href="{{route('tunnelbuis', ['oostbuis', 'noordzijde'])}}">
                                <h3>Noordzijde</h3>
                            </a>
                        </div>

                        <h1>Oostbuis</h1>

                        <div class="tunnel-tube-block-right">
                            <a href="{{route('tunnelbuis', ['oostbuis', 'zuidzijde'])}}">
                                <h3>Zuidzijde</h3>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="tunnel-tube">
                        <div class="tunnel-tube-block-left">
                            <a href="{{route('tunnelbuis', ['westbuis', 'noordzijde'])}}">
                                <h3>Noordzijde</h3>
                            </a>
                        </div>

                        <h1>Westbuis</h1>

                        <div class="tunnel-tube-block-right">
                            <a href="{{route('tunnelbuis', ['westbuis', 'zuidzijde'])}}">
                                <h3>Zuidzijde</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

@endsection