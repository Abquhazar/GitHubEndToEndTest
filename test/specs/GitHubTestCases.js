var assert = require('assert');

// run the test suite with npx wdio wdio.conf.js

describe('GitHub login test', function() {
	var username = new String('');
	var password = new String();

	/*
		this logout function is also a test.... but due to its reusable nature, I have it listed as a function
	*/
	function logOut() {
		it('log log the user out', function() {
			console.log("TEST++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++====+++++++++++++++++++++++++++++TEST");
			browser.url('https://github.com/');
			$('//summary/span[2]').click();
			$('(//button[@type=\'submit\'])[3]').click();
		});
	 } 

	//Test Case 1 - login with credentials:
	it('should login with credentials', function() {
		browser.url('https://github.com/login');
		$('#login_field').click();
		$('#login_field').setValue('evannotarizetest');
		$('#password').click();
		$('#password').setValue('NotarizeTest123$$');
		$('[name="commit"]').click();
		browser.pause(3000); //webdriverIO has the capacity to know when the browser is done loading... still looking into this
		expect( $('=About')).toHaveTextContaining(`About`); //searching for this text will verify that the page has loaded.
	});
	
	logOut();
	
	//Test Case 2 - login with no credentials:
    it('should attempt to login with no credentials', function(){
        browser.url('https://github.com/login');
		$('#login_field').click();
		$('#password').click();
		$('[name="commit"]').click();
		expect( $('//div[@id="js-flash-container"]/div/div')).toHaveTextContaining(`Incorrect username or password.`);
    });

	//Test Case 3 - Incorrect account name test:
    it('should attempt to login with the incorrect account name', function(){
        var timeStamp = new Date().getTime() //get a unique value by using the current time stamp as a value
		browser.url('https://github.com/login');
		$('#login_field').click();
		$('#login_field').setValue('incorrectusername' + timeStamp);
		$('#password').click();
		$('#password').setValue('password');
		$('[name="commit"]').click();
		expect( $('//div[@id="js-flash-container"]/div/div')).toHaveTextContaining(`Incorrect username or password.`);
    });

	//Test Case 4 - incorrect password test:
    it('should attempt to login with the incorrect password', function(){
        var timeStamp = new Date().getTime() //get a unique value by using the current time stamp as a value
		browser.url('https://github.com/login');
		$('#login_field').click();
		$('#login_field').setValue('username' + timeStamp);
		$('#password').click();
		$('#password').setValue('password'+ timeStamp);
		$('[name="commit"]').click();
		expect( $('//div[@id="js-flash-container"]/div/div')).toHaveTextContaining(`Incorrect username or password.`);
	});

	//Test Case 5 - Github return to homepage button:
	it('should check to see if the GitHub Logo brings the user back to the homepage', function() {
		browser.url('https://github.com/login');
		$('svg.octicon.octicon-mark-github > path').click();
		expect( $('//h1')).toHaveTextContaining(`Built for developers`);
	});

	//Test Case 6 - Forgot password check:



	/*
	Test Case 7 - Create an Account:

	The biggest issue with the next test is attempting to solve a captcha...
	
	it('should create a new account', function() {
		browser.url('https://github.com/login');
		$('=Create an account').click();
		$('#user_login').setValue('NotarizeTest123');
		$('#user_email').click();
		$('#user_email').setValue('NotarizeTest123@gmail.com');
		$('#user_password').click();
		$('#user_password').setValue('test123$$');
		$('#all_emails').click();
		$('#home_children_button').click();
		$('//div[@id="game_children_challenge"]/div/a[4]').click();
		$('#signup_button').click();
		expect( $('//main[@id="js-pjax-container"]/div[2]/div/h1')).toHaveTextContaining(`Welcome to GitHub`);
	});
	*/

	//Test Case 8 - Account has already been created
	it('should check if an account is already created', function() {
		browser.url('https://github.com/join?source=login');
		$('#user_login').click();
		$('#user_login').setValue('evannotarizetest');
		expect( $('//dd[@id="input-check-413"]/div/div[2]')).toHaveTextContaining(`Username evannotarizetest is not available.`);
	});

	//Test Case 9 - Terms:
	it('should check the terms and conditions page', function() {
		browser.url('https://github.com/login');
		$('=Terms').click();
		expect( $('//h1')).toHaveTextContaining(`GitHub Terms of Service`);
	});

	//Test Case 10 - Privacy: 
	it('should check the privacy policy page', function() {
		browser.url('https://github.com/login');
		$('=Privacy').click();
		expect( $('//h1')).toHaveTextContaining(`GitHub Privacy Statement`);
	});

	//Test Case 11 - Security:
	it('should check the security policy page', function() {
		browser.url('https://github.com/login');
		$('=Security').click();
		expect( $('//h1')).toHaveTextContaining(`Security at GitHub`);
	});

	//Test Case 12 - Contact GitHub:
	it('should test the Contact GitHub page', function() {
		browser.url('https://github.com/login');
		$('=Contact GitHub').click();
		expect( $('//h1')).toHaveTextContaining(`What can we help with?`);
	});
});