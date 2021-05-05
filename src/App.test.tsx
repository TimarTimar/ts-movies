import React from "react";
import App from "./App";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import MovieListItem from "./components/MovieListItem";
import MessageCard from "./components/MessageCard";
import { Button } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("App renders as expected", () => {
	const wrapper = mount(<App />);

	expect(wrapper.find(SearchBar).exists()).toBeTruthy();
	expect(wrapper.find(Button).prop("disabled")).toBeTruthy();
	expect(wrapper.find(MovieList).exists()).toBeTruthy();
	expect(wrapper.find(MovieListItem).exists()).toBeFalsy();
	expect(wrapper.find(MovieDetail).exists()).toBeTruthy();
	expect(wrapper.find(MessageCard).exists()).toBeTruthy();
});
