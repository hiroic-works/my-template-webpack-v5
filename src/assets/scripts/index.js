// jsのインポート
import { log, createImg, Sample, SampleExtend } from '@scripts/modules/utils';

// scssのインポート
import '@styles/index.scss';

import imgsrc01 from '@images/logo.png';

// 実行
document.addEventListener('DOMContentLoaded', () => {
  log(`process.env.APP_ENV: ${process.env.APP_ENV}`);
  createImg('img01', imgsrc01);
  const es = new Sample();
  es.counter();
  Sample.version();
  const esEx = new SampleExtend();
  esEx.counterExtend();
});
