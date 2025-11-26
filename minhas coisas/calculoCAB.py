import random

def calcular_crescimento_membros(base_inicial, taxa_crescimento, anos):
    """
    Calcula o crescimento de membros ao longo dos anos com uma taxa composta.

    :param base_inicial: Número inicial de membros.
    :param taxa_crescimento: Taxa de crescimento anual (decimal).
    :param anos: Número de anos para o crescimento.
    :return: Número final de membros.
    """
    return base_inicial * ((1 + taxa_crescimento) ** anos)

def gerar_cidades_aleatorias(quantidade):
    """
    Gera uma lista de cidades aleatórias a partir de uma base de dados.

    :param quantidade: Número de cidades a gerar.
    :return: Dicionário com cidades e membros iniciais aleatórios.
    """
    cidades_disponiveis = [
        "Afeganistão", "Albânia", "Alemanha", "Andorra", "Angola", "Antígua e Barbuda", "Arábia Saudita", "Argélia", "Argentina", "Armênia", "Austrália", "Áustria", 
        "Azerbaijão", "Bahamas", "Bangladesh", "Barbados", "Barein", "Bélgica", "Belize", "Benin", "Bielorrússia", "Bolívia", "Bósnia e Herzegovina", "Botsuana", "Brasil", 
        "Brunei", "Bulgária", "Burquina Fasso", "Burundi", "Butão", "Cabo Verde", "Camarões", "Camboja", "Canadá", "Catar", "Cazaquistão", "Chade", "Chile", "China", "Chipre", 
        "Colômbia", "Comores", "Congo", "Coreia do Norte", "Coreia do Sul", "Costa do Marfim", "Costa Rica", "Croácia", "Cuba", "Dinamarca", "Djibuti", "Dominica", "Egito", 
        "El Salvador", "Emirados Árabes Unidos", "Equador", "Eritreia", "Eslováquia", "Eslovênia", "Espanha", "Estados Unidos", "Estônia", "Eswatini", "Etiópia", "Fiji", 
        "Filipinas", "Finlândia", "França", "Gabão", "Gâmbia", "Gana", "Geórgia", "Granada", "Grécia", "Guatemala", "Guiana", "Guiné", "Guiné Equatorial", "Guiné-Bissau", 
        "Haiti", "Holanda", "Honduras", "Hungria", "Iêmen", "Ilhas Marshall", "Ilhas Salomão", "Índia", "Indonésia", "Irã", "Iraque", "Irlanda", "Islândia", "Israel", "Itália", 
        "Jamaica", "Japão", "Jordânia", "Kiribati", "Kuwait", "Quirguistão", "Laos", "Lesoto", "Letônia", "Líbano", "Libéria", "Líbia", "Liechtenstein", "Lituânia", "Luxemburgo", 
        "Madagascar", "Malásia", "Maláui", "Maldivas", "Mali", "Malta", "Marrocos", "Maurício", "Mauritânia", "México", "Micronésia", "Moçambique", "Moldávia", "Mônaco", "Mongólia", 
        "Montenegro", "Myanmar", "Namíbia", "Nauru", "Nepal", "Nicarágua", "Níger", "Nigéria", "Noruega", "Nova Zelândia", "Omã", "Paquistão", "Palau", "Panamá", "Papua-Nova Guiné", 
        "Paraguai", "Peru", "Polônia", "Portugal", "Quênia", "Reino Unido", "República Centro-Africana", "República Dominicana", "República Tcheca", "Romênia", "Ruanda", "Rússia", 
        "São Cristóvão e Névis", "São Marino", "São Tomé e Príncipe", "São Vicente e Granadinas", "Seicheles", "Senegal", "Serra Leoa", "Sérvia", "Singapura", "Síria", "Somália", 
        "Sri Lanka", "Sudão", "Sudão do Sul", "Suécia", "Suíça", "Suriname", "Tadjiquistão", "Tailândia", "Tanzânia", "Timor-Leste", "Togo", "Tonga", "Trinidad e Tobago", "Tunísia", 
        "Turcomenistão", "Turquia", "Tuvalu", "Ucrânia", "Uganda", "Uruguai", "Uzbequistão", "Vanuatu", "Vaticano", "Venezuela", "Vietnã", "Zâmbia", "Zimbábue"
    ]
    membros_iniciais = range(20, 60)  # Valores iniciais entre 20 e 60 membros

    # Seleciona cidades únicas aleatórias
    cidades_selecionadas = random.sample(cidades_disponiveis, quantidade)
    return {cidade: random.choice(membros_iniciais) for cidade in cidades_selecionadas}

# Coletando dados do usuário
ano_fundacao = int(input("Digite o ano de fundação da organização: "))
ano_atual = int(input("Digite o ano atual: "))
taxa_crescimento = float(input("Digite a taxa de crescimento anual (em decimal, ex.: 0.035 para 1,0%): "))
tempo_total = ano_atual - ano_fundacao

# Membros iniciais
bases_iniciais = {}
quantidade_bases_iniciais = int(input("Quantas bases iniciais existem? "))
for _ in range(quantidade_bases_iniciais):
    nome_base = input("Digite o nome da base inicial: ")
    membros_base = int(input(f"Digite o número inicial de membros para {nome_base}: "))
    bases_iniciais[nome_base] = membros_base

# Adicionando novas bases no mundo
novas_bases = {}

# Adicionando mais cidades aleatórias
quantidade_cidades_aleatorias = int(input("Quantos paises aleatórias você deseja gerar(Max de 193)? "))
novas_bases.update(gerar_cidades_aleatorias(quantidade_cidades_aleatorias))

# Calculando membros em 2030 para todas as bases
resultados_finais = {}
for base, membros_iniciais in {**bases_iniciais, **novas_bases}.items():
    if base in bases_iniciais:
        anos = tempo_total  # Bases iniciais desde o ano de fundação
    else:
        ano_fundacao_nova_base = 1950
        anos = ano_atual - ano_fundacao_nova_base  # Novas bases desde 1950
    
    resultados_finais[base] = round(calcular_crescimento_membros(membros_iniciais, taxa_crescimento, anos))

# Exibindo os resultados
for base, membros in resultados_finais.items():
    print(f"{base}: {membros} membros em {ano_atual}")
