# Gestión de Datos

# Introducción

La carpeta `data/` centraliza toda la información estática utilizada por la aplicación.

Su objetivo principal es separar el contenido de la lógica y de la interfaz, permitiendo actualizar información sin modificar los componentes React.

Este enfoque mejora la mantenibilidad, facilita futuras integraciones con APIs o CMS y evita la duplicación de datos.

---

# Objetivos

La carpeta `data/` debe:

- Centralizar la información del sitio.
- Evitar textos repetidos.
- Facilitar actualizaciones.
- Mantener componentes reutilizables.
- Preparar el proyecto para consumir datos externos en el futuro.

---

# Estructura Recomendada

```
src/

data/

├── company.js
├── navigation.js
├── services.js
├── projects.js
├── clients.js
├── features.js
├── social.js
├── contact.js
├── footer.js
└── employment.js
```

Cada archivo representa un único conjunto de datos.

---

# company.js

Contiene la información institucional de la empresa.

Ejemplo

```javascript
export const company = {
    name: "Ingever Asociados S.A.S.",
    slogan: "...",
    yearsExperience: 20,
    cities: 6,
    description: "...",
    mission: "...",
    vision: "...",
}
```

Toda la información institucional deberá obtenerse desde este archivo.

---

# navigation.js

Define los enlaces del menú principal.

Ejemplo

```javascript
export const navigation = [
{
label: "Inicio",
href: "/"
},
{
label: "Servicios",
href: "#services"
},
{
label: "Contacto",
href: "/contacto"
}
]
```

Navbar no debe contener enlaces escritos manualmente.

---

# services.js

Contiene los servicios ofrecidos.

Ejemplo

```javascript
export const services = [
{
id: 1,
title: "...",
description: "...",
image: "...",
slug: "...",
}
]
```

Services.jsx recorrerá este arreglo utilizando `.map()`.

---

# projects.js

Almacena los proyectos realizados.

Cada proyecto deberá contener:

- id
- nombre
- ubicación
- descripción
- categoría
- imagen
- año
- cliente

Ejemplo

```javascript
{
id: 1,
title: "...",
location: "...",
year: 2025
}
```

---

# clients.js

Lista de clientes.

Ejemplo

```javascript
[
{
id:1,
name:"...",
logo:"..."
}
]
```

ClientLogoCard consumirá esta información.

---

# features.js

Lista de ventajas competitivas.

Ejemplo

```javascript
[
{
icon:"...",
title:"Experiencia",
description:"..."
}
]
```

---

# social.js

Contendrá redes sociales.

```javascript
export const social = {

facebook:"",

instagram:"",

linkedin:"",

youtube:""

}
```

Footer utilizará estos datos.

---

# contact.js

Información de contacto.

```javascript
export const contact = {

phone:"",

email:"",

address:"",

city:"",

country:"",

map:""

}
```

Contact y Footer consumirán estos datos.

---

# footer.js

Información específica del Footer.

Ejemplo

Links rápidos.

Copyright.

Enlaces legales.

---

# employment.js

Información relacionada con el portal de empleo.

Ejemplo

Áreas disponibles.

Cargos.

Mensajes.

Requisitos.

Esto permitirá modificar el portal de empleo sin alterar la interfaz.

---

# Flujo de Datos

```
data/

↓

Section

↓

Component

↓

UI
```

Los datos siempre viajan desde la capa superior hacia los componentes mediante props.

Nunca al contrario.

---

# Reglas

No escribir información directamente dentro de Hero.

Incorrecto

```jsx
<h1>20 años de experiencia</h1>
```

Correcto

```jsx
<h1>{company.yearsExperience} años de experiencia</h1>
```

---

# Beneficios

Modificar un dato en un único lugar.

Reducir duplicación.

Facilitar mantenimiento.

Preparar el proyecto para un CMS.

Preparar el proyecto para consumir APIs.

---

# Futuras Integraciones

La estructura permitirá reemplazar fácilmente los archivos locales por:

REST API

GraphQL

Headless CMS

Base de datos

JSON remoto

Sin modificar los componentes.

---

# Buenas Prácticas

Mantener un archivo por entidad.

No mezclar datos diferentes.

Utilizar nombres descriptivos.

Documentar nuevas estructuras.

No almacenar lógica dentro de `data/`.

---

# Objetivo Final

La carpeta `data/` debe convertirse en la única fuente de información estática del proyecto. Los componentes deberán limitarse a renderizar los datos recibidos, manteniendo una separación clara entre contenido, lógica e interfaz.