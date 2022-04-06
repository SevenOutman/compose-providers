import { createElement, Fragment } from "react"

type ComponentAndProps<P> = [React.ComponentType<P>, P]
type ProviderConfig<P> = React.ComponentType<P> | ComponentAndProps<P>

interface ComposeProviders {
  <P1>(providers: [ProviderConfig<P1>], displayName?: string): React.FC
  <P1, P2>(
    providers: [ProviderConfig<P1>, ProviderConfig<P2>],
    displayName?: string,
  ): React.FC
  <P1, P2, P3>(
    providers: [ProviderConfig<P1>, ProviderConfig<P2>, ProviderConfig<P3>],
    displayName?: string,
  ): React.FC
  <P1, P2, P3, P4>(
    providers: [
      ProviderConfig<P1>,
      ProviderConfig<P2>,
      ProviderConfig<P3>,
      ProviderConfig<P4>,
    ],
    displayName?: string,
  ): React.FC
  <P1, P2, P3, P4, P5>(
    providers: [
      ProviderConfig<P1>,
      ProviderConfig<P2>,
      ProviderConfig<P3>,
      ProviderConfig<P4>,
      ProviderConfig<P5>,
    ],
    displayName?: string,
  ): React.FC
  <P1, P2, P3, P4, P5, P6>(
    providers: [
      ProviderConfig<P1>,
      ProviderConfig<P2>,
      ProviderConfig<P3>,
      ProviderConfig<P4>,
      ProviderConfig<P5>,
      ProviderConfig<P6>,
    ],
    displayName?: string,
  ): React.FC
  <P1, P2, P3, P4, P5, P6, P7>(
    providers: [
      ProviderConfig<P1>,
      ProviderConfig<P2>,
      ProviderConfig<P3>,
      ProviderConfig<P4>,
      ProviderConfig<P5>,
      ProviderConfig<P6>,
      ProviderConfig<P7>,
    ],
    displayName?: string,
  ): React.FC
  <P1, P2, P3, P4, P5, P6, P7, P8>(
    providers: [
      ProviderConfig<P1>,
      ProviderConfig<P2>,
      ProviderConfig<P3>,
      ProviderConfig<P4>,
      ProviderConfig<P5>,
      ProviderConfig<P6>,
      ProviderConfig<P7>,
      ProviderConfig<P8>,
    ],
    displayName?: string,
  ): React.FC
  <P1, P2, P3, P4, P5, P6, P7, P8, P9>(
    providers: [
      ProviderConfig<P1>,
      ProviderConfig<P2>,
      ProviderConfig<P3>,
      ProviderConfig<P4>,
      ProviderConfig<P5>,
      ProviderConfig<P6>,
      ProviderConfig<P7>,
      ProviderConfig<P8>,
      ProviderConfig<P9>,
    ],
    displayName?: string,
  ): React.FC
  <P1, P2, P3, P4, P5, P6, P7, P8, P9, P10>(
    providers: [
      ProviderConfig<P1>,
      ProviderConfig<P2>,
      ProviderConfig<P3>,
      ProviderConfig<P4>,
      ProviderConfig<P5>,
      ProviderConfig<P6>,
      ProviderConfig<P7>,
      ProviderConfig<P8>,
      ProviderConfig<P9>,
      ProviderConfig<P10>,
    ],
    displayName?: string,
  ): React.FC
}

export const composeProviders: ComposeProviders = (
  providers: Array<React.ComponentType | [React.ComponentType, any]>,
  displayName?: string,
) => {
  // Pass providers as outer-first
  // but reduce them as inner-first
  const innerFirstProviders = providers.slice().reverse()
  function Composed(props: React.PropsWithChildren<{}>) {
    return innerFirstProviders.reduce<React.ReactElement>(
      (children, provider) => {
        if (Array.isArray(provider)) {
          const [Provider, providerProps] = provider

          return createElement(Provider, providerProps, children)
        }

        const Provider = provider

        return createElement(Provider, null, children)
      },
      createElement(Fragment, null, props.children),
    )
  }
  Composed.displayName = displayName

  return Composed
}
