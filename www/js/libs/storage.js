define(
    'storage',
    ['jquery'],
    function($){
        return {
			// получаем значение из localStorage, если параметра name нет, то возвращаем весь спектр параметров
            get: function(name) {
				// проверяем работает ли localStorage
				if (!this._canUseLocalStorage()) return false;
				// если нет нужного параметра для корзины - то возвращаем false
				var cart = localStorage.cart && JSON.parse(localStorage.cart);
				if (!cart) return false;
				
				return name ? cart[name] : cart;
			},
			// записываем значение в localStorage
			set: function(name, val) {
				// проверяем работает ли localStorage
				if (!this._canUseLocalStorage()) return false;
				// если нет нужного параметра для корзины - то создаем
				if (!localStorage.cart) this._create();
				var data = {};
				data[name] = val;
				ls = this.get();
				
				// получаем все параметры и добавляем нужный в список и записываем обратно в localStorage
				localStorage.cart = JSON.stringify($.extend(ls, data));
			},
			// создаем св-во в localStorage для блока корзины cart
			_create: function() {
				localStorage.cart = '{}';
			},
			// проверка работоспособности localStorage
			_canUseLocalStorage: function() {
				try {
					return 'localStorage' in window && window['localStorage'] !== null;
				} catch (e) {
					return false;
				}
			}
        };
    }
);