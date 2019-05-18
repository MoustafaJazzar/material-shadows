import { EventDispatcher } from '../EventDispatcher';

interface LocalStorageData {
	color: string;
	selector: string;
}
class AppStore {
	set selector(val: string) {
		this._selector = val;
		this._updateLocalStorage();
		EventDispatcher.emit('selectorChanged');
	}

	get selector(): string {
		this._getDataFromLocalStorage();
		return this._selector;
	}

	set color(val: string) {
		this._color = val;
		this._updateLocalStorage();
		EventDispatcher.emit('colorChanged');
	}

	get color(): string {
		this._getDataFromLocalStorage();
		return this._color;
	}

	constructor() {
		if (!this._isAvailableAtLocalStorage()) {
			this._updateLocalStorage();
		}
	}
	private _localStorageSelector: string = `materialShadow`;
	private _color: string = `black`;
	private _selector: string = `CSSClass`;

	private _isAvailableAtLocalStorage(): boolean {
		return window.localStorage.hasOwnProperty(this._localStorageSelector);
	}

	private _updateLocalStorage(): void {
		window.localStorage.setItem(
			this._localStorageSelector,
			JSON.stringify({
				color: this._color,
				selector: this._selector
			})
		);
	}

	private _getDataFromLocalStorage(): void {
		if (this._isAvailableAtLocalStorage()) {
			const data: LocalStorageData = JSON.parse(
				window.localStorage.getItem(this._localStorageSelector)
			);

			this._color = data.color;
			this._selector = data.selector;
		}
	}
}

export let Store = new AppStore();
