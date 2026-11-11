/**
 * Feminy Academy — Google Sheets Lead Webhook + Instant Email Alert
 *
 * Setup Instructions:
 * 1. Open your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste this code into `Code.gs` and save.
 * 3. Go to Project Settings (gear icon) -> Script Properties -> Add script property:
 *    - Property: `NOTIFY_EMAIL`
 *    - Value: Sunita's notification email (comma-separated if multiple)
 * 4. Click "Deploy" -> "New deployment" -> Type: "Web app":
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Copy the Web App URL (`https://script.google.com/macros/s/.../exec`) and set it as
 *    `SHEET_WEBHOOK_URL` in your `.env.local` and Netlify environment variables.
 */

var HEADERS = [
  "Timestamp (IST)",
  "Name",
  "Phone",
  "City",
  "Interest",
  "Preferred Date",
  "Source",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "LID",
  "Page",
  "Event ID"
];

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Ignore non-form payloads defensively
    if (payload.channel && payload.channel !== "form") {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: true, skipped: true })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Leads") || ss.getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var nowIst = Utilities.formatDate(
      new Date(),
      "Asia/Kolkata",
      "dd MMM yyyy, hh:mm:ss a 'IST'"
    );

    var name = payload.name || "";
    var phone = String(payload.phone || "").replace(/\D/g, "");
    var city = payload.city || "";
    var interest = payload.interest || "Sab kuch";
    var preferredDate = payload.preferredDate || "";
    var source = payload.source || "website";
    var utmSource = payload.utm_source || "direct";
    var utmMedium = payload.utm_medium || "";
    var utmCampaign = payload.utm_campaign || "";
    var lid = payload.lid || "";
    var page = payload.page || "/";
    var eventId = payload.event_id || "";

    sheet.appendRow([
      nowIst,
      name,
      phone,
      city,
      interest,
      preferredDate,
      source,
      utmSource,
      utmMedium,
      utmCampaign,
      lid,
      page,
      eventId
    ]);

    var notifyEmail = PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL");
    if (notifyEmail && phone) {
      var waLink = "https://wa.me/91" + phone + "?text=" + encodeURIComponent(
        "Namaste " + name + " ji, Feminy Academy (Sunita Rathee) se aapki demo class enquiry mili hai."
      );
      var telLink = "tel:+91" + phone;

      var subject = "New Lead: " + name + " (" + phone + ") — " + source;
      var htmlBody = [
        "<div style='font-family:sans-serif;line-height:1.6;color:#231F20;'>",
        "<h2 style='margin:0 0 12px;color:#8A2346;'>Feminy Academy — New Lead</h2>",
        "<table style='border-collapse:collapse;width:100%;max-width:480px;'>",
        "<tr><td style='padding:6px 0;font-weight:bold;'>Name:</td><td>" + escapeHtml(name) + "</td></tr>",
        "<tr><td style='padding:6px 0;font-weight:bold;'>Phone:</td><td>",
        "<a href='" + telLink + "'>+91 " + escapeHtml(phone) + "</a> &nbsp;|&nbsp; ",
        "<a href='" + waLink + "' style='color:#1F9D55;font-weight:bold;'>Open in WhatsApp</a>",
        "</td></tr>",
        city ? "<tr><td style='padding:6px 0;font-weight:bold;'>City:</td><td>" + escapeHtml(city) + "</td></tr>" : "",
        "<tr><td style='padding:6px 0;font-weight:bold;'>Interest:</td><td>" + escapeHtml(interest) + "</td></tr>",
        "<tr><td style='padding:6px 0;font-weight:bold;'>Source:</td><td>" + escapeHtml(source) + " (" + escapeHtml(page) + ")</td></tr>",
        "<tr><td style='padding:6px 0;font-weight:bold;'>UTM Source:</td><td>" + escapeHtml(utmSource) + "</td></tr>",
        "<tr><td style='padding:6px 0;font-weight:bold;'>Time (IST):</td><td>" + escapeHtml(nowIst) + "</td></tr>",
        "</table>",
        "</div>"
      ].join("");

      MailApp.sendEmail({
        to: notifyEmail,
        subject: subject,
        htmlBody: htmlBody
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
