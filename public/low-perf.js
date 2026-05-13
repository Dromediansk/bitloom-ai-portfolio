(function () {
  try {
    var d = document.documentElement;
    var m = navigator.deviceMemory;
    var c = navigator.hardwareConcurrency;
    var r = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var s = matchMedia("(update: slow)").matches;
    if (r || s || (m && m <= 4) || (c && c <= 4)) {
      d.dataset.lowPerf = "true";
    }
  } catch (e) {}
})();
