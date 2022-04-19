import * as easing from '../utils/easingUtil';

/**
 * 动画类
 */
type MoreOption = {
  easing?: string,
  onProgress?: (result: any, progress: number) => void,
  onFinish?: () => void,
};
class Animation {
  start: any = {};
  end: any = {};
  duration: number;
  easing?: string;
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
    const t = now - this._time;
    const d = this.duration;
    const progress = t / d;

    const result: any = {};
    Object.keys(this.end).forEach(key => {
      if (!this.start.hasOwnProperty(key)) return;
      const v1 = this.start[key];
      const v2 = this.end[key];
      const val = this._update(t, v1, v2 - v1, d);
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

  /**
   * 刷新数据
   * @param t 已经历的时间
   * @param b 起始量
   * @param c 目标运动量
   * @param d 完成动画的总时间
   * @returns 该事件对应的数据
   */
  _update(t: number, b: any, c: any, d: number): any {
    if (this.easing && (this.easing in easing)) {
      return (easing as any)[this.easing](t, b, c, d);
    }
    return easing.easeLinear(t, b, c, d);
  }

  done() {
    this.onFinish && this.onFinish();
  }
}
export default Animation;
