
const TMDB_API_KEY: string = "e6a7b78c567f43dccc6b6b2e5d06a349";
const TMDB_AUTH_KEY: string = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmE3Yjc4YzU2N2Y0M2RjY2M2YjZiMmU1ZDA2YTM0OSIsInN1YiI6IjVkMjYyMTA3YTY5OGNmMDAxMGFjYzZmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NFNznytWhApSTrAiJOxfNgk82G-5elGDjrpK2iRP2oI'

const ENABLE_ADULT = false;
const LANGUAGE_CODE = 'en-US';

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/'

export const getTMDBImageURL = (posterPath: string) => {
    return TMDB_IMAGE_BASE_URL + posterPath;
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: TMDB_AUTH_KEY
    }
};

export const searchMovie = async (title: string) => {




    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=${ENABLE_ADULT}&language=${LANGUAGE_CODE}&page=1`, options)
        .then(response => response.json())

    return response.results;
}

export const getMovieDetail = async (movieID: number) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=${LANGUAGE_CODE}`, options)
        .then(response => response.json())

    return response;
}
