@extends('layouts.default')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-lg-9 col-lg-offset-1">
                <div class="login-screen" style="background: none;">
                    <div class="login-icon">
                        <img src="/images/gemeente-rotterdam.png" alt="Gemeente Rotterdam logo">
                        <h4>Welkom bij
                            <small>Maastunnel monitoring</small>
                        </h4>
                    </div>


                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ ucfirst($error) }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    {{ Form::open(array('url' => '/login')) }}
                    {{ Form::token() }}

                    <div class="login-form" style="margin-left: 50px;">

                        <div class="form-group">
                            {{ Form::label('', '', ['class' => 'login-field-icon fui-user', 'for' => 'login-number']) }}
                            {{ Form::text('employeeNumber', Request::old('employeeNumber'), array('placeholder' => 'Personeelsnummer', 'class' => 'form-control login-field', 'value' => '', 'id' => 'login-number')) }}
                        </div>

                        <div class="form-group">
                            {{ Form::label('', '', ['class' => 'login-field-icon fui-lock', 'for' => 'login-pass']) }}
                            {{ Form::password('password', ['class' => 'form-control login-field', 'placeholder' => 'Wachtwoord', 'id' => 'login-pass'] ) }}
                        </div>


                        <a>{{ Form::submit('Log in', ['class' => 'btn btn-primary btn-lg btn-block', 'href' => '#']) }}</a>

{{--                        {{ Html::linkAction('Auth\LoginController@login', 'Wachtwoord vergeten?', [], ['class' => 'login-link']) }}--}}

                        {{--<a class="login-link" href="#" name="lost-password-link">Lost your password?</a>--}}

                        {{--<p data-toggle="tooltip" class="forget-password-tooltip" title="Tooltip copy" data-placement="bottom"></p>--}}

                        {{Form::close()}}

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection