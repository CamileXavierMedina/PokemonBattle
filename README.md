# Pokémon Auto-Battler RPG

## 1. Descrição do Projeto

O **Pokémon Auto-Battler RPG** é um simulador de combates por turnos táticos inspirado nos clássicos jogos de RPG dos anos 2000. Desenvolvido com o framework **Flask** em Python, o sistema permite que treinadores criem suas contas, escolham Pokémons reais consumindo dados dinâmicos da **PokeAPI**, montem suas equipes de três combatentes e entrem em arenas de simulação automatizada contra equipes adversárias geradas aleatoriamente pelo servidor.

Os combates são resolvidos matematicamente no back-end com base nos atributos reais de **HP**, **Ataque**, **Defesa** e **Velocidade** de cada criatura, utilizando uma lógica de três poderes fixos por Pokémon. Ao final de cada simulação, os resultados são salvos e consolidados em um painel de histórico e classificação geral.

---

## 2. Principais Funcionalidades e Telas

### Tela de Autenticação (Login e Cadastro)

Sistema de registro seguro e login de usuários com persistência em banco de dados relacional.

### 🎮 Tela de Lobby (Seleção de Equipe)

Painel do jogador com atalhos de seleção rápida para quatro Pokémons iniciais populares, barra de busca direta integrada à PokeAPI para recrutamento de qualquer Pokémon e exibição do status do treinador (vitórias, derrotas e nível).

### ⚔️ Tela de Arena de Batalha

Interface gráfica de simulação contendo barras de vida (HP) funcionais, visualização dos Pokémons ativos e um painel de log detalhado exibindo a narrativa dos turnos de ataque e defesa.

### 🏆 Tela de Histórico e Classificação (Leaderboard)

Listagem de partidas anteriores realizadas pelo usuário e tabela de ranqueamento global de todos os jogadores ordenados por Experiência (XP).

---

## 3. Tecnologias Utilizadas

| Categoria      | Tecnologia                        |
| -------------- | --------------------------------- |
| Back-end       | Python 3.11 + Flask               |
| Consumo de API | Requests (integração com PokeAPI) |
| Banco de Dados | PostgreSQL (Supabase Cloud)       |
| Frontend       | HTML5, CSS3 e Bootstrap 5         |
| Testes         | Pytest                            |
| DevOps         | Docker e GitHub Actions           |
| Hospedagem     | Render Cloud                      |

---

## 4. Estrutura de Pastas do Projeto

```text
/universitariotask-pokemon
│
├── /static                  # Arquivos estáticos servidos diretamente
│   ├── /css
│   │   └── style.css        # Estilos customizados extraídos do Figma
│   └── /img                 # Logotipos e mídias do projeto
│
├── /templates               # Estruturas HTML independentes
│   ├── base.html            # Estrutura comum do site (links de estilo e navbar)
│   ├── login.html           # Formulário de entrada e cadastro
│   ├── lobby.html           # Interface de seleção e busca de equipes
│   ├── arena.html           # HUD da simulação de combate e logs
│   └── historico.html       # Visualização de tabelas e classificação
│
├── /tests                   # Suite de testes automatizados
│   └── test_combate.py      # Testes lógicos do simulador com pytest
│
├── app.py                   # Servidor principal Flask e definição de rotas
├── Dockerfile               # Configuração da imagem do container para produção
├── requirements.txt         # Lista de dependências do Python
└── README.md                # Documentação técnica do repositório
```

---

## 5. Como Executar a Aplicação Localmente

### Pré-requisitos

* Python 3.11 ou superior instalado
* Git instalado

### 1. Clone o repositório

```bash
git clone https://github.com/CamileXavierMedina/UniversitarioTask.git
```

### 2. Acesse a pasta do projeto

```bash
cd UniversitarioTask
```

### 3. Crie um ambiente virtual

```bash
python -m venv venv
```

### 4. Ative o ambiente virtual

#### Windows

```bash
.\venv\Scripts\activate
```

#### Linux/macOS

```bash
source venv/bin/activate
```

### 5. Instale as dependências

```bash
pip install -r requirements.txt
```

### 6. Execute o servidor

```bash
python app.py
```

Após iniciar, acesse:

```text
http://127.0.0.1:5000
```

---

## 6. Execução via Docker (Containerização)

### Construir a imagem Docker

```bash
docker build -t pokemon-autobattler .
```

### Executar o container

```bash
docker run -p 10000:10000 pokemon-autobattler
```

Acesse:

```text
http://localhost:10000
```

---

## 7. Links Úteis do Projeto

### Repositório GitHub

* https://github.com/CamileXavierMedina/UniversitarioTask

### Aplicação Publicada (Deploy)

* Inserir aqui o link do Render após o deploy

---

## 8. Equipe de Desenvolvimento

| Integrante               | Responsabilidade                                                        |
| ------------------------ | ----------------------------------------------------------------------- |
| **Camile Xavier Medina** | Proprietária do Repositório e Desenvolvedora Back-end (Python & APIs)   |
| **Leticia**              | Designer UI/UX (Figma Pro) e Desenvolvedora Frontend (HTML/Bootstrap 5) |
| **Rafael**               | Administrador de Banco de Dados (PostgreSQL & Supabase Cloud)           |
| **Larissa**              | DevOps, Garantia de Qualidade (Pytest) e Deploy (Render & Docker)       |

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de aprendizado.
