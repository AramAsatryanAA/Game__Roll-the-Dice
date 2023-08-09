import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const ttfToWoffAndWoff2 = () => {
  // Searchong for ".ttf" font files
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Converting to ".woff"
      .pipe(
        fonter({
          formats: ["woff"],
        })
      )
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Searchong for ".ttf" font files
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
      // Converting to ".woff2"
      .pipe(ttf2woff2())
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const importFontsInStyles = () => {
  // --- Style file for importing fonts
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // --- Checking for the existence of font files
  fs.readdir(app.path.build.fonts, function (err, fontFiles) {
    if (fontFiles) {
      // --- Checking for the existence of a style file for connecting fonts
      if (!fs.existsSync(fontsFile)) {
        // --- If file doesn't exist, creating the file
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (let i = 0; i < fontFiles.length; i++) {
          // --- Importing fonts into the styles file
          let fontFileName = fontFiles[i].split(".")[0];

          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            switch (fontWeight.toLowerCase()) {
              case "thin":
                fontWeight = 100;
                break;
              case "extralight":
                fontWeight = 200;
                break;
              case "light":
                fontWeight = 300;
                break;
              case "medium":
                fontWeight = 500;
                break;
              case "semibold":
                fontWeight = 600;
                break;
              case "bold":
                fontWeight = 700;
                break;
              case "extrabold" || "heavy":
                fontWeight = 800;
                break;
              case "black":
                fontWeight = 900;
                break;

              default:
                fontWeight = 400;
                break;
            }

            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-wight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        // --- If file exists, showing the message
        console.log(
          "The scss/fonts.scss file already exists! To update the file, you need to delete it!"
        );
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);

  function cb() {}
};
