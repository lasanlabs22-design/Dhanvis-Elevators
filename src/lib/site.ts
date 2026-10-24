/**
 * Single source of truth for all business content.
 * Anything marked "CONFIRM" should be verified with the client before launch.
 */

import { siteUrl } from "./siteUrl";

export const site = {
  name: "Dhanvis Elevators Pvt Ltd",
  shortName: "Dhanvis Elevators",
  description:
    "Dhanvis Elevators Pvt Ltd installs, services and modernises all types of lifts across Andhra Pradesh, from its base in Tirupati: home lifts, passenger elevators, hospital, goods, capsule, hydraulic and MRL lifts, with AMC and 24/7 breakdown support.",
  url: siteUrl,
  phone: "+91 98493 18445",
  phoneHref: "tel:+919849318445",
  whatsapp: "919849318445",
  address: {
    street: "5-81, Ganganagunta, Chiguruwada",
    locality: "North Kandriga, Tirupati Rural Mandal",
    city: "Tirupati",
    district: "Tirupati District",
    state: "Andhra Pradesh",
    pin: "517507",
    country: "IN",
  },
  mapsQuery: "5-81 Ganganagunta Chiguruwada North Kandriga Tirupati Rural Andhra Pradesh 517507",
  socials: {
    instagram: "https://www.instagram.com/dhanvis_elevators_pvtltd",
  },
  showreel: {
    // Drop an MP4 into /public/videos and set its path here, e.g. "/videos/showreel.mp4".
    // Or set a YouTube video id. When neither is set, the reel plays as a cinematic photo story.
    videoSrc: "" as string,
    youtubeId: "" as string,
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.district}, ${site.address.state} ${site.address.pin}`;

export const whatsappLink = (text = "Hello Dhanvis Elevators, I'd like to enquire about a lift.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=14&output=embed`;

/** Every section is a "floor". Drives the floor indicator, nav and headings. */
export const floors = [
  { id: "lobby", floor: "G", label: "Lobby" },
  { id: "about", floor: "1", label: "About" },
  { id: "lifts", floor: "2", label: "Lift Range" },
  { id: "demo", floor: "3", label: "Live Demo" },
  { id: "showreel", floor: "4", label: "Showreel" },
  { id: "services", floor: "5", label: "Services" },
  { id: "process", floor: "6", label: "Process" },
  { id: "craft", floor: "7", label: "Craftsmanship" },
  { id: "safety", floor: "8", label: "Safety" },
  { id: "faq", floor: "9", label: "FAQ" },
  { id: "contact", floor: "10", label: "Contact" },
] as const;

export type FloorId = (typeof floors)[number]["id"];

export const floorOf = (id: FloorId) => floors.find((f) => f.id === id)!;

export const navLinks: { id: FloorId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "lifts", label: "Lifts" },
  { id: "services", label: "Services" },
  { id: "demo", label: "Live Demo" },
  { id: "craft", label: "Our Work" },
  { id: "contact", label: "Contact" },
];

// CONFIRM: headline figures with the client
export const stats = [
  { value: 12, suffix: "", label: "Lift categories installed" },
  { value: 24, suffix: "/7", label: "Breakdown support" },
  { value: 100, suffix: "%", label: "Load-tested before handover" },
];

// CONFIRM: "commercial" and "platform" were added as likely offerings. Check with the client.
// Order matters: on desktop these fill a 6 × 2 grid row by row.
export const liftTypes = [
  {
    key: "home",
    title: "Home Lifts",
    desc: "Compact, quiet lifts for villas, duplexes and independent homes.",
    tags: ["Villas", "Duplex"],
    image: "lift-home",
  },
  {
    key: "passenger",
    title: "Passenger Lifts",
    desc: "Smooth, reliable lifts for apartments and residential towers.",
    tags: ["Apartments", "Towers"],
    image: "lift-passenger",
  },
  {
    key: "commercial",
    title: "Commercial Lifts",
    desc: "High-traffic lifts for offices, malls and hotels.",
    tags: ["Offices", "Malls", "Hotels"],
    image: "lift-commercial",
  },
  {
    key: "capsule",
    title: "Capsule & Glass Lifts",
    desc: "Panoramic glass cabins that turn the ride into a view.",
    tags: ["Atriums", "Showrooms"],
    image: "lift-capsule",
  },
  {
    key: "hospital",
    title: "Hospital Lifts",
    desc: "Stretcher-size cabins with gentle, precise levelling.",
    tags: ["Hospitals", "Clinics"],
    image: "lift-hospital",
  },
  {
    key: "goods",
    title: "Goods Lifts",
    desc: "Heavy-duty freight lifts for warehouses and factories.",
    tags: ["Warehouses", "Factories"],
    image: "lift-goods",
  },
  {
    key: "structural",
    title: "Structural Shaft Lifts",
    desc: "Steel, ACP-clad shafts that add a lift to existing buildings.",
    tags: ["Retrofit", "ACP clad"],
    image: "lift-structural",
  },
  {
    key: "mrl",
    title: "MRL Lifts",
    desc: "Machine-room-less design that saves space and cost.",
    tags: ["Space saving", "Efficient"],
    image: "lift-mrl",
  },
  {
    key: "hydraulic",
    title: "Hydraulic Lifts",
    desc: "Ideal for low-rise buildings with limited headroom.",
    tags: ["Low-rise", "No headroom"],
    image: "lift-hydraulic",
  },
  {
    key: "car",
    title: "Car Parking Lifts",
    desc: "Vehicle lifts for stacked and basement parking.",
    tags: ["Basements", "Showrooms"],
    image: "lift-car",
  },
  {
    key: "platform",
    title: "Platform & Wheelchair Lifts",
    desc: "Step-free access for homes, clinics and public buildings.",
    tags: ["Accessibility", "Low-rise"],
    image: "lift-platform",
  },
  {
    key: "dumbwaiter",
    title: "Dumbwaiters",
    desc: "Service lifts for kitchens, restaurants and hospitals.",
    tags: ["Hotels", "Restaurants"],
    image: "lift-dumbwaiter",
  },
] as const;

export const services = [
  {
    title: "New Lift Installation",
    desc: "End-to-end installation for new and existing buildings: shaft design, machine, cabin, controls and commissioning.",
  },
  {
    title: "AMC & Preventive Maintenance",
    desc: "Scheduled inspections, lubrication and adjustments that keep your lift safe, silent and running for years.",
  },
  {
    title: "24/7 Breakdown & Repairs",
    desc: "Call us any time. Our technicians diagnose fast and carry the parts to get you moving again.",
  },
  {
    title: "Modernisation & Upgrades",
    desc: "Replace ageing controllers, drives, doors and cabins to bring older lifts up to modern performance and safety.",
  },
  {
    title: "Custom Cabin Interiors",
    desc: "Gold and mirror finishes, laser-cut ceilings, glass doors and designer panels, so the cabin matches your building.",
  },
  {
    title: "Safety Audits & Licensing Support",
    desc: "Load tests, safety-device checks and the documentation you need for lift licensing and renewals.",
  },
] as const;

export const process = [
  {
    title: "Site survey",
    desc: "We visit, measure the shaft or space, and understand how the lift will be used.",
  },
  {
    title: "Design & proposal",
    desc: "A clear recommendation on lift type, capacity, finishes and a transparent quotation.",
  },
  {
    title: "Manufacturing",
    desc: "Machine, controller, cabin and doors are prepared to your exact specification.",
  },
  {
    title: "Installation",
    desc: "Our trained team installs the rails, machine, cabin and wiring on schedule and leaves the site clean.",
  },
  {
    title: "Testing & handover",
    desc: "Load tests, safety checks and a walkthrough so everyone knows how their lift works.",
  },
  {
    title: "Lifetime care",
    desc: "AMC plans and responsive breakdown support for the life of your lift.",
  },
] as const;

export const safety = [
  {
    key: "ard",
    title: "Automatic Rescue Device",
    desc: "During a power cut, the car moves to the nearest floor and opens its doors automatically.",
  },
  {
    key: "overload",
    title: "Overload Protection",
    desc: "Load sensors stop the lift from moving when the rated capacity is exceeded.",
  },
  {
    key: "curtain",
    title: "Infrared Door Curtain",
    desc: "A full-height light curtain reopens the doors the moment anyone is in the way.",
  },
  {
    key: "alarm",
    title: "Emergency Alarm & Intercom",
    desc: "Passengers can raise the alarm and talk to the outside at the press of a button.",
  },
  {
    key: "governor",
    title: "Governor & Safety Gear",
    desc: "Mechanical over-speed protection that grips the guide rails if the car ever moves too fast.",
  },
  {
    key: "vvvf",
    title: "VVVF Drive",
    desc: "Variable-frequency control for smooth starts, precise levelling and lower power bills.",
  },
  {
    key: "light",
    title: "Emergency Light & Fan",
    desc: "Battery-backed lighting and ventilation keep the cabin comfortable in any situation.",
  },
  {
    key: "certified",
    title: "Tested at Handover",
    desc: "Every lift is load-tested and safety-checked before it carries a single passenger.",
  },
] as const;

/** Real Dhanvis installations (client photos). */
export const gallery = [
  {
    key: "gold-entrance",
    title: "Gold-finish glass landing doors",
    caption: "Mirror-gold frames and glass doors set into a marble surround.",
  },
  {
    key: "shaft-exterior",
    title: "External structural shaft",
    caption: "A steel shaft clad in ACP, adding a lift to an existing building.",
  },
  {
    key: "lotus-ceiling",
    title: "Laser-cut lotus ceiling",
    caption: "Precision-cut stainless panels, backlit for a soft, even glow.",
  },
  {
    key: "car-panel",
    title: "Touch car operating panel",
    caption: "Black-glass COP with floor display, rated for 4 persons / 272 kg.",
  },
] as const;

/** Showreel chapters (stock photography). */
export const reel = [
  {
    key: "reel-lobby",
    title: "Welcoming lobbies",
    caption: "Warm light, brushed steel and doors that glide open without a sound.",
  },
  {
    key: "reel-tower",
    title: "Apartments & high-rises",
    caption: "Dependable passenger lifts sized for every tower and traffic level.",
  },
  {
    key: "reel-villa",
    title: "Homes & duplexes",
    caption: "Compact home lifts that slot neatly into modern interiors.",
  },
  {
    key: "reel-door",
    title: "Doors in any finish",
    caption: "Stainless, gold, glass or a bold colour, matched to your design.",
  },
  {
    key: "reel-panel",
    title: "Fixtures that feel right",
    caption: "Buttons, displays and panels designed to be read at a glance.",
  },
] as const;

export const faqs = [
  {
    q: "Can a lift be installed in an existing building?",
    a: "Yes. Where there is no shaft, we build a self-supporting steel structure (inside a stairwell or outside the building) and clad it in ACP or glass. Most homes and older apartments can take a lift with little civil work.",
  },
  {
    q: "How much space does a home lift need?",
    a: "Compact home lifts can fit in a surprisingly small footprint. The exact size depends on the number of passengers and the lift type, so we always start with a free site survey and measurement.",
  },
  {
    q: "What happens if the power goes off while I'm inside?",
    a: "With an Automatic Rescue Device (ARD), the lift moves to the nearest floor on battery power and opens its doors. The cabin also has emergency lighting and an alarm.",
  },
  {
    q: "How long does installation take?",
    a: "It depends on the lift type and whether the shaft is ready. A home lift in a prepared shaft is typically a matter of weeks; we give you a clear schedule with the proposal.",
  },
  {
    q: "What is included in an AMC?",
    a: "Regular preventive maintenance visits, safety checks, lubrication, adjustments and priority breakdown support. Comprehensive plans can also cover spare parts.",
  },
  {
    q: "Do you service lifts installed by other companies?",
    a: "Yes. We maintain, repair and modernise lifts of most makes. Call us with your lift details and we'll arrange an inspection.",
  },
] as const;
