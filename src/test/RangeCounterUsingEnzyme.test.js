import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount } from "enzyme";

import RangeCounter from "../components/RangeCounter";

const adapter = new Adapter();
configure({ adapter });

describe("RangeCounter", () => {
  let component;
  const maxLimit = 10;
  const minLimit = 5;

  beforeEach(() => {
    component = mount(<RangeCounter min={minLimit} max={maxLimit}/>);
  });

  describe('Decrement counter', () => {
    it("decrements the counter value when decrement counter method is called", () => {
      component.setState({ counter: 7 });
      component.instance().decrementCounter();
      expect(component.state().counter).toEqual(6);
    });
  })

  describe('Increment counter', () => {
    it("increments the counter value when increment counter method is called", () => {
      component.setState({ counter: 7 });
      component.instance().incrementCounter();
      expect(component.state().counter).toEqual(8);
    });
  })

  describe('Renders components', () => {
    it("Renders the wrapper and control buttons", () => {
      const wrapper = component.find('div').at(0);
      expect(wrapper.hasClass('RangeCounter')).toEqual(true);

      const titleWrapper = wrapper.find('span.RangeCounter__title');
      expect(titleWrapper).toHaveLength(1);
      expect(titleWrapper.text()).toEqual('RangeCounter');

      const controlsWrapper = wrapper.find('div.RangeCounter__controls');
      expect(controlsWrapper).toHaveLength(1);

      const decrementButton = controlsWrapper.find('button').at(0);
      expect(decrementButton.text()).toEqual('Decrement');
      expect(decrementButton.props().disabled).toEqual(false);
      expect(decrementButton.props().onClick).toEqual(component.instance().decrementCounter);

      const incrementButton = controlsWrapper.find('button').at(1);
      expect(incrementButton.text()).toEqual('Increment');
      expect(incrementButton.props().disabled).toEqual(false);
      expect(incrementButton.props().onClick).toEqual(component.instance().incrementCounter);
    });

    it("Renders decrement button as disabled when the counter is equal to min", () => {
      component.setState({ counter: 5 });
      const decrementButton = component.find('button').at(0);
      expect(decrementButton.props().disabled).toEqual(true);
    });

    it("Renders increment button as disabled when the counter is equal to max", () => {
      component.setState({ counter: 10 });
      const incrementButton = component.find('button').at(1);
      expect(incrementButton.props().disabled).toEqual(true);
    });

    describe('Range reached alert box', () => {
      it("renders range reached alert when counter is equal to max limit", () => {
        component.setState({ counter: 10 });
        const alert = component.find(".RangeCounter__alert");
        expect(alert.text()).toEqual("Range limit reached!");
      });

      it("renders range reached alert when counter is equal to min limit", () => {
        component.setState({ counter: 5 });
        const alert = component.find(".RangeCounter__alert");
        expect(alert.text()).toEqual("Range limit reached!");
      });

      it("does not render range reached alert when counter is within min max range", () => {
        component.setState({ counter: 7 });
        const alert = component.find(".RangeCounter__alert");
        expect(alert).toHaveLength(0);
      });
    })
  
  })
});
