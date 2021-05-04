import React from "react";
import MessageCard from "../MessageCard";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Button, CardContent, TextField } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("MessageCard renders with proper props", () => {
	const wrapper = shallow(<MessageCard message="aaa" />);

	expect(wrapper.text()).toEqual("aaa");
});
