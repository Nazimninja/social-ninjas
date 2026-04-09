interface GoogleSheetData {
    type: 'Leads' | 'Careers';
    [key: string]: any;
}

export const submitToGoogleSheets = async (data: GoogleSheetData) => {
    // We are routing 'Contact Form' requests to FormSubmit for easier deliverability.
    // Ensure you use the correct email address for leads.
    const formSubmitUrl = "https://formsubmit.co/ajax/info@socialninjas.in";

    console.log("Submitting lead via FormSubmit");
    console.log("Payload:", data);

    try {
        const payload = {
            _subject: `New Lead via Contact Form: ${data.name || 'Unknown'}`,
            _template: "table",
            ...data
        };

        const response = await fetch(formSubmitUrl, {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json"
            },
            body: JSON.stringify(payload),
        });

        console.log("FormSubmit Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`Invalid response from FormSubmit. Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("FormSubmit result:", result);
        return result;
    } catch (error) {
        console.error("Submission Error DETAILED:", error);
        throw error;
    }
};
;
