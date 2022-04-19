type EasingType = (t: number, b: number, c: number, d: number) => number;

export const easeLinear: EasingType = (t, b, c, d) => {
  return c * t / d + b;
}

export const easeInQuad : EasingType = (t, b, c, d) => {
  return c * (t /= d) * t + b;
}

export const easeOutQuad : EasingType = (t, b, c, d) => {
  return -c * (t /= d) * (t - 2) + b;
}

export const easeInOutQuad : EasingType = (t, b, c, d) => {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

export const easeInExpo : EasingType = (t, b, c, d) => {
  return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

export const easeOutExpo : EasingType = (t, b, c, d) => {
  return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

export const easeInOutExpo : EasingType = (t, b, c, d) => {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
