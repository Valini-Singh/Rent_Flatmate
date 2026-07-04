import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function OwnerDashboard() {
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [roomType, setRoomType] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [availableFrom, setAvailableFrom] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [listings, setListings] = useState<any[]>([]);

  const fetchListings = async () => {
  try {
    const res = await api.get("/listings/my-listings");
    setListings(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchListings();
}, []);

  const createListing = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/listings", {
        location,
        rent,
        roomType,
        furnished,
        availableFrom,
        imageUrl,
      });

      alert("Listing Created Successfully!");
      fetchListings();

      console.log(res.data);

      setLocation("");
      setRent("");
      setRoomType("");
      setFurnished(false);
      setAvailableFrom("");
      setImageUrl("");
    } catch (err: any) {
      console.log(err.response);
      alert(err.response?.data?.message || "Error creating listing");
    }
  };

  return (
    <div style={{ width: 500, margin: "40px auto" }}>
      <h1>Owner Dashboard</h1>
      <Link to="/owner/interests">
  <button>View Interest Requests</button>
</Link>

<br />
<br />

      <form onSubmit={createListing}>
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Rent"
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Room Type"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        />
        <br /><br />

        <label>
          Furnished
          <input
            type="checkbox"
            checked={furnished}
            onChange={(e) => setFurnished(e.target.checked)}
          />
        </label>

        <br /><br />

        <input
          type="date"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Create Listing
        </button>
      </form>
       <hr />

      <h2>My Listings</h2>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map((listing) => (
          <div
            key={listing.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{listing.location}</h3>

            <p>
              <strong>Rent:</strong> ₹{listing.rent}
            </p>

            <p>
              <strong>Room Type:</strong> {listing.roomType}
            </p>

            <p>
              <strong>Furnished:</strong>{" "}
              {listing.furnished ? "Yes" : "No"}
            </p>

            <p>
              <strong>Status:</strong> {listing.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}