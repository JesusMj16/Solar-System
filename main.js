const generarEstrellas = (cantidad, spread, opacity) => {
    let sombras = ''
    for (let i = 0; i < cantidad; i++) {
        const x = Math.floor(Math.random() * innerWidth)
        const y = Math.floor(Math.random() * (innerHeight + 90))
        sombras += `${x}px ${y}px 0 ${spread}px rgba(255,255,255,${opacity})`
        if (i < cantidad - 1) sombras += ','
    }
    return sombras
}

const sm = document.querySelector('.stars__layer--sm')
const md = document.querySelector('.stars__layer--md')
const lg = document.querySelector('.stars__layer--lg')

sm.style.boxShadow = generarEstrellas(300, 0.2, 0.3)
md.style.boxShadow = generarEstrellas(180, 0.4, 0.6)
lg.style.boxShadow = generarEstrellas(80,  0.6, 1.0)

function animarContador(elemento, objetivo, duracion) {
    let inicio = 0
    const incremento = objetivo / (duracion / 16)
    const actualizar = () => {
        inicio += incremento
        if (inicio >= objetivo) {
            elemento.textContent = objetivo.toLocaleString()
            return
        }
        elemento.textContent = Math.floor(inicio).toLocaleString()
        requestAnimationFrame(actualizar)
    }
    requestAnimationFrame(actualizar)
}

const contadores = document.querySelectorAll('.data-card__num')
const observerContadores = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target
            const objetivo = parseInt(el.dataset.target)
            animarContador(el, objetivo, 2000)
            observerContadores.unobserve(el)
        }
    })
})
contadores.forEach(c => observerContadores.observe(c))

const toggle = document.getElementById('nav-toggle')
const links  = document.getElementById('nav-links')

toggle.addEventListener('click', () => {
    toggle.classList.toggle('abierto')
    links.classList.toggle('abierto')
})

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('abierto')
        links.classList.remove('abierto')
    })
})
