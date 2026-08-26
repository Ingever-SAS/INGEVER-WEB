# Design System

# Introducción

El Design System de Ingever Asociados S.A.S. establece las reglas visuales y de interacción que deberán seguir todos los componentes, páginas y futuras funcionalidades del proyecto.

Su objetivo principal es mantener una experiencia consistente, profesional y escalable.

Todas las nuevas interfaces deberán respetar las reglas definidas en este documento.

---

# Filosofía Visual

La identidad visual del sitio debe transmitir:

- Profesionalismo
- Ingeniería
- Confianza
- Seguridad
- Precisión
- Innovación
- Calidad

La interfaz debe sentirse limpia y moderna.

Nunca debe parecer sobrecargada.

---

# Identidad

La empresa pertenece al sector industrial.

Por esa razón el diseño debe transmitir:

Solidez.

Experiencia.

Tecnología.

Ingeniería.

No debe parecer una página de entretenimiento.

---

# Paleta de Colores

## Color Primario

Amarillo Corporativo

HEX

#F5C518

Uso:

- Botones principales
- Iconos destacados
- Detalles importantes
- Hover de enlaces
- Elementos activos

---

## Color Secundario

Negro Corporativo

HEX

#1A1A1A

Uso:

- Navbar
- Footer
- Títulos
- Fondos oscuros

---

## Fondo Principal

HEX

#FFFFFF

---

## Fondo Secundario

HEX

#F8F9FA

Uso:

Secciones alternas.

---

## Texto Principal

HEX

#222222

---

## Texto Secundario

HEX

#666666

---

## Bordes

HEX

#E5E5E5

---

## Color de Éxito

HEX

#22C55E

---

## Advertencia

HEX

#F59E0B

---

## Error

HEX

#EF4444

---

# Tipografía

Fuente Principal

Montserrat

Pesos recomendados

300

400

500

600

700

No utilizar más de cinco pesos diferentes.

---

# Tamaños

H1

48 px

Desktop

36 px

Tablet

30 px

Mobile

---

H2

36 px

Desktop

30 px

Tablet

24 px

Mobile

---

H3

28 px

Desktop

24 px

Tablet

20 px

Mobile

---

Texto

18 px

Desktop

16 px

Tablet

16 px

Mobile

---

Texto pequeño

14 px

---

# Espaciado

Sistema base

8 px

Todo el proyecto deberá utilizar múltiplos de ocho.

Ejemplos

8

16

24

32

40

48

64

80

96

128

Evitar medidas aleatorias.

---

# Bordes

Inputs

12 px

Botones

12 px

Cards

16 px

Imágenes

16 px

---

# Sombras

Las sombras deben ser suaves.

Nunca exageradas.

Ejemplo

shadow-md

shadow-lg

No utilizar sombras extremadamente oscuras.

---

# Botones

Existen tres tipos.

## Primario

Color

Amarillo

Texto negro

Acción principal.

---

## Secundario

Fondo negro

Texto blanco

---

## Outline

Fondo transparente

Borde amarillo

Texto amarillo

---

# Estados

Todos los botones deberán tener

Hover

Focus

Disabled

Loading

Active

---

# Inputs

Todos los formularios deberán utilizar el mismo componente Input.

No crear inputs manualmente.

Todos deberán incluir

Label

Placeholder

Focus

Validación

Mensaje de error

---

# Cards

Todas las tarjetas compartirán:

Padding uniforme.

Bordes redondeados.

Sombra ligera.

Hover.

Animación.

---

# Iconografía

Se recomienda utilizar únicamente una librería.

Ejemplo

Lucide React

o

Heroicons

No mezclar múltiples librerías.

---

# Imágenes

Todas las imágenes deberán:

Mantener buena resolución.

Optimizarse antes del despliegue.

Utilizar lazy loading cuando sea posible.

Mantener la misma proporción dentro de una sección.

---

# Animaciones

Las animaciones deben ser discretas.

Duración recomendada

200 ms

300 ms

500 ms

Nunca utilizar animaciones largas.

---

# Responsive

El diseño debe adaptarse correctamente a:

Desktop

Laptop

Tablet

Mobile

No se desarrollarán versiones independientes.

Se utilizará Responsive Design.

---

# Accesibilidad

Todos los botones deben ser accesibles mediante teclado.

Las imágenes deberán incluir alt.

Los formularios deberán utilizar labels.

Mantener suficiente contraste entre texto y fondo.

---

# Consistencia

Nunca crear estilos diferentes para componentes que cumplen la misma función.

Si existe un Button reutilizable, deberá utilizarse siempre.

Si existe un Input reutilizable, deberá utilizarse siempre.

El objetivo del Design System es reducir la duplicación visual.

---

# Evolución

Todo cambio importante en colores, tipografía o componentes deberá actualizar este documento antes de implementarse en el proyecto.

El Design System es considerado una parte fundamental de la arquitectura y debe mantenerse sincronizado con el código fuente.