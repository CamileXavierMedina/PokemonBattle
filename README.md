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

| Categoria                  | Tecnologia                                 |
| -------------------------- | ------------------------------------------ |
| Back-end                   | Python 3.11 + Flask                        |
| Consumo de API             | Requests (integração direta com a PokeAPI) |
| Banco de Dados             | PostgreSQL (Supabase Cloud)                |
| Frontend                   | HTML5, CSS3 e Bootstrap 5                  |
| Garantia de Qualidade (QA) | Pytest                                     |
| DevOps e Infraestrutura    | Docker e GitHub Actions                    |
| Hospedagem                 | Render Cloud                               |

---

## 4. Estrutura de Pastas do Projeto

```text
/PokemonBattle
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
* Git para controle de versão

### Configuração do Ambiente

#### Clone este repositório para o seu computador

```bash
git clone https://github.com/CamileXavierMedina/PokemonBattle.git
```

#### Navegue até a pasta raiz do projeto

```bash
cd PokemonBattle
```

#### Crie um ambiente virtual isolado para as dependências

```bash
python -m venv venv
```

#### Ative o ambiente virtual

**Windows**

```bash
.\venv\Scripts\activate
```

**Linux/macOS**

```bash
source venv/bin/activate
```

#### Instale todas as dependências do projeto

```bash
pip install -r requirements.txt
```

#### Inicie o servidor local de desenvolvimento

```bash
python app.py
```

O console indicará que o servidor está rodando. Abra o navegador e acesse:

```text
http://127.0.0.1:5000
```

---

## 6. Execução via Docker (Containerização)

Caso queira compilar e executar a aplicação em um ambiente isolado idêntico ao servidor de produção, certifique-se de ter o Docker instalado.

### Compilação da imagem Docker

```bash
docker build -t pokemon-autobattler .
```

### Execução do container

```bash
docker run -p 10000:10000 pokemon-autobattler
```

Acesse no navegador:

```text
http://localhost:10000
```

---

## 7. Links Úteis do Projeto

### Repositório GitHub

https://github.com/CamileXavierMedina/PokemonBattle

### Aplicação Publicada (Deploy)

> Inserir aqui o link do Render após o deploy

---

## 8. Equipe de Desenvolvimento

| Integrante               | Responsabilidade                                                        |
| ------------------------ | ----------------------------------------------------------------------- |
| **Camile Xavier Medina** | Proprietária do Repositório e Desenvolvedora Back-end (Python & APIs)   |
| **Leticia**              | Designer UI/UX (Figma Pro) e Desenvolvedora Frontend (HTML/Bootstrap 5) |
| **Rafael**               | Administrador de Banco de Dados (PostgreSQL & Supabase Cloud)           |
| **Larissa**              | DevOps, Garantia de Qualidade (Pytest) e Deploy (Render & Docker)       |

---

##  Licença

Este projeto foi desenvolvido para fins acadêmicos e de aprendizado.

Ceub - 14 de junho de 2026.
