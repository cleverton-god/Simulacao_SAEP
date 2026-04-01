# 🚀 Simulação SAEP - Gerenciador de Tarefas Kanban

**Aluno**: Cleverton Rosa
**Professor**: Michel Tartas

## 🎯 Visão Geral
Sistema **Kanban completo** para indústria alimentícia. Gerencia usuários e tarefas em colunas **A Fazer → Fazendo → Pronto** com integração total.


## 📋 Regras de Negócio Atendidas

| Requisito | Status |
|-----------|--------|
| Usuário: ID/Nome/Email | ✅ |
| Tarefa: ID/ID_Usu/Desc/Setor/Prioridade/Status | ✅ |
| Status inicial \"A Fazer\" | ✅ |
| 1:N relacionamento | ✅ |
| Campos obrigatórios | ✅ |
| 3 colunas Kanban | ✅ |
| Editar (preenchido) + Excluir + Status | ✅ |

## 🏗️ Arquitetura do Projeto

```
Simulacao_SAEP/
├── README.md                    # 📖 Você está aqui
├── backend/                     # 🖥️ API Node/Express
│   ├── package.json             # 🎯 nodemon `npm run dev`
│   └── src/
│       ├── app.js               # 🚀 Server
│       ├── controllers/         # 🧠 Lógica
│       │   ├── tarefaController.js
│       │   └── usuarioController.js
│       ├── models/              # 💾 Models
│       ├── routes/              # 🛤️ Rotas
│       └── database/
│           ├── db.js            # 🔌 Conexão PG
│           └── setup_banco.sql  # 🗄️ Script SQL
├── public/                      # 🎨 Frontend
│   ├── index.html               # 📊 Kanban principal
│   ├── cadastro-usuario.html    # 👥 Usuários
│   ├── cadastro-tarefa.html     # 📝 Tarefas
│   └── assets/
│       ├── css/style.css        # 🎨 UI #0056b3
│       └── js/*.js              # ⚡ JS
└── diagramas/                   # 📐 Documentação
    ├── Diagrama de Caso de Uso/
    │   └── caso-de-uso.png       # 🎭 Casos uso
    └── Diagrama Entidade-Relacionamento (DER)/
```

## 🎨 Identidade Visual
```
Fonte: Segoe UI
├── Cores:
│   ├── #0056b3  → Navbar/Botões/Títulos
│   ├── #FFFFFF  → Fundo
│   └── #000000  → Texto
└── Hover: #004494
```

## ⚙️ Instalação Rápida

### 1️⃣ Backend + Banco
```bash
cd backend
npm install
# Execute setup_banco.sql no PostgreSQL
npm run dev  # http://localhost:3000
```

### 2️⃣ Frontend
```bash
# Backend ↑ rodando
Abrir: http://localhost:3000/public/index.html
```

### Comandos Úteis
```bash
npm run dev     # Backend dev (nodemon)
npm start       # Backend prod
```

## 🔧 Stack Tecnológica
| Camada | Tech |
|--------|------|
| Backend | Node.js/Express/pg |
| Frontend | HTML/CSS/JS Vanilla |
| Banco | PostgreSQL |
| Dev | Nodemon/Git |

## 📚 Documentação
- **SQL**: `backend/src/database/setup_banco.sql`
- **DER**: `diagramas/Diagrama Entidade-Relacionamento (DER)/`
- **Caso Uso**: `diagramas/Diagrama de Caso de Uso/caso-de-uso.png`

## ✅ Checklist de Entrega
- [x] Código fonte completo
- [x] Padronização visual
- [x] Diagramas
- [x] Script SQL
- [x] README detalhado
- [x] Nodemon

**Status**: **100% Conforme Especificação** 🎉  
