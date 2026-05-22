const { getStore, connectLambda } = require('@netlify/blobs');

exports.handler = connectLambda(async (event, context) => {
    const store = getStore('mi-tienda-productos');
    try {
        const { id } = JSON.parse(event.body);
        if (!id) throw new Error('ID requerido');
        await store.delete(id);
        return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, id }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
});