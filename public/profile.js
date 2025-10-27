// Navegação da sidebar
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // Remove active de todos os items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Adiciona active ao item clicado (exceto logout)
        if (!item.classList.contains('logout')) {
            item.classList.add('active');
        }
        
        // Aqui você pode adicionar navegação futura
        const navText = item.querySelector('span')?.textContent || '';
        console.log('Navegando para:', navText);
    });
});

// Notification icon click
document.querySelector('.notification-icon').addEventListener('click', () => {
    console.log('Notificações clicadas');
    // Aqui você pode adicionar lógica de notificações
});

// Avatar click
document.querySelector('.user-avatar').addEventListener('click', () => {
    console.log('Perfil clicado');
    // Aqui você pode adicionar dropdown de perfil
});

// Event cards interaction
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
        const eventTitle = card.querySelector('.event-title').textContent;
        console.log('Evento clicado:', eventTitle);
        // Aqui você pode adicionar navegação para detalhes do evento
    });
});

// Table rows interaction
document.querySelectorAll('.table-row').forEach(row => {
    row.addEventListener('click', () => {
        const gameName = row.querySelector('.game-name').textContent;
        console.log('Jogo clicado:', gameName);
        // Aqui você pode adicionar navegação para detalhes do jogo
    });
});

// Add hover effects
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('active')) {
            item.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        if (!item.classList.contains('active')) {
            item.style.backgroundColor = 'transparent';
        }
    });
});

// Smooth scroll para sidebar
const sidebar = document.querySelector('.sidebar');
if (sidebar) {
    sidebar.style.scrollBehavior = 'smooth';
}

// Auto-hide notification badge (opcional)
setTimeout(() => {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.animation = 'fadeOut 0.5s ease-out forwards';
    }
}, 5000);

// Adiciona animação de fade out
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .table-row {
        cursor: pointer;
    }
    
    .event-card {
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Verificar sessão
async function checkSession() {
    try {
        const response = await fetch('/api/check-session');
        const data = await response.json();
        
        if (data.authenticated) {
            console.log('Usuário autenticado:', data.user);
            // Você pode personalizar a UI aqui
        } else {
            // Redireciona para login se não estiver autenticado
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Erro ao verificar sessão:', error);
    }
}

// Logout
document.querySelector('.nav-item.logout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (confirm('Deseja realmente sair?')) {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Logout realizado com sucesso!');
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            // Mesmo assim redireciona
            window.location.href = 'index.html';
        }
    }
});

// Verificar sessão ao carregar a página
checkSession();

