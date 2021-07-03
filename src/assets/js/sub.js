// jsのインポート
import { log, Sample, SampleExtend } from "@js/common";

// 実行
document.addEventListener('DOMContentLoaded', () => {
	log('Hello about');
	const es = new Sample();
	es.counter();
	Sample.version();
	const esEx = new SampleExtend();
	esEx.counterExtend();
});
