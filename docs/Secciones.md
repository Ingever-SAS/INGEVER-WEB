# Secciones

# Introducción

Las secciones representan bloques funcionales que conforman las páginas del sitio.

Cada sección tiene una única responsabilidad y debe poder desarrollarse, modificarse o reutilizarse de forma independiente.

Actualmente la Landing Page está compuesta por nueve secciones principales.

---

# Estructura General

```
Home

│

├── Navbar
├── Hero
├── About
├── Features
├── Services
├── Projects
├── Clients
├── Contact
├── JoinTeam
└── Footer
```

Cada una cumple un objetivo específico dentro del recorrido del usuario.

---

# Navbar

## Objetivo

Permitir la navegación entre las diferentes áreas del sitio.

Es el primer elemento visible para el usuario.

Debe permanecer simple y limpio.

---

## Contenido

Logo corporativo.

Menú principal.

Botón de contacto.

Menú responsive.

---

## Reglas

Debe ser responsive.

No debe ocupar demasiado espacio vertical.

Debe facilitar la navegación desde cualquier dispositivo.

Puede incorporar cambios visuales al hacer scroll.

---

# Hero

## Objetivo

Captar la atención del visitante durante los primeros segundos.

Debe comunicar inmediatamente:

Quién es la empresa.

Qué hace.

Por qué debería generar confianza.

---

## Contenido

Título principal.

Descripción.

Botón principal.

Botón secundario.

Imagen o ilustración.

---

## Reglas

Debe transmitir fuerza visual.

No utilizar exceso de texto.

Priorizar un mensaje claro.

---

# About

## Objetivo

Presentar la empresa.

Explicar brevemente:

Historia.

Experiencia.

Misión.

Valores.

Cobertura.

---

## Contenido

Texto institucional.

Imagen.

Indicadores.

Años de experiencia.

Cobertura nacional.

---

## Reglas

El texto debe ser breve.

Debe transmitir credibilidad.

---

# Features

## Objetivo

Mostrar las ventajas competitivas de la empresa.

¿Por qué elegir Ingever?

---

## Ejemplos

Experiencia.

Calidad.

Cumplimiento.

Innovación.

Cobertura.

Personal calificado.

---

## Diseño

Utilizar tarjetas reutilizables.

Mantener iconografía uniforme.

---

# Services

## Objetivo

Mostrar los servicios ofrecidos.

Cada servicio debe ser fácilmente identificable.

---

## Contenido

Imagen.

Nombre.

Descripción.

Botón.

---

## Componentes

ServiceCard.

---

## Reglas

No sobrecargar las tarjetas.

Mantener imágenes consistentes.

---

# Projects

## Objetivo

Mostrar proyectos realizados.

Sirve como respaldo de experiencia.

---

## Contenido

Imagen.

Nombre.

Ubicación.

Descripción.

Categoría.

---

## Componentes

ProjectCard.

---

## Futuro

Podrá conectarse con una base de datos o CMS.

---

# Clients

## Objetivo

Mostrar empresas que han trabajado con Ingever.

Incrementar la confianza.

---

## Contenido

Logotipos.

Opcionalmente testimonios.

---

## Componentes

ClientLogoCard.

---

## Reglas

Mantener tamaños uniformes.

No deformar logotipos.

---

# Contact

## Objetivo

Invitar al usuario a comunicarse con la empresa.

No reemplaza ContactPage.

Sirve como llamada a la acción.

---

## Contenido

Información de contacto.

Botón hacia ContactPage.

Mapa.

Teléfono.

Correo.

Dirección.

---

## Reglas

Debe facilitar el acceso al formulario completo.

---

# JoinTeam

## Objetivo

Invitar a nuevos candidatos a enviar su hoja de vida.

Es una sección independiente.

---

## Contenido

Texto.

Botón.

Ilustración.

---

## Navegación

Debe dirigir al usuario hacia:

/trabaja-con-nosotros

---

## Reglas

Puede eliminarse únicamente quitando:

```jsx
<JoinTeam />
```

de Home.jsx.

Nunca desde App.jsx.

---

# Footer

## Objetivo

Cerrar la navegación del sitio.

Ofrecer información institucional permanente.

---

## Contenido

Logo.

Información de contacto.

Enlaces rápidos.

Redes sociales.

Copyright.

---

## Reglas

Debe mantenerse consistente en todas las páginas.

---

# Flujo del Usuario

```
Navbar

↓

Hero

↓

About

↓

Features

↓

Services

↓

Projects

↓

Clients

↓

Contact

↓

JoinTeam

↓

Footer
```

Cada sección prepara al usuario para la siguiente.

La Landing funciona como una historia que guía al visitante desde la presentación de la empresa hasta la conversión (contacto o postulación).

---

# Reglas Generales

Cada sección debe tener una única responsabilidad.

No debe contener componentes duplicados.

Debe utilizar componentes reutilizables.

Debe ser completamente responsive.

Debe mantener coherencia visual con el Design System.

Toda nueva sección deberá documentarse antes de incorporarse al proyecto.

---

# Futuras Secciones

La arquitectura permite agregar nuevas secciones como:

- Testimonios.
- Preguntas frecuentes.
- Certificaciones.
- Blog.
- Noticias.
- Estadísticas.
- Línea de tiempo.
- Aliados estratégicos.

Estas deberán integrarse respetando la jerarquía y el flujo definidos en este documento.

---

# Objetivo Final

Las secciones son los bloques funcionales que construyen la experiencia del usuario. Cada una debe cumplir un propósito claro, estar desacoplada de las demás y facilitar la evolución del proyecto sin comprometer la arquitectura existente.