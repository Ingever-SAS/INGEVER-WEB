# Routing

# Introducción

El sistema de navegación de Ingever Asociados S.A.S. está construido utilizando **React Router DOM**.

Toda la aplicación funciona como una **Single Page Application (SPA)**, lo que significa que la navegación entre páginas ocurre sin recargar completamente el navegador.

La responsabilidad del sistema de rutas es dirigir al usuario hacia la página correcta manteniendo una experiencia fluida y consistente.

---

# Objetivos

El sistema de rutas debe cumplir los siguientes objetivos:

- Mantener una navegación rápida.
- Facilitar el crecimiento del proyecto.
- Evitar rutas duplicadas.
- Separar correctamente las responsabilidades.
- Mantener una estructura fácil de entender.

---

# Arquitectura

Actualmente la navegación depende de la siguiente estructura:

```
BrowserRouter

↓

App.jsx

↓

Routes

↓

Route

↓

Page

↓

Sections

↓

Components
```

Cada nivel tiene una responsabilidad específica.

---

# App.jsx

App.jsx actúa únicamente como administrador de rutas.

No debe contener:

- Diseño.
- Componentes visuales.
- Datos.
- Formularios.
- Lógica de negocio.

Su única responsabilidad consiste en registrar las páginas disponibles.

---

# Rutas Actuales

## Página principal

Ruta

```
/
```

Componente

```
Home.jsx
```

Descripción

Landing principal del sitio.

---

## Contacto

Ruta

```
/contacto
```

Componente

```
ContactPage.jsx
```

Descripción

Formulario para solicitar cotizaciones.

---

## Trabaja con Nosotros

Ruta

```
/trabaja-con-nosotros
```

Componente

```
JoinTeamPage.jsx
```

Descripción

Formulario para recepción de hojas de vida.

---

# Organización

Todas las páginas deberán almacenarse en:

```
src/pages/
```

Nunca dentro de:

```
components/

sections/

utils/
```

---

# Flujo de Navegación

```
Usuario

↓

Hace clic

↓

React Router

↓

Busca la ruta

↓

Carga la página

↓

Renderiza secciones

↓

Renderiza componentes
```

---

# Navegación Interna

Toda navegación deberá realizarse mediante:

```
<Link />

o

useNavigate()
```

No utilizar:

```
window.location
```

excepto cuando sea absolutamente necesario.

---

# Creación de Nuevas Páginas

Para agregar una nueva página deberá seguirse el siguiente proceso.

## Paso 1

Crear el archivo.

Ejemplo

```
src/pages/AboutPage.jsx
```

---

## Paso 2

Crear el contenido.

---

## Paso 3

Importar la página en App.jsx.

---

## Paso 4

Registrar la nueva ruta.

Ejemplo

```jsx
<Route path="/nosotros" element={<AboutPage />} />
```

---

## Paso 5

Agregar la navegación correspondiente en Navbar.

---

## Paso 6

Actualizar la documentación.

---

# Cuándo Crear una Página

Debe crearse una nueva página cuando:

- Exista una URL propia.
- La información sea extensa.
- El contenido tenga un objetivo diferente.
- La navegación lo requiera.

Ejemplos

Servicios

Blog

Proyectos

Noticias

FAQ

---

# Cuándo Crear una Sección

Debe crearse una sección cuando:

- Forma parte de una página existente.
- No necesita una URL propia.
- Complementa otra información.

Ejemplos

Hero

Features

Clients

Footer

---

# Convenciones

Todas las páginas utilizarán PascalCase.

Ejemplo

```
AboutPage.jsx

ProjectsPage.jsx

ContactPage.jsx
```

Nunca:

```
about.jsx

contact.jsx

pagina.jsx
```

---

# Navegación Futura

La arquitectura está preparada para incorporar nuevas rutas.

Ejemplos

```
/nosotros

/servicios

/proyectos

/blog

/clientes

/certificaciones

/noticias

/contacto

/trabaja-con-nosotros
```

No será necesario modificar la estructura existente.

---

# Rutas Dinámicas

Si en el futuro se implementa un blog o catálogo de proyectos, podrán utilizarse rutas dinámicas.

Ejemplo

```
/proyectos/:id

/blog/:slug
```

Esto permitirá mostrar contenido específico sin crear múltiples páginas.

---

# Página 404

En futuras versiones deberá incorporarse una página para rutas inexistentes.

Ejemplo

```
<Route path="*" element={<NotFoundPage />} />
```

Objetivos

- Informar al usuario.
- Ofrecer un botón para regresar al inicio.
- Mantener la identidad visual.

---

# Protección de Rutas

Actualmente no existen rutas privadas.

Si en el futuro se implementa un panel administrativo, deberá utilizarse un sistema de autenticación y rutas protegidas.

Ejemplo

```
/admin

/dashboard

/configuracion
```

Estas rutas no deberán ser accesibles sin autenticación.

---

# Buenas Prácticas

- Mantener nombres descriptivos.
- Utilizar rutas en español para el sitio corporativo.
- Evitar rutas excesivamente largas.
- No duplicar páginas.
- Mantener una navegación intuitiva.
- Actualizar este documento cada vez que se agregue una nueva ruta.

---

# Objetivo Final

El sistema de rutas debe permanecer simple, escalable y fácil de mantener. App.jsx debe actuar únicamente como el punto central de navegación, mientras que las páginas, secciones y componentes conservan responsabilidades claramente separadas.