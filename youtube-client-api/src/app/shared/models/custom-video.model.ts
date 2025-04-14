export interface CustomVideoCard {
  id: string; // generated from timestamp or UUID
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl: string;
  createdAt: string;
}
