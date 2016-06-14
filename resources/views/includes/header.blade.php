<!DOCTYPE html>
<html>
<head>
    <title>Maastunnel - Monitoring</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="base_url" content="{{ URL::to('/') }}">
    <link rel="shortcut icon" type="image/png" href="{{asset('/favicon.png')}}"/>

    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="{{asset('/css/libs/bootstrap.min.css')}}"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{asset('/css/libs/bootstrap.min.css.map')}}"/>
    <link rel="stylesheet" href="{{asset('/css/libs/jquery.fancybox.css')}}"/>
    <link rel="stylesheet" href="{{asset('/css/libs/font-awesome-animation.min.css')}}"/>
    <link rel="stylesheet" href="{{asset('/css/libs/flat-ui.css')}}"/>
    <link rel="stylesheet" href="{{asset('/css/libs/bootstrap-datetimepicker.min.css')}}"/>


    <link rel="stylesheet" href="{{asset('/css/libs/jquery.dataTables.min.css')}}"/>
    <link rel="stylesheet" href="{{asset('/css/libs/responsive.dataTables.min.css')}}"/>

    <link rel="stylesheet" href="{{asset('/css/main.css')}}"/>


</head>

<body>
<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">

                <div id="logout">
                    @if(Auth::check())
                        <div class="btn-group">

                            <span class="btn btn-default dropdown-toggle" type="button"
                                  data-toggle="dropdown">

                                @if(!empty($mobile) && $mobile->isMobile())
                                    <a class="navbar-link" href="#">{{ Session::get('username') }}
                                        <span class="caret"></span>
                                 </a>

                                @else
                                    Ingelogd als <a class="navbar-link" href="#">{{ Session::get('username') }}
                                        <span class="caret"></span></a>
                                @endif

                            </span>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ route('logout') }}">Log uit</a></li>
                            </ul>
                        </div>

                    @endif
                </div>

                <div id="logo">
                    <a href="{{ route('home') }}">
                        @if(!empty($mobile) && $mobile->isMobile())
                            <h1>maastunnel monitoring</h1>
                        @else
                            <h1>maastunnel | monitoring</h1>
                        @endif

                    </a>
                </div>
            </div>
        </div>
    </div>
</header>

@include('includes.messages.message-notification')
@include('includes.messages.message-popup')