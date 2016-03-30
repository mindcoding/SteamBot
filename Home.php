<?php

require 'steamauth/steamauth.php';

?>

<?php
if(!isset($_SESSION['steamid'])) {

    loginbutton(); //login button

}  else {

    include ('steamauth/userInfo.php'); //To access the $steamprofile array
    
    setCookie($steamprofile['personaname'], $steamprofile['steamid']);

    logoutbutton(); //Logout Button
}     
?>
