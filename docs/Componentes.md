# Componentes

# Introducción

Los componentes representan las piezas reutilizables de la aplicación.

Todo el proyecto debe construirse reutilizando componentes existentes antes de crear nuevos.

El objetivo es mantener una interfaz consistente, reducir la duplicación de código y facilitar el mantenimiento.

---

# Estructura

Los componentes se dividen en dos grandes grupos.

src/

components/

├── ui/

└── cards/

---

# Componentes UI

Los componentes UI son los bloques básicos de toda la interfaz.

No representan una funcionalidad completa.

Son piezas reutilizables.

Ejemplos:

Button

Input

Container

SectionTitle

---

# Button

## Descripción

Componente reutilizable para todos los botones del sitio.

Debe utilizarse en toda la aplicación.

No deben crearse botones utilizando directamente etiquetas HTML salvo que exista una razón técnica.

---

## Responsabilidad

Mostrar acciones disponibles para el usuario.

---

## Casos de uso

Solicitar cotización

Enviar formulario

Conocer más

Trabaja con nosotros

Ver proyecto

---

## Estados

Normal

Hover

Focus

Active

Disabled

Loading

---

## Props recomendadas

children

Texto del botón.

variant

Tipo de botón.

Ejemplos

primary

secondary

outline

size

small

medium

large

onClick

Función que ejecutará.

disabled

true

false

className

Permite extender estilos.

---

## Buenas prácticas

No modificar colores directamente.

No escribir estilos repetidos.

Mantener variantes reutilizables.

---

# Container

## Descripción

Controla el ancho máximo del contenido.

Todas las secciones deben utilizar este componente.

---

## Objetivo

Mantener una alineación consistente en toda la página.

---

## Beneficios

Evita contenido demasiado ancho.

Mejora la lectura.

Facilita el responsive.

---

# Input

## Descripción

Componente reutilizable para todos los formularios.

Debe utilizarse tanto en ContactPage como en JoinTeamPage.

---

## Responsabilidad

Capturar información del usuario.

---

## Tipos soportados

text

email

number

tel

file

textarea

password

---

## Características

Label

Placeholder

Focus

Validación

Mensaje de error

Responsive

---

## Buenas prácticas

Nunca crear inputs manualmente.

Toda mejora debe hacerse desde este componente.

---

# SectionTitle

## Descripción

Componente utilizado para mostrar títulos de sección.

Ejemplo

Servicios

Nosotros

Clientes

Proyectos

Contacto

---

## Responsabilidad

Mantener una jerarquía visual uniforme.

---

## Beneficios

Todos los títulos tendrán exactamente el mismo estilo.

---

# Componentes Card

Las Cards representan bloques de información reutilizables.

Todas deben compartir el mismo lenguaje visual.

---

# FeatureCard

## Función

Mostrar ventajas competitivas de la empresa.

Ejemplos

Experiencia

Calidad

Cobertura nacional

Tecnología

---

# ServiceCard

## Función

Mostrar un servicio ofrecido por la empresa.

Debe contener

Imagen

Título

Descripción

Botón

---

# ProjectCard

## Función

Mostrar proyectos realizados.

Debe incluir

Imagen

Nombre

Descripción

Categoría

---

# ClientLogoCard

## Función

Mostrar logotipos de clientes.

Debe mantener tamaños uniformes.

---

# Reglas para crear nuevos componentes

Antes de crear un componente responder:

¿Ya existe uno parecido?

¿Puede extenderse uno existente?

¿Será reutilizable?

¿Pertenece realmente a components?

Si la respuesta es negativa, reconsiderar su creación.

---

# Flujo recomendado

Page

↓

Section

↓

Component

↓

UI

Nunca invertir esta jerarquía.

---

# Props

Todos los componentes deberán recibir información mediante props.

Evitar datos escritos directamente dentro del componente.

Ejemplo

Incorrecto

const titulo = "Servicios"

Correcto

<ServiceCard title="Servicios" />

---

# Estado

Los componentes deben ser lo más puros posible.

Siempre que sea posible:

Recibir datos.

Renderizar interfaz.

Emitir eventos.

Evitar lógica compleja.

---

# Mantenimiento

Toda modificación importante en un componente reutilizable deberá documentarse en este archivo.

Cambios pequeños podrán registrarse únicamente en el Changelog.

---

# Objetivo Final

El sistema de componentes constituye el núcleo del proyecto.

Mantener componentes pequeños, reutilizables y bien documentados permitirá que el proyecto crezca sin aumentar innecesariamente su complejidad.