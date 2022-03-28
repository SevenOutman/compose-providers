import { render } from "@testing-library/react"
import { test, expect, fn } from "vitest"
import { composeProviders } from "../src"

test("Compose multiple providers", () => {
  const Provider1 = fn((props) => props.children)
  const Provider2 = fn((props) => props.children)
  const provider2Props = { foo: "bar" }

  const Wrapper = composeProviders(
    [Provider1, [Provider2, provider2Props]],
    "Container",
  )
  expect(Wrapper.displayName).toBe("Container")

  render(<p>Works!</p>, {
    wrapper: Wrapper,
  })

  expect(Provider1).toHaveBeenCalled()
  expect(Provider2).toHaveBeenCalledWith(
    {
      ...provider2Props,
      children: expect.anything(),
    },
    expect.anything(),
  )
})

test.only("Render providers in correct order", () => {
  const FirstProvider = fn((props) => props.children)
  const SecondProvider = fn((props) => {
    if (props.children.type === FirstProvider) {
      throw new Error("Wrong render order!")
    }
    return props.children
  })

  const Wrapper = composeProviders([FirstProvider, SecondProvider])
  const { rerender } = render(<p>Works!</p>, {
    wrapper: Wrapper,
  })

  // This happened on second render
  rerender(<p>Works!</p>)
})
