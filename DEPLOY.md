# 🚀 Guia de Deploy - Infinity Guild

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no [Vercel](https://vercel.com) ou [Railway](https://railway.app)

---

## 🌐 Deploy no Vercel (Recomendado)

### Opção 1: Via Interface Web (Mais Fácil)

1. **Faça push do código para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```

2. **Acesse o Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "Add New Project"

3. **Importe o repositório**
   - Selecione seu repositório
   - Clique em "Import"

4. **Configure o projeto**
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: *(deixe em branco)*
   - Output Directory: `./`
   - Install Command: *(deixe em branco)*

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build (1-2 minutos)
   - Pronto! Seu site estará no ar

### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# No diretório do projeto
cd D:\CampBlox

# Deploy
vercel

# Siga as instruções:
# ? Set up and deploy? Y
# ? Which scope? (seu usuário)
# ? Link to existing project? N
# ? What's your project's name? infinity-guild
# ? In which directory is your code located? ./
```

### Configurações Vercel

O arquivo `vercel.json` já está configurado com:
- ✅ Rotas configuradas
- ✅ Headers de segurança
- ✅ Rewrites para SPA

---

## 🚂 Deploy no Railway

### Via Interface Web

1. **Faça push do código para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```

2. **Acesse o Railway**
   - Vá para [railway.app](https://railway.app)
   - Faça login com GitHub
   - Clique em "New Project"

3. **Deploy from GitHub**
   - Selecione "Deploy from GitHub repo"
   - Escolha seu repositório
   - Railway detectará automaticamente o `railway.toml`

4. **Configure**
   - O arquivo `railway.toml` já configura tudo automaticamente
   - Railway usará `http-server` para servir os arquivos estáticos

5. **Obtenha a URL**
   - Após o deploy, clique em "Settings"
   - Em "Domains", Railway fornecerá uma URL temporária
   - Você pode configurar um domínio personalizado

### Via CLI

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar projeto
railway init

# Deploy
railway up

# Visualizar logs
railway logs
```

---

## 🔧 Configuração de Domínio Personalizado

### Vercel

1. Vá para o dashboard do projeto no Vercel
2. Settings → Domains
3. Add Domain
4. Configure os registros DNS conforme instruções

### Railway

1. Vá para o dashboard do projeto no Railway
2. Settings → Domains
3. Generate Domain
4. Configure os registros DNS

---

## 📝 Variáveis de Ambiente

Se precisar adicionar variáveis de ambiente:

### Vercel
- Settings → Environment Variables
- Adicione: `NODE_ENV=production`

### Railway
- Variables tab
- Adicione as variáveis necessárias

---

## 🔄 Atualizações

Para atualizar o site:

```bash
git add .
git commit -m "Atualização"
git push
```

Vercel/Railway detectarão automaticamente e farão o redeploy.

---

## 📊 Monitoramento

### Vercel
- Analytics: Visualize visitantes
- Logs: Veja logs em tempo real
- Speed Insights: Performance do site

### Railway
- Metrics: CPU, memória, tráfego
- Logs: Logs do servidor

---

## 🛠️ Troubleshooting

### Build falha no Vercel
- Verifique se todos os arquivos estão commitados
- Confirme que `vercel.json` está correto
- Veja os logs em Deployment → Logs

### Site não carrega no Railway
- Verifique se o `railway.toml` está correto
- Confirme que o PORT está configurado
- Veja os logs: `railway logs`

### Erro 404
- Confirme que `index.html` está na raiz
- Verifique as configurações de rotas no `vercel.json`

---

## 🎯 Comandos Úteis

```bash
# Ver status do deploy (Vercel)
vercel ls

# Ver logs (Railway)
railway logs

# Abrir site local
npm run dev

# Instalar dependências
npm install
```

---

## ✅ Checklist de Deploy

- [ ] Código commitado no GitHub
- [ ] Arquivo `vercel.json` criado
- [ ] Arquivo `railway.toml` criado
- [ ] `package.json` configurado
- [ ] `.gitignore` configurado
- [ ] README.md atualizado
- [ ] Teste local funcionando
- [ ] Deploy realizado
- [ ] Domínio configurado (opcional)
- [ ] Site funcionando online

---

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Discord Infinity Guild**: [seu servidor]

---

**🎮 Boa sorte com o deploy!**

