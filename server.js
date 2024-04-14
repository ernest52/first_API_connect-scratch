import express from "express";
import axios from "axios";
// export let movies = [];
const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

const actors = [
  {
    name: "Morgan",
    lastName: "Freeman",
    id: "Morgan Freeman",
    text: {
      info: "Morgan Freeman (born June 1, 1937) is an American actor and producer. He is known for his distinctive deep voice and roles in a wide variety of film genres. Throughout a career spanning five decades, he has received numerous accolades, including an Academy Award, a Screen Actors Guild Award, and a Golden Globe Award. Freeman has also been awarded the Kennedy Center Honor in 2008, an AFI Life Achievement Award in 2011, the Cecil B. DeMille Award in 2012, and Screen Actors Guild Life Achievement Award in 2018.",
      url: "https://en.wikipedia.org/wiki/Morgan_Freeman",
    },
  },
  {
    name: "Nicolas",
    lastName: "Cage",
    id: "Nicolas Cage",
    text: {
      info: "Nicolas Kim Coppola (born January 7, 1964), known by his stage name Nicolas Cage, is an American actor and film producer. He is the recipient of various accolades, including an Academy Award, a Screen Actors Guild Award, and a Golden Globe Award. Known for his versatility as an actor, his participation in various film genres has gained him a cult following",
      url: "https://en.wikipedia.org/wiki/Nicolas_Cage",
    },
  },
  {
    name: "Peter",
    lastName: "Dinklage",
    id: "Peter Dinklage",
    text: {
      info: "Peter Hayden Dinklage ( born June 11, 1969) is an American actor. He received international recognition for portraying Tyrion Lannister on the HBO television series Game of Thrones (2011-2019), for which he won the Primetime Emmy Award for Outstanding Supporting Actor in a Drama Series a record four times. He also received a Golden Globe Award in 2011 and a Screen Actors Guild Award in 2020 for the role. Dinklage has a common form of dwarfism known as achondroplasia; he stands 4 ft 5 in (1.35 m) tall. He has used his celebrity status to raise social awareness concerning dwarfism.",
      url: "https://en.wikipedia.org/wiki/Peter_Dinklage",
    },
  },
  {
    name: "Bryan",
    lastName: "Cranston",
    id: "Bryan Cranston",
    text: {
      info: "Bryan Lee Cranston (born March 7, 1956) is an American actor, producer, and director. He is mainly known for portraying Walter White in the AMC crime drama series Breaking Bad (2008-2013) and Hal in the Fox sitcom Malcolm in the Middle (2000-2006). He has received a number of awards, including six Primetime Emmy Awards, two Tony Awards, and a Golden Globe, in addition to nominations for an Academy Award and a BAFTA Award.",
      url: "https://en.wikipedia.org/wiki/Bryan_Cranston",
    },
  },
  {
    name: "Robert",
    lastName: "Carlyle",
    id: "Robert Carlyle",
    text: {
      info: "Robert Carlyle  (born 14 April 1961) is a Scottish actor. His film work includes Trainspotting (1996), The Full Monty (1997), The World Is Not Enough (1999), Angela's Ashes (1999), The Beach (2000), 28 Weeks Later (2007), and Yesterday (2019). He has been in the television shows Hamish Macbeth, Stargate Universe, Once Upon a Time and COBRA. He won the BAFTA Award for Best Actor in a Leading Role for The Full Monty and a Gemini Award for Stargate Universe, and was nominated for an Emmy Award for his work in Human Trafficking (2005).",
      url: "https://en.wikipedia.org/wiki/Robert_Carlyle",
    },
  },
  {
    name: "Jeremy",
    lastName: "Irons",
    id: "Jeremy Irons",
    text: {
      info: 'Jeremy John Irons ( born 19 September 1948) is an English actor and activist. He is known for his roles on stage and screen having won numerous accolades including an Academy Award, two Golden Globe Awards, three Primetime Emmy Awards, and a Tony Award. He is one of the few actors who have achieved the "Triple Crown of Acting" having won Oscar, Emmy, and Tony Awards for Film, Television and Theatre.',
      url: "https://en.wikipedia.org/wiki/Jeremy_Irons",
    },
  },
  {
    name: "Benedict",
    lastName: "Cumberbatch",
    id: "Benedict Cumberbatch",
    text: {
      info: "Benedict Timothy Carlton Cumberbatch  (born 19 July 1976) is an English actor. Known for his work on screen and stage, he has received various accolades, including a BAFTA Award, a Primetime Emmy Award and a Laurence Olivier Award, in addition to nominations for two Academy Awards and four Golden Globes. In 2014, Time magazine named him one of the 100 most influential people in the world, and in 2015, he was appointed a CBE for services to performing arts and charity.",
      url: "https://en.wikipedia.org/wiki/Benedict_Cumberbatch",
    },
  },
  {
    name: "Jessica",
    lastName: "Lange",
    id: "Jessica Lange",
    text: {
      info: "Jessica Phyllis Lange ( born April 20, 1949)[1] is an American actress. She is one of the few performers to achieve the Triple Crown of Acting, having received two Academy Awards, three Primetime Emmy Awards, and a Tony Award, along with five Golden Globe Awards and one Screen Actors Guild Award.",
      url: "https://en.wikipedia.org/wiki/Jessica_Lange",
    },
    // !! 2 wyniki
  },
  {
    name: "Steve",
    lastName: "Buscemi",
    id: "Steve Buscemi",
    text: {
      info: "Steven Vincent Buscemi (born December 13, 1957) is an American actor. Buscemi is known for his work as an acclaimed character actor. His early credits consist of major roles in independent film productions such as the AIDS drama Parting Glances (1986), Mystery Train (1989), In the Soup (1992), and his breakout role as Mr. Pink in Quentin Tarantino's Reservoir Dogs (1992).",
      url: "https://en.wikipedia.org/wiki/Steve_Buscemi",
    },
  },
  {
    name: "Idris",
    lastName: "Elba",
    id: "Idris Elba",
    text: {
      info: "Idrissa Akuna Elba ( born 6 September 1972) is an English actor, rapper, singer, and DJ. An alumnus of the National Youth Music Theatre in London, he is known for roles including Stringer Bell in the HBO series The Wire (2002-2004), DCI John Luther in the BBC One series Luther (2010-2019), and Nelson Mandela in the biographical film Mandela: Long Walk to Freedom (2013). For Luther, he received four nominations each for a Golden Globe Award for Best Actor and a Primetime Emmy Award for Outstanding Lead Actor, winning one of the former.",
      url: "https://en.wikipedia.org/wiki/Idris_Elba",
    },
  },
  {
    name: "Jim",
    lastName: "Parsons",
    id: "Jim Parsons",
    text: {
      info: "James Joseph Parsons (born March 24, 1973) is an American actor. From 2007 to 2019, he played Sheldon Cooper in the CBS sitcom The Big Bang Theory. He has received various awards, including four Primetime Emmy Awards for Outstanding Lead Actor in a Comedy Series and the Golden Globe Award for Best Actor in a Television Series Musical or Comedy. In 2018, Forbes estimated his annual salary to be $26.5 million and named him the world's highest-paid television actor.",
      url: "https://en.wikipedia.org/wiki/Jim_Parsons",
    },
  },
];

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    // const response = await axios.get(`${API_URL}/actors`);

    res.render("index", { actors });
  } catch (err) {
    console.log("error: ", err);
  }
});
app.get("/series/:g", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/series/${req.params.g}`);
    const movies = response.data.movies;
    res.json({ movies, actors });
  } catch (err) {
    console.log("Error: ", err);
  }
});

app.get("/serie/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/serie/${req.params.id}`);
    const simple = response.data.simple;

    res.render("index", { simple, actors });
  } catch (err) {
    console.log("Error: ", err);
  }
});
app.get("/series/actor/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/actors/${req.params.id}`);
    const actor = response.data.actor;
    const index = response.data.index;
    res.render("index", { actor, actors, index });
  } catch (err) {
    console.log("Error: ", err);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log("error:", err);
  } else {
    console.log(`Server works on port: ${port}`);
  }
});
