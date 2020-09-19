import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { toBeVisible } from "@testing-library/jest-dom/matchers";

import RangeCounter from "../components/RangeCounter";

expect.extend({ toBeVisible });

describe("RangeCounter", () => {

  it("shows the counter value as mean of min and max values", () => {
    const { getByTestId } = render(<RangeCounter min={0} max={2} />);
    expect(getByTestId("counter-value").innerHTML).toEqual("1");
  });


  describe('Incrementing the counter', () => {

    it("when incrementing counter is allowed, updates the counter value", async () => {
      const { getByTestId, getByText } = render(<RangeCounter min={2} max={6} />);
      const incrementButton = getByText("Increment");
      fireEvent.click(incrementButton);
      expect(getByTestId("counter-value").innerHTML).toEqual("5");
    });

    it("shows range reached alert when reached limit by clicking increment button", () => {
      const { getByText } = render(<RangeCounter min={0} max={1} />);
      const incrementButton = getByText("Increment");
      fireEvent.click(incrementButton);
      expect(getByText("Range limit reached!")).toBeVisible();
    });
  
    it("when incrementing counter is not allowed, does not update the counter value", async () => {
        const { getByTestId, getByText } = render(
          <RangeCounter min={0} max={0} />
        );
        const incrementButton = getByText("Increment");
        fireEvent.click(incrementButton);
        expect(getByTestId("counter-value").innerHTML).toEqual("0");
      });
  
  })
  describe('Decrementing the counter', () => {

    it("when decrementing counter is allowed, updates the counter value", async () => {
      const { getByTestId, getByText } = render(<RangeCounter min={2} max={6} />);
      const decrementButton = getByText("Decrement");
      fireEvent.click(decrementButton);
      expect(getByTestId("counter-value").innerHTML).toEqual("3");
    });

    it("when decrementing counter is not allowed, does not update the counter value", async () => {
        const { getByTestId, getByText } = render(<RangeCounter min={0} max={0} />);
        const incrementButton = getByText("Decrement");
        fireEvent.click(incrementButton);
        expect(getByTestId("counter-value").innerHTML).toEqual("0");
      });
  
    it("shows range reached alert when reached limit by clicking decrement button", () => {
      const { getByText } = render(<RangeCounter min={0} max={2} />);
      const decrementButton = getByText("Decrement");
      fireEvent.click(decrementButton);
      expect(getByText("Range limit reached!")).toBeVisible();
    });
  
  })
});
