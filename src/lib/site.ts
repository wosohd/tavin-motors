export const siteConfig = {
  name: "Tavin Motors",
  shortName: "Tavin",
  description:
    "Premium vehicle sales, assisted car imports, local marketplace listings and professional auto-care services.",

  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "In Stock",
      href: "/vehicles",
    },
    {
      title: "Incoming",
      href: "/incoming",
    },
    {
      title: "Import a Car",
      href: "/import-a-car",
    },
    {
      title: "Marketplace",
      href: "/marketplace",
    },
    {
      title: "Auto Care",
      href: "/services",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
} as const;

export type MainNavItem = (typeof siteConfig.mainNav)[number];