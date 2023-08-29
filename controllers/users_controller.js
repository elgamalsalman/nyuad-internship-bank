// --- imports ---

// local imports
import "dotenv/config";
import users_model from "../models/users_model";
import google_sheets_utils from '../utils/google_sheets_utils.js'

// --- controllers ---

// register_controller
const register_controller = async (request, response, next) => {
	const { netid } = request.query;
	console.log(`registering ${netid}`);

	// ensure valid query parameters
	if (netid === undefined) {
		response.json({
			status: "declined",
			error: "netid_existance_error",
		});
		return;
	}

	// TODO: check for netid validity

	let sheet_link = await users_model.get_user_sheet(netid);
	const sheet_exists = (sheet === null);

	if (!sheet_exists) {
		await users_model.register_user(netid);
		const email = await users_model.get_user_email(netid);

		const template_sheet_link = process.env.template_sheet_link;
		sheet_link = await google_sheets_utils.duplicate_sheet(template_sheet_link, email);
		await google_sheets_utils.share_sheet_with_email(sheet_link, email);
	}
		
	response.json({
		status: "approved",
		is_sheet_new: !sheet_exists,
		sheet: sheet,
	})
};

// applied_controller
const applied_controller = () => {};

// starred_controller
const starred_controller = () => {};

// reminder_controller
const reminder_controller = () => {};

// newsletter_controller
const newsletter_controller = () => {};

// info_controller
const info_controller = () => {};

// contributors_controller
const contributors_controller = () => {};

// --- exports ---

export default {
	register_controller,
	applied_controller,
	starred_controller,
	reminder_controller,
	newsletter_controller,
	info_controller,
	contributors_controller,
};
