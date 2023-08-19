// --- imports ---

// builtin nodejs imports
import path from "path";

// npm packages imports
import express from "express";

// --- globals ---

const pages_router = express.Router();

// --- middleware ---

// serve the public folder for the statically served webpages
app.use("/", express.static(path.join(process.cwd(), "public")));

// --- routes ---

// home route
pages_router.get("/home", (request, response, next) => {
	response.sendFile(path.join(process.cwd(), "..", "views", "home.html"));
});

// about route
pages_router.get("/about", (request, response, next) => {
	response.sendFile(path.join(process.cwd(), "..", "views", "about.html"));
});

// 404 route
pages_router.get("/404", (request, response, next) => {
	response.sendFile(path.join(process.cwd(), "..", "views", "404.html"));
});

// default route
pages_router.get("/", (request, response, next) => {
	response.redirect("/pages/home");
});

// --- exports ---

export default pages_router;
