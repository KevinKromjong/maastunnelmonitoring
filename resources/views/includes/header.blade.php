<!DOCTYPE html>
<html>
<head>
    <title>Maastunnel - Monitoring</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="base_url" content="{{ URL::to('/') }}">
    <link rel="shortcut icon" type="image/png" href="{{asset('/favicon.png')}}"/>

    <!-- Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
    {{--<link href='https://fonts.googleapis.com/css?family=Asap' rel='stylesheet' type='text/css'>--}}
    <link href='https://fonts.googleapis.com/css?family=Hind' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet" type="text/css">
            <!-- Stylesheets -->

    <link rel="stylesheet" href="{{asset('/css/bootstrap.min.css')}}"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{asset('/css/bootstrap.min.css.map')}}"/>
    <link rel="stylesheet" href="{{asset('/css/jquery.fancybox.css')}}"/>
    <link rel="stylesheet" href="{{asset('/css/jquery.circliful.css')}}"/>
    <link rel="stylesheet" href="{{asset('/css/bootstrap-datetimepicker.min.css')}}"/>
    <link rel="stylesheet" href="{{asset('/css/main.css')}}"/>

</head>

<body>
<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                {{--<div class="back-button">--}}
                    {{--<a href={{ redirect()->back() }}>--}}
                        {{--<img src="{{asset('/images/arrow-prev.png')}}">--}}
                    {{--</a>--}}
                {{--</div>--}}
                <div id="logo">
                    <a href="{{ route('home') }}">
                        <h1>maastunnel | monitoring</h1>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>