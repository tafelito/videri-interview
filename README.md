# Videri ReactJS Interview Assignment

## How to use

[Clone the repo](https://github.com/tafelito/videri-interview)

Install it and run:

Using yarn

```sh
yarn
yarn start
```

Using npm

```sh
npm install
npm start
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/tafelito/videri-interview)

Run Tests

```sh
npm run test
or
yarn test
```

\*NOTE: there seems to be an issue in CodeSandbox with the `@testing-library/jest-dom` library that prevents running the tests. To run the tests locally, clone the repo instead

### Email validation

Validating an email using RegExp is a very opinionated subject. There are plenty of different solutions for different uses cases and no one will always be 100% perfect. Having said that, there are many known libraries and tools that use the most accepted ones. I used the official the one based on RFC 5322 that covers all of the valid email addresses from the test cases but also considers `email@111.222.333.44444` & `email@domain.web` as valid

### Pixabay API key

In order to load the content from the PIXABAY API, the key should be added to the `.env` file

### Sorting items by name

Since pixabay API doesn't have a sort option, the results are sorted client-side. Because it's only requesting 50 items at a time, it only sort the returned items and not the complete set. To be able to sort the the whole list, all the items must be returned, sorted and then paginated in the client. This could potentially impact the performance. So for teh demo purposes I decided to sort only the returned items for the current page

### Forms & validation

For the login I used a simple form and handle validation manually. For this demo, it works fine but for a production app, where there could be more forms to manage, a Form library like Formik could be used with schema validation using something like Yup.

### Data fetch

Content loaded from the API is fetched every time a folder or a page is changed. This might no be desired in case data does not change often. In that case, data could be saved locally or cached to prevent fetching the server constantly. Another option could be show stale data and refresh in the background.

### Progress image loading

Usually while dealing with images something like progress image loading could be implemented as an optimization

### Material-ui

I chose to use material-ui library since I'm familiarized with and it's super easy to bootstrap a new app. It's a very mature library,easy to customize and will probably suit a lot of uses cases. Having said that, it will always depend on the app requirements if it's the right choice or not.

## Final note

For the demo purposes, I tried to use as less dependencies as possible but still as functional as possible. For eg, the video player is just using the standard html video without any considerations. For a production app this will there will be other things to consider, like actions based on events, more control over the player controls, etc. A player like react-player could be used or a customized one for full control
