$(document).ready(()=>{
	/** Delivery **/
	$(document).on('click','.toggle-delivery',() => {
		$('.timedeli-modal').toggleClass('active')
		$('body').toggleClass('modal-open')
		if(window.matchMedia('(max-width: 767px)').matches) {
			$('body').addClass('overflow-hidden');
			if (!$('#cart-tab').hasClass('active')) {
				$('#cart-tab').addClass('active');
			}
		}
	})
	$(document).on('click' ,'.timedeli-overaly, .timedeli-modal .close',()=>{
		$('.timedeli-modal').removeClass('active')
		$('body').removeClass('modal-open')
  	    if(window.matchMedia('(max-width: 767px)').matches) {
			if ($('body').hasClass('overflow-hidden')) {
				$('body').removeClass('overflow-hidden');
			}
			if ($('#cart-tab').hasClass('active') && $('#product-tab').hasClass('active')) {
				$('#cart-tab').removeClass('active');
			}
		}
	})
	const getDeliveryValue = ()=>{
		let date = $('.ega-delivery__date').val().split('/')
		date.pop()
		let time = $('.ega-delivery__time').val()
		return time ?  date.join('/') + ' - ' + time : date.join('/')
	}

	$(document).on('focus','.ega-delivery__date', ()=>{
		$('.timedeli-cta').hide()
	})
	$(document).on('blur','.ega-delivery__date', ()=>{
		$('.timedeli-cta').show()
	})
	$(document).on('click','.timedeli-cta button',() => {
		let value =	getDeliveryValue();
		$('.toggle-delivery span').text(value);
		$('.timedeli-modal').removeClass('active')

	})
	/** coupon **/

	$(document).on('click', '.coupon-toggle-btn', ()=>{
		$('.cart-coupon').toggleClass('active')
		$('body').toggleClass('overflow-hidden')
	})
	/** product **/

	/** tab **/

	if(window.matchMedia('(max-width: 767px)').matches) {
		if($('.mobile-tab').length > 1) {
			$('#tab-header').addClass('tab-header')
			$('.mobile-tab').each(function(i){
				let id = 	$(this).attr('id')
				let title = $(this).data('title')
				$('#tab-header').append(`<a class="tab-header-item btn btn-main ${i == 0 ? 'active' : ''}" href="#${id}">${title}</a>`)
  		    })
		}
		$(document).on('click', '.tab-header-item', function(e){
			e.preventDefault()
			$('.tab-header-item').removeClass('active')
			$('.mobile-tab').removeClass('active')
			let id = $(e.currentTarget).attr('href')
			$(id).addClass('active')
			$(e.currentTarget).addClass('active')
		})
	}
})