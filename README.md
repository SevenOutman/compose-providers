# compose-providers

Compose your React provider components to avoid boilerplates.

[![npm version](https://badgen.net/npm/v/compose-providers)](https://npm.im/compose-providers) [![npm downloads](https://badgen.net/npm/dm/compose-providers)](https://npm.im/compose-providers)

## Install

```bash
npm i compose-providers
```

## Usage

Assume you're using serveral libraries that requires using their provider components like:

- react-error-boundary
- react-intl
- react-query
- react-router

and you have to nest them around your app to get everything work

```jsx
render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>{/** your app */}</BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
)
```

With `compose-providers` you can compose those providers into one component so that you get rid of all those boilerplates.

```jsx
import { composeProviders } from "compose-providers"

const AppContainer = composeProviders([
  ErrorBoundary,
  // You won't be unfamiliar if you have configured tools like babel/eslint
  [
    QueryClientProvider,
    {
      client: queryClient,
    },
  ],
  [
    IntlProvider,
    {
      locale,
      messages,
    },
  ],
  BrowserRouter,
])

render(<AppContainer>{/** your app */}</AppContainer>)
```

This is especiall useful when you are writing tests and need to combine different providers as wrappers to get your component work:

```jsx
// RouteComponent.test.tsx
import { render } from "@testing-library/react"

// const wrapper = (props) => (
//   <QueryClientProvider>
//     <BrowserRouter>{props.children}</BrowserRouter>
//   </QueryClientProvider>
// )

const wrapper = composeProviders([QueryClientProvider, BrowserRouter])

render(<RouteComponent />, {
  wrapper,
})

// IntlComponent.test.tsx
import { render } from "@testing-library/react"

// const wrapper = (props) => (
//   <QueryClientProvider>
//     <IntlProvider>{props.children}</IntlProvider>
//   </QueryClientProvider>
// )

const wrapper = composeProviders([QueryClientProvider, IntlProvider])

render(<IntlComponent />, {
  wrapper,
})
```

## License

MIT &copy; [SevenOutman](https://github.com/SevenOutman)
