"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker issue (broken icons in Next.js)
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  });
}

export default function Map() {
  useEffect(() => {
    // Prevent initializing multiple maps (Fast Refresh issue)
    const existingMap = L.DomUtil.get("map");
    if (existingMap && (existingMap as any)._leaflet_id) {
      (existingMap as any)._leaflet_id = null;
    }

    const map = L.map("map").setView([23.8103, 90.4125], 12); // (Dhaka Coordinates, change yours)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    L.marker([23.733001279877623, 90.42425080852009])
      .addTo(map)
      .bindPopup("📍 Our Club's Location")
      .openPopup();

  }, []);

  return (
    <div
      id="map"
      className="w-full h-[400px] rounded-lg"
    ></div>
  );
}
