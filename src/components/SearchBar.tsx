//TextField and Button. onClick it will request search results from the graphql server.
import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";

interface SearchBarProps {
	handleSearchFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearchButtonClick: () => void;
	isSearchBarButtonDisabled: () => boolean;
}

export default function SearchBar(props: SearchBarProps) {
	return (
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
			spacing={4}
		>
			<Grid item xs={7}>
				<TextField
					id="outlined-basic"
					label="Search for Movies"
					variant="outlined"
					onChange={props.handleSearchFieldChange}
					size="small"
					fullWidth
				></TextField>
			</Grid>
			<Grid item xs={5}>
				<Button
					variant="outlined"
					onClick={props.handleSearchButtonClick}
					disabled={props.isSearchBarButtonDisabled()}
				>
					Search
				</Button>
			</Grid>
		</Grid>
	);
}
