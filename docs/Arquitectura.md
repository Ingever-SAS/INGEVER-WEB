# Arquitectura del Proyecto

# Introducción

La arquitectura del proyecto fue diseñada siguiendo principios de modularidad, reutilización y escalabilidad.

Cada carpeta tiene una única responsabilidad y ningún archivo debe contener lógica que pertenezca a otra capa de la aplicación.

El objetivo es que el proyecto pueda crecer durante años sin necesidad de reorganizar completamente su estructura.

---

# Principios Arquitectónicos

La arquitectura sigue los siguientes principios:

- Separación de responsabilidades.
- Componentes reutilizables.
- Bajo acoplamiento.
- Alta cohesión.
- Escalabilidad.
- Mantenibilidad.
- Legibilidad.

Cada archivo debe tener una función clara.

---

# Estructura General

```
src/
│
├── assets/
├── components/
│   ├── cards/
│   └── ui/
├── config/
├── data/
├── pages/
├── sections/
├── styles/
├── utils/
│
├── App.jsx
└── main.jsx
```

---

# assets/

Contiene todos los recursos estáticos del proyecto.

Ejemplos:

- imágenes
- logos
- iconos
- videos
- archivos SVG
- ilustraciones

No debe contener lógica.

---

# components/

Aquí viven los componentes reutilizables.

Un componente reutilizable puede utilizarse en múltiples páginas.

Ejemplos:

- Button
- Container
- Input
- Card
- Modal
- Badge

Nunca deben depender de una página específica.

---

# components/ui/

Contiene componentes básicos de interfaz.

Ejemplos:

- Button
- Input
- TextArea
- SectionTitle
- Container

Son los bloques fundamentales del sistema de diseño.

---

# components/cards/

Agrupa todas las tarjetas reutilizables.

Ejemplos:

- ServiceCard
- ProjectCard
- FeatureCard
- ClientLogoCard

Todas deben mantener un estilo consistente.

---

# pages/

Representa las páginas completas del sitio.

Cada página corresponde a una ruta.

Actualmente existen:

Home

ContactPage

JoinTeamPage

Una página organiza secciones, pero no contiene componentes pequeños reutilizables.

---

# sections/

Las secciones representan bloques grandes de una página.

Ejemplos:

Hero

About

Features

Services

Projects

Clients

Contact

JoinTeam

Footer

Cada sección debe ser independiente.

---

# data/

Contiene toda la información estructurada del proyecto.

Ejemplos:

Servicios

Clientes

Proyectos

Información de la empresa

Datos del menú

Nunca escribir información fija directamente dentro de los componentes si puede almacenarse aquí.

---

# config/

Contiene configuraciones globales.

Ejemplos:

Constantes

Configuraciones

Variables

Endpoints

Configuraciones del sitio

---

# styles/

Aquí se almacenan estilos globales.

Ejemplos:

animations.css

globals.css

variables.css

No debe duplicar estilos que puedan resolverse mediante Tailwind.

---

# utils/

Contiene funciones auxiliares.

Ejemplos:

Formateadores

Validadores

Helpers

Funciones matemáticas

Nunca debe contener componentes React.

---

# App.jsx

Responsabilidad:

Configurar React Router.

No debe contener lógica de negocio.

No debe contener diseño.

No debe contener secciones.

Debe limitarse al manejo de rutas.

---

# main.jsx

Es el punto de entrada de React.

Responsabilidades:

Renderizar la aplicación.

Importar estilos globales.

Inicializar proveedores si en el futuro se utilizan.

---

# Flujo de Componentes

```
App

↓

Pages

↓

Sections

↓

Components

↓

UI
```

La información siempre fluye desde niveles superiores hacia componentes más pequeños mediante props.

---

# Flujo de Datos

```
data/

↓

Pages

↓

Sections

↓

Components
```

Evitar escribir datos directamente en los componentes cuando puedan centralizarse.

---

# Convenciones de Nombres

Componentes:

PascalCase

Ejemplo:

Hero.jsx

ServiceCard.jsx

Button.jsx

---

Funciones:

camelCase

Ejemplo:

handleSubmit()

calculateHeight()

formatPhone()

---

Variables:

camelCase

Ejemplo:

selectedService

currentProject

isMenuOpen

---

Constantes

MAYÚSCULAS

Ejemplo:

MAX_FILE_SIZE

DEFAULT_LANGUAGE

API_URL

---

# Reglas Arquitectónicas

Nunca crear componentes enormes.

Un componente con demasiadas responsabilidades debe dividirse.

No duplicar código.

No copiar componentes existentes.

Reutilizar siempre que sea posible.

Las páginas organizan.

Las secciones estructuran.

Los componentes reutilizan.

Los elementos UI construyen la interfaz.

---

# Escalabilidad

La arquitectura está preparada para incorporar nuevas funcionalidades como:

- Blog corporativo
- Portal administrativo
- Dashboard
- Autenticación
- Gestión documental
- Noticias
- CRM
- Integraciones con APIs

Sin necesidad de reorganizar la estructura principal.

---

# Buenas Prácticas

Antes de crear un archivo nuevo preguntarse:

¿Ya existe un componente similar?

¿Puede reutilizarse uno existente?

¿Pertenece realmente a esta carpeta?

¿Estoy rompiendo la separación de responsabilidades?

Si la respuesta genera dudas, es preferible reorganizar antes de continuar desarrollando.

---

# Objetivo Final

Mantener una arquitectura limpia, profesional y fácil de entender para cualquier desarrollador que participe en el proyecto, garantizando que el crecimiento del sitio no implique una pérdida de orden ni de calidad del código.