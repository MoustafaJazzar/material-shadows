let supportsPassiveEvents: boolean;

export function enforceStyleRecalculation(element: HTMLElement) {
	window.getComputedStyle(element).getPropertyValue('opacity');
}

export function distanceToFurthestCorner(
	x: number,
	y: number,
	rect: ClientRect
) {
	const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
	const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
	return Math.sqrt(distX * distX + distY * distY);
}

export function supportsPassiveEventListeners(): boolean {
	if (supportsPassiveEvents == null && typeof window !== 'undefined') {
		try {
			window.addEventListener(
				'test',
				null!,
				Object.defineProperty({}, 'passive', {
					get: () => (supportsPassiveEvents = true)
				})
			);
		} finally {
			supportsPassiveEvents = supportsPassiveEvents || false;
		}
	}

	return supportsPassiveEvents;
}

export function normalizePassiveListenerOptions(
	options: AddEventListenerOptions
): AddEventListenerOptions | boolean {
	return supportsPassiveEventListeners() ? options : !!options.capture;
}
export function isFakeMousedownFromScreenReader(event: MouseEvent): boolean {
	return event.buttons === 0;
}
