/*
 * модуль блока корзины
 */

define(
    'cart',
    ['backbone', 'handlebars', 'storage'],
    function(backbone, handlebars, storage){
		var model = Backbone.Model.extend({
				setOptionsFromStorage: function() {
					// дополняем данные модели теми что в localStorage
					this.set('data', $.extend(this.get('data'), storage.get('cartdata')));
				}
			}),
			view = Backbone.View.extend({
				render: function() {
					var templateNum = Handlebars.compile($('#addedGoods').html()),
						templateList = Handlebars.compile($('#addedGoodsList').html());
					
					// рендерим кол-во товаров в корзине
					$('.addedGoods').html(templateNum(this.model.get('data')));
					// рендерим список товаров в корзине
					$('.addedGoodsList').html(templateList(this.model.get('data')));
					this.setElement($('.cart'));
				},
				events: {
					'click button': 'sendData'
				},
				sendData: function() {
					console.log('send', this.model.get('data').goods);
				}
			});
	
		return new view({ model: new model({ data: { addedGoods: 0 } }) });
    }
);