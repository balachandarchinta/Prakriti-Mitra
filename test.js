// Mock browser DOM environment for Node.js
global.window = global;
global.document = {
  getElementById: (id) => {
    // Mock elements that are queried during execution
    return {
      value: "Mock text input context.",
      innerHTML: "",
      style: { display: "none" }
    };
  },
  querySelectorAll: () => []
};

const assert = require('assert');
const { test, describe } = require('node:test');

// Load static script modules
const CarbonKnowledgeEngine = require('./knowledge_engine.js');
global.CarbonKnowledgeEngine = CarbonKnowledgeEngine;
global.window.CarbonKnowledgeEngine = CarbonKnowledgeEngine;
require('./agents.js');
require('./app.js');

describe('Prakriti Mitra Unit Tests', () => {

  describe('CarbonKnowledgeEngine', () => {
    test('EMISSION_FACTORS values are loaded correctly', () => {
      const factors = window.CarbonKnowledgeEngine.EMISSION_FACTORS;
      assert.ok(factors);
      assert.strictEqual(factors.electricity, 0.82);
      assert.strictEqual(factors.diesel, 2.68);
      assert.strictEqual(factors.tree_yearly_absorption, 22.0);
    });

    test('getGrade yields correct category mapping', () => {
      const g95 = window.CarbonKnowledgeEngine.getGrade(95);
      assert.strictEqual(g95.grade, "Prakriti Mitra");
      assert.strictEqual(g95.label, "Dark Green");

      const g75 = window.CarbonKnowledgeEngine.getGrade(75);
      assert.strictEqual(g75.grade, "Green Citizen");

      const g20 = window.CarbonKnowledgeEngine.getGrade(20);
      assert.strictEqual(g20.grade, "Warning");
    });

    test('calculateScore scales according to benchmarks', () => {
      const score100 = window.CarbonKnowledgeEngine.calculateScore(0, 1000);
      assert.strictEqual(score100, 100);

      const score75 = window.CarbonKnowledgeEngine.calculateScore(1000, 1000);
      assert.strictEqual(score75, 75);

      const scoreLow = window.CarbonKnowledgeEngine.calculateScore(4000, 1000);
      assert.ok(scoreLow < 40);
    });

    test('getAnalogies calculates expected ratios', () => {
      const analogies = window.CarbonKnowledgeEngine.getAnalogies(170); // 170kg
      assert.strictEqual(analogies.carKms, 1000); // 170 / 0.17 = 1000
      assert.strictEqual(analogies.smartphoneCharges, 21250); // 170 / 0.008 = 21250
    });
  });

  describe('RouterAgent (Fallback Classification)', () => {
    const router = new window.RouterAgent(null);

    test('routes household keywords successfully', () => {
      const res = router.fallbackRulesEngine("My electricity bill utility consumption is 350 kwh");
      assert.strictEqual(res.workflow, "household");
      assert.strictEqual(res.extracted_metrics.kwh, 350);
    });

    test('routes event keywords successfully', () => {
      const res = router.fallbackRulesEngine("Planning a wedding venue event for 200 guests");
      assert.strictEqual(res.workflow, "event");
      assert.strictEqual(res.extracted_metrics.guests, 200);
    });

    test('routes children keywords successfully', () => {
      const res = router.fallbackRulesEngine("I rode my bicycle to school and planted 5 trees");
      assert.strictEqual(res.workflow, "children");
      assert.strictEqual(res.extracted_metrics.trees_planted, 5);
    });

    test('routes village keywords successfully', () => {
      const res = router.fallbackRulesEngine("Analyzing Gram Panchayat boundaries for GP-06 rural community indicators");
      assert.strictEqual(res.workflow, "village");
    });
  });

  describe('executeAgentPipeline (End-to-End Operational Workflows)', () => {
    
    test('executes household carbon pipeline successfully', async () => {
      const surveyAnswers = {
        members: 4,
        electricity: 250,
        fuel_type: "LPG",
        fuel_qty: 1,
        transport_type: "Petrol Car",
        transport_kms: 150,
        diet: "Vegetarian",
        waste: 1.5,
        waste_recycled: 20,
        water: 135000
      };
      
      const res = await window.executeAgentPipeline("", surveyAnswers, null, "household");
      assert.ok(res.success);
      assert.strictEqual(res.output.workflow, "household");
      assert.ok(res.output.score > 0);
      assert.ok(res.output.sustainability_metrics.carbon_footprint > 0);
      assert.ok(res.output.recommendations.length > 0);
      assert.ok(res.output.challenges.length > 0);
    });

    test('executes event carbon pipeline successfully', async () => {
      const surveyAnswers = {
        event_type: "Wedding",
        guests: 250,
        duration: 2,
        travel_avg_km: 80,
        flights: 12,
        catering_diet: "Vegetarian",
        electricity_kwh: 1200,
        generator_hours: 6,
        decor_type: "Fresh Flowers (Local)",
        gift_qty: 200
      };
      
      const res = await window.executeAgentPipeline("", surveyAnswers, null, "event");
      assert.ok(res.success);
      assert.strictEqual(res.output.workflow, "event");
      assert.ok(res.output.score > 0);
      assert.ok(res.output.recommendations.length > 0);
    });

    test('executes children green pipeline successfully', async () => {
      const surveyAnswers = {
        student_name: "Ananya",
        age: 11,
        walk_days: 5,
        cycle_days: 15,
        bus_days: 8,
        trees_planted: 3,
        reusable_bottle: "Always",
        clean_plate: "Every meal",
        recycle_active: "Yes, regularly"
      };
      
      const res = await window.executeAgentPipeline("", surveyAnswers, null, "children");
      assert.ok(res.success);
      assert.strictEqual(res.output.workflow, "children");
      assert.ok(res.output.score > 0);
      assert.ok(res.output.gamification.badges.length > 0);
    });

    test('executes village panchayat pipeline successfully', async () => {
      const surveyAnswers = {
        village_name: "Shankarpally",
        families: 1245,
        green_families: 863,
        water_rating: "5 Stars",
        waste_rating: "4 Stars",
        tree_rating: "3 Stars",
        energy_rating: "2 Stars",
        top_ward: "Ward 6",
        top_ward_score: 91
      };
      
      const res = await window.executeAgentPipeline("", surveyAnswers, null, "village");
      assert.ok(res.success);
      assert.strictEqual(res.output.workflow, "village");
      assert.ok(res.output.score > 0);
      assert.strictEqual(res.output.sustainability_metrics.water_efficiency, 100);
      assert.strictEqual(res.output.sustainability_metrics.waste_efficiency, 80);
    });
  });

  describe('XSS Sanitizer (escapeHTML)', () => {
    test('escapes special characters correctly', () => {
      const escaped = window.escapeHTML('<script>alert("hello & welcome");</script>');
      assert.strictEqual(escaped, '&lt;script&gt;alert(&quot;hello &amp; welcome&quot;);&lt;/script&gt;');
    });

    test('handles null and undefined inputs gracefully', () => {
      assert.strictEqual(window.escapeHTML(null), '');
      assert.strictEqual(window.escapeHTML(undefined), '');
    });

    test('handles numeric inputs correctly', () => {
      assert.strictEqual(window.escapeHTML(123), '123');
    });
  });

});
