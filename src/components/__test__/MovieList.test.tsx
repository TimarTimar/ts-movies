import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { CircularProgress } from "@material-ui/core";
import MovieList from "../MovieList";
import MessageCard from "../MessageCard";
import MovieListItem from "../MovieListItem";
import { mockMovieListData } from "./mockMovieListData";

Enzyme.configure({ adapter: new Adapter() });

it("MovieList renders initially as expected", () => {
	const handleMovieItemTitleClick = jest.fn();
	const getMovieListData = () => [];
	const getLoading = () => false;

	const wrapper = mount(
		<MovieList
			getMovieListData={getMovieListData}
			getLoading={getLoading}
			handleMovieItemTitleClick={handleMovieItemTitleClick}
		/>
	);

	expect(wrapper.find(MessageCard).exists()).toBeTruthy();

	expect(wrapper.find(CircularProgress).exists()).toBeFalsy();
	expect(wrapper.find(MovieListItem).exists()).toBeFalsy();
});

it("MovieList renders as expected while loading", () => {
	const handleMovieItemTitleClick = jest.fn();
	const getMovieListData = () => [];
	const getLoading = () => true;

	const wrapper = mount(
		<MovieList
			getMovieListData={getMovieListData}
			getLoading={getLoading}
			handleMovieItemTitleClick={handleMovieItemTitleClick}
		/>
	);

	expect(wrapper.find(CircularProgress).exists()).toBeTruthy();

	expect(wrapper.find(MessageCard).exists()).toBeFalsy();
	expect(wrapper.find(MovieListItem).exists()).toBeFalsy();
});

it("MovieList renders all MovieListItem as expected", () => {
	const handleMovieItemTitleClick = jest.fn();
	const getMovieListData = () => mockMovieListData;
	const getLoading = () => false;

	const wrapper = mount(
		<MovieList
			getMovieListData={getMovieListData}
			getLoading={getLoading}
			handleMovieItemTitleClick={handleMovieItemTitleClick}
		/>
	);

	expect(wrapper.find(MessageCard).exists()).toBeFalsy();
	expect(wrapper.find(CircularProgress).exists()).toBeFalsy();

	expect(wrapper.find(MovieListItem)).toHaveLength(2);
});
