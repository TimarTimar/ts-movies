import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import SearchBar from "./components/SearchBar";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Button, TextField } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("App renders without crashing", () => {
	shallow(<App />);
});
