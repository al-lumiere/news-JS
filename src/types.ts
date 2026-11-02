export enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface SourcesResponse {
  status: 'ok';
  sources: Source[];
}

export interface NewsResponse {
  status: 'ok';
  totalResults: number;
  articles: Article[];
}

export type ApiOptions = Record<string, string>;

export type ApiCallback<T> = (data: T) => void;

export interface RequestParams {
  endpoint: Endpoint;
  options?: ApiOptions;
}