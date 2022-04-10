/**
 * 素材加载器
 */
class SourceLoader {
  config: SourcesConfig = {};
}
export default SourceLoader;

export interface SourcesConfig {
  images?: ImageSourceConfig[];
  audios?: any[];
}
export interface ImageSourceConfig {
  src: string;
  desc?: string;
}
