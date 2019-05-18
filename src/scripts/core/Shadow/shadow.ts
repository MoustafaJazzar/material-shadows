class ShadowFormatter {
	getShadow({
		color = '#000000',
		elevation = 1
	}: {
		color: string;
		elevation: string | number;
	}): string {
		const umbraMap = this._getUmbraMap(color)[elevation];
		const penumbraMap = this._getPenumbraMap(color)[elevation];
		const ambientMap = this._getAmbientMap(color)[elevation];

		return `${umbraMap}, ${penumbraMap}, ${ambientMap}`;
	}

	private _getUmbraMap(color: string) {
		const shadowColor = this._hexToRgbA(color, 0.2);

		return {
			0: `0px 0px 0px 0px ${shadowColor}`,
			1: `0px 2px 1px -1px ${shadowColor}`,
			2: `0px 3px 1px -2px ${shadowColor}`,
			3: `0px 3px 3px -2px ${shadowColor}`,
			4: `0px 2px 4px -1px ${shadowColor}`,
			5: `0px 3px 5px -1px ${shadowColor}`,
			6: `0px 3px 5px -1px ${shadowColor}`,
			7: `0px 4px 5px -2px ${shadowColor}`,
			8: `0px 5px 5px -3px ${shadowColor}`,
			9: `0px 5px 6px -3px ${shadowColor}`,
			10: `0px 6px 6px -3px ${shadowColor}`,
			11: `0px 6px 7px -4px ${shadowColor}`,
			12: `0px 7px 8px -4px ${shadowColor}`,
			13: `0px 7px 8px -4px ${shadowColor}`,
			14: `0px 7px 9px -4px ${shadowColor}`,
			15: `0px 8px 9px -5px ${shadowColor}`,
			16: `0px 8px 10px -5px ${shadowColor}`,
			17: `0px 8px 11px -5px ${shadowColor}`,
			18: `0px 9px 11px -5px ${shadowColor}`,
			19: `0px 9px 12px -6px ${shadowColor}`,
			20: `0px 10px 13px -6px ${shadowColor}`,
			21: `0px 10px 13px -6px ${shadowColor}`,
			22: `0px 10px 14px -6px ${shadowColor}`,
			23: `0px 11px 14px -7px ${shadowColor}`,
			24: `0px 11px 15px -7px ${shadowColor}`
		};
	}
	private _getPenumbraMap(color: string) {
		const shadowColor = this._hexToRgbA(color, 0.14);

		return {
			0: `0px 0px 0px 0px ${shadowColor}`,
			1: `0px 1px 1px 0px ${shadowColor}`,
			2: `0px 2px 2px 0px ${shadowColor}`,
			3: `0px 3px 4px 0px ${shadowColor}`,
			4: `0px 4px 5px 0px ${shadowColor}`,
			5: `0px 5px 8px 0px ${shadowColor}`,
			6: `0px 6px 10px 0px ${shadowColor}`,
			7: `0px 7px 10px 1px ${shadowColor}`,
			8: `0px 8px 10px 1px ${shadowColor}`,
			9: `0px 9px 12px 1px ${shadowColor}`,
			10: `0px 10px 14px 1px ${shadowColor}`,
			11: `0px 11px 15px 1px ${shadowColor}`,
			12: `0px 12px 17px 2px ${shadowColor}`,
			13: `0px 13px 19px 2px ${shadowColor}`,
			14: `0px 14px 21px 2px ${shadowColor}`,
			15: `0px 15px 22px 2px ${shadowColor}`,
			16: `0px 16px 24px 2px ${shadowColor}`,
			17: `0px 17px 26px 2px ${shadowColor}`,
			18: `0px 18px 28px 2px ${shadowColor}`,
			19: `0px 19px 29px 2px ${shadowColor}`,
			20: `0px 20px 31px 3px ${shadowColor}`,
			21: `0px 21px 33px 3px ${shadowColor}`,
			22: `0px 22px 35px 3px ${shadowColor}`,
			23: `0px 23px 36px 3px ${shadowColor}`,
			24: `0px 24px 38px 3px ${shadowColor}`
		};
	}
	private _getAmbientMap(color: string) {
		const shadowColor = this._hexToRgbA(color, 0.12);

		return {
			0: `0px 0px 0px 0px ${shadowColor}`,
			1: `0px 1px 3px 0px ${shadowColor}`,
			2: `0px 1px 5px 0px ${shadowColor}`,
			3: `0px 1px 8px 0px ${shadowColor}`,
			4: `0px 1px 10px 0px ${shadowColor}`,
			5: `0px 1px 14px 0px ${shadowColor}`,
			6: `0px 1px 18px 0px ${shadowColor}`,
			7: `0px 2px 16px 1px ${shadowColor}`,
			8: `0px 3px 14px 2px ${shadowColor}`,
			9: `0px 3px 16px 2px ${shadowColor}`,
			10: `0px 4px 18px 3px ${shadowColor}`,
			11: `0px 4px 20px 3px ${shadowColor}`,
			12: `0px 5px 22px 4px ${shadowColor}`,
			13: `0px 5px 24px 4px ${shadowColor}`,
			14: `0px 5px 26px 4px ${shadowColor}`,
			15: `0px 6px 28px 5px ${shadowColor}`,
			16: `0px 6px 30px 5px ${shadowColor}`,
			17: `0px 6px 32px 5px ${shadowColor}`,
			18: `0px 7px 34px 6px ${shadowColor}`,
			19: `0px 7px 36px 6px ${shadowColor}`,
			20: `0px 8px 38px 7px ${shadowColor}`,
			21: `0px 8px 40px 7px ${shadowColor}`,
			22: `0px 8px 42px 7px ${shadowColor}`,
			23: `0px 9px 44px 8px ${shadowColor}`,
			24: `0px 9px 46px 8px ${shadowColor}`
		};
	}

	private _hexToRgbA(hex: string, alpha: number = 1): string {
		let c: string | number | any;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');
			if (c.length === 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = `0x${c.join('')}`;

			return `rgba(${[
				(c >> 16) & 255,
				(c >> 8) & 255,
				c & 255
			]},${alpha})`;
		}
		throw new Error('Bad Hex');
	}
}

export let Shadow = new ShadowFormatter();
