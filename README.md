# 🎮 Infinity Guild

Website oficial da Guild Infinity com sistema de autenticação completo.

## ✨ Funcionalidades

- ✅ Sistema de Login/Logout
- ✅ Registro de usuários
- ✅ Banco de dados SQLite
- ✅ Sessões seguras
- ✅ Dashboard de perfil
- ✅ Sistema de trade
- ✅ Totalmente responsivo

## 📁 Estrutura do Projeto

```
CampBlox/
├── server.js          # Servidor backend
├── package.json        # Dependências
├── public/            # Arquivos frontend
│   ├── index.html     # Homepage
│   ├── profile.html   # Dashboard
│   ├── trade.html     # Sistema de trade
│   ├── *.css          # Estilos
│   └── *.js           # JavaScript
└── guild.db          # Banco de dados (gerado automaticamente)
```

## 🚀 Como Iniciar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar Servidor

```bash
npm start
```

### 3. Acessar o Site

Abra seu navegador em: **http://localhost:3000**

## 📦 Dependências

- **Express** - Servidor web
- **SQLite3** - Banco de dados
- **bcryptjs** - Hash de senhas
- **express-session** - Gerenciamento de sessões

## 🎯 Endpoints da API

### Autenticação

- `POST /api/register` - Registro de usuários
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/check-session` - Verificar sessão
- `GET /api/user` - Obter dados do usuário (protegido)

## 🗄️ Tabelas do Banco de Dados

- **users** - Usuários
- **user_sessions** - Sessões ativas
- **trades** - Listagens de trade
- **events** - Eventos da guild
- **games** - Jogos cadastrados

## 🌐 Deploy

### Railway

O projeto está configurado para o Railway:

```bash
npm install
npm start
```

Railway detectará automaticamente o `railway.toml` e fará o deploy.

### Vercel (Alternativa)

Para Vercel, você precisará de um servidor separado ou usar Railway para o backend.

## 🎨 Páginas

- **Homepage** (`/`) - Landing page com login
- **Profile** (`/profile.html`) - Dashboard do membro
- **Trade** (`/trade.html`) - Sistema de trocas

## 🔐 Segurança

- Senhas são hasheadas com bcrypt
- Sessões seguras com httpOnly cookies
- Validação de dados no servidor
- Proteção CSRF

## 📝 Próximos Passos

- [ ] Integração com blockchain
- [ ] Sistema de NFTs
- [ ] Chat em tempo real
- [ ] API de eventos
- [ ] Dashboard de admin
- [ ] Sistema de notificações push

## 📄 Licença

MIT License

---

**Desenvolvido com ❤️ para a Infinity Guild**
