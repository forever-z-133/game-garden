/**
 * 动画类
 */
type MoreOption = {
  easing?: any,
  onProgress?: (result: any, progress: number) => void,
  onFinish?: () => void,
};
class Animation {
  start: any = {};
  end: any = {};
  duration: number = 1000;
  easing: any;
  onProgress?: (result: any, progress: number) => void;
  onFinish?: () => void;
  _time: number = 0;

  constructor(start: any, end: any, duration = 1000, options?: MoreOption | VoidFunction) {
    this.start = start;
    this.end = end;
    this.duration = duration;
    if (typeof options === 'function') {
      this.onFinish = options;
    } else {
      const { easing, onProgress, onFinish } = options || {};
      this.easing = easing;
      this.onProgress = onProgress;
      this.onFinish = onFinish;
    }
    this._time = Date.now();
  }

  update(now: number): void {
    const progress = (now - this._time) / this.duration;

    const result: any = {};
    Object.keys(this.end).forEach(key => {
      if (!this.start.hasOwnProperty(key)) return;
      const v1 = this.start[key];
      const v2 = this.end[key];
      const val = this._update(v1, v2, progress);
      if (val !== undefined && !isNaN(val)) {
        result[key] = val;
      }
    });

    this.onProgress && this.onProgress(result, progress);

    const realProgress = Math.ceil(Number(progress.toString().slice(0, 7).replace('.', '').padEnd(6, '0')));
    if (realProgress >= 99990) {
      this.done();
    }
  }

  _update(v1: any, v2: any, progress: number): any {
    return (v2 - v1) * progress + v1;
  }

  done() {
    this.onFinish && this.onFinish();
  }
}
export default Animation;
