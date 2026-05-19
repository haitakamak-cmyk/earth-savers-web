"use client";

import L from "leaflet";
import Link from "next/link";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import {
  CATEGORY_META,
  hrefForMapCaseTopic,
  MAP_CASES,
  type MapCase,
} from "@/lib/map-cases";

import "leaflet/dist/leaflet.css";

const JAPAN_CENTER: L.LatLngExpression = [36.5, 137.0];
const INITIAL_ZOOM = 5;

function createCategoryIcon(hex: string): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="${hex}" stroke="#fff" stroke-width="2"/>
    </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}

function CasePopupContent({ caseItem }: { caseItem: MapCase }) {
  const meta = CATEGORY_META[caseItem.category];
  return (
    <div className="min-w-[200px] max-w-[260px] text-sm text-text-primary">
      <p className="text-xs text-text-muted">
        {caseItem.sectionRef} · {caseItem.prefecture}
        {caseItem.city}
      </p>
      <p className="mt-1 font-semibold leading-snug">{caseItem.title}</p>
      <p className="mt-1 inline-block rounded bg-wakakusa-light/50 px-2 py-0.5 text-xs text-wakakusa-dark">
        {caseItem.status}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-text-secondary">{caseItem.summary}</p>
      <p className="mt-1 text-[11px] text-text-muted">{meta.label}</p>
      <Link
        href={hrefForMapCaseTopic(caseItem)}
        className="mt-3 inline-block text-sm font-medium text-wakakusa-dark underline-offset-2 hover:underline"
      >
        事例集で詳しく読む →
      </Link>
    </div>
  );
}

function CaseMarker({ caseItem }: { caseItem: MapCase }) {
  const icon = useMemo(
    () => createCategoryIcon(CATEGORY_META[caseItem.category].hex),
    [caseItem.category],
  );

  return (
    <Marker position={[caseItem.lat, caseItem.lng]} icon={icon}>
      <Popup>
        <CasePopupContent caseItem={caseItem} />
      </Popup>
    </Marker>
  );
}

function MapLegend() {
  return (
    <div
      className="pointer-events-none absolute bottom-4 left-4 z-[1000] rounded-lg border border-wakakusa/25 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm"
      aria-label="凡例"
    >
      <p className="mb-1.5 text-xs font-semibold text-text-primary">凡例</p>
      <ul className="space-y-1">
        {(Object.keys(CATEGORY_META) as MapCase["category"][]).map((key) => {
          const meta = CATEGORY_META[key];
          return (
            <li key={key} className="flex items-center gap-2 text-xs text-text-secondary">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: meta.hex }}
              />
              {meta.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function NationalMap() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-xl border border-wakakusa/25 sm:h-[70vh]">
      <MapContainer
        center={JAPAN_CENTER}
        zoom={INITIAL_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {MAP_CASES.map((caseItem) => (
          <CaseMarker key={caseItem.id} caseItem={caseItem} />
        ))}
      </MapContainer>
      <MapLegend />
    </div>
  );
}
