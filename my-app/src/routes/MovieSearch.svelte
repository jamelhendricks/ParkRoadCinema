<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { getMovieDetail, getTMDBImageURL, searchMovie } from './tmdb_helpers';
	import type { MovieReponse } from './types';
	import MovieCard from './MovieCard.svelte';
	import Button, { Label } from '@smui/button';
	import { Input } from '@smui/textfield';

	let queryMovie = '';
	let queryResults: { movieData: MovieReponse; details: {} }[] = [];

	const fetchMovieInfo = async () => {
		if (queryMovie.length) {
			const movieResults = await searchMovie(queryMovie);

			queryResults = [];

			movieResults.forEach(async (movie) => {
				const movieDetails = await getMovieDetail(movie.id);
				const queryObj = { movieData: movie, details: movieDetails };
				queryResults.push(queryObj);
				queryResults = queryResults;
			});
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	const handleKeyUp = async (event: KeyboardEvent) => {
		if (event.key === 'Enter' && queryMovie.length) {
			fetchMovieInfo();
		} else {
			queryMovie = event.currentTarget.value;
		}
	};

	afterUpdate(() => {});
</script>

<div class="search-container">
	<Input
		bind:value={queryMovie}
		on:keydown={(e) => handleKeyDown(e)}
		on:keyup={(e) => handleKeyUp(e)}
		class="solo-input movie-search"
		autofocus
	/>
	<Button
		on:click={async () => {
			fetchMovieInfo();
		}}
		variant="raised"
		style="background-color: #f95959"
	>
		<Label>Search</Label>
	</Button>

	<div class="results-container">
		{#each queryResults as result (result.movieData.id)}
			{#if result.movieData !== null && result.details !== null}
				<MovieCard movieData={result.movieData} details={result.details} />
			{:else}
				<div>null data</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.search-container {
		display: flex;
		flex-direction: column;
		width: 30%;
	}

	.movie-search {
		text-align: center;
	}

	.results-container {
		width: 100%;
	}
</style>
