import { fakeAuth } from './auth';

describe('auth', () => {
  test('should authenticate, then signout', async () => {
    expect(fakeAuth.isAuthenticated).toBe(false);
    await fakeAuth.authenticate();
    expect(fakeAuth.isAuthenticated).toBe(true);
    await fakeAuth.signout();
    expect(fakeAuth.isAuthenticated).toBe(false);
  });
});
