export const calculateCompatibility = (
  tenant: any,
  listing: any
) => {
  let score = 50;
  let explanation = [];

  if (
    tenant.preferredLocation
      .toLowerCase()
      .includes(listing.location.toLowerCase())
  ) {
    score += 25;
    explanation.push("Preferred location matches.");
  }

  if (
    listing.rent >= tenant.budgetMin &&
    listing.rent <= tenant.budgetMax
  ) {
    score += 25;
    explanation.push("Rent fits tenant budget.");
  }

  return {
    score,
    explanation: explanation.join(" "),
  };
};