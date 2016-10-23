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



	function userStr(objs) {
			var str = '';
			for(var i=0; i<objs.length; i++) {
				str += '<li>'        
	                + '<div class="head">'
	                + '<a href="/vote/detail/' + objs[i].id + '">'
	                + '<img src="' + objs[i].head_icon + '" alt="">'
	                + '</a>'
	                + '</div>'
	                + '<div class="up">'
	                + '<div class="vote">'
	                + '<span>' + objs[i].vote + '票</span>'
	                + '</div>'
	                + '<div class="btn" id=' + objs[i].id + '>'
	                + '投TA一票'
	                + '</div>'
	                + '</div>'
	                + '<div class="descr">'
	                + '<a href="/vote/detail/' + objs[i].id + '">'
	                + '<div>'
	                + '<span>' + objs[i].username + '</span>'
	                + '<span>|</span>'
	                + '<span>编号#' + objs[i].id + '</span>'
	                + '</div>'
	                + '<p>' + objs[i].description + '</p>'
	                + '</a>'
	                + '</div>'
	               	+ '</li>';
			}
			return str;
		}


	if (detailReg.test(href)) {
		console.log(href)
		var reg = /detail\/(\d*)/
		var id = reg.exec(href)[1];
		console.log(id)

		$.ajax({
				url: '/vote/all/detail/data?id=' + id, 
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

		$.ajax({
				url: '/vote/index/data?limit=20&offset=0',
				type: 'GET',
				success: function(data) {
					data = JSON.parse(data);
					$('.coming').append(userStr(data.data.objects));
			}
		});


		var offset = 20;
		var limit = 20;
		var loadFlag = true;

		window.onscroll = function() {
			var viewHeight = (document.documentElement.clientHeight || document.body.clientHeight);
			var topHeight = (document.documentElement.scrollTop || document.body.scrollTop);
			var winHeight = (document.documentElement.scrollHeight || document.body.scrollHeight);
			if (topHeight + viewHeight >= winHeight) {
				if (loadFlag) {
					loadFlag = false;
					window.setTimeout(function(){
						$.ajax({
							url: '/vote/index/data?limit=' + limit + '&offset=' + offset,
							type: 'GET',
							success: function(data) {
								data = JSON.parse(data);
								offset = offset + limit;
								var total = data.data.total;
								if (offset < total) {	
									$('.coming').append(userStr(data.data.objects));
								} else {
									$('.loadmore').html('内容已经全部显示！')
								}
								loadFlag = true;
							}
						});
					}, 1500)
				} 
			}
		}





		// var offset = 80;
		// var limit = 10;
		// var loadFlag = true;

		// window.onscroll = function() {

		// 	var realHeight = (document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop);
		// 	var winHeight = (document.documentElement.scrollHeight || document.body.scrollHeight);


		// 	console.log(realHeight, winHeight)

		// 	if (winHeight >= realHeight) {
		// 		$('.loadmore').show()

		// 		if (loadFlag) {
		// 			loadFlag = false
		// 			window.setTimeout(function(){
		// 				$.ajax({
		// 						url: '/vote/index/data?limit=' + limit + '&offset=' + offset,
		// 						type: 'GET',
		// 						success: function(data) {

		// 							data = JSON.parse(data);
		// 							console.log(data) 

		// 							var total = +data.data.total;
		// 							console.log(typeof(total))
		// 							console.log('sssss', offset , total)
		// 							if (offset < total) {
		// 								offset = offset + limit
		// 								$('.coming').append(userStr(data.data.objects));
		// 							} else {
		// 								$('.loadmore').html('内容全部加载')

		// 							}
		// 							loadFlag = true
		// 					}
		// 				});
		// 			}, 1500)
		// 		} 
				

		
				
		// 	}

		// }

}

		
	
});






