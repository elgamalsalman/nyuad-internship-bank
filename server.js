// --- imports ---

// builtin nodejs imports
import path from "path";

// npm packages imports
import express from "express";

// local imports
import pages_router from "routes/pages_routes.js"
import api_router from "routes/api_routes.js"

// --- globals ---

// constants
const app = express();
const port = 3000;

// --- middleware ---

// parse request
app.use(express.urlencoded({extended: "false"}));
app.use(express.json());

// --- routes ---

// pages route
app.use("/pages", page_router);

// api route
app.use("/api", api_router);

// default route
app.get("/", (request, response, next) => {
	response.redirect("/pages")
});

// 404
app.use("/", (request, response, next) => {
	// respond with html page
  if (request.accepts('html')) {
		response.redirect("/pages/404")
    return;
  }

  // respond with json
  if (request.accepts('json')) {
    response.json({ error: 'not found' });
    return;
  }

  // default to plain-text
  response.type('txt').send('not found');
});

// --- server power up ---

// listen for requests
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
