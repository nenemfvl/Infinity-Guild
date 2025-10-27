const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: 'infinity-guild-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Use true com HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Database setup
const db = new sqlite3.Database('./guild.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        initDatabase();
    }
});

// Initialize database tables
function initDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Sessions table
        db.run(`CREATE TABLE IF NOT EXISTS user_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            session_id TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);

        // Trades table
        db.run(`CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game TEXT NOT NULL,
            token TEXT NOT NULL,
            amount REAL NOT NULL,
            price REAL NOT NULL,
            user_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'active',
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);

        // Events table
        db.run(`CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            game TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Games table
        db.run(`CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            active_players INTEGER DEFAULT 0,
            upcoming_event TEXT,
            release_date TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, () => {
            // Insert default games if table is empty
            db.get('SELECT COUNT(*) as count FROM games', (err, row) => {
                if (row && row.count === 0) {
                    const games = [
                        ['Raven 2', 272, 'Dungeon Raid', 'Sept 2, 2023'],
                        ['Legend of Ymir', 251, 'Guild PvP', 'Jul 15, 2022'],
                        ['Albion Online', 176, '--', 'Oct 17, 2017'],
                        ['Guild Wars 2', 6, '--', 'Mar 28, 2012'],
                        ['Mir4', 87, '--', 'Oct 15, 2022']
                    ];
                    const stmt = db.prepare('INSERT INTO games (name, active_players, upcoming_event, release_date) VALUES (?, ?, ?, ?)');
                    games.forEach(game => stmt.run(game));
                    stmt.finalize();
                }
            });
        });
    });
}

// Serve static files
app.use(express.static(path.join(__dirname)));

// Check authentication middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/index.html');
    }
}

// API Routes

// Register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.status(400).json({ error: 'Usuário ou email já existe' });
                    }
                    return res.status(500).json({ error: 'Erro ao criar usuário' });
                }
                
                // Create session
                req.session.user = {
                    id: this.lastID,
                    username,
                    email
                };
                
                res.json({ 
                    success: true, 
                    message: 'Registro realizado com sucesso!',
                    user: { id: this.lastID, username, email }
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
        
        if (!user) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }
        
        try {
            const isValid = await bcrypt.compare(password, user.password);
            
            if (!isValid) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }
            
            // Create session
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            
            res.json({ 
                success: true,
                message: 'Login realizado com sucesso!',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    });
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao fazer logout' });
        }
        res.json({ success: true, message: 'Logout realizado com sucesso!' });
    });
});

// Check session
app.get('/api/check-session', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ 
            authenticated: true, 
            user: req.session.user 
        });
    } else {
        res.json({ authenticated: false });
    }
});

// Protected route - Get user info
app.get('/api/user', requireAuth, (req, res) => {
    res.json({ user: req.session.user });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conexão com banco de dados encerrada.');
        process.exit(0);
    });
});

