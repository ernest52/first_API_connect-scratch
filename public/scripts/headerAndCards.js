import CreateContent from "./methods.js";
export default class CreaterHeaderAndMovieCards extends CreateContent {
  constructor() {
    super();
    this.genres = document.querySelectorAll(".nav__top .movie__genre");
    // this.main = document.querySelector(".main");
    this.intervalId;
    this.header;
    this.mediumImages = [];
    this.idIes = [];
    this.summary = [];
    this.blockHidden = this.createBlock("div", "hidden");
    this.i = 0;
    this.time = 3000;
    this.link = document.createElement("a");
    this.img = document.createElement("img");
    this.img.classList.add("header__image");
    // this.init();
    this.genres.forEach((genre) => {
      genre.addEventListener("click", (e) => {
        this.init(e);
      });
    });
  }
  async init(e) {
    const results = await this.newResponse(
      `https://api.tvmaze.com/search/shows?q=`,
      e.target.textContent
    );

    this.headerSetter.call(this, results);

    const res = await this.newResponse("/series/", e.target.textContent);
    if (res) {
      res.movies.forEach((movie) => {
        this.createNewMovieCard(movie);
      });
    }
  }
  async headerSetter(results) {
    if (this.header) {
      this.reset();
    }
    this.header = this.createBlock("div", "header");
    document.body.prepend(this.header);
    results.forEach((result) => {
      if (result.show.image && result.show.summary) {
        this.addNewElements(result);
      }
    });

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.header.innerHTML = "";
      this.main.textContent = "";
    }

    this.intervalId = this.newInterval();
  }
  reset() {
    document.body.removeChild(this.header);
    this.summary.length = 0;
    this.idIes.length = 0;
    this.mediumImages.length = 0;
  }
  addNewElements(result) {
    this.mediumImages.push(result.show.image.medium);
    this.idIes.push(result.show.id);
    this.summary.push(result.show.summary);
  }
  createNewMovieCard(movie) {
    const div = this.createBlock("div", "movie__card");
    const img = this.createImage(movie.img.medium, "poster");
    div.appendChild(img);
    const link = this.createLink(`/serie/${movie.id}`, "movie__card--hidden");
    const heading = this.createBlock("h1", "", movie.name);
    link.appendChild(heading);
    const duration = this.createBlock(
      "p",
      "",
      `average time: ${movie.duration}`
    );
    link.appendChild(duration);
    const premiered = this.createBlock(
      "p",
      "",
      `Premiered at: ${movie.premiered}`
    );
    link.appendChild(premiered);
    if (movie.ended) {
      const ended = this.createBlock("p", "", `ended: ${movie.ended}`);
      link.appendChild(ended);
    }
    const language = this.createBlock("p", "", `Languages: ${movie.language}`);

    link.appendChild(language);
    div.appendChild(link);

    this.main.appendChild(div);
  }

  newInterval() {
    this.main.textContent = "";
    this.header.append(this.blockHidden);
    this.blockHidden.innerHTML = this.summary[this.i];
    this.img.setAttribute("src", `${this.mediumImages[this.i]}`);
    this.link.setAttribute("href", `/serie/${this.idIes[this.i]}`);
    this.header.append(this.link);
    this.link.append(this.img);
    return setInterval(() => {
      this.i == this.mediumImages.length - 1 ? (this.i = 0) : this.i++;
      this.blockHidden.innerHTML = this.summary[this.i];
      this.img.setAttribute("src", `${this.mediumImages[this.i]}`);
      this.link.setAttribute("href", `/serie/${this.idIes[this.i]}`);
      this.link.append(this.img);
      this.header.append(this.link);
    }, this.time);
  }
}
