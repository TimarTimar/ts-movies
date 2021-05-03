//MovieList Item. onClick it will request MovieDetail data.
import React from "react";
import moment from "moment";
import { Box, Button, Grid } from "@material-ui/core";

export interface MovieListItemProps {
	id: string;
	name: string;
	score: number;
	genres: { id: string; name: string }[];
	handleMovieItemTitleClick: (e: React.MouseEvent) => void;
	releaseDate: string | undefined;
}

export default function MovieListItem(props: MovieListItemProps) {
	//props.releaseDate is possibly null-> moment will convert null to NaN:string
	const releaseDateYear = moment(props.releaseDate).year();

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
				id={`${props.id},${props.name},${releaseDateYear}`}
				title={`${props.name} - (${releaseDateYear})`}
				onClick={props.handleMovieItemTitleClick}
				fullWidth
			>
				{props.name}
			</Button>
			Score: {props.score === 0 ? "?" : props.score}
			<Grid container direction="row" spacing={1}>
				{props.genres.slice(0, 4).map((item) => (
					<Grid item key={item.id}>
						{item.name}
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
