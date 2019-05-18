import { Colors } from '../../core/Colors';
import { EventDispatcher } from '../../core/EventDispatcher';
import { Store } from '../../core/Store';

export class ColorsTray {
	DOM: any = {};

	tray: any;
	constructor(public containerElement: HTMLElement) {
		this.tray = this.containerElement.querySelector(
			'.overlay__inner-colors'
		);
		this._cashDOM();
		this._init();
		this._attachEvents();

		this._addActiveClass();
	}

	show(trigger: HTMLElement) {
		const r = this._calcPosition(trigger).right;
		this.tray.style.right = `${r}px`;
	}
	private _init() {
		const colors = Colors.getColors();
		this.DOM[`colorSwatches`].forEach((swatch: HTMLElement) => {
			swatch.style.backgroundColor = colors[swatch.dataset.clr];
		});
	}

	private _cashDOM() {
		this.DOM[`colorSwatchesTrigger`] = Array.from(
			this.containerElement.querySelectorAll('.btn-color-swatch')
		);
		this.DOM[`colorSwatches`] = Array.from(
			this.containerElement.querySelectorAll('.color-swatch')
		);
		this.DOM[`activeSwatch`] = this.DOM[`colorSwatches`].find(
			(swatch: HTMLElement) => swatch.dataset.clr === Store.color
		);
	}
	private _removeActiveClass() {
		this.DOM[`colorSwatches`].forEach((swatch: HTMLElement) => {
			swatch.classList.remove('active');
		});
	}
	private _addActiveClass() {
		this.DOM[`activeSwatch`].classList.add('active');
	}

	private _populateStore() {
		Store.color = this.DOM[`activeSwatch`].dataset.clr;
	}
	private _attachEvents() {
		this.DOM[`colorSwatchesTrigger`].forEach(
			(swatch: HTMLElement, index: number) => {
				swatch.addEventListener('click', () => {
					this._removeActiveClass();
					this.DOM[`activeSwatch`] = this.DOM[`colorSwatches`][index];
					this._addActiveClass();
					this._populateStore();
					EventDispatcher.emit('colorChange');
				});
			}
		);
	}
	private _calcPosition(trigger: HTMLElement) {
		const containerRect: ClientRect = this.containerElement.getBoundingClientRect();
		const triggerRect: ClientRect = trigger.getBoundingClientRect();
		const trayRect: ClientRect = this.tray.getBoundingClientRect();

		const triggerCenter =
			containerRect.width - triggerRect.right + triggerRect.width / 2;

		const right = triggerCenter - trayRect.width / 2;

		return {
			right
		};
	}
}
