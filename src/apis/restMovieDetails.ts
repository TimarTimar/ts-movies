//[REST] find wikipedia page by movie title, get first paragraph, create wikipedia and tmdb uri
import axios from "axios";
import {
	WIKIPEDIA_GET_FIRST_P_BY_GSRSEARCH,
	WIKIPEDIA_BASE_URL,
	IMDB_BASE_URL,
	NOT_FOUND_ERROR_CODE,
} from "./constants";

interface wikipediaPageData {
	title: string;
	extract: string;
	pageid: number;
}

export const getWikipediaMovieData = async (
	title: string,
	releaseYear: string
): Promise<any> => {
	//generate our searchParam. If there is a wikipedia page about the film it will find it, if not it will show the data from the best match. For more strict results I could exclude pages if none of its categories include "film".
	const gsrsearch =
		releaseYear !== "NaN" ? `${title} ${releaseYear} film` : `${title} film`;
	try {
		const response = await axios.get(
			`${WIKIPEDIA_GET_FIRST_P_BY_GSRSEARCH}${gsrsearch}`
		);

		//If it couldn't find any page by our searchParam. We will send a MovieDetails like object to show to the user.
		if (!response?.data?.query?.pages) {
			return {
				title: NOT_FOUND_ERROR_CODE,
				extract: `Could not find Wikipedia page for: ${gsrsearch}`,
				wikipediaPageUrl: null,
			};
		}

		//every wikipedia page has pageid and title, but might not have extract property
		const {
			extract = "This Wikipedia page doesn't have extract property",
			pageid,
			title,
		}: wikipediaPageData = Object.values<any>(response.data.query.pages)[0];

		// get external link for the movie's wikipedia page

		const wikipediaPageUrl = `${WIKIPEDIA_BASE_URL}${pageid}`;

		return { title, extract, wikipediaPageUrl };
	} catch (error) {
		throw error;
	}
};

//get external link for the movie's imdb page

export const getImdbPageUrl = async (tmdb_Id: string) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${tmdb_Id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}`
		);
		const imdbPageUrl = !response?.data?.imdb_id
			? `${NOT_FOUND_ERROR_CODE} Could not find IMDB external link for this TMDB ID: ${tmdb_Id}`
			: `${IMDB_BASE_URL}${response.data.imdb_id}`;

		return imdbPageUrl;
	} catch (error) {
		throw error;
	}
};
