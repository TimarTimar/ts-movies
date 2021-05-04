import React from "react";
import SearchBar from "../SearchBar";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Button, TextField } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("Searchbar renders with proper props", () => {
	const onChangeMock = jest.fn();
	const onSumbitMock = jest.fn();

	const wrapper = shallow(
		<SearchBar
			handleSearchFieldChange={onChangeMock}
			handleSearchButtonClick={onSumbitMock}
			isSearchBarButtonDisabled={() => true}
		/>
	);

	//has button

	const myButton = wrapper.find(Button);
	expect(myButton.prop("onClick")).toBeTruthy();
	expect(myButton.prop("disabled")).toBeTruthy();

	//has TextField
	const myInput = wrapper.find(TextField);
	expect(myInput.prop("onChange")).toBeTruthy();
	expect(myInput.prop("label")).toBe("Search for Movies");
});
