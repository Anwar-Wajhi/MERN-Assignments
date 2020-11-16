const http = require("http");
const url = require("url");

// Data
const avengers = [
  {
    id: "1",
    name: "Iron Man",
    age: "36",
    planet: "Non MAU",
    weapon: "Repulsor",
  },
  {
    id: "2",
    name: "Captain America",
    age: "35",
    planet: "Earth",
    weapon: "Sheild",
  },
  {
    id: "3",
    name: "Black Widow",
    age: "34",
    planet: "Stalingrad",
    weapon: "Handgun",
  },
  {
    id: "4",
    name: "Hawkeye",
    age: "33",
    planet: "Earth",
    weapon: "Bow and Quiver",
  },
  {
    id: "5",
    name: "Hulk",
    age: "32",
    planet: "Sakaar",
    weapon: "Superhuman Strength",
  },
  {
    id: "6",
    name: "Thor",
    age: "31",
    planet: "Asgard",
    weapon: "Mjolnir",
  },
];

// Creating Server
const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true);

  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
    "Content-Type": "application/json",
  });

  // Creating End Points
  if (path.pathname == "/" || path.pathname == "/avengers") {
    res.end(JSON.stringify(avengers));
  } else if (path.pathname == "/superhero") {
    //   Get Single Superhero using GET Request
    if (req.method == "GET") {
      const id = path.query.id;
      const singleSuperhero = avengers.filter((ele) => {
        return ele.id == id;
      });
      res.end(JSON.stringify(singleSuperhero));
    }
    //   Create a Superhero using POST Request
    else if (req.method == "POST") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        let newSuperHero = JSON.parse(body);
        avengers.push(newSuperHero);
        res.end("Superhero Added");
      });
    }
    //   Update a Superhero using PUT Request
    else if (req.method == "PUT") {
      let id = path.query.id;
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        let newSuperHero = JSON.parse(body);

        avengers.forEach((ele) => {
          if (ele.id == id) {
            ele.name = newSuperHero.name;
            ele.age = newSuperHero.age;
            ele.planet = newSuperHero.planet;
            ele.weapon = newSuperHero.weapon;
          }
        });
        res.end("Superhero Updated");
      });
    }
    //   Delete a Superhero using DELETE Request
    else if (req.method == "DELETE") {
      let id = path.query.id;
      avengers.forEach((ele, index) => {
        if (ele.id == id) {
          avengers.splice(index, 1);
        }
      });
      res.end("Superhero Deleted");
    }
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h2>Resource Not Found</h2>");
  }
});

// Assigning Port
let port = 5000;
server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
