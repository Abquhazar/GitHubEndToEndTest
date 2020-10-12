var assert = require('assert');

// run the test suite with npx wdio wdio.conf.js

describe('GitHub login test', function() {
	var username = "evannotarizetest";
	var password = "NotarizeTest123$$"


	function logOut() {
	/*
	*this logout function is also a test.... but due to its reusable nature, 
	I have created a function out of it/
	*/
		it('should log the user out', function() {
			browser.url('https://github.com/');
			$('//summary/span[2]').click();
			$('(//button[@type=\'submit\'])[3]').click();
			expect( $('//h1')).toHaveTextContaining(`Built for developers`);
		});
	} 

	//Test Case 1 - login with credentials:
	it('should login with credentials', function() {
		browser.url('https://github.com/login');
		$('#login_field').click();
		$('#login_field').setValue(username);
		$('#password').click();
		$('#password').setValue(password);
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
		$('/html/body/div[1]/div[2]/div/a').click();
		expect( $('//h1')).toHaveTextContaining(`Built for developers`);
	}); 

	

	//Test Case 6 - Forgot password check:
	it('should check if the forgot password page is functioning', function() {
		browser.url('https://github.com/login');
		$('/html/body/div[3]/main/div/form/div[4]/label[2]/a').click();
		expect( $('/html/body/div[3]/main/div/form/div[1]/h1')).toHaveTextContaining(`Reset your password`);
	});


	
	//Test Case 7 - Create an Account is running:
	it('should do something', function() {
		browser.url('https://github.com/login');
		$('=Create an account').click();
		expect( $('//h1')).toHaveTextContaining(`Create your account`);
	});
	
	
	//Test Case 8 - Account has already been created
	it('should check if an account is already created', function() {
		browser.url('https://github.com/join?source=login');
		$('#user_login').click();
		$('#user_login').setValue(username);
		expect( $('/html/body/div[4]/main/div/div[2]/div/form/auto-check[1]/dl/dd[2]/div/div[1]')).toHaveTextContaining('Username ' + username + ' is not available.');
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