export default class CreateContent {
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
    try {
      const response = await axios.get(adres);
      return response.data;
    } catch (err) {
      this.main.textContent = "";
      this.main.textContent = err;
    }
  }
}
