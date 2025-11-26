p = float(input("Qual o nivel de poluição? "))
if p >= 0.3 and p < 0.4:
    print("Qrupo 1 suspender as atividades")
elif p >= 0.4 and p < 0.5:
    print("Qrupos 1 e 2 suspender as atividades")
elif p >= 0.5:
    print("Todos os grupos suspender as atividades")