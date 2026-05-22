// Ya no necesitas productos estáticos porque vienen de la nube
// import { products as staticProducts } from '../data/products.mjs'

const STORAGE_KEY = 'tienda-online-products' // Lo mantengo por si usas localStorage para caché

// Función base para llamar a nuestras funciones serverless
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`/.netlify/functions/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error)
    throw error
  }
}

// Obtener TODOS los productos (desde la nube)
export const getProducts = async () => {
  try {
    const productos = await apiRequest('obtenerProductos')
    return productos
  } catch (error) {
    console.error('Error al cargar productos desde Netlify:', error)
    return []
  }
}

// Alias para getAllProducts
export const getAllProducts = async () => {
  return getProducts()
}

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const nuevoProducto = {
      ...productData,
      fechaCreacion: new Date().toISOString()
    }
    
    const resultado = await apiRequest('guardarProducto', {
      method: 'POST',
      body: JSON.stringify(nuevoProducto)
    })
    
    // Si lo guardó bien, devolvemos el producto con su ID
    if (resultado.success) {
      return { ...nuevoProducto, id: resultado.id }
    }
    throw new Error('No se pudo guardar el producto')
  } catch (error) {
    console.error('Error al crear producto:', error)
    throw error
  }
}

// Actualizar un producto existente
export const updateProduct = async (productId, productData) => {
  try {
    // Primero obtenemos todos los productos
    const productos = await getProducts()
    const index = productos.findIndex((p) => p.id === productId)
    
    if (index < 0) {
      throw new Error('Producto no encontrado')
    }
    
    // Actualizamos el producto
    const productoActualizado = {
      ...productos[index],
      ...productData,
      id: productId,
      fechaActualizacion: new Date().toISOString()
    }
    
    // Guardamos el producto actualizado (soescribe con el mismo ID)
    const resultado = await apiRequest('guardarProducto', {
      method: 'POST',
      body: JSON.stringify(productoActualizado)
    })
    
    if (resultado.success) {
      return productoActualizado
    }
    throw new Error('No se pudo actualizar el producto')
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    throw error
  }
}

// Eliminar un producto
export const deleteProduct = async (productId) => {
  try {
    // Netlify Blobs no tiene delete directo desde la función que creamos
    // Necesitamos crear una función específica para borrar
    // Por ahora, esto es un placeholder
    
    // Solución temporal: Llamaremos a una nueva función que crearemos
    const response = await apiRequest('eliminarProducto', {
      method: 'DELETE',
      body: JSON.stringify({ id: productId })
    })
    
    return { id: productId }
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    throw error
  }
}

// Actualizar stock de un producto
export const updateProductStock = async (productId, newStock) => {
  return updateProduct(productId, { stock: newStock })
}