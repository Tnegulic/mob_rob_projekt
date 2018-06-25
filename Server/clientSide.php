<?php
$message =  $_POST["message"];

if(!isset($message)){
    return;
} elseif ($message == "200"){
    shell_exec("./turnOn.py");
} elseif ($message == "400"){
    shell_exec("./turnOff.py");
} else {
    return;
}
