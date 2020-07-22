import { Injectable } from '@angular/core';
import { BACKGROUND_IMAGE_METADATA } from '../app/api/images-api';

@Injectable()
export class BackgroundImageService {
  getBackgroundImages() {
      return BACKGROUND_IMAGE_METADATA;
  }
}
