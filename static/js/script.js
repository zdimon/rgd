$(document).ready(function(){ /*open ready*/
	$( document ).ajaxStart(function() {
		NProgress.start();
	});
	$( document ).ajaxStop(function() {
		NProgress.done();
	});

	/*start Owl Carousel in mainpage */
	$("#j_slider .slider").owlCarousel({
		nav: true,
		navText: false,
		dots: false,
		loop:true,
		autoplayTimeout: 5000,
		autoplay: true,
		autoplaySpeed: 1500,
		autoplayHoverPause: true,
		center:true,
		responsive : {
			0 : {
				items: 1
			},
			480 : {
				items:3,
 				autoWidth:true
			},
			768 : {
				items:5,
 				autoWidth:true
			}
		}
	});

	/*start audio articles Owl Carousel in mainpage */
    $(".js-audio-slider").owlCarousel({
        nav: true,
        navText: false,
        dots: false,
        loop: true,
        autoplayTimeout: 5000,
        autoplay: true,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        center: false,
        responsive : {
            0 : {
                items: 1
            },
            480 : {
                items: 2,
                autoWidth: false
            },
            768 : {
                items: 3,
                autoWidth: false
            },
            992 : {
                items: 4,
                autoWidth: false
            }
        }
    });


	initNewsOwl();
	/* open/close side-menu */  
	$(".open-side-menu").click(function(){
		if ($(".side-menu").hasClass('opened')) {
			$(".side-menu").css({left: "-100%"}).removeClass('opened').addClass('closed');
			$('body').css({"overflow-y": ""});
		}else {
			$(".side-menu").css({left: 0}).removeClass('closed').addClass('opened');
			$('body').css({"overflow-y": "hidden"});
		}
	});
	$(".side-menu").click(function(){
		$(".side-menu").css({left: "-100%"}).removeClass('opened').addClass('closed');
			$('body').css({"overflow-y": ""});
	});
	$("input[name=tel]").mask("(999) 999-99-99",{placeholder:"_"});
	$(".set .checkbox").click(function() { 
		$(this).toggleClass('active');
		if ( $(this).hasClass('active') ) {
			$(this).children().attr('checked', true);
		}else{
			$(this).children().attr('checked', false);
		}
	});
	/* open/close search field in mobile header */

	$("header .mobile .icon-search").click(function() {
		$(".searchform").css("top",2);
	});
	$("header .searchform i").click(function() {
		$(".searchform").css("top",-40);
	});


    var Player = {

        jp: null,
        src: '',

        init: function () {
            Player.jp = $(".js-audio-player").jPlayer({
                // Player.jp = $("#jquery_jplayer_1").jPlayer({
                // swfPath: "http://jplayer.org/latest/dist/jplayer",
                // supplied: "mp3, oga",
                // wmode: "window",
                // useStateClassSkin: true,
                // autoBlur: false,
                // smoothPlayBar: true,
                // keyEnabled: true,
                // remainingDuration: true,
                // toggleDuration: true
                error: function (event) {
                    console.error(event.jPlayer.error.type);
                },
                pause: function (event) {
                    $('.js-play').removeClass('playing');
                },
                errorAlerts: true,
                solution: "html",
                swfPath: "js/jquery.jplayer.swf",
                supplied: "mp3",
                wmode: "window",
            });
            $(document).on('click', '.js-play', function () {
                var name = $(this).data('name');
                var src = $(this).data('src');
                if($(this).hasClass('playing')) {
                    console.log('stop');
                    $(this).removeClass('playing');
                    Player.stop();
                } else {
                    if(Player.src == src) {
                        $(this).addClass('playing');
                        console.log('play');
                        Player.play();
                    } else {
                        console.log('set');
                        $('.js-play').removeClass('playing');
                        $(this).addClass('playing');
                        Player.src = src;
                        Player.set(name, src);
                    }
                }
                return false;
            });
        },

        set: function (name, src) {
            $('.audio-player').addClass('active');
            Player.jp.jPlayer("setMedia", {
                title: name,
                mp3: src,
            });
            Player.jp.jPlayer("play");
        },

        play: function () {
            Player.jp.jPlayer("play");
        },

        stop: function () {
            Player.jp.jPlayer("stop");
        },

    };

    Player.init();
	
/* close ready */	
});

function initNews(dates) {

	news_dates = dates;

	$('#newsDatepicker a').on('click', function(e){
		e.preventDefault();
		$('#newsDatepicker').data("DateTimePicker").toggle();
	});

	var d = new Date;

	$('#newsDatepicker').datetimepicker({
        locale: 'ru',
        format: 'YYYY-MM-DD',
        minDate: '2017-01-01',
        defaultDate: moment().format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD'),
        useCurrent: true,
        enabledDates: dates.map(function(item){ return moment(item)})
    });

	$('#newsDatepicker').on('dp.change', function(e) {
		var date = $('#newsDatepicker input').val();
		setTimeout(function(){
			$.ajax({
				'url': '/ajax/getNews/' + date, 
				'dataType': 'json',
				'success': function(data) {
					$('#n_slider .owl-carousel').trigger('destroy.owl.carousel');
					var slider = $('#n_slider .slider').empty();//.removeClass('owl-carousel owl-loaded').empty();
					$.each(data['articles'], function(i,e){
						var item = $('<li/>').addClass('journal');				
						var image = $('<div/>').attr({
							'class': 'lazy',
							'data-original': e['image'],
							'style': 'background-image: url(\'/images/smallplaceholder.png\'); width: 247px; height: 180px;',
						});

						var icons = $('<span/>').addClass('newsIcons');
						if (e['text_continue']) {
							$('<img/>').attr({
								class: 'newsTypeIcon',
								src: '/images/i_text.png',
							}).appendTo(icons);
						}
						if (e['reader_url']) {
							$('<img/>').attr({
								class: 'newsTypeIcon',
								src: '/images/i_pdf.png',
							}).appendTo(icons);
						}
						var title = $('<p/>').addClass('title').html(e['title'] + '<br/>' + e['short_text']+ ' ').append(icons);

						var issue = $('<p/>').addClass('issue').html(e['journal'] + ' ' + e['issue']);
						var link = $('<a/>').attr('href', '/catalogue/news/' + date + '/' + e['issue_id']).attr('title', e['title']).append(image).append(title).append(issue);
						var wrap = $('<div/>').addClass('wrap').append(link);
						$(item).append(wrap).appendTo(slider);
					});
					initNewsOwl();
				}
			});
		}, 100);
	});	
}
function initNewsOwl() {
	$("#n_slider .slider").owlCarousel({
		nav: true,
		navText: false,
		dots: false,
		loop:true,
		autoplayTimeout: 5000,
		autoplay: true,
		autoplaySpeed: 1500,
		autoplayHoverPause: true,
//		center:true,
		responsive : {
			0 : {
				items: 1
			},
			480 : {
				items:2,
				margin: 20,
 				autoWidth:true
			},
			768 : {
				items:4,
				margin: 20,
// 				autoWidth:true
			}
		},
        onInitialized:function(){
            nSliderUpdateSize();
        }
	}).on('changed.owl.carousel', function(event) {
		setTimeout(function(){
			$('.lazy:visible').trigger("appear");
		},300);
	});	
	$("#n_slider div.lazy").lazyload({
		effect : "fadeIn",
	});
}

function nSliderUpdateSize() {
	var maxHeight = parseInt($('#n_slider .owl-item').eq(0).css('height'));
	$('#n_slider .owl-item').each(function(i, e){
	    var thisHeight = parseInt($(e).outerHeight());
	    maxHeight=(maxHeight>thisHeight?maxHeight:thisHeight);
	});
	$('#n_slider .owl-stage-outer').css('height', (maxHeight + 60) + 'px');
	$('#n_slider .owl-item').css('height',maxHeight+'px');	
}

