import { EventDispatcher } from '../../core/EventDispatcher';
import { Store } from '../../core/Store';

export class SelectorsTray {
	DOM: any = {};
	tray: any;
	constructor(public containerElement: HTMLElement) {
		this.tray = this.containerElement.querySelector(
			'.overlay__inner-formats'
		);
		this._cashDOM();
		this._init();
		this._attachEvents();
	}

	show(trigger: HTMLElement) {
		const trayR = this._calcPosition(trigger).right;
		const carrotR = this._calcPosition(trigger).carrotR;

		this.tray.style.right = `${trayR}px`;
		this.tray.querySelector(
			'.overlay__carrot'
		).style.right = `${carrotR}px`;
	}
	private _init() {
		this._addActiveClass(this.DOM[`activeBtn`]);
	}

	private _cashDOM() {
		this.DOM[`selectorButtons`] = Array.from(
			this.containerElement.querySelectorAll('.selector-btn')
		);
		this.DOM[`activeBtn`] = this.DOM[`selectorButtons`].find(
			(btn: HTMLElement) => btn.dataset.format === Store.selector
		);
	}
	private _removeActiveClass() {
		this.DOM[`selectorButtons`].forEach((btn: HTMLElement) => {
			btn.classList.remove('active');
		});
	}
	private _addActiveClass(btn: HTMLElement) {
		btn.classList.add('active');
	}
	private _attachEvents() {
		this.DOM[`selectorButtons`].forEach((btn: HTMLElement) => {
			btn.addEventListener('click', () => {
				this._removeActiveClass();
				this.DOM[`activeBtn`] = btn;
				this._addActiveClass(btn);
				Store.selector = btn.dataset.format;
				EventDispatcher.emit('selectorChange');
			});
		});
	}
	private _calcPosition(trigger: HTMLElement) {
		const containerRect: ClientRect = this.containerElement.getBoundingClientRect();
		const triggerRect: ClientRect = trigger.getBoundingClientRect();

		const right = containerRect.width - triggerRect.right;

		const carrotR = triggerRect.width / 2 - 5;
		return {
			right,
			carrotR
		};
	}
}
