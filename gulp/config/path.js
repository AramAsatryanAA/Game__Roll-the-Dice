import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const srcFolder = `./src`;
const buildFolder = `./dist`;

export const path = {
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/main.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
  },
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/**/*.scss`,
    js: `${srcFolder}/**/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,ico,gif,webp}`,
  },
  clean: buildFolder,
  rootFolder,
  srcFolder,
  buildFolder,
};
