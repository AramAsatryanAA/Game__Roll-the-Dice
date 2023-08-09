import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";

const sass = gulpSass(dartSass);

export function scss() {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../images/"))
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        autoPrefixer({
          grid: true,
          cascade: true,
          overrideBrowserslist: ["last 5 versions"],
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.gulpIf(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
}
