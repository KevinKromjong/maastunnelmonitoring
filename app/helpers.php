<?php

//Translate Dutch tunneltubes and directions into English
function translateTubeAndDirection($tunnel, $direction)
{
    $tunnel = trim(strtolower($tunnel));
    $direction = trim(strtolower($direction));

    if ($tunnel == 'westbuis') {
        if ($direction == 'noordzijde') {
            return ['tunnel' => 'west', 'direction' => 'north'];
        } else if ($direction == 'zuidzijde') {
            return ['tunnel' => 'west', 'direction' => 'south'];
        } else {
            return ['error' => 'Not a valid direction'];
        }
    } else if ($tunnel == 'oostbuis') {
        if ($direction == 'noordzijde') {
            return ['tunnel' => 'east', 'direction' => 'north'];
        } else if ($direction == 'zuidzijde') {
            return ['tunnel' => 'east', 'direction' => 'south'];
        } else {
            return ['error' => 'Not a valid direction'];
        }
    } else {
        return ['error' => 'Not a valid tunnel'];
    }
}

