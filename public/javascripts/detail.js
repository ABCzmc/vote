$(document).ready(function($) {
	
	var href = window.location.href;
	var detailReg = /detail/;
	var indexReg = /index/;

	function detailHeaderStr(obj) {
		var str ='<div class="pl">'
				+'<div class="head">'
				+'<img src="' + obj.head_icon + '" alt="">'
				+'</div>'
				+'<div class="p_descr">'
				+'<p>' + obj.username + '</p>'
				+'<p>编号#' + obj.id + '</p>'
				+'</div>'
			    +'</div>'
			    +'<div class="pr">'
				+'<div class="p_descr pr_descr">'
				+'<p>' + obj.rank + '名</p>'
				+'<p>' + obj.vote + '票</p>'
				+'</div>'
			    +'</div>'
			    +'<div class="motto">'
				+'' + obj.description + ''
				+'</div>';
		return str;
	}

	function detailFriend(objs) {
		var str = '';
					for(var i=0; i<objs.length; i++) {
						str += '<li>'
						    +'<div class="head">'
						    +'<img src="' + objs[i].head_icon + '" alt="">'
						    +'</div>'
						    +'<div class="up">'
						    +'<div class="vote">'
						    +'<span>投了一票</span>'
						    +'</div>'
						    +'</div>'
						    +'<div class="descr">'
						    +'<h3>' + objs[i].username + '</h3>'
						    +'<p>编号#' + objs[i].id + '</p>'
						    +'</div>'
						    +'</li>'
					}
					return str;
	}


	if (detailReg.test(href)) {
		$.ajax({
				url: '/vote/all/detail/data?id=1',
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					console.log(data)
					if (data.errno === 0) {
						$('.personal').html(detailHeaderStr(data.data))
						$('.vflist').html(detailFriend(data.data.vfriend))
					}
				} 
			})
	} else if (indexReg.test(href)) {
		console.log('home')
	}

	

	
	$.ajax({
		url: '/path/to/file',
		type: 'default GET (Other values: POST)',
		dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: {
               username: {用户名},
               mobile: {手机号码},
               description: {描述},
               gender: {性别, 男：'boy', 女：'girl'},
               password: {用户密码}
           }
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
		
	
});






