// method
export function log($dump = "") {
	console.log($dump);
}

// クラス
export class Sample {

	// private property
	#count = 0;

	// #count setter
	set count(val) {
		this.#count = val;
	}

	// #count getter
	get count() {
		return this.#count;
	}

	// private method
	#increment() {
		this.#count++;
	}

	counter() {
		this.#increment();
		console.log(`Sample ${this.#count}`);
	}

	static version() {
		console.log('version 1.0.1');
	}
}

// 継承
export class SampleExtend extends Sample {
	counterExtend() {
		console.log(`SampleExtend ${this.count}`);
	}
}
