// npm init -y
// vscode shortcut: https://www.vscodeshortcuts.smoljames.com/
// The address of this server connceted to the network is:
// URL:-> http://localhost:8383
// IP:-> 127.0.0.1

const express = require("express");
const app = express();
const PORT = 8383;

let data = ["james"];

// Middleware
app.use(express.json());

// ENDPOINT - HTTP VERBS (method) && Routes (or paths)
// The method informs the nature of request and the route is a further
// subdirectory (basically we direct the request to the body of code to respond
// appropriately, and these locations or routes are called endpoints)

// Type 1 - Website endpoints:-> (This endpoints are for sending back hrml and they typically come when a user enters a usrl in a browser)
app.get("/", (req, res) => {
  // this is endpoint number 1 - /
  console.log("User request the home page website", req.method);
  // res.sendStatus(201);
  res.end(`
    <body style="background: pink;color: blue;">
    <h1>DATA:</h1>
      <p>${JSON.stringify(data)}</p>
      <a href="/dashboard">Dashboard</a>
    </body>
    <script>console.log('This is my script)</script>
  `);
});

app.get("/dashboard", (req, res) => {
  console.log("Ohh now I hit the /dashboard endpoint", req.method);
  res.send(`
    <body>
      <h1>Dashboard</h1>
      <a href="/">Home</a>
    </body>
  `);
});

// Type 2 - API endpoints (non visual)

// CRUD-method create-post read-get update-put and delete-delete

app.get("/api/data", (req, res) => {
  console.log("This one is for data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  // - Someone want to create a user (for example when they click a sign up
  // button)
  // - The user clicks the sign up button after entering their credentials,
  // and their browser is wired to send out a network request to the server
  // to handle that action
  const newEntry = req.body;
  console.log(newEntry);
  data.push(newEntry.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("We deleted the element of the array ");
  res.sendStatus(203);
});

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`);
});
