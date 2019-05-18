class Dispatcher {
	private _events = {};

	on(eventName: string, fn: () => void) {
		this._events[eventName] = this._events[eventName] || [];
		this._events[eventName].push(fn);
	}

	off(eventName: string, fn: () => void) {
		if (this._events[eventName]) {
			for (let i = 0; i < this._events[eventName].length; i++) {
				if (this._events[eventName][i] === fn) {
					this._events[eventName].splice(i, 1);
					break;
				}
			}
		}
	}

	emit(eventName: string, data?: any) {
		if (this._events[eventName]) {
			this._events[eventName].forEach((fn: any) => {
				fn(data);
			});
		}
	}
}

export let EventDispatcher = new Dispatcher();
