
interface GoogleSheetData {
    type: 'Leads' | 'Careers';
    [key: string]: any;
}

// You will need to add VITE_GOOGLE_SHEET_URL to your .env file
// Example: VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/AKfycb.../exec
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

export const submitToGoogleSheets = async (data: GoogleSheetData) => {
    if (!GOOGLE_SCRIPT_URL) {
        console.error("Google Sheet URL is missing in .env file (VITE_GOOGLE_SHEET_URL)");
        // Fallback or throw error? For now, we simulate success in dev if missing, but log error
        if (import.meta.env.DEV) {
            alert("Dev Mode: Google Sheet URL missing. Check console.");
            return { result: "success", mock: true };
        }
        throw new Error("Google Sheet Configuration Missing");
    }

    // DEBUG LOGGING
    console.log("Submitting to Sheet URL:", GOOGLE_SCRIPT_URL);
    console.log("Payload:", data);

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(data),
        });

        console.log("Sheet Response Status:", response.status);

        const text = await response.text();
        console.log("Sheet Response Raw Text:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON response. Likely HTML error page.", e);
            throw new Error("Invalid Server Response. Did you set 'Who has access' to 'Anyone'?");
        }

        console.log("Sheet Response Data:", result);
        return result;
    } catch (error) {
        console.error("Google Sheet Submission Error DETAILED:", error);
        // alert("Debug Error: " + error); // Removed user-facing alert
        throw error;
    }
};
