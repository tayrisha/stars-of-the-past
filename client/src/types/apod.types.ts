export interface ApodResponse {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
}
