(function () {
  "use strict";

  var state = {
    minutes: 14 * 60 + 15,
    seconds: 14,
    speed: 1,
    selectedBed: null,
    waiting: 18,
    boarders: 7,
    avgWait: 42,
    census: 224,
    bedsAvailable: 26,
    discharges: 9,
    stale: 4
  };

  var departments = [
    { id: "ED", name: "Emergency Department", count: 26, pattern: ["occupied", "occupied", "occupied", "cleaning", "available", "occupied", "occupied", "occupied", "occupied", "occupied", "blocked", "occupied", "occupied", "available", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "available", "available"] },
    { id: "ICU", name: "Intensive Care Unit", count: 24, pattern: ["occupied", "occupied", "available", "available", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "blocked", "blocked", "occupied", "occupied", "occupied", "available", "occupied", "cleaning", "occupied", "occupied"] },
    { id: "CVICU", name: "Cardiovascular ICU", count: 16, pattern: ["occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied"] },
    { id: "PCU", name: "Progressive Care Unit", count: 25, pattern: ["occupied", "occupied", "cleaning", "occupied", "occupied", "available", "occupied", "occupied", "available", "occupied", "occupied", "occupied", "occupied", "occupied", "available", "available", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied"] },
    { id: "TELE", name: "Telemetry", count: 32, pattern: ["occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "occupied", "available", "occupied", "occupied", "available", "occupied", "occupied"] }
  ];

  var eventTemplates = [
    { type: "BED", label: "5N-10: occupied -> cleaning" },
    { type: "ED", label: "ED-ARR-4100: triage -> waiting" },
    { type: "BED", label: "ED-30: cleaning -> available" },
    { type: "ED", label: "ED-ARR-4096: triage -> waiting" },
    { type: "OR", label: "OR-7: turnover complete" },
    { type: "BED", label: "ICU-15: block reason updated" }
  ];

  var pipeline = [
    { title: "Ingestion", body: "ADT, bed, OR, and ED events landed", status: "Healthy" },
    { title: "Feature Build", body: "Arrival, discharge, and occupancy features refreshed", status: "Fresh" },
    { title: "Forecast", body: "Capacity risk and discharge predictions scored", status: "Ready" },
    { title: "Serving", body: "Live Store serving the command-center app", status: "4s stale" }
  ];

  var objections = [
    ["Epic already has bed status", "Grand Central shows bed state, but this combines ED pressure, OR timing, discharge forecasts, and unit constraints into one operating view."],
    ["Caboodle has reports", "Caboodle is strong for reporting. This pattern serves near-real-time operational workflow, not just batch analytics."],
    ["We need governance", "The lakehouse pattern keeps lineage, access, and auditability above the app experience."],
    ["Is this automated?", "Recommendations stay operator-owned. The app surfaces options and evidence; leaders still decide."],
    ["What is reusable?", "The same data-to-app pattern can support staffing, access, supply, and command-center workflows."]
  ];

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function setText(selector, value) {
    var node = qs(selector);
    if (node) node.textContent = value;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateClock() {
    state.seconds += state.speed;
    while (state.seconds >= 60) {
      state.seconds -= 60;
      state.minutes += 1;
    }
    var hour24 = Math.floor(state.minutes / 60) % 24;
    var minute = state.minutes % 60;
    var period = hour24 >= 12 ? "PM" : "AM";
    var hour12 = hour24 % 12 || 12;
    setText("#simTime", pad(hour12) + ":" + pad(minute) + ":" + pad(state.seconds));
    setText("#simPeriod", period);
  }

  function updateMetrics() {
    setText("#metricCensus", state.census);
    setText("#metricWaiting", state.waiting);
    setText("#metricBoarders", state.boarders);
    setText("#metricWait", state.avgWait);
    setText("#metricBeds", state.bedsAvailable);
    setText("#edWaiting", state.waiting);
    setText("#edBoarders", state.boarders);
    setText("#avgWait", Number(state.avgWait).toFixed(1));
    setText("#dcForecast", state.discharges + " DC predicted next 2h");
    setText("#eventFreshness", state.stale + "s stale");
    var waitFill = qs("#waitFill");
    if (waitFill) waitFill.style.width = Math.min(96, Math.max(20, state.avgWait * 1.7)) + "%";
  }

  function bedId(dept, index) {
    return dept.id + "-" + pad(index + 1);
  }

  function renderBeds() {
    var root = qs("#bedUnits");
    if (!root) return;
    root.innerHTML = departments.map(function (dept) {
      var beds = dept.pattern.map(function (status, index) {
        var id = bedId(dept, index);
        return '<button class="cc-bed ' + status + (state.selectedBed === id ? " is-selected" : "") + '" type="button" data-bed="' + id + '" data-dept="' + dept.id + '" data-status="' + status + '" aria-label="' + id + " " + status + '"></button>';
      }).join("");
      return '<section class="cc-unit"><h2>' + dept.name + '</h2><div class="cc-bed-grid">' + beds + '</div></section>';
    }).join("");

    qsa(".cc-bed", root).forEach(function (button) {
      button.addEventListener("click", function () {
        state.selectedBed = button.dataset.bed;
        renderBeds();
        openBedDrawer(button);
      });
    });
  }

  function renderEvents() {
    var root = qs("#eventLog");
    if (!root) return;
    root.innerHTML = eventTemplates.slice(0, 5).map(function (event, index) {
      var minuteOffset = index * 3 + 2;
      var minutes = state.minutes - minuteOffset;
      var hour24 = Math.floor(minutes / 60) % 24;
      var minute = ((minutes % 60) + 60) % 60;
      var period = hour24 >= 12 ? "PM" : "AM";
      var hour12 = hour24 % 12 || 12;
      var className = event.type.toLowerCase();
      return '<div class="cc-event"><time>' + pad(hour12) + ":" + pad(minute) + ":" + pad((state.seconds + 58 - index * 3) % 60) + " " + period + '</time><b class="' + className + '">' + event.type + '</b><span>' + event.label + '</span></div>';
    }).join("");
  }

  function renderPipeline() {
    var root = qs("#pipelineSteps");
    if (!root) return;
    root.innerHTML = pipeline.map(function (item) {
      return '<article class="cc-pipeline-item"><strong>' + item.title + '</strong><span>' + item.body + '</span><em>' + item.status + '</em></article>';
    }).join("");
  }

  function renderObjections() {
    var root = qs("#objections");
    if (!root) return;
    root.innerHTML = objections.map(function (item, index) {
      return '<button class="cc-objection' + (index === 0 ? " is-active" : "") + '" type="button" data-objection="' + index + '">' + item[0] + '</button>';
    }).join("");
    qsa(".cc-objection", root).forEach(function (button) {
      button.addEventListener("click", function () {
        qsa(".cc-objection", root).forEach(function (other) { other.classList.remove("is-active"); });
        button.classList.add("is-active");
        addAssistantMessage("Objection response", objections[Number(button.dataset.objection)][1]);
        openPanel("assistantPanel");
      });
    });
  }

  function openBedDrawer(button) {
    var drawer = qs("#bedDrawer");
    var bed = button.dataset.bed;
    var status = button.dataset.status;
    var dept = departments.find(function (item) { return item.id === button.dataset.dept; });
    setText("#drawerBedId", bed);
    var details = qs("#bedDetails");
    if (details) {
      details.innerHTML = [
        ["Department", dept ? dept.name : button.dataset.dept],
        ["Status", status],
        ["Acuity", status === "occupied" ? "3" : "N/A"],
        ["Hours In Bed", status === "occupied" ? "18.4" : "N/A"],
        ["Expected DC", status === "occupied" ? "+3h" : "N/A"],
        ["Last Update", "Live feed"]
      ].map(function (row) {
        return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>';
      }).join("");
    }
    if (drawer) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
    }
  }

  function closeBedDrawer() {
    var drawer = qs("#bedDrawer");
    if (drawer) {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    }
  }

  function changeSelectedBed(status) {
    if (!state.selectedBed) return;
    departments.forEach(function (dept) {
      dept.pattern = dept.pattern.map(function (current, index) {
        return bedId(dept, index) === state.selectedBed ? status : current;
      });
    });
    eventTemplates.unshift({ type: "BED", label: state.selectedBed + ": operator -> " + status });
    state.bedsAvailable += status === "available" ? 1 : status === "blocked" ? -1 : 0;
    updateMetrics();
    renderBeds();
    renderEvents();
  }

  function activateView(view) {
    qsa(".cc-tab").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.view === view);
    });
    qsa(".cc-view").forEach(function (panel) {
      panel.classList.toggle("is-active", panel.dataset.panel === view);
    });
  }

  function openPanel(id) {
    var panel = qs("#" + id);
    if (panel) {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
    }
  }

  function closePanel(id) {
    var panel = qs("#" + id);
    if (panel) {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
    }
  }

  function applyPreset(preset) {
    if (preset === "surge") {
      state.waiting = 24;
      state.boarders = 10;
      state.avgWait = 56;
      state.bedsAvailable = 19;
      state.discharges = 11;
      state.speed = 2;
      eventTemplates.unshift({ type: "ED", label: "Surge preset: arrival rate elevated" });
      setText("#lifecycleMessage", "Surge mode active. ED arrivals and ICU constraints are elevated.");
    } else if (preset === "peak") {
      state.waiting = 21;
      state.boarders = 8;
      state.avgWait = 49;
      state.speed = 1;
      eventTemplates.unshift({ type: "OR", label: "Peak hour preset: OR turnover pressure increased" });
      setText("#lifecycleMessage", "Peak hour active. OR and discharge readiness are the key constraints.");
    } else if (preset === "fast") {
      state.speed = 6;
      setText("#lifecycleMessage", "Fast forward active. Simulation clock advances faster for demonstration.");
    } else {
      state.waiting = 18;
      state.boarders = 7;
      state.avgWait = 42;
      state.bedsAvailable = 26;
      state.discharges = 9;
      state.speed = 1;
      setText("#lifecycleMessage", "Realtime mode. Data flows into the command center every few seconds.");
    }
    updateMetrics();
    renderEvents();
  }

  function assistantAnswer(question) {
    var q = String(question || "").toLowerCase();
    if (q.indexOf("clinical") !== -1 || q.indexOf("watch") !== -1) {
      return "Watch ICU capacity, ED boarders, and discharge-ready beds. The safest next move is to accelerate telemetry and med/surg turnover before the next arrival wave.";
    }
    if (q.indexOf("architecture") !== -1 || q.indexOf("data") !== -1) {
      return "The value story is governed operational serving: lakehouse data products feed forecast features, then Live Store serves a low-latency app without a separate shadow database.";
    }
    if (q.indexOf("executive") !== -1 || q.indexOf("value") !== -1) {
      return "Frame the outcome as fewer manual huddle reconciliations, earlier bottleneck detection, and a reusable pattern for other operational apps.";
    }
    return "ICU remains the tightest unit, ED arrivals are above baseline, and nine discharges are predicted in the next two hours. Recommended action: coordinate ICU transfer options and pull forward clean-ready beds.";
  }

  function addAssistantMessage(label, message) {
    var root = qs("#assistantLog");
    if (!root) return;
    var node = document.createElement("article");
    node.className = "cc-message";
    node.innerHTML = "<strong>" + label + "</strong><p>" + message + "</p>";
    root.prepend(node);
  }

  function wireEvents() {
    qsa(".cc-tab").forEach(function (button) {
      button.addEventListener("click", function () {
        activateView(button.dataset.view);
      });
    });

    var closeBed = qs("#closeBedDrawer");
    if (closeBed) closeBed.addEventListener("click", closeBedDrawer);

    var markReady = qs("#markReady");
    if (markReady) markReady.addEventListener("click", function () { changeSelectedBed("available"); });

    var blockBed = qs("#blockBed");
    if (blockBed) blockBed.addEventListener("click", function () { changeSelectedBed("blocked"); });

    var lifecycle = qs("#openLifecycle");
    if (lifecycle) lifecycle.addEventListener("click", function () { openPanel("lifecyclePanel"); });

    var assistant = qs("#openAssistant");
    if (assistant) assistant.addEventListener("click", function () { openPanel("assistantPanel"); });

    qsa("[data-close-panel]").forEach(function (button) {
      button.addEventListener("click", function () {
        closePanel(button.dataset.closePanel);
      });
    });

    qsa("[data-preset]").forEach(function (button) {
      button.addEventListener("click", function () {
        applyPreset(button.dataset.preset);
      });
    });

    qsa("[data-question]").forEach(function (button) {
      button.addEventListener("click", function () {
        addAssistantMessage("Guide prompt", assistantAnswer(button.dataset.question));
        openPanel("assistantPanel");
      });
    });

    var form = qs("#assistantForm");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = qs("#assistantQuestion");
        var question = input ? input.value : "";
        addAssistantMessage("Capacity Supervisor", assistantAnswer(question));
      });
    }
  }

  function tick() {
    updateClock();
    state.stale = (state.stale + 1) % 9;
    if (state.stale === 0) {
      eventTemplates.unshift(eventTemplates.pop());
    }
    updateMetrics();
    renderEvents();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderBeds();
    renderEvents();
    renderPipeline();
    renderObjections();
    updateMetrics();
    updateClock();
    addAssistantMessage("Capacity Supervisor", assistantAnswer("watch"));
    wireEvents();
    setInterval(tick, 1000);
  });
})();
