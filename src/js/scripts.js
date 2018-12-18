(function ($, window, document, undefined) {

  'use strict';

  $(function () {

  	$('input:text').focusout(function(){
  		var val = $(this).val();

  		// Stick label to top once input is filled in.
  		if(val.length != 0) {
  			$(this).parent().addClass('filled');
  		} else {
  			$(this).parent().removeClass('filled');
  		}
  	});

  	// Show more options in radio buttons
  	$('input:radio[name=describesYou]').on("change", function(){

	  	if($(this).is(':checked')) {
	  		$('input:radio[name=describesYou]:not(:checked)').parent().removeClass('filled').next('div').removeClass('show');
	  		$('input:radio[name=secondary-school]').each(function(){
	  			$(this).prop("checked", false);
	  		});
	  		$('input:radio[name=describesYou]:not(:checked)').parent().removeClass('optionSelected');
	  		$(this).parent().addClass('optionSelected');
	  		// console.log($(this.id));
	  		$(this).parent().parent().addClass('filled');
	  		if($(this).find('.flexContainer--child')){
	  			$(this).parent().next().addClass('show');	
	  		}
	  	};
  	});

  	// Clicking on the fake dropdown
  	$('.fakeDropdown').on('click', function(){
  		if(!$('.flexContainer--child').hasClass('show')) {
  			$(this).addClass('flatBottom');
  			$('.flexContainer--child').addClass('show');
  		}
  	});

  	// handling the sub-radio buttons
  	$('.sub-radio input').on('change', function(){
  		$('.added-text').remove();
  		$(this).parent().parent().parent().removeClass('show');
  		$('.fakeDropdown').removeClass('flatBottom');
  	});

  	// Append selection to original radio
  	$('input:radio[name=secondary-school]').on('change', function(){
  		var selectedValue = $(this).val();
  		var sss= $('.secondary-school-student');
  	
  		$('.added-text').html("");		// clear value
  		sss.append('<span class="added-text">' + selectedValue + '</span>');
  	});

  	// Handling custom radio button styling
  	$('input:radio').on("click", function(){

	  	if($(this).is(':checked')) {
	  		$('input:radio:not(:checked)').parent().removeClass('optionSelected');
	  		$(this).parent().addClass('optionSelected');
	  	};
  	});
  	
  	

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