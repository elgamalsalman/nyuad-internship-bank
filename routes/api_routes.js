// --- imports ---

// builtin nodejs imports
import path from "path";

// npm packages imports
import express from "express";

// local imports
import users_controller from "../controllers/users_controller.js";
// import internships_controller from "../controllers/internships_controller.js";
// import sheets_controller from "../controllers/sheets_controller.js";
// import statistics_controller from "../controllers/statistics_controller.js";

// --- globals ---

const api_router = express.Router();
const netid_router = express.Router({ mergeParams: true });
const internship_router = express.Router({ mergeParams: true });
const sheets_router = express.Router({ mergeParams: true });

// --- routes ---

// user routes
api_router.get("/register",
		users_controller.register_controller);
api_router.post("/applied",
		users_controller.applied_controller);
api_router.post("/starred",
		users_controller.starred_controller);
api_router.post("/reminder",
		users_controller.reminder_controller);
api_router.post("/newsletter",
		users_controller.newsletter_controller);
api_router.get("/info",
		users_controller.info_controller);

// // user internship routes
// api_router.use("/:netid/internship", internship_router)
// internship_router.post("/add", internships_controller.add_internship_controller);
// internship_router.post("/report", internships_controller.report_internship_controller);
// 
// // sheets routes
// api_router.use("/sheets", sheets_router)
// sheets_router.get("/list", sheets_controller.sheets_list_controller);
// sheets_router.get("/sheet-data", sheets_controller.sheet_data_controller);
// 
// // general routes
// api_router.get("/contributors", users_controller.contributors_controller);
// api_router.get("/statistics", statistics_controller)

// --- exports ---

export default api_router;
