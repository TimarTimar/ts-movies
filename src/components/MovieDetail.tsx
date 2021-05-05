//Show MovieDetails from Wikipedia after user clicked one of MovieListItem's title
import React from "react";
import {
	Box,
	Button,
	CircularProgress,
	Link,
	List,
	ListItem,
} from "@material-ui/core";
import MessageCard from "./MessageCard";
import { NOT_FOUND_ERROR_CODE } from "../apis/constants";

export interface MovieDetailProps {
	data: {
		title: string;
		extract: string;
		wikipediaPageUrl: string | null;
		imdbPageUrl: string;
	};
	handleRecommendedClick: () => void;
	loading: boolean;
}

export default function MovieDetail({
	data: { title, extract, wikipediaPageUrl, imdbPageUrl },
	handleRecommendedClick,
	loading,
}: MovieDetailProps) {
	// inital state when we just loaded the app
	if (!title && !loading) {
		return (
			<MessageCard
				message={"2. Click the title from one of the search results"}
			/>
		);
	}
	//start fetching data from wikipedia
	if (loading) {
		return <CircularProgress />;
	}

	//we got the real data or the dummy could not found data from getWikipediaMovieData
	return (
		<Box
			p={2}
			border={1}
			overflow="auto"
			maxHeight="75vh"
			data-testid="movieDetailData"
		>
			<h2>{title}</h2>
			<p>{extract}</p>
			<List>
				{wikipediaPageUrl && (
					<ListItem key="1">
						<Link
							href={wikipediaPageUrl}
							target="_blank"
							rel="noreferrer"
							data-testid="wikiLink"
						>
							Wikipedia page
						</Link>
					</ListItem>
				)}
				<ListItem key="2">
					{imdbPageUrl.includes(NOT_FOUND_ERROR_CODE) ? (
						<p data-testid="imdbLink">{imdbPageUrl}</p>
					) : (
						<Link
							href={imdbPageUrl}
							target="_blank"
							rel="noreferrer"
							data-testid="imdbLink"
						>
							IMDB page
						</Link>
					)}
				</ListItem>
			</List>
			<Button variant="outlined" fullWidth onClick={handleRecommendedClick}>
				Show Recommended Movies
			</Button>
		</Box>
	);
}
