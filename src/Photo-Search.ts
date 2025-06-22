import axios from 'axios';

import { FetchGalleryPhotosResponse } from './types/photo';

const ACCESS_KEY: string = 'NCTnBGaDTzoI8A6NEte0cPfaNH2PgWKVTbaXMOBy4jc';

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;
axios.defaults.headers.common['Accept-Version'] = 'v1';

axios.defaults.params = {
  per_page: 10,
  orientation: 'landscape',
};

const fetchGalleryPhotos = async (
  query: string,
  page: number
): Promise<FetchGalleryPhotosResponse> => {
  const response = await axios.get<FetchGalleryPhotosResponse>(
    '/search/photos',
    {
      params: {
        query,
        page,
      },
    }
  );
  return response.data;
};

export default fetchGalleryPhotos;
