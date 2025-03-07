import { Link } from "react-router-dom";
import { lazy } from "react";
import { MovieProps } from "../models/Movie";

const LazyImage = lazy(() => import("./LazyImage"));

export default function MovieCard({ id, title, poster, rating }: MovieProps) {
  return (
    <Link
      to={`/movie/${id}`}
      className="group block relative p-4 bg-gray-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <div
        key={id}
        className="group relative p-4 bg-gray-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {/**
         * @description
         * The image is wrapped in a div with a fixed aspect ratio of 2:3.
         * This ensures that the image maintains its aspect ratio and does not stretch when hovering on it.
         */}

        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl">
          <LazyImage
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="mt-3 text-lg font-bold text-gray-100 group-hover:text-sky-400 transition-colors duration-200 text-center">
          {title}
        </h3>

        <div className="flex justify-center items-center mt-2 text-sm text-gray-300">
          <span className="text-yellow-400 text-lg">⭐</span>
          <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
