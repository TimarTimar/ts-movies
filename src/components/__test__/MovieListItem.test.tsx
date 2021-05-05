import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Button } from "@material-ui/core";
import MovieListItem from "../MovieListItem";
import { mockMovieListItemData } from "./mockMovieListData";

Enzyme.configure({ adapter: new Adapter() });

it("MovieListItem renders initially as expected", () => {
	const mockOnClick = jest.fn();

	const wrapper = shallow(
		<MovieListItem
			id={mockMovieListItemData.id}
			name={mockMovieListItemData.name}
			score={mockMovieListItemData.score}
			genres={mockMovieListItemData.genres}
			releaseDate={mockMovieListItemData.releaseDate}
			handleMovieItemTitleClick={mockOnClick}
		/>
	);

	expect(wrapper.find(Button).prop("id")).toBe(
		`${mockMovieListItemData.id},${mockMovieListItemData.name},2019`
	);
	expect(wrapper.find(Button).prop("title")).toBe(
		`${mockMovieListItemData.name} - (2019)`
	);

	expect(
		wrapper.find('[data-testid="genresContainer"]').children().slice(0, 2)
			.length
	).toBe(2);

	const movieTitleButton = wrapper.find(Button);
	movieTitleButton.simulate("click");
	expect(mockOnClick).toHaveBeenCalled();

	expect(
		wrapper.containsMatchingElement(<p>Score: {mockMovieListItemData.score}</p>)
	).toBeTruthy();
});
