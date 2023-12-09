import BeerMap from "@/components/beer-map";
import Logo from "@/components/logo";
import type { bar } from "@/types/bar";
import { getGoogleSheetData } from "@/utils/gsheets";

const dummyBars: bar[] = [
  {
    name: "The Coachmakers Arms",
    lat: 51.51712983648306,
    long: -0.15060431327103696,
    lastUpdated: "2021-09-01",
    onTap: true,
    onBottle: true,
  },
  {
    name: "Niche",
    lat: 51.52993804256535,
    long: -0.10547969598650535,
    lastUpdated: "2021-09-03",
    onTap: false,
    onBottle: true,
  },
];

async function getBars() {
  const data = await getGoogleSheetData();
  // TODO, you need to map this data to the bar type
  return data;
}

export default async function Home() {
  const barData = await getBars();
  console.log(barData);

  return (
    <main className="w-screen h-screen relative">
      <div className="h-32 p-4 z-10 relative flex items-start">
        <div className="hover:scale-110 hover:-rotate-2 transition-all block cursor-pointer">
          <Logo size={"64"} />
        </div>
      </div>
      <BeerMap bars={dummyBars} />
    </main>
  );
}
