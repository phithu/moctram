function egaFlashSale() {
	// call product ajax
	// init countdown
	$('.flashsale').show()
	if (!window.flashSale) return
	Date.prototype.addDays = function (days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}
	Date.prototype.addHours = function (hours) {
		this.setTime(this.getTime() + ((hours) * 60 * 60 * 1000));
		return this;
	}
	const getDays = (times) => Math.floor((times / (1000 * 60 * 60 * 24)))
	const getHours = (times) => Math.floor((times % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const getMinutes = (times) => Math.floor((times % (1000 * 60 * 60)) / (1000 * 60));
	const getSeconds = (times) => Math.floor((times % (1000 * 60)) / 1000);
	function randomQty() {
		var minQty = +window.flashSale.percentMin;
		var maxQty = +window.flashSale.percentMax;
		minQty = Math.ceil(minQty);
		maxQty = Math.floor(maxQty);
		var qty = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
		qty = parseInt(qty);
		if (qty <= minQty) {
			qty = minQty;
		}
		if (qty > maxQty) {
			qty = maxQty;
		}
		return qty
	}
	function renderProgress(item) {
		let id = $(item).data('pdId')
		let inventory = parseInt($(item).data('inventoryQuantity'))
		let available = $(item).data('available')
		let management = $(item).data('management')
		let soldQuantity = $(item).data('soldQuantity')
		let progress = $(item).find('.flashsale___percent')
		let soldNumber = $(item).find('.flashsale__sold-qty')
		let label = $(item).find('.flashsale__label')
		let maxInStock = parseInt(window.flashSale.maxInStock)
		let useTag = window.flashSale.useTags
		let percent, stock, soldQty;
		flashSaleStorage[id] = flashSaleStorage.hasOwnProperty(id) ? flashSaleStorage[id] : {}
		if(flashSaleStorage[id] && management && flashSaleStorage[id].inventory !== inventory){
			if( flashSaleStorage[id].inventory > inventory ){
				flashSaleStorage[id].soldQty = flashSaleStorage[id].soldQty + flashSaleStorage[id].inventory - inventory;

			}else{
				flashSaleStorage[id] = {}
			}
		}
		if (useSoldQuantity && !useTag) {
			soldQty = parseInt(soldQuantity)
			stock =  parseInt(inventory) + soldQty	
			percent = Math.round(soldQty * 100 / stock)

		} else if(useTag){
			maxInStock = parseInt($(item).data('maxStock'))
			stock =   maxInStock
			soldQty = maxInStock > inventory ? maxInStock - inventory : 0
			percent = Math.round(soldQty * 100 / maxInStock)
		}
		else {
			stock =	flashSaleStorage[id].stock || maxInStock
			percent = !flashSaleStorage[id].soldQty ? randomQty()  : Math.round(flashSaleStorage[id].soldQty * 100 / stock)
			soldQty = !flashSaleStorage[id].soldQty ? Math.round(percent * stock / 100) : flashSaleStorage[id].soldQty
			if( Math.round(inventory *100 / maxInStock ) <= 2 ){
				percent = 95
			}
		}
		if(!available && inventory == 0){
			percent = 100
		}
		if(available && inventory <= 0){
			percent = 95
		}
		flashSaleStorage[id].soldQty = soldQty
		flashSaleStorage[id].timestamp = !flashSaleStorage[id].timestamp ? new Date().getTime() : flashSaleStorage[id].timestamp
		flashSaleStorage[id].stock = stock
		flashSaleStorage[id].inventory = inventory
		flashSaleStorage[id].mangement = management

		percent = percent == 100 && available ? 95 : percent
		progress.css('width', `${percent < 90  || (percent > 90 && percent < 100) ? percent : 90}%`)
		if (percent >= 95) {
			label.html(window.flashSale.outOfStockSoonText)
		}

		if (percent == 100 || !available) {
			label.html('Hết hàng')
			progress.css('width', `100%`)
		}
		if (percent <= 0 && available) {
			label.html(window.flashSale.openingText)
			progress.css('width', `10%`)
		}

		if (!useSoldQuantity || useTag) {
			soldNumber.text(soldQty)
		}
	}
	function updateQty() {
		if (flashSaleStorage && Object.keys(flashSaleStorage).length) {
			Object.keys(flashSaleStorage).map(key => {
				let item = flashSaleStorage[key]
				let current = new Date().getTime()
				let distance = (current - item.timestamp) / 1000 / 60
				let qty = distance  > loopTime ? Math.round(distance / loopTime) : 0
				if(!item.mangement ) {
					item.soldQty += qty
					item.soldQty = item.soldQty > item.stock ? item.stock : item.soldQty
					item.timestamp = distance > loopTime ? current : item.timestamp
				}
			})
			localStorage.setItem('flashSaleStorageItem', JSON.stringify(flashSaleStorage))
			return flashSaleStorage
		}
		return 

	}
	function renderCountDown(distance) {
		// Time loop from settings
		let html = [];
		let days = getDays(distance)
		let hours = `<div><div class="ega-badge-ctd__item ega-badge-ctd__h">${getHours(distance) >= 10 ? getHours(distance) : `0${getHours(distance)}`}</div><span>Giờ</span> </div>`
		let minutes = `<div><div class="ega-badge-ctd__item  ega-badge-ctd__m">${getMinutes(distance) >= 10 ? getMinutes(distance) : `0${getMinutes(distance)}`}</div><span>Phút</span></div>`
		let seconds = `<div><div class="ega-badge-ctd__item ega-badge-ctd__s">${getSeconds(distance) >= 10 ? getSeconds(distance) : `0${getSeconds(distance)}`}</div><span>Giây</span></div>`
		html = [hours, minutes, seconds]
		if (days > 0) html.unshift(`<div><div class="ega-badge-ctd__item ega-badge-ctd__d">${days >= 10 ? days : `0${days}`}</div><span>Ngày</span></div>`)
		return `<div class="ega-badge-ctd">
${html.join(`	<div class="ega-badge-ctd__colon" > : </div>`)}

</div>`;
	}
	function calcCountDown(startTime, endTime) {
		let distance = 0
		let now = new Date().getTime()
		if (now >= startTime && now <= endTime) {
			distance = (endTime - now);

			return distance
		}
		return distance
	}
	let now = new Date()
	let loopTime = 6;
	let { type,
		 dateStart,
		 dateFinish,
		 hourStart,
		 hourFinish,
		 dayLoop,
		 activeDay,
		 finishAction,
		 finishLabel,
		 useSoldQuantity		 
		} = window.flashSale
	var flashSaleStorage = JSON.parse(localStorage.getItem('flashSaleStorageItem')) || {}
	let flashSaleSetting = JSON.parse(localStorage.getItem('flashSale')) || {}
	if (JSON.stringify(flashSaleSetting) != JSON.stringify(window.flashSale)) {
		let setting1 =  Object.assign({},flashSaleSetting)
		let setting2 = Object.assign({},window.flashSale)
		let storageDate = flashSaleSetting.timestamp
		if((+activeDay === 7	&& !storageDate) ||
		   (new Date(storageDate).getDay() !== new Date().getDay())){
			flashSaleStorage = {}
		}
		delete	setting1.timestamp
		delete	setting2.timestamp
		if(JSON.stringify(setting1) != JSON.stringify(setting2)){
			flashSaleStorage = {}
		}
	}
	localStorage.setItem('flashSale', JSON.stringify(window.flashSale))

	let distance = 0, startTime, endTime;
	if (type === 'hours' && (new Date().getDay() === +activeDay || +activeDay === 7)) {
		// expireTime
		hourStart = hourStart.split(':')
		// check is start time valid
		// convert start time to time stamp
		startTime = new Date().setHours(hourStart[0] != '24' ? hourStart[0] : '00', hourStart[1] || '00', '00')
		endTime = new Date(startTime).addHours(+hourFinish).getTime()
		//check is flash sale started || finished
	}
	if (type === 'days') {
		var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
		startTime = new Date(dateStart.replace(pattern, '$3-$2-$1'))
		startTime = startTime.setHours('00', '00', '00')
		// check valid date
		endTime = new Date(startTime).addDays(+dateFinish).getTime()

	}
	distance = calcCountDown(startTime, endTime);
	if (distance > 0) {
		setInterval(function () {
			distance = calcCountDown(startTime, endTime);
			$(`.flashsale__countdown`).html(renderCountDown(distance))
		}, 1000)
		let dotAnimation = `<span class="ega-dot"><span class="ega-ping"></span></span>`
		if(!$('.flashsale__title .ega-dot').length ) $(`.flashsale__title`).append(dotAnimation)
		$(`.flashsale__countdown`).html(renderCountDown(distance))
		$(`.flashsale__countdown-label`).show()

		var isRendered = !useSoldQuantity &&  updateQty()
		$('.flashsale__item').each(function () { renderProgress(this) })
		if (!useSoldQuantity && ! window.flashSale.useTags) {
			let start = 0
			setInterval(function () {
				if(start){
					updateQty()
					$('.flashsale__item').each(function () { 
						renderProgress(this) 
					})
				}
				start +=1
			}, loopTime * 1000)
		}
		$(`.flashsale__bottom`).show()
			!isRendered && localStorage.setItem('flashSaleStorageItem', JSON.stringify(flashSaleStorage))
	} else {
		if (finishAction == 'show') {
			$(`.flashsale__countdown`).html('')
			$(`.flashsale__countdown-label`).html(finishLabel).show()
		}
		$('#ega-product-detail .flashsale ').remove()
		$(`.flashsale__bottom`).remove()
		finishAction == 'hide' && $(`.flashsale`).remove()
		localStorage.removeItem('flashSaleStorageItem')
	}
$('.flashsale__countdown-wrapper').show();
}
let isload = 0;
$(document).ready(()=>{
	try{
		egaFlashSale()
	}catch(e){
		console.log(e)
	}
})