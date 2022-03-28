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
