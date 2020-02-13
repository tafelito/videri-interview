import { useState, useEffect, useReducer } from 'react';

interface State {
  loading: boolean;
  data?: any;
  error?: string;
}

function reducer(state: State, newState: Partial<State>): State {
  return { ...state, ...newState };
}

const initialState = {
  loading: true,
  data: undefined,
  error: undefined,
};

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
  const [prevType, setPrevType] = useState(type);

  const [state, setState] = useReducer(reducer, initialState);

  let isLoading = state.loading;

  //   handle stale data in case of props change
  if (type !== prevType) {
    // Type changed since last render. Update state.
    setState(initialState);
    setPrevType(type);
    isLoading = true;
  }

  useEffect(() => {
    // pixabay API url (if type = video it will search for video content)
    const api_url = `${process.env.REACT_APP_PIXABAY_API_URL}${type}`;
    // using they key from .env doesn't hide the key from the source
    // if the key should not be public, then this has to be moved somewhere else (server)
    fetch(
      `${api_url}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${q}&image_type=photo&page=${page}&per_page=${perPage}&safesearch=true`,
    )
      .then(async response => {
        if (response.status === 200) {
          const res = await response.json();
          setState({
            data: res,
            loading: false,
          });
        } else {
          // The Promise returned from fetch() won't reject on HTTP error status even if the response is an HTTP 404 or 500.
          // Instead, it will resolve normally, and it will only reject on network failure or if anything prevented the request from completing.
          // https://github.com/github/fetch#caveats
          setState({
            data: undefined,
            error: `Error fetching content: ${response.statusText}`,
            loading: false,
          });
        }
      })
      .catch(error => {
        setState({
          data: undefined,
          error: `Error fetching content: ${error.message}`,
          loading: false,
        });
      });
  }, [type, q, page, perPage]);

  return {
    ...state,
    loading: isLoading,
  };
}
