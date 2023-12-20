import { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import styles from "./Map.module.scss";

interface Props {
  mapCall: string;
}

export default function Map({ mapCall }: Props) {
  const mapContainer = useRef(null);
  const map: React.MutableRefObject<maptilersdk.Map | null> = useRef(null);
  const krasnodar = { lng: 38.976, lat: 45.0448 };
  const [zoom] = useState(14);

  const apiKey: string = process.env.REACT_APP_MAP_API_KEY!;

  maptilersdk.config.apiKey = apiKey;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: [krasnodar.lng, krasnodar.lat],
      zoom: zoom,
    });

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([38.976, 45.0448])
      .addTo(map.current);
  }, [krasnodar.lng, krasnodar.lat, zoom]);

  return (
    <div
      className={mapCall === "page" ? styles.pageMapWrap : styles.modalMapWrap}
    >
      {mapCall === "page" ? <h1>Map</h1> : null}
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}
