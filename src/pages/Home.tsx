import {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    const API_KEY = "";
    const API_URL = `${API_KEY}`;
    
    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setMovies(response.data.results);
        });
    }, []);


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average}
                />
            ))}
        </div>
    );
}