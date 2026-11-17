import { siteConfig } from "@/content/site";
import { getStoredLid } from "@/lib/lid";

export type WhatsAppAction =
  | "general"
  | "hydrafacial_enrol"
  | "oneday_enrol"
  | "question"
  | "offline";

export function getWhatsAppUrl(
  action: WhatsAppAction = "general",
  customText?: string,
  oneDayCourseName: string = "1-Day Beauty Masterclass"
): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  const lid = getStoredLid();
  const refSuffix = lid ? ` Ref: ${lid}` : "";

  let message = "";

  switch (action) {
    case "general":
      message = customText || "Namaste Sunita ma'am, mujhe Feminy Academy ke courses ke baare mein jaankari chahiye.";
      break;
    case "hydrafacial_enrol":
      message = `Namaste ma'am, mujhe Online HydraFacial Course (₹3,000) join karna hai.${refSuffix}`;
      break;
    case "oneday_enrol":
      message = `Namaste ma'am, mujhe ${oneDayCourseName} (₹1,000) join karna hai.${refSuffix}`;
      break;
    case "question":
      message = customText || "Namaste ma'am, course ke baare mein ek sawaal hai.";
      break;
    case "offline":
      message = customText ||
        "Namaste ma'am, mujhe Bahadurgarh academy ki training, fees aur counselling ke baare mein jaankari chahiye.";
      break;
  }

  if (refSuffix && !message.includes(refSuffix)) message += refSuffix;
  return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
}
