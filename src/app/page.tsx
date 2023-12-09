import BeerMap from "@/components/beer-map";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <div className="h-32 p-4  z-10 relative">
        <Logo size={"64"} />
      </div>
      <BeerMap />
    </main>
  );
}
