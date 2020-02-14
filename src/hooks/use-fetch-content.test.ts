import { fakeServer, SinonFakeServer } from 'sinon';
import { renderHook } from '@testing-library/react-hooks';
import { useFetchContent } from './use-fetch-content';

// setup a fake server
// we will need to hold a reference to the server so we can tell it when/what to respond to requests (and clean it up later)
let server: SinonFakeServer;

beforeEach(() => {
  server = fakeServer.create();
});

afterEach(() => {
  server.restore();
});

describe('useFetchContent hook', () => {
  test('GETs data from the server', async () => {
    const q = 'clouds';
    const page = 1;
    const perPage = 50;
    const api_url = `${process.env.REACT_APP_PIXABAY_API_URL}`;
    const url = `${api_url}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${q}&image_type=photo&page=${page}&per_page=${perPage}&safesearch=true`;
    const expectedData = { some: 'data' }; // we define some data the server will be returning
    // setup the server
    server.respondWith('GET', url, [200, {}, JSON.stringify(expectedData)]);

    // setup our hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchContent({ q, page, perPage }),
    );

    // make sure data is still `undefined` at this point
    expect(result.current.data).toBeUndefined();

    server.respond();

    // wait until our hook finishes updating its internal states;
    await waitForNextUpdate();

    // assert the outcomes
    expect(result.current.data).toEqual(expectedData);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBeUndefined();
  });
});
