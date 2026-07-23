export interface ContentBase {
  id: string;
  title: string;
  imageUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Article extends ContentBase {
  summary: string;
  content: string;
  citations: string[];
}

export interface Service extends ContentBase {
  description: string;
  icon: string | null;
}

export interface Video extends ContentBase {
  youtubeId: string;
}
