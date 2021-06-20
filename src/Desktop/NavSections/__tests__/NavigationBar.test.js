import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import ReactDOM from "react-dom";
import store from "../../../store";

// const setup = (props = {}) => {
//   const component = shallow(<NavigationBar {...props} />);
//   return component;
// };
afterEach(cleanup);
describe("Navigation bar", () => {
  //   let component;
  //   beforeEach(() => {
  //     component = setup();
  //   });
  //   it("Should render without failing", () => {
  //     const wrapper = component.find(".desktop__navbar");
  //     expect(wrapper).toBeInTheDocument();
  //   });

  it("renders Navbar correctly", () => {
    const nav = document.createElement("div");
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <NavigationBar />

            <Switch></Switch>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
      nav
    );
  });
});
