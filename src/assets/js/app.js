// jsのインポート
import { log, Sample, SampleExtend } from "@js/common";

// scssのインポート
import "@scss/app.scss";

// 実行
document.addEventListener('DOMContentLoaded', () => {
	const es = new Sample();
	es.counter();
	Sample.version();
	const esEx = new SampleExtend();
	esEx.counterExtend();
});