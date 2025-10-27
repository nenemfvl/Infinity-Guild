// Navegação
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active de todos os links
        document.querySelectorAll('.nav-links a').forEach(l => {
            l.classList.remove('active');
        });
        
        // Adiciona active ao link clicado
        if (!link.href.includes('#') && !link.getAttribute('href').startsWith('#')) {
            link.classList.add('active');
        }
    });
});

// Connect button
document.querySelector('.btn-connect').addEventListener('click', () => {
    console.log('Connect wallet clicked');
    alert('Conectar carteira em desenvolvimento!');
});

// Filter dropdown
document.querySelector('.filter-select').addEventListener('change', (e) => {
    const selectedGame = e.target.value;
    console.log('Game selected:', selectedGame);
    
    // Aqui você pode adicionar lógica de filtro
    if (selectedGame) {
        filterTableByGame(selectedGame);
    }
});

function filterTableByGame(game) {
    const rows = document.querySelectorAll('.table-row');
    rows.forEach(row => {
        const gameName = row.querySelector('.game-name').textContent.toLowerCase();
        const gameKey = game.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
        
        if (game && gameName.includes(gameKey)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// BUY buttons
document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('.table-row');
        const gameName = row.querySelector('.game-name').textContent;
        const amount = row.querySelectorAll('.table-cell')[2].textContent;
        
        console.log('Buy clicked:', { gameName, amount });
        
        // Adiciona efeito de ripple
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Aqui você pode adicionar lógica de compra
        // Por exemplo, abrir um modal de confirmação
        handleBuyAction(gameName, amount);
    });
});

function handleBuyAction(gameName, amount) {
    // Aqui você pode abrir um modal de confirmação
    const confirmed = confirm(`Comprar ${amount} tokens de ${gameName}?`);
    if (confirmed) {
        console.log('Compra confirmada');
        // Adicionar lógica de compra
    }
}

// Create Trade Form
document.querySelector('.trade-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const game = document.querySelector('.create-trade select').value;
    const token = document.querySelectorAll('.create-trade select')[1].value;
    const amount = document.querySelector('.create-trade input[type="number"]').value;
    const notes = document.querySelector('.create-trade textarea').value;
    
    if (!game || !token || !amount) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    
    console.log('Creating trade:', { game, token, amount, notes });
    
    // Adiciona animação de loading
    const btn = document.querySelector('.btn-create');
    const originalText = btn.textContent;
    btn.textContent = 'CREATING...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('Trade criado com sucesso!');
        
        // Reset form
        e.target.reset();
        
        // Aqui você pode adicionar a lógica para adicionar o novo trade à tabela
    }, 2000);
});

// Table rows interaction
document.querySelectorAll('.table-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.cursor = 'pointer';
    });
    
    row.addEventListener('click', (e) => {
        // Não faz nada se clicar no botão BUY
        if (e.target.classList.contains('btn-buy')) {
            return;
        }
        
        const gameName = row.querySelector('.game-name').textContent;
        console.log('Row clicked:', gameName);
        // Aqui você pode adicionar navegação para detalhes
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach((stat, index) => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target, index * 200);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const adminPanel = document.querySelector('.admin-panel');
if (adminPanel) {
    observer.observe(adminPanel);
}

function animateCounter(element, target, delay = 0) {
    setTimeout(() => {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    }, delay);
}

