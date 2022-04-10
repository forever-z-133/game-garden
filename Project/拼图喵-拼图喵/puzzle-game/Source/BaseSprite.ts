/**
 * 素材
 */
class BaseSprite {
  source: any = null;
  set(key: string, value: any) {
    this[key] = value;
  }
}
export default BaseSprite;
