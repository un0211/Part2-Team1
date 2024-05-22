const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "../src/assets/images");
const outputDir = path.join(__dirname, "../src/assets/images");

const convertPngToWebp = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath).toFormat("webp").toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
};

const processImages = async () => {
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

      if (path.extname(file).toLowerCase() === ".png") {
        convertPngToWebp(inputPath, outputPath);
      }
    });
  });
};

processImages();
