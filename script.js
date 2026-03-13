/**
 * JS for Minimalist Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Hero Animations
    // Agrega la clase 'appear' a los elementos del hero para animación de entrada
    const heroElements = document.querySelectorAll('.fade-in');
    setTimeout(() => {
        heroElements.forEach(el => {
            el.classList.add('appear');
        });
    }, 100);

    // 2. Navbar Scroll Effect
    // Añade sombra si hacemos scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    // Detecta cuando los elementos entran en pantalla para animarlos
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: Descomentar linea abajo si queremos que solo se anime una vez
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Se dispara cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Dispara un poco antes de llegar abajo
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevenir scroll cuando el menú está abierto
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar el menú al hacer clic en un enlace
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 5. Modal Logic para Casos de Éxito
    const modal = document.getElementById('metricsModal');
    const modalContainer = document.getElementById('modalImageContainer');
    const closeBtn = document.getElementById('closeModal');
    const caseCards = document.querySelectorAll('.case-card[data-image]');

    if (modal && closeBtn && modalContainer) {
        // Abrir modal al hacer clic en una tarjeta
        caseCards.forEach(card => {
            card.addEventListener('click', () => {
                const imageNamesStr = card.getAttribute('data-image');
                const captionsStr = card.getAttribute('data-captions');

                if (imageNamesStr) {
                    // Limpiar el contenedor de imágenes previas
                    modalContainer.innerHTML = '';

                    // Separar los nombres por coma y descripciones por |
                    const imageNames = imageNamesStr.split(',');
                    const captions = captionsStr ? captionsStr.split('|') : [];

                    // Crear e inyectar cada imagen y su descripción en el modal
                    imageNames.forEach((imgName, index) => {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'modal-img-wrapper';

                        const img = document.createElement('img');
                        img.src = imgName.trim();
                        img.alt = 'Captura de Ads Manager';
                        wrapper.appendChild(img);

                        if (captions[index] && captions[index].trim() !== '') {
                            const p = document.createElement('p');
                            p.className = 'modal-caption';
                            p.textContent = captions[index].trim();
                            wrapper.appendChild(p);
                        }

                        modalContainer.appendChild(wrapper);
                    });

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
                }
            });
        });

        // Cerrar modal al hacer clic en la X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Cerrar modal al hacer clic fuera de la imagen (en el fondo oscuro)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

});
