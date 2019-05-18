import {
	defaultRippleAnimationConfig,
	ignoreMouseEventsTimeout
} from './constants';
import { RippleRef, RippleState } from './ripple-ref';
import * as Utils from './utils';

const passiveEventOptions = Utils.normalizePassiveListenerOptions({
	passive: true
});

export interface RippleConfig {
	color?: string;
	centered?: boolean;

	persistent?: boolean;
	animation?: RippleAnimationConfig;
	terminateOnPointerUp?: boolean;
}

export interface RippleAnimationConfig {
	enterDuration?: number;
	exitDuration?: number;
}

export interface RippleTarget extends HTMLElement {
	rippleConfig: RippleConfig;
	rippleDisabled: boolean;
}

export class RippleRenderer {
	constructor(private _target: RippleTarget) {
		this._containerElement = _target;

		this._triggerEvents
			.set('mousedown', this.onMousedown)
			.set('mouseup', this.onPointerUp)
			.set('mouseleave', this.onPointerUp)

			.set('touchstart', this.onTouchStart)
			.set('touchend', this.onPointerUp)
			.set('touchcancel', this.onPointerUp);
	}
	private _containerElement: HTMLElement;

	private _isPointerDown = false;

	private _triggerEvents = new Map<string, any>();

	private _activeRipples = new Set<RippleRef>();

	private _mostRecentTransientRipple: RippleRef | null;

	private _lastTouchStartEvent: number;

	private _containerRect: ClientRect | null;

	private _triggerElement: HTMLElement | null;

	fadeInRipple(x: number, y: number, config: RippleConfig = {}): RippleRef {
		const containerRect = (this._containerRect =
			this._containerRect ||
			this._containerElement.getBoundingClientRect());
		const animationConfig = {
			...defaultRippleAnimationConfig,
			...config.animation
		};

		if (config.centered) {
			x = containerRect.left + containerRect.width / 2;
			y = containerRect.top + containerRect.height / 2;
		}

		const radius = Utils.distanceToFurthestCorner(x, y, containerRect);
		const offsetX = x - containerRect.left;
		const offsetY = y - containerRect.top;
		const duration = animationConfig.enterDuration;

		const ripple = document.createElement('div');
		ripple.classList.add('rippler');

		ripple.style.left = `${offsetX - radius}px`;
		ripple.style.top = `${offsetY - radius}px`;
		ripple.style.height = `${radius * 2}px`;
		ripple.style.width = `${radius * 2}px`;

		ripple.style.backgroundColor = config.color || null;
		ripple.style.transitionDuration = `${duration}ms`;

		this._containerElement.shadowRoot.appendChild(ripple);

		Utils.enforceStyleRecalculation(ripple);

		ripple.style.transform = 'scale(1)';

		const rippleRef = new RippleRef(this, ripple, config);

		rippleRef.state = RippleState.FADING_IN;

		this._activeRipples.add(rippleRef);

		if (!config.persistent) {
			this._mostRecentTransientRipple = rippleRef;
		}

		setTimeout(() => {
			const isMostRecentTransientRipple =
				rippleRef === this._mostRecentTransientRipple;

			rippleRef.state = RippleState.VISIBLE;

			if (
				!config.persistent &&
				(!isMostRecentTransientRipple || !this._isPointerDown)
			) {
				rippleRef.fadeOut();
			}
		},         duration);

		return rippleRef;
	}
	fadeOutRipple(rippleRef: RippleRef) {
		const wasActive = this._activeRipples.delete(rippleRef);

		if (rippleRef === this._mostRecentTransientRipple) {
			this._mostRecentTransientRipple = null;
		}

		if (!this._activeRipples.size) {
			this._containerRect = null;
		}

		if (!wasActive) {
			return;
		}

		const rippleEl = rippleRef.element;
		const animationConfig = {
			...defaultRippleAnimationConfig,
			...rippleRef.config.animation
		};

		rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
		rippleEl.style.opacity = '0';
		rippleRef.state = RippleState.FADING_OUT;

		setTimeout(() => {
			rippleRef.state = RippleState.HIDDEN;
			rippleEl.parentNode.removeChild(rippleEl);
		},         animationConfig.exitDuration);
	}

	fadeOutAll() {
		this._activeRipples.forEach((ripple) => ripple.fadeOut());
	}

	setupTriggerEvents(element: HTMLElement) {
		if (!element || element === this._triggerElement) {
			return;
		}
		this._removeTriggerEvents();

		setTimeout(() => {
			this._triggerEvents.forEach((fn, type) => {
				element.addEventListener(type, fn, passiveEventOptions);
			});
		});

		this._triggerElement = element;
	}

	_removeTriggerEvents() {
		if (this._triggerElement) {
			this._triggerEvents.forEach((fn, type) => {
				this._triggerElement!.removeEventListener(
					type,
					fn,
					passiveEventOptions
				);
			});
		}
	}

	private onMousedown = (event: MouseEvent) => {
		const isFakeMousedown = Utils.isFakeMousedownFromScreenReader(event);
		const isSyntheticEvent =
			this._lastTouchStartEvent &&
			Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;

		if (
			!this._target.rippleDisabled &&
			!isFakeMousedown &&
			!isSyntheticEvent
		) {
			this._isPointerDown = true;
			this.fadeInRipple(
				event.clientX,
				event.clientY,
				this._target.rippleConfig
			);
		}
	}

	private onTouchStart = (event: TouchEvent) => {
		this._lastTouchStartEvent = Date.now();
		this._isPointerDown = true;

		const touches = event.changedTouches;

		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < touches.length; i++) {
			this.fadeInRipple(
				touches[i].clientX,
				touches[i].clientY,
				this._target.rippleConfig
			);
		}
	}

	private onPointerUp = () => {
		if (!this._isPointerDown) {
			return;
		}
		this._isPointerDown = false;

		this._activeRipples.forEach((ripple) => {
			const isVisible =
				ripple.state === RippleState.VISIBLE ||
				(ripple.config.terminateOnPointerUp &&
					ripple.state === RippleState.FADING_IN);

			if (!ripple.config.persistent && isVisible) {
				ripple.fadeOut();
			}
		});
	}
}
