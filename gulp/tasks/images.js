import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export function images() {
  return app.gulp
    .src(app.path.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(app.plugins.gulpIf(app.isBuild, webp()))
    .pipe(app.plugins.gulpIf(app.isBuild, app.gulp.dest(app.path.build.images)))
    .pipe(app.plugins.gulpIf(app.isBuild, app.gulp.src(app.path.src.images)))
    .pipe(
      app.plugins.gulpIf(app.isBuild, app.plugins.newer(app.path.build.images))
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interplaced: true,
          optimizationLevel: 3, // from 0 to 7
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());
}
