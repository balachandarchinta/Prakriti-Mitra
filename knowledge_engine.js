/**
 * Carbon Knowledge Engine - Shared Intelligence Layer (Stage X)
 * Contains emission factors, water/waste conversion factors, land use estimates,
 * country benchmarks, and carbon conversion models.
 */

const CarbonKnowledgeEngine = {
  // Emission factors in kg CO2e per unit
  EMISSION_FACTORS: {
    // Energy (per kWh / kg)
    electricity: 0.82, // kg CO2e per kWh (India Grid average)
    lpg: 2.98,        // kg CO2e per kg
    diesel: 2.68,     // kg CO2e per Liter
    petrol: 2.31,     // kg CO2e per Liter
    coal: 2.42,       // kg CO2e per kg

    // Transport (per km / passenger-km)
    car_petrol: 0.170, // kg CO2e per km
    car_diesel: 0.190, // kg CO2e per km
    car_ev: 0.050,     // kg CO2e per km (electric vehicle grid mix)
    bus: 0.030,        // kg CO2e per passenger-km
    train: 0.012,      // kg CO2e per passenger-km
    motorbike: 0.080,  // kg CO2e per km
    flight_short: 0.115, // kg CO2e per passenger-km (<1500 km)
    flight_long: 0.150,  // kg CO2e per passenger-km (>1500 km)

    // Food (per meal / kg)
    food_nonveg: 3.3, // kg CO2e per meal
    food_veg: 1.2,    // kg CO2e per meal
    food_vegan: 0.7,  // kg CO2e per meal
    food_waste: 1.9,  // kg CO2e per kg food waste

    // Waste (per kg)
    waste_landfill: 0.50, // kg CO2e per kg landfill waste
    waste_recycled: -0.25, // kg CO2e avoided per kg recycled (offset credit)
    waste_composted: -0.10, // kg CO2e avoided per kg composted (offset credit)

    // Water (per Liter)
    water_liter: 0.0003, // kg CO2e per Liter (treatment and pumping energy)

    // Tree Offsets (per tree per year / day)
    tree_yearly_absorption: 22.0, // kg CO2e absorbed by one mature tree per year
    tree_daily_absorption: 22.0 / 365.0, // kg CO2e absorbed per day

    // Event specific materials (per kg / unit)
    material_plastic: 6.0,      // kg CO2e per kg plastic decorations/plates
    material_paper_flex: 2.5,   // kg CO2e per kg flex banners/paper
    material_flowers: 0.15,     // kg CO2e per kg fresh cut flowers (transport & pesticide impact)
    material_gifts: 1.2,        // kg CO2e per return gift
  },

  // Benchmarks for comparative analysis
  BENCHMARKS: {
    household: {
      // Annualized benchmarks per household member (in kg CO2e per year)
      electricity: 600,   // ~730 kWh electricity
      transport: 1200,   // ~7000 km travel mixed
      food: 1100,        // mixed vegetarian/non-vegetarian
      waste: 180,        // ~360 kg municipal waste
      water: 25,         // water pumping emissions
      total: 3105        // Total annual benchmark per capita (kg CO2e)
    },
    event: {
      // Per guest benchmarks (in kg CO2e per guest-day)
      travel: 12.0,
      food: 4.5,
      electricity: 5.0,
      materials: 3.5,
      total: 25.0
    },
    children: {
      // Daily potential savings (in kg CO2e per school day)
      transport_avoided: 1.5, // e.g. cycling/walking instead of car
      waste_avoided: 0.5,     // recycling/no food waste
      tree_planted: 0.06,     // daily offset credit for planting
      total_target: 2.06      // Target savings/credits daily
    },
    village: {
      // Average score benchmark
      score: 72
    }
  },

  /**
   * Calculates carbon score from 0 (very high emissions) to 100 (net zero or negative emissions)
   * @param {number} actualEmissions - Actual emissions in kg CO2e
   * @param {number} benchmarkEmissions - Benchmark emissions in kg CO2e
   * @returns {number} Score between 0 and 100
   */
  calculateScore: function(actualEmissions, benchmarkEmissions) {
    if (actualEmissions <= 0) return 100;
    if (benchmarkEmissions <= 0) return 50;

    // Linear-log scaling so that 100% of benchmark yields score 75
    // Emissions twice the benchmark yields score ~45, emissions 4x yields score ~15
    const ratio = actualEmissions / benchmarkEmissions;
    let score;
    if (ratio <= 1.0) {
      // Linear scaling from 75 to 100
      score = 75 + (1.0 - ratio) * 25;
    } else {
      // Logarithmic scaling below 75
      score = 75 - Math.min(75, Math.log2(ratio) * 25);
    }
    return Math.round(Math.max(0, Math.min(100, score)));
  },

  /**
   * Translates score to color-coded grade
   * Color coding:
   * 90-100 = Dark Green
   * 70-89 = Light Green
   * 50-69 = Yellow
   * 30-49 = Orange
   * 0-29 = Red
   */
  getGrade: function(score) {
    if (score >= 90) {
      return {
        grade: "Prakriti Mitra",
        color: "#1e5e2f", // Dark Green
        textColor: "#ffffff",
        badgeColor: "#2ecc71", // Neon Emerald
        accentColor: "#2ecc71",
        label: "Dark Green",
        desc: "Exemplary green standard. Highly sustainable lifestyle / operations."
      };
    } else if (score >= 70) {
      return {
        grade: "Green Citizen",
        color: "#2ecc71", // Light Green
        textColor: "#111111",
        badgeColor: "#a3e4d7",
        accentColor: "#27ae60",
        label: "Light Green",
        desc: "Eco-conscious. Active sustainable choices, low carbon footprint."
      };
    } else if (score >= 50) {
      return {
        grade: "Sustaining",
        color: "#f1c40f", // Yellow
        textColor: "#111111",
        badgeColor: "#fdebd0",
        accentColor: "#f39c12",
        label: "Yellow",
        desc: "Moderate impact. Solid practices but significant room for reduction."
      };
    } else if (score >= 30) {
      return {
        grade: "Developing",
        color: "#e67e22", // Orange
        textColor: "#ffffff",
        badgeColor: "#fadbd8",
        accentColor: "#d35400",
        label: "Orange",
        desc: "High carbon intensity. Basic awareness but lacking structural improvements."
      };
    } else {
      return {
        grade: "Warning",
        color: "#e74c3c", // Red
        textColor: "#ffffff",
        badgeColor: "#f9ebd0",
        accentColor: "#c0392b",
        label: "Red",
        desc: "Extreme carbon footprint. High energy waste, immediate reduction needed."
      };
    }
  },

  /**
   * Helper to convert emissions to common environmental storytelling analogies
   */
  getAnalogies: function(kgCO2) {
    const carKms = Math.round(kgCO2 / this.EMISSION_FACTORS.car_petrol);
    const treeYears = Math.round(kgCO2 / this.EMISSION_FACTORS.tree_yearly_absorption);
    const plasticBottles = Math.round(kgCO2 / 0.08); // roughly 80g CO2 per PET bottle lifecycle
    const smartphoneCharges = Math.round(kgCO2 / 0.008); // roughly 8g per full charge

    return {
      carKms,
      treeYears,
      plasticBottles,
      smartphoneCharges
    };
  }
};

// Export for Node/CommonJS or keep globally for browser execution
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CarbonKnowledgeEngine;
} else {
  window.CarbonKnowledgeEngine = CarbonKnowledgeEngine;
}
