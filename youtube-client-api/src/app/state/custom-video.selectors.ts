import { createFeatureSelector } from '@ngrx/store';
import { CustomVideoCard } from '@shared/models/custom-video.model';

export const selectCustomVideos =
  createFeatureSelector<CustomVideoCard[]>('customVideos');
