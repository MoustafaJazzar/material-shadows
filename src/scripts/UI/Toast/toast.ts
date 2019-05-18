import { EventDispatcher } from '../../core/EventDispatcher';

class XToast extends HTMLElement {
	duration: number = 200;
	timer: any;
	static get observedAttributes() {
		return ['visible'];
	}

	constructor() {
		super();
		const template = document.createElement('template');
		template.innerHTML = `
            <style>
                :host {
                    position: fixed !important;;
                    bottom: 0;
                    width: 100%;
                    padding: 16px;
                    display: grid;
                    justify-content: left;
                    pointer-events: none;
                    z-index: 1400;
                    opacity: 0;
                    transform:  translate3d(0, 100%, 0);
                    transform-origin: center;
                    transition: all ${
						this.duration
					}ms cubic-bezier(0, 0, 0.2, 1);
                    will-change: transform;
                }
                :host([visible]) {
                    transform: translate3d(0, 0, 0);
                    opacity: 1
                }
                
                .toast__inner {
                    min-width: 180px;
                    max-width: 400px;
                    height: 48px;
                    border-radius: 4px;
                    background-color: #212121;
                    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
                        0px 6px 10px 0px rgba(0, 0, 0, 0.14),
                        0px 1px 18px 0px rgba(0, 0, 0, 0.12);
                    overflow: hidden;
                    padding: 0 16px;
                    color: #fff;
                    white-space: nowrap;
                    display: grid;
                    align-items: center;
                }
                
                .toast__content {
                    max-width: 100%;
                    display: grid;
                    grid-auto-flow: column;
                    align-items: center;
                    grid-gap: 16px;
                    grid-template-columns: auto 1fr;
                }
                
                .toast__icon {
                    width: 24px;
                    height: 24px;
                }
                
                .toast__msg {
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                
                @media (max-width: 900px) {
                    :host {
                        justify-content: center;
                    }
                }
            </style>

            <div class="toast__inner">
                <div class="toast__content">
                    <svg class="toast__icon" >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor"
                            d="M12 2C6.48 2 2 6.48 2
                            12s4.48 10 10 10 10-4.48
                            10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                    </svg>
                    <div class="toast__msg"> hello</div>
                </div>
            </div>
        
        `;

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.content.cloneNode(true));

		this._attachEvents();
	}

	show() {
		this.visible = true;
		this.timer = setTimeout(() => this.hide(), 1000);
	}

	hide() {
		clearTimeout(this.timer);
		this.removeAttribute('visible');
	}

	set visible(visible: boolean) {
		if (visible) {
			this.setAttribute('visible', '');
		} else {
			this.hide();
		}
	}

	_changeMsg(msg: string) {
		this.shadowRoot.querySelector('.toast__msg').textContent = msg;
	}

	_attachEvents() {
		EventDispatcher.on(`colorChange`, () => {
			this._changeMsg(`Color changed`);
			this.hide();
			this.show();
		});
		EventDispatcher.on(`selectorChange`, () => {
			this._changeMsg(`Selector changed`);
			this.hide();
			this.show();
		});
		EventDispatcher.on(`shadowCopied`, () => {
			this._changeMsg(`Shadow copied`);
			this.hide();
			this.show();
		});
	}
}

customElements.define('x-toast', XToast);

export { XToast };
