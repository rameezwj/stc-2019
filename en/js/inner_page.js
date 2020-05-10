var pages_array = [];

jQuery(window).on('load', function(){

	// once page gets loaded, slide up & fade in the content
		/*if(!jQuery('.anim_slide_up').is('.page_intro, .page_creation_bod_directors, .page_contribution, .page_distribution_profit, .page_operations, .page_investment, .financials_banner, .page_strategy, .page_risk_manage, .human_resource_inner, .page_social_responsibility, .page_sustainability, .page_serving_pilgrams')){
			TweenMax.fromTo('.anim_slide_up > div', 2, {y: 300, opacity: 0}, {y: 0, opacity: 1, transformOrigin: 'center bottom', ease: Power4.easeInOut, delay: 0});

			setTimeout(function(){
				// jQuery('.anim_slide_up  > div').removeAttr('style');
			}, 2000)
		}*/
	// once page gets loaded, slide up & fade in the content

	// if its not mobile device, check last play video configutation and proceed accordingly
	if(jQuery(window).width()>=768){
	  var selected_cat = localStorage.getItem("stc_selected_category");
	  var last_played_video = localStorage.getItem("stc_last_played_video");

		// console.log(last_played_video+'---'+selected_cat)
	  
	  // if(true){
	  if(last_played_video==null && selected_cat==null){
	  }
	  else if(last_played_video!=selected_cat){
	  	localStorage.setItem("stc_last_played_video", selected_cat);
	  	
	  	// TweenMax.set('.anim_slide_up > div', {y: 1000, opacity: 0});

	  	var video = document.getElementById('category_video');
	  	
	  	video.play();
	  	
	  	video.onended = function() {
	  		TweenMax.to('.video_wrapper', 2, {top: '-100%', scale: .7, transformOrigin: 'center top', scale: 1, ease: Power4.easeInOut});
	  		TweenMax.fromTo('.anim_slide_up > div', 3, {y: 500, opacity: 0}, {y: 0, opacity: 1, transformOrigin: 'center bottom', ease: Power4.easeInOut, delay: -.9});
	  	};
	  }
	}


	// highlight current pages submenu + goto next page functionality
		// get curent page url
		var page_url = window.location.href.split('.html');
		page_url = page_url[0].split('/');

		// highlight current page menu item
		jQuery('.sub_menu_wrapper .submenu_content a').removeClass('active');
		jQuery(`a[data-page-link=${page_url[page_url.length-1]}]`).addClass('active');

		
		if(jQuery(window).width()<=767){
			var next_page_text = 'Next';
			var previous_page_text = 'Previous';

			if(jQuery('#btn_gotoNext_page').length)
				jQuery('#btn_gotoNext_page').html(next_page_text);

			if(jQuery('#btn_gotoPrev_page').length)
				jQuery('#btn_gotoPrev_page').html(previous_page_text)
		}

		var page_switching_triggered = false;

		jQuery('.inner_page_navigation > div a#btn_gotoNext_page').on('click', function(e){
			e.preventDefault();
			var goto_page = jQuery(this).attr('data-goto-page-link');

			if(goto_page!='' && (page_switching_triggered)){
				page_switching_triggered = false;
				jQuery(`a[data-page-link=${goto_page}]`).trigger('click');
			}			
		});

		jQuery('.inner_page_navigation > div a#btn_gotoPrev_page').on('click', function(e){
			e.preventDefault();
			var goto_page = jQuery(this).attr('data-goto-page-link');

			if(goto_page!='' && (page_switching_triggered)){
				page_switching_triggered = true;
				jQuery(`a[data-page-link=${goto_page}]`).trigger('click');
			}			
		});

		setTimeout(function(){
			page_switching_triggered = true;

			// mousewheel
			  document.addEventListener('wheel', function(e) {
					if($(window).scrollTop() + $(window).height() == $(document).height()) {
						// jQuery(`#btn_gotoNext_page`).trigger('click');
					}
					// e.preventDefault();
			  }, { passive: false })
			// mousewheel
	}, 3000)


	// slide up bottom navigation after few seconds, on inner pages
		setTimeout(function(){
			TweenMax.to('.inner_page_navigation', 1, {bottom: 0, ease: Power4.easeInOut});
		}, 2000);
	// slide up bottom navigation after few seconds, on inner pages

	// animate inner page content

		if(false){
			function generateRandomNumber() {
			    var min = 1,
			        max = 1.5,
			        highlightedNumber = Math.random() * (max - min) + min;

			    return highlightedNumber;
			};

			TweenMax.set('.content_animate', {'opacity': 0});

			setTimeout(function(){
			  // scrollmagic
			    var controller = new ScrollMagic.Controller();
			    
			    jQuery('.content_animate').each(function(){
			      var tl_content_animate = new TimelineMax();

			      tl_content_animate.staggerFromTo(jQuery(this), generateRandomNumber(), {x: 0, y: 100, opacity: 0}, { opacity: 1, y: 0, x: 0, ease: Power4.easeInOut, delay: 0 }, .2)

			      var scene_about = new ScrollMagic.Scene({
			        offset: -300,
			        reverse: true,
			        triggerElement: this,
			      })
			      .setTween(tl_content_animate).addTo(controller);
			    })
			  // scrollmagic
			}, 1000)
		}
	// animate inner page content
});


jQuery('document').ready(function(){

	// if theres no value set for stc_selected_category & stc_last_played_video, remove video section from the DOM
		var selected_cat = localStorage.getItem("stc_selected_category");
		var last_played_video = localStorage.getItem("stc_last_played_video");

		if((selected_cat==null && last_played_video==null) || (last_played_video==selected_cat) || jQuery(window).width()<=767){
			jQuery('.video_wrapper').remove();
		}
	// if theres no value set for stc_selected_category & stc_last_played_video, remove video section from the DOM


	// inner submenu
		jQuery('.inner_submenu_items li').click(function(){
	    var goto_id = jQuery(this).attr('data-submenu-inner');
	    // var goto_name = jQuery(this).html();

	    // jQuery('.inner_submenu_wrapper span').html(goto_name);
	    jQuery('html, body').animate({
        scrollTop: jQuery(`#${goto_id}`).offset().top
	    }, 1500);

	    setTimeout(function(){
        jQuery('.inner_submenu_items').slideUp(500);
        jQuery('.inner_submenu_wrapper a').removeClass('cross');
	    }, 1000);
		});

		jQuery('#close_inner_submenu').click(function(){
	    jQuery('.inner_submenu_items').slideToggle(500);
	    jQuery('.inner_submenu_wrapper a').toggleClass('cross');
		});
	// inner submenu

	// update menu text
		jQuery("a[data-page-link='chairman_inner']").html("Chairman's Speech");
		jQuery("a[data-page-link='ceo_inner']").html("CEO's Speech");
	// update menu text
})



if(jQuery('body').hasClass('landing_screen')){
}
