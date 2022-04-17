import Animation from "./Animation";

/**
 * 动画控制类
 */
class AnimationControl {
  list: Animation[] = [];

  add(animation: Animation) {
    const _onFinish = animation.onFinish;
    animation.onFinish = () => {
      _onFinish && _onFinish.call(animation);
      this.done(animation);
    }
    this.list.push(animation);
  }

  remove(animation: Animation) {
    const index = this.list.indexOf(animation);
    if (index < 0) return;
    this.list.splice(index, 1);
  }

  done(animation: Animation) {
    this.remove(animation);
  }
}
export default AnimationControl;
