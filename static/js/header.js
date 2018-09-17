var windowWidth = $(window).width();
var windowPoints = [0, 628, 940, 99999], reinitBoxesFlag = [true, true, true];

$(function(){
	$(window).resize(function(){
		windowWidth = $(window).width();
	});

	$('body').click(function(e){
		//hide header info block
		if (!$(e.target).closest('.b-header_lk_wrap').length) {
			$('.b-header_lk').removeClass('opened').find('.b_list__actions').slideUp(200);
		}
		
		//hide header info block
		if (!$(e.target).closest('.b-acc_tarif_popup').length && !$(e.target).hasClass('.tarif_link_opener')) {
			$('.b-acc_tarif_popup, .b-acc_tarif_popup .actions').hide();
		}

		//hide top line drop
		if (!$(e.target).closest('.b-top_line__item.item_other').length) {
			$('.b-top_line__drop').hide();
			$('.b-top_line__item.item_other').removeClass('opened');
		}
	});

	// top line drop
	$('.b-top_line__icon.icon_other').click(function(){
		$(this).closest('.b-top_line__item').toggleClass('opened');
		$(this).next('.b-top_line__drop').slideToggle(100);
		return false;
	});

	$('.b-list__actions__opener').click(function(){
		$(this).parents('.b-header_lk').find('.b_list__actions').slideToggle(200);
		$('.b-header_lk').toggleClass('opened');
	});
}); // end document ready