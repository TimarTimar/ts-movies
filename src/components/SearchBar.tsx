//TextField and Button. onClick it will request search results from the graphql server.
import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";

interface SearchBarProps {
	handleSearchFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearchButtonClick: () => void;
	isSearchBarButtonDisabled: () => boolean;
}

export default function SearchBar({
	handleSearchFieldChange,
	handleSearchButtonClick,
	isSearchBarButtonDisabled,
}: SearchBarProps) {
	return (
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
			spacing={3}
		>
			<Grid item xs={7}>
				<TextField
					id="outlined-basic"
					label="Search for Movies"
					variant="standard"
					size="small"
					fullWidth
					onChange={handleSearchFieldChange}
				></TextField>
			</Grid>
			<Grid item xs={5}>
				<Button
					variant="outlined"
					onClick={handleSearchButtonClick}
					disabled={isSearchBarButtonDisabled()}
				>
					Search
				</Button>
			</Grid>
		</Grid>
	);
}
