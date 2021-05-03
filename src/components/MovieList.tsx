//MovieList can get data and loading props from GET_SEARCHED_MOVIES, or GET_RELATED_MOVIES lazy queries. App will calculate it based on its dualMovieListState.
import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import MovieListItem from "./MovieListItem";
import MessageCard from "./MessageCard";

interface MovieListProps {
	getMovieListData: () => {
		id: string;
		name: string;
		genres: { id: string; name: string }[];
		releaseDate: string | undefined;
		score: number;
	}[];
	handleMovieItemTitleClick: (e: React.MouseEvent) => void;
	getLoading: () => boolean;
}

//lazyquery onMount-> useEffect->Then with Buttons

export default function MovieList({
	getMovieListData,
	handleMovieItemTitleClick,
	getLoading,
}: MovieListProps) {
	const myList = getMovieListData();
	const loading = getLoading();
	if (!myList && !loading) {
		/*initial state*/
		return <MessageCard message={"1. Let's type something and click search"} />;
	}

	if (loading) {
		return <CircularProgress />;
	} else if (!myList || myList.length === 0) {
		return (
			<MessageCard
				message={"Could not found anything please try other words"}
			/>
		);
	} else if (myList && myList.length > 1) {
		return (
			<Box p={2} border={1} overflow="auto" maxHeight="80vh">
				{myList.map((item) => (
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
	return null;
}
