import webphtml from "gulp-webp-html-nosvg";
import version from "gulp-version-number";

export function html() {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "images/"))
    .pipe(app.plugins.gulpIf(app.isBuild, webphtml()))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        version({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
}
