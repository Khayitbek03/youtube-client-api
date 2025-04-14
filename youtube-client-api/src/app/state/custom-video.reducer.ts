import { createReducer, on } from '@ngrx/store';
import { CustomVideoCard } from '@shared/models/custom-video.model';
import { addCustomVideo, deleteCustomVideo } from './custom-video.actions';

export const initialCustomVideos: CustomVideoCard[] = [];

export const customVideoReducer = createReducer(
  initialCustomVideos,
  on(addCustomVideo, (state, { video }) => [...state, video]),
  on(deleteCustomVideo, (state, { id }) =>
    state.filter((video) => video.id !== id)
  )
);
