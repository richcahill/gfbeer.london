// beer-map.tsx
"use client";
import { Beer, Milk } from "lucide-react";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { bar } from "@/types/bar";

export default function BeerMap({ bars }: { bars?: bar[] }) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  return (
    <div className={"w-screen h-screen absolute inset-0 z-0"}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: 51.5073,
          longitude: -0.12755,
          zoom: 10,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        maxZoom={20}
        minZoom={3}
        attributionControl={false}
        logoPosition="bottom-right"
      >
        <GeolocateControl position="bottom-left" />
        {bars?.map((bar, i) => {
          return (
            <Marker key={i} latitude={bar.lat} longitude={bar.long}>
              <div className={" p-2 rounded-full hover:scale-105 text-xl"}>
                {bar.onTap ? <Beer /> : bar.onBottle && <Milk />}
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
