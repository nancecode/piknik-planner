import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import Button from "../components/Button";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 45.5017,
  lng: -73.5673,
};

const libraries = ["places"];

const ParksPage = () => {
  const [parks, setParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(true);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/parks");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setParks(data);
        setFilteredParks(data);
      } catch (err) {
        console.error("Error fetching parks:", err.message);
      }
    };

    fetchParks();
  }, []);

  const handleSearch = () => {
    const cleanedQuery = query.replace(/\s+/g, "").toUpperCase();
    const results = parks.filter((park) =>
      park.postalCode?.replace(/\s+/g, "").toUpperCase().includes(cleanedQuery)
    );

    if (results.length > 0) {
      const selected = results[0];
      setFilteredParks(results);
      setSelectedPark(selected);
      setShowAll(false);

      if (
        mapRef.current &&
        selected?.location?.lat != null &&
        selected?.location?.lng != null
      ) {
        const newCenter = {
          lat: selected.location.lat,
          lng: selected.location.lng,
        };

        mapRef.current.setCenter(newCenter);
        setTimeout(() => {
          mapRef.current.setZoom(15);
        }, 300);
      }
    } else {
      setFilteredParks([]);
      setSelectedPark(null);
    }
  };

  const handleReset = () => {
    setQuery("");
    setFilteredParks(parks);
    setSelectedPark(null);
    setShowAll(true);

    if (mapRef.current) {
      mapRef.current.setCenter(defaultCenter);
      mapRef.current.setZoom(12);
    }
  };

  const handleToggleAll = () => {
    setFilteredParks(parks);
    setSelectedPark(null);
    setShowAll(true);

    if (mapRef.current) {
      mapRef.current.setCenter(defaultCenter);
      mapRef.current.setZoom(12);
    }
  };

  if (loadError) return <p>❌ Failed to load Google Maps: {loadError.message}</p>;
  if (!isLoaded) return <p>⏳ Loading map...</p>;

  return (
    <PageWrapper>
      <h1>Top-Rated Parks in Montreal</h1>

      <SearchContainer>
        <SearchBar
          type="text"
          placeholder="Search by postal code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleReset} bg="#ccc" color="#000">
          Reset
        </Button>
        {!showAll && (
          <Button onClick={handleToggleAll} bg="#ddd" color="#000">
            Show All Parks
          </Button>
        )}
      </SearchContainer>

      <MapContainer>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={12}
          onLoad={(map) => (mapRef.current = map)}
        >
          {filteredParks.map((park, idx) =>
            park.location?.lat != null && park.location?.lng != null ? (
              <Marker
                key={idx}
                position={{
                  lat: park.location.lat,
                  lng: park.location.lng,
                }}
                onClick={() => setSelectedPark(park)}
              />
            ) : null
          )}

          {selectedPark?.location?.lat != null &&
            selectedPark?.location?.lng != null && (
              <InfoWindow
                position={{
                  lat: selectedPark.location.lat,
                  lng: selectedPark.location.lng,
                }}
                onCloseClick={() => setSelectedPark(null)}
              >
                <div>
                  <h3 style={{ color: "red" }}>{selectedPark.name}</h3>
                  <p>⭐ {selectedPark.rating}</p>
                  <p>{selectedPark.description}</p>
                  <p>
                    <strong>BBQ Type:</strong> {selectedPark.bbqType || "N/A"}
                  </p>
                  <p>
                    <strong>Built-In BBQs:</strong>{" "}
                    {selectedPark.hasBuiltInBBQ ? "✅ Yes" : "❌ No"}
                  </p>
                  <p>
                    <strong>Amenities:</strong>{" "}
                    {selectedPark.amenities?.join(", ") || "None listed"}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {selectedPark.postalCode}
                  </p>
                  <p>
                    <strong>Opening Hours:</strong> {selectedPark.openingHours}
                  </p>
                </div>
              </InfoWindow>
            )}
        </GoogleMap>
      </MapContainer>

      <ScrollContainer>
        <ListWrapper>
          {filteredParks.map((park, idx) => (
            <ParkCard key={idx}>
              <ParkTitle>{park.name}</ParkTitle>
              <p>
                <strong>Rating:</strong> {park.rating} ⭐
              </p>
              <p>
                <strong>Description:</strong> {park.description}
              </p>
              <p>
                <strong>BBQ Type:</strong> {park.bbqType || "N/A"}
              </p>
              <p>
                <strong>Built-In BBQs:</strong>{" "}
                {park.hasBuiltInBBQ ? "✅ Yes" : "❌ No"}
              </p>
              <p>
                <strong>Amenities:</strong>{" "}
                {park.amenities?.join(", ") || "None listed"}
              </p>
              <p>
                <strong>Postal Code:</strong> {park.postalCode}
              </p>
              <p>
                <strong>Opening Hours:</strong> {park.openingHours}
              </p>
            </ParkCard>
          ))}
          {filteredParks.length === 0 && (
            <p>No parks found for that postal code.</p>
          )}
        </ListWrapper>
      </ScrollContainer>
    </PageWrapper>
  );
};

export default ParksPage;

// Styled Components
const PageWrapper = styled.div`
  background: #fefbe9;
  padding: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.input`
  padding: 0.75rem 1rem;
  width: 100%;
  max-width: 300px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
`;

const ScrollContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ListWrapper = styled.div`
  padding-right: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ParkCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: rgb(199, 218, 200);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

const ParkTitle = styled.h3`
  color: red;
  margin-bottom: 0.5rem;
`;
