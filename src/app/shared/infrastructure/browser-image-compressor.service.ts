import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import {
  CompressedImage,
  ImageCompressionOptions,
  ImageCompressor,
} from '../application/image-compressor';

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const OUTPUT_TYPE = 'image/webp';

@Injectable()
export class BrowserImageCompressorService implements ImageCompressor {
  private readonly document = inject(DOCUMENT);

  async compress(file: File, options: ImageCompressionOptions): Promise<CompressedImage> {
    this.validateFile(file);

    const image = await this.loadImage(file);
    const initialSize = this.fitWithin(
      image.naturalWidth,
      image.naturalHeight,
      options.maxWidth,
      options.maxHeight,
    );
    const quality = options.quality ?? 0.82;
    const minQuality = options.minQuality ?? 0.58;
    let width = initialSize.width;
    let height = initialSize.height;
    let smallestBlob: Blob | undefined;
    let smallestWidth = width;
    let smallestHeight = height;

    for (let resizeAttempt = 0; resizeAttempt < 8; resizeAttempt += 1) {
      const canvas = this.drawImage(image, width, height);

      for (let currentQuality = quality; currentQuality >= minQuality; currentQuality -= 0.08) {
        const blob = await this.canvasToBlob(canvas, currentQuality);

        if (!smallestBlob || blob.size < smallestBlob.size) {
          smallestBlob = blob;
          smallestWidth = width;
          smallestHeight = height;
        }

        if (blob.size <= options.maxBytes) {
          if (
            width === image.naturalWidth &&
            height === image.naturalHeight &&
            file.size <= blob.size &&
            file.size <= options.maxBytes
          ) {
            return this.createOriginalResult(file, width, height);
          }

          return this.createResult(file, blob, width, height);
        }
      }

      width = Math.max(320, Math.round(width * 0.84));
      height = Math.max(320, Math.round(height * 0.84));
    }

    if (!smallestBlob) {
      throw new Error('No se pudo procesar la imagen seleccionada.');
    }

    return this.createResult(file, smallestBlob, smallestWidth, smallestHeight);
  }

  private validateFile(file: File): void {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      throw new Error('Usa una imagen JPG, PNG o WebP.');
    }

    if (file.size > MAX_INPUT_BYTES) {
      throw new Error('La imagen original no puede superar los 25 MB.');
    }
  }

  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = this.document.createElement('img');
      const objectUrl = URL.createObjectURL(file);

      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('No se pudo leer la imagen seleccionada.'));
      };
      image.src = objectUrl;
    });
  }

  private fitWithin(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number,
  ): { width: number; height: number } {
    const scale = Math.min(1, maxWidth / width, maxHeight / height);

    return {
      width: Math.max(1, Math.round(width * scale)),
      height: Math.max(1, Math.round(height * scale)),
    };
  }

  private drawImage(image: HTMLImageElement, width: number, height: number): HTMLCanvasElement {
    const canvas = this.document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Tu navegador no permite optimizar imagenes.');
    }

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, 0, 0, width, height);

    return canvas;
  }

  private canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
            return;
          }

          reject(new Error('No se pudo convertir la imagen a WebP.'));
        },
        OUTPUT_TYPE,
        quality,
      );
    });
  }

  private async createResult(
    originalFile: File,
    blob: Blob,
    width: number,
    height: number,
  ): Promise<CompressedImage> {
    const file = new File([blob], this.toWebpName(originalFile.name), {
      type: OUTPUT_TYPE,
      lastModified: Date.now(),
    });

    return {
      file,
      dataUrl: await this.readAsDataUrl(file),
      originalBytes: originalFile.size,
      compressedBytes: file.size,
      width,
      height,
    };
  }

  private async createOriginalResult(
    file: File,
    width: number,
    height: number,
  ): Promise<CompressedImage> {
    return {
      file,
      dataUrl: await this.readAsDataUrl(file),
      originalBytes: file.size,
      compressedBytes: file.size,
      width,
      height,
    };
  }

  private toWebpName(fileName: string): string {
    const baseName = fileName.replace(/\.[^.]+$/, '') || 'imagen';
    return `${baseName}.webp`;
  }

  private readAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
