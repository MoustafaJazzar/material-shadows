import {
	RippleAnimationConfig,
	RippleConfig,
	RippleRenderer
} from './ripple-renderer';

export interface RippleGlobalOptions {
	disabled?: boolean;

	animation?: RippleAnimationConfig;

	terminateOnPointerUp?: boolean;
}

export class Ripple extends HTMLElement {
	set centered(val: boolean) {
		this._centered = val;
	}
	get centered() {
		return this._centered;
	}

	set color(val: string) {
		this._color = val;
	}
	get color() {
		return this._color;
	}

	set animation(val: RippleAnimationConfig) {
		this._animation = val;
	}
	get animation() {
		return this._animation;
	}

	get disabled() {
		return this._disabled;
	}
	set disabled(value: boolean) {
		this._disabled = value;
		this._setupTriggerEventsIfEnabled();
	}
	get unbounded() {
		return this._unbounded;
	}
	set unbounded(value: boolean) {
		this._unbounded = value;
		this._setupUnboundedContainer();
	}

	get rippleConfig(): RippleConfig {
		return {
			centered: this.centered,
			color: this.color,
			animation: { ...this._globalOptions.animation, ...this.animation },
			terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
		};
	}
	get rippleDisabled(): boolean {
		return this.disabled || !!this._globalOptions.disabled;
	}

	_rippleRenderer: RippleRenderer;
	_centered: boolean = false;
	_color: string /*= `rgba(0,0,0,0.1)`*/;
	_animation: RippleAnimationConfig;
	_disabled: boolean = false;
	_unbounded: boolean = false;

	constructor(globalOptions?: RippleGlobalOptions) {
		super();
		this.setup();

		this._globalOptions = globalOptions || {};
		this._rippleRenderer = new RippleRenderer(this);

		this._color = `rgba(0,0,0,0.08)`;
	}
	private _globalOptions: RippleGlobalOptions;
	private _isInitialized: boolean = false;

	setup() {
		const tmp = document.createElement('template');
		tmp.innerHTML = `
            <style>
                :host{
                    position: absolute !important;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    z-index: 2;
                    overflow: ${this.unbounded ? 'visible' : 'hidden'};
                }
                :host([unbounded]){
                    overflow: visible;
                }

                .rippler {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
                    transform: scale(0);
                }
            </style>
            <slot></slot>
        `;
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(tmp.content.cloneNode(true));
	}

	connectedCallback() {
		this._isInitialized = true;
		this._setupTriggerEventsIfEnabled();
	}

	private _setupTriggerEventsIfEnabled() {
		if (!this.disabled && this._isInitialized) {
			this._rippleRenderer.setupTriggerEvents(this);
		}
	}

	private _setupUnboundedContainer() {
		const val = this.unbounded;
		if (val) {
			this.setAttribute('unbounded', '');
		} else {
			this.removeAttribute('unbounded');
		}
	}
}

window.customElements.define('x-ripple', Ripple);
