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

## 🏗️ **Arquitetura Completa do Projeto**

```
Simulacao_SAEP/                          # 🏠 Raiz
├── LICENSE
├── README.md                           # 📖 Este arquivo
├── backend/                            # 🖥️ Backend Node.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json                    # 🎯 npm run dev (nodemon)
│   └── src/
│       ├── app.js                      # 🚀 Servidor principal
│       ├── controllers/
│       │   ├── tarefaController.js     # 🧠 Lógica tarefas
│       │   └── usuarioController.js    # 🧠 Lógica usuários
│       ├── database/
│       │   ├── db.js                   # 🔌 PostgreSQL
│       │   └── setup_banco.sql         # 🗄️ Script SQL
│       ├── models/
│       │   ├── tarefaModel.js          # 💾 Model tarefa
│       │   └── usuarioModel.js         # 💾 Model usuário
│       └── routes/
│           ├── tarefaRoutes.js         # 🛤️ Rotas tarefas
│           └── usuarioRoutes.js        # 🛤️ Rotas usuários
├── public/                             # 🎨 Frontend
│   ├── cadastro-tarefa.html            # 📝 Criar tarefas
│   ├── cadastro-usuario.html           # 👥 CRUD usuários
│   ├── index.html                      # 📊 Kanban principal
│   └── assets/
│       ├── css/
│       │   └── style.css               # 🎨 Segoe UI #0056b3
│       └── js/
│           ├── cadastro-tarefa.js      # ⚡ JS tarefas
│           ├── cadastro-usuario.js     # ⚡ JS usuários
│           └── index.js                # ⚡ Kanban (drag/select)
└── docs/                               # 📐 Documentação
    ├── Diagrama de Caso de Uso/
    │   └── caso-de-uso.png
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
```
Backend rodando → Abrir http://localhost:3000/public/index.html
```

### Comandos
```bash
npm run dev     # Dev (nodemon)
npm start       # Prod
```

## 🔧 Stack Tecnológica
| Camada | Tech |
|--------|------|
| Backend | Node.js/Express/pg |
| Frontend | HTML/CSS/JS Vanilla |
| Banco | PostgreSQL |
| Dev | Nodemon |

## 📚 Documentação
- **SQL**: `backend/src/database/setup_banco.sql`
- **DER**: `docs/Diagrama Entidade-Relacionamento (DER)/`
- **Caso Uso**: `docs/Diagrama de Caso de Uso/caso-de-uso.png`

## ✅ Checklist de Entrega
- [x] Código fonte completo
- [x] Padronização visual
- [x] Diagramas
- [x] Script SQL
- [x] README detalhado
- [x] Nodemon

**Status**: **100% Conforme Especificação** 🎉
