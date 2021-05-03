//[GraphQL] get movies from https://tmdb.sandbox.zoosh.ie/dev/grphql
import { gql } from "@apollo/client";

//get movies by name
export const GET_SEARCHED_MOVIES = gql`
	query SearchMovies($query: String!) {
		searchMovies(query: $query) {
			id
			name
			genres {
				id
				name
			}
			score
			releaseDate
		}
	}
`;

//get related movies by id

export const GET_RELATED_MOVIES = gql`
	query getRelatedMovies($id: ID!) {
		movie(id: $id) {
			similar {
				id
				name
				score
				genres {
					id
					name
				}
			}
		}
	}
`;
