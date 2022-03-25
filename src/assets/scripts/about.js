// jsのインポート
import { log, Sample, SampleExtend } from '@scripts/modules/utils';

// scssのインポート
import '@styles/about.scss';

// 実行
document.addEventListener('DOMContentLoaded', () => {
  log(`process.env.APP_ENV: ${process.env.APP_ENV}`);
  const es = new Sample();
  es.counter();
  Sample.version();
  const esEx = new SampleExtend();
  esEx.counterExtend();
});
