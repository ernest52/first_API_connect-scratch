import CreateContent from "./methods.js";
export default class CreateSearchers extends CreateContent {
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
        console.log("show");
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
        console.log("person");

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
