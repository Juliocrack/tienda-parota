# Tienda Online - Configuración de Base de Datos

## Configuración de Firebase

1. Ve a https://console.firebase.google.com/
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Ve a Configuración del proyecto > General > Tus apps > Agrega una app web
5. Copia la configuración de Firebase

## Variables de Entorno

Actualiza el archivo `.env` con tus claves de Firebase:

```
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
```

## Poblar la Base de Datos

Ejecuta el script para cargar los productos iniciales:

```bash
npm run populate-db
```

## Configuración de Firebase Hosting

1. Instala CLI de Firebase:

```bash
npm install -g firebase-tools
```

2. Loguéate en Firebase:

```bash
firebase login
```

3. Inicializa hosting (elige "build" como carpeta pública y SPA rewrite a /index.html):

```bash
firebase init hosting
```

4. Verifica que existan estos archivos:

- `firebase.json`
- `.firebaserc`

5. Cambia el projectId en `.firebaserc`:

```json
{
  "projects": {
    "default": "tu_id_de_proyecto_firebase"
  }
}
```

6. Publica:

```bash
npm run build
firebase deploy
```

## Estructura de la Base de Datos

Colección: `products`

Campos:
- name: string
- price: number
- image: string
- images: array
- description: string
- detailedDescription: string
- features: array
- dimensions: string
- weight: number
- stock: number
- category: string (ej: 'mesa', 'espejo')
- material: string (ej: 'parota')
- rating: number

## Control de Inventario

- El stock se valida al agregar productos al carrito
- Se reduce automáticamente al completar una compra
- Alertas si no hay stock disponible