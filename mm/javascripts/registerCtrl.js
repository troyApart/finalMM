function validateRegisterForm(id) {

    if (validateRegisterFirstName(id))
        if (validateRegisterLastName(id))
            if (validateRegisterEmail(id))
                if (validateRegisterPassword(id))
                    registerPOST(id);


}
function validateRegisterFirstName(id) {
    var name = document.forms[id]['firstName'].value;
    if (name == null || name == "") {
        alert("First name can not be empty!");
        return false;
    }
    else if (/\d/.test(name)) {
        alert("No numbers allowed in first name!");
        return false;
    }
    else if (name.length >= 1 && name.length <= 20)
        return true;
    else {
        alert("First name must be between 1 - 20 characters long!");
        return false;
    }
}
function validateRegisterLastName(id) {
    var name = document.forms[id]['lastName'].value;
    if (name == null || name == "") {
        alert("Last name can not be empty!");
        return false;
    }
    else if (/\d/.test(name)) {
        alert("No numbers allowed in last name!");
        return false;
    }
    else if (name.length >= 1 && name.length <= 30)
        return true;
    else {
        alert("Last name must be between 1 - 30 characters long!");
        return false;
    }
}
function validateRegisterEmail(id) {
    var email = document.forms[id]['email'].value;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        alert("Not a valid e-mail address");
        return false;
    }
    else
        return true;
}
function validateRegisterPassword(id) {
    var pass = document.forms[id]['password'].value;
    var confirm = document.forms[id]['confirmPassword'].value;
    if (pass.length < 7) {
        alert("Your password's length must be atleast 7 characters long!");
        return false;
    }
    if (pass == confirm)
        return true;
    else {
        alert("Your passwords do not match!");
        return false;
    }
}
function registerPOST(id) {
    var url = "api/v1/person/";
    var emailString = document.forms[id]['email'].value;
    var passwordString = document.forms[id]['password'].value;
    var firstNameString = document.forms[id]['firstName'].value;
    var lastNameString = document.forms[id]['lastName'].value;

    $.post(url, {
        mm_function: "quarantineUser",
        email: emailString,
        password: passwordString,
        first_name: firstNameString,
        last_name: lastNameString
    }
    ).done(function (data) {
        alert(data);
    });
}