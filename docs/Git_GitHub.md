# Git y GitHub

# Introducción

Este documento define las reglas y el flujo de trabajo para el control de versiones del proyecto **Ingever Asociados S.A.S.**.

El objetivo es mantener un historial limpio, facilitar la colaboración y garantizar que cualquier cambio pueda rastrearse fácilmente.

---

# Objetivos

El flujo de Git debe permitir:

- Mantener un historial claro.
- Facilitar la recuperación de cambios.
- Evitar conflictos innecesarios.
- Automatizar el despliegue mediante Netlify.
- Documentar la evolución del proyecto.

---

# Repositorio

Repositorio oficial:

https://github.com/juangamersyt2005-ui/ingever-web-boceto

Todo el código fuente deberá mantenerse sincronizado con este repositorio.

---

# Rama Principal

Actualmente el proyecto utiliza la rama:

```
master
```

En el futuro podrá migrarse a:

```
main
```

si se considera conveniente.

---

# Flujo de Trabajo

El flujo recomendado es:

```
Planificar

↓

Desarrollar

↓

Probar

↓

Documentar

↓

git add

↓

git commit

↓

git push

↓

Netlify despliega automáticamente
```

Nunca realizar un `push` de código que no haya sido probado.

---

# Estado del Repositorio

Antes de comenzar una nueva tarea ejecutar:

```bash
git status
```

El resultado ideal es:

```
working tree clean
```

---

# Obtener Cambios

Antes de comenzar una jornada de trabajo:

```bash
git pull origin master
```

Esto evita trabajar sobre una versión desactualizada.

---

# Agregar Archivos

Agregar todos los cambios:

```bash
git add .
```

Agregar un archivo específico:

```bash
git add src/components/Button.jsx
```

---

# Commits

Cada commit debe representar una única unidad lógica de trabajo.

Evitar commits enormes.

---

# Convención de Commits

Utilizar Conventional Commits.

## Nuevas funcionalidades

```
feat:
```

Ejemplo

```
feat: add join team page
```

---

## Correcciones

```
fix:
```

Ejemplo

```
fix: correct navbar scroll behavior
```

---

## Refactorización

```
refactor:
```

Ejemplo

```
refactor: simplify services section
```

---

## Documentación

```
docs:
```

Ejemplo

```
docs: update architecture documentation
```

---

## Estilos

```
style:
```

Ejemplo

```
style: improve spacing in hero section
```

---

## Rendimiento

```
perf:
```

Ejemplo

```
perf: optimize project images
```

---

## Configuración

```
chore:
```

Ejemplo

```
chore: configure netlify redirects
```

---

# Push

Después de crear el commit:

```bash
git push origin master
```

Netlify iniciará automáticamente un nuevo despliegue.

---

# Frecuencia de Commits

Se recomienda realizar commits cuando:

- Se completa una funcionalidad.
- Se corrige un error.
- Se finaliza un componente importante.
- Se actualiza la documentación.

Evitar commits por cambios mínimos sin relación entre sí.

---

# Qué No Debe Hacerse

No realizar commits con mensajes como:

```
cambios

update

prueba

asd

nuevo

hola

final

último
```

Estos mensajes no aportan información.

---

# Buen Ejemplo

```
feat: add responsive mobile menu

fix: improve contact form validation

docs: document routing architecture

refactor: split hero section into reusable components
```

---

# Archivos a Ignorar

Git no debe versionar:

```
node_modules/

dist/

.env

.env.local

.DS_Store
```

Estos elementos deberán permanecer en `.gitignore`.

---

# Recuperación de Cambios

Consultar historial:

```bash
git log
```

Consultar diferencias:

```bash
git diff
```

Consultar estado:

```bash
git status
```

---

# Trabajo con VS Code

El flujo recomendado es:

1. Abrir el proyecto.
2. Actualizar con `git pull`.
3. Desarrollar.
4. Probar la aplicación.
5. Revisar cambios en el panel Source Control.
6. Crear un commit descriptivo.
7. Hacer `git push`.
8. Verificar el despliegue en Netlify.

---

# Relación con Netlify

Cada `push` a la rama principal inicia automáticamente un nuevo despliegue.

Flujo:

```
VS Code

↓

Git

↓

GitHub

↓

Netlify

↓

Sitio actualizado
```

No es necesario subir archivos manualmente al servidor.

---

# Documentación

Toda modificación importante deberá reflejarse también en la carpeta `docs/`.

La documentación forma parte del proyecto y debe mantenerse sincronizada con el código.

---

# Objetivo Final

Git no es únicamente una herramienta para subir código.

Es el registro histórico del proyecto.

Cada commit debe contar una parte de la evolución del sitio web y permitir comprender qué cambió, por qué cambió y cuándo cambió.