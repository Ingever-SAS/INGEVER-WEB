# Deploy con Netlify

# Introducción

Este documento describe el proceso oficial para desplegar el sitio web de Ingever Asociados S.A.S. utilizando Netlify.

El objetivo es garantizar que cualquier desarrollador pueda publicar nuevas versiones del sitio de forma rápida, segura y consistente.

---

# Arquitectura de Despliegue

El proyecto utiliza el siguiente flujo:

```
VS Code

↓

Git

↓

GitHub

↓

Netlify

↓

Sitio Web
```

Todo el proceso de despliegue está automatizado.

No se realizan cargas manuales de archivos.

---

# Tecnologías

Frontend

- React
- Vite

Repositorio

- GitHub

Hosting

- Netlify

---

# Flujo de Publicación

El proceso recomendado es:

1. Realizar cambios en el proyecto.
2. Probar localmente.
3. Crear commit.
4. Hacer push al repositorio.
5. Esperar el despliegue automático de Netlify.
6. Verificar el funcionamiento del sitio publicado.

---

# Configuración del Proyecto

Framework

Vite

Build Command

```
npm run build
```

Publish Directory

```
dist
```

---

# Archivo _redirects

Al tratarse de una aplicación React SPA, es obligatorio crear el siguiente archivo.

Ubicación

```
public/_redirects
```

Contenido

```
/* /index.html 200
```

Este archivo permite que React Router funcione correctamente al actualizar cualquier ruta.

---

# Problema Resuelto

Durante el desarrollo se presentó el siguiente problema.

Al acceder directamente a:

```
/contacto

/trabaja-con-nosotros
```

Netlify respondía con un error 404.

La solución consistió en crear el archivo `_redirects` con la configuración adecuada.

Este archivo es obligatorio para cualquier despliegue futuro.

---

# Variables de Entorno

Actualmente el proyecto no utiliza variables de entorno.

Si en el futuro se agregan servicios como:

- EmailJS
- APIs
- Firebase
- Supabase

las claves deberán almacenarse mediante variables de entorno de Netlify y nunca incluirse directamente en el repositorio.

---

# Dominio

Actualmente el sitio utiliza un dominio proporcionado por Netlify.

En producción deberá configurarse el dominio oficial de la empresa.

Proceso recomendado:

1. Registrar el dominio.
2. Configurar DNS.
3. Asociarlo en Netlify.
4. Verificar HTTPS.
5. Comprobar redirecciones.

---

# HTTPS

Netlify genera certificados SSL automáticamente.

Antes de publicar una nueva versión verificar que el sitio sea accesible mediante:

```
https://
```

No utilizar enlaces HTTP.

---

# Verificaciones Después del Deploy

Después de cada despliegue comprobar:

- La página principal carga correctamente.
- Todas las rutas funcionan.
- Las imágenes se muestran.
- No existen errores en la consola.
- Los formularios funcionan.
- El menú responsive funciona.
- No existen enlaces rotos.
- El diseño responsive sigue funcionando.

---

# Optimización

Antes de publicar:

Optimizar imágenes.

Eliminar código muerto.

Eliminar imports innecesarios.

Ejecutar el build local.

Comprobar advertencias del compilador.

---

# Build Local

Antes del push ejecutar:

```bash
npm run build
```

Si el proyecto compila correctamente es mucho menos probable que falle el despliegue.

---

# Solución de Problemas

## Error de Build

Revisar:

- Imports incorrectos.
- Archivos inexistentes.
- Errores de sintaxis.
- Dependencias faltantes.

---

## Página en Blanco

Comprobar:

- Console del navegador.
- Build de Vite.
- Variables de entorno.
- Rutas.

---

## Error 404

Verificar la existencia del archivo:

```
public/_redirects
```

---

## Imágenes no cargan

Comprobar:

- Ruta correcta.
- Importación.
- Nombre del archivo.
- Uso de `assets`.

---

# Checklist de Producción

Antes de considerar una versión como estable verificar:

- Build exitoso.
- Sin errores en consola.
- Responsive correcto.
- Navegación completa.
- Formularios funcionales.
- SEO configurado.
- Favicon correcto.
- Meta etiquetas configuradas.
- Imágenes optimizadas.
- Documentación actualizada.

---

# Flujo de Versiones

Cada nueva versión deberá seguir este ciclo:

```
Desarrollo

↓

Pruebas

↓

Documentación

↓

Commit

↓

Push

↓

Deploy

↓

Validación

↓

Producción
```

Nunca omitir la fase de validación.

---

# Objetivo Final

El despliegue debe ser un proceso automático, repetible y seguro.

Cualquier desarrollador que siga este documento debe ser capaz de publicar una nueva versión del sitio sin necesidad de realizar configuraciones adicionales ni resolver problemas ya documentados.