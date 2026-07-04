import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TenantDashboard() {
  const [listings, setListings] = useState<any[]>([]);

  const fetchListings = async () => {
    try {
      const res = await api.get("/listings");
      setListings(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load listings");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const expressInterest = async (listingId: string) => {
  try {
    await api.post("/interests", {
      listingId,
    });

    alert("Interest sent successfully!");
  } catch (err: any) {
    console.log(err.response);
    alert(err.response?.data?.message || "Failed to send interest");
  }
};

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h1>Tenant Dashboard</h1>

      {listings.length === 0 ? (
        <p>No Listings Available</p>
      ) : (
        listings.map((listing) => (
          <div
            key={listing.id}
            style={{
              border: "1px solid #888",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h2>{listing.location}</h2>

            <p><strong>Owner:</strong> {listing.owner.name}</p>

            <p><strong>Rent:</strong> ₹{listing.rent}</p>

            <p><strong>Room Type:</strong> {listing.roomType}</p>

            <p>
              <strong>Furnished:</strong>{" "}
              {listing.furnished ? "Yes" : "No"}
            </p>

            <p><strong>Status:</strong> {listing.status}</p>

            <button onClick={() => expressInterest(listing.id)}>
              Express Interest
            </button>
          </div>
        ))
      )}
    </div>
  );
}