import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  addCustomVideo,
  deleteCustomVideo,
} from '@app/state/custom-video.actions';
import { selectCustomVideos } from '@app/state/custom-video.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomVideoCard } from '@shared/models/custom-video.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  fb = inject(FormBuilder);
  store = inject(Store);
  constructor(private router: Router) {}

  today = new Date().toISOString().split('T')[0];

  videoForm = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    description: ['', [Validators.maxLength(300)]],
    imageUrl: ['', [Validators.required]],
    videoUrl: ['', [Validators.required]],
    createdAt: ['', [Validators.required]],
  });

  customVideos = toSignal(this.store.select(selectCustomVideos));

  submit(): void {
    if (this.videoForm.invalid) return;

    const form = this.videoForm.value;

    const newVideo: CustomVideoCard = {
      id: Date.now().toString(),
      title: form.title!,
      description: form.description || '',
      imageUrl: form.imageUrl!,
      videoUrl: form.videoUrl!,
      createdAt: form.createdAt!,
    };

    this.store.dispatch(addCustomVideo({ video: newVideo }));
    this.videoForm.reset();
  }
  delete(id: string): void {
    this.store.dispatch(deleteCustomVideo({ id }));
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
