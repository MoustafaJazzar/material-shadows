import '../styles/main.scss';
import { Overlay } from './UI/Overlay';
import './UI/Ripple';

class App {
	DOM: any = {};
	constructor() {
		this.cashDOM();
		this.attachEvents();
	}

	cashDOM() {
		this.DOM[`colorBtn`] = document.querySelector(
			'.color__btn'
		) as HTMLElement;
		this.DOM[`formatBtn`] = document.querySelector(
			'.formats__btn'
		) as HTMLElement;
		this.DOM[`overlay`] = new Overlay() as Overlay;
	}
	attachEvents() {
		this.DOM[`colorBtn`].addEventListener('click', () =>
			this.DOM[`overlay`].show({ trigger: this.DOM[`colorBtn`] })
		);
		this.DOM[`formatBtn`].addEventListener('click', () =>
			this.DOM[`overlay`].show({ trigger: this.DOM[`formatBtn`] })
		);
	}
}
window.addEventListener('DOMContentLoaded', () => new App());
