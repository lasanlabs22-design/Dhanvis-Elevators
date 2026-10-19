import type { StaticImageData } from "next/image";

// Client photos: real Dhanvis installations, used in the "Our Work" gallery
import carPanel from "@/assets/car-panel.jpg";
import goldEntrance from "@/assets/gold-entrance.jpg";
import lotusCeiling from "@/assets/lotus-ceiling.jpg";
import shaftExterior from "@/assets/shaft-exterior.jpg";

// Stock photography from Pexels (free for commercial use). Sources in src/assets/stock/CREDITS.md
import glassAtriumLift from "@/assets/stock/glass-atrium-lift.jpg";
import handPanel from "@/assets/stock/hand-panel.jpg";
import heroCabin from "@/assets/stock/hero-cabin.jpg";
import liftCapsule from "@/assets/stock/lift-capsule.jpg";
import liftCar from "@/assets/stock/lift-car.jpg";
import liftCommercial from "@/assets/stock/lift-commercial.jpg";
import liftDumbwaiter from "@/assets/stock/lift-dumbwaiter.jpg";
import liftGoods from "@/assets/stock/lift-goods.jpg";
import liftHome from "@/assets/stock/lift-home.jpg";
import liftHospital from "@/assets/stock/lift-hospital.jpg";
import liftHydraulic from "@/assets/stock/lift-hydraulic.jpg";
import liftMrl from "@/assets/stock/lift-mrl.jpg";
import liftPassenger from "@/assets/stock/lift-passenger.jpg";
import liftPlatform from "@/assets/stock/lift-platform.jpg";
import liftStructural from "@/assets/stock/lift-structural.jpg";
import panelBrass from "@/assets/stock/panel-brass.jpg";
import reelDoor from "@/assets/stock/reel-door.jpg";
import reelLobby from "@/assets/stock/reel-lobby.jpg";
import reelPanel from "@/assets/stock/reel-panel.jpg";
import reelTower from "@/assets/stock/reel-tower.jpg";
import reelVilla from "@/assets/stock/reel-villa.jpg";

export const images: Record<string, StaticImageData> = {
  "car-panel": carPanel,
  "gold-entrance": goldEntrance,
  "lotus-ceiling": lotusCeiling,
  "shaft-exterior": shaftExterior,

  "glass-atrium-lift": glassAtriumLift,
  "hand-panel": handPanel,
  "hero-cabin": heroCabin,
  "panel-brass": panelBrass,
  "lift-capsule": liftCapsule,
  "lift-car": liftCar,
  "lift-commercial": liftCommercial,
  "lift-dumbwaiter": liftDumbwaiter,
  "lift-goods": liftGoods,
  "lift-home": liftHome,
  "lift-hospital": liftHospital,
  "lift-hydraulic": liftHydraulic,
  "lift-mrl": liftMrl,
  "lift-passenger": liftPassenger,
  "lift-platform": liftPlatform,
  "lift-structural": liftStructural,
  "reel-door": reelDoor,
  "reel-lobby": reelLobby,
  "reel-panel": reelPanel,
  "reel-tower": reelTower,
  "reel-villa": reelVilla,
};

export const imageAlt: Record<string, string> = {
  "car-panel": "Dhanvis black-glass car operating panel with red floor display",
  "gold-entrance": "Gold-finish glass lift doors in a marble lobby installed by Dhanvis Elevators",
  "lotus-ceiling": "Laser-cut lotus pattern lift cabin ceiling",
  "shaft-exterior": "External ACP-clad structural lift shaft added to an existing building",

  "glass-atrium-lift": "Glass panoramic lift rising through a modern atrium",
  "hand-panel": "Hand pressing a floor button on a lift control panel",
  "hero-cabin": "Premium lift cabin with warm lighting and polished steel doors",
  "panel-brass": "Brass lift control panel with illuminated floor buttons",
  "lift-capsule": "Capsule lifts gliding along gold rails",
  "lift-car": "Car parked in a basement parking garage",
  "lift-commercial": "Glass lifts in a shopping mall atrium beside curved staircases",
  "lift-dumbwaiter": "Chef working in a professional restaurant kitchen",
  "lift-goods": "Site supervisor in a high-visibility vest inside a warehouse",
  "lift-home": "Luxury villa interior with a sculptural spiral staircase",
  "lift-hospital": "Spacious, brightly lit lift cabin with handrails",
  "lift-hydraulic": "Low-rise building against a clear blue sky",
  "lift-mrl": "Modern lift entrance with open stainless steel doors",
  "lift-passenger": "Row of stainless steel passenger lifts in a hotel lobby",
  "lift-platform": "Wheelchair user in a modern, step-free interior",
  "lift-structural": "Steel-framed glass lift shaft under a skylight",
  "reel-door": "Bright yellow lift doors in a modern building",
  "reel-lobby": "Warmly lit lift entrance in an office lobby",
  "reel-panel": "Illuminated lift floor buttons",
  "reel-tower": "Modern residential high-rise against a blue sky",
  "reel-villa": "Modern villa hallway with staircase and open kitchen",
};
