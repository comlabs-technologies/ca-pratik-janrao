export type FirmLocation = {
  city: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export const firmLocations: FirmLocation[] = [
  {
    city: "Pune",
    title: "Pune",
    subtitle: "Our head office and main team, serving businesses across Pune and Maharashtra.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlM55Z7QvguzzG-mq32ZXNY2cTxuiZJxhTUW0YdtGg3R0-b1umfaMrNSvv&s=10",
    imageAlt: "Pune city skyline",
  },
  {
    city: "Dubai",
    title: "Dubai",
    subtitle: "Support for businesses with financial, tax and cross-border requirements in the UAE.",
    image:
      "https://plus.unsplash.com/premium_photo-1733317416241-d92ba6af4e51?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZHViYWl8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Dubai skyline at dusk",
  },
  {
    city: "Goa",
    title: "Goa",
    subtitle: "Professional support for founders, professionals and growing businesses in Goa and Western India.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvY0pWAspgvhx7cYmvOyqHt2OSrowKCvMgBDp_Q35WAA&s=10",
    imageAlt: "Goa coastal landscape",
  },
  {
    city: "Udaipur",
    title: "Udaipur",
    subtitle: "Accounting, tax and business support for clients across Udaipur and Rajasthan.",
    image: "https://www.andbeyond.com/wp-content/uploads/sites/5/udaipur.jpg",
    imageAlt: "Udaipur city and lake views",
  },
];
