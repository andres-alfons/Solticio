/**
 * Script para subir imágenes locales a Supabase Storage y vincularlas a productos.
 * 
 * INSTRUCCIONES:
 * 1. Abre este archivo en un servidor local (Live Server, etc.)
 * 2. Asegúrate de que el bucket 'product-images' exista en Supabase Storage (público)
 * 3. El script subirá todas las imágenes y las vinculará a los productos
 */

const SUPABASE_URL = 'https://lyhyvmnqvkcvoddaqusa.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aHl2bW5xdmtjdm9kZGFxdXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTY2MDIsImV4cCI6MjA5MTU5MjYwMn0.tizFP1oF85bmxT3Ss_dPO2DJilix7wmiVIpyDuykmhI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// Mapeo de producto -> imágenes (primera es la principal)
const PRODUCT_IMAGES = {
  'Aurora': ['WhatsApp Image 2026-05-13 at 11.13.18 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.18 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.16 PM (3).jpeg'],
  'Esmeralda': ['WhatsApp Image 2026-05-13 at 11.13.18 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.17 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.58 PM (1).jpeg'],
  'Noche Eterna': ['WhatsApp Image 2026-05-13 at 11.13.17 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.59 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (4).jpeg'],
  'Real': ['WhatsApp Image 2026-05-13 at 11.13.17 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.16 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.56 PM (1).jpeg'],
  'Sol': ['WhatsApp Image 2026-05-13 at 11.13.17 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.16 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.58 PM (2).jpeg'],
  'Luna': ['WhatsApp Image 2026-05-13 at 11.13.17 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (1).jpeg'],
  'Gardenia': ['WhatsApp Image 2026-05-13 at 11.13.16 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.16 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.54 PM.jpeg'],
  'Imperio': ['WhatsApp Image 2026-05-13 at 11.13.16 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.16 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.56 PM.jpeg'],
  'Marfil': ['WhatsApp Image 2026-05-13 at 11.13.16 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.58 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (1).jpeg'],
  'Bohemia': ['WhatsApp Image 2026-05-13 at 11.13.16 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.58 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (3).jpeg'],
  'Medianoche': ['WhatsApp Image 2026-05-13 at 11.08.59 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM.jpeg'],
  'Amanecer': ['WhatsApp Image 2026-05-13 at 11.08.58 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (2).jpeg'],
  'Clemencia': ['WhatsApp Image 2026-05-13 at 11.08.58 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.54 PM.jpeg'],
  'Serena': ['WhatsApp Image 2026-05-13 at 11.08.58 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.56 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (2).jpeg'],
  'Ópalo': ['WhatsApp Image 2026-05-13 at 11.08.57 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (1).jpeg'],
  'Eclipse': ['WhatsApp Image 2026-05-13 at 11.08.57 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.56 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (4).jpeg'],
  'Coral': ['WhatsApp Image 2026-05-13 at 11.08.57 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (2).jpeg'],
  'Dalia': ['WhatsApp Image 2026-05-13 at 11.08.57 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.08.54 PM.jpeg'],
  'Atardecer': ['WhatsApp Image 2026-05-13 at 11.08.56 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.56 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (1).jpeg'],
  'Azalea': ['WhatsApp Image 2026-05-13 at 11.08.56 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.08.58 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM (3).jpeg'],
  'Carmín': ['WhatsApp Image 2026-05-13 at 11.08.55 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.55 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (4).jpeg'],
  'Magnolia': ['WhatsApp Image 2026-05-13 at 11.08.55 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.57 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.54 PM.jpeg'],
  'Valentina': ['WhatsApp Image 2026-05-13 at 11.08.55 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.16 PM (4).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.58 PM (2).jpeg'],
  'Primavera': ['WhatsApp Image 2026-05-13 at 11.08.55 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.16 PM (2).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.58 PM (3).jpeg'],
  'Nieves': ['WhatsApp Image 2026-05-13 at 11.08.55 PM.jpeg', 'WhatsApp Image 2026-05-13 at 11.13.18 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.59 PM.jpeg'],
  'Gala Platinum': ['WhatsApp Image 2026-05-13 at 11.13.18 PM (1).jpeg', 'WhatsApp Image 2026-05-13 at 11.13.17 PM (3).jpeg', 'WhatsApp Image 2026-05-13 at 11.08.59 PM.jpeg'],
};

async function uploadImage(file, path) {
  const response = await fetch(`img/${encodeURIComponent(file)}`);
  const blob = await response.blob();
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(path, blob, {
      cacheControl: '3600',
      upsert: true,
      contentType: blob.type || 'image/jpeg'
    });

  if (error) throw error;
  return data;
}

function getPublicUrl(path) {
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

async function run() {
  console.log('=== INICIANDO SUBIDA DE IMÁGENES ===');
  
  // 1. Obtener productos de la BD
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('id, name');

  if (prodError) {
    console.error('Error obteniendo productos:', prodError);
    return;
  }

  console.log(`Encontrados ${products.length} productos`);

  // Crear mapa nombre -> id (normalizado)
  const productMap = {};
  products.forEach(p => {
    const normalizedName = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    productMap[normalizedName] = p.id;
  });

  // 2. Subir imágenes y vincularlas
  let totalUploaded = 0;
  let totalErrors = 0;

  for (const [productName, images] of Object.entries(PRODUCT_IMAGES)) {
    const normalizedName = productName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const productId = productMap[normalizedName];

    if (!productId) {
      console.warn(`⚠ Producto "${productName}" no encontrado en BD`);
      continue;
    }

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const path = `products/${productId}/${i}_${file}`;

      try {
        await uploadImage(file, path);
        const url = getPublicUrl(path);

        // Insertar en product_images
        const { error: insertError } = await supabase
          .from('product_images')
          .insert({
            product_id: productId,
            image_url: url,
            sort_order: i,
            is_primary: i === 0
          });

        if (insertError) {
          console.error(`  ✗ ${productName} [${i}]: ${insertError.message}`);
          totalErrors++;
        } else {
          console.log(`✓ ${productName} [${i}] → ${path}`);
          totalUploaded++;
        }
      } catch (e) {
        console.error(`✗ Error subiendo ${file}: ${e.message}`);
        totalErrors++;
      }
    }
  }

  console.log(`\n=== COMPLETADO ===`);
  console.log(`Subidas: ${totalUploaded}`);
  console.log(`Errores: ${totalErrors}`);
}

run();
