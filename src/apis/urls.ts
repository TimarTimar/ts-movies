//Constants for apis

//Extend this with imdb title id to get external imdb page url
export const IMDB_BASE_URL = "https://www.imdb.com/title/";

// GET IMDB movie title id by TMDB id. This seemed the most reliable way, Graphql server returned null for socialMedia fields
export const TMDB_GET_IMDB_MOVIE_TITLE_ID_BY_TMDB_ID = (tmdb_Id: string) =>
	`https://api.themoviedb.org/3/movie/${tmdb_Id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}`;

//Extend this with Wikipedia pageId to get the movie's external wikipedia page url
export const WIKIPEDIA_BASE_URL = " https://en.wikipedia.org/?curid=";

/*Get wikipedia pages by gsrsearch and extract their first paragraph. Set gsrlimit to 1 because the first result will be the best match and we only want to use that.
Cache for 1 year*/
export const WIKIPEDIA_GET_FIRST_P_BY_GSRSEARCH =
	"https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=search&prop=extracts&gsrlimit=1&exintro=1&explaintext=1&format=json&maxage=31536000&gsrsearch=";
