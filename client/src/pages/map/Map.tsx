import { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import employeesStore from "../../stores/employees-store";

import styles from "./Map.module.scss";

interface Props {
  mapCall: string;
  onMapClick?: (data: any) => void | undefined;
  employeeMarker?: { lat: number; lng: number; address?: string };
}

const Map = ({ mapCall, onMapClick, employeeMarker }: Props) => {
  const [street, setStreet] = useState("");
  const mapContainer = useRef(null);
  const map: React.MutableRefObject<any> = useRef(null);
  const [zoom] = useState(14);
  const [marker, setMarker] = useState<maptilersdk.Marker | null>(null);

  const GEOCODER_BASE_URL = process.env.REACT_APP_GEOCODER_BASE_URL;

  const API_KEY: string = process.env.REACT_APP_MAP_API_KEY!;

  maptilersdk.config.apiKey = API_KEY;

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: [38.9772, 45.0353],
      zoom: zoom,
    });

    if (employeeMarker) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current!,
        style: maptilersdk.MapStyle.STREETS,
        center: [employeeMarker?.lng!, employeeMarker?.lat!],
        zoom: zoom,
      });
    }

    let newMarker: maptilersdk.Marker | null = null;
    let empMarker: maptilersdk.Marker | null = null;
    let allEmpMarkers: maptilersdk.Marker | null = null;

    if (mapCall === "page") {
      employeesStore.employees.map((emp) => {
        allEmpMarkers = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([emp.location?.lng!, emp.location?.lat!])
          .addTo(map!.current);
      });
    }

    if (employeeMarker) {
      empMarker = new maptilersdk.Marker({
        color: "#FF0000",
      })
        .setLngLat([employeeMarker?.lng!, employeeMarker?.lat!])
        .addTo(map!.current);
    }

    setStreet(employeeMarker?.address!);

    if (mapCall !== "page") {
      map.current.on("click", async (e: any) => {
        if (empMarker) {
          empMarker.remove();
        }
        const { lng, lat } = e.lngLat;

        if (newMarker) {
          newMarker.remove();
        }

        newMarker = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([lng, lat])
          .addTo(map!.current);

        const response = await fetch(
          `${GEOCODER_BASE_URL}q=${lat}+${lng}&key=${process.env.REACT_APP_GEOCODER_API_KEY}`
        );
        const data = await response.json();

        setStreet(data.results[0].formatted);

        if (onMapClick) {
          onMapClick!({ lng, lat, loc: data.results[0].formatted });
        }
      });
    }

    return () => {
      if (newMarker) {
        newMarker.remove();
      }
    };
  }, [zoom, marker]);

  return (
    <div
      className={mapCall === "page" ? styles.pageMapWrap : styles.modalMapWrap}
    >
      {mapCall === "page" ? (
        <>
          <h1>Map</h1> <p className={styles.address}>{street}</p>
        </>
      ) : (
        <p className={styles.address}>{street}</p>
      )}
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
};

export default Map;
