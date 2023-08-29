// --- imports ---

// npm packages imports
import fs from "fs";
import path from "path";

// npm packages imports
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

// --- globals ---

// If modifying these scopes, delete token.json.
const scopes = [
	"https://www.googleapis.com/auth/script.projects",
	"https://www.googleapis.com/auth/drive",
	"https://www.googleapis.com/auth/forms",
	"https://www.googleapis.com/auth/spreadsheets",
];

const token_path = path.join(process.cwd(), 'token.json');
const credentials_path = path.join(process.cwd(), 'google_credentials.json');

// --- main program ---

// authorize connection with google apis and get authentication client
const auth_client = (async authorize() => {
	// Reads previously authorized credentials from the save file
	async function load_saved_credentials_if_exist() {
		try {
			const content = await fs.readFile(token_path);
			const credentials = JSON.parse(content);
			return google.auth.fromJSON(credentials);
		} catch (err) {
			return null;
		}
	}

	// Serializes credentials to a file comptible with GoogleAUth.fromJSON
	async function save_credentials(client) {
		const content = await fs.readFile(credentials_path);
		const keys = JSON.parse(content);
		const key = keys.installed || keys.web;
		const payload = JSON.stringify({
			type: 'authorized_user',
			client_id: key.client_id,
			client_secret: key.client_secret,
			refresh_token: client.credentials.refresh_token,
		});
		await fs.writeFile(token_path, payload);
	}

  let client = await load_saved_credentials_if_exist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: scopes,
    keyfilePath: credentials_path,
  });
  if (client.credentials) {
    await save_credentials(client);
  }
  return client;
})();

// --- helper functions ---

// Lists the names and IDs of up to 10 files.
async list_files = () => {
	// wait for authentication
	await auth_client;

  const drive = google.drive({ 
		version: 'v3',
		auth: auth_client,
	});

  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });

  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
};

// TODO: duplicate_sheet()

// TODO: share_sheet_with_email()

// --- exports ---

export default {
	duplicate_sheet,
	share_sheet_with_email,
};
