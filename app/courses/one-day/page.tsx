import OneDayCoursePage, { generateMetadata } from "../[slug]/page";

export { generateMetadata };

export default async function Page() {
  return <OneDayCoursePage params={Promise.resolve({ slug: "one-day" })} />;
}
