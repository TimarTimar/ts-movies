//MovieList can get data and loading props from GET_SEARCHED_MOVIES, or GET_RELATED_MOVIES lazy queries. App will calculate it based on its dualMovieListState.
import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import MovieListItem, { MovieListItemProps } from "./MovieListItem";
import MessageCard from "./MessageCard";

interface MovieListProps {
	getMovieListData: () => Omit<
		MovieListItemProps,
		"handleMovieItemTitleClick"
	>[];
	handleMovieItemTitleClick: (e: React.MouseEvent) => void;
	getLoading: () => boolean;
}

export default function MovieList({
	getMovieListData,
	handleMovieItemTitleClick,
	getLoading,
}: MovieListProps) {
	const movieList = getMovieListData();
	const loading = getLoading();
	if (!movieList && !loading) {
		return <MessageCard message={"1. Let's type something and click search"} />;
	} else if (loading) {
		return <CircularProgress />;
	} else if (movieList && movieList.length === 0) {
		return (
			<MessageCard
				message={"Could not found anything please try other words"}
			/>
		);
	}
	return (
		<Box p={2} border={1} overflow="auto" maxHeight="75vh">
			{movieList.map((item) => (
				<MovieListItem
					id={item.id}
					key={item.id}
					name={item.name}
					score={item.score}
					genres={item.genres}
					releaseDate={item.releaseDate}
					handleMovieItemTitleClick={handleMovieItemTitleClick}
				/>
			))}
		</Box>
	);
}
