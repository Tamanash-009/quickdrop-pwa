const sharp = require('sharp');
const fs = require('fs');

async function generateFavicons() {
  const input = 'public/logo.png';
  
  // favicon-16x16.png
  await sharp(input).resize(16, 16).png().toFile('public/favicon-16x16.png');
  // favicon-32x32.png
  await sharp(input).resize(32, 32).png().toFile('public/favicon-32x32.png');
  // apple-touch-icon.png
  await sharp(input).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  // android-chrome-192x192.png
  await sharp(input).resize(192, 192).png().toFile('public/android-chrome-192x192.png');
  // android-chrome-512x512.png
  await sharp(input).resize(512, 512).png().toFile('public/android-chrome-512x512.png');
  // maskable-icon-512.png (For maskable, we add some padding if needed, but since it's just resizing per user instructions, we'll keep it simple)
  await sharp(input)
    .resize(512, 512, { fit: 'contain', background: { r: 11, g: 19, b: 43, alpha: 1 } }) // background #0B132B
    .png()
    .toFile('public/maskable-icon-512.png');
    
  // favicon.ico (We can just use a 32x32 png and rename it for simplicity, most modern browsers handle it)
  await sharp(input).resize(32, 32).png().toFile('public/favicon.ico');
  
  console.log('All favicons generated successfully!');
}

generateFavicons().catch(console.error);
