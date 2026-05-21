import { collection, addDoc } from 'firebase/firestore'

const populateDatabase = async () => {
  try {
    // Dynamic imports
    const { db } = await import('../services/firebaseClient.mjs')
    const { products } = await import('../data/products.mjs')

    for (const product of products) {
      await addDoc(collection(db, 'products'), {
        ...product,
        category: 'mesa',
        material: 'parota'
      })
      console.log(`Producto ${product.name} agregado`)
    }
    console.log('Base de datos poblada exitosamente')
  } catch (error) {
    console.error('Error poblando la base de datos:', error)
  }
}

populateDatabase()