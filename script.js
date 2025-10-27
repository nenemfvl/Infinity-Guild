// Smooth scroll para os links da navbar
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Remove active class de todos os links
        document.querySelectorAll('.nav-links a').forEach(l => {
            l.classList.remove('active');
        });
        
        // Adiciona active class ao link clicado
        link.classList.add('active');
        
        // Aqui você pode adicionar lógica de navegação no futuro
        console.log('Navegando para:', href);
    });
});

// Adiciona efeito de hover nos cards de jogos
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Adiciona interatividade aos botões de ação
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent;
        console.log('Botão clicado:', btnText);
        
        // Adiciona efeito de "ripple"
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Redireciona para o perfil se for o botão "Entrar na Guild"
        if (btnText === 'Entrar na Guild') {
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 100);
        }
    });
});

// Adiciona efeito de hover nas divisões
document.querySelectorAll('.division-item').forEach(item => {
    item.addEventListener('click', () => {
        const gameName = item.querySelector('.division-name').textContent;
        console.log('Divisão clicada:', gameName);
    });
});

// Animação de contagem para estatísticas
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
};

// Observa quando as estatísticas entram na viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                setTimeout(() => {
                    animateCounter(stat, target);
                }, index * 200);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.statistics-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Adiciona efeito parallax sutil no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Modal de Login e Registro
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const btnLogin = document.querySelector('.btn-login');
const btnRegister = document.querySelector('.btn-register');
const closeButtons = document.querySelectorAll('.close');

// Abrir modal de Login
btnLogin.addEventListener('click', () => {
    loginModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Abrir modal de Registro
btnRegister.addEventListener('click', () => {
    registerModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Fechar modais
closeButtons.forEach(close => {
    close.addEventListener('click', () => {
        loginModal.classList.remove('show');
        registerModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
});

// Fechar modal clicando fora dele
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Switch entre Login e Registro
document.getElementById('switchToRegister').addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('show');
    registerModal.classList.add('show');
});

document.getElementById('switchToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('show');
    loginModal.classList.add('show');
});

// Submit dos formulários
document.querySelector('#loginModal form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login:', { email, password });
    
    // Simula login e redireciona para o perfil
    alert('Login realizado com sucesso!');
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 500);
    
    // Aqui você pode adicionar a lógica de autenticação real
});

document.querySelector('#registerModal form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    console.log('Registro:', { name, email, password });
    alert('Registro em desenvolvimento!');
    // Aqui você pode adicionar a lógica de registro
});

// Adiciona classe ripple para animação
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .action-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

