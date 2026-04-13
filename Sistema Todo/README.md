# T.O.D.O. — Tecnologia Operacional de Dossiês Ocultos

> Plataforma digital paranormal para fichas e campanhas de RPG, inspirada no CRIS Ordem Paranormal.

---

## 🎯 Objetivo

Site de apresentação/landing page para o **T.O.D.O.**, uma plataforma de fichas digitais e ferramentas para jogadores e mestres de RPG Ordem Paranormal. Design dark e atmosférico com identidade visual única.

---

## ✅ Funcionalidades Implementadas

### Estrutura & Layout
- [x] Single-page responsiva (mobile, tablet, desktop)
- [x] Header fixo com efeito de vidro fosco ao rolar
- [x] Menu mobile com animação de abertura/fechamento
- [x] Footer completo com links e redes sociais
- [x] Scroll suave entre seções

### Seções
- [x] **Hero** — Título T.O.D.O., descrição, CTAs e estatísticas animadas
- [x] **Fichas Digitais** — Mockup interativo de ficha de agente com rolagem de dados
- [x] **Agentes** — Grid de agentes com status online/offline
- [x] **Ferramentas para o Mestre** — Grid de 6 ferramentas com ícones coloridos
- [x] **Homebrew** — Cards de exemplo de conteúdo homebrew
- [x] **Campanhas** — Painel de gerenciamento de campanhas
- [x] **Comunidade** — Depoimentos de usuários
- [x] **Pricing/Apoio** — 3 planos (Grátis, Veterano, Mestre Supremo) + Catarse

### Interatividade JavaScript
- [x] Efeito de partículas no hero (canvas animado)
- [x] Animação de contadores nas estatísticas
- [x] Revelação de elementos ao rolar (Intersection Observer)
- [x] Rolagem de dados interativa no mockup (d20 + bônus)
- [x] Auto-rolagem de demonstração no mockup
- [x] Scroll spy — link ativo no nav conforme seção visível
- [x] Efeito parallax no símbolo do hero (mouse)
- [x] Efeito glitch no logo T.O.D.O.
- [x] Efeito de digitação (typewriter) no subtítulo
- [x] Cursor glow suave (somente desktop)
- [x] Suporte a `prefers-reduced-motion`

### Design Visual
- [x] Tema dark paranormal (preto, vermelho sangue, roxo místico)
- [x] Tipografia: Cinzel (display), Inter (corpo), Share Tech Mono (código)
- [x] Símbolo/sigil animado em rotação contínua
- [x] Overlay de ruído/textura
- [x] Scrollbar personalizada
- [x] Seleção de texto com cor de destaque

---

## 📂 Estrutura de Arquivos

```
index.html          → Página principal (toda estrutura HTML)
css/
  style.css         → Estilos completos (CSS Variables, layout, animações)
js/
  main.js           → JavaScript (partículas, animações, interatividade)
README.md           → Este arquivo
```

---

## 🌐 URIs / Seções

| âncora              | Conteúdo                    |
|---------------------|-----------------------------|
| `#hero-section`     | Hero principal              |
| `#features-section` | Fichas Digitais             |
| `#agents-section`   | Gestão de Agentes           |
| `#master-section`   | Ferramentas para o Mestre   |
| `#homebrew-section` | Sistema Homebrew            |
| `#campaign-section` | Gerenciamento de Campanhas  |
| `#community-section`| Depoimentos da Comunidade   |
| `#support-section`  | Planos e Apoio (Catarse)    |

---

## 🚧 Funcionalidades Não Implementadas (Próximos Passos)

- [ ] Sistema de login/autenticação real
- [ ] Fichas de agente funcionais (formulário, salvamento)
- [ ] Rolagem de dados online em tempo real (WebSocket)
- [ ] Sistema de homebrew com banco de dados
- [ ] Gerenciamento de campanhas funcional
- [ ] Mapa interativo com tokens
- [ ] Integração real com Catarse
- [ ] Blog e central de ajuda
- [ ] API pública para integrações
- [ ] Aplicativo mobile nativo

---

## 🎨 Paleta de Cores

| Token              | Cor             |
|--------------------|-----------------|
| `--color-bg`       | `#080a0e`       |
| `--color-red`      | `#c41e3a`       |
| `--color-red-light`| `#e8234a`       |
| `--color-purple`   | `#7c3aed`       |
| `--color-gold`     | `#c9a84c`       |
| `--color-text`     | `#e8eaf0`       |

---

## 🔤 Tipografia

- **Display**: Cinzel (serif) — títulos, logo, destaque
- **Corpo**: Inter (sans-serif) — texto corrido
- **Mono**: Share Tech Mono — badges, fichas, código

---

## 📦 Dependências CDN

- [Google Fonts](https://fonts.google.com/) — Cinzel, Inter, Share Tech Mono
- [Font Awesome 6.4](https://fontawesome.com/) — ícones

---

*T.O.D.O. é um projeto de fã independente, não afiliado oficialmente com Ordem Paranormal ou Cellbit.*
