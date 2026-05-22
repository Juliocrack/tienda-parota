const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const store = getStore({
    name: 'mi-tienda-productos',
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_AUTH_TOKEN
  });
  
  try {
    const producto = JSON.parse(event.body);
    const id = producto.id || Date.now().toString();
    
    await store.set(id, JSON.stringify({
      ...producto,
      id,
      fechaActualizacion: new Date().toISOString()
    }));
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, id })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};