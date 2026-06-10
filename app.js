/**
 * Prakriti Mitra - Main Coordinator Application Script
 */

class PrakritiMitraApp {
  constructor() {
    this.map = null;
    this.mapLayers = {};
    this.activeLayerName = "standard";
    this.apiKey = localStorage.getItem("gemini_api_key") || "";
    
    // Global State for Workflows (initialized with mockup baselines)
    this.state = {
      household: {
        inputs: { members: 4, electricity: 250, fuel_type: "LPG", fuel_qty: 1, transport_type: "Petrol Car", transport_kms: 150, diet: "Vegetarian", waste: 1.5, waste_recycled: 20, water: 135000 },
        output: {
          score: 78,
          grade_info: { grade: "Green Family", color: "#2ecc71", badgeColor: "#a3e4d7", accentColor: "#27ae60", desc: "Eco-conscious. Active sustainable choices, low carbon footprint." },
          sustainability_metrics: { carbon_footprint: 450, water_footprint: 16200, waste_generated: 45, energy_consumed: 250 },
          benchmarks_comparison: { percent_of_average: 85, city_percentile: 82, state_percentile: 79, national_percentile: 78 },
          story: "Your family is doing a wonderful job! By achieving a score of 78 (Green Family), your household carbon footprint of 450 kg CO2e is 15% lower than the city average. Heating water and driving your petrol car are your largest contributors. Segregating 20% of your waste avoids municipal landfill methane. If you carpool twice a week, you'll save an additional 80 kg of carbon per month!",
          recommendations: [
            { action: "Switch to 5-star BEE rated appliances and LED bulbs", points: 6, impact: "High", cost: "Medium", desc: "Reduces electricity carbon by 15-20%." },
            { action: "Reduce AC usage & set temp to 24°C", points: 8, impact: "Medium", cost: "Zero", desc: "Saves up to 100 kWh monthly." },
            { action: "Carpool or use public transit twice weekly", points: 10, impact: "High", cost: "Zero", desc: "Saves vehicle fuel emissions directly." }
          ],
          challenges: [
            { id: "c_led", title: "Banish the Bulbs", desc: "Replace at least 3 incandescent bulbs with 5-star LEDs", xp: 150, days: 3 },
            { id: "c_ac", title: "Sweet 24°C AC", desc: "Keep AC set at 24°C or higher for 7 consecutive days", xp: 200, days: 7 },
            { id: "c_carpool", title: "Rideshare Rookie", desc: "Carpool or ride public transit to work twice this week", xp: 250, days: 7 }
          ],
          gamification: { level: "Eco Advocate", leaderboard_rank: "#12", badges: [
            { id: "b_zero_waste", name: "Zero Waste Hero", icon: "♻️", desc: "Recycles over 80% of waste." },
            { id: "b_water_saver", name: "Water Whisperer", icon: "💧", desc: "Maintains minimal water consumption." }
          ] }
        }
      },
      event: {
        inputs: { event_type: "Wedding", guests: 250, duration: 2, travel_avg_km: 80, flights: 12, catering_diet: "Vegetarian", electricity_kwh: 1200, generator_hours: 6, decor_type: "Fresh Flowers (Local)", gift_qty: 200 },
        output: {
          score: 65,
          grade_info: { grade: "Silver Event", color: "#f1c40f", badgeColor: "#fdebd0", accentColor: "#f39c12", desc: "Moderate impact. Solid practices but significant room for reduction." },
          sustainability_metrics: { carbon_footprint: 3400, water_footprint: 30000, waste_generated: 400, energy_consumed: 1200 },
          benchmarks_comparison: { percent_of_average: 110, industry_percentile: 68 },
          story: "This Wedding Sustainability Report indicates a Prakriti Score of 65 (Silver Event). Your guest travel contributed to 52% of the footprint, with flights being a heavy driver. Food production and generator diesel made up another 40%. On the bright side, using fresh local flowers instead of PVC plastics saved roughly 180 kg of emissions. Transitioning to shared guest shuttles and organic farming meals will boost your grade to Gold!",
          recommendations: [
            { action: "Provide shuttle buses or carpool matching for guests", points: 18, impact: "High", cost: "Medium", desc: "Reduces overall guest travel carbon (typically the largest source)." },
            { action: "Partner with a local food redistribution NGO to donate excess catering", points: 9, impact: "Medium", cost: "Zero", desc: "Avoids organic waste decomposing in landfills." },
            { action: "Switch to LED venue spotlighting and solar generators", points: 6, impact: "Medium", cost: "Medium", desc: "Lowers diesel usage and grid energy demand." }
          ],
          challenges: [],
          gamification: { level: "Active Learner", leaderboard_rank: "#28", badges: [
            { id: "b_nature_decor", name: "Bio-Decor Pioneer", icon: "🌸", desc: "100% biodegradable event venue styling." }
          ] }
        }
      },
      children: {
        inputs: { student_name: "Ananya", age: 11, walk_days: 5, cycle_days: 18, bus_days: 8, trees_planted: 3, reusable_bottle: "Always", clean_plate: "Every meal", recycle_active: "Yes, regularly" },
        output: {
          score: 92,
          grade_info: { grade: "Green Champion", color: "#1e5e2f", badgeColor: "#2ecc71", accentColor: "#2ecc71", desc: "Exemplary green standard. Highly sustainable lifestyle / operations." },
          sustainability_metrics: { carbon_saved: 128, water_saved: 30, waste_diverted: 5, energy_saved: 12, trees_planted: 3 },
          benchmarks_comparison: { percent_of_target: 124, school_percentile: 92 },
          story: "Congratulations, young Green Champion Ananya! Your daily actions have saved a whopping 128 kg of carbon this month. By cycling 18 days and taking the school bus, you kept 92 kg of carbon out of the air. Keeping a reusable water bottle saved 20 plastic bottles. You've earned the Bicycle Hero and Climate Champion badges! Keep shielding nature!",
          recommendations: [
            { action: "Create a classroom recycling station", points: 12, impact: "Medium", cost: "Low" },
            { action: "Plant 2 more native flower saplings at school", points: 15, impact: "High", cost: "Low" }
          ],
          challenges: [
            { id: "c_pedal", title: "Pedal Power", desc: "Cycle to school for 5 days in a row", xp: 300, days: 5 },
            { id: "c_plate", title: "Clean Plate Club", desc: "Finish every bite of lunch at school for a week", xp: 150, days: 7 },
            { id: "c_tree_guard", title: "Green Guardian", desc: "Adopt one sapling and water it daily", xp: 200, days: 30 }
          ],
          gamification: { level: "Prakriti Guardian", leaderboard_rank: "#3", badges: [
            { id: "b_cycle_hero", name: "Bicycle Hero", icon: "🚲", desc: "Cycled to school 15+ days this month." },
            { id: "b_tree_guard", name: "Tree Guardian", icon: "🌳", desc: "Planted 3 or more trees." },
            { id: "b_climate_champion", name: "Climate Champion", icon: "🏆", desc: "Maintained zero meal waste." }
          ] }
        }
      },
      village: {
        inputs: { village_name: "Shankarpally", families: 1245, green_families: 863, water_rating: "5 Stars", waste_rating: "4 Stars", tree_rating: "3 Stars", energy_rating: "2 Stars", top_ward: "Ward 6", top_ward_score: 91 },
        output: {
          score: 81,
          grade_info: { grade: "Model Gram Panchayat", color: "#2ecc71", badgeColor: "#a3e4d7", accentColor: "#27ae60", desc: "Eco-conscious. Active sustainable choices." },
          sustainability_metrics: { village_score: 81, water_efficiency: 100, waste_efficiency: 80, tree_coverage_score: 60, renewable_energy_score: 40, green_family_ratio: 69 },
          benchmarks_comparison: { district_rank: 4, state_rank: 42, district_average_score: 72 },
          story: "Shankarpally Panchayat ranks #4 in the district with a score of 81. Your community excels in water conservation (5 stars) and waste collection (4 stars). Over 69% of families are certified Green. To climb to the #1 spot, the village should construct community solar grids for agricultural pump sets and expand reforestation near water tanks.",
          recommendations: [
            { action: "Install solar-powered micro grids for streetlighting", points: 20, impact: "High", cost: "High", desc: "Reduces grid electricity billing and grid footprint." },
            { action: "Construct community percolation ponds for rainwater recharging", points: 15, impact: "High", cost: "Medium", desc: "Replenishes local village groundwater table." }
          ],
          challenges: [
            { id: "c_segregate", title: "100% Ward Segregation", desc: "Achieve complete wet/dry segregation in your street", xp: 1000, days: 30 }
          ],
          gamification: { level: "Prakriti Guardian", leaderboard_rank: "#4", badges: [
            { id: "b_panchayat_top", name: "Model Gram Panchayat", icon: "🌾", desc: "Certified high water and tree cover rating." }
          ] }
        }
      }
    };

    // Active Survey States
    this.currentSurveyWorkflow = null;
    this.currentQuestionIndex = 0;
    this.surveyResponses = {};
    
    // Satelite Spatial Plots Data
    this.spatialPlots = [
      {
        id: "plot_household",
        name: "Greenwood Family Lot (P-104)",
        type: "household",
        coords: [
          [17.388, 78.484],
          [17.389, 78.484],
          [17.389, 78.485],
          [17.388, 78.485]
        ],
        metrics: { kwh: 320, transport_kms: 120 },
        postgis_query: `SELECT ST_Area(ST_Intersection(p.geom, c.canopy_raster)) / ST_Area(p.geom) * 100 AS tree_cover_pct,
       ST_Area(ST_Intersection(p.geom, w.water_raster)) AS water_body_sqm
FROM municipal_plots p, satellite_canopy c, satellite_water w 
WHERE p.plot_id = 'P-104' 
GROUP BY p.geom;`,
        postgis_output: `tree_cover_pct | water_body_sqm
---------------+------------------
     28.5%     |    14.2 sqm`
      },
      {
        id: "plot_event",
        name: "Vaikunth Event Venue (V-40)",
        type: "event",
        coords: [
          [17.384, 78.489],
          [17.386, 78.489],
          [17.386, 78.491],
          [17.384, 78.491]
        ],
        metrics: { guests: 350, travel_avg_km: 100 },
        postgis_query: `SELECT ST_Area(p.geom) AS total_venue_sqm, 
       ST_Value(l.landuse_raster, ST_Centroid(p.geom)) AS landuse_class
FROM municipal_plots p, satellite_landuse l
WHERE p.plot_id = 'V-40';`,
        postgis_output: `total_venue_sqm | landuse_class
-----------------+------------------
    4200.5 sqm   | Commercial Buffer`
      },
      {
        id: "plot_village",
        name: "Shankarpally Panchayat Boundary (GP-06)",
        type: "village",
        coords: [
          [17.378, 78.475],
          [17.383, 78.475],
          [17.383, 78.481],
          [17.378, 78.481]
        ],
        metrics: { families: 1245 },
        postgis_query: `SELECT count(f.id) AS assessed_families,
       (count(f.id) FILTER (WHERE f.last_carbon_score > 70))::float / count(f.id) * 100 AS green_ratio_pct
FROM gram_families f
WHERE f.panchayat_id = 'GP-06';`,
        postgis_output: `assessed_families | green_ratio_pct
-------------------+-----------------
       1245        |     69.31%`
      }
    ];
  }

  init() {
    this.initMap();
    this.initGlobalStats();
    this.renderActiveDashboard("family");
    this.renderActiveDashboard("event");
    this.renderActiveDashboard("children");
    this.renderActiveDashboard("village");
    
    // Load saved settings if any
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      document.getElementById("gemini-key-input").value = savedKey;
      this.apiKey = savedKey;
    }

    // Auto-play / show launch film when the page opens
    setTimeout(() => {
      this.playLaunchFilm();
    }, 300);
  }

  // Initialize Landing view indicators
  initGlobalStats() {
    document.getElementById("global-score").textContent = this.state.household.output.score;
    document.getElementById("global-co2").textContent = `${this.state.children.output.sustainability_metrics.carbon_saved} kg`;
    document.getElementById("global-trees").textContent = this.state.children.output.sustainability_metrics.trees_planted + 5;
    document.getElementById("global-water").textContent = "4,500 L";
  }

  // View Router
  switchView(viewName) {
    if (viewName === "household") viewName = "family";
    document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    
    const activeSection = document.getElementById(`view-${viewName}`);
    const activeBtn = document.getElementById(`nav-${viewName}`);
    
    if (activeSection) activeSection.classList.add("active");
    if (activeBtn) activeBtn.classList.add("active");

    // Leaflet map refresh when view becomes visible
    if (viewName === "sandbox" && this.map) {
      setTimeout(() => this.map.invalidateSize(), 100);
    }
  }

  startSurveyDirect(workflow) {
    this.switchView('sandbox');
    this.startSurvey(workflow);
  }

  // Settings Management
  openSettings() {
    document.getElementById("settings-modal").classList.add("active");
  }
  closeSettings() {
    document.getElementById("settings-modal").classList.remove("active");
  }
  saveSettings() {
    const key = document.getElementById("gemini-key-input").value.trim();
    localStorage.setItem("gemini_api_key", key);
    this.apiKey = key;
    this.closeSettings();
    alert("Gemini API Key saved successfully! The router will now use live Vertex Gemini inference.");
  }

  // Certificate Modal Management
  showCertificate() {
    const certModal = document.getElementById("certificate-modal");
    const out = this.state.event.output;
    const inp = this.state.event.inputs;
    
    document.getElementById("cert-event-name").textContent = `${inp.event_type || 'Custom'} Sustainability Index`;
    document.getElementById("cert-score").textContent = `${out.score}/100`;
    
    // avoided carbon
    const factors = window.CarbonKnowledgeEngine.EMISSION_FACTORS;
    const offset = Math.round(out.sustainability_metrics.carbon_offset || 150);
    document.getElementById("cert-offset").textContent = `${offset} kg CO₂e`;
    document.getElementById("cert-grade").textContent = out.grade_info.grade;
    
    certModal.classList.add("active");
  }
  closeCertificate() {
    document.getElementById("certificate-modal").classList.remove("active");
  }

  // Interactive Maps Setup
  initMap() {
    // Center around Shankarpally Hyderabad coordinates
    this.map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([17.383, 78.485], 14);

    // Standard dark base layer
    const standardLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    });
    standardLayer.addTo(this.map);

    this.mapLayers = {
      standard: standardLayer
    };

    // Add highlighted PostGIS plots
    this.spatialPlots.forEach(plot => {
      const polygon = L.polygon(plot.coords, {
        color: "#2ecc71",
        fillColor: "#2ecc71",
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: "3, 5"
      }).addTo(this.map);

      polygon.bindTooltip(plot.name, { sticky: true, className: "glass-card" });
      
      polygon.on("click", () => {
        this.runSpatialPostGISQuery(plot);
      });
    });
  }

  // Simulated PostGIS SQL Terminal output
  runSpatialPostGISQuery(plot) {
    const consoleBody = document.getElementById("sql-console-body");
    consoleBody.innerHTML = `
      <div style="color: #666;">-- Triggering AlloyDB Spatial Indexing...</div>
      <div class="sql-code">SELECT ST_Contains(geom, ST_MakePoint(longitude, latitude)) FROM plots;</div>
      <div style="color: #666;">-- Fetching Sentinel Satellite Layer data...</div>
    `;

    setTimeout(() => {
      consoleBody.innerHTML += `
        <div class="sql-code">${plot.postgis_query}</div>
        <div style="color: #666;">-- Running geometry intersection...</div>
      `;
      
      setTimeout(() => {
        consoleBody.innerHTML += `
          <div class="sql-output"><pre>${plot.postgis_output}</pre></div>
          <div style="color: var(--color-lightgreen);">✔ Spatial data resolved. Automatic survey template selected.</div>
        `;
        
        // Auto-fill Sandbox Router input based on plot selection
        let textInput = "";
        if (plot.type === "household") {
          textInput = `Geospatial plot ${plot.name} analyzed. Utility usage: ${plot.metrics.kwh} kWh electric grid, weekly travel: ${plot.metrics.transport_kms} kms.`;
        } else if (plot.type === "event") {
          textInput = `Geospatial plot ${plot.name} analyzed. Guest count is ${plot.metrics.guests} people, average transport is ${plot.metrics.travel_avg_km} km.`;
        } else if (plot.type === "village") {
          textInput = `Geospatial boundaries for Shankarpally Gram Panchayat GP-06 loaded. Analyzing collective rural community indicators, tree canopy density, water bodies, and village street scores for 1245 village families.`;
        }

        document.getElementById("router-text-input").value = textInput;
        this.runRoutingStage(plot.metrics, plot.type);
      }, 800);
    }, 500);
  }

  // Sentinel spectral bands styling
  setMapLayer(layerName) {
    this.activeLayerName = layerName;
    document.querySelectorAll(".map-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`map-layer-${layerName}`).classList.add("active");

    const layersColors = {
      standard: { color: "#2ecc71", fillColor: "#2ecc71" },
      canopy: { color: "#1e5e2f", fillColor: "#1e5e2f" }, // Forest emerald
      water: { color: "#00ffff", fillColor: "#00ffff" },  // Vibrant Cyan water
      landuse: { color: "#f39c12", fillColor: "#f39c12" }  // Soil/Urban Orange
    };

    const targetStyle = layersColors[layerName];

    this.map.eachLayer(layer => {
      if (layer instanceof L.Polygon) {
        layer.setStyle({
          color: targetStyle.color,
          fillColor: targetStyle.fillColor,
          fillOpacity: layerName === "standard" ? 0.15 : 0.35
        });
      }
    });

    const consoleBody = document.getElementById("sql-console-body");
    consoleBody.innerHTML += `
      <div style="color: #666;">-- Switched Sentinel Band View: ${layerName.toUpperCase()}</div>
    `;
  }

  // Developer Sandbox Chips
  fillSandboxChip(type) {
    const textInputs = {
      household: "Electricity bill: 350 kWh. Petrol car daily travel is 25 kms. Vegetarian diet with 4 members.",
      event: "Wedding event. Guest size is 350 people for 2 days. 12 guests arriving by flight. Floral decoration.",
      children: "I rode my bicycle to school for 15 days, planted 3 trees, and always finish all food on my lunch plate.",
      hindi: "मेरा बिजली का बिल 250 units है और हमने 5 पेड़ (trees) लगाए हैं।"
    };
    document.getElementById("router-text-input").value = textInputs[type] || "";
  }

  // STAGE 0: EXECUTE LLM ROUTING
  async runRoutingStage(geospatialPreseeds = {}, forceWorkflow = null) {
    const textInput = document.getElementById("router-text-input").value.trim();
    if (!textInput && !forceWorkflow) {
      alert("Please enter utility data or select a satellite plot coordinates boundary.");
      return;
    }

    const logsContainer = document.getElementById("pipeline-trace-logs");
    logsContainer.innerHTML = `<div style="color: #666;">Stage 0: Initiating Carbon Identity Routing Agent...</div>`;

    let routeResult;
    if (forceWorkflow) {
      routeResult = {
        workflow: forceWorkflow,
        confidence_score: 1.0,
        extracted_metrics: geospatialPreseeds,
        detected_language: "en"
      };
      logsContainer.innerHTML = `
        <div class="log-entry">
          <div class="log-title" onclick="app.toggleLogDetails(this)">
            <span>[Stage 0] Identity Router Agent: Geospatial Resolve</span>
            <span>1.0 cert</span>
          </div>
          <div class="log-details" style="display: block;">${JSON.stringify(routeResult, null, 2)}</div>
        </div>
      `;
    } else {
      const router = new RouterAgent(this.apiKey);
      routeResult = await router.run(textInput);
      logsContainer.innerHTML = `
        <div class="log-entry">
          <div class="log-title" onclick="app.toggleLogDetails(this)">
            <span>[Stage 0] Identity Router Agent: Successful</span>
            <span>${routeResult.confidence_score} cert</span>
          </div>
          <div class="log-details" style="display: block;">${JSON.stringify(routeResult, null, 2)}</div>
        </div>
      `;
    }

    if (routeResult.workflow === "unsupported") {
      logsContainer.innerHTML += `<div style="color: var(--color-red); padding-top: 0.5rem;">Error: Router classified input as Unsupported.</div>`;
      return;
    }

    // Launch Survey Agent
    const mergedMetrics = { ...geospatialPreseeds, ...routeResult.extracted_metrics };
    this.startSurvey(routeResult.workflow, mergedMetrics);
  }

  // Toggle Trace log accordion
  toggleLogDetails(el) {
    const details = el.nextElementSibling;
    if (details.style.display === "block") {
      details.style.display = "none";
    } else {
      details.style.display = "block";
    }
  }

  // Dynamic Survey Engine Controller
  startSurvey(workflow, extractedMetrics = {}) {
    this.currentSurveyWorkflow = workflow;
    this.currentQuestionIndex = 0;
    this.surveyResponses = {};
    
    const surveyAgent = new SurveyAgent();
    const questions = surveyAgent.getSurveyTemplate(workflow);
    
    if (!questions) return;

    // Prefill with extracted metrics
    questions.forEach(q => {
      if (extractedMetrics[q.key] !== undefined) {
        this.surveyResponses[q.key] = extractedMetrics[q.key];
      }
    });

    const surveyCard = document.getElementById("survey-container-card");
    surveyCard.style.display = "block";

    this.renderSurveyQuestion();
  }

  renderSurveyQuestion() {
    const questions = new SurveyAgent().getSurveyTemplate(this.currentSurveyWorkflow);
    const q = questions[this.currentQuestionIndex];
    const wrapper = document.getElementById("survey-cards-wrapper");
    
    // Update progress bar
    const progressPct = ((this.currentQuestionIndex) / questions.length) * 100;
    document.getElementById("survey-progress").style.width = `${progressPct}%`;
    document.getElementById("survey-progress-text").textContent = `Q ${this.currentQuestionIndex + 1}/${questions.length}`;

    // Get prefilled value or default
    const prefillVal = this.surveyResponses[q.key] !== undefined ? this.surveyResponses[q.key] : q.default;

    let inputHtml = "";
    if (q.type === "number") {
      inputHtml = `<input type="number" id="survey-ans" min="${q.min || 0}" max="${q.max || 99999}" value="${prefillVal}">`;
    } else if (q.type === "select") {
      const opts = q.options.map(opt => `<option value="${opt}" ${opt === prefillVal ? 'selected' : ''}>${opt}</option>`).join("");
      inputHtml = `<select id="survey-ans">${opts}</select>`;
    } else if (q.type === "range") {
      inputHtml = `
        <input type="range" id="survey-ans" min="${q.min}" max="${q.max}" step="${q.step}" value="${prefillVal}" oninput="document.getElementById('range-val').innerText = this.value">
        <div class="slider-val"><span id="range-val">${prefillVal}</span></div>
      `;
    } else {
      inputHtml = `<input type="text" id="survey-ans" value="${prefillVal}">`;
    }

    wrapper.innerHTML = `
      <div class="survey-question-card active">
        <div class="survey-question-text">${q.text}</div>
        <div class="survey-input-wrapper">${inputHtml}</div>
      </div>
    `;

    // Adjust Nav buttons
    document.getElementById("survey-btn-prev").disabled = this.currentQuestionIndex === 0;
    const nextBtn = document.getElementById("survey-btn-next");
    if (this.currentQuestionIndex === questions.length - 1) {
      nextBtn.innerHTML = "<span>Submit Profile</span> 🚀";
    } else {
      nextBtn.innerHTML = "Next ➔";
    }
  }

  prevSurveyQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.saveSurveyAnswer();
      this.currentQuestionIndex--;
      this.renderSurveyQuestion();
    }
  }

  nextSurveyQuestion() {
    const questions = new SurveyAgent().getSurveyTemplate(this.currentSurveyWorkflow);
    this.saveSurveyAnswer();

    if (this.currentQuestionIndex < questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderSurveyQuestion();
    } else {
      // Submit survey to multi-agent pipeline
      this.submitSurveyData();
    }
  }

  saveSurveyAnswer() {
    const questions = new SurveyAgent().getSurveyTemplate(this.currentSurveyWorkflow);
    const q = questions[this.currentQuestionIndex];
    const inputEl = document.getElementById("survey-ans");
    
    if (inputEl) {
      let val = inputEl.value;
      if (q.type === "number" || q.type === "range") {
        val = parseFloat(val);
      }
      this.surveyResponses[q.key] = val;
    }
  }

  // STAGE 1-8: EXECUTE PIPELINE
  async submitSurveyData() {
    document.getElementById("survey-container-card").style.display = "none";
    
    const rawInputText = document.getElementById("router-text-input").value;
    const logsContainer = document.getElementById("pipeline-trace-logs");
    
    logsContainer.innerHTML += `<div style="color: #666; padding-top:0.5rem;">-- Survey complete. Initiating multi-agent execution pipeline...</div>`;

    // Trigger full backend sequence
    const result = await window.executeAgentPipeline(rawInputText, this.surveyResponses, this.apiKey, this.currentSurveyWorkflow);

    if (!result.success) {
      logsContainer.innerHTML += `<div style="color: var(--color-red); padding-top:0.5rem;">Pipeline Failed: ${result.error}</div>`;
      return;
    }

    // Populate log trace accordion
    logsContainer.innerHTML = "";
    result.logs.forEach(log => {
      logsContainer.innerHTML += `
        <div class="log-entry">
          <div class="log-title" onclick="app.toggleLogDetails(this)">
            <span>✔ ${log.stage}</span>
            <span>Logs</span>
          </div>
          <div class="log-details">${JSON.stringify(log.data || log.message, null, 2)}</div>
        </div>
      `;
    });

    // Update global state & view
    const workflow = result.output.workflow;
    this.state[workflow].inputs = result.output.survey_responses;
    this.state[workflow].output = result.output;

    this.renderActiveDashboard(workflow);
    
    // Auto switch to corresponding dashboard
    setTimeout(() => {
      this.switchView(workflow);
    }, 1000);
  }

  // Dashboard Renderer Engine
  renderActiveDashboard(workflow) {
    const stateKey = workflow === "family" ? "household" : workflow;
    const data = this.state[stateKey].output;
    const inputs = this.state[stateKey].inputs;
    if (!data) return;

    const domKey = workflow === "household" ? "family" : workflow;

    if (domKey === "family") {
      // 1. Gauge Number and fill
      document.getElementById("family-score-number").textContent = data.score;
      document.getElementById("family-score-grade").textContent = data.grade_info.grade;
      
      const gaugeFill = document.getElementById("family-gauge-fill");
      const offset = 565 - (565 * data.score) / 100;
      gaugeFill.style.strokeDashoffset = offset;
      gaugeFill.style.stroke = data.grade_info.accentColor;

      // 2. Story text
      document.getElementById("family-story-text").textContent = data.story;

      // 3. Category bars
      const catsList = document.getElementById("family-categories-list");
      catsList.innerHTML = "";
      
      const metrics = data.sustainability_metrics;
      const categories = [
        { name: "Electricity", val: Math.round(metrics.energy_consumed), max: 400, unit: "kWh", icon: "⚡" },
        { name: "Transport", val: Math.round(metrics.carbon_footprint * 0.4), max: 300, unit: "kg CO₂", icon: "🚗" },
        { name: "Food", val: Math.round(metrics.carbon_footprint * 0.2), max: 200, unit: "kg CO₂", icon: "🍽" },
        { name: "Waste", val: Math.round(metrics.waste_generated), max: 60, unit: "kg", icon: "♻" },
        { name: "Water", val: Math.round(metrics.water_footprint / inputs.members / 30 * 1000), max: 200000, unit: "ml/day", icon: "💧" }
      ];

      categories.forEach(c => {
        const pct = Math.min(100, Math.round((c.val / c.max) * 100));
        let barColor = "var(--color-lightgreen)";
        if (pct > 75) barColor = "var(--color-red)";
        else if (pct > 50) barColor = "var(--color-orange)";
        else if (pct > 30) barColor = "var(--color-yellow)";

        catsList.innerHTML += `
          <div class="category-item">
            <div class="category-header">
              <span class="category-name">${c.icon} ${c.name}</span>
              <span class="category-value">${c.val} ${c.unit}</span>
            </div>
            <div class="category-bar-outer">
              <div class="category-bar-inner" style="width: ${pct}%; background: ${barColor};"></div>
            </div>
          </div>
        `;
      });

      // 4. Donut Chart
      this.renderDonutChart("family-chart-box", [
        { label: "Electricity", val: metrics.energy_consumed * 0.82, color: "#f1c40f" },
        { label: "Transport", val: metrics.carbon_footprint * 0.4, color: "#e67e22" },
        { label: "Food", val: metrics.carbon_footprint * 0.2, color: "#2ecc71" },
        { label: "Waste", val: metrics.waste_generated * 0.5, color: "#e74c3c" }
      ]);

      // 5. Recommendations List
      const recsList = document.getElementById("family-improve-list");
      recsList.innerHTML = "";
      data.recommendations.forEach(r => {
        recsList.innerHTML += `
          <div class="challenge-item">
            <div class="challenge-info">
              <div class="challenge-title">+${r.points} points: ${r.action}</div>
              <div class="challenge-desc">${r.desc} | Cost: ${r.cost}</div>
            </div>
            <button class="challenge-check-btn" onclick="app.toggleFamilyRecommendation(this, ${r.points})">✓</button>
          </div>
        `;
      });

    } else if (workflow === "event") {
      document.getElementById("event-score-number").textContent = data.score;
      document.getElementById("event-score-grade").textContent = data.grade_info.grade;
      
      const gaugeFill = document.getElementById("event-gauge-fill");
      gaugeFill.style.strokeDashoffset = 565 - (565 * data.score) / 100;
      gaugeFill.style.stroke = data.grade_info.accentColor;

      document.getElementById("event-story-text").textContent = data.story;

      // Carbon tonnage equivalents
      const totalCO2 = Math.round(data.sustainability_metrics.carbon_footprint);
      document.getElementById("event-total-co2").textContent = `${(totalCO2 / 1000).toFixed(1)} Tons CO₂`;
      
      const analogies = window.CarbonKnowledgeEngine.getAnalogies(totalCO2);
      document.getElementById("event-analogy-car").textContent = `${analogies.carKms.toLocaleString()} km`;
      document.getElementById("event-analogy-trees").textContent = `${analogies.treeYears} Trees`;

      // Event categories breakdown
      const catsList = document.getElementById("event-categories-list");
      catsList.innerHTML = "";
      
      const metrics = data.sustainability_metrics;
      const categories = [
        { name: "Guest Travel", val: Math.round(data.carbon_estimates.travel), max: totalCO2, icon: "🚗" },
        { name: "Catering & Waste", val: Math.round(data.carbon_estimates.food), max: totalCO2, icon: "🍽" },
        { name: "Electricity & Fuel", val: Math.round(data.carbon_estimates.venue), max: totalCO2, icon: "⚡" },
        { name: "Decorations & Return Gifts", val: Math.round(data.carbon_estimates.material), max: totalCO2, icon: "🌸" }
      ];

      categories.forEach(c => {
        const pct = Math.round((c.val / c.max) * 100) || 0;
        catsList.innerHTML += `
          <div class="category-item">
            <div class="category-header">
              <span class="category-name">${c.icon} ${c.name}</span>
              <span class="category-value">${pct}%</span>
            </div>
            <div class="category-bar-outer">
              <div class="category-bar-inner" style="width: ${pct}%; background: var(--color-lightgreen);"></div>
            </div>
          </div>
        `;
      });

      // Savings recommendations
      const savingsList = document.getElementById("event-savings-list");
      savingsList.innerHTML = "";
      data.recommendations.forEach(r => {
        savingsList.innerHTML += `
          <div style="font-size: 0.85rem; margin-bottom: 0.5rem; color: var(--text-muted);">
            <strong style="color: var(--color-lightgreen);">${r.action}</strong>
            <p>${r.desc}</p>
          </div>
        `;
      });

    } else if (workflow === "children") {
      // Profile details
      document.getElementById("children-profile-name").textContent = inputs.student_name;
      document.getElementById("children-profile-age").textContent = inputs.age;
      document.getElementById("children-score-badge").textContent = `${data.score} Points`;
      document.getElementById("children-profile-rank").textContent = data.gamification.leaderboard_rank;

      // Stats
      document.getElementById("child-stat-cycle").textContent = `${inputs.cycle_days} Days`;
      document.getElementById("child-stat-trees").textContent = `${inputs.trees_planted} Planted`;
      document.getElementById("child-stat-meals").textContent = `${inputs.clean_plate === "Every meal" ? 14 : 7} Meals Saved`;
      
      const savedKg = Math.round(data.sustainability_metrics.carbon_saved);
      document.getElementById("children-total-saved").textContent = `${savedKg} kg CO₂`;
      document.getElementById("children-analogy-trees").textContent = Math.round(savedKg / 22);

      document.getElementById("children-story-text").textContent = data.story;

      // Badge Grid
      const grid = document.getElementById("children-badges-grid");
      grid.innerHTML = "";
      
      const allPossibleBadges = [
        { id: "b_cycle_hero", name: "Bicycle Hero", icon: "🚲", desc: "Cycled to school 15+ days." },
        { id: "b_tree_guard", name: "Tree Guardian", icon: "🌳", desc: "Planted 3+ trees." },
        { id: "b_climate_champion", name: "Climate Champion", icon: "🏆", desc: "Clean plate every school day." },
        { id: "b_zero_waste", name: "Zero Waste Hero", icon: "♻️", desc: "Active recycler." }
      ];

      allPossibleBadges.forEach(pb => {
        const isUnlocked = data.gamification.badges.some(b => b.id === pb.id);
        grid.innerHTML += `
          <div class="badge-item ${isUnlocked ? '' : 'locked'}" title="${pb.desc}">
            <div class="badge-icon-wrap">${pb.icon}</div>
            <div class="badge-name">${pb.name}</div>
          </div>
        `;
      });

      // Challenges list
      const challengesList = document.getElementById("children-challenges-list");
      challengesList.innerHTML = "";
      data.challenges.forEach(ch => {
        challengesList.innerHTML += `
          <div class="challenge-item">
            <div class="challenge-info">
              <div class="challenge-title">${ch.title} <span class="challenge-xp">+${ch.xp} XP</span></div>
              <div class="challenge-desc">${ch.desc}</div>
            </div>
            <button class="challenge-check-btn" onclick="app.toggleChallenge(this)">✓</button>
          </div>
        `;
      });

    } else if (workflow === "village") {
      document.getElementById("village-score-number").textContent = data.score;
      const rankText = `District Rank ${data.benchmarks_comparison.district_rank}`;
      document.getElementById("village-score-grade").textContent = rankText;

      const gaugeFill = document.getElementById("village-gauge-fill");
      gaugeFill.style.strokeDashoffset = 565 - (565 * data.score) / 100;
      gaugeFill.style.stroke = data.grade_info.accentColor;

      document.getElementById("village-stat-assessed").textContent = (inputs.families || 0).toLocaleString();
      document.getElementById("village-stat-green").textContent = (inputs.green_families || 0).toLocaleString();

      document.getElementById("village-story-text").textContent = data.story;

      // Star metrics
      const starsList = document.getElementById("village-stars-list");
      starsList.innerHTML = "";
      const ratings = [
        { name: "Water Conservation", value: data.sustainability_metrics.water_efficiency / 20 },
        { name: "Waste Segregation", value: data.sustainability_metrics.waste_efficiency / 20 },
        { name: "Tree Cover Canopy", value: data.sustainability_metrics.tree_coverage_score / 20 },
        { name: "Renewable Solar Grid", value: data.sustainability_metrics.renewable_energy_score / 20 }
      ];

      ratings.forEach(r => {
        const starCount = Math.max(0, Math.min(5, Math.round(r.value) || 0));
        const goldStars = "★".repeat(starCount);
        const greyStars = "☆".repeat(5 - starCount);
        starsList.innerHTML += `
          <div class="category-header" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.4rem;">
            <span>${r.name}</span>
            <span style="color: var(--color-yellow); font-size: 1.1rem;">${goldStars}${greyStars}</span>
          </div>
        `;
      });

      // Community projects
      const recsList = document.getElementById("village-improve-list");
      recsList.innerHTML = "";
      data.recommendations.forEach(r => {
        recsList.innerHTML += `
          <div class="rec-item">
            <span class="rec-check">✓</span>
            <div>
              <strong>${r.action}</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted);">${r.desc}</p>
            </div>
          </div>
        `;
      });
    }
    
    // Propagate to landing summary stats
    this.initGlobalStats();
  }

  // Interactive recommendations checkbox logic
  toggleFamilyRecommendation(btn, points) {
    btn.classList.toggle("completed");
    const scoreNumEl = document.getElementById("family-score-number");
    let currentScore = parseInt(scoreNumEl.textContent);
    
    if (btn.classList.contains("completed")) {
      currentScore = Math.min(100, currentScore + points);
    } else {
      currentScore = Math.max(10, currentScore - points);
    }

    scoreNumEl.textContent = currentScore;
    const gaugeFill = document.getElementById("family-gauge-fill");
    gaugeFill.style.strokeDashoffset = 565 - (565 * currentScore) / 100;
    
    const newGrade = window.CarbonKnowledgeEngine.getGrade(currentScore);
    document.getElementById("family-score-grade").textContent = newGrade.grade;
    gaugeFill.style.stroke = newGrade.accentColor;
  }

  toggleChallenge(btn) {
    btn.classList.toggle("completed");
  }

  // Render SVG Donut Chart dynamically
  renderDonutChart(containerId, slices) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let totalVal = slices.reduce((sum, s) => sum + s.val, 0);
    if (totalVal <= 0) totalVal = 1;

    let cumulativePct = 0;
    let svgPaths = "";
    
    slices.forEach(s => {
      const pct = (s.val / totalVal);
      const startAngle = cumulativePct * 360;
      const endAngle = (cumulativePct + pct) * 360;
      
      // Calculate SVG Arc coordinates
      const rad = Math.PI / 180;
      const x1 = 100 + 70 * Math.cos((startAngle - 90) * rad);
      const y1 = 100 + 70 * Math.sin((startAngle - 90) * rad);
      const x2 = 100 + 70 * Math.cos((endAngle - 90) * rad);
      const y2 = 100 + 70 * Math.sin((endAngle - 90) * rad);
      
      const largeArc = pct > 0.5 ? 1 : 0;
      
      svgPaths += `
        <path d="M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z" 
              fill="${s.color}" 
              stroke="#040d07" 
              stroke-width="1.5" />
      `;
      
      cumulativePct += pct;
    });

    // Outer mask to make it a donut
    svgPaths += `<circle cx="100" cy="100" r="45" fill="#06180c" />`;

    // Render legend
    let legendHtml = `<div style="display: flex; flex-direction: column; gap: 0.4rem; justify-content: center;">`;
    slices.forEach(s => {
      const pctVal = Math.round((s.val / totalVal) * 100);
      legendHtml += `
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
          <span style="width: 12px; height: 12px; border-radius: 50%; background: ${s.color}; display: inline-block;"></span>
          <span style="color: var(--text-muted);">${s.label}:</span>
          <strong>${pctVal}%</strong>
        </div>
      `;
    });
    legendHtml += `</div>`;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: center; height: 100%;">
        <svg viewBox="0 0 200 200" style="width: 100%; max-height: 200px;">
          ${svgPaths}
        </svg>
        ${legendHtml}
      </div>
    `;
  }

  // Floating Chatbot UI Trigger
  toggleChat() {
    const windowEl = document.getElementById("prakriti-chat-window");
    if (windowEl.style.display === "flex") {
      windowEl.style.display = "none";
    } else {
      windowEl.style.display = "flex";
      // Scroll to bottom
      const msgs = document.getElementById("prakriti-chat-messages");
      msgs.scrollTop = msgs.scrollHeight;
    }
  }

  // Chat message sender
  async sendChatMessage() {
    const inputEl = document.getElementById("prakriti-chat-input");
    const text = inputEl.value.trim();
    if (!text) return;

    this.appendChatBubble("user", text);
    inputEl.value = "";

    // Show bot typing placeholder
    const typingId = this.appendChatBubble("bot", "Thinking...");

    if (this.apiKey) {
      try {
        const sysInstruction = `You are Prakriti Mitra AI, the environmental sustainability coach.
Your job is to answer sustainability queries, analyze utility data, and suggest eco-friendly lifestyle choices.
Here is the current sustainability metrics context of the user:
- Family Score: ${this.state.household.output.score} (${this.state.household.output.grade_info.grade})
- Event Score: ${this.state.event.output.score} (${this.state.event.output.grade_info.grade})
- Student Score: ${this.state.children.output.score} (${this.state.children.output.grade_info.grade})
- Village Panchayat Score: ${this.state.village.output.score}

Keep your replies concise, inspiring, and direct.`;
        
        const answer = await runGeminiAPI(this.apiKey, sysInstruction, text, false);
        this.updateChatBubble(typingId, answer.trim());
      } catch (e) {
        this.updateChatBubble(typingId, "I ran into a connection issue. Here is my offline advice: " + this.getOfflineChatAdvice(text));
      }
    } else {
      setTimeout(() => {
        const adv = this.getOfflineChatAdvice(text);
        this.updateChatBubble(typingId, adv);
      }, 700);
    }
  }

  sendQuickChat(qText) {
    document.getElementById("prakriti-chat-input").value = qText;
    this.sendChatMessage();
  }

  appendChatBubble(role, content) {
    const container = document.getElementById("prakriti-chat-messages");
    const bubble = document.createElement("div");
    bubble.className = `msg ${role === 'user' ? 'msg-user' : 'msg-bot'}`;
    bubble.textContent = content;
    const bubbleId = "msg_" + Math.random().toString(36).substr(2, 9);
    bubble.id = bubbleId;
    
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    return bubbleId;
  }

  updateChatBubble(bubbleId, content) {
    const bubble = document.getElementById(bubbleId);
    if (bubble) {
      bubble.textContent = content;
      const container = document.getElementById("prakriti-chat-messages");
      container.scrollTop = container.scrollHeight;
    }
  }

  // Local Expert Rule Chatbot fallbacks
  getOfflineChatAdvice(text) {
    const query = text.toLowerCase();
    
    if (query.includes("improve") && (query.includes("family") || query.includes("house"))) {
      return `To improve your family score (${this.state.household.output.score}), check the recommended actions. Switching to BEE 5-star LEDs adds +6 points, setting AC to 24°C adds +8 points, and ridesharing/transit twice weekly adds +10 points!`;
    }
    if (query.includes("transport") || query.includes("car") || query.includes("travel")) {
      return `Vehicle travel generates significant carbon. Switching from a standard petrol car to public transit, cycling, or an Electric Vehicle (EV) can slash your transit footprint by 70% or more!`;
    }
    if (query.includes("event") || query.includes("wedding")) {
      return `My analysis shows the wedding carbon score is ${this.state.event.output.score}. Guest transport contributes 52% of total emissions. You can offer shared shuttles, source food locally, and substitute plastic banners with compostable cloth to cut emissions.`;
    }
    if (query.includes("water") || query.includes("village")) {
      return `Your Panchayat is currently rated 5 stars for Water. Construction of rainwater percolation ponds, installing aerated tap heads, and recycling kitchen greywater for farm use are excellent projects to conserve local aquifers.`;
    }
    
    return "Every small action helps. Plant more trees, recycle plastic, avoid meat twice a week, and turn off standby appliances to save energy. Ask me more details!";
  }

  // Interactive Cinema Player for Launch Film
  playLaunchFilm() {
    const introCard = document.getElementById("video-banner-intro");
    const playerOverlay = document.getElementById("cinema-player");
    const video = document.getElementById("cinema-video");
    
    introCard.style.display = "none";
    playerOverlay.style.display = "block";
    if (video) {
      video.play().catch(err => console.log("Autoplay blocked: ", err));
    }
  }

  stopLaunchFilm() {
    const introCard = document.getElementById("video-banner-intro");
    const playerOverlay = document.getElementById("cinema-player");
    const video = document.getElementById("cinema-video");
    
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    playerOverlay.style.display = "none";
    introCard.style.display = "block";
  }
}

// Instantiate and bind to window
window.onload = () => {
  window.app = new PrakritiMitraApp();
  window.app.init();
};
