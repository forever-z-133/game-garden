/**
 * 素材加载器
 */
export interface SourcesConfig {
  images: ImageSourceConfig[];
  audios?: any[];
}
export interface ImageSourceConfig {
  id: 'background' | 'puzzle-source';
  src: string;
  desc?: string;
}
export interface LoadedImageData extends ImageSourceConfig {
  width: number;
  height: number;
}
