// --- imports ---

// builtin nodejs imports
import path from "path";

// npm packages imports
import express from "express";

// my imports
import {
	get_sheet_from_netid,
	create_sheet_for_netid,
} from "./controllers/sheets_manager.js";

// --- globals ---

// constants
const app = express();
const port = 3000;

// --- middleware ---

// parse 
app.use(express.urlencoded({extended: "false"}));
app.use(express.json());

// serve the public folder for statically served webpages
app.use("/", express.static(path.join(process.cwd(), "public")));

// --- routes ---

// home page
app.get("/", (request, response, next) => {
	response.sendFile(path.join(process.cwd(), "views", "home.html"));
});

// join form submissions
app.post("/join", async (request, response, next) => {
	// get form information
	console.log(request.body);
	const { netid } = request.body;

	// create google sheet for net_id
	let sheet = await get_sheet_from_netid(netid);

	// create sheet if it doesn't exist
	if (sheet === null) {
		console.log(`Creating sheet for ${netid}`)
		sheet = await create_sheet_for_netid(netid);
	}

	// redirect to home page
	response.redirect("/");
});

// 404
app.use("/", (request, response, next) => {
	response.sendFile(path.join(process.cwd(), "views", "404.html"));
});

// --- server power up ---

// listen for requests
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
