<script lang="ts">
	import { onMount } from 'svelte';
	import { getMovieDetail, getTMDBImageURL } from './tmdb_helpers';
	import type { MovieReponse } from './types';

	import Card, { Content, PrimaryAction } from '@smui/card';
	import Chip, { Set, Text } from '@smui/chips';

	export let movieData: MovieReponse;
	export let details: any;

	let genres: string[] = [];

	onMount(async () => {
		details.genres.forEach((g: { id: number; name: string }) => {
			genres = [...genres, g.name];
		});
	});

	const original_title = `— ${movieData.original_title}`;
	const year = movieData.release_date ? new Date(movieData.release_date).getFullYear() : '-';
	const backdropURL = getTMDBImageURL(movieData.backdrop_path);
	const placeholderURL = `https://placehold.co/600x400?text=No+Backdrop`;
</script>

<div class="card-container">
	<Card>
		<div class="heading">
			<div class="title-container">
				<h2 class="title">{movieData.title}</h2>
				{#if movieData.original_title && movieData.original_title != movieData.title}
					<h2 class="original-title">{original_title}</h2>
				{/if}
			</div>
			<h3 class="subtitle">{year}</h3>
		</div>

		<PrimaryAction>
			{#if movieData.backdrop_path === null}
				<img src={placeholderURL} alt={`Backdrop image for '${movieData.title}'`} />
			{:else}
				<img src={backdropURL} alt={`Backdrop image for '${movieData.title}'`} />
			{/if}

			<Content class="content">
				{movieData.overview}
				<Set chips={genres} let:chip nonInteractive>
					<Chip {chip}>
						<Text>{chip}</Text>
					</Chip>
				</Set>
			</Content>
		</PrimaryAction>
	</Card>
</div>

<style>
	.card-container {
		width: 100%;
		margin-top: 1rem;
	}

	.heading {
		background-color: #fff;
		padding: 1rem;
	}

	.title-container {
		display: flex;
		flex-direction: row;
	}

	.title {
		color: #f95959;
		margin: 0;
		width: max-content;
	}

	.original-title {
		color: #aaa;
		margin: 0;
		font-weight: 200;
		font-style: italic;
		padding-left: 0.25rem;
		width: max-content;
	}

	.subtitle {
		color: #888;
		margin: 0;
	}
</style>
