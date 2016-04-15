@extends('layouts.default')

@section('content')

    <div class="container">
        <div class="row">
            <section class="tunnel_tubes">
                <div class="col-lg-12 col-md-6 col-sm-12 col-xs-12">
                    <div class="tunnel_tube">
                        <a href="{{route('tunnelbuis', ['westbuis', 'noordzijde'])}}">
                            <h3>Noordzijde</h3>
                        </a>

                        <h1>Westbuis</h1>

                        <a href="{{route('tunnelbuis', ['westbuis', 'zuidzijde'])}}">
                            <h3>Zuidzijde</h3>
                        </a>
                    </div>
                </div>

                <div class="col-lg-12 col-md-6 col-sm-12 col-xs-12">
                    <div class="tunnel_tube">
                        <a href="{{route('tunnelbuis', ['oostbuis', 'noordzijde'])}}">
                            <h3>Noordzijde</h3>
                        </a>

                        <h1>Oostbuis</h1>

                        <a href="{{route('tunnelbuis', ['oostbuis', 'zuidzijde'])}}">
                            <h3>Zuidzijde</h3>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div>

@endsection