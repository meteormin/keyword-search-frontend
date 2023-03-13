export interface Search {
  createdAt: string;
  updatedAt: string;
  id: number;
  publish: boolean;
  query: string;
  queryKey: string;
  shortUrl: string;
  description: string;
  hostId: number;
  views: number;
}
