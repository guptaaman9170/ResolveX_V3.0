import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import ReactDOMServer from "react-dom/server";
import { FaTrash } from "react-icons/fa";
import { IoWater } from "react-icons/io5";

/* ================= ICON DEFINITIONS ================= */

const wasteIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    <FaTrash style={{ color: "#22c55e", fontSize: "24px" }} />
  ),
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const waterIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    <IoWater style={{ color: "#3b82f6", fontSize: "24px" }} />
  ),
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

/* ================= COMPONENT ================= */

const LiveEnvironmentalMap = () => {
 const center = [26.8246, 75.8657];


  const wasteReports = [
    {
      id: 1,
      position: [26.8246, 75.8657],
      description: "Garbage accumulation near SGVU main gate",
    },
    {
      id: 2,
      position: [26.8271, 75.8689],
      description: "Overflowing dustbins near SGVU hostel area",
    },
    {
      id: 3,
      position: [26.8219, 75.8623],
      description: "Plastic waste along Mahal Road",
    },
    {
      id: 4,
      position: [26.8293, 75.8641],
      description: "Waste dumping near Jagatpura extension",
    },
    {
      id: 5,
      position: [26.8232, 75.8704],
      description: "Unmanaged roadside waste near SGVU parking",
    },
  ];

  /* 🔵 Water Reports — SGVU Area */
  const waterReports = [
    {
      id: 1,
      position: [26.8264, 75.8672],
      description: "Contaminated water reported near academic block",
    },
    {
      id: 2,
      position: [26.8228, 75.8639],
      description: "High TDS water found in nearby residential area",
    },
    {
      id: 3,
      position: [26.8286, 75.8618],
      description: "Pipeline leakage near Jagatpura road",
    },
    {
      id: 4,
      position: [26.8209, 75.8665],
      description: "Strange odor in tap water near SGVU hostels",
    },
    {
      id: 5,
      position: [26.8257, 75.8713],
      description: "Water discoloration near local shops outside SGVU",
    },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Floating Legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-gray-200 px-4 py-3 text-sm">
        <h3 className="font-semibold text-gray-800 mb-2 text-center">
          Legend
        </h3>
        <div className="flex items-center gap-2 mb-1">
          <FaTrash style={{ color: "#22c55e" }} />
          <span className="text-gray-700">Waste Reports</span>
        </div>
        <div className="flex items-center gap-2">
          <IoWater style={{ color: "#3b82f6" }} />
          <span className="text-gray-700">Water Reports</span>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={14}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Waste Cluster */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) =>
            L.divIcon({
              html: `<div style="
                background-color:#22c55e;
                color:white;
                border-radius:50%;
                width:38px;
                height:38px;
                display:flex;
                align-items:center;
                justify-content:center;
                border:2px solid white;
                font-weight:bold;">
                ${cluster.getChildCount()}
              </div>`,
              iconSize: [38, 38],
            })
          }
        >
          {wasteReports.map((report) => (
            <Marker
              key={`waste-${report.id}`}
              position={report.position}
              icon={wasteIcon}
            >
              <Tooltip>
                <b className="text-green-600">Waste Issue</b>
                <p>{report.description}</p>
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* Water Cluster */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) =>
            L.divIcon({
              html: `<div style="
                background-color:#3b82f6;
                color:white;
                border-radius:50%;
                width:38px;
                height:38px;
                display:flex;
                align-items:center;
                justify-content:center;
                border:2px solid white;
                font-weight:bold;">
                ${cluster.getChildCount()}
              </div>`,
              iconSize: [38, 38],
            })
          }
        >
          {waterReports.map((report) => (
            <Marker
              key={`water-${report.id}`}
              position={report.position}
              icon={waterIcon}
            >
              <Tooltip>
                <b className="text-blue-600">Water Quality Issue</b>
                <p>{report.description}</p>
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default LiveEnvironmentalMap;
