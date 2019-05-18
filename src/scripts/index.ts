import '../styles/main.scss';
import { Item } from './UI/Item';
import { Overlay } from './UI/Overlay';
import './UI/Ripple';
import './UI/Toast';

class App {
	DOM: any = {};
	constructor() {
		this.cashDOM();
		this.init();
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

		this.DOM[`mainContainer`] = document.querySelector(
			'main'
		) as HTMLElement;
		this.DOM[`items`] = new Set<Item>();
	}
	init() {
		for (let i = 0; i <= 24; i++) {
			const item = new Item(i);
			this.DOM[`items`].add(item);
		}

		this.DOM[`items`].forEach((item: Item) => {
			this.DOM[`mainContainer`].appendChild(item.refElement);
		});
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
