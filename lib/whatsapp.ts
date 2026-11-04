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
  oneDayCourseName: string = "[1-DAY COURSE NAME]"
): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  const lid = getStoredLid();
  const refSuffix = lid ? ` Ref: ${lid}` : "";

  let message = "";

  switch (action) {
    case "general":
      message = "Namaste Sunita ma'am, mujhe Feminy Academy ke courses ke baare mein jaankari chahiye.";
      break;
    case "hydrafacial_enrol":
      message = `Namaste ma'am, mujhe Online HydraFacial Course (₹3,000) join karna hai.${refSuffix}`;
      break;
    case "oneday_enrol":
      message = `Namaste ma'am, mujhe ${oneDayCourseName} (₹1,000) join karna hai.${refSuffix}`;
      break;
    case "question":
      message = `Namaste ma'am, course ke baare mein ek sawaal hai: ${customText || ""}`;
      break;
    case "offline":
      message =
        "Namaste ma'am, mujhe 3-month offline course ke baare mein jaankari chahiye aur demo class book karni hai.";
      break;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
}
