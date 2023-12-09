import BeerMap from "@/components/beer-map";

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <div className="h-16 p-4 bg-blue-200 z-10 relative"></div>
      <BeerMap />
    </main>
  );
}
