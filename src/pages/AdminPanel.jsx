import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { getProducts, getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService'
import { uploadImage } from '../services/imageService'
import './AdminPanel.css'

const AdminPanel = () => {
  const { user, logout } = useAdminAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'mesa',
    image: null,
    imagePreview: null
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getAllProducts()
      setProducts(data)
    } catch (err) {
      setError('Error cargando productos')
    } finally {
      setLoading(false)
    }
  }

  const handleCrearProducto = async (productoData) => {
    setLoading(true)
    await createProduct(productoData)
    const productosActualizados = await getProducts()
    setProducts(productosActualizados)
    setLoading(false)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      let imageURL = null

      if (formData.image) {
        setUploadingImage(true)
        imageURL = await uploadImage(formData.image)
        setUploadingImage(false)
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        ...(imageURL && { image: imageURL })
      }

      if (editingId) {
        await updateProduct(editingId, productData)
        setSuccess('Producto actualizado correctamente')
      } else {
        await handleCrearProducto(productData)
        setSuccess('Producto creado correctamente')
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'mesa',
        image: null,
        imagePreview: null
      })
      setEditingId(null)
      setShowForm(false)
      await loadProducts()
    } catch (err) {
      setError('Error guardando producto: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: null,
      imagePreview: product.image || null
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return

    try {
      setError('')
      await deleteProduct(id)
      setSuccess('Producto eliminado')
      await loadProducts()
    } catch (err) {
      setError('Error eliminando producto: ' + err.message)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'mesa',
      image: null,
      imagePreview: null
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      setError('Error al cerrar sesión')
    }
  }

  if (!user) return null

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel Admin</h1>
        <div className="admin-header-actions">
          <span className="admin-user">{user.email}</span>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </header>

      {error && <div className="admin-alert error">{error}</div>}
      {success && <div className="admin-alert success">{success}</div>}

      <div className="admin-content">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="admin-new-btn"
            disabled={loading}
          >
            + Nuevo Producto
          </button>
        )}

        {showForm && (
          <div className="admin-form-container">
            <h2>{editingId ? 'Editar' : 'Crear'} Producto</h2>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Precio</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Categoría</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={loading}
                  >
                    <option value="mesa">Mesa</option>
                    <option value="silla">Silla</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group full">
                <label>Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  disabled={loading}
                />
              </div>

              <div className="admin-form-group full">
                <label>Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading || uploadingImage}
                />
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="preview"
                    className="admin-image-preview"
                  />
                )}
                {uploadingImage && <p className="uploading">Subiendo imagen...</p>}
              </div>

              <div className="admin-form-actions">
                <button
                  type="submit"
                  className="admin-save-btn"
                  disabled={loading || uploadingImage}
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="admin-cancel-btn"
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-products">
          <h2>Productos ({products.length})</h2>
          {loading && !showForm ? (
            <p className="loading">Cargando...</p>
          ) : products.length === 0 ? (
            <p className="no-products">No hay productos</p>
          ) : (
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="product-image-cell">
                        {product.image && (
                          <img src={product.image} alt={product.name} />
                        )}
                      </td>
                      <td>
                        <strong>{product.name}</strong>
                        <p className="product-desc">{product.description?.substring(0, 50)}...</p>
                      </td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>{product.category}</td>
                      <td className="product-actions">
                        <button
                          onClick={() => handleEdit(product)}
                          className="btn-edit"
                          disabled={loading}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn-delete"
                          disabled={loading}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
