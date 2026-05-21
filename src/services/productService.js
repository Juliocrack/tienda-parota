import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'
import { db } from './firebaseClient.mjs'

export const getProducts = async () => {
  try {
    console.log('productService: db =>', db)
    const q = query(collection(db, 'products'), where('category', '==', 'mesa'))
    const querySnapshot = await getDocs(q)
    const products = []
    querySnapshot.forEach((document) => {
      products.push({ id: document.id, ...document.data() })
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const updateProductStock = async (productId, newStock) => {
  try {
    const productRef = doc(db, 'products', productId)
    await updateDoc(productRef, { stock: newStock })
    return { id: productId, stock: newStock }
  } catch (error) {
    console.error('Error updating stock:', error)
    throw error
  }
}