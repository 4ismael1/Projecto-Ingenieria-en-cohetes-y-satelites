"use strict";

/* ==========================================================
   CONSTANTS & PRESETS
   ========================================================== */

const CONSTANTS = { c: 299792458, k: 1.380649e-23, earthRadiusKm: 6371, solarIrradiance: 1361 };

const VEHICLE_MODELS = {
  "CubeSat": { body: 15, panel: 34, color: "#2563eb", accent: "#f59e0b", antenna: true, dish: false, bus: "box" },
  "Nanosatélite": { body: 13, panel: 26, color: "#0ea5e9", accent: "#22c55e", antenna: true, dish: false, bus: "box" },
  "Microsatélite": { body: 19, panel: 46, color: "#7c3aed", accent: "#38bdf8", antenna: true, dish: false, bus: "box" },
  "Satélite pequeño": { body: 23, panel: 58, color: "#1d4ed8", accent: "#f59e0b", antenna: false, dish: true, bus: "bus" },
  "Plataforma GEO": { body: 25, panel: 72, color: "#6366f1", accent: "#fbbf24", antenna: false, dish: true, bus: "geo" },
  "Relay lunar": { body: 21, panel: 56, color: "#0891b2", accent: "#fde68a", antenna: true, dish: true, bus: "relay" },
  "Sonda": { body: 18, panel: 42, color: "#64748b", accent: "#f97316", antenna: true, dish: true, bus: "probe" },
  "Otro": { body: 17, panel: 38, color: "#334155", accent: "#4dc8e8", antenna: true, dish: false, bus: "box" }
};

const DEFAULT_LOADS = [
  { name: "Comunicaciones", activeW: 8, standbyW: 1, duty: 0.15, eclipseDuty: 0.05 },
  { name: "OBC", activeW: 3, standbyW: 2, duty: 0.8, eclipseDuty: 0.8 },
  { name: "ADCS", activeW: 5, standbyW: 1.5, duty: 0.5, eclipseDuty: 0.45 },
  { name: "Payload", activeW: 10, standbyW: 1, duty: 0.25, eclipseDuty: 0.05 },
  { name: "Sensores", activeW: 2, standbyW: 0.5, duty: 0.6, eclipseDuty: 0.4 },
  { name: "Telemetría", activeW: 1.5, standbyW: 0.5, duty: 0.4, eclipseDuty: 0.4 },
  { name: "Control térmico", activeW: 4, standbyW: 0.5, duty: 0.2, eclipseDuty: 0.35 },
  { name: "Propulsión", activeW: 0, standbyW: 0, duty: 0, eclipseDuty: 0 },
  { name: "Otros", activeW: 1, standbyW: 0.2, duty: 0.3, eclipseDuty: 0.3 }
];

const PRESETS = {
  uhfcubesat: {
    mission: { missionName: "CubeSat UHF telemetría", vehicleType: "Nanosatélite", orbitType: "LEO", altitudeKm: 450, missionYears: 1.5, generalMarginPct: 25 },
    comm: { estimateDistance: true, linkDistanceKm: 900, frequencyValue: 437, frequencyUnit: "MHz", dataRateValue: 1200, dataRateUnit: "bps", linkType: "Downlink", requiredMarginDb: 6, txPowerW: 1.5, txGainDbi: 1.5, txLineLossDb: 0.8, implementationLossDb: 1, rxGainDbi: 12, rxLineLossDb: 0.8, noiseTempK: 650, requiredEbNoDb: 9, atmosphericLossDb: 0.4, pointingLossDb: 0.8, otherLossDb: 0.8 },
    power: { orbitDurationMin: 93, sunlightMin: 58, eclipseMin: 35, powerMarginPct: 25, annualDegradationPct: 3, busVoltageV: 8, panelEfficiencyPct: 26, solarIrradiance: 1361, packingFactorPct: 82, orientationFactorPct: 68, batteryDodPct: 25, batteryEfficiencyPct: 88, batteryMarginPct: 25, energyDensityWhKg: 140 },
    loads: [
      { name: "Radio UHF", activeW: 6, standbyW: 0.7, duty: 0.10, eclipseDuty: 0.08 },
      { name: "OBC", activeW: 2.5, standbyW: 1.4, duty: 0.75, eclipseDuty: 0.75 },
      { name: "ADCS básico", activeW: 3, standbyW: 1, duty: 0.35, eclipseDuty: 0.35 },
      { name: "Sensores", activeW: 1.8, standbyW: 0.4, duty: 0.45, eclipseDuty: 0.3 },
      { name: "Control térmico", activeW: 3.5, standbyW: 0.4, duty: 0.18, eclipseDuty: 0.35 }
    ]
  },
  cubesat: {
    mission: { missionName: "CubeSat LEO básico", vehicleType: "CubeSat", orbitType: "LEO", altitudeKm: 500, missionYears: 1, generalMarginPct: 20 },
    comm: { estimateDistance: true, linkDistanceKm: 1000, frequencyValue: 2.2, frequencyUnit: "GHz", dataRateValue: 9600, dataRateUnit: "bps", linkType: "Downlink", requiredMarginDb: 3, txPowerW: 2, txGainDbi: 2, txLineLossDb: 1, implementationLossDb: 1, rxGainDbi: 20, rxLineLossDb: 1, noiseTempK: 500, requiredEbNoDb: 10, atmosphericLossDb: 1, pointingLossDb: 1, otherLossDb: 1 },
    power: { orbitDurationMin: 95, sunlightMin: 60, eclipseMin: 35, powerMarginPct: 20, annualDegradationPct: 2.5, busVoltageV: 12, panelEfficiencyPct: 28, solarIrradiance: 1361, packingFactorPct: 85, orientationFactorPct: 75, batteryDodPct: 30, batteryEfficiencyPct: 90, batteryMarginPct: 20, energyDensityWhKg: 150 },
    loads: DEFAULT_LOADS
  },
  microsat: {
    mission: { missionName: "Microsatélite observación", vehicleType: "Microsatélite", orbitType: "LEO", altitudeKm: 700, missionYears: 3, generalMarginPct: 25 },
    comm: { estimateDistance: true, linkDistanceKm: 1800, frequencyValue: 8.2, frequencyUnit: "GHz", dataRateValue: 10, dataRateUnit: "Mbps", linkType: "Downlink", requiredMarginDb: 3, txPowerW: 10, txGainDbi: 8, txLineLossDb: 1.5, implementationLossDb: 1.5, rxGainDbi: 35, rxLineLossDb: 1, noiseTempK: 300, requiredEbNoDb: 12, atmosphericLossDb: 1.5, pointingLossDb: 1.5, otherLossDb: 1 },
    power: { orbitDurationMin: 99, sunlightMin: 62, eclipseMin: 37, powerMarginPct: 25, annualDegradationPct: 2.5, busVoltageV: 28, panelEfficiencyPct: 30, solarIrradiance: 1361, packingFactorPct: 88, orientationFactorPct: 78, batteryDodPct: 40, batteryEfficiencyPct: 90, batteryMarginPct: 25, energyDensityWhKg: 160 },
    loads: [
      { name: "Comunicaciones X-band", activeW: 65, standbyW: 5, duty: 0.18, eclipseDuty: 0.04 },
      { name: "OBC", activeW: 12, standbyW: 7, duty: 0.85, eclipseDuty: 0.85 },
      { name: "ADCS", activeW: 45, standbyW: 12, duty: 0.6, eclipseDuty: 0.55 },
      { name: "Payload óptico", activeW: 120, standbyW: 15, duty: 0.35, eclipseDuty: 0.02 },
      { name: "Sensores", activeW: 15, standbyW: 4, duty: 0.65, eclipseDuty: 0.4 },
      { name: "Telemetría", activeW: 8, standbyW: 3, duty: 0.5, eclipseDuty: 0.5 },
      { name: "Control térmico", activeW: 60, standbyW: 8, duty: 0.35, eclipseDuty: 0.55 },
      { name: "Propulsión", activeW: 30, standbyW: 1, duty: 0.02, eclipseDuty: 0 },
      { name: "Otros", activeW: 10, standbyW: 3, duty: 0.4, eclipseDuty: 0.4 }
    ]
  },
  smallsar: {
    mission: { missionName: "SmallSat SAR demostrador", vehicleType: "Satélite pequeño", orbitType: "LEO", altitudeKm: 600, missionYears: 4, generalMarginPct: 30 },
    comm: { estimateDistance: true, linkDistanceKm: 1600, frequencyValue: 8.4, frequencyUnit: "GHz", dataRateValue: 150, dataRateUnit: "Mbps", linkType: "Downlink", requiredMarginDb: 4, txPowerW: 25, txGainDbi: 14, txLineLossDb: 2, implementationLossDb: 2, rxGainDbi: 42, rxLineLossDb: 1.2, noiseTempK: 250, requiredEbNoDb: 13, atmosphericLossDb: 2, pointingLossDb: 2, otherLossDb: 1 },
    power: { orbitDurationMin: 97, sunlightMin: 61, eclipseMin: 36, powerMarginPct: 30, annualDegradationPct: 2.2, busVoltageV: 28, panelEfficiencyPct: 31, solarIrradiance: 1361, packingFactorPct: 88, orientationFactorPct: 72, batteryDodPct: 35, batteryEfficiencyPct: 90, batteryMarginPct: 30, energyDensityWhKg: 170 },
    loads: [
      { name: "Radar SAR", activeW: 900, standbyW: 45, duty: 0.08, eclipseDuty: 0.01 },
      { name: "Comunicaciones X-band", activeW: 110, standbyW: 8, duty: 0.12, eclipseDuty: 0.03 },
      { name: "OBC", activeW: 35, standbyW: 18, duty: 0.9, eclipseDuty: 0.9 },
      { name: "ADCS precisión", activeW: 75, standbyW: 22, duty: 0.65, eclipseDuty: 0.55 },
      { name: "Control térmico", activeW: 120, standbyW: 25, duty: 0.35, eclipseDuty: 0.65 },
      { name: "Telemetría", activeW: 12, standbyW: 4, duty: 0.4, eclipseDuty: 0.4 }
    ]
  },
  geocomm: {
    mission: { missionName: "Satélite de Comunicaciones GEO", vehicleType: "Plataforma GEO", orbitType: "GEO", altitudeKm: 35786, missionYears: 15, generalMarginPct: 20 },
    comm: { estimateDistance: false, linkDistanceKm: 38000, frequencyValue: 14, frequencyUnit: "GHz", dataRateValue: 50, dataRateUnit: "Mbps", linkType: "Downlink", requiredMarginDb: 4, txPowerW: 100, txGainDbi: 35, txLineLossDb: 2, implementationLossDb: 1.5, rxGainDbi: 45, rxLineLossDb: 1, noiseTempK: 200, requiredEbNoDb: 12, atmosphericLossDb: 3, pointingLossDb: 1, otherLossDb: 1 },
    power: { orbitDurationMin: 1436, sunlightMin: 1364, eclipseMin: 72, powerMarginPct: 20, annualDegradationPct: 1.5, busVoltageV: 50, panelEfficiencyPct: 32, solarIrradiance: 1361, packingFactorPct: 90, orientationFactorPct: 80, batteryDodPct: 60, batteryEfficiencyPct: 90, batteryMarginPct: 20, energyDensityWhKg: 180 },
    loads: [
      { name: "Transponders Ku-band", activeW: 1500, standbyW: 100, duty: 1.0, eclipseDuty: 1.0 },
      { name: "OBC", activeW: 40, standbyW: 20, duty: 1.0, eclipseDuty: 1.0 },
      { name: "ADCS", activeW: 150, standbyW: 50, duty: 1.0, eclipseDuty: 1.0 },
      { name: "Control térmico", activeW: 200, standbyW: 50, duty: 0.5, eclipseDuty: 0.8 },
      { name: "Propulsión (Station Keeping)", activeW: 500, standbyW: 10, duty: 0.05, eclipseDuty: 0.0 }
    ]
  },
  lunarrelay: {
    mission: { missionName: "Relay lunar simplificado", vehicleType: "Relay lunar", orbitType: "Personalizada", altitudeKm: 100, missionYears: 3, generalMarginPct: 30 },
    comm: { estimateDistance: false, linkDistanceKm: 384400, frequencyValue: 8.45, frequencyUnit: "GHz", dataRateValue: 1, dataRateUnit: "Mbps", linkType: "Downlink", requiredMarginDb: 3, txPowerW: 45, txGainDbi: 28, txLineLossDb: 2, implementationLossDb: 1.5, rxGainDbi: 64, rxLineLossDb: 1, noiseTempK: 80, requiredEbNoDb: 10, atmosphericLossDb: 0.8, pointingLossDb: 0.6, otherLossDb: 1 },
    power: { orbitDurationMin: 120, sunlightMin: 72, eclipseMin: 48, powerMarginPct: 30, annualDegradationPct: 2, busVoltageV: 28, panelEfficiencyPct: 30, solarIrradiance: 1361, packingFactorPct: 86, orientationFactorPct: 76, batteryDodPct: 45, batteryEfficiencyPct: 90, batteryMarginPct: 30, energyDensityWhKg: 165 },
    loads: [
      { name: "Relay telecom", activeW: 180, standbyW: 28, duty: 0.35, eclipseDuty: 0.18 },
      { name: "OBC", activeW: 22, standbyW: 12, duty: 0.95, eclipseDuty: 0.95 },
      { name: "ADCS", activeW: 45, standbyW: 16, duty: 0.75, eclipseDuty: 0.75 },
      { name: "Navegación", activeW: 28, standbyW: 8, duty: 0.55, eclipseDuty: 0.55 },
      { name: "Control térmico", activeW: 90, standbyW: 20, duty: 0.4, eclipseDuty: 0.7 }
    ]
  },
  probe: {
    mission: { missionName: "Sonda Interplanetaria (Marte)", vehicleType: "Sonda", orbitType: "Personalizada", altitudeKm: 400, missionYears: 5, generalMarginPct: 30 },
    comm: { estimateDistance: false, linkDistanceKm: 225000000, frequencyValue: 8.4, frequencyUnit: "GHz", dataRateValue: 2, dataRateUnit: "Mbps", linkType: "Downlink", requiredMarginDb: 3, txPowerW: 35, txGainDbi: 40, txLineLossDb: 2, implementationLossDb: 1.5, rxGainDbi: 74, rxLineLossDb: 1, noiseTempK: 50, requiredEbNoDb: 10, atmosphericLossDb: 1, pointingLossDb: 0.5, otherLossDb: 1 },
    power: { orbitDurationMin: 120, sunlightMin: 80, eclipseMin: 40, powerMarginPct: 25, annualDegradationPct: 2.0, busVoltageV: 28, panelEfficiencyPct: 30, solarIrradiance: 590, packingFactorPct: 85, orientationFactorPct: 80, batteryDodPct: 50, batteryEfficiencyPct: 90, batteryMarginPct: 25, energyDensityWhKg: 160 },
    loads: [
      { name: "Telecomunicaciones", activeW: 80, standbyW: 15, duty: 0.3, eclipseDuty: 0.1 },
      { name: "Instrumentos científicos", activeW: 120, standbyW: 20, duty: 0.4, eclipseDuty: 0.2 },
      { name: "OBC", activeW: 25, standbyW: 15, duty: 1.0, eclipseDuty: 1.0 },
      { name: "ADCS", activeW: 50, standbyW: 20, duty: 1.0, eclipseDuty: 1.0 },
      { name: "Control térmico", activeW: 100, standbyW: 30, duty: 0.6, eclipseDuty: 0.9 }
    ]
  },
  custom: {
    mission: { missionName: "Caso personalizado", vehicleType: "Otro", orbitType: "Personalizada", altitudeKm: 500, missionYears: 1, generalMarginPct: 20 },
    comm: { estimateDistance: false, linkDistanceKm: 1000, frequencyValue: 2.2, frequencyUnit: "GHz", dataRateValue: 9600, dataRateUnit: "bps", linkType: "Downlink", requiredMarginDb: 3, txPowerW: 2, txGainDbi: 2, txLineLossDb: 1, implementationLossDb: 1, rxGainDbi: 20, rxLineLossDb: 1, noiseTempK: 500, requiredEbNoDb: 10, atmosphericLossDb: 1, pointingLossDb: 1, otherLossDb: 1 },
    power: { orbitDurationMin: 95, sunlightMin: 60, eclipseMin: 35, powerMarginPct: 20, annualDegradationPct: 2.5, busVoltageV: 12, panelEfficiencyPct: 28, solarIrradiance: 1361, packingFactorPct: 85, orientationFactorPct: 75, batteryDodPct: 30, batteryEfficiencyPct: 90, batteryMarginPct: 20, energyDensityWhKg: 150 },
    loads: DEFAULT_LOADS
  }
};

/* ==========================================================
   APP STATE
   ========================================================== */

let appState = {
  loads: cloneLoads(DEFAULT_LOADS), lastResults: null, warnings: [], errors: [],
  currentStep: "mission", visitedSteps: new Set(["mission"])
};
const STEPS = ["mission", "communications", "power", "results", "reference"];

/* ==========================================================
   HELPERS
   ========================================================== */

const $ = (id) => document.getElementById(id);
const numberValue = (id) => Number($(id).value);
const setValue = (id, value) => { const e=$(id); if(e) e.value = value; };
const setChecked = (id, value) => { const e=$(id); if(e) e.checked = Boolean(value); };
function cloneLoads(l) { return l.map(x => ({ ...x })); }
function toDb(v) { return 10 * Math.log10(v); }
function format(v, d = 2) { if (!Number.isFinite(v)) return "N/D"; return v.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d }); }
function formatUnit(v, u, d = 2) { return `${format(v, d)} ${u}`; }
function pctToFraction(v) { return v / 100; }
function getFrequencyHz(v, u) { return u === "GHz" ? v * 1e9 : v * 1e6; }
function getFrequencyGHz(v, u) { return u === "GHz" ? v : v / 1000; }
function getDataRateBps(v, u) { if (u === "Mbps") return v * 1e6; if (u === "kbps") return v * 1e3; return v; }
function estimateSlantRangeKm(a) { return Math.max(a * 2, a + 500); }
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }
function escapeHtml(v) { return String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
function escapeAttribute(v) { return escapeHtml(v); }

/* ==========================================================
   INPUT GETTERS & VALIDATION
   ========================================================== */

function getMissionInputs() {
  return { missionName: $("missionName").value.trim() || "Misión sin nombre", vehicleType: $("vehicleType").value, orbitType: $("orbitType").value, altitudeKm: numberValue("altitudeKm"), missionYears: numberValue("missionYears"), generalMarginPct: numberValue("generalMarginPct") };
}
function getCommInputs(m) {
  const est = $("estimateDistance").checked;
  const d = est ? estimateSlantRangeKm(m.altitudeKm) : numberValue("linkDistanceKm");
  if (est) setValue("linkDistanceKm", Math.round(d));
  return { estimateDistance: est, linkDistanceKm: d, frequencyValue: numberValue("frequencyValue"), frequencyUnit: $("frequencyUnit").value, dataRateValue: numberValue("dataRateValue"), dataRateUnit: $("dataRateUnit").value, linkType: $("linkType").value, requiredMarginDb: numberValue("requiredMarginDb"), txPowerW: numberValue("txPowerW"), txGainDbi: numberValue("txGainDbi"), txLineLossDb: numberValue("txLineLossDb"), implementationLossDb: numberValue("implementationLossDb"), rxGainDbi: numberValue("rxGainDbi"), rxLineLossDb: numberValue("rxLineLossDb"), noiseTempK: numberValue("noiseTempK"), requiredEbNoDb: numberValue("requiredEbNoDb"), atmosphericLossDb: numberValue("atmosphericLossDb"), pointingLossDb: numberValue("pointingLossDb"), otherLossDb: numberValue("otherLossDb") };
}
function getPowerInputs() {
  return { orbitDurationMin: numberValue("orbitDurationMin"), sunlightMin: numberValue("sunlightMin"), eclipseMin: numberValue("eclipseMin"), powerMarginPct: numberValue("powerMarginPct"), annualDegradationPct: numberValue("annualDegradationPct"), busVoltageV: numberValue("busVoltageV"), panelEfficiencyPct: numberValue("panelEfficiencyPct"), solarIrradiance: numberValue("solarIrradiance"), packingFactorPct: numberValue("packingFactorPct"), orientationFactorPct: numberValue("orientationFactorPct"), batteryDodPct: numberValue("batteryDodPct"), batteryEfficiencyPct: numberValue("batteryEfficiencyPct"), batteryMarginPct: numberValue("batteryMarginPct"), energyDensityWhKg: numberValue("energyDensityWhKg") };
}

function validateInputs(mission, comm, power, loads) {
  const errors = [], warnings = [];
  clearInvalidStates();
  requirePositive("altitudeKm", mission.altitudeKm, "La altitud orbital debe ser > 0.", errors);
  requirePositive("missionYears", mission.missionYears, "La duración debe ser > 0.", errors);
  requirePositive("linkDistanceKm", comm.linkDistanceKm, "La distancia de enlace debe ser > 0.", errors);
  requirePositive("frequencyValue", comm.frequencyValue, "La frecuencia debe ser > 0.", errors);
  requirePositive("dataRateValue", comm.dataRateValue, "La tasa de datos debe ser > 0.", errors);
  requirePositive("orbitDurationMin", power.orbitDurationMin, "La duración de órbita debe ser > 0.", errors);
  requirePositive("sunlightMin", power.sunlightMin, "El tiempo de luz solar debe ser > 0.", errors);
  requirePositive("busVoltageV", power.busVoltageV, "El voltaje de bus debe ser > 0.", errors);
  requirePositive("solarIrradiance", power.solarIrradiance, "La irradiancia solar debe ser > 0.", errors);
  validatePercent("panelEfficiencyPct", power.panelEfficiencyPct, "Eficiencia de panel fuera de rango.", errors);
  validatePercent("packingFactorPct", power.packingFactorPct, "Factor de empaquetamiento fuera de rango.", errors);
  validatePercent("orientationFactorPct", power.orientationFactorPct, "Factor de orientación fuera de rango.", errors);
  validatePercent("batteryDodPct", power.batteryDodPct, "DoD fuera de rango.", errors);
  validatePercent("batteryEfficiencyPct", power.batteryEfficiencyPct, "Eficiencia de batería fuera de rango.", errors);
  if (power.energyDensityWhKg < 0) { markInvalid("energyDensityWhKg"); errors.push("La densidad energética no puede ser negativa."); }
  if (Math.abs((power.sunlightMin + power.eclipseMin) - power.orbitDurationMin) > Math.max(2, power.orbitDurationMin * 0.05)) { markInvalid("sunlightMin"); markInvalid("eclipseMin"); warnings.push("Suma luz solar + eclipse difiere de la órbita."); }
  if (comm.linkDistanceKm < mission.altitudeKm) warnings.push("Distancia de enlace menor que altitud.");
  loads.forEach((load, index) => {
    if (load.activeW < 0 || load.standbyW < 0) warnings.push(`Potencia negativa en subsistema ${index + 1}.`);
    if (load.duty < 0 || load.duty > 1) warnings.push(`Duty cycle fuera de rango en ${load.name || `subsistema ${index + 1}`}.`);
    if (load.eclipseDuty < 0 || load.eclipseDuty > 1) warnings.push(`Duty de eclipse fuera de rango en ${load.name || `subsistema ${index + 1}`}.`);
  });
  if (power.batteryDodPct > 70) warnings.push("DoD > 70%: agresivo para vida útil.");
  if (power.eclipseMin > power.sunlightMin) warnings.push("Eclipse mayor que luz solar.");
  return { errors, warnings };
}
function requirePositive(id, v, msg, e) { if (!Number.isFinite(v) || v <= 0) { markInvalid(id); e.push(msg); } }
function validatePercent(id, v, msg, e) { if (!Number.isFinite(v) || v <= 0 || v > 100) { markInvalid(id); e.push(msg); } }
function markInvalid(id) { const el = $(id); if (el) el.classList.add("invalid"); }
function clearInvalidStates() { document.querySelectorAll(".invalid").forEach(i => i.classList.remove("invalid")); }

/* ==========================================================
   CALCULATIONS
   ========================================================== */

function calculateCommunications(mission, comm) {
  const fHz = getFrequencyHz(comm.frequencyValue, comm.frequencyUnit), fGHz = getFrequencyGHz(comm.frequencyValue, comm.frequencyUnit);
  const rb = getDataRateBps(comm.dataRateValue, comm.dataRateUnit), wl = CONSTANTS.c / fHz;
  const ptDbw = toDb(comm.txPowerW), ptDbm = ptDbw + 30;
  const fspl = 20*Math.log10(comm.linkDistanceKm) + 20*Math.log10(fGHz) + 92.45;
  const totalLoss = comm.txLineLossDb + comm.rxLineLossDb + comm.atmosphericLossDb + comm.pointingLossDb + comm.otherLossDb + comm.implementationLossDb;
  const pr = ptDbw + comm.txGainDbi + comm.rxGainDbi - fspl - totalLoss;
  const n0 = toDb(CONSTANTS.k * comm.noiseTempK), cn0 = pr - n0, ebno = cn0 - toDb(rb);
  const margin = ebno - comm.requiredEbNoDb;
  const state = margin >= comm.requiredMarginDb ? {label:"Adecuado", className:"ok"} : margin >= 0 ? {label:"Ajustado", className:"warn"} : {label:"Crítico", className:"critical"};
  return { frequencyHz: fHz, frequencyGHz: fGHz, dataRateBps: rb, wavelengthM: wl, txPowerDbw: ptDbw, txPowerDbm: ptDbm, fsplDb: fspl, totalLossDb: totalLoss, receivedPowerDbw: pr, n0DbwHz: n0, cn0DbHz: cn0, ebNoDb: ebno, linkMarginDb: margin, requiredEbNoDb: comm.requiredEbNoDb, requiredMarginDb: comm.requiredMarginDb, state };
}

function calculatePower(mission, power, loads) {
  const oh = power.orbitDurationMin/60, sh = power.sunlightMin/60, eh = power.eclipseMin/60;
  const pm = pctToFraction(power.powerMarginPct), bm = pctToFraction(power.batteryMarginPct);
  const dod = pctToFraction(power.batteryDodPct), be = pctToFraction(power.batteryEfficiencyPct);
  const pe = pctToFraction(power.panelEfficiencyPct), of2 = pctToFraction(power.orientationFactorPct);
  const pf = pctToFraction(power.packingFactorPct), ad = pctToFraction(power.annualDegradationPct);
  const eol = Math.pow(1-ad, mission.missionYears);
  const lr = loads.map(l => { const a = l.activeW*l.duty + l.standbyW*(1-l.duty); const e2 = l.activeW*l.eclipseDuty + l.standbyW*(1-l.eclipseDuty); return { ...l, averageW: a, eclipseW: e2, orbitWh: a*oh, eclipseWh: e2*eh }; });
  const ta = lr.reduce((s,l) => s+l.averageW, 0), ep = lr.reduce((s,l) => s+l.eclipseW, 0);
  const dp = ta*(1+pm), oe = ta*oh, de = dp*oh, ee = ep*eh;
  const bw = ee/(dod*be), bwm = bw*(1+bm), bah = bwm/power.busVoltageV;
  const bmkg = power.energyDensityWhKg > 0 ? bwm/power.energyDensityWhKg : null;
  const spr = de/sh, spb = spr/eol;
  const sa = spb/(power.solarIrradiance*pe*of2*pf);
  const bsp = oe/sh, gr = spr/bsp;
  const state = (gr < 1 || bwm < ee) ? {label:"Crítico", className:"critical"} : (gr < 1.2) ? {label:"Ajustado", className:"warn"} : {label:"Adecuado", className:"ok"};
  return { loadResults: lr, totalAverageW: ta, eclipsePowerW: ep, designPowerW: dp, orbitEnergyWh: oe, designOrbitEnergyWh: de, eclipseEnergyWh: ee, batteryWh: bw, batteryWhWithMargin: bwm, batteryAh: bah, batteryMassKg: bmkg, solarPowerRequiredW: spr, solarPowerBolW: spb, solarAreaM2: sa, eolFactor: eol, generationRatio: gr, state };
}

function buildRecommendations(cr, pr) {
  const r = [];
  if (cr.linkMarginDb < 0) r.push("Aumentar potencia TX, ganancia de antena o reducir tasa de datos.");
  else if (cr.linkMarginDb < cr.requiredMarginDb) r.push("Incrementar margen de enlace RF.");
  if (pr.generationRatio < 1.2) r.push("Aumentar área de panel solar o eficiencia de celda.");
  if (pr.batteryWhWithMargin < pr.eclipseEnergyWh * 1.15) r.push("Incrementar capacidad volumétrica de batería.");
  if (!r.length) r.push("Dimensionamiento coherente y dentro de márgenes.");
  return r;
}
function collectLoadRows() { return [...document.querySelectorAll(".load-row")].map(r => ({ name: r.querySelector("[data-load='name']").value, activeW: Number(r.querySelector("[data-load='activeW']").value), standbyW: Number(r.querySelector("[data-load='standbyW']").value), duty: Number(r.querySelector("[data-load='duty']").value)/100, eclipseDuty: Number(r.querySelector("[data-load='eclipseDuty']").value)/100 })); }

/* ==========================================================
   MAIN CALCULATION PIPELINE
   ========================================================== */

function calculateMission() {
  appState.loads = collectLoadRows();
  const mission = getMissionInputs(), comm = getCommInputs(mission), power = getPowerInputs();
  const val = validateInputs(mission, comm, power, appState.loads);
  appState.errors = val.errors; appState.warnings = val.warnings;

  $("satTypeLabel").textContent = mission.vehicleType;
  $("satOrbitLabel").textContent = `${mission.orbitType} · ${format(mission.altitudeKm, 0)}km`;
  $("resSatTypeLabel").textContent = mission.vehicleType;

  if (val.errors.length) {
    appState.lastResults = null;
    renderAllWarnings(val.errors, val.warnings);
    updateStatus("Datos incompletos", "critical");
    return;
  }

  const cr = calculateCommunications(mission, comm), pr = calculatePower(mission, power, appState.loads);
  const rec = buildRecommendations(cr, pr);
  const gs = (cr.state.className==="critical" || pr.state.className==="critical") ? {label:"Crítico", className:"critical"} : (cr.state.className==="warn" || pr.state.className==="warn") ? {label:"Ajustado", className:"warn"} : {label:"Adecuado", className:"ok"};
  
  appState.lastResults = { mission, comm, power, commResults: cr, powerResults: pr, recommendations: rec, globalState: gs };

  if (window.viewerMission) window.viewerMission.updateData(appState.lastResults);
  if (window.viewerResults) window.viewerResults.updateData(appState.lastResults);

  renderCommKeyMetrics(cr); renderCommCharts(cr); renderCommDetails(comm, cr);
  renderPowerKeyMetrics(pr); renderPowerCharts(power, pr); renderPowerDetails(power, pr);
  renderAllWarnings([], appState.warnings);
  renderSummary(appState.lastResults);
  updateStatus(gs.label, gs.className);
  
  appState.visitedSteps.add("communications"); appState.visitedSteps.add("power"); appState.visitedSteps.add("results");
  updateStepIndicators();
}

/* ==========================================================
   STEP NAVIGATION
   ========================================================== */

function navigateToStep(name) {
  if (!STEPS.includes(name) || name === appState.currentStep) return;
  const cur = document.querySelector(`.step-panel[data-step="${appState.currentStep}"]`);
  if (cur) cur.classList.remove("active");
  const tgt = document.querySelector(`.step-panel[data-step="${name}"]`);
  if (tgt) { void tgt.offsetWidth; tgt.classList.add("active"); }
  
  document.querySelectorAll(".step-btn").forEach(b => b.classList.toggle("active", b.dataset.target === name));
  appState.visitedSteps.add(name); appState.currentStep = name; 
  updateStepIndicators();
  requestAnimationFrame(() => {
    if (window.viewerMission) window.viewerMission.resize();
    if (window.viewerResults) window.viewerResults.resize();
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function updateStepIndicators() { document.querySelectorAll(".step-btn").forEach(b => { const s = b.dataset.target; b.classList.toggle("visited", s !== appState.currentStep && appState.visitedSteps.has(s)); }); }

/* ==========================================================
   RENDERING ENGINE (UI)
   ========================================================== */

function renderCommKeyMetrics(cr) {
  $("commKeyMetrics").style.display = "";
  animateValue($("commMarginVal"), cr.linkMarginDb, 1); $("commMarginVal").className = `key-metric-value ${cr.state.className}`;
  animateValue($("commEbnoVal"), cr.ebNoDb, 1);
  animateValue($("commFsplVal"), cr.fsplDb, 1);
  $("commStateBadge").textContent = cr.state.label; $("commStateBadge").className = `state-badge ${cr.state.className}`;
}
function renderPowerKeyMetrics(pr) {
  $("powerKeyMetrics").style.display = "";
  animateValue($("pwrAvgVal"), pr.totalAverageW, 1);
  animateValue($("pwrBattVal"), pr.batteryWhWithMargin, 1);
  animateValue($("pwrPanelVal"), pr.solarAreaM2, 3);
  $("pwrStateBadge").textContent = pr.state.label; $("pwrStateBadge").className = `state-badge ${pr.state.className}`;
}

function animateValue(el, target, dec) {
  const start = parseFloat(el.textContent.replace(/[^\d.,-]/g, "").replace(",", ".")) || 0;
  const diff = target - start;
  if (!Number.isFinite(target)) { el.textContent = "N/D"; return; }
  if (Math.abs(diff) < 0.01) { el.textContent = format(target, dec); return; }
  const duration = 400; let startTime;
  function step(ts) {
    if (!startTime) startTime = ts;
    const p = Math.min(1, (ts - startTime) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = format(start + diff * eased, dec);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function renderCommCharts(cr) {
  $("commCharts").style.display = "";
  $("marginGauge").innerHTML = renderRadialGauge(cr.linkMarginDb, -10, 25, cr.state.className, cr.state.label);
  $("ebnoChart").innerHTML = renderEbnoCompare(cr.ebNoDb, cr.requiredEbNoDb);
}
function renderPowerCharts(power, pr) {
  $("powerCharts").style.display = "";
  $("orbitTimeline").innerHTML = renderOrbitArc(power, pr);
  $("loadsDonut").innerHTML = renderDonutChart(pr.loadResults);
}

function renderRadialGauge(value, min, max, stateClass, label) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const R = 52, C = 2 * Math.PI * R, arc = (240/360) * C, filled = (pct/100) * arc;
  const col = stateClass === "ok" ? "#10b981" : stateClass === "warn" ? "#f59e0b" : "#ef4444";
  return `<svg viewBox="0 0 140 120" style="width:100%;max-width:180px;margin:0 auto;display:block">
    <circle cx="70" cy="65" r="${R}" fill="none" stroke="#374151" stroke-width="8" stroke-dasharray="${arc} ${C}" transform="rotate(150 70 65)" stroke-linecap="round"/>
    <circle cx="70" cy="65" r="${R}" fill="none" stroke="${col}" stroke-width="8" stroke-dasharray="${filled} ${C}" transform="rotate(150 70 65)" stroke-linecap="round"><animate attributeName="stroke-dasharray" from="0 ${C}" to="${filled} ${C}" dur="0.7s" fill="freeze"/></circle>
    <text x="70" y="58" text-anchor="middle" fill="#f3f4f6" font-size="20" font-weight="700" font-family="'JetBrains Mono',monospace">${format(value,1)}</text>
    <text x="70" y="74" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="'Inter',sans-serif">dB</text>
    <text x="70" y="100" text-anchor="middle" fill="${col}" font-size="11" font-weight="600" font-family="'Inter',sans-serif">${label}</text>
  </svg>`;
}
function renderEbnoCompare(calc, req) {
  const min = Math.min(0, calc, req) - 3;
  const max = Math.max(1, calc, req) + 3;
  const span = Math.max(1, max - min);
  const axisX = 88 + ((0 - min) / span) * 150;
  const bar = (value, y, color) => {
    const x = 88 + ((Math.min(0, value) - min) / span) * 150;
    const width = Math.max(4, (Math.abs(value) / span) * 150);
    return `<rect x="${x}" y="${y}" width="${width}" height="20" rx="3" fill="${color}"><animate attributeName="width" from="0" to="${width}" dur="0.5s" fill="freeze"/></rect>`;
  };
  return `<svg viewBox="0 0 300 112" style="width:100%">
    <line x1="${axisX}" y1="6" x2="${axisX}" y2="84" stroke="#64748b" stroke-width="1"/>
    <text x="10" y="24" fill="#9ca3af" font-size="11" font-family="Inter, sans-serif">Calculado</text>
    ${bar(calc, 10, calc >= req ? "#10b981" : "#ef4444")}
    <text x="248" y="24" fill="#f3f4f6" font-size="11" font-family="ui-monospace, monospace">${format(calc,1)} dB</text>
    <text x="10" y="60" fill="#9ca3af" font-size="11" font-family="Inter, sans-serif">Requerido</text>
    ${bar(req, 46, "#f59e0b")}
    <text x="248" y="60" fill="#f3f4f6" font-size="11" font-family="ui-monospace, monospace">${format(req,1)} dB</text>
    <text x="88" y="100" fill="#9ca3af" font-size="10">Escala con eje cero: valores negativos quedan a la izquierda</text>
  </svg>`;
}
function renderOrbitArc(power, pr) {
  const R = 48, cx = 70, cy = 58, C = 2*Math.PI*R;
  const total = Math.max(power.orbitDurationMin, power.sunlightMin + power.eclipseMin, 1);
  const sunPct = clamp(power.sunlightMin / total, 0, 1), eclPct = clamp(power.eclipseMin / total, 0, 1);
  const sunArc = sunPct * C, eclArc = eclPct * C;
  return `<svg viewBox="0 0 140 130" style="width:100%;max-width:180px;margin:0 auto;display:block">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f59e0b" stroke-width="10" stroke-dasharray="${sunArc} ${C}" transform="rotate(-90 ${cx} ${cy})" stroke-linecap="round"><animate attributeName="stroke-dasharray" from="0 ${C}" to="${sunArc} ${C}" dur="0.6s" fill="freeze"/></circle>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#374151" stroke-width="10" stroke-dasharray="${eclArc} ${C}" stroke-dashoffset="${-sunArc}" transform="rotate(-90 ${cx} ${cy})" stroke-linecap="round"><animate attributeName="stroke-dasharray" from="0 ${C}" to="${eclArc} ${C}" dur="0.6s" fill="freeze"/></circle>
    <text x="${cx}" y="52" text-anchor="middle" fill="#f3f4f6" font-size="13" font-weight="600" font-family="'JetBrains Mono',monospace">${format(pr.generationRatio,2)}×</text>
    <text x="${cx}" y="66" text-anchor="middle" fill="#9ca3af" font-size="8" font-family="'Inter',sans-serif">gen/diseño</text>
    <text x="${cx}" y="98" text-anchor="middle" fill="#f59e0b" font-size="9" font-family="'Inter',sans-serif">Luz ${format(power.sunlightMin,0)} min</text>
    <text x="${cx}" y="112" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="'Inter',sans-serif">Eclipse ${format(power.eclipseMin,0)} min</text>
  </svg>`;
}
function renderDonutChart(loads) {
  const filtered = loads.filter(l => l.averageW > 0);
  const total = filtered.reduce((s,l) => s+l.averageW, 0);
  if (total === 0) return '<p class="muted">Sin cargas.</p>';
  const colors = ["#4dc8e8","#3b82f6","#f59e0b","#10b981","#ef4444","#8b5cf6","#f97316","#14b8a6","#6366f1"];
  const R = 45, C = 2*Math.PI*R; let offset = 0;
  const circles = filtered.map((l,i) => {
    const pct = l.averageW/total, dash = pct*C, col = colors[i%colors.length];
    const seg = `<circle cx="60" cy="60" r="${R}" fill="none" stroke="${col}" stroke-width="14" stroke-dasharray="${dash} ${C-dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 60 60)"><animate attributeName="stroke-dasharray" from="0 ${C}" to="${dash} ${C-dash}" dur="0.5s" fill="freeze"/></circle>`;
    offset += dash; return { seg, label: l.name, pct, col };
  });
  const legend = circles.map(c => `<div class="donut-legend-item"><span class="donut-legend-dot" style="background:${c.col}"></span><span class="donut-legend-label">${escapeHtml(c.label)}</span></div>`).join("");
  return `<div class="donut-wrap"><svg viewBox="0 0 120 120" style="width:110px;height:110px;flex-shrink:0">${circles.map(c=>c.seg).join("")}<text x="60" y="58" text-anchor="middle" fill="#f3f4f6" font-size="12" font-weight="700" font-family="'JetBrains Mono',monospace">${format(total,0)}</text></svg><div class="donut-legend">${legend}</div></div>`;
}

function renderCommDetails(comm, cr) {
  $("commDetailsSection").style.display = "";
  $("commResults").innerHTML = [
    mRow("P TX", formatUnit(cr.txPowerDbw,"dBW")), mRow("FSPL", formatUnit(cr.fsplDb,"dB")),
    mRow("Pérdidas L", formatUnit(cr.totalLossDb,"dB")), mRow("P Recibida", formatUnit(cr.receivedPowerDbw,"dBW")),
    mRow("N₀", formatUnit(cr.n0DbwHz,"dBW/Hz")), mRow("C/N₀", formatUnit(cr.cn0DbHz,"dB-Hz"))
  ].join("");
}
function renderPowerDetails(power, pr) {
  $("powerDetailsSection").style.display = "";
  $("powerResults").innerHTML = [
    mRow("P diseño", formatUnit(pr.designPowerW,"W")), mRow("E eclipse", formatUnit(pr.eclipseEnergyWh,"Wh")),
    mRow("Batería mín", formatUnit(pr.batteryWhWithMargin,"Wh")), mRow("Capacidad", formatUnit(pr.batteryAh,"Ah")),
    mRow("P solar BOL", formatUnit(pr.solarPowerBolW,"W")), mRow("Masa batería", pr.batteryMassKg?formatUnit(pr.batteryMassKg,"kg"):"N/D")
  ].join("");
}
function mRow(label, value) { return `<div class="metric-row"><span class="metric-label">${label}</span><strong class="metric-value">${value}</strong></div>`; }

function renderAllWarnings(errors, warnings) {
  renderWarningsTo($("warningsList"), errors, warnings);
  const cw = warnings.filter(w => /enlace|margen|FSPL|frecuencia|pérdidas/i.test(w));
  const ce = errors.filter(e => /frecuencia|distancia|tasa|potencia/i.test(e));
  const pw = warnings.filter(w => /solar|batería|DoD|eclipse|panel|duty/i.test(w));
  const pe = errors.filter(e => /órbita|voltaje|irradiancia/i.test(e));
  renderModWarn("commWarningsSection","commWarnings",ce,cw);
  renderModWarn("powerWarningsSection","powerWarnings",pe,pw);
}
function renderModWarn(sid, lid, errs, warns) {
  const s = $(sid), l = $(lid); if (!s||!l) return;
  if (!errs.length && !warns.length) { s.style.display = "none"; return; }
  s.style.display = ""; renderWarningsTo(l, errs, warns);
}
function renderWarningsTo(c, errs, warns) {
  const items = errs.map(i => `<div class="warning-item error">${escapeHtml(i)}</div>`)
                .concat(warns.map(i => `<div class="warning-item">${escapeHtml(i)}</div>`));
  c.innerHTML = items.length ? items.join("") : '<div class="warning-item info">Sin incidencias reportadas.</div>';
}

function renderSummary(r) {
  const { mission: m, commResults: cr, powerResults: pr, recommendations: rec, globalState: gs } = r;
  const actionState = $("summaryActionState");
  if (actionState) actionState.textContent = gs.label;
  $("summaryContent").innerHTML = `
    <div class="result-verdict ${gs.className}">
      <div>
        <span class="result-eyebrow">Estado de diseño</span>
        <strong>${gs.label}</strong>
        <p>${summaryNarrative(gs, cr, pr)}</p>
      </div>
      <span class="state-badge state-badge-lg ${gs.className}">${gs.label}</span>
    </div>
    <div class="result-metrics-grid">
      <div class="dash-card mission-card">
        <h3>Perfil de misión</h3>
        <ul class="dash-list">
          <li><span>Misión</span> <strong>${escapeHtml(m.missionName)}</strong></li>
          <li><span>Vehículo</span> <strong>${escapeHtml(m.vehicleType)}</strong></li>
          <li><span>Régimen</span> <strong>${escapeHtml(m.orbitType)} · ${format(m.altitudeKm,0)} km</strong></li>
          <li><span>Duración</span> <strong>${format(m.missionYears,1)} años</strong></li>
        </ul>
      </div>
      <div class="dash-card">
        <h3>Enlace RF</h3>
        <ul class="dash-list">
          <li><span>Margen operativo</span> <strong class="${cr.state.className}">${formatUnit(cr.linkMarginDb,"dB")}</strong></li>
          <li><span>FSPL</span> <strong>${formatUnit(cr.fsplDb,"dB")}</strong></li>
          <li><span>Eb/N₀</span> <strong>${formatUnit(cr.ebNoDb,"dB")}</strong></li>
          <li><span>C/N₀</span> <strong>${formatUnit(cr.cn0DbHz,"dB-Hz")}</strong></li>
        </ul>
      </div>
      <div class="dash-card">
        <h3>Potencia EPS</h3>
        <ul class="dash-list">
          <li><span>Consumo promedio</span> <strong>${formatUnit(pr.totalAverageW,"W")}</strong></li>
          <li><span>Área solar</span> <strong>${formatUnit(pr.solarAreaM2,"m²")}</strong></li>
          <li><span>Batería eclipse</span> <strong>${formatUnit(pr.batteryWhWithMargin,"Wh")}</strong></li>
          <li><span>Factor EOL</span> <strong>${formatUnit(pr.eolFactor * 100,"%")}</strong></li>
        </ul>
      </div>
    </div>
    <div class="mission-analysis-grid">
      <section class="analysis-panel">
        <div class="analysis-heading">
          <span>Comunicaciones</span>
          <strong>Presupuesto de enlace</strong>
        </div>
        <div class="analysis-split rf-layout">
          <div class="chart-frame gauge-frame">
            ${renderRadialGauge(cr.linkMarginDb, -10, 25, cr.state.className, cr.state.label)}
          </div>
          <div class="chart-frame wide-chart">
            <h4>Eb/N₀ calculado vs requerido</h4>
            ${renderEbnoCompare(cr.ebNoDb, cr.requiredEbNoDb)}
          </div>
        </div>
        <ul class="analysis-list">
          <li><span>Potencia recibida</span><strong>${formatUnit(cr.receivedPowerDbw,"dBW")}</strong></li>
          <li><span>C/N₀</span><strong>${formatUnit(cr.cn0DbHz,"dB-Hz")}</strong></li>
          <li><span>Pérdidas totales</span><strong>${formatUnit(cr.totalLossDb,"dB")}</strong></li>
        </ul>
      </section>

      <section class="analysis-panel">
        <div class="analysis-heading">
          <span>Potencia</span>
          <strong>Balance EPS por órbita</strong>
        </div>
        <div class="analysis-split eps-layout">
          <div class="chart-frame orbit-frame">
            ${renderOrbitArc(r.power, pr)}
          </div>
          <div class="chart-frame wide-chart">
            <h4>Consumo promedio por subsistema</h4>
            ${renderLoadBarsSummary(pr.loadResults)}
          </div>
        </div>
        <ul class="analysis-list">
          <li><span>Potencia de diseño</span><strong>${formatUnit(pr.designPowerW,"W")}</strong></li>
          <li><span>Batería con margen</span><strong>${formatUnit(pr.batteryWhWithMargin,"Wh")}</strong></li>
          <li><span>Potencia solar BOL</span><strong>${formatUnit(pr.solarPowerBolW,"W")}</strong></li>
        </ul>
      </section>
    </div>
    <div class="dashboard-grid">
      <div class="dash-card recommendations-card">
        <h3>Recomendaciones</h3>
        <ul class="dash-recommendations">
          ${rec.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}
        </ul>
      </div>
    </div>`;
}

function summaryNarrative(gs, cr, pr) {
  if (gs.className === "critical") return "El diseño requiere revisión antes de considerarse viable: al menos un subsistema está fuera de margen.";
  if (gs.className === "warn") return "El diseño cierra de forma preliminar, pero tiene márgenes ajustados que conviene fortalecer.";
  return `El enlace RF dispone de ${formatUnit(cr.linkMarginDb, "dB")} de margen y el EPS cubre la órbita con una relación de generación de ${format(pr.generationRatio, 2)}x.`;
}

function renderLoadBarsSummary(loads) {
  const topLoads = [...loads].filter(load => load.averageW > 0).sort((a, b) => b.averageW - a.averageW).slice(0, 7);
  if (!topLoads.length) return '<p class="empty-inline">Sin cargas activas.</p>';
  const max = Math.max(...topLoads.map(load => load.averageW), 1);
  const height = 34 + topLoads.length * 34;
  const rows = topLoads.map((load, index) => {
    const y = 30 + index * 34;
    const width = Math.max(8, (load.averageW / max) * 230);
    const label = load.name.length > 18 ? `${load.name.slice(0, 17)}…` : load.name;
    return `
      <text x="12" y="${y + 14}" fill="#cbd5e1" font-size="12" font-family="Inter, sans-serif">${escapeHtml(label)}</text>
      <rect x="150" y="${y}" width="${width}" height="18" rx="5" fill="#4dc8e8" opacity="0.84">
        <animate attributeName="width" from="0" to="${width}" dur="0.55s" fill="freeze"/>
      </rect>
      <text x="${Math.min(390, 160 + width)}" y="${y + 14}" fill="#f8fafc" font-size="12" font-family="ui-monospace, monospace">${format(load.averageW, 1)} W</text>
    `;
  }).join("");
  return `<svg viewBox="0 0 430 ${height}" role="img" aria-label="Consumo promedio por subsistema">
    ${rows}
  </svg>`;
}
function updateStatus(label, cls) { 
  $("calculationState").textContent = label; 
  $("statusDot").className = `status-indicator ${cls||""}`; 
  $("statusDotBar").className = `status-indicator ${cls||""}`;
  $("stateMessage").textContent = `Estado de cálculo: ${label}`;
}

/* ==========================================================
   OFFLINE MISSION VISUALIZER
   ========================================================== */

class SatelliteViewer {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.data = null;
    this.phase = Math.random() * Math.PI * 2;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.container.innerHTML = "";
    this.container.appendChild(this.canvas);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.resize();
    this.animate();
  }

  updateVehicleModel(type) {
    this.vehicleType = type;
  }

  updateData(results) {
    this.data = results;
    this.vehicleType = results?.mission?.vehicleType || this.vehicleType || "CubeSat";
    this.resize();
    this.draw(performance.now());
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width || 320));
    const height = Math.max(240, Math.floor(rect.height || 300));
    this.canvas.width = Math.floor(width * this.pixelRatio);
    this.canvas.height = Math.floor(height * this.pixelRatio);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  }

  animate() {
    this.draw(performance.now());
    requestAnimationFrame(() => this.animate());
  }

  draw(now) {
    const ctx = this.ctx;
    const w = this.canvas.width / this.pixelRatio;
    const h = this.canvas.height / this.pixelRatio;
    if (!w || !h) return;

    const mission = this.data?.mission || getMissionInputs();
    const comm = this.data?.comm || getCommInputs(mission);
    const power = this.data?.power || getPowerInputs();
    const cr = this.data?.commResults;
    const pr = this.data?.powerResults;
    const t = now * 0.001 + this.phase;
    const compact = w < 560;
    const hudReserved = compact ? 144 : 0;
    const simBottomPad = compact ? 50 : 22;
    const simHeight = Math.max(145, h - hudReserved - simBottomPad);
    const cx = compact ? w * 0.5 : w * 0.42;
    const cy = compact ? hudReserved + simHeight * 0.52 : h * 0.52;
    const earthR = Math.min(w, simHeight) * (compact ? 0.13 : 0.14);
    const altitudeScale = Math.min(1, Math.log10(Math.max(10, mission.altitudeKm)) / 5);
    const orbitRx = Math.min(w * (compact ? 0.34 : 0.32), simHeight * 0.42, earthR + 56 + altitudeScale * 82);
    const orbitRy = orbitRx * 0.58;
    const angle = t * this.speedForOrbit(mission.orbitType);
    const satX = cx + Math.cos(angle) * orbitRx;
    const satY = cy + Math.sin(angle) * orbitRy;
    const lighting = this.getLightingModel(power, angle);

    ctx.clearRect(0, 0, w, h);
    this.drawBackground(ctx, w, h, t);
    this.drawOrbit(ctx, cx, cy, orbitRx, orbitRy, lighting, angle);
    this.drawEarth(ctx, cx, cy, earthR, t, lighting.inEclipse);
    this.drawLink(ctx, cx, cy, satX, satY, cr);
    this.drawSatellite(ctx, satX, satY, this.vehicleType, angle, lighting.inEclipse, t);
    this.drawHud(ctx, w, h, mission, comm, power, cr, pr, lighting);
  }

  drawBackground(ctx, w, h, t) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#07101f");
    g.addColorStop(0.56, "#0b1628");
    g.addColorStop(1, "#050814");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(77,200,232,0.08)";
    ctx.lineWidth = 1;
    for (let x = ((t * 10) % 44) - 44; x < w; x += 44) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + h * 0.28, h); ctx.stroke();
    }
    for (let y = 24; y < h; y += 42) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    for (let i = 0; i < 30; i += 1) {
      const x = (i * 83 + 37) % Math.max(w, 1);
      const y = (i * 47 + 19) % Math.max(h, 1);
      const a = 0.25 + 0.35 * Math.sin(t + i);
      ctx.globalAlpha = Math.max(0.08, a);
      ctx.fillRect(x, y, 1.2, 1.2);
    }
    ctx.globalAlpha = 1;
  }

  drawOrbit(ctx, cx, cy, rx, ry, lighting, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = "rgba(77,200,232,0.24)";
    ctx.lineWidth = 1.6;
    ctx.setLineDash([5, 8]);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    if (lighting.eclipseFraction <= 0.001) {
      ctx.strokeStyle = "rgba(245,158,11,0.9)";
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
    } else if (lighting.eclipseFraction >= 0.999) {
      ctx.strokeStyle = "rgba(100,116,139,0.82)";
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
    } else {
      ctx.strokeStyle = "rgba(245,158,11,0.92)";
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, lighting.eclipseEnd, lighting.eclipseStart + Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = "rgba(100,116,139,0.9)";
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, lighting.eclipseStart, lighting.eclipseEnd); ctx.stroke();
    }
    const markerX = Math.cos(angle) * rx;
    const markerY = Math.sin(angle) * ry;
    ctx.fillStyle = lighting.inEclipse ? "#94a3b8" : "#fbbf24";
    ctx.strokeStyle = "rgba(2,6,23,0.82)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(markerX, markerY, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  drawEarth(ctx, cx, cy, r, t, inEclipse) {
    const g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r);
    g.addColorStop(0, "#7dd3fc");
    g.addColorStop(0.42, "#1d4ed8");
    g.addColorStop(0.82, "#0f766e");
    g.addColorStop(1, "#082f49");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(125,211,252,0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    const night = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
    night.addColorStop(0, "rgba(2,6,23,0.62)");
    night.addColorStop(0.52, "rgba(2,6,23,0.08)");
    night.addColorStop(1, "rgba(251,191,36,0.08)");
    ctx.fillStyle = night;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    if (inEclipse) {
      ctx.fillStyle = "rgba(2,6,23,0.18)";
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.ellipse(cx, cy + i * r * 0.22, r * Math.cos(i * 0.18), r * 0.16, 0.1 * Math.sin(t), 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  drawLink(ctx, cx, cy, satX, satY, cr) {
    const ok = cr?.state?.className === "ok";
    const warn = cr?.state?.className === "warn";
    ctx.strokeStyle = ok ? "rgba(16,185,129,0.65)" : warn ? "rgba(245,158,11,0.72)" : "rgba(239,68,68,0.65)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 7]);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(satX, satY); ctx.stroke();
    ctx.setLineDash([]);
  }

  drawSatellite(ctx, x, y, type, angle, inEclipse, t) {
    const model = VEHICLE_MODELS[type] || VEHICLE_MODELS.Otro;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI * 0.5);
    const size = model.body;
    const panel = model.panel;
    ctx.shadowColor = inEclipse ? "rgba(148,163,184,0.3)" : "rgba(77,200,232,0.45)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = inEclipse ? "#64748b" : model.color;
    ctx.fillRect(-panel - size * 0.45, -5, panel, 10);
    ctx.fillRect(size * 0.45, -5, panel, 10);
    ctx.strokeStyle = "rgba(191,219,254,0.65)";
    ctx.lineWidth = 1;
    for (const dir of [-1, 1]) {
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        const px = dir < 0 ? -size * 0.45 - panel + i * panel / 4 : size * 0.45 + i * panel / 4;
        ctx.moveTo(px, -5); ctx.lineTo(px, 5); ctx.stroke();
      }
    }
    const bodyG = ctx.createLinearGradient(-size, -size, size, size);
    bodyG.addColorStop(0, "#f8fafc");
    bodyG.addColorStop(0.42, "#94a3b8");
    bodyG.addColorStop(1, "#334155");
    ctx.fillStyle = bodyG;
    const bodyW = model.bus === "geo" ? size * 1.45 : size * 1.1;
    const bodyH = model.bus === "probe" ? size * 0.95 : size * 1.1;
    ctx.fillRect(-bodyW * 0.5, -bodyH * 0.5, bodyW, bodyH);
    ctx.strokeStyle = "#e2e8f0";
    ctx.strokeRect(-bodyW * 0.5, -bodyH * 0.5, bodyW, bodyH);
    ctx.fillStyle = model.accent;
    ctx.fillRect(-size * 0.28, -bodyH * 0.38, size * 0.56, bodyH * 0.18);
    if (model.dish) {
      ctx.strokeStyle = "rgba(226,232,240,0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, -size * 0.95, size * 0.34, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -bodyH * 0.5); ctx.lineTo(0, -size * 1.1); ctx.stroke();
    }
    if (model.antenna) {
      ctx.beginPath(); ctx.arc(0, -size * 0.95, size * 0.34, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -size * 0.55); ctx.lineTo(0, -size * 1.28); ctx.stroke();
    }
    ctx.restore();
  }

  drawHud(ctx, w, h, mission, comm, power, cr, pr, lighting) {
    const compact = w < 560;
    const panelW = compact ? w - 36 : Math.min(280, w * 0.45);
    const x = compact ? 18 : w - panelW - 18;
    const y = 18;
    const panelH = compact ? 118 : 166;
    ctx.fillStyle = "rgba(8, 15, 29, 0.78)";
    ctx.strokeStyle = "rgba(77,200,232,0.28)";
    roundRect(ctx, x, y, panelW, panelH, 10);
    ctx.fill();
    ctx.stroke();
    this.hudText(ctx, "MISIÓN", x + 16, y + 24, "#4dc8e8", 11, true, panelW - 32);
    this.hudText(ctx, `${mission.vehicleType} · ${mission.orbitType}`, x + 16, y + 48, "#f3f4f6", compact ? 13 : 14, true, panelW - 32);
    this.hudText(ctx, `${format(mission.altitudeKm, 0)} km altitud`, x + 16, y + 70, "#9ca3af", 12, false, panelW - 32);
    if (!compact) this.hudText(ctx, `Enlace: ${format(comm.linkDistanceKm, 0)} km`, x + 16, y + 92, "#9ca3af", 12, false, panelW - 32);
    const margin = cr ? `${format(cr.linkMarginDb, 1)} dB` : "N/D";
    const powerText = pr ? `${format(pr.totalAverageW, 1)} W avg` : "N/D";
    this.hudText(ctx, `Margen RF: ${margin}`, x + 16, y + (compact ? 94 : 116), cr?.state?.className === "critical" ? "#ef4444" : cr?.state?.className === "warn" ? "#f59e0b" : "#10b981", 12, true, panelW - 32);
    if (!compact) this.hudText(ctx, `EPS: ${powerText}`, x + 16, y + 138, "#e2e8f0", 12, false, panelW - 32);
    const badge = lighting.inEclipse ? "ECLIPSE" : "LUZ SOLAR";
    const badgeW = lighting.inEclipse ? 104 : 116;
    ctx.fillStyle = lighting.inEclipse ? "rgba(100,116,139,0.88)" : "rgba(245,158,11,0.9)";
    roundRect(ctx, 18, h - 48, badgeW, 30, 6);
    ctx.fill();
    this.hudText(ctx, badge, 34, h - 29, lighting.inEclipse ? "#e2e8f0" : "#111827", 11, true, badgeW - 24);
  }

  hudText(ctx, text, x, y, color, size, bold = false, maxWidth = Infinity) {
    ctx.fillStyle = color;
    ctx.font = `${bold ? 700 : 500} ${size}px ${bold ? "ui-sans-serif" : "ui-monospace"}, system-ui, sans-serif`;
    ctx.fillText(this.fitText(ctx, text, maxWidth), x, y);
  }

  fitText(ctx, text, maxWidth) {
    if (!Number.isFinite(maxWidth) || ctx.measureText(text).width <= maxWidth) return text;
    let value = String(text);
    while (value.length > 3 && ctx.measureText(`${value}…`).width > maxWidth) value = value.slice(0, -1);
    return `${value}…`;
  }

  getLightingModel(power, angle) {
    const orbitMin = Math.max(power.orbitDurationMin, power.sunlightMin + power.eclipseMin, 1);
    const eclipseFraction = clamp(power.eclipseMin / orbitMin, 0, 1);
    const eclipseSweep = eclipseFraction * Math.PI * 2;
    const eclipseCenter = Math.PI;
    const eclipseStart = eclipseCenter - eclipseSweep / 2;
    const eclipseEnd = eclipseCenter + eclipseSweep / 2;
    let inEclipse = false;
    if (eclipseFraction >= 0.999) inEclipse = true;
    else if (eclipseFraction > 0.001) inEclipse = this.angleWithin(angle, eclipseStart, eclipseEnd);
    return { eclipseFraction, eclipseStart, eclipseEnd, inEclipse };
  }

  speedForOrbit(type) {
    if (type === "GEO") return 0.18;
    if (type === "MEO") return 0.32;
    return 0.58;
  }

  angleWithin(angle, start, end) {
    const a = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const s = ((start % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const e = ((end % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    if (Math.abs(s - e) < 1e-6) return false;
    return s < e ? a >= s && a <= e : a >= s || a <= e;
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

/* ==========================================================
   TABLE LOADS & PRESETS
   ========================================================== */

function renderLoadsTable(loads) {
  $("loadsTable").innerHTML = loads.map((l,i) => `
    <div class="load-row">
      <div class="field"><input data-load="name" type="text" value="${escapeAttribute(l.name)}"></div>
      <div class="field"><input data-load="activeW" type="number" min="0" step="0.1" value="${l.activeW}"></div>
      <div class="field"><input data-load="standbyW" type="number" min="0" step="0.1" value="${l.standbyW}"></div>
      <div class="field"><input data-load="duty" type="number" min="0" max="100" step="1" value="${format(l.duty*100,0)}"></div>
      <div class="field"><input data-load="eclipseDuty" type="number" min="0" max="100" step="1" value="${format(l.eclipseDuty*100,0)}"></div>
      <button class="btn btn-danger btn-sm remove-load" type="button" title="Eliminar">×</button>
    </div>`).join("");
  document.querySelectorAll(".remove-load").forEach(b => b.addEventListener("click", e => { e.target.closest(".load-row").remove(); debouncedCalc(); }));
  $("loadsTable").querySelectorAll("input").forEach(inp => inp.addEventListener("input", debouncedCalc));
}

function applyPreset(name) {
  const p = PRESETS[name] || PRESETS.cubesat;
  Object.entries(p.mission).forEach(([k,v]) => setValue(k,v));
  Object.entries(p.comm).forEach(([k,v]) => { if (k==="estimateDistance") setChecked(k,v); else setValue(k,v); });
  Object.entries(p.power).forEach(([k,v]) => setValue(k,v));
  appState.loads = cloneLoads(p.loads); renderLoadsTable(appState.loads);
  $("linkDistanceKm").disabled = $("estimateDistance").checked;
  calculateMission();
}
function resetValues() {
  $("presetSelect").value = "cubesat";
  applyPreset("cubesat");
  appState.visitedSteps = new Set(["mission"]);
  navigateToStep("mission");
}

/* ==========================================================
   EXPORT
   ========================================================== */

function buildSummaryText() {
  if (!appState.lastResults) return "No hay resultados.";
  const { mission: m, commResults: cr, powerResults: pr, globalState: gs } = appState.lastResults;
  return `Orbital Systems Sizer - Reporte\nMisión: ${m.missionName} (${gs.label})\nEb/N0: ${format(cr.ebNoDb)} dB\nBatería: ${format(pr.batteryWhWithMargin)} Wh\nPanel: ${format(pr.solarAreaM2)} m²`;
}
async function copySummary() { try { await navigator.clipboard.writeText(buildSummaryText()); updateStatus("Copiado", "ok"); } catch { updateStatus("Error Copia", "warn"); } }
function exportSummary() { const b = new Blob([buildSummaryText()], {type:"text/plain;charset=utf-8"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "reporte.txt"; document.body.appendChild(a); a.click(); URL.revokeObjectURL(u); }

/* ==========================================================
   INIT & BINDINGS
   ========================================================== */

const debouncedCalc = debounce(calculateMission, 350);

function setupAutoCalculate() {
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener("input", debouncedCalc);
    el.addEventListener("change", debouncedCalc);
  });
}

function bindEvents() {
  $("presetSelect").addEventListener("change", () => applyPreset($("presetSelect").value));
  $("resetBtn").addEventListener("click", resetValues);
  $("addLoadBtn").addEventListener("click", () => {
    const loads = collectLoadRows();
    loads.push({ name: "Nuevo", activeW: 1, standbyW: 0, duty: 0.5, eclipseDuty: 0.5 });
    renderLoadsTable(loads);
    calculateMission();
  });
  $("copySummaryBtn").addEventListener("click", copySummary);
  $("exportSummaryBtn").addEventListener("click", exportSummary);
  $("printBtn").addEventListener("click", () => window.print());
  $("estimateDistance").addEventListener("change", () => {
    $("linkDistanceKm").disabled = $("estimateDistance").checked;
    if ($("estimateDistance").checked) setValue("linkDistanceKm", Math.round(estimateSlantRangeKm(numberValue("altitudeKm"))));
  });
  
  document.querySelectorAll(".step-btn[data-target]").forEach(b => b.addEventListener("click", () => navigateToStep(b.dataset.target)));
  document.querySelectorAll("[data-goto]").forEach(b => b.addEventListener("click", () => navigateToStep(b.dataset.goto)));
}

function init() {
  renderLoadsTable(appState.loads);
  $("linkDistanceKm").disabled = $("estimateDistance").checked;
  bindEvents();
  setupAutoCalculate();
  
  if ($("satelliteCanvas")) window.viewerMission = new SatelliteViewer($("satelliteCanvas"));
  if ($("resultsCanvas")) window.viewerResults = new SatelliteViewer($("resultsCanvas"));
  
  calculateMission();
}

document.addEventListener("DOMContentLoaded", init);
