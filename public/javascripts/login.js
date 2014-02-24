require.config({
	paths: {
		jquery: 'jquery-2.0.3.min'
	}
});

require(['jquery'],function($){
	function loginSend(){
		var $login = $(".loginwrapper"),
			$username = $login.find("[name=username]"),
			$userpwd = $login.find("[name=password]"),
			$loginbtn = $login.find("[name=loginsbumit]");

		$loginbtn.on("click",function(){
			$.ajax({
				method:"post",
				url: "/dologin",
				data: {
					userid : $username.val(),
					userpwd : $userpwd.val(),
				}
			})
			.done(function(data){
				if(data == 'success'){
					window.location.replace('/');
				}else if(data == 'error'){
					alert('用户名或密码错误');
				}
			})
			.fail(function(){
				alert('网络错误！请稍后再试')
			});
		});
	};

	$(function(){
		
		loginSend();

	});
});