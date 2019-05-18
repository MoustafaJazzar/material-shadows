import { ColorsTray } from '../ColorsTray';
import { SelectorsTray } from '../SelectorsTray';

export class Overlay {
	DOM: any = {};
	constructor() {
		this._cashDOM();
		this._attachEvents();
	}
	show({ trigger }: { trigger: HTMLElement }) {
		this.DOM[`containerElement`].classList.add('show');
		const triggerType: string = trigger.dataset.trigger;
		this._addAttr(triggerType);

		if (triggerType === 'colors') {
			this.DOM[`colorsTray`].show(trigger);
		}
		if (triggerType === 'formats') {
			this.DOM[`selectorsTray`].show(trigger);
		}
	}
	hide() {
		this._removeAllAttr();
		this.DOM[`containerElement`].classList.remove('show');
	}
	private _cashDOM() {
		this.DOM[`containerElement`] = document.querySelector(
			'.overlay'
		) as HTMLElement;
		this.DOM[`colorsTray`] = new ColorsTray(this.DOM[`containerElement`]);
		this.DOM[`selectorsTray`] = new SelectorsTray(
			this.DOM[`containerElement`]
		);
	}

	private _attachEvents() {
		this.DOM[`containerElement`].addEventListener('click', () =>
			this.hide()
		);
	}
	private _addAttr(attr: string) {
		this.DOM[`containerElement`].setAttribute(attr, '');
	}
	private _removeAllAttr() {
		this.DOM[`containerElement`].removeAttribute('colors');
		this.DOM[`containerElement`].removeAttribute('formats');
	}
}
