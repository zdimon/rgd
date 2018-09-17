$.ajaxSetup({ cache: false });
$(function() { $.smartbanner({

	button:  'Установить',
})});

$(document).ajaxStart(function(){
	$('html, body').addClass('loading');
});
$(document).ajaxStop(function(){
	$('html, body').removeClass('loading');
});
$("div.lazy").lazyload({
	effect : "fadeIn",
});

Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
        url  = 'http://vkontakte.ru/share.php?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&title='       + encodeURIComponent(ptitle);
        url += '&description=' + encodeURIComponent(text);
        url += '&image='       + encodeURIComponent(pimg);
        url += '&noparse=true';
        Share.popup(url);
    },
    odnoklassniki: function(purl, text) {
        url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        url += '&st.comments=' + encodeURIComponent(text);
        url += '&st._surl='    + encodeURIComponent(purl);
        Share.popup(url);
    },
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent(ptitle);
        url += '&p[summary]='   + encodeURIComponent(text);
        url += '&p[url]='       + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
        url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(ptitle);
        url += '&url='      + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    mailru: function(purl, ptitle, pimg, text) {
        url  = 'http://connect.mail.ru/share?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&title='       + encodeURIComponent(ptitle);
        url += '&description=' + encodeURIComponent(text);
        url += '&imageurl='    + encodeURIComponent(pimg);
        Share.popup(url);
    },
    
    gp: function(purl) {
        url  = 'https://plus.google.com/share?';
        url += 'url='          + encodeURIComponent(purl);
        Share.popup(url);
    },

    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
};

$().ready(function(){
	if (window.location.hash=="#enter_promo_code") {
		$('#enter_promo_code').modal('show');
	}
	if (window.location.hash=="#get_access") {
		$('#get_access').modal('show');
	}
	if (window.location.hash=="#get_access_guest") {
		$('#get_access_guest').modal('show'); 
	}
	if (window.location.hash=="#get_access_with_promo_code") {
		$('#get_access_with_promo_code').modal('show');
	}
	if (window.location.hash=="#login") {
		$('#autorization').modal('show');
	}
	if (window.location.hash=="#restore_access") {
		$('#restore_access').modal('show');
	}
	if ($('#subscribe').size()) {
		$('#subscribe').on('click',function(e){
			e.preventDefault();
			$('#get_access').modal('show');
		});
	}
	$('#enterPromoCode').on('click',function(e) {
		e.preventDefault();
		$('.modal').modal('hide');
		$('#enter_promo_code').modal('show');
	});
	$(document).on('click','.toFavorites',function(e){
		e.preventDefault();
		$.ajax({
			'url':'/ajax/setFavorite/'+$(this).attr('data-issue-id'),
			'data':{
				'state':1,
			},
			'dataType':'json',
			'method':'post',
			'success':function(data){
				if (data['status']=='ok') {
					$('.toFavoritesContainer .addFavor').fadeOut(100);
					$('.toFavoritesContainer .removeFavor').delay(100).fadeIn(200);
					$('#favorNum').text(data['num']);
				}
			}
		})
	});
	$(document).on('click','.removeFromFavorites',function(e){
		e.preventDefault();
		$.ajax({
			'url':'/ajax/setFavorite/'+$(this).attr('data-issue-id'),
			'data': {
				'state':0,
			},
			'dataType':'json',
			'method':'post',
			'success':function(data){
				if (data['status']=='ok') {
					$('.toFavoritesContainer .removeFavor').fadeOut(100);
					$('.toFavoritesContainer .addFavor').delay(100).fadeIn(200);
					$('#favorNum').text(data['num']);	
				}
			}
		})
	});

	$('#loginForm').on('submit',function(e){
		if (!$(e.target).hasClass('correct')) {
			e.preventDefault()
			$.ajax({
				'url':'/ajax/login',
				'type':'post',
				'dataType':'json',
				'data':	$(e.target).serialize(),
				'success':function(data) {
					var summary=$('<p/>').appendTo($(e.target).find('.error-summary').empty());
					if (data['status']!='ok') {
						$.each(data['errors'],function(i,el){
							$(summary).append($('<span/>').html(el)).append('<br/>');
						});
						$(e.target).addClass('error');
					} else {
						$(e.target).addClass('correct');
						$(e.target).submit();
					}
				}
			});			
		} else {
			return true;	
		}			
	});
	$('#getAccessForm').on('submit',function(e){
		if (!$(e.target).hasClass('correct')) {
			e.preventDefault()
			$.ajax({
				'url':'/ajax/getAccess',
				'type':'post',
				'dataType':'json',
				'data':	$(e.target).serialize(),
				'success':function(data) {
					var summary=$('<p/>').appendTo($(e.target).find('.error-summary').empty());
					if (data['status']!='ok') {
						$.each(data['errors'],function(i,el){
							$(summary).append($('<span/>').html(el)).append('<br/>');
						});
						$(e.target).addClass('error');
					} else {
						$(e.target).addClass('correct');
						$(e.target).submit();
					}
				}
			});			
		} else {
			return true;	
		}			
	});
	$('#activatePromoCode').on('submit',function(e) {
		if (!$(e.target).hasClass('correct')) {
			e.preventDefault()
			$.ajax({
				'url':'/ajax/activatePromoCode',
				'type':'post',
				'dataType':'json',
				'data':	$(e.target).serialize(),
				'success':function(data) {
					var summary=$('<p/>').appendTo($(e.target).find('.error-summary').empty());
					if (data['status']!='ok') {
						$.each(data['errors'],function(i,el){
							$(summary).append($('<span/>').html(el)).append('<br/>');
						});
						$(e.target).addClass('error');
					} else {
						$(e.target).addClass('correct');
						$(e.target).submit();
					}
				}
			});			
		} else {
			return true;	
		}			
		
	})
	
	$('#getAccessWithPromoCodeForm').on('submit',function(e){
		if (!$(e.target).hasClass('correct')) {
			e.preventDefault()
			$.ajax({
				'url':'/ajax/getAccessWithPromoCode',
				'type':'post',
				'dataType':'json',
				'data':	$(e.target).serialize(),
				'success':function(data) {
					var summary=$('<p/>').appendTo($(e.target).find('.error-summary').empty());
					if (data['status']!='ok') {
						$.each(data['errors'],function(i,el){
							$(summary).append($('<span/>').html(el)).append('<br/>');
						});
						$(e.target).addClass('error');
					} else {
						$(e.target).addClass('correct');
						$(e.target).submit();
					}
				}
			});			
		} else {
			return true;	
		}			
	});
	$('#passwordResetForm').on('submit',function(e){
		e.preventDefault()
		$.ajax({
			'url':'/ajax/passwordReset',
			'type':'post',
			'dataType':'json',
			'data':	$(e.target).serialize(),
			'success':function(data) {
				var summary=$('<p/>').appendTo($(e.target).find('.error-summary').empty());
				$('#resetCaptcha').click();
				if (data['status']!='ok') {
					$.each(data['errors'],function(i,el){
						$(summary).append($('<span/>').html(el)).append('<br/>');
					});
				} else {
					$(e.target).hide();
					$('#passwordResetResult').show().html(data['message']);
				}
			}
		});			
	});
	$('#flush_password').on('click',function(e){
		e.preventDefault();
		if (confirm('Вы уверены что хотите сменить пароль?')) {
			$.ajax({
				'url':'/ajax/passwordReset',
				'type':'post',
				'dataType':'json',
				'data':	{
					'tel': $(this).attr('data-msisdn'),
				},
				'success':function(data) {
					if (data['status']=='ok') {
						$('#flush_password').parent().html(data['message']);
					}
				}
			});			
		}
	});
	$('#restore_access').on('shown.bs.modal',function(e){
		$('#passwordResetForm')[0].reset();
		$('#passwordResetForm').show();
		$('#passwordResetResult').hide();
	});
	if ($('#profileNotification').size()) {
		$('#profileNotification .checkbox').on('click',function(e){
			var state=$(this).hasClass('active');

			$.ajax({
				'url':'/ajax/setNotificationState',
				'type':'post',
				'dataType':'json',
				'data':	{
					'state': state,
				},
				'success':function(data) {

					$('#profileNotification .descr').html(data['message']);
				}
			});			
			
		});
	}
	if ($('#profileSubscription').size()) {
		$('#profileSubscription .checkbox').on('click',function(e){

			if (confirm('Вы уверены что хотите отменить подписку?')) {
				$(this).parents('form').submit();				
			} else {
				$('#profileSubscription .checkbox').addClass('active');
			}
		});
	}
	$('#favorite .icon').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		var i_id=$(this).attr('data-issue-id');
		$.ajax({
			'url':'/ajax/setFavorite/'+i_id,
			'data': {
				'state':0,
			},
			'dataType':'json',
			'method':'post',
			'success':function(data){
				if (data['status']=='ok') {
					var list=$('#favorite li[data-issue-id='+i_id+']').parent();
					$('#favorite li[data-issue-id='+i_id+']').fadeOut();
					$('#favorNum').text(data['num']);
					if (data['num']==0) {
						$('<p/>').html('Нет избранных журналов.').appendTo(list.parent());
						list.remove();
					}				
				}
			}
		})
	})
});
