const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dirs = [
  path.join(__dirname, 'public', 'herosection', 'Why_Leahvigor')
];

async function convertAll() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory not found: ${dir}`);
      continue;
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    console.log(`Found ${files.length} images in ${path.basename(dir)}. Converting to HD WebP...`);
    
    for (const file of files) {
      const inputPath = path.join(dir, file);
      const ext = path.extname(file);
      const outputPath = path.join(dir, file.replace(ext, '.webp'));
      
      // We use quality 95 and effort 6 for highest HD clarity while still optimizing
      await sharp(inputPath)
        .webp({ quality: 95, effort: 6 })
        .toFile(outputPath);
        
      console.log(`Converted ${file} to WebP.`);
    }
  }
}

convertAll().then(() => console.log('All done!')).catch(console.error);
