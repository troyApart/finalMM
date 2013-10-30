
var loginDisplayed = false;
var registerDisplayed = false;
function showHideDisplay(id) {
    if (id == 'loginBox') {
        document.getElementById('registerBox').style.display = 'none';
        registerDisplayed = false;
        if (!loginDisplayed) {
            loginDisplayed = true;
            document.getElementById('loginButton').style.background = '#FF9000';
            document.getElementById(id).style.display = 'block';
            document.forms['loginIdForm'].elements['email'].focus();
            hide('registerButton');
        }
        else {
            loginDisplayed = false;
            hide('loginButton');
            document.getElementById(id).style.display = 'none';
        }
    }
    else if (id == 'registerBox') {
        document.getElementById('loginBox').style.display = 'none';
        loginDisplayed = false;
        if (!registerDisplayed) {
            registerDisplayed = true;
            document.getElementById('registerButton').style.background = '#FF9000';
            document.getElementById(id).style.display = 'block';
            document.forms['registerIdForm'].elements['firstNameRow'].focus();
            hide('loginButton');
        }
        else {
            registerDisplayed = false;
            hide('registerButton');
            document.getElementById(id).style.display = 'none';
        }
    }
}
function hide(id) {
    document.getElementById(id).style.background = '#ffc477';
    document.getElementById(id).style.background = '-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ffc477), color-stop(1, #fb9e25) )';
    document.getElementById(id).style.background = '-moz-linear-gradient( center top, #ffc477 5%, #fb9e25 100% )';
}