# 🎮 Infinity Guild

Website oficial da Guild Infinity - Uma comunidade global de gamers unida por uma missão: dominar todos os mundos digitais.

## 🚀 Demonstração

- **Homepage**: Landing page com informações da guild
- **Profile**: Dashboard de perfil do membro
- **Trade**: Sistema de trocas e NFTs

## 📁 Estrutura do Projeto

```
CampBlox/
├── index.html          # Homepage
├── profile.html        # Página de perfil
├── trade.html          # Página de trocas
├── styles.css          # Estilos da homepage
├── profile.css         # Estilos do perfil
├── trade.css           # Estilos de trade
├── script.js           # JavaScript da homepage
├── profile.js          # JavaScript do perfil
├── trade.js            # JavaScript de trade
├── vercel.json         # Configuração Vercel
├── railway.toml        # Configuração Railway
└── package.json        # Dependências
```

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- Designs responsivos

## 📦 Instalação Local

```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev
# ou
npm start

# Acesse http://localhost:3000
```

## 🌐 Deploy

### Vercel (Recomendado)

1. **Instale a CLI do Vercel** (opcional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**
   ```bash
   vercel
   ```

3. **Deploy via GitHub**
   - Faça push do código para o GitHub
   - Acesse [vercel.com](https://vercel.com)
   - Importe o repositório
   - Vercel detectará automaticamente a configuração

4. **Configuração Manual**
   - Framework Preset: Other
   - Build Command: (deixe em branco)
   - Output Directory: `.`
   - Install Command: (opcional)

### Railway

1. **Instale a CLI do Railway**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Deploy**
   ```bash
   railway init
   railway up
   ```

4. **Deploy via GitHub**
   - Faça push do código para o GitHub
   - Acesse [railway.app](https://railway.app)
   - New Project → Deploy from GitHub
   - Selecione o repositório
   - Railway usará automaticamente a configuração do `railway.toml`

### Netlify (Alternativa)

1. **Deploy via CLI**
   ```bash
   npm i -g netlify-cli
   netlify deploy
   ```

2. **Deploy via GitHub**
   - Acesse [netlify.com](https://netlify.com)
   - New site from Git
   - Conecte o GitHub
   - Build command: (deixe em branco)
   - Publish directory: `.`

## 🎨 Páginas Disponíveis

### Homepage (`index.html`)
- Hero section com símbolo de infinito
- Cards de jogos
- Estatísticas da guild
- Divisões e membros

### Profile (`profile.html`)
- Dashboard do membro
- Próximos eventos
- Tabela de jogos do membro
- Sidebar de navegação

### Trade (`trade.html`)
- Listagens de trocas
- Sistema de compra
- Formulário de criação
- Painel administrativo

## 🎯 Funcionalidades

- ✅ Design moderno e dark theme
- ✅ Totalmente responsivo
- ✅ Animações suaves
- ✅ Modal de login/registro
- ✅ Navegação integrada
- ✅ Sistema de filtros
- ✅ Tabelas interativas

## 📱 Responsividade

O site é otimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1200px+)
- 🖥️ Large Desktop (1400px+)

## 🔧 Personalização

### Cores

Edite as variáveis CSS em cada arquivo `.css`:

```css
:root {
    --accent-purple: #8b5cf6;
    --accent-blue: #00d4ff;
    /* ... */
}
```

### Conteúdo

Edite os arquivos HTML para personalizar textos, imagens e links.

## 📊 Divisões da Guild

- **Raven 2** - 272 membros ativos
- **Legend of Ymir** - 251 membros ativos
- **Albion Online** - 176 membros ativos
- **Guild Wars 2** - 6 membros ativos
- **Mir4** - 87 membros ativos

## 🚧 Próximas Funcionalidades

- [ ] Sistema de autenticação completo
- [ ] Integração com blockchain
- [ ] Sistema de NFTs
- [ ] API para eventos
- [ ] Chat em tempo real
- [ ] Sistema de notificações
- [ ] Dashboard de estatísticas

## 📝 Licença

MIT License - Livre para uso e modificação

## 👥 Desenvolvedor

Desenvolvido com ❤️ para a Infinity Guild

---

**Link de Deploy**: Será gerado após o deploy no Vercel/Railway
