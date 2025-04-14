export interface YoutubeSearchResponse {
  items: YoutubeVideoItem[];
}

export interface YoutubeVideoItem {
  id:
    | {
        videoId: string;
      }
    | string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
    publishedAt: string;
    channelTitle: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string;
    commentCount?: string;
  };
}
