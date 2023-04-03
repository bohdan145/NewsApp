import {Article} from '@app/types';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';

interface Params {
  [key: string]: any;
}

export interface NewsResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: Article[];
  };
}

interface SingeNewsResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    content: Article;
  };
}

const fetcher = axios.create({
  baseURL: API_URL,
  params: {
    'api-key': API_TOKEN,
  },
});

export const newsApi = {
  getNews: async (params: Params) => {
    const res = await fetcher.get<NewsResponse>('search', {
      params: {
        'page-size': 20,
        'show-fields': 'thumbnail',
        ...params,
      },
    });
    return res.data.response;
  },
  getNewsById: async (id = '') => {
    const res = await fetcher.get<SingeNewsResponse>(id, {
      params: {
        'show-fields': 'all',
      },
    });
    return res.data.response;
  },
};
