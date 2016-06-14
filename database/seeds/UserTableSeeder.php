<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();

        User::create([
            'name' => 'Kevin Kromjong',
            'employeeNumber' => 146167,
            'email' => 'k.kromjong@gmail.com',
            'password' => Hash::make('kevin')
        ]);
    }

}