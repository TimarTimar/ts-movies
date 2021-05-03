import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { getWikipediaMovieData, getImdbPageUrl } from "./apis/restMovieDetails";
import { GET_SEARCHED_MOVIES, GET_RELATED_MOVIES } from "./apis/graphqlMovies";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

export default function App() {
	const [searchFieldValue, setSearchFieldValue] = useState("");
	const [selectedMovie, setSelectedMovie] = useState<[] | string[]>([]);
	const [selectedMovieLoading, setSelectedMovieLoading] = useState(false);
	const [dualMovieListState, setDualMovieListState] = useState<
		"searched" | "recommended"
	>("searched");
	const [movieDetails, setMovieDetails] = useState({
		title: "",
		extract: "",
		wikipediaPageUrl: "",
		imdbPageUrl: "",
	});
	//Get Wikipedia data for selectedMovie
	useEffect(() => {
		const mainMovieDetail = async () => {
			if (selectedMovie.length < 2) {
				return;
			} else {
				setSelectedMovieLoading(true);
				const response = await getWikipediaMovieData(
					selectedMovie[1],
					selectedMovie[2]
				);
				const imdbPageUrl = await getImdbPageUrl(selectedMovie[0]);
				setMovieDetails({ ...response, imdbPageUrl });
				setSelectedMovieLoading(false);
				return;
			}
		};
		mainMovieDetail();
	}, [selectedMovie]);

	//searchedMovies LazyQuery
	const [
		getSearchedMovies,
		{ loading: searchedLoading, data: searchedMovies, error: getSearchedError },
	] = useLazyQuery(GET_SEARCHED_MOVIES);

	//relatedMovies LazyQuery
	const [
		getRelatedMovies,
		{ loading: relatedLoading, data: relatedMovies, error: getRelatedError },
	] = useLazyQuery(GET_RELATED_MOVIES);

	//MovieDetail component onClick
	const handleRecommendedClick = () => {
		setDualMovieListState("recommended");
		getRelatedMovies({ variables: { id: selectedMovie[0] } });
	};

	//MovieList component helper function to render the right data
	const calculateMovieListData = () => {
		return dualMovieListState === "searched"
			? searchedMovies?.searchMovies
			: relatedMovies?.movie?.similar;
	};

	//MovieList component helper function to render the right loading state
	const calculateMovieListLoading = () => {
		return dualMovieListState === "searched" ? searchedLoading : relatedLoading;
	};

	//MovieListItem component onClick
	const handleMovieItemTitleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setSelectedMovie(e.currentTarget?.id ? e.currentTarget.id.split(",") : []);
	};

	//SearchBar component onChange
	const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchFieldValue(e.target.value);
	};
	//SearchBar component onClick
	const handleSearchButtonClick = () => {
		if (!searchFieldValue.trim()) {
			return;
		}
		setDualMovieListState("searched");
		getSearchedMovies({ variables: { query: searchFieldValue } });
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<SearchBar
					handleSearchFieldChange={handleSearchFieldChange}
					handleSearchButtonClick={handleSearchButtonClick}
				/>
			</Grid>
			{getRelatedError || getSearchedError ? (
				<Grid item xs={12}>
					Some error occured while we tried to show you movies, please contact
					support if you think this is a bug.
				</Grid>
			) : null}
			<Grid item xs={7}>
				<MovieList
					getMovieListData={calculateMovieListData}
					handleMovieItemTitleClick={handleMovieItemTitleClick}
					getLoading={calculateMovieListLoading}
				/>
			</Grid>
			<Grid item xs={5}>
				<MovieDetail
					data={movieDetails}
					handleRecommendedClick={handleRecommendedClick}
					loading={selectedMovieLoading}
				/>
			</Grid>
		</Grid>
	);
}
