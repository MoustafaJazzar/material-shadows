import { RippleConfig, RippleRenderer } from './ripple-renderer';

export enum RippleState {
	FADING_IN,
	VISIBLE,
	FADING_OUT,
	HIDDEN
}

export class RippleRef {
	state: RippleState = RippleState.HIDDEN;

	constructor(
		private _renderer: RippleRenderer,
		public element: HTMLElement,
		public config: RippleConfig
	) {}

	fadeOut() {
		this._renderer.fadeOutRipple(this);
	}
}
