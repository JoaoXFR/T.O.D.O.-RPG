def horario_para_porcentagem(horario_str):
    try:
        # Divide a string em horas, minutos e segundos
        h, m, s = map(int, horario_str.split(":"))
        
        # Validações simples
        if not (0 <= h < 24 and 0 <= m < 60 and 0 <= s < 60):
            return "Horário inválido. Use o formato HH:MM:SS com valores corretos."

        # Converte tudo para segundos
        total_segundos = h * 3600 + m * 60 + s
        
        # Total de segundos em 24h
        total_dia = 24 * 3600
        
        # Calcula a porcentagem
        porcentagem = (total_segundos / total_dia) * 100
        return f"{horario_str} equivale a {round(porcentagem, 2)}% do dia."
    except:
        return "Formato inválido. Use o padrão HH:MM:SS"

# Solicita entrada do usuário
entrada_usuario = input("Digite a hora no formato HH:MM:SS: ")
resultado = horario_para_porcentagem(entrada_usuario)
print(resultado)
