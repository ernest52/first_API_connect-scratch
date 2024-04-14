import CreaterHeaderAndMovieCards from "./headerAndCards.js";
import CreateSearchers from "./searchers.js";
const createHeaderAndMovieCards = new CreaterHeaderAndMovieCards();

const searchActor = new CreateSearchers(
  "form#searchActor",
  `https://api.tvmaze.com/search/people?q=`
);
const searchSerie = new CreateSearchers(
  "form#searchSerie",
  `https://api.tvmaze.com/search/shows?q=`
);
