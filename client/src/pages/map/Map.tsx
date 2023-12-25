// @ts-nocheck
import { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import styles from "./Map.module.scss";
import employeesStore from "../../stores/employees-store";

interface Props {
  mapCall: string;
  onMapClick?: (data: any) => void | undefined;
  employeeMarker?: { lat: number; lng: number; address?: string };
}

export default function Map({ mapCall, onMapClick, employeeMarker }: Props) {
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
      center: [38.976, 45.0448],
      zoom: zoom,
    });

    let newMarker: maptilersdk.Marker | null = null;
    let empMarker: maptilersdk.Marker | null = null;
    let allEmpMarkers: maptilersdk.Marker | null = null;

    if (mapCall === "page") {
      employeesStore.loadEmployees();
      employeesStore.employees.map((emp) => {
        allEmpMarkers = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([emp.location?.lng!, emp.location?.lat!])
          .addTo(map!.current);
      });
    }

    if (employeeMarker) {
      empMarker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([employeeMarker?.lng!, employeeMarker?.lat!])
        .addTo(map!.current);
    }

    setStreet(employeeMarker?.address!);

    console.log(street);

    // Добавляем обработчик кликов на карту
    map.current.on("click", async (e: any) => {
      if (empMarker) {
        empMarker.remove();
      }
      const { lng, lat } = e.lngLat;

      // Удаляем предыдущий маркер, если он существует
      if (newMarker) {
        newMarker.remove();
      }

      // Создаем новый маркер на месте клика
      newMarker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .addTo(map!.current);

      // Получаем информацию о местоположении с использованием геокодера
      const response = await fetch(
        `${GEOCODER_BASE_URL}q=${lat}+${lng}&key=${process.env.REACT_APP_GEOCODER_API_KEY}`
      );
      const data = await response.json();

      setStreet(data.results[0].formatted);
      console.log("Geocoding data:", data);

      if (onMapClick) {
        onMapClick!({ lng, lat, loc: data.results[0].formatted });
      }
    });

    // Убираем маркер при размонтировании компонента
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
}
