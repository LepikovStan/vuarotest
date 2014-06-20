requirejs.config({
    baseUrl: '/js/',
	
    paths: {
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		handlebars: 'libs/handlebars',
		storage: 'libs/storage',
		
		elem: 'elem/elem',
		cart: 'cart/cart'
    }
});

// список товаров
var list = [
	{
		name: 'Товар 1',
		id: 1
	},
	{
		name: 'Товар 2',
		id: 2
	}
];

require(
    ['storage', 'underscore', 'elem', 'cart'],
    function(storage, underscore, elem, cart){
		var goods = [];
		
		// для каждого товара создаем свой view
		_.each(list, function(el, i) {
			goods.push(new elem.view({ model: new elem.model() }));
		});
		
		// для каждого товара заполняем данные из storage или из списка товаров и рендерим их 
		_.each(goods, function(el, i) {
			el.model.set({ data: list[i] });
			el.model.setOptionsFromStorage();
			el.render();
		});
		
		cart.model.setOptionsFromStorage();
		cart.render();
    }
);
