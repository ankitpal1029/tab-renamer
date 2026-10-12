// Drop popup sizing so Chrome opens Slack's window.open calls (huddles/calls) as tabs.
(() => {
  const open = window.open;
  window.open = function (url, target, features) {
    const keep = (features || "").split(",").map(s => s.trim()).filter(f => /^(noopener|noreferrer)$/i.test(f));
    return open.call(window, url, target, keep.join(","));
  };
})();
