import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Box, Button, CircularProgress, Link } from "@material-ui/core";
import MovieDetail from "../MovieDetail";
import MessageCard from "../MessageCard";
import { NOT_FOUND_ERROR_CODE } from "../../apis/constants";

Enzyme.configure({ adapter: new Adapter() });

it("MovieDetails renders initially as expected", () => {
	const data = {
		title: "",
		extract: "",
		wikipediaPageUrl: "",
		imdbPageUrl: "",
	};

	const onClickMock = jest.fn();

	const wrapper = mount(
		<MovieDetail
			data={data}
			loading={false}
			handleRecommendedClick={onClickMock}
		/>
	);

	const message = wrapper.find(MessageCard);

	expect(message.exists()).toBeTruthy();
	expect(wrapper.find('[data-testid="movieDetailData"]').exists()).toBeFalsy();
	expect(wrapper.find(CircularProgress).exists()).toBeFalsy();
});

it("MovieDetails renders loading as expected", () => {
	const data = {
		title: "",
		extract: "",
		wikipediaPageUrl: "",
		imdbPageUrl: "",
	};

	const onClickMock = jest.fn();

	const wrapper = mount(
		<MovieDetail
			data={data}
			loading={true}
			handleRecommendedClick={onClickMock}
		/>
	);

	expect(wrapper.find('[data-testid="movieDetailData"]').exists()).toBeFalsy();
	expect(wrapper.find(MessageCard).exists()).toBeFalsy();

	expect(wrapper.find(CircularProgress).exists()).toBeTruthy();
});

test("MovieDetails renders as expected if it has the data", () => {
	const data = {
		title: "aaa",
		extract: "bbb",
		wikipediaPageUrl: "ccc",
		imdbPageUrl: "ddd",
	};

	const onClickMock = jest.fn();

	const wrapper = shallow(
		<MovieDetail
			data={data}
			loading={false}
			handleRecommendedClick={onClickMock}
		/>
	);

	expect(wrapper.containsMatchingElement(<h2>aaa</h2>)).toBeTruthy();
	expect(wrapper.containsMatchingElement(<p>bbb</p>)).toBeTruthy();
	expect(wrapper.find('[data-testid="wikiLink"]').text()).toEqual(
		"Wikipedia page"
	);
	expect(wrapper.find('[data-testid="wikiLink"]').prop("href")).toBe("ccc");
	expect(wrapper.find('[data-testid="imdbLink"]').text()).toEqual("IMDB page");
	expect(wrapper.find('[data-testid="imdbLink"]').prop("href")).toBe("ddd");
	expect(wrapper.find(Button).text()).toEqual("Show Recommended Movies");
});

test("MovieDetails renders as expected if it has the data except the imdbUrl", () => {
	const data = {
		title: "aaa",
		extract: "bbb",
		wikipediaPageUrl: "ccc",
		imdbPageUrl: NOT_FOUND_ERROR_CODE,
	};

	const onClickMock = jest.fn();

	const wrapper = shallow(
		<MovieDetail
			data={data}
			loading={false}
			handleRecommendedClick={onClickMock}
		/>
	);

	//Show error message instead of the imdb link
	expect(wrapper.find('[data-testid="imdbLink"]').text()).toContain(
		NOT_FOUND_ERROR_CODE
	);
	expect(wrapper.find('[data-testid="imdbLink"]').prop("href")).toBeFalsy();

	//renders everything else as expected
	expect(wrapper.containsMatchingElement(<h2>aaa</h2>)).toBeTruthy();
	expect(wrapper.containsMatchingElement(<p>bbb</p>)).toBeTruthy();
	expect(wrapper.find('[data-testid="wikiLink"]').text()).toEqual(
		"Wikipedia page"
	);
	expect(wrapper.find('[data-testid="wikiLink"]').prop("href")).toBe("ccc");
	expect(wrapper.find(Button).text()).toEqual("Show Recommended Movies");
});

test("MovieDetails renders as expected if has the imdb link but doesn't have wikipedia data", () => {
	const data = {
		title: NOT_FOUND_ERROR_CODE,
		extract: "bbb",
		wikipediaPageUrl: null,
		imdbPageUrl: "ddd",
	};

	const onClickMock = jest.fn();

	const wrapper = shallow(
		<MovieDetail
			data={data}
			loading={false}
			handleRecommendedClick={onClickMock}
		/>
	);

	//does not render wikipedia link
	expect(wrapper.find('[data-testid="wikiLink"]').exists()).toBeFalsy;

	//renders everything else
	expect(
		wrapper.containsMatchingElement(<h2>{NOT_FOUND_ERROR_CODE}</h2>)
	).toBeTruthy();
	expect(wrapper.containsMatchingElement(<p>bbb</p>)).toBeTruthy();
	expect(wrapper.find('[data-testid="imdbLink"]').text()).toEqual("IMDB page");
	expect(wrapper.find('[data-testid="imdbLink"]').prop("href")).toBe("ddd");
	expect(wrapper.find(Button).text()).toEqual("Show Recommended Movies");
});
