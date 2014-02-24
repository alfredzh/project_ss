'use strict';

require.config({
	paths: {
		jquery: 'jquery-2.0.3.min'
	}
});

require(['jquery'],function($){
	//65-91;
	//String.fromCharCode(65)
	var add = {
		template:'<label>'+
				'<input type="radio" name="add_radio" value="{{opt_index}}"/>'+
          		'<span>{{opt_index}}</span>'+
				'<input type="text"/>'+
			'</label>',
		init:function(){
			var template = this.template;
			$("#add_form").find(".add_options_btn").click(function(){
				var opt_len = $(".add_options").find("label").length;
				var formatted = template.replace(/{{opt_index}}/g,String.fromCharCode(65 + opt_len));

				$(".add_options").append(formatted);
			});

			this.submit();
		},
		submit:function(){
			$("#add_form").submit(function(e){
				e.preventDefault();
				var $formData = $("#add_form");
				var question = $formData.find('[name="add_question"]').val();
				//var name = $formData.find('[name="add_question_name"]').val();
				//var radio = $formData.find('[checked=true]','[name="add_radio"]').indexOf($formData.find('[name="add_radio"]'));
				//var radio = $formData.find('')

				var answers = [];
				var trueanswer = [];
				var questionType = "radio";
				for(var i = 0;i < $formData.find(".add_options label").length;i++){
					answers.push($formData.find(".add_options label").find('[name="add_options"]').eq(i).val());
					if($formData.find('[name="add_radio"]').eq(i).prop("checked")){
						trueanswer.push("true");
					}else{
						trueanswer.push("false");
					}
				}

				$.ajax({
					url:'/add_question',
					data:{
						question:question,
						answers:answers,
						trueanswer:trueanswer,
						type:questionType
					},
					method:'post'
				}).done(function(data){
					console.log(data)
				});
			});
		}
	}
	$(function(){
		//$("#add_form")
		add.init();
	});
});