# Páginas

# Introducción

Las páginas representan el nivel más alto de la interfaz de usuario.

Cada página corresponde a una ruta del sitio y se encarga de organizar las secciones y componentes necesarios para cumplir un objetivo específico.

Las páginas no deben contener componentes reutilizables definidos manualmente si estos ya existen en la carpeta `components`.

Su responsabilidad principal es ensamblar la interfaz y coordinar el flujo de navegación.

---

# Estructura Actual

Actualmente el proyecto cuenta con tres páginas principales.

```
src/
└── pages/
    ├── Home.jsx
    ├── ContactPage.jsx
    └── JoinTeamPage.jsx
```

Cada una tiene un propósito claramente definido.

---

# Home.jsx

## Descripción

Es la página principal del sitio web.

Corresponde a la ruta:

```
/
```

Es la primera experiencia que tiene el usuario con la empresa.

Debe comunicar confianza, experiencia y profesionalismo.

---

## Responsabilidad

Home únicamente organiza las diferentes secciones del sitio.

No debe contener lógica compleja.

No debe almacenar datos.

No debe implementar estilos específicos que pertenezcan a una sección.

---

## Orden de las Secciones

Actualmente Home está compuesta por:

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

Este orden debe mantenerse salvo que exista una razón funcional para modificarlo.

---

## JoinTeam

La sección JoinTeam puede activarse o eliminarse únicamente agregando o quitando:

```jsx
<JoinTeam />
```

No debe controlarse desde App.jsx.

---

## Buenas prácticas

Home debe mantenerse limpio.

Idealmente no debería superar unas pocas decenas de líneas de código.

Toda lógica pertenece a las secciones o componentes.

---

# ContactPage.jsx

## Ruta

```
/contacto
```

---

## Objetivo

Permitir que un cliente potencial solicite una cotización.

Esta página está dirigida exclusivamente a clientes.

No debe utilizarse para procesos de selección de personal.

---

## Funcionalidad

El formulario permite recopilar información relevante sobre el proyecto del cliente.

Campos previstos:

- Nombre
- Empresa
- Correo electrónico
- Teléfono
- Tipo de servicio
- Descripción del proyecto
- Archivo adjunto

Al enviar correctamente la información, se muestra una pantalla de confirmación.

---

## Flujo del Usuario

```
Usuario

↓

Abre formulario

↓

Completa información

↓

Adjunta archivo (opcional)

↓

Envía solicitud

↓

Visualiza mensaje de éxito
```

---

## Responsabilidades

La página organiza el formulario.

Las validaciones deberán implementarse utilizando componentes reutilizables.

---

# JoinTeamPage.jsx

## Ruta

```
/trabaja-con-nosotros
```

---

## Objetivo

Permitir que personas interesadas envíen su hoja de vida.

Está completamente separada del formulario de cotizaciones.

---

## Campos

Actualmente contempla:

- Nombre
- Cargo al que aspira
- Correo electrónico
- Teléfono
- Área de interés
- Experiencia o descripción personal
- Hoja de vida en formato PDF

---

## Flujo del Usuario

```
Aspirante

↓

Completa formulario

↓

Adjunta hoja de vida

↓

Envía información

↓

Recibe confirmación
```

---

## Pantalla de éxito

Después del envío exitoso se muestra un mensaje indicando que la postulación fue recibida.

Esta confirmación debe ser diferente a la utilizada en ContactPage para evitar confusiones.

---

# Navegación

La navegación entre páginas se realiza mediante React Router.

Actualmente existen las siguientes rutas:

| Ruta | Página |
|------|---------|
| / | Home |
| /contacto | ContactPage |
| /trabaja-con-nosotros | JoinTeamPage |

---

# Relación entre Páginas y Componentes

```
App.jsx

↓

React Router

↓

Pages

↓

Sections

↓

Components

↓

UI
```

Las páginas no deben depender directamente unas de otras.

Toda comunicación debe realizarse mediante navegación o compartiendo componentes.

---

# Futuras Páginas

La arquitectura permite incorporar nuevas páginas sin modificar las existentes.

Ejemplos:

- Nosotros
- Servicios
- Proyectos
- Blog
- Noticias
- Clientes
- Preguntas Frecuentes
- Política de Privacidad
- Términos y Condiciones

Cada nueva página deberá seguir la misma estructura y convenciones establecidas en este documento.

---

# Reglas

- Cada página representa una única responsabilidad.
- Evitar lógica compleja dentro de las páginas.
- Reutilizar secciones y componentes existentes.
- Mantener la navegación coherente.
- Toda nueva página debe documentarse antes de su implementación.

---

# Objetivo Final

Las páginas constituyen el punto de entrada para el usuario y deben actuar como organizadores de la interfaz, delegando la lógica y la presentación a las secciones y componentes correspondientes.