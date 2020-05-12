jQuery(window).on('load', function(){

	// once page gets loaded, slide up & fade in the content
		// TweenMax.fromTo('.anim_slide_up > div', 2, {y: 300, opacity: 0}, {y: 0, opacity: 1, transformOrigin: 'center bottom', ease: Power4.easeInOut, delay: 0});

		setTimeout(function(){
			// jQuery('.anim_slide_up  > div').removeAttr('style');
		}, 2000)
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
	  		TweenMax.fromTo('.anim_slide_up > div', 4, {y: 900, opacity: 0}, {y: 0, opacity: 1, transformOrigin: 'center bottom', ease: Power4.easeInOut, delay: -.9});
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
			var next_page_text = 'التالي  ';
			var previous_page_text = 'السابق  ';

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
	if(true){
	// if(jQuery('.anim_slide_up').hasClass('page_operations')){
		function generateRandomNumber() {
		    var min = 1.3,
		        max = 1.5,
		        highlightedNumber = Math.random() * (max - min) + min;

		    return highlightedNumber;
		};

		// add mask layer within img_mask_wrapper
			jQuery('.img_mask_wrapper').each(function(i, v){
				var img = jQuery(this).find('img');
				var offsets = {
					top: jQuery(img).position().top,
					right: jQuery(img).position().right,
					bottom: jQuery(img).position().bottom,
					left: jQuery(img).position().left,
				}

				offsets.top = (offsets.top!=null) ? `${offsets.top}px` : 'auto';
				offsets.right = (offsets.right!=null) ? `${offsets.right}px` : 'auto';
				offsets.bottom = (offsets.bottom!=null) ? `${offsets.bottom}px` : 'auto';
				offsets.left = (offsets.left!=null) ? `${offsets.left}px` : 'auto';


				jQuery(this).append(`<i style='top:${offsets.top}; right:${offsets.right}; bottom:${offsets.bottom}; left:${offsets.left}'></i>`)
			})
		// add mask layer within img_mask_wrapper

		TweenMax.set('.content_animate', {'opacity': 0});

		setTimeout(function(){
		  // scrollmagic
		    var controller = new ScrollMagic.Controller();
		    
		    jQuery('.content_animate').each(function(){
		      var tl_content_animate = new TimelineMax();

		      tl_content_animate.staggerFromTo(jQuery(this), generateRandomNumber(), {x: 0, y: 100, opacity: 0}, { opacity: 1, y: 0, x: 0, ease: Power4.easeInOut, delay: 0 }, .2)

		      var scene_content_animate = new ScrollMagic.Scene({
		        offset: -300,
		        reverse: true,
		        triggerElement: this,
		      })
		      .setTween(tl_content_animate).addTo(controller);
		    })

		    jQuery('.img_mask_wrapper i').each(function(){
		    	var tl_img_mask_wrapper_layer = new TimelineMax();

		      tl_img_mask_wrapper_layer.to(jQuery(this), 2, { scaleY: 0, ease: Power4.easeInOut })
		      .from(jQuery(this).parent().find('img'), 2, { scale: 1.5, ease: Power4.easeInOut }, '-=2')

		      var scene_img_mask_wrapper_layer = new ScrollMagic.Scene({
		        offset: -200,
		        reverse: true,
		        triggerElement: this,
		      })
		      .setTween(tl_img_mask_wrapper_layer).addTo(controller);
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
})



if(jQuery('body').hasClass('landing_screen')){
}
