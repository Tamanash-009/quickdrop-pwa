export const businessConfig = {
  name: "QuickDrop",
  tagline: "Hyperlocal Delivery in 30 Minutes",
  description: "QuickDrop provides ultra-fast 30-minute hyperlocal delivery of fresh groceries, fast food, dairy, and daily essentials across Salt Lake, New Town, Sector V, and Rajarhat in Kolkata.",
  url: "https://quickdrop-silk.vercel.app", // Will be updated to custom domain later
  logoUrl: "/apple-touch-icon.png",
  contact: {
    phone: "+917001055879",
    whatsapp: "917001055879",
    email: "qdrop5262@gmail.com",
    address: {
      street: "Village: Nischintapur / Purba Nischintapur",
      city: "Budge Budge",
      state: "West Bengal",
      postalCode: "700138",
      country: "IN",
      po: "Purba Nischintapur",
      district: "South 24 Parganas"
    },
    geo: {
      latitude: "22.4831", // Approximated for Budge Budge / Nischintapur
      longitude: "88.1633"
    },
    googlePlaceId: "",
    googleMapsUrl: "https://maps.google.com/?q=Nischintapur,Budge+Budge,South+24+Parganas,West+Bengal+700138",
    googleReviewUrl: ""
  },
  hours: {
    days: "Monday - Sunday",
    openTime: "08:00",
    closeTime: "20:00"
  },
  delivery: {
    charge: 25,
    averageTimeMins: 30,
    radiusKm: 10,
  },
  social: {
    facebook: "https://facebook.com/quickdrop",
    instagram: "https://instagram.com/quickdrop",
    twitter: "https://twitter.com/quickdrop"
  },
  deliveryAreas: [
    "Nischintapur",
    "Purba Nischintapur",
    "Budge Budge",
    "South 24 Parganas"
  ]
};
