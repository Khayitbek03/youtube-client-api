import { createAction, props } from '@ngrx/store';
import { CustomVideoCard } from '@shared/models/custom-video.model';

export const addCustomVideo = createAction(
  '[Admin] Add Custom Video',
  props<{ video: CustomVideoCard }>()
);
export const deleteCustomVideo = createAction(
  '[Admin] Delete Custom Video',
  props<{ id: string }>()
);
