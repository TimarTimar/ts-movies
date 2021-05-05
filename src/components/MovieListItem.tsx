//MovieList Item. onClick it will request MovieDetail data.
import React from "react";
import moment from "moment";
import { Box, Button, Grid } from "@material-ui/core";

export interface MovieListItemProps {
	id: string;
	name: string;
	score: number;
	genres: { id: string; name: string }[];
	releaseDate: string | null;
	handleMovieItemTitleClick: (e: React.MouseEvent) => void;
}

export default function MovieListItem({
	id,
	name,
	score,
	genres,
	handleMovieItemTitleClick,
	releaseDate,
}: MovieListItemProps) {
	//releaseDate is possibly null-> moment will convert null to NaN:string
	const releaseDateYear = moment(releaseDate).year();
	return (
		<Box
			p={2}
			border={0.1}
			marginBottom={2}
			bgcolor="whitesmoke"
			borderRadius={10}
		>
			{/*IMPORTANT: i use e.target.id to setSelectedMovie. Api requests need [id, name, relaseDateYear] for get MovieDetail . */}
			<Button
				id={`${id},${name},${releaseDateYear}`}
				title={`${name} - (${releaseDateYear})`}
				onClick={handleMovieItemTitleClick}
				fullWidth
			>
				{name}
			</Button>
			<p>Score: {score === 0 ? "?" : score}</p>
			<Grid container direction="row" spacing={2} data-testid="genresContainer">
				{genres.slice(0, 4).map(({ id, name }) => (
					<Box key={id} p={1}>
						{name}
					</Box>
				))}
			</Grid>
		</Box>
	);
}
