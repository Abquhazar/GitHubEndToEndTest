var assert = require('assert');

// run the test suite with npx wdio wdio.conf.js

describe('GitHub login test', function() {

	it('should login with credentials', function() {
		browser.url('https://github.com/login');
		$('#login_field').click();
		$('#login_field').setValue('username');
		$('#password').click();
		$('#password').setValue('password');
		//$('[name="commit"]').click();
    });
    
    it('should attempt to login with no credentials', function(){
        browser.url('https://github.com/login');
		$('#login_field').click();
		$('#password').click();
		//$('[name="commit"]').click();
    });

    it('should attempt to login with the incorrect account name', function(){
        var timeStamp = new Date().getTime() //get a unique value by using the current time stamp as a value
		browser.url('https://github.com/login');
		$('#login_field').click();
		$('#login_field').setValue('incorrectusername' + timeStamp);
		$('#password').click();
		$('#password').setValue('password');
		//$('[name="commit"]').click();
    });

    it('should attempt to login with the incorrect password', function(){
        var timeStamp = new Date().getTime() //get a unique value by using the current time stamp as a value
		browser.url('https://github.com/login');
		$('#login_field').click();
		$('#login_field').setValue('username');
		$('#password').click();
		$('#password').setValue('password'+ timeStamp);
		//$('[name="commit"]').click();
    });
});