import { Colors } from '../../core/Colors';
import { Copier } from '../../core/Copier';
import { EventDispatcher } from '../../core/EventDispatcher';
import { Shadow } from '../../core/Shadow';
import { Store } from '../../core/Store';
import { Ripple } from '../Ripple';
export class Item {
	refElement: HTMLElement;
	constructor(public elevationLevel: number) {
		this._init();
		this._applyStyles();
		this._addInnerContent();
		this._attachEvents();
	}

	private _init() {
		this.refElement = document.createElement('div');
		this.refElement.classList.add('item');
		this.refElement.appendChild(new Ripple());
	}

	private _applyStyles() {
		const colors = Colors.getColors();
		this.refElement.style.boxShadow = Shadow.getShadow({
			color: colors[Store.color],
			elevation: this.elevationLevel
		});
		this.refElement.style.color = colors[Store.color];
	}
	private _addInnerContent() {
		const counterElem = document.createElement('span');
		counterElem.classList.add('item__counter');
		counterElem.innerText = `${this.elevationLevel}`;

		const copyIcon = document.createElement('span');

		copyIcon.classList.add('item__icon');
		copyIcon.innerHTML = `
        <svg  width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path 
                d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3
                4H8c-1.1 0-2 .9-2 2v14c0 
                1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
            />
        </svg>`;
		this.refElement.appendChild(copyIcon);
		this.refElement.appendChild(counterElem);
	}

	private _attachEvents() {
		this.refElement.addEventListener('click', () => {
			this._copyToClipboard();
			EventDispatcher.emit('shadowCopied');
		});
		EventDispatcher.on('colorChange', () => {
			this._applyStyles();
		});
	}

	private _getShadowString() {
		const colors = Colors.getColors();
		return Shadow.getShadow({
			color: colors[Store.color],
			elevation: this.elevationLevel
		});
	}

	private _prepareShadowString() {
		const selector = Store.selector;
		let str;
		if (selector === 'CSSClass') {
			str = `.elevation-z${
				this.elevationLevel
			} { box-shadow: ${this._getShadowString()} }`;
		}
		if (selector === 'CSSVariable') {
			str = `--elevation-z${
				this.elevationLevel
			}: ${this._getShadowString()};`;
		}

		return str;
	}

	private _copyToClipboard() {
		const str = this._prepareShadowString();
		Copier.copyToClipboard(str);
	}
}
