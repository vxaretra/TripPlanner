import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

export default function TripFormMap({ show, setShow }) {
  return (
    <div
      className={`fixed overflow-hidden inset-0 z-30 h-screen w-full bg-gray-500 bg-opacity-35 flex justify-center items-center ${
        show ? "" : "-translate-x-full"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShow(false);
        }
      }}
    >
      <div className="w-full max-w-2xl h-[90vh] z-31 bg-white rounded-lg p-4 flex">
        <MapContainer
          className="w-full grow rounded-lg"
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CenterMarker />
          <RecenterView />
          <PickButton />
        </MapContainer>
      </div>
    </div>
  );
}

function CenterMarker() {
  const map = useMap();
  const [position, setPosition] = useState(map.getCenter());
  useMapEvents({
    move() {
      setPosition(map.getCenter());
    },
  });

  return <Marker position={position} />;
}

function RecenterView() {
  const map = useMap();
  const { getValues, selectedPlace } = useFormContext();
  useEffect(() => {
    if (selectedPlace === null) {
      return;
    }

    const coordinate = getValues(`${selectedPlace}.coordinate`);
    if (coordinate === null) {
      return;
    }
    map.panTo(coordinate);
  }, [map, selectedPlace, getValues]);
}

function PickButton() {
  const map = useMap();
  const { setValue, selectedPlace, setShowMap } = useFormContext();
  function onClick() {
    if (selectedPlace === null) {
      return;
    }

    setValue(`${selectedPlace}.coordinate`, map.getCenter());
    setShowMap(false);
  }

  return (
    <div className="leaflet-bottom left-1/2 -translate-x-1/2">
      <div className="leaflet-control">
        <Button onClick={onClick}>Pick</Button>
      </div>
    </div>
  );
}
