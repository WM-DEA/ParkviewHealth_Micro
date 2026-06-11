(function () {
  "use strict";

  var units = [
    { id: "ED", name: "Emergency Department", occupancy: 94, available: 2, cleaning: 4, blocked: 1, forecast: 3, severity: "warning", note: "ED boarding risk is elevated. Prioritize ICU and telemetry turnover before the next arrival wave." },
    { id: "ICU", name: "Intensive Care Unit", occupancy: 92, available: 1, cleaning: 2, blocked: 2, forecast: 1, severity: "critical", note: "ICU is the tightest constraint. Escalate discharge readiness and confirm transfer options." },
    { id: "PCU", name: "Progressive Care Unit", occupancy: 86, available: 3, cleaning: 3, blocked: 1, forecast: 2, severity: "warning", note: "PCU capacity is improving, but cleaning turn time is the limiting factor." },
    { id: "TELE", name: "Telemetry", occupancy: 81, available: 5, cleaning: 2, blocked: 0, forecast: 4, severity: "good", note: "Telemetry has the best near-term relief option for ED boarders." },
    { id: "3W", name: "Med/Surg 3 West", occupancy: 78, available: 6, cleaning: 1, blocked: 1, forecast: 5, severity: "good", note: "Med/Surg 3 West can absorb moderate demand if discharge transport stays on track." },
    { id: "OR", name: "Perioperative", occupancy: 75, available: 2, cleaning: 1, blocked: 0, forecast: 2, severity: "good", note: "OR turnover is stable. Next available room expected in 35 minutes." }
  ];

  var forecast = [
    { label: "+1h", value: 12 },
    { label: "+2h", value: 18 },
    { label: "+3h", value: 16 },
    { label: "+4h", value: 22 },
    { label: "+5h", value: 14 },
    { label: "+6h", value: 11 }
  ];

  var events = [
    { time: "Now", title: "ICU capacity threshold crossed", detail: "Available ICU beds dropped below target range for projected ED boarders." },
    { time: "04m", title: "Discharge forecast updated", detail: "Nine discharges expected in the next two hours across telemetry and med/surg." },
    { time: "08m", title: "OR turnover complete", detail: "OR-7 changed from turnover to available after environmental services signoff." },
    { time: "13m", title: "ED arrival surge detected", detail: "Arrival rate is 22% above baseline for the current hour." },
    { time: "18m", title: "Blocked bed cleared", detail: "Maintenance hold removed from 3W-18 and returned to cleaning queue." }
  ];

  var selectedUnit = units[0];

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function setText(selector, text) {
    var node = qs(selector);
    if (node) node.textContent = text;
  }

  function renderClock() {
    var now = new Date();
    setText("#clock", now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }

  function severityLabel(value) {
    return value === "critical" ? "Critical" : value === "warning" ? "Warning" : "Stable";
  }

  function renderUnits() {
    var list = qs("#unitList");
    if (!list) return;

    list.innerHTML = units.map(function (unit) {
      var fillClass = unit.severity === "critical" ? "critical" : unit.severity === "warning" ? "warning" : "";
      return [
        '<button class="unit-row' + (unit.id === selectedUnit.id ? " is-selected" : "") + '" type="button" data-unit="' + unit.id + '">',
        '<div class="unit-name"><strong>' + unit.name + '</strong><span>' + unit.id + " | " + severityLabel(unit.severity) + '</span></div>',
        '<div class="capacity-track"><div class="capacity-fill ' + fillClass + '" style="--fill:' + unit.occupancy + '%"></div></div>',
        '<div class="unit-stat">' + unit.occupancy + '<span>% occupied</span></div>',
        '</button>'
      ].join("");
    }).join("");

    qsa(".unit-row", list).forEach(function (button) {
      button.addEventListener("click", function () {
        var match = units.find(function (unit) { return unit.id === button.dataset.unit; });
        if (match) {
          selectedUnit = match;
          renderUnits();
          renderSelectedUnit();
        }
      });
    });
  }

  function renderSelectedUnit() {
    setText("#selectedUnitTitle", selectedUnit.name);
    setText("#selectedAvailable", selectedUnit.available);
    setText("#selectedCleaning", selectedUnit.cleaning);
    setText("#selectedBlocked", selectedUnit.blocked);
    setText("#selectedForecast", selectedUnit.forecast);
    setText("#operatorNote", selectedUnit.note);

    var badge = qs("#selectedSeverity");
    if (badge) {
      badge.textContent = severityLabel(selectedUnit.severity);
      badge.className = "severity-badge " + selectedUnit.severity;
    }
  }

  function renderForecast() {
    var list = qs("#forecastBars");
    if (!list) return;
    var max = Math.max.apply(null, forecast.map(function (item) { return item.value; }));
    list.innerHTML = forecast.map(function (item) {
      var fill = Math.max(12, Math.round(item.value / max * 100));
      return [
        '<div class="forecast-row">',
        '<span>' + item.label + '</span>',
        '<div class="bar-track"><div class="bar-fill" style="--fill:' + fill + '%"></div></div>',
        '<strong>' + item.value + '</strong>',
        '</div>'
      ].join("");
    }).join("");
  }

  function renderEvents() {
    var list = qs("#eventList");
    if (!list) return;
    list.innerHTML = events.map(function (event) {
      return [
        '<div class="event-item">',
        '<div class="event-time">' + event.time + '</div>',
        '<div><strong>' + event.title + '</strong><span>' + event.detail + '</span></div>',
        '</div>'
      ].join("");
    }).join("");
  }

  function activateTab(tab) {
    qsa(".tab-button").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.tab === tab);
    });
    qsa(".view-panel").forEach(function (panel) {
      panel.classList.toggle("is-active", panel.dataset.panel === tab);
    });
  }

  function simulateSurge() {
    units = units.map(function (unit) {
      if (unit.id === "ED" || unit.id === "ICU") {
        return Object.assign({}, unit, {
          occupancy: Math.min(99, unit.occupancy + 3),
          severity: "critical",
          note: "Surge scenario active. Coordinate ED boarding, ICU turnover, and staffing escalation."
        });
      }
      return Object.assign({}, unit, { occupancy: Math.min(96, unit.occupancy + 1) });
    });
    events.unshift({ time: "Now", title: "Surge scenario activated", detail: "Forecast pressure increased for ED and ICU capacity planning." });
    selectedUnit = units.find(function (unit) { return unit.id === selectedUnit.id; }) || units[0];
    setText("#edWaiting", "22");
    setText("#edBoarders", "9");
    setText("#avgWait", "48");
    renderUnits();
    renderSelectedUnit();
    renderEvents();
  }

  function markBedReady() {
    selectedUnit = Object.assign({}, selectedUnit, {
      available: selectedUnit.available + 1,
      cleaning: Math.max(0, selectedUnit.cleaning - 1),
      note: "One bed moved from cleaning to available. Recheck ED boarding options and transfer sequence."
    });
    units = units.map(function (unit) { return unit.id === selectedUnit.id ? selectedUnit : unit; });
    events.unshift({ time: "Now", title: selectedUnit.name + " bed marked ready", detail: "Availability updated in the command center prototype." });
    renderUnits();
    renderSelectedUnit();
    renderEvents();
  }

  function openEscalation() {
    selectedUnit = Object.assign({}, selectedUnit, {
      severity: selectedUnit.severity === "good" ? "warning" : selectedUnit.severity,
      note: "Escalation opened for " + selectedUnit.name + ". Recommended owners: bed management, charge nurse, and operational leader."
    });
    units = units.map(function (unit) { return unit.id === selectedUnit.id ? selectedUnit : unit; });
    events.unshift({ time: "Now", title: selectedUnit.name + " escalation opened", detail: "Operator-owned recommendation moved into the escalation queue." });
    renderUnits();
    renderSelectedUnit();
    renderEvents();
  }

  document.addEventListener("DOMContentLoaded", function () {
    qsa(".tab-button").forEach(function (button) {
      button.addEventListener("click", function () {
        activateTab(button.dataset.tab);
      });
    });

    var surge = qs("#simulateSurge");
    if (surge) surge.addEventListener("click", simulateSurge);

    var ready = qs("#readyBed");
    if (ready) ready.addEventListener("click", markBedReady);

    var escalation = qs("#openEscalation");
    if (escalation) escalation.addEventListener("click", openEscalation);

    renderClock();
    renderUnits();
    renderSelectedUnit();
    renderForecast();
    renderEvents();
    setInterval(renderClock, 1000);
  });
})();
