// Munchkin for Marketo
(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      Munchkin.init("209-INQ-367");
    }
  }
  var s = document.createElement('script');
  s.type = "text/javascript";
  s.async = true;
  s.src = "//munchkin.marketo.net/munchkin.js";
  s.onreadystatechange = function() {
    if (this.readyState == "complete" || this.readyState == "loaded") {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName('head')[0].appendChild(s);
})();


(function ($, window, document, undefined) {

  'use strict';

  $(function () {

  	var courseType = $('meta[name=dkncoursetype]').attr("content"),
  	    courseLandingPage = $('meta[name=dknpagetitle]').attr("content"),
  	    courseName = $('meta[name=dkncourseaward]').attr("content"),
  	    courseNameContainer = $('span.course-name'),
  	    personNameContainer = $('span.enquirer-name'),
  	    subscribeButton = $('.js-next__form'),
  	    refresher = true,
  		myForm = $('form#registerInterest'),
  		submitCount = 0;

  	// console.log('myForm = ' + myForm);	

  	// var courseType = "undergraduate";
  		
  		if(!courseType == "") {
  		    var research = courseType.search(/research/i),
      		    undergrad = courseType.search(/undergraduate/i),
      		    postgrad = courseType.search(/postgraduate/i),
      		    courseType = "";
      		    
      		    if(undergrad > -1) {
      		        courseType = "undergraduate";
      		        // myForm.addClass(courseType);
      		    } else if (research > -1) {
      		        courseType = "research";
      		        // myForm.addClass(courseType);
      		    } else if (postgrad > -1) {
      		        courseType = "postgraduate";
      		        // myForm.addClass(courseType);
      		    }
  		} else if((!courseLandingPage == "") && ((courseLandingPage === "Undergraduate courses") || (courseLandingPage === "Postgraduate courses") || (courseLandingPage === "Research degrees"))) {
  		    var research = courseLandingPage.search(/research/i),
      		    undergrad = courseLandingPage.search(/undergraduate/i),
      		    postgrad = courseLandingPage.search(/postgraduate/i),
      		    courseType = "";
      		    
      		    if(undergrad > -1) {
      		        courseType = "undergraduate";
      		        // myForm.addClass(courseType);
      		    } else if (research > -1) {
      		        courseType = "research";
      		        // myForm.addClass(courseType);
      		    } else if (postgrad > -1) {
      		        courseType = "postgraduate";
      		        // myForm.addClass(courseType);
      		    }
  		} else {
  		    // myForm.addClass("generic");
  		}
  		
  		// Filling in dynamic text for course name
  		if(!courseName == "") {
  		    courseNameContainer.text('the ' + courseName + ' course.');
  		} else if(!courseLandingPage == "") {
  		    courseNameContainer.text(courseLandingPage);
  		}
  		
  		// Filling in dynamic text for persons name
  		subscribeButton.on('click', function(){
  		    var fname = $.trim($("#registerInterest input[name=firstName]").val());
  		    personNameContainer.text(fname + '.');
  		    
  		});

  	function closeOverlay() {
  		$('.overlay').removeClass('show');
	    $('body').removeClass('noscroll');
  	}
  	
  	function submitForm() {

  		// console.log(refresher);
    	if(($('#registerInterest')).valid()){
    		var fname = $.trim($("#registerInterest input[name=fName]").val()),
    			lname = $.trim($("#registerInterest input[name=lName]").val()),
    			email = $.trim($("#registerInterest input[name=regEmail]").val().toLowerCase()),
    			mobile = $.trim($("#registerInterest input[name=regMobile]").val()),
    			iama = $("#registerInterest input[name='describesYou']:checked").val(),
    			studyLevel = $("#registerInterest input[name='qualificationLevel']:checked").val(),
    			startStudy = $.trim($("#registerInterest input[name=startDate]:checked").val()),
    			studyArea = $.trim($("#registerInterest span.js-textReplace.no-radio").text()),
    			yearLevel = $.trim($("#registerInterest .secondary-school-student .added-text").text()),
    			likeToKnow = $("#registerInterest input[name=wantToKnow]:checked").map(function() {
    				return this.value;
    			}).get().join('; ');

    		MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 3171);
	        MktoForms2.whenReady(function (myForm) {
        		console.log('myForm = ' + myForm);
	            console.log('Email address = ' + email);
	            console.log('First Name = ' + fname);
	            console.log('Last Name = ' + lname);
	            console.log('Mobile number = ' + mobile);
	            console.log('Lead Type = ' + iama);
	            console.log('Commencement Data = ' + startStudy);
	            console.log('Interest = ' + likeToKnow);
	            console.log('study area = ' + studyArea);
	            console.log('study Level = ' + studyLevel);
	            console.log('year Level = ' + yearLevel);
	              
	             myForm.onSuccess(function (vals) {	        
	                console.log('Form successfully submitted');
	                console.log('Vals-', vals);
	                return false;

	            });
	            myForm.addHiddenFields({
	                 "FirstName": fname,
	                 "LastName": lname,
	                 "Email": email,
	                 "MobilePhone": mobile,
	                 "Lead_Type__c": iama,
	                 "Commencement_Date__c": startStudy,
	                 "interests": likeToKnow,
	                 "Study_Area__c": studyArea,
	                 "Level_of_Study__c": studyLevel,
	                 "disciplineArea": studyArea,
	                 "Year_Level__c": yearLevel,
	            });
	            myForm.submit();
	            






	            if(refresher === true) {
		            $('button[name=update]').html('<span style="display:none" class="loadersmall"></span>Updating details');
		            $('.loadersmall').css("display","inline-block");
		        }
		        if(refresher === true) {
		            setTimeout(function(){
		            	$('.overlay').removeClass('show');
		            	$('.register-interest-overlay').css('display: none');
		            	$('body').removeClass('noscroll').delay(500).queue(function(){
		            		location.reload();	
				  		});
		            }, 3000);
		        } else {
		        	$('.overlay').removeClass('show');
	            	$('.register-interest-overlay').css('display: none');
	            	$('body').removeClass('noscroll');
		        }
	        });
    	}
  	}

  	// Form validation
	$('form#registerInterest').validate({
		rules: {
			fName: {
				required: true,
				minlength: 2
			},
			regEmail: {
				required: true,
				email: true
			},
			regMobile: {
				required: true,
				number: true,
				minlength: 10,
				maxlength: 10
			},
			describesYou: {
				required: true
			}

		},
		messages: {
			fName: "Ensure your first name is entered correctly",
			regEmail: "Please ensure your email is in the correct format. e.g. name@email.com",
			regMobile: {
				required: "Check you number for correctness",
				number: 'Phone number must consist of only numbers',
				minlength: "Phone number must be 10 digits long",
				maxlength: "Phone number must be 10 digits long",
			},
			describesYou: "You must select the one that best describes you"
		},
		errorPlacement: function (error, element) {
	        // console.log('errors - ', error);
	        if (element.attr("name") == "describesYou") {
	            $( '.section-describesYou legend' ).append(error);
	        } else if (element.attr("name") == "fName") {
	        	error.insertAfter(element);
	        } else if (element.attr("name") == "regEmail") {
	        	error.insertAfter(element);
	        } else if (element.attr("name") == "regMobile") {
	        	error.insertAfter(element);
	        } else {
	        	(error.insertAfter( element ));
	        }
	    }
	});

	// On click or blur of input check whether form is valid
	$('form#registerInterest .form-section-one input').on('blur click', function(){
    	var emptyFields = $('.inputContainer.required input').filter(function(){
    		return $(this).val() === "";
    	}).length;
    	var errorMsgs = $('input.error').length;
    	var radiocheck = $('input:radio[name="describesYou"]:checked').length;

		if((emptyFields === 0) && (errorMsgs === 0) && radiocheck != 0) {
			$('button[name=nextForm').removeAttr('disabled');
		}
    });	

	// Submit form
    $('#registerInterest button[type=submit]').one('click', function(e){
    	e.preventDefault();
    	refresher = true;
    	submitForm(e);
    });

  	var overlay = $('.overlay'),
  		body = $('body');

  	// On click of Get more info CTA, open up register interes form in modal
  	$('.navigation__utility-link_Get_more_info').on('click', function(e){
  		var	myForm = $('form#registerInterest');
  		e.preventDefault();
  		overlay.addClass('show');
  		body.addClass('noscroll');
  			
		var registerForm = $('form#registerInterest');
		// console.log('this is it - ' + myForm);	
  	
  	});


  	// Add class on focus of input to move label out of the way of input field
	$('input[type="text"], input[type="tel"]').focus(function(){
		var val = $(this).val();
		if(val.length == 0) {
			$(this).parent().addClass('filled');
		}
	});	

	// On FocusOut of input, if input is empty, place label back in original state
	$('input[type="text"], input[type="tel"]').focusout(function(){
		var val = $(this).val();
		if(val.length == 0) {
			$(this).parent().removeClass('filled');
		}
	});

  	// Show more options in radio buttons
  	$('input:radio[name=describesYou], input:radio[name=studyInterest]').on("click", function(){
  		$(this).closest('.fakeDropdown').toggleClass('open filled');
  		$(this).parent().eq(2).addClass('filled');
  	});

  	// Clicking on the fake dropdown
  	$('.section-describesYou .radioButton:not(.fakeDropdown)').on('click', function(){
  		if($('.fakeDropdown').hasClass('open')) {
  			$('.fakeDropdown').removeClass('open filled');
  		}
  		$('.added-text').remove();
  	});

  	// handling the sub-radio buttons
  	$('.section-describesYou .sub-radio input').on('change', function(){
  		$('.added-text').remove();
  		$(this).closest('.fakeDropdown').removeClass('open');
  	});

  	// Append selection to original radio
  	$('input:radio[name=secondary-school]').on('change', function(){
  		var selectedValue = $(this).val();
  		var sss= $('.secondary-school-student');
  	
  		$('.added-text').html("");		// clear value
  		sss.append('<span class="added-text">' + selectedValue + '</span>');
  	});

  	$('input:radio[name=subject]').on('change', function(){
  		var selectedValue = $(this).next('span').text();
  		var textReplaceContainer = $('.js-textReplace');

  		textReplaceContainer.text(selectedValue);
  	});

  	// Handling custom radio button styling
  	$('input:radio').on("click", function(){
  		// console.log('input:radio clicked');
	  	if($(this).is(':checked')) {
	  		$('input:radio:not(:checked)').parent().removeClass('optionSelected');
	  		$('input:radio:not(:checked)').parent().eq(2).removeClass('optionSelected');
	  		$(this).parent().addClass('optionSelected');
	  		$('input:radio:not(:checked)').closest('label').removeClass('optionSelected');
	  	}

	  	if($('.radioButton.fakeDropdown > div > input[type=radio]').is(':checked')) {
  			$('.radioButton.fakeDropdown').addClass('optionSelected');
  		} else {
  			$('.radioButton.fakeDropdown').removeClass('optionSelected');
  		}

  		if($('.sub-radio .radioButton input[type=radio]').is(':checked')) {
  			// var btnchecked = $(this).attr('id');
  			// var btncheckedparent = btnchecked.parent();

  			console.log('button pressed is ' + $(this).closest('label'));
  			// console.log('button pressed parent is ' + btncheckedparent);
  			$('.sub-radio .radioButton').removeClass('optionSelected');
  			$('.sub-radio input:radio:checked').parent().addClass('optionSelected');
  		}
  	});
  	

  	$('input:checkbox').on('click', function(){
  		if(!$(this).is(':checked')) {
  			$(this).parent().removeClass('optionSelected');
  		} else {
  			$(this).parent().addClass('optionSelected');
  		}
  	});

  	// On completion of Form Part one show Part two
  	$('button[name=nextForm]').on('click', function(){
  		$(this).find('.loadersmall').css("display","inline-block").stop().delay(3000).queue(function(){
  			$('.form-section-one').addClass('fadeOut');	
  			$('.form-section-two').addClass('fadeIn');
  		});
  	});
  	
  	// Close modal
  	$('.modalCloseButton').on('click', function(){
  		if(($('#registerInterest')).valid()){
  			refresher = false;
  			submitForm();
  			$('#registerInterest button[name=update]').html('<span style="display:none" class="loadersmall"></span>Update my details');
  		} else {
  			closeOverlay();
  			$('label.error').remove();
  		}
  	});
  	
  });

})(jQuery, window, document);