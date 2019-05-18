class ColorsClass {
	colors: any = {};
	constructor() {
		this.colors[`black`] = `#000000`;
		this.colors[`pink`] = `#e91e63`;
		this.colors[`purple`] = `#9c27b0`;
		this.colors[`blue`] = `#3f51b5`;
	}

	getColors() {
		return this.colors;
	}
}

export let Colors = new ColorsClass();
