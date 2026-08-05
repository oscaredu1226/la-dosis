import { InjectionToken } from '@angular/core';

export interface ImageCompressionOptions {
  readonly maxWidth: number;
  readonly maxHeight: number;
  readonly maxBytes: number;
  readonly quality?: number;
  readonly minQuality?: number;
}

export interface CompressedImage {
  readonly file: File;
  readonly dataUrl: string;
  readonly originalBytes: number;
  readonly compressedBytes: number;
  readonly width: number;
  readonly height: number;
}

export interface ImageCompressor {
  compress(file: File, options: ImageCompressionOptions): Promise<CompressedImage>;
}

export const IMAGE_COMPRESSOR = new InjectionToken<ImageCompressor>('IMAGE_COMPRESSOR');
