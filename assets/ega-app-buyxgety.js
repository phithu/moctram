var buyXgetY = window.buyXgetY || {};
(function($){
    /*-----------------------------------------------------------------------------------*/
    /* BUY X GET Y
    /*-----------------------------------------------------------------------------------*/
    buyXgetY = {
        // Haravan_Promotion
        ele: ".buyxgety-box",
        init: function(){
            if (typeof $.jStorage  == 'undefined') {
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.src = "//cdnjs.cloudflare.com/ajax/libs/json2/20160511/json2.min.js";
                document.getElementsByTagName('head')[0].appendChild(script);
                var script2 = document.createElement('script');
                script2.type = "text/javascript";
                script2.src = "//cdnjs.cloudflare.com/ajax/libs/jStorage/0.4.12/jstorage.min.js";
                document.getElementsByTagName('head')[0].appendChild(script2);
            }
            hrvPromotionInited = false;
            window.HaravanPromotionAsyncInit = function() {
                hrvPromotionInited = true;
                if(typeof(buyXgetY.getPromotionRecommended) == 'function'){
                    var idProduct = $(buyXgetY.ele).find('.buyxgety-product-list').data('id'),
                        idTitle = $(buyXgetY.ele).find('.buyxgety-product-list').data('title');
                    buyXgetY.getPromotionRecommended(idProduct,idTitle); // render list sp tặng/giảm
                }
                if(typeof(buyXgetY.showGiftLabel) == 'function')
                    buyXgetY.showGiftLabel();
            }
        },
        getPromotionRecommended: function(id,title){// truyền id, tên sản phẩm chính lấy từ product
            buyXgetY.check_getRecommendeds = false;
            var self = this;
            HaravanPromotion.GetRecommendeds(id, function(result) {
                // success
                if ( result.recommendeds.length > 0 ) {
                    buyXgetY.check_getRecommendeds = true;
                    $(".add_to_cart").addClass("product-buyxgety");
                    $.each(result.recommendeds,function(i,v){
											var giftAvailable = true;
										  var resVariant = [];
											$.ajax({
												type: 'GET',
												url: v.product_url + '.js',
												dataType: 'json',
												async: false,
												success: function(response) {
													giftAvailable = response.available;
													resVariant = response.variants;
												}
											});
											
											
												
											
											
                        var html2 = '';
                    
                        if(v.is_apply_variant == false){
													  let pdImage = v.product_images[0];
														if(pdImage == undefined){
															pdImage = "https://mixcdn.egany.com/themes/assets/thumb/large/noimage.gif"
														}
                            var html =`<div class="buyxgety_item ${giftAvailable == true ? '' : 'gift-soldout'}">`;
                                    html+=  '<div class="buyxgety_checkbox">'
                                    html+=  '<div class="ega-buyxgety-label"><input class="radio-product" data-applyvariant="'+v.is_apply_variant+'" data-id="'+v.variant_ids[0]+'" data-percent="'+v.percent+'" data-countbuy="'+v.quantity+'" data-countgift="'+v.apply_quantity+'"' + (i == 0 ? 'checked="checked"':'') +' type="radio" name="group-product-sale"></div>';
                                    html+=  '</div>';
                                    html+=  '<div class="buyxgety_image">';
                                    html+=    '<a href="/products/'+ v.product_handle +'" target="_blank">';
                                    html+=      '<img width="60" src="'+pdImage+'" alt="item 1"/>';
                                    html+=    '</a>';
                                    html+=  '</div>';
                                    html+=  '<div class="buyxgety_item_title">';
                                    html+=  '<p style="margin-bottom:0px;">';
                                    html+=  'Khi mua <strong style="color:#f51e1e;">' + v.quantity + '</strong><span style="color:#315399;"> ' + title + '</span><br> ';

                                    if (v.percent == null && v.amount == 0) {
                                        html+=      'Tặng <strong style="color:#f51e1e;"> ' + v.apply_quantity + '</strong><a href="/products/' + v.product_handle  + '" target="_blank" style="color:#315399;"> ' + v.product_name + '</a>. ';
                                    }else {
                                        html+=    'Giảm <strong style="color:#f51e1e;">' + (v.percent != null ? (v.percent + "%") : Haravan.formatMoney(v.amount*100, "{{amount}}₫")) + '</strong> ';
                                        html+=    ' sản phẩm <a href="/products/' + v.product_handle  + '" target="_blank" style="color:#315399;">' + v.product_name + '.</a>';
                                    } 
                                    html+=    '</p>';
                                    html+=  '</div>';
                                        html+=  '</div>';
                                $(buyXgetY.ele).find('.buyxgety-product-list > .buyxgety_content > .buyxgety_lists').append(html);
                        }
                        else{
                            $.each(v.apply_variants,function(i2,v2){
																let variantAvailable = resVariant.filter(el => el.id == v2.variant_id)[0].available;
                                var title_variant = v2.title.replace('/','-');
																let pdImage = v.product_images[0];
																if(pdImage == undefined){
																	pdImage = "https://mixcdn.egany.com/themes/assets/thumb/large/noimage.gif"
																}
                                var html =`<div class="buyxgety_item ${variantAvailable == true ? '' : 'gift-soldout'}">`;
                                        html+=  '<div class="buyxgety_checkbox">'
                                                                                html+=  '<div class="ega-buyxgety-label"><input class="radio-product" data-applyvariant="'+v.is_apply_variant+'" data-id="'+v2.variant_id+'" data-percent="'+v2.percent+'" data-countbuy="'+v2.quantity+'" data-countgift="'+v2.apply_quantity+'"' + (i == 0 && i2 == 0 ? 'checked="checked"':'') +' type="radio" name="group-product-sale"></div>';
                                        html+=  '</div>';
                                        html+=  '<div class="buyxgety_image">';
                                        html+=    '<a href="/products/"'+ v.product_handle +'?variant='+v2.variant_id+' target="_blank">';
                                        html+=      '<img width="60" src="'+pdImage+'" alt="item 1"/>';
                                        html+=    '</a>';
                                        html+=  '</div>';
                                        html+=  '<div class="buyxgety_item_title">';
                                        html+=    '<p style="margin-bottom:0px;">';
                                        html+=        'Khi mua <strong style="color:#f51e1e;">' + v2.quantity + '</strong><span style="color:#315399;"> ' + title + '</span><br> ';
                                        if (v2.percent == null && v2.amount == 0) {
                                            html+=      'Tặng <strong style="color:#f51e1e;"> ' + v2.apply_quantity + '</strong><a href="/products/' + v.product_handle  + '" target="_blank" style="color:#315399;"> ' + v.product_name +' - '+v2.title + '</a>. ';
                                        } 
                                        else {
                                            html+=    'Giảm <strong style="color:#f51e1e;">' + (v2.percent != null ? (v2.percent + "%") : Haravan.formatMoney(v.amount*100, "{{amount}}₫")) + '</strong> ';
                                            html+=    ' sản phẩm <a href="/products/' + v.product_handle  + '?variant='+v2.variant_id+'" target="_blank" style="color:#315399;">' + v.product_name + ' - '+v2.title + '.</a>';
                                        }
                                        html+=    '</p>';
                                        html+=  '</div>';
                                        html+='</div>';
                                $(buyXgetY.ele).find('.buyxgety-product-list > .buyxgety_content > .buyxgety_lists').append(html);
                            });
                        }   
                        
                    });
                    $(buyXgetY.ele).removeClass('hidden');
                    $('#add-to-cart,#buy-now').removeClass('loading');
                                    
                                        $(".ega-buyxgety-label").on("click",function(e){
                                            let $buyXGetYItem = $(this).parents(".buyxgety_item");
                                            if($buyXGetYItem.hasClass("ega-promo-checked")){
                                                $buyXGetYItem.removeClass("ega-promo-checked");
                                            }else{
                                                $buyXGetYItem.addClass("ega-promo-checked").siblings().removeClass("ega-promo-checked");
                                                $buyXGetYItem.find(".radio-product").prop("checked",true);
                                            }
                                        })
                                    
                }
                            else{
                            $(buyXgetY.ele).addClass('hidden');
                            }
            }, function() {
                // error
            }, function() {
                // always
                $('#add-to-cart,#buy-now').removeClass('loading');
            });
        },
        addCartBuyXGetY_detail: function(is_accept,variant_id,quantity,callback) {
            var self = this;
            var params = {quantity:quantity,id:variant_id};
            quantity = parseInt(quantity);

            if(self.check_getRecommendeds) {
                var promotion_variant_checked = $(buyXgetY.ele).find(".buyxgety-product-list input[name='group-product-sale'][type='radio']:checked");
                var apply_variant = $(buyXgetY.ele).find(".buyxgety-product-list input[name='group-product-sale'][type='radio']:checked").data('applyvariant');
                if( promotion_variant_checked && promotion_variant_checked.length > 0 ) {
                    var promotion_countbuy='',promotion_countgift='',promotion_variant_id='';
                    
                    promotion_countbuy = parseInt(promotion_variant_checked.attr('data-countbuy'));
                    promotion_countgift = parseInt(promotion_variant_checked.attr('data-countgift'));
                                      //promotion_variant_id = $("#buyxgety-variant-popup .ega-buyxgety-btn button").data().promoId;  
                                      if(promotion_variant_id == ""){
                                            promotion_variant_id = promotion_variant_checked.attr('data-id');
                                        }
                                    
                    var is_valid_rule = (quantity >= promotion_countbuy) ? true : false;

                    if( is_valid_rule || is_accept ) {
                        jQuery.ajax({
                            type: 'POST',
                            url: '/cart/add.js',
                            data: params,
                            async: false,
                            dataType: 'json',
                            success: function(cart) {
                                if(is_valid_rule){
                                    self.setPromotionStorage(variant_id, promotion_countbuy, promotion_countgift, promotion_variant_id);
                                }
                                else {
                                    var old_promotion_variant_id = self.getPromotionStorage(variant_id);
                                    if(old_promotion_variant_id == undefined){
                                        self.setPromotionStorage(variant_id, promotion_countbuy, promotion_countgift, promotion_variant_id);
                                    }
                                    else{
                                        if(old_promotion_variant_id[variant_id] == promotion_variant_id){
                                            promotion_variant_id = old_promotion_variant_id;
                                        }
                                        else{
                                            self.setPromotionStorage(variant_id, promotion_countbuy, promotion_countgift, promotion_variant_id);
                                        }
                                    }
                                }

                                var promoteValid = parseInt(quantity / promotion_countbuy)*promotion_countgift;
                                self.AddCartItemPromotion(promotion_variant_id,promoteValid);
                                callback(cart);
                            },
                            error: function(XMLHttpRequest, textStatus) {
                                Haravan.onError(XMLHttpRequest, textStatus);
                            }
                        });
                    } 
                    else {
                        $('#alert_km').modal('show');
                        $('.modal-backdrop').css({'height':$(document).height(),'z-index':'99'});
                    }
                }
                else {
                    jQuery.ajax({
                        type: 'POST',
                        url: '/cart/add.js',
                        data: params,
                        async: false,
                        dataType: 'json',
                        success: function(cart) {
                            callback();
                        },
                        error: function(XMLHttpRequest, textStatus) {
                            Haravan.onError(XMLHttpRequest, textStatus);
                        }
                    });
                }
            }
            else {
                jQuery.ajax({
                    type: 'POST',
                    url: '/cart/add.js',
                    data: params,
                    async: false,
                    dataType: 'json',
                    success: function(cart) {
                        callback();
                    },
                    error: function(XMLHttpRequest, textStatus) {
                        Haravan.onError(XMLHttpRequest, textStatus);
                    }
                });
            }
        },
        addCartBuyXGetY_itemLoop: function(product_id,variant_id,quantity,properties,propertieskho,callback){
            var self = this,
                    promotion_variant_id = '',
                    promotion_quantity = '',
                    checkPromotionRecommend = false;
            if((properties == '' || properties == 'undefined') && (propertieskho == '' || propertieskho == 'undefined')){
                var data_param = {quantity:quantity,id:variant_id};
            }else if(properties != '' && propertieskho != ''){
                var data_param = {quantity:quantity,id:variant_id,properties:{"preorder":properties,"kho":propertieskho}};
            }else if(propertieskho != '' || propertieskho != 'undefined'){
                var data_param = {quantity:quantity,id:variant_id,properties:{"kho":propertieskho}};
            }else{
                var data_param = {quantity:quantity,id:variant_id,properties:{"preorder":properties}};
            }
            var params = {
                type: 'POST',
                async: false,
                url: '/cart/add.js',
                data: data_param,
                dataType: 'json',
                success: function(line_item) { 
                    if(product_id != null && product_id != undefined && hrvPromotionInited) {
                        buyXgetY.check_getRecommendeds = false;
                        HaravanPromotion.GetRecommendeds(parseInt(product_id), function(result) {
                            // success
                            if ( result.recommendeds.length > 0 ) {
                                buyXgetY.check_getRecommendeds = true;
                                $.each(result.recommendeds,function(i,v){
                                    var html = '<h5>Sản phẩm tặng kèm</h5>',html2='';
                                    html+='<div class="popup-content"><h4><span id="sanphamquatang">'+v.product_name+'</span></h4>';
                                    html+='<div class="imgqua"><img class="imgnhanqua" src="'+v.product_images[0]+'" alt="'+v.product_name+'"/></div>';
                                    if(v.is_apply_variant == true){
                                        checkPromotionRecommend = true;
                                        html+='<div class="variant_select"><p>Chọn size bạn mong muốn</p><select class="variant_gift">';
                                        $.each(v.apply_variants,function(i2,v2){
                                            title_variant = v2.title.replace('/','-');
                                            html2+='<option value="'+v2.variant_id+'" data-countbuy="'+v2.quantity+'" data-countgift="'+v2.apply_quantity+'" data-percent="'+v2.percent+'">'+title_variant+'</option>';
                                        });
                                        html+=html2+'</select></div>';
                                    }else{
                                        promotion_variant_id = v.variant_ids[0];
                                        promotion_quantity = v.quantity;
                                        html+='<div class="variant_select hidden"><p>Chọn size bạn mong muốn</p><select class="variant_gift">';
                                        html+='<option value="'+promotion_variant_id+'" data-countbuy="'+promotion_quantity+'" data-countgift="'+v.apply_quantity+'" data-percent="'+v.percent+'">'+v.title+'</option></select></div>';
                                    }
                                    html+='<a href="javascript:void(0)" class="btn_nhanqua" data-variantid="">BẤM VÀO ĐÂY ĐỂ NHẬN QUÀ</a>';
                                    $('#nhanqua').html(html);
                                });
                                if(checkPromotionRecommend == true){
                                    $('#nhanquamodal').modal({backdrop: 'static', keyboard: false,show: true});
                                }else{
                                    self.setPromotionStorage(variant_id, quantity, promotion_quantity, promotion_variant_id);
                                    self.AddCartItemPromotion(promotion_variant_id,promotion_quantity);
                                }
                            }
                        }, function() {
                            // error
                        }, function() {
                            // always
                            if(self.check_getRecommendeds && checkPromotionRecommend == true){
                                $('.btn_nhanqua').click(function(){
                                    var promotion_variant_id = $(this).parents('#nhanqua').find('.variant_select .variant_gift').val(),
                                            promotion_quantity = $(this).parents('#nhanqua').find('.variant_select .variant_gift option:selected').data('countgift');
                                    self.AddCartItemPromotion(promotion_variant_id,promotion_quantity,function(cart) {
                                        $('#nhanquamodal').modal('hide');
                                        callback();
                                    });
                                });
                            }else{
                                callback();
                            }
                        });
                    }
                    else {
                        callback();
                    }
                },
                error: function(XMLHttpRequest, textStatus) {
                    Haravan.onError(XMLHttpRequest, textStatus);
                }
            };
            $.ajax(params);
        },
        AddCartItemPromotion: function(promotion_variant_id,promotion_countgift, callback) {
            jQuery.ajax({
                type: 'POST',
                url: '/cart/add.js',
                async: false,
                data: 'quantity=' + promotion_countgift + '&id=' + promotion_variant_id,
                dataType: 'json',
                success: function(cart) {
                    if (Object.prototype.toString.call(callback) === '[object Function]') callback(cart);
                },
                error: function(XMLHttpRequest, textStatus) {
                    console.log('Lỗi không đủ điều kiện thêm sản phẩm tặng/giảm');
                    if (Object.prototype.toString.call(callback) === '[object Function]') callback();
									alert("Không thể thêm sản phẩm khuyến mãi");
                }
            });
            /*jQuery.ajax({
                type: 'POST',
                url: '/cart/add.js',
                data: 'quantity=' + quantity + '&id=' + promotion_variant_id,
                dataType: 'json',
                success: function(cart) {
                    if (Object.prototype.toString.call(callback) === '[object Function]') callback(cart);
                },
                error: function(XMLHttpRequest, textStatus) {
                    console.log('Lỗi không đủ điều kiện thêm sản phẩm tặng/giảm');
                    if (Object.prototype.toString.call(callback) === '[object Function]') callback();
                }
            });*/
        },
        UpdateCartFromCart: function() {
            // update lại giỏ hàng tại trang cart
            var self = this;
            var listCart = document.querySelectorAll('[id^="updates_"]');
            var tmp  = "";
            var listVariantIdHasPromotion = [];
            var listPromotionIdExisted = [];
            for(var i = 0; i < listCart.length; i++) {
                var price = $(listCart[i]).attr('data-price');
                var qty = 0;
                var variant_id = $(listCart[i]).attr('id').replace('updates_', '');
                if(price == 0) { 
                    qty = 999999;
                    listPromotionIdExisted.push(variant_id);
                }
                else if(price > 0) {
                                        let selectvl = $('[id^="updates_"]').eq(i).find('input[name="quantity"]').val()
                    qty = parseInt(selectvl);
                    var promotion_variant_id = self.getPromotionStorage(variant_id);
                    if(promotion_variant_id) 
                        listVariantIdHasPromotion.push({ variant_id: variant_id, promotion_variant_id: promotion_variant_id ,count_buy: qty, count_gift: 2});
                }
                if(i > 0) tmp += "&";
                tmp += "updates[]=" + qty;
            }
            //tmp += "&note="+$('#note').val();
            //console.log(listVariantIdHasPromotion);
            $.post('/cart', tmp).always(function() {
                for(var i = 0; i < listVariantIdHasPromotion.length; i++) {
                    if(listVariantIdHasPromotion[i].promotion_variant_id
                         && listPromotionIdExisted.indexOf(listVariantIdHasPromotion[i].promotion_variant_id) < 0) {
                        self.AddCartItemPromotion(listVariantIdHasPromotion[i].promotion_variant_id,listVariantIdHasPromotion[i].count_gift);
                        listPromotionIdExisted.push(listVariantIdHasPromotion[i].promotion_variant_id);
                    }
                }
               setTimeout(function() { location.reload(); }, 500);
            });
        },
        setPromotionStorage: function(main_variant_id, main_quantity,apply_quantity, promotion_variant_id_raw, is_not_overwrite) {
            var key = 'vnmWWWPromotionStorage';
            var promotionStorage = $.jStorage.get(key);
            if(promotionStorage == undefined || promotionStorage == null)
                promotionStorage = {};
            if(is_not_overwrite) {
                var objExisted = promotionStorage[main_variant_id];
                if(typeof(objExisted) != 'undefined')
                    return;
            }
            promotionStorage[main_variant_id] = promotion_variant_id_raw;
            promotionStorage['count_buy'] = main_quantity;
            promotionStorage['count_gift'] = apply_quantity;
            $.jStorage.set(key, promotionStorage);
        },
        getPromotionStorage: function(main_variant_id) {
            var key = 'vnmWWWPromotionStorage';
            var promotionStorage = $.jStorage.get(key);
            if(promotionStorage == undefined || promotionStorage == null)
                promotionStorage = {};
            return promotionStorage[main_variant_id];
        },
        checkPromotionRecommended: function(arr_product_id, callback) {
            if(hrvPromotionInited) {
                HaravanPromotion.CheckRecommendeds(arr_product_id, function(result) {
                    // success
                    if(typeof(callback) == 'function') callback(result);
                }, function() {
                    // error
                }, function() {
                    // always
                });
            }
        },
        showGiftLabel: function(){
            var arr_prod_id = [];
            var elementGift = '.product_gift_label';
            $(elementGift).each(function(){
                var id = $(this).attr('data-id');
                arr_prod_id.push(id);
            })
            this.checkPromotionRecommended(arr_prod_id,function(result){
                            if(result != null){
                $.each(result,function(i,item){
                    //  console.log(item.has_gift);
                    if (item.has_gift == true || item.has_discount == true){
                        $(elementGift + '[data-id="' + item.product_id +'"]').removeClass('hidden');
                    }
                })
                            }
            })
        }
    };
        $(document).ready(function (){
            buyXgetY.init();
            if (Object.prototype.toString.call(window.HaravanPromotionAsyncInit) === '[object Function]'){ 
                window.HaravanPromotionAsyncInit();
            }
        });
    
    if (!window || window.HaravanPromotion) return;

    var appUrl = 'https://buyxgety-omni.haravan.com';

    function _call(method, path, data, successcallback, errorcallback, alwayscallback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, appUrl + path);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (Object.prototype.toString.call(successcallback) === '[object Function]') successcallback(JSON.parse(xhr.responseText));
            }
            else {
                if (Object.prototype.toString.call(errorcallback) === '[object Function]') errorcallback();
            }
        };
        xhr.onloadend = function () {
            if (Object.prototype.toString.call(alwayscallback) === '[object Function]') alwayscallback();
        };
        xhr.send(data);
    };

    function getRecommendeds(product_id, successcallback, errorcallback, alwayscallback, page = 1, limit = 20) {
        if (Object.prototype.toString.call(product_id) === '[object Array]')
            _call('GET', '/js/list_recommendeds?product_ids=' + product_id + '&page=' + page + '&limit=' + limit, {}, successcallback, errorcallback, alwayscallback);
        else if (Object.prototype.toString.call(product_id) === '[object Number]')
            _call('GET', '/js/recommendeds?product_id=' + product_id + '&page=' + page + '&limit=' + limit, {}, successcallback, errorcallback, alwayscallback);
    };

    function checkRecommendeds(product_id, successcallback, errorcallback, alwayscallback) {
        if (Object.prototype.toString.call(product_id) === '[object Array]')
            _call('GET', '/js/check_list_recommendeds?product_ids=' + product_id, {}, successcallback, errorcallback, alwayscallback);
    };

    window.HaravanPromotion = {
        GetRecommendeds: getRecommendeds,
        CheckRecommendeds: checkRecommendeds
    };  
})(jQuery)





