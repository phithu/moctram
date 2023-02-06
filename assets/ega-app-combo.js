(function($) {
    comboApp = {
        checkCombo: false,
        init: function(idProduct, idTitle) {
                        window.HaravanPromotionAsyncInit = function() {
                            comboApp.showGiftLabel();
                        }
            var self = this;
            if (typeof idProduct != 'undefined' && idProduct != '' && idProduct != null) {
                self.comboCall('GET', 'https://combo-omni.haravan.com/js/list_recommendeds?product_id=' + idProduct, {}, function(data) {
                    // success
                    if (data.length > 0) {
                        self.checkCombo = true;
                        self.comboRender(data, idProduct, idTitle);
                        $(".add_to_cart").addClass("product-combo");
                    }
                }, function() {
                    //error
                }, function() {
                    //always
                });
            }
        },
                checkRecommendeds: function(product_id, successcallback, errorcallback, alwayscallback) {
                    if (Object.prototype.toString.call(product_id) === '[object Array]') this.comboCall('GET', 'https://combo-omni.haravan.com/js/check_list_recommendeds?product_ids=' + product_id, {}, successcallback, errorcallback, alwayscallback);
                },
                showGiftLabel: function(){
                    var arr_prod_id = [];
                    var elementGift = '.product_gift_label';
                    $(elementGift).each(function(){
                        var id = $(this).attr('data-id');
						if(!arr_prod_id.includes(id)){
							arr_prod_id.push(id);
						}
                    });
                    if(arr_prod_id.length > 0){
                        this.checkRecommendeds(arr_prod_id,function(result){
                            $.each(result,function(i,item){
                                if (item.has_gift == true || item.has_discount == true){
                                    $(elementGift + '[data-id="' + item.product_id +'"]').removeClass('hidden');                                }
                            })
                        });
						arr_prod_id.map(function(v,i){
							
							comboApp.comboCall('GET', 'https://combo-omni.haravan.com/js/list_recommendeds?product_id=' + v, {}, function(data) {
								// success
								if (data.length > 0) {
									//debugger;
									//self.checkCombo = true;
									//self.comboRender(data, idProduct, idTitle);
									//$(".add_to_cart").addClass("product-combo");
									let $pdName = $(elementGift + '[data-id="' + v +'"]').parents(".item-product").find(".title-product-cart-mobile");
									$pdName.append(`<span class="combo-title">${data[0].name_combo}</span>`);
								}
							}, function() {
								//error
							}, function() {
								//always
							});
						})
                    }
                },
        comboCall: function(method, path, data, successcallback, errorcallback, alwayscallback) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, path);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.onload = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (Object.prototype.toString.call(successcallback) === '[object Function]') successcallback(JSON.parse(xhr.responseText));
                } else {
                    if (Object.prototype.toString.call(errorcallback) === '[object Function]') errorcallback();
                }
            };
            xhr.onloadend = function() {
                if (Object.prototype.toString.call(alwayscallback) === '[object Function]') alwayscallback();
            };
            xhr.send(data);
        },
        comboItem: function(item) {
            let vNameHtml = '',
                cPriceHtml = '';

            if (item.variant_title != null) {
                vNameHtml = `<div class="variant_title font-weight-light"><span>${item.variant_title}</span></div>`;
            }
            if (!item.none_promotion) {
                cPriceHtml = `<span class="compare-price">${item.old_price}</span>`;
            }

            return `<div class="combo-product-item media mt-2 ${item.available == true ? '' : 'sold-out'}" data-id="${item.id}" data-quantity="${item.qty}" data-available="${item.available}">
                            <div class="media-left thumb_img">
                                <div class="thumb-1x1"><img src="${item.image}" alt="${item.title}"></div>
                            </div>
                            <div class="media-body body_content">
                                <div class="product-title mb-1">${item.title}</div>
                                ${vNameHtml}
                                                                <div class="combo-quantity font-weight-light">Số lượng: ${item.qty}</div>
                                <span class="price">${item.price}</span>
                                                                ${cPriceHtml}                                                   
                            </div>
                        </div>`
        },
        comboPrice: function(type, price, promotion_value) {
            let comboPrice = 0;
            if (type === 1) {
                //Giam VND
                comboPrice = price - promotion_value;
            }
            if (type === 2) {
                //Giam %
                comboPrice = (price * (100 - promotion_value)) / 100;
            }
            if (type == 4) {
                //Gia cung
                comboPrice = promotion_value;
            }

            return Haravan.formatMoney(comboPrice * 100, "{{amount}}₫");
        },
        comboRender: function(result, id, title) {
            var giftHtml = '';
						var isFirst = true;
            $.each(result, function(key, value) {
                var itemCombo = '';
							  var isAvailable = true;
                $.each(value.recommendeds, function(i, v) {
                    var xprice = 0;
                    var imm = "https://hstatic.net/0/0/global/noDefaultImage6_large.gif";
                    var variantId = null;
                    var objVariant = {};
                    var oldPrice = 0;
                    var available = true;
									  var resVariant = [];
                    $.ajax({
                        type: 'GET',
                        url: v.product_url + '.js',
                        dataType: 'json',
                        async: false,
                        success: function(response) {
                            available = response.available;
                            xprice = parseInt(response.price) / 100;
                            imm = (response.featured_image != null) ? Haravan.resizeImage(response.featured_image, 'small') : 'https://hstatic.net/0/0/global/noDefaultImage6_large.gif';
                            variantId = response.variants[0].id;
                            objVariant = response.variants;
                            oldPrice = Haravan.formatMoney(response.price, "{{amount}}₫");
													if(v.apply_productvariants.length > 0){
														resVariant = response.variants;
													}
                        }
                    });

										if(isAvailable){
                    var itemObj = {
                        available: available,
                        id: variantId,
                        qty: v.quantity,
                        title: v.product_name.split('|')[0],
                        variant_title: null,
                        image: imm,
                        none_promotion: v.none_promotion,
                        price: oldPrice,
                        old_price: oldPrice
                    }

                    if (v.apply_productvariants.length > 0) {
                        var vName = '';
                        v.apply_productvariants.map(function(obj, index) {
                            vName = objVariant.filter(el => el.id == obj.id)[0].options.join("-");

                            itemObj.id = obj.id;
                            itemObj.qty = obj.qty;
                            itemObj.variant_title = vName;
														itemObj.available = resVariant.filter(el => el.id == obj.id)[0].available;
                            if (!v.none_promotion) {
                                itemObj.price = comboApp.comboPrice(obj.type, xprice, obj.promotion_value);
                            }
                            itemCombo += comboApp.comboItem(itemObj);

                        })
                    } else {
                        if (!v.none_promotion) {
                            itemObj.price = comboApp.comboPrice(v.type, xprice, v.promotion_value);
                        }
                        itemCombo += comboApp.comboItem(itemObj);
                    }
										}else{
											return false;
										}
                });

								if(isAvailable){
                giftHtml += `<div class="combo-item ${isFirst == true ? 'actived' : ''}">
                            <div class="combo-name">${value.name_combo}</div>
                            <div class="combo-list">${itemCombo}</div></div></div>`;
								isFirst = false;
								}
            });
            $('#popupComboModal .modal-body').html(giftHtml);

            $("#popupComboModal .combo-item").click(function() {
                $(this).addClass("actived").siblings().removeClass("actived");
            })
        }
    }
    $(document).ready(function() {
        var idProduct = $('#popupComboModal').data('id');
        var idTitle = $('#popupComboModal').data('title');

        comboApp.init(idProduct, idTitle);

        $('body').on('click', '.combo-w', function(e) {
            $('.combo-w').removeClass('checked');
            $(this).addClass('checked');
        })

        $('.addcart-single').click(function(e) {
            $('#popupComboModal').modal("hide");
            let form = $("#add-to-cart-form");
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                async: false,
                data: form.serialize(),
                dataType: 'json',
                error: addToCartFail,
                beforeSend: function() {},
                success: addToCartSuccess,
                cache: false
            });
        })

        $(".addcart-combo").click(function() {
            var productList = new Array();
            $(".combo-item.actived .combo-product-item:not(.sold-out)").each(function(i, v) {
                let itemObj = new Object();
                let itemId = $(v).data().id;
                let itemQtt = $(v).data().quantity;

                itemObj["id"] = itemId;
                itemObj["qtt"] = itemQtt;
                productList.push(itemObj);
            })
                    
                        productList.map(function(v, i) {
                            $.ajax({
                                type: 'POST',
                                url: '/cart/add.js',
                                async: false,
                                data: "quantity=" + v.qtt + "&id=" + v.id,
                                dataType: 'json',
                                beforeSend: function() {},
                                success: function() {
                                    location.href = "/cart"
                                },
								error: function(XMLHttpRequest, textStatus) {
									Haravan.onError(XMLHttpRequest, textStatus);
								},
                                cache: false
                            });
                        })
        })
    })
})(jQuery)

