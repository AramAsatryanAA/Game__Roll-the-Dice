import replace from "gulp-replace"; // Search and replace
import plumber from "gulp-plumber"; // Еrror processing
import notify from "gulp-notify"; // Popup message (hint)
import browserSync from "browser-sync"; // Local server
import newer from "gulp-newer"; // Checking for updates
import gulpIf from "gulp-if"; // Цonditional branching

// --- Exporting all plagins as an object
export const plugins = {
  replace,
  plumber,
  notify,
  browserSync,
  newer,
  gulpIf,
};
