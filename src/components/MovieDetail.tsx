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

export interface MovieDetailProps {
	data: {
		title: string;
		extract: string;
		wikipediaPageUrl: string;
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
				message={"2. Click the title from one of the search result's"}
			/>
		);
	}
	//start fetching data from wikipedia
	if (loading) {
		return <CircularProgress />;
	}

	/* opening multiple tabs with 1 onClick of a Button/Link doesnt seem legit. (It depends on the user's browser and its settings)

	function openMultipleTabs() {
		const urls = [
			{
				url: wikipediaPageUrl,
				name: "wikipedia",
			},
			{
				url: imdbPageUrl,
				name: "imdb",
			},
		];

		urls.forEach((url) => {
			window.open(url.url, url.name);
		});
	}*/

	//we got the real data or the dummy could not found data from getWikipediaMovieData
	return (
		<Box p={2} border={1} overflow="auto" maxHeight="80vh">
			<h2>{title}</h2>
			<p>{extract}</p>
			<List>
				<ListItem key="1">
					<Link href={wikipediaPageUrl} target="_blank" rel="noreferrer">
						Wikipedia page
					</Link>
				</ListItem>
				<ListItem key="2">
					<Link href={imdbPageUrl} target="_blank" rel="noreferrer">
						IMDB page
					</Link>
				</ListItem>
			</List>
			<Button variant="outlined" fullWidth onClick={handleRecommendedClick}>
				Show Recommended Movies
			</Button>
		</Box>
	);
}
