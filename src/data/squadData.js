// Parsed and structured data from readme.md

export const animals = [
  {
    id: 1,
    name: "Bat",
    role: "Aerial Recon",
    emoji: "🦇",
    color: "#00d4ff",
    mission: "Navigates pitch-black voids using echolocation to locate air pockets & survivors.",
    stats: { speed: 85, detection: 98, strength: 20, mobility: 90 },
    workspace: "Echo-Chamber Ceiling",
  },
  {
    id: 2,
    name: "Cockroach",
    role: "Deep Rubble Scout",
    emoji: "🪳",
    color: "#a3e635",
    mission: "Enters collapsed slabs no other member can reach. Immune to toxins and dust.",
    stats: { speed: 60, detection: 70, strength: 15, mobility: 95 },
    workspace: "Glass Conduit Tunnels",
  },
  {
    id: 3,
    name: "Elephant",
    role: "Heavy Extraction & Triage",
    emoji: "🐘",
    color: "#ff6b00",
    mission: "Lifts concrete beams and calms survivors with empathy-driven psychological triage.",
    stats: { speed: 30, detection: 65, strength: 100, mobility: 40 },
    workspace: "Reinforced Concrete Slabs",
  },
  {
    id: 4,
    name: "Dolphin",
    role: "Aquatic Lead",
    emoji: "🐬",
    color: "#38bdf8",
    mission: "Searches flooded basements & tunnels using sonar to see through murky water.",
    stats: { speed: 80, detection: 92, strength: 50, mobility: 70 },
    workspace: "Triage Bay Water Tank",
  },
  {
    id: 5,
    name: "Starfish",
    role: "Multi-Directional Medic",
    emoji: "⭐",
    color: "#f9a8d4",
    mission: "Climbs vertical and inverted rubble. Regenerates lost limbs to stay in the field.",
    stats: { speed: 25, detection: 55, strength: 40, mobility: 88 },
    workspace: "Rubble Surfaces",
  },
  {
    id: 6,
    name: "Wolf",
    role: "Tactical Coordinator",
    emoji: "🐺",
    color: "#c084fc",
    mission: "Manages information flow and coordinates the team to cover the grid efficiently.",
    stats: { speed: 90, detection: 88, strength: 60, mobility: 85 },
    workspace: "Command Center",
  },
  {
    id: 7,
    name: "Beaver",
    role: "Structural Engineer",
    emoji: "🦫",
    color: "#fb923c",
    mission: "Builds emergency wooden shoring to prevent further collapse of structures.",
    stats: { speed: 45, detection: 40, strength: 78, mobility: 55 },
    workspace: "Base of Rubble",
  },
];

export const workspaceHotspots = [
  {
    id: "bat",
    animal: "Bat",
    emoji: "🦇",
    zone: "Echo-Chamber Ceiling",
    description: "Sound-dampening ceiling with roosting bars — zero noise interference.",
    position: { top: "8%", left: "50%" },
    color: "#00d4ff",
  },
  {
    id: "cockroach",
    animal: "Cockroach",
    emoji: "🪳",
    zone: "Glass Conduit Tunnels",
    description: "Transparent micro-tunnels inside walls for instant room-to-room transit.",
    position: { top: "45%", left: "15%" },
    color: "#a3e635",
  },
  {
    id: "dolphin",
    animal: "Dolphin",
    emoji: "🐬",
    zone: "Triage Bay Water Tank",
    description: "10m deep filtered tank — vibration comms with the team.",
    position: { top: "55%", left: "75%" },
    color: "#38bdf8",
  },
  {
    id: "elephant",
    animal: "Elephant",
    emoji: "🐘",
    zone: "Reinforced Floor",
    description: "Slabs rated for 10,000 kg with rumble mats for low-frequency comms.",
    position: { top: "85%", left: "40%" },
    color: "#ff6b00",
  },
];

export const hiringSteps = [
  {
    id: 1,
    title: "Field Test",
    icon: "🧪",
    description: "Real rubble environment — sensory and physical capability assessment.",
  },
  {
    id: 2,
    title: "Simulation",
    icon: "🏗️",
    description: "Mock disaster scenario — team coordination and stress response.",
  },
  {
    id: 3,
    title: "Validation",
    icon: "✅",
    description: "Bio-metric review and workspace compatibility confirmation.",
  },
  {
    id: 4,
    title: "Selection",
    icon: "🎖️",
    description: "Final squad acceptance — gear fitting and briefing.",
  },
];

export const hrRemedies = [
  {
    animal: "Bat",
    emoji: "🦇",
    color: "#00d4ff",
    weakness: "Fragile wing membranes — easily torn by jagged rebar.",
    solution: "Kevlar Wing-Guards: ultra-light ballistic mesh over wings.",
  },
  {
    animal: "Cockroach",
    emoji: "🪳",
    color: "#a3e635",
    weakness: "Risk of being accidentally crushed by teammates.",
    solution: "LED Beacon Shells: adhesive tracker on back for digital map tracking.",
  },
  {
    animal: "Elephant",
    emoji: "🐘",
    color: "#ff6b00",
    weakness: "Massive caloric drain — requires hundreds of pounds of food daily.",
    solution: "On-Site Hydroponic Silo: 24/7 vertical farm for high-protein fuel.",
  },
  {
    animal: "Dolphin",
    emoji: "🐬",
    color: "#38bdf8",
    weakness: "Cannot navigate dry land or disconnected flooded zones.",
    solution: "Hydra-Suit Exoskeleton: moisture-locking suit with robotic flippers.",
  },
  {
    animal: "Starfish",
    emoji: "⭐",
    color: "#f9a8d4",
    weakness: "Slow over long distances, despite excellent climbing.",
    solution: "Rapid Deployment Drones: Bat or Owl carries Starfish to the triage point.",
  },
  {
    animal: "Wolf",
    emoji: "🐺",
    color: "#c084fc",
    weakness: "Sensory overload from high-frequency sirens and machinery.",
    solution: "Tactical Ear-Pro: noise-canceling headsets amplifying survivor heartbeats.",
  },
  {
    animal: "Beaver",
    emoji: "🦫",
    color: "#fb923c",
    weakness: "Dental wear from constant gnawing on heavy timber and debris.",
    solution: "Titanium Dental Caps: reinforced incisors for structural material cutting.",
  },
];

export const futureExpansion = {
  name: "Owl",
  emoji: "🦉",
  reason: "Silent long-range night vision from 500 feet. The ultimate Eye in the Sky.",
  advantage: "Spots heat signatures without helicopter noise — fills the Bat's long-range blind spot.",
};

export const doNotHire = {
  name: "Sloth",
  emoji: "🦥",
  speed: "0.27 km/h",
  reason: "Disaster response is a race against time. The Sloth cannot provide immediate triage and would physically block faster responders.",
};
