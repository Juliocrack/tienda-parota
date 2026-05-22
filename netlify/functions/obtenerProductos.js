const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const store = getStore({
    name: 'mi-tienda-productos',
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_AUTH_TOKEN
  });
  
  try {
    // Agregamos un timeout más agresivo
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
    );
    
    const listPromise = store.list();
    const { blobs } = await Promise.race([listPromise, timeoutPromise]);
    
    const productos = [];
    for (const blob of blobs) {
      const data = await store.get(blob.key);
      if (data) productos.push(JSON.parse(data));
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productos)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};