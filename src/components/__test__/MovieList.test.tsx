import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { CircularProgress } from "@material-ui/core";
import MovieList from "../MovieList";
import MessageCard from "../MessageCard";
import MovieListItem from "../MovieListItem";

Enzyme.configure({ adapter: new Adapter() });

let mockMovieListData = [
	{
		id: "11",
		name: "Star Wars",
		genres: [
			{
				id: "12",
				name: "Adventure",
			},
			{
				id: "28",
				name: "Action",
			},
			{
				id: "878",
				name: "Science Fiction",
			},
		],
		score: 8.2,
		releaseDate: "1977-05-25T00:00:00.000Z",
	},
	{
		id: "181812",
		name: "Star Wars: The Rise of Skywalker",
		genres: [
			{
				id: "28",
				name: "Action",
			},
			{
				id: "12",
				name: "Adventure",
			},
			{
				id: "878",
				name: "Science Fiction",
			},
		],
		score: 6.5,
		releaseDate: "2019-12-18T00:00:00.000Z",
	},
];

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
