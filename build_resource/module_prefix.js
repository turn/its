(function (exports) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = exports; // CommonJS
  } else {
    return window.precondition = exports; // <script>
  }
}((function () {
	var exports = {};
