/**
 * Social Ninja's — Google Sheets Universal Webhook
 * 
 * HOW TO DEPLOY:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Delete any existing code, paste this entire script
 * 3. Click Save (💾), give the project a name e.g. "SocialNinjas Webhook"
 * 4. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy → copy the Web App URL
 * 6. Add to Vercel env: VITE_GOOGLE_SHEET_URL = <paste URL here>
 * 7. Redeploy on Vercel
 *
 * SHEETS CREATED AUTOMATICALLY:
 *   - "Content Studio Leads" — trial + paid clients from AI Content Studio
 *   - "Website Leads"        — contact form submissions from main site
 *   - "Careers"              — job applications
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────

var SHEET_MAP = {
  "studio":  "Content Studio Leads",
  "Leads":   "Website Leads",
  "Careers": "Careers"
};

var HEADERS = {
  "Content Studio Leads": [
    "Timestamp", "Brand Name", "Email", "Phone",
    "Plan", "Price (INR)", "Platforms", "Niche",
    "Audience", "Website", "Payment ID", "Status", "Join Date"
  ],
  "Website Leads": [
    "Timestamp", "Name", "Email", "Phone",
    "Company", "Website", "Message"
  ],
  "Careers": [
    "Timestamp", "Role", "Name", "Email",
    "Phone", "Portfolio", "Cover Note"
  ]
};

// ─── ENTRY POINTS ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var raw = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(raw);
    var type = data.type || "studio";
    var sheetName = SHEET_MAP[type] || "Content Studio Leads";
    appendRow(sheetName, data, type);
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", sheet: sheetName }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Social Ninja's webhook is live ✅" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── CORE ─────────────────────────────────────────────────────────────────────

function appendRow(sheetName, data, type) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  // Auto-create sheet + headers if missing
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = HEADERS[sheetName] || ["Timestamp", "Data"];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground("#1e3a5f")
      .setFontColor("#ffffff")
      .setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  var ts = data.timestamp || new Date().toISOString();
  var row;

  if (type === "studio") {
    row = [
      ts,
      data.brand      || data.brandName || "",
      data.email      || "",
      data.phone      || "",
      data.plan       || data.planName  || "",
      data.price      || data.displayINR || "",
      data.platforms  || "",
      data.niche      || "",
      data.audience   || "",
      data.website    || "",
      data.paymentId  || "",
      data.status     || "trial",
      data.joinDate   || ""
    ];
  } else if (type === "Leads") {
    row = [
      ts,
      data.Name     || "",
      data.Email    || "",
      data.Phone    || "",
      data.Company  || "",
      data.Website  || "",
      data.Bottleneck || data.Message || ""
    ];
  } else if (type === "Careers") {
    row = [
      ts,
      data.Role       || "",
      data.Name       || "",
      data.Email      || "",
      data.Phone      || "",
      data.Portfolio  || "",
      data["Cover Note"] || ""
    ];
  } else {
    row = [ts, JSON.stringify(data)];
  }

  sheet.appendRow(row);

  // Alternate row shading for readability
  var lastRow = sheet.getLastRow();
  if (lastRow % 2 === 0) {
    sheet.getRange(lastRow, 1, 1, row.length).setBackground("#f0f7ff");
  }
}
