(function ($, window, document, undefined) {

  'use strict';

  $(function () {

  	$.validator.setDefaults({
	  debug: true,
	  success: "valid"
	});


    const $interestForm = $('#registerInterest');
    $interestForm.validate();

    $interestForm.submit(function(e){
    	e.preventDefault();
    	console.log('submit button pressed');

    	if(($interestForm).valid()){
    		var $fname = $.trim($("input[name=firstName]").val()),
    			$lname = $.trim($("input[name=lastName]").val()),
    			$email = $.trim($("input[name=email]").val().toLowerCase()),
    			$mobile = $.trim($("input[name=mobile]").val()),
    			$iama = $("input[name='describesYou']:checked").val();

    		MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 3171);
	        MktoForms2.whenReady(function (form) {
	             console.log('Inside when ready function');
	              $( ".loadersmall" ).show();
	             form.onSuccess(function (vals, tyURL) {	        
	                console.log('Form successfully submitted');
	                console.log('Vals-', vals);
	                return false;
	            });
	            form.addHiddenFields({
	                 "FirstName": $fname,
	                 "LastName": $lname,
	                 // "Email": useremail,
	                 // "MobilePhone": mobile,
	                 // "Enquiry__c": user_msg,
	                 // "Lead_Type__c": lead_type,
	                 // "Level_of_Study__c": study_lvl,
	                 // "Market_Research__c": emailOptIn,
	                 // "initials": initial
	            });
	            form.submit();
	        });

    	} //interestForm.valid()
    });
  });

})(jQuery, window, document);