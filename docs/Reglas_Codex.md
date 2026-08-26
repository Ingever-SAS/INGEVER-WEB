# Reglas para Codex

# Introducción

Este documento define las reglas que todo asistente de inteligencia artificial (Codex, Cursor, Claude Code, Gemini CLI, GitHub Copilot, etc.) debe seguir al trabajar sobre el proyecto de Ingever Asociados S.A.S.

Estas reglas tienen prioridad sobre cualquier sugerencia automática de la IA.

El objetivo es garantizar que el proyecto mantenga una arquitectura consistente, un código limpio y una experiencia de desarrollo predecible.

---

# Objetivo Principal

La IA debe actuar como un desarrollador senior que continúa un proyecto existente.

No debe asumir que el proyecto comienza desde cero.

Antes de modificar cualquier archivo debe comprender la arquitectura existente.

---

# Filosofía del Proyecto

Este proyecto prioriza:

- Modularidad.
- Escalabilidad.
- Reutilización.
- Código limpio.
- Bajo acoplamiento.
- Alta cohesión.
- Mantenibilidad.

Toda propuesta debe respetar estos principios.

---

# Antes de Escribir Código

Antes de crear cualquier archivo nuevo, la IA deberá responder internamente las siguientes preguntas:

- ¿Ya existe un componente similar?
- ¿Puedo reutilizar uno existente?
- ¿Estoy rompiendo la arquitectura?
- ¿Estoy duplicando lógica?
- ¿La funcionalidad pertenece realmente a esta carpeta?

Si cualquiera de estas respuestas genera dudas, deberá proponerse una alternativa antes de crear código nuevo.

---

# Componentes

Los componentes deben ser:

Pequeños.

Reutilizables.

Independientes.

Fáciles de probar.

No crear componentes de cientos de líneas.

Cuando un componente tenga múltiples responsabilidades deberá dividirse.

---

# Organización

La estructura del proyecto deberá respetarse siempre.

```
src/

assets/

components/

pages/

sections/

data/

config/

styles/

utils/
```

Nunca mover archivos sin una justificación técnica.

---

# Pages

Las páginas únicamente organizan contenido.

No deben contener:

- Componentes grandes.
- Datos escritos manualmente.
- Estilos repetidos.
- Lógica innecesaria.

---

# Sections

Las secciones representan bloques completos de una página.

No deben reutilizar lógica perteneciente a otras secciones.

Cada una debe mantener una única responsabilidad.

---

# Components

Todo componente deberá ser reutilizable.

No crear componentes únicamente para resolver un caso extremadamente específico.

---

# UI

Todo elemento visual reutilizable deberá vivir en:

```
components/ui/
```

Ejemplos:

Button

Input

Container

SectionTitle

Badge

Modal

---

# Cards

Todas las tarjetas deberán almacenarse en:

```
components/cards/
```

Manteniendo un diseño consistente.

---

# Datos

Nunca escribir información directamente dentro de un componente.

Incorrecto

```jsx
<h1>20 años</h1>
```

Correcto

```jsx
<h1>{company.yearsExperience}</h1>
```

Toda información deberá obtenerse desde:

```
src/data/
```

---

# Estilos

Utilizar exclusivamente Tailwind CSS para la mayoría de los estilos.

Crear archivos CSS únicamente cuando exista una razón clara.

Evitar estilos inline.

---

# React

Utilizar siempre componentes funcionales.

No utilizar componentes de clase.

Priorizar hooks oficiales de React.

---

# Props

Utilizar props para transmitir información.

Evitar dependencias ocultas.

Evitar estados innecesarios.

---

# Estado

Mantener el estado lo más cerca posible de quien realmente lo necesita.

No elevar estado sin una razón técnica.

---

# React Router

App.jsx administra las rutas.

No agregar lógica visual dentro de App.jsx.

Las páginas pertenecen a:

```
src/pages/
```

---

# Nombres

Componentes

PascalCase

```
Hero.jsx

ProjectCard.jsx

ContactPage.jsx
```

Funciones

camelCase

```
handleSubmit()

openMenu()

closeModal()
```

Constantes

MAYÚSCULAS

```
MAX_FILE_SIZE

API_URL

DEFAULT_LANGUAGE
```

---

# Imports

Orden recomendado

1 React

2 Librerías

3 Componentes

4 Hooks

5 Data

6 Assets

7 CSS

Mantener el mismo orden en todos los archivos.

---

# Comentarios

No comentar código evidente.

Comentar únicamente decisiones importantes.

Evitar comentarios innecesarios.

---

# Dependencias

No instalar nuevas librerías sin justificar claramente:

- qué problema resuelven,
- por qué son necesarias,
- y cuál será su impacto en el proyecto.

Siempre que sea posible, reutilizar las dependencias ya existentes.

---

# Git

Cuando una tarea esté finalizada, sugerir un commit claro.

Ejemplo

```
feat: add responsive navbar

fix: improve contact form validation

refactor: simplify service cards

docs: update architecture documentation
```

No proponer commits genéricos.

---

# Calidad del Código

Antes de considerar una tarea finalizada, verificar:

- Código legible.
- Componentes reutilizables.
- Sin duplicación.
- Sin imports innecesarios.
- Sin variables sin usar.
- Sin estilos repetidos.
- Sin lógica duplicada.
- Responsive.
- Accesible.

---

# Qué Nunca Debe Hacer la IA

Nunca romper la arquitectura.

Nunca mover archivos sin autorización.

Nunca eliminar componentes reutilizables.

Nunca duplicar código existente.

Nunca cambiar colores corporativos sin aprobación.

Nunca instalar librerías innecesarias.

Nunca mezclar responsabilidades.

Nunca modificar múltiples módulos críticos en una sola tarea.

Nunca eliminar documentación existente.

---

# Flujo de Trabajo Esperado

Para cada nueva funcionalidad:

1. Analizar la solicitud.
2. Revisar la arquitectura existente.
3. Identificar componentes reutilizables.
4. Diseñar la solución.
5. Implementar cambios mínimos.
6. Verificar funcionamiento.
7. Actualizar documentación si aplica.
8. Sugerir un commit descriptivo.

---

# Objetivo Final

La IA debe comportarse como un miembro más del equipo de desarrollo, respetando la arquitectura, las convenciones y las decisiones previamente establecidas.

Su prioridad no es escribir la mayor cantidad de código posible, sino mantener un proyecto limpio, consistente y preparado para crecer durante muchos años.