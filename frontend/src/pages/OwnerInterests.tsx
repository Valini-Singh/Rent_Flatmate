import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OwnerInterests() {
  const [interests, setInterests] = useState<any[]>([]);

  const loadInterests = async () => {
    try {
      const res = await api.get("/interests");
      setInterests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadInterests();
  }, []);

  const accept = async (id: string) => {
    await api.patch(`/interests/${id}/accept`);
    loadInterests();
  };

  const decline = async (id: string) => {
    await api.patch(`/interests/${id}/decline`);
    loadInterests();
  };

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h1>Interest Requests</h1>

      {interests.map((interest) => (
        <div
          key={interest.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          <h3>{interest.listing.location}</h3>

          <p>Tenant: {interest.tenant.name}</p>

          <p>Status: {interest.status}</p>

          {interest.status === "PENDING" && (
            <>
          <button onClick={() => accept(interest.id)}>
            Accept
          </button>

          <button
            onClick={() => decline(interest.id)}
            style={{ marginLeft: "10px" }}
          >
            Decline
          </button>
          </>
          )}
        </div>
      ))}
    </div>
  );
}