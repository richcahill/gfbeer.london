import BeerMap from "@/components/beer-map";
import Logo from "@/components/logo";
import type { bar } from "@/types/bar";
import { getGoogleSheetData } from "@/app/api/gsheets.ts/route";

async function getBars() {
  const data = await getGoogleSheetData();
  console.log(data);
}

export default async function Home() {
  let bars: bar[];
  try {
    bars = await getGoogleSheetData();
  } catch (error) {
    console.error("Error fetching bar data:", error);
    bars = []; // Fallback to an empty array or handle the error as needed
  }

  return (
    <main className="w-screen h-screen relative">
      <div className="h-32 p-4 z-10 relative flex items-start">
        <div className="hover:scale-110 hover:-rotate-2 transition-all block cursor-pointer">
          <Logo size={"64"} />
        </div>
      </div>
      <BeerMap bars={bars} />
    </main>
  );
}
