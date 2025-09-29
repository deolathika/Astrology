"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/middleware.ts":
/*!***************************!*\
  !*** ./src/middleware.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    // For now, disable i18n middleware to fix routing issues\n    // We'll implement proper i18n later\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    // Match all paths except static files and API routes\n    matcher: [\n        \"/((?!api|_next/static|_next/image|favicon.ico|.*\\\\.png|.*\\\\.jpg|.*\\\\.jpeg|.*\\\\.gif|.*\\\\.svg|.*\\\\.ico).*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXVEO0FBRWhELFNBQVNDLFdBQVdDLE9BQW9CO0lBQzdDLHlEQUF5RDtJQUN6RCxvQ0FBb0M7SUFDcEMsT0FBT0YscURBQVlBLENBQUNHLElBQUk7QUFDMUI7QUFFTyxNQUFNQyxTQUFTO0lBQ3BCLHFEQUFxRDtJQUNyREMsU0FBUztRQUNQO0tBQ0Q7QUFDSCxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9taWRkbGV3YXJlLnRzP2QxOTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZShyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICAvLyBGb3Igbm93LCBkaXNhYmxlIGkxOG4gbWlkZGxld2FyZSB0byBmaXggcm91dGluZyBpc3N1ZXNcbiAgLy8gV2UnbGwgaW1wbGVtZW50IHByb3BlciBpMThuIGxhdGVyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpXG59XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIC8vIE1hdGNoIGFsbCBwYXRocyBleGNlcHQgc3RhdGljIGZpbGVzIGFuZCBBUEkgcm91dGVzXG4gIG1hdGNoZXI6IFtcbiAgICAnLygoPyFhcGl8X25leHQvc3RhdGljfF9uZXh0L2ltYWdlfGZhdmljb24uaWNvfC4qXFxcXC5wbmd8LipcXFxcLmpwZ3wuKlxcXFwuanBlZ3wuKlxcXFwuZ2lmfC4qXFxcXC5zdmd8LipcXFxcLmljbykuKiknLFxuICBdXG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJuZXh0IiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});