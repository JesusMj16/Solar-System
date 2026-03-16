setTimeout(() => {

    // ── ORRERY ───────────────────────────────────────────────
    const escena     = new THREE.Scene()
    const contenedor = document.getElementById('orrery')
    const ancho      = contenedor.clientWidth
    const alto       = Math.min(ancho, 500)

    const camara   = new THREE.PerspectiveCamera(60, ancho / alto, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(ancho, alto)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    contenedor.appendChild(renderer.domElement)

    camara.position.set(0, 8, 18)
    camara.lookAt(0, 0, 0)

    const loader = new THREE.TextureLoader()

    const sol = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ map: loader.load('texturas/sol.jpg') })
    )
    escena.add(sol)

    const luzSol = new THREE.PointLight(0xffffff, 2, 50)
    escena.add(luzSol)

    const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.1)
    escena.add(luzAmbiental)

    const planetas = [
        { nombre: 'mercurio', textura: 'mercurio.jpg', radio: 0.15, orbita: 2.0,  velocidad: 0.020, segmentos: 16 },
        { nombre: 'venus',    textura: 'venus.jpg',    radio: 0.25, orbita: 2.8,  velocidad: 0.015, segmentos: 16 },
        { nombre: 'tierra',   textura: 'tierra.jpg',   radio: 0.28, orbita: 3.7,  velocidad: 0.010, segmentos: 16 },
        { nombre: 'marte',    textura: 'marte.jpg',    radio: 0.20, orbita: 4.6,  velocidad: 0.010, segmentos: 16 },
        { nombre: 'jupiter',  textura: 'jupiter.jpg',  radio: 0.65, orbita: 6.0,  velocidad: 0.008, segmentos: 32 },
        { nombre: 'saturno',  textura: 'saturno.jpg',  radio: 0.55, orbita: 7.5,  velocidad: 0.007, segmentos: 32 },
        { nombre: 'urano',    textura: 'urano.jpg',    radio: 0.40, orbita: 8.8,  velocidad: 0.006, segmentos: 16 },
        { nombre: 'neptuno',  textura: 'neptuno.jpg',  radio: 0.38, orbita: 10.0, velocidad: 0.005, segmentos: 16 }
    ]

    const meshes = planetas.map(p => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(p.radio, p.segmentos, p.segmentos),
            new THREE.MeshStandardMaterial({
                map: loader.load(`texturas/${p.textura}`),
                roughness: 0.8,
                metalness: 0.1
            })
        )
        escena.add(mesh)

        const puntos = []
        for (let i = 0; i <= 128; i++) {
            const angulo = (i / 128) * Math.PI * 2
            puntos.push(new THREE.Vector3(
                Math.cos(angulo) * p.orbita,
                0,
                Math.sin(angulo) * p.orbita
            ))
        }
        const orbita = new THREE.LineLoop(
            new THREE.BufferGeometry().setFromPoints(puntos),
            new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.15, transparent: true })
        )
        escena.add(orbita)

        return { mesh, angulo: Math.random() * Math.PI * 2, ...p }
    })

    window.addEventListener('resize', () => {
        const nuevoAncho = contenedor.clientWidth
        const nuevoAlto  = Math.min(nuevoAncho, 500)
        camara.aspect    = nuevoAncho / nuevoAlto
        camara.updateProjectionMatrix()
        renderer.setSize(nuevoAncho, nuevoAlto)
    })

    let ultimoTiempo = 0
    const FPS = 30
    let animId
    let activo = true

    function animar(tiempo) {
        if (!activo) return
        animId = requestAnimationFrame(animar)
        if (tiempo - ultimoTiempo < 1000 / FPS) return
        ultimoTiempo = tiempo

        sol.rotation.y += 0.002

        meshes.forEach(p => {
            p.angulo += p.velocidad
            p.mesh.position.x = Math.cos(p.angulo) * p.orbita
            p.mesh.position.z = Math.sin(p.angulo) * p.orbita
            p.mesh.rotation.y += 0.005
        })

        renderer.render(escena, camara)
    }

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            activo = true
            requestAnimationFrame(animar)
        } else {
            activo = false
            cancelAnimationFrame(animId)
        }
    })

    observer.observe(contenedor)
    requestAnimationFrame(animar)


    // ── PLANETA CTA ──────────────────────────────────────────
    const sceneCta    = new THREE.Scene()
    const cameraCta   = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    const rendererCta = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    rendererCta.setSize(200, 200)
    rendererCta.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    document.getElementById('planeta-cta').appendChild(rendererCta.domElement)

    cameraCta.position.set(0, 0, 3)

    const loaderCta  = new THREE.TextureLoader()
    const planetaCta = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshStandardMaterial({
            map: loaderCta.load('texturas/tierra.jpg'),
            roughness: 0.8,
            metalness: 0.1
        })
    )
    sceneCta.add(planetaCta)

    const luzCtaAmbiental = new THREE.AmbientLight(0xffffff, 0.2)
    sceneCta.add(luzCtaAmbiental)

    const luzCta = new THREE.PointLight(0xffffff, 2)
    luzCta.position.set(3, 3, 3)
    sceneCta.add(luzCta)

    let anguloCta = 0

    function animarCta() {
        requestAnimationFrame(animarCta)
        planetaCta.rotation.y += 0.003
        anguloCta += 0.01
        planetaCta.position.y = Math.sin(anguloCta) * 0.1
        rendererCta.render(sceneCta, cameraCta)
    }

    animarCta()

}, 0)