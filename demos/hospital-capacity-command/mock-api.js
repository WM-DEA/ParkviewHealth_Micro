/* Capacity Command — standalone prototype API.
 * The original app is a full-stack service (FastAPI + operational store + ML).
 * For this West Monroe showcase it runs as a static prototype: every /api/* call
 * is served from a deterministic in-browser demo dataset. No backend, no network.
 * Original application by Mobeen Vaid. Packaged as a prototype by West Monroe.
 */
(function () {
  "use strict";

  // ── deterministic PRNG (mulberry32) so the demo looks identical every load ──
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length) % arr.length]; }
  function iso(d) { return new Date(d).toISOString().replace(".000Z", "Z"); }
  var NOW = function () { return Date.now(); };

  // ── departments ──
  var DEPTS = [
    { id: "ED",    name: "Emergency Department", beds: 30 },
    { id: "ICU",   name: "Intensive Care Unit",  beds: 24 },
    { id: "CVICU", name: "Cardiovascular ICU",   beds: 16 },
    { id: "PCU",   name: "Progressive Care Unit", beds: 28 },
    { id: "TELE",  name: "Telemetry",            beds: 32 },
    { id: "3W",    name: "Med/Surg 3 West",      beds: 36 },
    { id: "4E",    name: "Med/Surg 4 East",      beds: 36 },
    { id: "5N",    name: "Med/Surg 5 North",     beds: 34 },
    { id: "ONC",   name: "Oncology",             beds: 24 }
  ];
  var BLOCK_REASONS = ["Housekeeping turnover", "Maintenance — call light", "Contact isolation cleaning", "Awaiting equipment"];
  var DISCH_REASONS = ["Clinically stable, awaiting transport", "Pending pharmacy reconciliation", "Awaiting placement / SNF bed", "Discharge order written"];

  // ── build the bed census once, deterministically ──
  var BEDS = [];
  (function build() {
    var r = rng(20260608);
    for (var d = 0; d < DEPTS.length; d++) {
      var dep = DEPTS[d];
      for (var i = 0; i < dep.beds; i++) {
        var x = r(), status, acuity = null, hib = null, exp = null, reason = null;
        if (x < 0.855) status = "occupied";
        else if (x < 0.935) status = "available";
        else if (x < 0.975) status = "cleaning";
        else status = "blocked";
        if (status === "occupied") {
          acuity = 1 + Math.floor(r() * 4);
          hib = Math.round(r() * 1180) / 10;
          if (r() < 0.34) exp = iso(NOW() + Math.floor(r() * 30) * 3600000);
        }
        if (status === "blocked") reason = pick(r, BLOCK_REASONS);
        BEDS.push({
          bed_id: dep.id + "-" + String(i + 1).padStart(2, "0"),
          dept_id: dep.id, dept_name: dep.name,
          status: status, acuity: acuity, hours_in_bed: hib,
          expected_discharge: exp, blocked_reason: reason
        });
      }
    }
  })();

  function count(deptId, st) {
    return BEDS.filter(function (b) { return (!deptId || b.dept_id === deptId) && b.status === st; }).length;
  }

  // ── header ──
  function header() {
    var occupied = count(null, "occupied");
    var available = count(null, "available");
    return {
      system_status: "CONSTRAINED",
      total_census: occupied,
      total_beds: BEDS.length,
      ed_waiting: 18,
      ed_boarders: 7,
      avg_wait_min: 42,
      beds_available: available,
      or_active: 6,
      or_total: 8,
      clock: iso(NOW()),
      staleness_seconds: 4,
      data_available: true
    };
  }

  // ── beds grouped by department ──
  function beds() {
    return {
      departments: DEPTS.map(function (dep) {
        return {
          dept_id: dep.id, name: dep.name,
          beds: BEDS.filter(function (b) { return b.dept_id === dep.id; }).map(function (b) {
            return {
              bed_id: b.bed_id, status: b.status, acuity: b.acuity,
              hours_in_bed: b.hours_in_bed, expected_discharge: b.expected_discharge,
              blocked_reason: b.blocked_reason
            };
          })
        };
      })
    };
  }

  // ── department metrics ──
  function metrics() {
    return {
      departments: DEPTS.map(function (dep) {
        var occ = count(dep.id, "occupied"), avail = count(dep.id, "available"),
            clean = count(dep.id, "cleaning"), blk = count(dep.id, "blocked");
        return {
          dept_id: dep.id, name: dep.name,
          occupancy_pct: Math.round(1000 * occ / dep.beds) / 10,
          total_beds: dep.beds, available: avail, occupied: occ, cleaning: clean, blocked: blk
        };
      })
    };
  }

  // ── ED ──
  function ed() {
    return {
      waiting_count: 18, boarders_count: 7, avg_wait_min: 42, lwbs_rate_pct: 3.4,
      arrivals_per_hour: [11, 14, 12, 16],
      esi_breakdown: { "1": 1, "2": 4, "3": 8, "4": 4, "5": 1 }
    };
  }

  // ── OR ──
  var OR_PROCS = [
    ["Total Knee Arthroplasty", "Orthopedics"], ["CABG x3", "Cardiothoracic"],
    ["Laparoscopic Cholecystectomy", "General Surgery"], ["Craniotomy", "Neurosurgery"],
    ["Cesarean Section", "OB/GYN"], ["Carotid Endarterectomy", "Vascular"],
    ["Spinal Fusion L4-L5", "Orthopedics"], ["Appendectomy", "General Surgery"]
  ];
  function or() {
    var r = rng(771);
    var rooms = [];
    for (var i = 1; i <= 8; i++) {
      var st = i <= 6 ? "in-progress" : (i === 7 ? "turnover" : "available");
      var proc = OR_PROCS[(i - 1) % OR_PROCS.length];
      var elapsed = st === "in-progress" ? 25 + Math.floor(r() * 150) : null;
      var rem = st === "in-progress" ? 15 + Math.floor(r() * 90) : null;
      rooms.push({
        room_id: "OR-" + i,
        status: st,
        procedure: st === "available" ? null : proc[0],
        surgeon_specialty: st === "available" ? null : proc[1],
        elapsed_min: elapsed, est_remaining_min: rem,
        scheduled_start: st !== "in-progress" ? iso(NOW() + (i * 25) * 60000) : null
      });
    }
    var active = rooms.filter(function (x) { return x.status === "in-progress"; }).map(function (x) {
      return { room_id: x.room_id, procedure: x.procedure, surgeon_specialty: x.surgeon_specialty,
               elapsed_min: x.elapsed_min, est_remaining_min: x.est_remaining_min };
    });
    return {
      utilization_pct: 75.0, fcots_pct: 82.0, rooms: rooms,
      active_procedures: active, next_available_eta: iso(NOW() + 35 * 60000)
    };
  }

  // ── forecast ──
  function forecast() {
    var hr = new Date(NOW()).getHours();
    var af = [];
    for (var k = 1; k <= 6; k++) af.push({ hour: (hr + k) % 24, predicted: 8 + ((k * 3) % 9), actual: null });
    return {
      predicted_discharges_2h: 9,
      predicted_discharges_4h: 17,
      arrival_forecast: af,
      capacity_by_dept: [
        { dept_id: "ICU",  current_available: count("ICU", "available"),  predicted_2h: 1, confidence: 0.82 },
        { dept_id: "TELE", current_available: count("TELE", "available"), predicted_2h: 4, confidence: 0.77 },
        { dept_id: "3W",   current_available: count("3W", "available"),   predicted_2h: 5, confidence: 0.8 },
        { dept_id: "4E",   current_available: count("4E", "available"),   predicted_2h: 3, confidence: 0.74 },
        { dept_id: "PCU",  current_available: count("PCU", "available"),  predicted_2h: 2, confidence: 0.79 }
      ],
      anomalies: [
        { type: "ED_SURGE", dept: "ED", value: 16, severity: "WARNING", confidence: 0.71 },
        { type: "ICU_CAPACITY", dept: "ICU", value: 92, severity: "CRITICAL", confidence: 0.86 }
      ]
    };
  }

  // ── derived event feed ──
  function events(limit) {
    var r = rng(99);
    var occ = BEDS.filter(function (b) { return b.status === "occupied"; });
    var out = [];
    var types = [
      { entity_type: "bed", old: "cleaning", neu: "available" },
      { entity_type: "bed", old: "occupied", neu: "cleaning" },
      { entity_type: "bed", old: "available", neu: "occupied" },
      { entity_type: "ed", old: "waiting", neu: "admitted" },
      { entity_type: "ed", old: "triage", neu: "waiting" },
      { entity_type: "or", old: "scheduled", neu: "in-progress" },
      { entity_type: "or", old: "in-progress", neu: "turnover" }
    ];
    var n = Math.min(limit || 50, 60);
    for (var i = 0; i < n; i++) {
      var t = pick(r, types);
      var ent;
      if (t.entity_type === "bed") ent = pick(r, occ).bed_id;
      else if (t.entity_type === "ed") ent = "ED-ARR-" + (4100 + Math.floor(r() * 600));
      else ent = "OR-" + (1 + Math.floor(r() * 8)) + " — " + OR_PROCS[Math.floor(r() * OR_PROCS.length)][0];
      out.push({
        event_id: t.entity_type + "-" + i,
        event_time: iso(NOW() - i * (60000 + Math.floor(r() * 90000))),
        entity_type: t.entity_type, entity_id: ent,
        old_status: t.old, new_status: t.neu
      });
    }
    return { events: out, last_event_time: out.length ? out[0].event_time : "" };
  }

  // ── pipeline / data-flow (vendor-neutral) ──
  function pipeline() {
    function tbl(name, rows) {
      var lag = Math.round((0.4 + Math.random() * 0.9) * 10) / 10;
      var lw = iso(NOW() - Math.floor(2000 + Math.random() * 6000));
      return { table: name, rows: rows, last_write_delta: lw,
               last_in_lakebase: iso(NOW() - 800), lag_seconds: lag };
    }
    return {
      pipeline_ts: iso(NOW() - 3000),
      pipeline_lag_seconds: 3.0,
      tables: [tbl("beds", 260), tbl("ed_arrivals", 47), tbl("or_schedule", 38), tbl("snapshot_meta", 1)],
      now: iso(NOW()),
      last_operator_write: { action: "unblock", bed_id: "3W-12", latency_ms: 213,
                             timestamp: iso(NOW() - 42000), seconds_ago: 42 },
      operator_write_count_1h: 11
    };
  }

  // ── bed drill-down (synthetic patient) ──
  var FIRST = ["James", "Maria", "Robert", "Linda", "David", "Patricia", "John", "Barbara", "Michael", "Susan", "William", "Jessica", "Richard", "Karen", "Thomas", "Nancy"];
  var LAST = ["Nguyen", "Garcia", "Smith", "Johnson", "Williams", "Brown", "Patel", "Martinez", "Davis", "Lopez", "Wilson", "Anderson", "Thomas", "Lee", "Walker", "Hall"];
  function bedDetails(bedId) {
    var b = BEDS.filter(function (x) { return x.bed_id === bedId; })[0];
    if (!b) return { error: "Bed " + bedId + " not found" };
    var dep = DEPTS.filter(function (x) { return x.id === b.dept_id; })[0] || { id: b.dept_id, name: b.dept_id };
    if (b.status !== "occupied") {
      return { bed: { bed_id: b.bed_id, status: b.status, dept_id: b.dept_id, blocked_reason: b.blocked_reason },
               patient: null, events: [], department: { dept_id: dep.id, name: dep.name },
               timing: { bed_ms: 4, patient_ms: 0, events_ms: 3, dept_ms: 2, total_ms: 9, sql_warehouse_est_ms: 8000 } };
    }
    var seed = 0; for (var i = 0; i < bedId.length; i++) seed = (seed * 31 + bedId.charCodeAt(i)) | 0;
    var r = rng(seed);
    var lace = 4 + Math.floor(r() * 11);
    var risk = lace >= 11 ? "HIGH" : (lace >= 7 ? "MODERATE" : "LOW");
    var name = pick(r, FIRST) + " " + pick(r, LAST);
    var los = Math.round((b.hours_in_bed / 24) * 10) / 10;
    return {
      bed: { bed_id: b.bed_id, status: b.status, dept_id: b.dept_id, acuity_level: b.acuity },
      patient: {
        patient_id: "P-" + Math.abs(seed % 900000 + 100000),
        mrn: "MRN" + String(Math.abs(seed) % 9000000 + 1000000),
        name: name, age: 34 + Math.floor(r() * 55), gender: r() < 0.5 ? "M" : "F",
        lace: { score: lace, risk: risk, length_of_stay_days: los, acuity_score: b.acuity,
                comorbidity_count: Math.floor(r() * 5), ed_visits_6mo: Math.floor(r() * 4) },
        discharge: { predicted_time: b.expected_discharge || iso(NOW() + (6 + Math.floor(r() * 30)) * 3600000),
                     reason: pick(r, DISCH_REASONS), confidence: Math.round((0.6 + r() * 0.38) * 100) / 100 },
        arrival: { arrival_id: "ED-ARR-" + (4100 + Math.floor(r() * 600)),
                   esi_level: 2 + Math.floor(r() * 3), arrival_time: iso(NOW() - b.hours_in_bed * 3600000),
                   disposition: "admitted", wait_minutes: 20 + Math.floor(r() * 90) },
        admission_time: iso(NOW() - b.hours_in_bed * 3600000)
      },
      events: events(6).events.slice(0, 4),
      department: { dept_id: dep.id, name: dep.name },
      timing: { bed_ms: 4, patient_ms: 6, events_ms: 5, dept_ms: 3, total_ms: 18, sql_warehouse_est_ms: 8000 }
    };
  }

  // ── copilot / assistant (canned) ──
  function assistantAsk(q) {
    return {
      answer: "Current state: the house is constrained. Census is " + count(null, "occupied") + " of " + BEDS.length +
        " beds (" + Math.round(100 * count(null, "occupied") / BEDS.length) + "% occupied), with 18 patients waiting in the ED and 7 boarding. " +
        "ICU is the tightest unit at ~92% occupancy. Nine discharges are expected in the next two hours, which would open capacity for ED boarders. " +
        "Recommended next steps for the charge nurse to review: prioritize the two cleaning-status ICU beds, confirm the four written discharge orders, and stage transport. " +
        "Every action here stays with the operator — nothing is auto-executed.",
      context_queries: ["header metrics", "department occupancy", "ED boarders", "predicted discharges (2h)"],
      data_citations: ["beds", "ed_arrivals", "predictions"]
    };
  }
  function shiftSummary() {
    return {
      summary: "Shift handoff — house is constrained but stable. " + count(null, "occupied") + "/" + BEDS.length +
        " beds occupied. ED holding 18 waiting / 7 boarding, average wait 42 min. ICU and CVICU are the watch units. " +
        "17 discharges forecast over the next four hours. OR running 6 of 8 rooms with first-case on-time at 82%.",
      sections: {
        "Capacity": "Beds available: " + count(null, "available") + ". Tightest unit: ICU (~92%).",
        "Emergency Dept": "18 waiting, 7 boarding, avg wait 42 min, LWBS 3.4%.",
        "Discharges": "9 expected within 2h, 17 within 4h. Confirm written orders and placement.",
        "Surgical": "OR utilization 75%, FCOTS 82%, next room free ~35 min.",
        "Watch list": "ICU capacity (CRITICAL), ED arrival surge (WARNING)."
      },
      generated_at: iso(NOW())
    };
  }
  function agentQuery(q) {
    return {
      answer: assistantAsk(q).answer,
      agent_used: "capacity-supervisor",
      tool_calls: [
        { function: "get_header_metrics", args: {}, result: "census, ED, OR snapshot" },
        { function: "get_department_occupancy", args: {}, result: "per-unit occupancy" },
        { function: "get_forecast", args: { horizon_h: 4 }, result: "predicted discharges + arrivals" }
      ],
      reasoning: "Pulled live capacity, ED, and forecast signals, then framed options for the operator to decide. No action taken automatically.",
      plan: { steps: ["read capacity", "read ED + boarders", "read discharge forecast", "summarize options for operator"] }
    };
  }

  // ── router ──
  function route(method, path, query, body) {
    var m = path.match(/^\/api\/beds\/([^\/]+)\/details$/);
    if (m) return bedDetails(decodeURIComponent(m[1]));
    m = path.match(/^\/api\/beds\/([^\/]+)\/block$/);
    if (m) return { success: true, bed_id: decodeURIComponent(m[1]), previous_status: "available",
                    status: "blocked", blocked_reason: (body && body.reason) || "Operator block",
                    blocked_at: iso(NOW()), blocked_by: (body && body.operator) || "operator", write_latency_ms: 188 };
    m = path.match(/^\/api\/beds\/([^\/]+)\/mark-ready$/);
    if (m) return { success: true, bed_id: decodeURIComponent(m[1]), status: "available", blocked: false,
                    unblocked_at: iso(NOW()), unblocked_by: "operator", write_latency_ms: 174 };

    switch (path) {
      case "/api/health": return { status: "healthy", database: "connected", pool_size: 4, demo_mode: true, schema_in_use: "prototype" };
      case "/api/header": return header();
      case "/api/beds": return beds();
      case "/api/ed": return ed();
      case "/api/or": return or();
      case "/api/forecast": return forecast();
      case "/api/events": return events(parseInt(query.limit, 10) || 50);
      case "/api/metrics": return metrics();
      case "/api/pipeline": return pipeline();
      case "/api/control": return { speed_multiplier: 1.0, surge_multiplier: 1.0, simulated_hour: -1, updated_at: iso(NOW()) };
      case "/api/control/preset/normal":
      case "/api/control/preset/surge":
      case "/api/control/preset/peak-hour":
      case "/api/control/preset/fast-forward":
        return { speed_multiplier: 1.0, surge_multiplier: 1.0, simulated_hour: -1, updated_at: iso(NOW()) };
      case "/api/lifecycle/status": return { is_running: true, run_id: null, state: "RUNNING", staleness_seconds: 4, mode: "realtime", message: "Live data from ingestion" };
      case "/api/lifecycle/start": return { success: true, mode: "realtime", message: "Realtime mode — data flows in from ingestion." };
      case "/api/lifecycle/stop": return { success: true, mode: "realtime", message: "Realtime mode — nothing to stop." };
      case "/api/lifecycle/seed": return { success: true, mode: "realtime", message: "Demo census already loaded." };
      case "/api/assistant/ask": return assistantAsk(body && body.question);
      case "/api/assistant/shift-summary": return shiftSummary();
      case "/api/agents/query": return agentQuery(body && body.query);
      case "/api/agents/status": return { status: "healthy", endpoint: "prototype", state: "READY" };
      case "/api/agents/capabilities": return [
        { agent_id: "capacity", name: "Capacity Supervisor", description: "Summarizes house-wide capacity and surfaces options for the operator.", triggers: ["capacity", "beds", "census"] },
        { agent_id: "ed", name: "ED Flow", description: "Explains ED waiting, boarding, and wait-time drivers.", triggers: ["ed", "boarders", "wait"] },
        { agent_id: "discharge", name: "Discharge Planner", description: "Highlights predicted discharges and placement blockers.", triggers: ["discharge", "placement"] }
      ];
      case "/api/debug/env": return { mode: "prototype" };
    }
    return { error: "Not mocked: " + path };
  }

  // ── fetch interceptor ──
  var _fetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    var path = url.replace(/^https?:\/\/[^\/]+/, "").split("#")[0];
    var qs = "";
    var qi = path.indexOf("?");
    var query = {};
    if (qi !== -1) { qs = path.slice(qi + 1); path = path.slice(0, qi);
      qs.split("&").forEach(function (kv) { var p = kv.split("="); query[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); }); }
    if (path.indexOf("/api/") === 0) {
      var method = (init && init.method) || "GET";
      var body = null;
      if (init && init.body) { try { body = JSON.parse(init.body); } catch (e) { body = null; } }
      var data;
      try { data = route(method, path, query, body); }
      catch (e) { data = { error: String(e) }; }
      var blob = JSON.stringify(data);
      return Promise.resolve(new Response(blob, { status: 200, headers: { "Content-Type": "application/json" } }));
    }
    if (_fetch) return _fetch(input, init);
    return Promise.reject(new Error("offline"));
  };
})();
