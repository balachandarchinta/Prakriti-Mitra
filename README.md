# 🌳 Prakriti Mitra

Prakriti Mitra (*Friend of Nature*) is an AI-powered Sustainability Intelligence Platform designed to track, benchmark, and guide individuals, households, event organizers, children, and entire village panchayats toward carbon-neutral living. 

Built using a modular multi-agent pipeline architecture, it transforms natural language logs and satellite geospatial data into highly localized, inspiring, and actionable sustainability scoring dashboards.

### 🌐 Live Demo: [Prakriti Mitra on Vercel](https://prakriti-mitra-seven.vercel.app/)

---

## 🚀 Key Features

* **Sentinel-2 Spatial Map Overlay**: Integrated Leaflet map displaying actual site boundaries in Shankarpally, Hyderabad, with false-color spectral toggles:
  - 🌳 **Canopy**: Inspect tree cover density.
  - 💧 **Water**: Identify local aquifers, ponds, and wells.
  - 🌾 **Land Use**: Highlight residential, agricultural, and commercial buffers.
* **AlloyDB PostGIS SQL Terminal**: Emulates real-time geospatial queries run on plot selection.
* **Cinematic Video Showcase**: A premium, native HTML5 launch video player playing on start that visually outlines the platform's vision, scores, and village ranking boards.
* **Orchestrated Multi-Agent Pipeline**: Executes 9 sequential agents (Stage 0 to Stage 8) in a deterministic data-flow architecture to parse, score, suggest, and gamify sustainability profiles.
* **Ask Prakriti AI Coach**: A bottom-right floating chatbot providing context-aware advice depending on your current green scores.

---

## 🗺️ User Journey Walkthrough

To experience the platform's intelligence pipeline step-by-step, follow this user journey:

1. **Enter the Developer Sandbox**:
   - Go to the **Developer Sandbox** tab in the top navigation bar.
2. **Execute Stage 0 (Router Agent)**:
   - In the **Stage 0: Router Agent Sandbox** panel, either:
     - Click on one of the highlighted boundaries on the **Sentinel Spatial map** (e.g. *Greenwood Family Lot*, *Vaikunth Event Venue*, or *Shankarpally Panchayat Boundary*).
     - Select one of the quick chips (e.g. *House*, *Wedding*, *Student*, or *Panchayat*).
     - Write custom natural language consumption reports in any language.
   - Click the **Execute LLM Router** button.
3. **Complete the Dynamic Survey**:
   - The platform will auto-generate and display a progressive, interactive **Survey** based on the classified workflow.
   - Answer the questions. If you selected a geospatial boundary, key parameters (like families count or electricity usage) will be automatically prefilled.
4. **Submit & Run Multi-Agent Pipeline**:
   - Click **Submit Profile** at the end of the survey.
   - You can watch the **Agent Orchestration Trace** in real-time as Stages 1 through 8 compile, estimate carbon emissions, benchmark against national standards, fabricate stories, suggest recommendations, issue challenges, and reward badges.
5. **Explore your Dashboard**:
   - Upon successful completion, the sandbox will automatically transition to the respected dashboard corresponding to the workflow:
     - 🏠 **Family Dashboard**
     - 🎉 **Event Dashboard**
     - 👧 **Children Dashboard**
     - 🌾 **Village Dashboard**

---

## 🛠️ Technology Stack

- **Core**: Vanilla HTML5, ES6 JavaScript, HSL Green CSS Variables.
- **Geospatial Layouts**: Leaflet.js Mapping Engine.
- **AI Router & Storyteller**: Google Gemini Pro (Vertex client-side) with deterministic local fallback rules engine.
- **Production Edge CDN**: Hosted globally on Vercel.

---

*Prakriti Mitra: Guide for Sustainable Living. Digitally verifying green milestones.*
