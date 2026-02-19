import { readFileSync, writeFileSync } from 'fs';

const files = [
  'components/order-form.tsx',
  'components/wave-qr-modal.tsx',
  'app/checkout/page.tsx',
];

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  
  // Replace all .toLocaleString() with inline formatting
  content = content.replace(/\.toLocaleString\(\)/g, `.toFixed(0).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.')`);
  
  writeFileSync(file, content, 'utf8');
  console.log(`Fixed: ${file}`);
}

console.log('Done!');
