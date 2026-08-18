const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public', 'clientwork');

async function convertAll() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  console.log(`Found ${files.length} JPG files. Converting to WebP losslessly...`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace('.jpg', '.webp'));
    
    await sharp(inputPath)
      .webp({ lossless: true, quality: 100 }) // ensuring no loss of clarity
      .toFile(outputPath);
      
    // Delete the original as before
    fs.unlinkSync(inputPath);
    
    if ((i + 1) % 50 === 0) {
      console.log(`Converted ${i + 1}/${files.length}...`);
    }
  }
  
  console.log('Conversion complete!');
}

convertAll().catch(console.error);
