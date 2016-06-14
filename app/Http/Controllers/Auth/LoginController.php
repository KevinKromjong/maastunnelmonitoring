<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    private $errors = [];

    public function index()
    {
        return view('login');
    }

    public function login()
    {
        // Getting all post data
        $data = Input::all();

        // Applying validation rules.
        $rules = array(
            'employeeNumber' => 'required|numeric|digits:6',
            'password' => 'required|alpha_num|min:5',
        );

        $attrNames = [
            'employeeNumber' => 'personeelsnummer',
            'password' => 'wachtwoord'
        ];

        $validator = Validator::make($data, $rules);
        $validator->setAttributeNames($attrNames);

        if ($validator->fails()) {
            return redirect()->to('login')
                ->withInput(Input::except('password'))
                ->withErrors($validator);
        } else {
            $userdata = array(
                'employeeNumber' => intval(Input::get('employeeNumber')),
                'password' => Input::get('password')
            );

            if (Auth::validate($userdata)) {
                if (Auth::attempt($userdata)) {
                    Session::set('username', Auth::user()->name);
                    
                    return Redirect::to('/');
                }
            } else {
                // if any error send back with message.
                Session::flash('error', 'Something went wrong');
                return Redirect::to('login');
            }

        }
    }

    public function logout()
    {
        Auth::logout();
        Session::flush();
        return redirect()->to('login');
    }

//    public function resetPassword()
//    {
//        $data = Input::all();
//
//        dd($data);
//        if(($data)) {
//            return "nope";
//        } else {
//            return 'yay';
//        }
//    }
}