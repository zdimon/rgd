$(function(){
	oMenu.init();
});

var oMenu = {
	showMenu: {
		desktop: function(){
			$('body').on('click', '.b-mainmenu__item .b-mainmenu_link, .b-mainmenu__item_btn.all_desktop .b-mainmenu_link, .b-mainmenu__item_btn.all_tablet .b-mainmenu_link', function(e){
				var menuItem = $(this).parent();

				if (menuItem.hasClass('opened') && this.tagName.toLowerCase() == 'a') {
					return;
				}

				if (Modernizr.touch) {
					if (menuItem.hasClass('opened')) {
						menuItem.removeClass('opened').find('.b-mainmenu_drop').stop().slideUp(300);
					}
					else {
						$('.b-mainmenu_drop').stop().hide();
						$('.b-mainmenu__item, .b-mainmenu__item_btn').removeClass('opened');
						menuItem.addClass('opened').find('.b-mainmenu_drop').stop().slideDown(300,function(){$(this).css({height: 'auto'})});
					}
				}
				if ($(this).closest('.menu-v8')) {
					return false;
				}
			});
		},
		tablet: function(){
			$('.b-mainmenu__item, .b-mainmenu__item_btn.all_desktop, .b-mainmenu__item_btn.all_tablet').hover(
				function(){
					if (!Modernizr.touch) {
						$(this).addClass('opened').find('.b-mainmenu_drop').stop().delay(80).slideDown(300, function(){$(this).css({height: 'auto'})});
					}
				},
				function(){
					if (!Modernizr.touch) {
						$(this).removeClass('opened').find('.b-mainmenu_drop').stop().hide();
					}
				}
			);
		},
		phone: function(){
			$('body').on('click', '.b-mainmenu__item_btn.all_mobile .b-mainmenu_link', function(){
				var menuItem = $(this).parent();
				if (menuItem.hasClass('opened')) {
					$('.b-mainmenu_mobile').animate({
						left: '100%'
					},300, function(){
						$('body').removeClass('mobilemenu_opened')
					});
					menuItem.removeClass('opened');
				}
				else {
					$('body').addClass('mobilemenu_opened').parents('html').css({
						'overflow' : 'hidden'
					});
					$('.b-mainmenu_mobile').show().animate({
						left: '10%'
					}, 300);
					menuItem.addClass('opened');
				}
				return false;
			});

			$('body').on('click', '.mainmenu_mobile_close', function(){
				$('.b-mainmenu_mobile').animate({
					left: '100%'
				},200, function(){
					$('body').removeClass('mobilemenu_opened').parents('html').css({
						'overflow' : 'auto'
					});
					$('.b-mainmenu_mobile').hide();
				});
				$('.b-mainmenu__item_btn.all_mobile').removeClass('opened');
			});

			$('.b-mainmenu_list_mobile_bonus .b-mainmenu_list_item.arrow').click(function(){
				var parentList = $(this).parents('.b-mainmenu_list_mobile_bonus');

				if (parentList.next('.b-mainmenu_list_mobile').length) {
					parentList.hide();
					$('.b-mainmenu_mobile__head').hide();
					parentList.next('.b-mainmenu_list_mobile').show();
					$('.js-mainmenu_mobile_all').show();
				}
			});

			$('.b-mainmenu_mobile .js-mainmenu_mobile_all').click(function(){
				var parentList = $('.b-mainmenu_list_mobile_bonus');
				parentList.show();
				$('.b-mainmenu_mobile__head').show();
				parentList.next('.b-mainmenu_list_mobile').hide();
				$('.js-mainmenu_mobile_all').hide();
			});

			$('.b-mainmenu_mobile .b-mainmenu_list_item.arrow').click(function(){
				var parentList = $(this).parents('.b-mainmenu_list_mobile'),
					parentItem = $(this).closest('li');

				if (parentItem.find('.b-mainmenu_sublist_mobile').length) {
					parentList.children('li').not(parentItem).hide();
					parentItem.children('.b-mainmenu_list_item').hide();
					$('.js-mainmenu_mobile_empty').hide();
					$('.js-mainmenu_mobile_all').hide();
					parentItem.find('.js-mainmenu_mobile_back').show();
					parentItem.find('.b-mainmenu_sublist_mobile').show();
					parentItem.addClass('opened');
				}
			});

			$('.b-mainmenu_mobile .js-mainmenu_mobile_back').click(function(){
				var parentList = $(this).parents('.b-mainmenu_list_mobile');
				var parentItem = $(this).closest('li');

				parentItem.find('.b-mainmenu_sublist_mobile').hide();
				parentItem.find('.js-mainmenu_mobile_back').hide();
				$('.js-mainmenu_mobile_empty').show();
				$('.js-mainmenu_mobile_all').show();
				parentItem.find('.b-mainmenu_list_item').show();
				parentList.children('li').show();
				parentItem.removeClass('opened');
			});

			$('.b-mainmenu_list_item__opener').click(function(){
				$(this).toggleClass('opened');
				$(this).next('.b-mainmenu_sublist_mobile__drop').slideToggle(200);
			});
		}
	},
	init: function(){
		oMenu.showMenu.desktop();
		oMenu.showMenu.tablet();
		oMenu.showMenu.phone();

		$('body').click(function(e){
			if (!$(e.target).closest('.b-mainmenu__item_btn').length) {
				$('.desktop_menu_opener, .tablet_menu_opener').removeClass('opened').next('.b-mainmenu_drop').hide();
			}

			// hide drop menu
			if (!$(e.target).closest('.b-mainmenu').length) {
				$('.b-mainmenu__item').removeClass('opened');
				$('.b-mainmenu_drop').hide();
			}
		});

		$('body').on('click', '.b-mainmenu_lvl3_collapse', function () {
			$(this).parents('.b-mainmenu__item').removeClass('opened').find('.b-mainmenu_drop').stop().hide();
		});

		$('body').on('click', '.b-mainmenu_drop_slideup', function () {
			$(this).parents('.b-mainmenu__item').removeClass('opened').find('.b-mainmenu_drop').stop().hide();
		});
	}
}
