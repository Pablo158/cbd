
$(document).ready(function(){
	
	var lv = new LoginValidator();
	var lc = new LoginController();

// main login form //

	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
			// append 'remember-me' option to formData to write local cookie //
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			//if (status == 'success') window.location.href = '/home';
            if (status == 'success') window.location.href = '/index';
		},
		error : function(e){
            lv.showLoginError('Fallo al iniciar sesión', 'Por favor, compruebe su usuario y su contraseña');
		}
	}); 
	$('#user-tf').focus();
	
// login retrieval form via email //
	
	var ev = new EmailValidator();
	
	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b> Error!</b> Please enter a valid email address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			ev.showEmailSuccess("Consulte el email que ha sido enviado a la cuenta indicada.");
		},
		error : function(){
			ev.showEmailAlert("Lo sentimos. Algo ha salido mal. Inténtelo de nuevo más tarde.");
		}
	});
	
})