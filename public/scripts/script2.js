class CreateContent {
  constructor() {
    this.main = document.querySelector(".main");
  }
  createBlock(element, className, textContent) {
    const newElement = document.createElement(element);
    className && newElement.classList.add(className);
    textContent ? (newElement.innerHTML = textContent) : 0;
    return newElement;
  }
  createLink(href, addClassName, target, content) {
    const newLink = document.createElement("a");
    newLink.setAttribute("href", href);
    // className &&
    // newLink.classList.add(`${className}`);
    if (addClassName) {
      newLink.className = addClassName;
    }
    if (target) {
      newLink.setAttribute("target", target);
    }
    if (content) {
      newLink.textContent = content;
    }

    return newLink;
  }
  createImage(src, alt, className) {
    const img = document.createElement("img");
    img.setAttribute("src", src) && alt && img.setAttribute("alt", alt);
    className && img.classList.add(className);
    return img;
  }
  async newResponse(req, target) {
    const adres = req + target;
    console.log(adres);
    try {
      const response = await axios.get(adres);
      return response.data;
    } catch (err) {
      this.main.textContent = "";
      this.main.textContent = err;
    }
  }
}

class CreaterHeaderAndMovieCards extends CreateContent {
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
    const searchTag = e.target.textContent;
    const results = await this.newResponse(
      `https://api.tvmaze.com/search/shows?q=`,
      searchTag
    );

    // this.headerSetter.call(this, results);

    this.headerSetter(results);

    const res = await this.newResponse("/series/", searchTag);

    // const res = await this.newResponse("/series/", searchTag);

    res.movies.forEach((movie) => {
      this.createNewMovieCard(movie);
    });
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

class CreateSearchers extends CreateContent {
  constructor(form, url) {
    super();
    this.searcher = document.querySelector(form);
    this.url = url;
    // this.text = this.createBlock("div", "main__simple--text");
    this.text = [];
    this.searcher.addEventListener("submit", (e) => {
      this.searchingRequest(e);
    });
  }
  async searchingRequest(e) {
    e.preventDefault();
    let search = e.target.elements.searcher.value;
    this.main.innerHTML = "";

    const response = await this.newResponse(this.url, search);

    if (response.length > 0) {
      const key = Object.keys(response[0])[1];

      this.text.length = 0;
      let content;
      if (key === "show") {
        response.forEach((res, index) => {
          const { name, url: more, image, summary: text } = res[key];
          if (image && text) {
            this.createTextElement(text);
            content = {
              name,
              more,
              image,
            };
            this.makeNewContent(content, ++index);
          }
        });
      } else {
        // console.log("person");

        response.forEach((res) => {
          const {
            name,
            image,
            url: more,
            birthday,
            deathday,
            country,
          } = res[key];
          if (image && birthday && country) {
            this.createTextElement(
              [birthday, deathday, country.name],
              ["date of birth", "date of death", "country"]
            );

            content = {
              name,
              more,
              image,
            };
            this.makeNewContent(content, this.text.length);
          }
        });
      }
    } else {
      this.main.textContent = "Faileid to find try something else";
    }
  }
  createTextElement(infos, values) {
    if (values) {
      let actorData = [];
      for (let i = 0; i < infos.length; i++) {
        if (infos[i]) {
          actorData.push(`${values[i]}:${infos[i]}`);
        }
      }
      const title = actorData.reduce((accu, next) => {
        return (accu += " <br>" + next + "<br>");
      });
      const content = this.createBlock("p", "", title);
      this.text.push(content);
    } else if (infos) {
      if (typeof infos === "string") {
        const content = this.createBlock("p", "", `${infos}`);
        this.text.push(content);
      } else {
        infos.forEach((info) => {
          const content = this.createBlock("p", "", `${info}`);
          this.text.push(content);
        });
      }
    }
  }
  makeNewContent(c, index) {
    const main = this.createBlock("div", "main__simple");
    const called = this.createBlock("div", "main__simple--name", c.name);
    const poster = this.createImage(
      c.image.medium,
      `poster of ${c.name}`,
      "main__simple--image"
    );
    const para = this.createBlock("p", "", "More infos: ");
    const moreInfo = this.createLink(c.more, "", "_blank", "here");

    const contentText = this.createBlock("div", "main__simple--text");
    contentText.append(this.text[index - 1]);
    para.appendChild(moreInfo);
    contentText.appendChild(para);
    main.appendChild(called);
    main.appendChild(contentText);
    main.appendChild(poster);
    this.main.appendChild(main);
  }
}

const createHeaderAndMovieCards = new CreaterHeaderAndMovieCards();

const searchActor = new CreateSearchers(
  "form#searchActor",
  `https://api.tvmaze.com/search/people?q=`
);
const searchSerie = new CreateSearchers(
  "form#searchSerie",
  `https://api.tvmaze.com/search/shows?q=`
);
