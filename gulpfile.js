import gulp from "gulp";

// --- Importing paths
import { path } from "./gulp/config/path.js";

// --- Importing plugins
import { plugins } from "./gulp/config/plugins.js";

// --- Importing tasks
import { deleteDist } from "./gulp/tasks/deleteDist.js";
import { html } from "./gulp/tasks/html.js";
import { localServer } from "./gulp/tasks/localServer.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { ttfToWoffAndWoff2, importFontsInStyles } from "./gulp/tasks/fonts.js";

// --- Passing the values to the "global" variable
global.app = {
  gulp,
  path,
  plugins,
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
};

// --- Function to watch the changes in the files
function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// --- Sequential processing of the font files
const fonts = gulp.series(ttfToWoffAndWoff2, importFontsInStyles);

// --- Main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images));

// --- Constructing scenarios for completing tasks
const dev = gulp.series(
  deleteDist,
  mainTasks,
  gulp.parallel(watcher, localServer)
);
const build = gulp.series(deleteDist, mainTasks);

// --- Exporting scenarios
export { dev, build };
