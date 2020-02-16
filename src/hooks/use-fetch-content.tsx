import useSWR from 'swr';
import fetch from 'utils/fetch';

const REACT_APP_PIXABAY_API_URL = process.env.REACT_APP_PIXABAY_API_URL;
const REACT_APP_PIXABAY_API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

export function useFetchContent({
  q = '',
  page,
  perPage = 48,
  type = '',
}: {
  q?: string;
  page: number;
  perPage?: number;
  type?: string;
}) {
  // pixabay API url (if type = video it will search for video content)
  // using they key from .env doesn't hide the key from the source
  // if the key should not be public, then this has to be moved somewhere else (server)
  const api_url = `${REACT_APP_PIXABAY_API_URL}${type}?key=${REACT_APP_PIXABAY_API_KEY}`;
  const { data, error } = useSWR(
    `${api_url}&q=${q}&image_type=photo&page=${page}&per_page=${perPage}&safesearch=true`,
    fetch,
  );

  return {
    data,
    error,
    loading: !data,
  };
}
