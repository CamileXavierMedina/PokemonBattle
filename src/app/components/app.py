import os
import random
from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import requests

# IMPORTAÇÃO DO SUPABASE
try:
    from supabase import create_client, Client
    SUPABASE_DISPONIVEL = True
except ImportError:
    SUPABASE_DISPONIVEL = False

app = Flask(__name__)
app.secret_key = "chave_secreta_pokemon_2004"

# =====================================================================
# 🔌 CONFIGURAÇÃO DO BANCO DE DADOS SUPABASE
# =====================================================================
# Insira aqui os dados que o Rafael criar no painel do Supabase.
# Se deixar em branco, o sistema entra automaticamente no Modo Simulado (Mock)
SUPABASE_URL = os.environ.get("SUPABASE_URL", "") 
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")

supabase_client = None
if SUPABASE_DISPONIVEL and SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("🔌 Conexão real com o Supabase estabelecida com sucesso!")
    except Exception as e:
        print(f"⚠️ Erro ao conectar no Supabase: {e}. Entrando no Modo Simulado.")
        supabase_client = None

# Memória temporária (Modo Simulado ativa se o Supabase não estiver configurado)
MOCK_USUARIOS = {"camile": "123456", "leticia": "123", "rafael": "123", "larissa": "123"}
MOCK_HISTORICO = []

# =====================================================================
# 🗄️ FUNÇÕES DO BANCO DE DADOS (COM CONEXÃO REAL E SIMULAÇÃO)
# =====================================================================

def db_autenticar_usuario(username, password):
    """Verifica se o usuário existe e se a senha está correta."""
    username_limpo = username.strip().lower()
    
    # 1. TENTA CONEXÃO REAL
    if supabase_client:
        try:
            resposta = supabase_client.table("jogadores").select("*").eq("username", username_limpo).execute()
            if resposta.data and len(resposta.data) > 0:
                # Armazena estatísticas do banco na sessão para agilizar o frontend
                session["vitorias"] = resposta.data[0].get("vitorias", 0)
                session["derrotas"] = resposta.data[0].get("derrotas", 0)
                return resposta.data[0].get("password_hash") == password
            return False
        except Exception as e:
            print(f"Erro na consulta do Supabase: {e}. Usando simulação.")
            
    # 2. SE FALHAR, USA O MODO SIMULADO
    if username_limpo in MOCK_USUARIOS and MOCK_USUARIOS[username_limpo] == password:
        session["vitorias"] = session.get("vitorias", 0)
        session["derrotas"] = session.get("derrotas", 0)
        return True
    return False


def db_usuario_existe(username):
    """Verifica se o nome de usuário já está registrado."""
    username_limpo = username.strip().lower()
    
    if supabase_client:
        try:
            resposta = supabase_client.table("jogadores").select("*").eq("username", username_limpo).execute()
            return len(resposta.data) > 0
        except Exception as e:
            print(f"Erro na consulta do Supabase: {e}")
            
    return username_limpo in MOCK_USUARIOS


def db_cadastrar_usuario(username, password):
    """Cria uma nova conta de jogador."""
    username_limpo = username.strip().lower()
    
    if supabase_client:
        try:
            supabase_client.table("jogadores").insert({
                "username": username_limpo,
                "password_hash": password,
                "vitorias": 0,
                "derrotas": 0,
                "xp": 0
            }).execute()
            return True
        except Exception as e:
            print(f"Erro ao inserir usuário no Supabase: {e}")
            
    MOCK_USUARIOS[username_limpo] = password
    return True


def db_salvar_batalha(username, equipe_jogador, equipe_oponente, resultado, vencedor):
    """Salva a partida com contagem sequencial (Batalha 1, Batalha 2, etc.)."""
    username_limpo = username.strip().lower()
    
    # 1. TENTA CONEXÃO REAL COM O SUPABASE
    if supabase_client:
        try:
            # Busca as batalhas passadas para contar e numerar esta nova (ex: Batalha 3)
            batalhas_passadas = supabase_client.table("historico_batalhas").select("*").eq("jogador", username_limpo).execute()
            proximo_numero = len(batalhas_passadas.data) + 1
            
            # Insere a nova partida
            supabase_client.table("historico_batalhas").insert({
                "numero_batalha": proximo_numero,
                "jogador": username_limpo,
                "equipe_j": equipe_jogador,
                "equipe_o": equipe_oponente,
                "resultado": resultado,
                "vencedor": vencedor
            }).execute()
            
            # Atualiza o saldo de vitórias/derrotas e adiciona +100 XP por vitória
            dados_jogador = supabase_client.table("jogadores").select("*").eq("username", username_limpo).execute()
            if dados_jogador.data:
                j = dados_jogador.data[0]
                novas_vits = j.get("vitorias", 0) + (1 if resultado == "Vitória" else 0)
                novas_ders = j.get("derrotas", 0) + (1 if resultado == "Derrota" else 0)
                novo_xp = j.get("xp", 0) + (100 if resultado == "Vitória" else 0)
                
                # Atualiza na tabela jogadores
                supabase_client.table("jogadores").update({
                    "vitorias": novas_vits,
                    "derrotas": novas_ders,
                    "xp": novo_xp
                }).eq("username", username_limpo).execute()
                
                # Sincroniza dados atuais com a sessão local
                session["vitorias"] = novas_vits
                session["derrotas"] = novas_ders
            return True
        except Exception as e:
            print(f"Erro ao salvar partida no Supabase: {e}. Usando simulação.")

    # 2. MODO SIMULADO SE NÃO CONECTADO
    batalhas_anteriores = [h for h in MOCK_HISTORICO if h["jogador"] == username_limpo]
    proximo_numero = len(batalhas_anteriores) + 1
    
    MOCK_HISTORICO.append({
        "numero_batalha": proximo_numero,
        "jogador": username_limpo,
        "equipe_j": equipe_jogador,
        "equipe_o": equipe_oponente,
        "resultado": resultado,
        "vencedor": vencedor
    })
    
    if resultado == "Vitória":
        session["vitorias"] = session.get("vitorias", 0) + 1
    else:
        session["derrotas"] = session.get("derrotas", 0) + 1
    return True


def db_obter_historico_jogador(username):
    """Busca o histórico de partidas de um jogador específico."""
    username_limpo = username.strip().lower()
    
    if supabase_client:
        try:
            resposta = supabase_client.table("historico_batalhas").select("*").eq("jogador", username_limpo).order("numero_batalha").execute()
            return resposta.data
        except Exception as e:
            print(f"Erro ao buscar histórico no Supabase: {e}")
            
    lista = [h for h in MOCK_HISTORICO if h["jogador"] == username_limpo]
    return sorted(lista, key=lambda x: x["numero_batalha"])


def db_obter_ranking_global():
    """Gera o Leaderboard ordenado por XP acumulado."""
    if supabase_client:
        try:
            resposta = supabase_client.table("jogadores").select("username, vitorias, derrotas, xp").order("xp", desc=True).execute()
            return resposta.data
        except Exception as e:
            print(f"Erro ao buscar ranking no Supabase: {e}")
            
    ranking = []
    for user in MOCK_USUARIOS.keys():
        ranking.append({
            "username": user.capitalize(),
            "vitorias": session.get("vitorias", 0) if user == session.get("usuario") else random.randint(1, 5),
            "derrotas": session.get("derrotas", 0) if user == session.get("usuario") else random.randint(1, 5),
            "xp": (session.get("vitorias", 0) * 100) if user == session.get("usuario") else random.randint(100, 500)
        })
    return sorted(ranking, key=lambda x: x["xp"], reverse=True)


# =====================================================================
# 🐉 CONEXÃO DIRETA COM A POKEAPI DO POKÉMON
# =====================================================================
def buscar_dados_pokemon(nome_ou_id):
    try:
        nome_limpo = str(nome_ou_id).lower().strip()
        url = f"https://pokeapi.co/api/v2/pokemon/{nome_limpo}"
        response = requests.get(url, timeout=5)
        
        if response.status_code != 200:
            return None
            
        dados = response.json()
        stats = dados.get("stats", [])
        sprites = dados.get("sprites", {})
        
        hp = stats[0]["base_stat"]
        ataque = stats[1]["base_stat"]
        defesa = stats[2]["base_stat"]
        velocidade = stats[5]["base_stat"]
        
        imagem = sprites.get("other", {}).get("official-artwork", {}).get("front_default")
        if not imagem:
            imagem = sprites.get("front_default")
            
        return {
            "nome": dados.get("name").capitalize(),
            "hp": hp,
            "hp_max": hp,
            "ataque": ataque,
            "defesa": defesa,
            "velocidade": velocidade,
            "imagem": imagem
        }
    except Exception as e:
        print(f"Erro ao conectar com a PokeAPI: {e}")
        return None

# =====================================================================
# ⚔️ REGRAS DE COMBATE RPG DE TURNOS (AUTO-BATTLER)
# =====================================================================
def executar_turno(atacante, defensor, log_batalha):
    poder_sorteado = random.choices([1, 2, 3], weights=[60, 30, 10], k=1)[0]
    
    if poder_sorteado == 1:
        # PODER 1: ATAQUE RÁPIDO
        dano = max(5, int(atacante["ataque"] - (defensor["defesa"] * 0.3)))
        defensor["hp"] = max(0, defensor["hp"] - dano)
        log_batalha.append(f"⚡ <strong>{atacante['nome']}</strong> usou <strong>Ataque Rápido</strong> e causou {dano} de dano!")
    elif poder_sorteado == 2:
        # PODER 2: ATAQUE CARREGADO (Chance de Erro)
        if random.random() <= 0.75:
            dano = max(12, int((atacante["ataque"] * 1.5) - (defensor["defesa"] * 0.3)))
            defensor["hp"] = max(0, defensor["hp"] - dano)
            log_batalha.append(f"💥 <strong>{atacante['nome']}</strong> conectou um <strong>Ataque Carregado</strong> elemental! Causou {dano} de dano!")
        else:
            log_batalha.append(f"💨 <strong>{atacante['nome']}</strong> tentou o Ataque Carregado, mas falhou!")
    elif poder_sorteado == 3:
        # PODER 3: FOCO DEFENSIVO
        cura = int(atacante["hp_max"] * 0.15)
        atacante["hp"] = min(atacante["hp_max"], atacante["hp"] + cura)
        log_batalha.append(f"🛡️ <strong>{atacante['nome']}</strong> usou <strong>Foco Defensivo</strong> e restaurou {cura} de HP!")

def simular_combate(equipe_jogador, equipe_oponente):
    log_batalha = []
    log_batalha.append("🔔 O gongo tocou! A batalha de Pokémons começou!")
    
    jogadores = [dict(p) for p in equipe_jogador]
    oponentes = [dict(p) for p in equipe_oponente]
    
    idx_j = 0
    idx_o = 0
    rodada = 1
    
    while idx_j < len(jogadores) and idx_o < len(oponentes):
        p_j = jogadores[idx_j]
        p_o = oponentes[idx_o]
        
        log_batalha.append(f"<br><span class='text-warning'>▶️ Turno {rodada}: {p_j['nome']} vs {p_o['nome']}</span>")
        
        while p_j["hp"] > 0 and p_o["hp"] > 0:
            if p_j["velocidade"] >= p_o["velocidade"]:
                executar_turno(p_j, p_o, log_batalha)
                if p_o["hp"] <= 0:
                    break
                executar_turno(p_o, p_j, log_batalha)
            else:
                executar_turno(p_o, p_j, log_batalha)
                if p_j["hp"] <= 0:
                    break
                executar_turno(p_j, p_o, log_batalha)
        
        if p_j["hp"] <= 0:
            log_batalha.append(f"💀 <strong>{p_j['nome']}</strong> desmaiou!")
            idx_j += 1
        if p_o["hp"] <= 0:
            log_batalha.append(f"💀 <strong>{p_o['nome']}</strong> inimigo desmaiou!")
            idx_o += 1
            
        rodada += 1
        
    vencedor = "Jogador" if idx_j < len(jogadores) else "Oponente"
    log_batalha.append(f"<br><span class='text-success'>🏆 FIM DA SIMULAÇÃO! Vitória da equipe do <strong>{vencedor}</strong>!</span>")
    
    return {
        "vencedor": vencedor,
        "log": log_batalha
    }

# =====================================================================
# 🌐 ROTAS DO FLASK
# =====================================================================

@app.route("/")
def index():
    if "usuario" in session:
        return redirect(url_for("lobby"))
    return render_template("login.html")

@app.route("/login", methods=["POST"])
def login():
    usuario = request.form.get("username", "").strip()
    senha = request.form.get("password", "")
    
    if db_autenticar_usuario(usuario, senha):
        session["usuario"] = usuario.strip().lower()
        return redirect(url_for("lobby"))
        
    return render_template("login.html", erro="Treinador ou senha incorretos.")

@app.route("/cadastro", methods=["POST"])
def cadastro():
    usuario = request.form.get("username", "").strip()
    senha = request.form.get("password", "")
    
    if not usuario or not senha:
        return render_template("login.html", erro="Preencha todos os campos!")
        
    if db_usuario_existe(usuario):
        return render_template("login.html", erro="Este treinador já existe.")
        
    db_cadastrar_usuario(usuario, senha)
    session["usuario"] = usuario.strip().lower()
    session["vitorias"] = 0
    session["derrotas"] = 0
    return redirect(url_for("lobby"))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/lobby")
def lobby():
    if "usuario" not in session:
        return redirect(url_for("index"))
        
    opcoes_iniciais = ["Pikachu", "Charizard", "Blastoise", "Venusaur"]
    recomendados = []
    
    for nome in opcoes_iniciais:
        poke = buscar_dados_pokemon(nome)
        if poke:
            recomendados.append(poke)
            
    # Sincroniza e busca estatísticas reais do banco para exibir no lobby
    batalhas = db_obter_historico_jogador(session["usuario"])
    vitorias = len([b for b in batalhas if b["resultado"] == "Vitória"])
    derrotas = len([b for b in batalhas if b["resultado"] == "Derrota"])
            
    return render_template("lobby.html", 
                           usuario=session["usuario"], 
                           vitorias=vitorias, 
                           derrotas=derrotas,
                           recomendados=recomendados)

@app.route("/arena", methods=["POST"])
def arena():
    if "usuario" not in session:
        return redirect(url_for("index"))
        
    p1 = request.form.get("pokemon1", "").strip()
    p2 = request.form.get("pokemon2", "").strip()
    p3 = request.form.get("pokemon3", "").strip()
    
    if not p1 or not p2 or not p3:
        return redirect(url_for("lobby"))
        
    equipe_jogador = []
    for nome in [p1, p2, p3]:
        poke = buscar_dados_pokemon(nome)
        if not poke:
            return redirect(url_for("lobby"))
        equipe_jogador.append(poke)
        
    equipe_oponente = []
    while len(equipe_oponente) < 3:
        id_sorteado = random.randint(1, 151)
        poke_op = buscar_dados_pokemon(id_sorteado)
        if poke_op:
            equipe_oponente.append(poke_op)
            
    resultado = simular_combate(equipe_jogador, equipe_oponente)
    resultado_txt = "Vitória" if resultado["vencedor"] == "Jogador" else "Derrota"
        
    # Grava o match real no banco de dados Supabase
    db_salvar_batalha(
        username=session["usuario"],
        equipe_jogador=[p["nome"] for p in equipe_jogador],
        equipe_oponente=[p["nome"] for p in equipe_oponente],
        resultado=resultado_txt,
        vencedor=resultado["vencedor"]
    )
    
    return render_template("arena.html", 
                           equipe_j=equipe_jogador, 
                           equipe_o=equipe_oponente, 
                           log=resultado["log"], 
                           vencedor=resultado["vencedor"])

@app.route("/historico")
def historico():
    if "usuario" not in session:
        return redirect(url_for("index"))
        
    historico_usuario = db_obter_historico_jogador(session["usuario"])
    ranking_ordenado = db_obter_ranking_global()
    
    return render_template("historico.html", historico=historico_usuario, ranking=ranking_ordenado)

@app.route("/api/pokemon/<nome_ou_id>")
def api_buscar(nome_ou_id):
    dados = buscar_dados_pokemon(nome_ou_id)
    if not dados:
        return jsonify({"erro": "Não encontrado"}), 404
    return jsonify(dados)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)