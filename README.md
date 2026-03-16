# COSMOS — Sistema Solar Interactivo

Una experiencia visual inmersiva del Sistema Solar construida con HTML, CSS y JavaScript puro, sin frameworks.

## Vista previa

> Ocho planetas. Miles de millones de kilómetros. Una sola estrella que lo sostiene todo.

## Tecnologías

- **HTML5** semántico con atributos de accesibilidad
- **CSS3** — animaciones, grid, flexbox, efectos 3D y glass morphism
- **JavaScript vanilla** — sin dependencias excepto Three.js
- **Three.js r128** — orrery 3D con texturas reales

## Características

- Fondo de estrellas animado generado proceduralmente con `box-shadow`
- Orrery 3D interactivo con los 8 planetas orbitando en tiempo real
- Texturas reales de planetas de [Solar System Scope](https://www.solarsystemscope.com/textures/)
- Navbar con efecto liquid glass usando filtros SVG
- Cards de planetas con efecto flip 3D al hacer hover
- Comparativa de tamaños del sistema solar
- Contadores animados que se activan al hacer scroll
- Animaciones de entrada con `IntersectionObserver`
- Diseño responsive con menú hamburguesa para mobile
- Optimizado: límite de FPS, pausa por visibilidad, `devicePixelRatio` controlado

## Estructura

```
cosmos/
├── index.html
├── styles.css
├── main.js          # Estrellas, contadores, navbar
├── orrery.js        # Three.js — sistema solar y planeta CTA
└── texturas/
    ├── sol.jpg
    ├── mercurio.jpg
    ├── venus.jpg
    ├── tierra.jpg
    ├── marte.jpg
    ├── jupiter.jpg
    ├── saturno.jpg
    ├── urano.jpg
    └── neptuno.jpg
```

## Instalación

```bash
git clone https://github.com/tu-usuario/cosmos
cd cosmos
```

Las texturas no cargan con `file://` — necesitas un servidor local.

## Créditos

- Texturas planetarias: [Solar System Scope](https://www.solarsystemscope.com/textures/)
- Fuente: Kola Regular
- Motor 3D: [Three.js](https://threejs.org/)