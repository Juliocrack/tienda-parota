# Admin Panel - Instrucciones de Configuración

## ¿Cómo acceder al panel de admin?

1. **Clic en el ícono ⚙️** en la esquina superior derecha de la tienda (header)
2. Se abrirá la página de login
3. Ingresa tu email y contraseña de admin

## Crear usuario admin en Firebase

### Opción 1: Desde Firebase Console (Recomendado)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `tienda-online-b8b12`
3. En el menú izquierdo, ve a **Authentication** > **Users**
4. Click en **Add User** o **Create User**
5. Ingresa:
   - **Email**: el email del admin (ej: admin@tienda.com)
   - **Password**: contraseña segura
6. Click en **Create User**

### Opción 2: Desde la app (Después de crear el primer usuario)

Si necesitas crear más usuarios, puedes usar la app y luego actualizar su email en Firebase.

## Funcionalidades del Admin Panel

### CRUD de Productos

- **Ver productos**: Tabla con todos los productos
- **Crear producto**: Click en "+ Nuevo Producto"
  - Nombre, descripción, precio, stock, categoría
  - Upload de imagen automática a Firebase Storage
- **Editar producto**: Click en "Editar" en la tabla
  - Puedes cambiar cualquier campo
  - Puedes actualizar la imagen
- **Eliminar producto**: Click en "Eliminar" en la tabla
  - Confirmación antes de eliminar

## Notas importantes

- ✅ El login es simple pero seguro (usa Firebase Auth)
- ✅ Las imágenes se suben a Firebase Storage automáticamente
- ✅ El CRUD es funcional y directo
- ✅ Los cambios se reflejan inmediatamente en la tienda
- ✅ El logout está en el header del panel

## Estructura de datos en Firestore

```
products/
  {productId}
    - name: String
    - description: String
    - price: Number
    - stock: Number
    - category: String
    - image: String (URL de Firebase Storage)
    - createdAt: Timestamp
    - updatedAt: Timestamp
```

## Próximas mejoras (opcionales)

- [ ] Agregar validaciones de stock más complejas
- [ ] Permitir múltiples imágenes por producto
- [ ] Agregar búsqueda/filtros en la tabla
- [ ] Exportar datos a CSV
- [ ] Dashboard con estadísticas de ventas
