/**
 * 路由规则
 */


class Router {
	constructor() {
		this.data = [];

		this.setup();
	}

	setup() {
		this.events();
	}

	// 添加路由规则
	use(path, handler) {
		this.data.push({
			path: path,
			handler: handler
		});

		return this;
	}


	// 监听
	events() {
		window.addEventListener('hashchange', () => {
			this.receive();
		});
	}

	// 接收
	receive() {
		var path = window.location.hash.replace(/^#!?/, '');

		if (this.hasPath(path)) {
			this.trigger(path);
		}		
	}

	// 获取监听项
	getPathItems(path) {
		var items = []; 
		for (let i = 0; i < this.data.length; i++) {
			let reg = new RegExp(`^${this.data[i].path}([?](.{0,})?)?$`, 'i');
			if (reg.test(path)) {
				// return this.data[i];

				items.push(this.data[i]);
			}
		}
		return items;
	}

	// 路径存在
	hasPath(path) {
		var items = this.getPathItems(path);
		return items.length > 0;
	}

	// 事件触发
	trigger(path) {
		var items = this.getPathItems(path),
				param = Router.parseParam(
						this.getParam(path)
					);
				// param = null;
		items.forEach(function(item) {
			item.handler && item.handler(item.path, param);
		});
	}

	// 路由跳转
	goto(path, param) {
		if (param) {
			path += '?' + Router.parseParamUrl(param);
		}
		window.location.hash = '!' + path;
	}

	// 获取参数
	getParam(path) {
		var param = path.match(/[?](.{0,})/);
		return param ? param[1] : null;
	}


	// 转化参数 url -> param
	static parseParam(url) {
		var param = {};
		var arr = url.split('&');
		for (let i = 0; i < arr.length; i++) {
			let arr2 = arr[i].split('=');
			param[ arr2[0] ] = arr2[1];
		}

		return param;
	}
	// 转化参数 param -> url
	static parseParamUrl(param) {
		var ret = [];
		for (let key in param) {
			ret.push(`${ key }=${ param[key] }`);
		}

		return ret.join('&');
	}
}