import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button component renders correctly", () => {
  afterEach(cleanup);

  it("with text", () => {
    render(<Button text="Button" />);
    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("Button");
    expect(button).toMatchSnapshot();
  });

  it("without text", () => {
    render(<Button />);
    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("");
    expect(button).toMatchSnapshot();
  });

  it("with disabled state", () => {
    render(<Button disabled />);
    const button = screen.getByTestId("button");
    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  it("with loader", () => {
    render(<Button isLoader />);
    const button = screen.getByTestId("button");
    const loader = screen.getByTestId("loader");
    expect(button).toContainElement(loader);
    expect(button).toMatchSnapshot();
  });

  it("with callback", () => {
    const mockCb = jest.fn();
    render(<Button onClick={mockCb} />);
    const button = screen.getByTestId("button");
    userEvent.click(button);
    expect(mockCb).toBeCalledTimes(1);
  });
});
