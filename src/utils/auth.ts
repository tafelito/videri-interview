export const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    // fake async
    return new Promise(resolve => {
      setTimeout(() => {
        fakeAuth.isAuthenticated = true;
        resolve('Logged in!');
      }, 100);
    });
  },
  signout() {
    return new Promise(resolve => {
      setTimeout(() => {
        fakeAuth.isAuthenticated = false;
        resolve('Logged out!');
      }, 100);
    });
  },
};
