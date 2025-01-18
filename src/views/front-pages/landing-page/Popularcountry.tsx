import React, { useState } from "react";
import Link from "next/link";
import frontCommonStyles from "@views/front-pages/styles.module.css";

// Mock data for countries and events
const countries = ["Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Bali"];
const events = [
  {
    id: 1,
    city: "Jakarta",
    title: "Webinar Study Abroad",
    date: "19 Jan 2025",
    price: "Rp49.900",
    organizer: "TransferWise",
    image: "https://placehold.co/150",
  },
  {
    id: 2,
    city: "Bandung",
    title: "Seni Walk For Art",
    date: "20 Jan 2025",
    price: "Rp30.000",
    organizer: "Art Bandung",
    image: "https://placehold.co/150",
  },
  {
    id: 3,
    city: "Jakarta",
    title: "Podcast Satu Persen",
    date: "19 Jan 2025",
    price: "Rp20.000",
    organizer: "Life Skills Indonesia",
    image: "https://placehold.co/150",
  },
  {
    id: 4,
    city: "Surabaya",
    title: "Anggota Bulanan Baca",
    date: "12 Jan 2025 - 19 Jan 2025",
    price: "Rp100.000",
    organizer: "Baca Di Tebet",
    image: "https://placehold.co/150",
  },
];

const PopularByCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Jakarta");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Filter events based on selected country
  const filteredEvents = events.filter(
    (event) => event.city === selectedCountry,
  );

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="plb-[20px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        {/* Dropdown Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
            onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown
          >
            <h3 style={{ margin: 0 }}>Populer di</h3>
            <h3 style={{ margin: 0, color: "purple" }}>{selectedCountry}</h3>
            <span style={{ fontSize: "18px" }}>▼</span>
          </div>
          <Link href="/explore" passHref>
            <span
              style={{
                color: "#6A5ACD",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Explore more events →
            </span>
          </Link>

          {/* Dropdown Search */}
          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                width: "300px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                zIndex: 100,
                padding: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Cari Lokasi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {filteredCountries.map((country, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCountry(country);
                      setDropdownOpen(false);
                      setSearchTerm(""); // Clear search term
                    }}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Event List */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // 4 items per row
            gap: "16px",
          }}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <h4 style={{ margin: "0 0 8px" }}>{event.title}</h4>
                <p style={{ margin: "0 0 4px", color: "#666" }}>{event.date}</p>
                <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>
                  {event.price}
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  {event.organizer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularByCountry;
