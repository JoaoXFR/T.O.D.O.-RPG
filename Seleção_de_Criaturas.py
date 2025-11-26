import os
from PIL import Image

# Definição das criaturas de sangue e seus valores
CRIATURAS_DE_SANGUE = {
    'ABERRAÇÃO_DE_CARNE': 40,'ANIQUILAÇÃO': 380,'CARENTE': 300,'DAMA_DE_SANGUE': 60,'ENPAP_X': 180,'KERBEROS': 340,'MINOTAURO': 280,'MULHER_AFOGADA': 140,'TITÃ_DE_SANGUE': 220,
    'ZUMBI_DE_SANGUE': 20,'ZUMBI_DE_SANGUE_BESTIAL': 100,'O_DIABO': 400,'Manifestação_de_Carne': 240,'Amalgama': 100,'Demongorgon': 100,'Face_Seca': 100,'Decrépito': 25,
    'Coração_de_Lúcifer': 380,'Zumbi_de_sangue_Parcial': 5,'Zumbi_de_Sangue_Dentado': 15,'Zumbi_de_sangue_Espinhento': 25,'Devorador_de_Sentimentos': 50,'Cavaleiro_da_Fome': 370,
    'Transtornado': 40,'O_Amalgamado': 280,'AMIGO_IMAGINÁRIO': 40,'CICLOPE': 260,'DIABRETE': 240,'ZUMBI_DECEPADO': 200,'ZUMBI_DE_SANGUE_SECO': 10,'MARIA_SANGRENTA': 80,
    'ASMODEUS': 160,'SENHOR_DA_LUXÚRIA': 160,'CARNIÇAL_DO_SANGUE': 200,'PERSEGUIDOR_MORTÍFERO': 80,'MANIPULADOR': 360,'PRÍNCIPES_DO_INFERNO': 380,'ÓRFÃO_DE_KOS': 320,
    'LUSCA_ARTIFICIAL': 280, 'ENXAME_LACERÍDEO': 80,'RAINHA_LACERÍDEO': 160,'CENOBITA': 340,'HEMORRÁGICO': 20,
}

# Solicitação de informações ao usuário
quantidade_de_jogadores = int(input('Informe quantos jogadores estão na mesa atual: '))
valor_nex = int(input('Informe o nex dos jogadores: '))

# Cálculo do nex real
real_nex = valor_nex * quantidade_de_jogadores

# Caminho para o diretório de imagens
caminho_imagens = 'C:\\Users\\João Paulo\\Downloads\\Seleção de criaturas\\Criaturas_sangue\\'

# Exibição das criaturas cujo valor é menor ou igual ao nex real
print(f'Cuidado com essas criaturas! Elas possuem Nex menor ou igual a {real_nex}:')
for criatura, valor in CRIATURAS_DE_SANGUE.items():
    if valor <= real_nex:
        print(f'{criatura}: {valor}')
        # Caminho completo da imagem
        caminho_imagem = os.path.join(caminho_imagens, f'{criatura}.jpg')
        
        # Verifica se a imagem existe
        if os.path.exists(caminho_imagem):
            # Abre e mostra a imagem
            imagem = Image.open(caminho_imagem)
            imagem.show()
        else:
            print(f'Imagem para {criatura} não encontrada.')
