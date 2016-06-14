@extends('layouts.default')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <section class="dataset-blocks">

                    <h1>Luchtmetingen</h1>
                    <hr/>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Temperatuur</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Luchtkwaliteit</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Luchtvochtigheid</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>


                    <h1 style="margin-top: 300px;">Technische Tunnelinstallaties</h1>
                    <hr/>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Pompen</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Ventilatoren</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Verlichting</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Verkeerssysteem</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                    <h1 style="margin-top: 500px;">Grondmetingen</h1>
                    <hr/>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Betonmonitoring</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <article class="dataset-block" style="border-right: 10px solid green">
                            <a href="{{route('ventilatoren')}}">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="dataset-block-image">
                                        <img alt="Afbeelding van ventilator" src="{{asset('/images/icon-fan.png')}}"/>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <div class="dataset-block-name">
                                        <h3>Voegmetingen</h3>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>

                </section>
            </div>
        </div>
    </div>

@endsection