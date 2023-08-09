export function localServer() {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`,
    },
    notify: false,
    port: 3500,
  });
}
