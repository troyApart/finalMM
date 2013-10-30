	function validateLoginForm(id) {
		if(validateLoginEmail(id))
			if(validateLoginPassword(id))
				loginPOST(id);
	}
	function validateLoginEmail(id) {
		var email = document.forms[id]['email'].value;
		var atpos = email.indexOf("@");
		var dotpos = email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
		  alert("Not a valid e-mail address");
		  return false;
  		}
  		else 
  			return true;
	}
	function validateLoginPassword(id) {
		var pass = document.forms[id]['password'].value;
		if(pass.length < 7) {
			alert("Your password's length must be atleast 7 characters long!");
			return false;
		}
		else
			return true;
		
	}
	function loginPOST(id) {
		var url = "api/v1/person/";
		var emailString = document.forms[id]['email'].value;
		var passwordString = document.forms[id]['password'].value;

		$.post( url, { 	mm_function : "loginUser", 
								email : emailString, 
								password : passwordString 
							} 
		).done(function( data ) {alert( data );
		}); 
	}