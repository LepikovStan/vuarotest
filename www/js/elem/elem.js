/*
 * модуль блока товара
 */

define(
    'elem',
    ['jquery', 'backbone', 'handlebars', 'cart', 'storage'],
    function($, backbone, handlebars, cart, storage){
		var addedGoods = storage.get('cartdata').addedGoods || 0, // кол-во добавленых товаров
			goods = storage.get('cartdata').goods || {}, // список добавленых товаров
			model = Backbone.Model.extend({
				setOptionsFromStorage: function() {
					// дополняем данные модели теми что в localStorage
					this.set('data', $.extend(this.get('data'), storage.get('goods' + this.get('data').id)));
				}
			}),
			view = Backbone.View.extend({
				tagName: 'ul',
				className: 'list',
				render: function() {
					var template = Handlebars.compile($('#list').html()),
						$list = $('.list');
					
					$list.append(template(this.model.get('data')));
					this.setElement($list.find('.list__elem-'+this.model.get('data').id));
					this.button = this.$el.find('button');
				},
				events: {
					"click button": "toggleCart"
				},
				toggleCart: function() {
					this.model.get('data').inCart ? this.removeFromCart() : this.addToCart();
				},
				addToCart: function() {
					var id = this.model.get('data').id;
					
					// плюсуем общее кол-во товаров в корзине
					addedGoods++;
					// добавляем св-во что элемент в корзине
					this.model.set($.extend(this.model.get('data'), { inCart: true }));
					// дополняем список товаров в корзине
					goods[id] = { name: this.model.get('data').name };
					this.button.text('Из корзины');
					// пишем в localStorage данные о товаре
					storage.set('goods' + id, this.model.get('data'));
					
					// в модель корзины пишем данные о товарах
					cart.model.set({ data: { addedGoods: addedGoods, goods: goods }});
					// в localStorage корзины пишем данные о товарах
					storage.set('cartdata', { addedGoods: addedGoods, goods: goods });
					// рендерим корзину со списком товаров в ней
					cart.render();
				},
				removeFromCart: function() {
					var id = this.model.get('data').id;
				
					// минусуем общее кол-во товаров в корзине
					addedGoods--;
					// добавляем св-во что элемент не в корзине
					this.model.set($.extend(this.model.get('data'), { inCart: false }));
					// удаляем из списка товаров в корзине
					delete goods[id];
					this.button.text('В корзину');
					// пишем в localStorage данные о товаре
					storage.set('goods' + id, this.model.get('data'));
					
					// в модель корзины пишем данные о товарах
					cart.model.set({ data: { addedGoods: addedGoods, goods: goods }});
					// в localStorage корзины пишем данные о товарах
					storage.set('cartdata', { addedGoods: addedGoods, goods: goods });
					// рендерим корзину со списком товаров в ней
					cart.render();
				}
			});
	
		return {
			model: model,
			view: view
		}
    }
);