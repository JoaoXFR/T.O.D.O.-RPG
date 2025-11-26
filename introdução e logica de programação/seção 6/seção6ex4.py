altura = float(input("Escreva a sua altura: "))
sexo = input("iinforme o seu Sexo: ")
if sexo.lower() == "m":
    p_ideal = (72.7 * altura) - 58
elif sexo.lower() == "f":
    p_ideal = (62.1 * altura) - 44.7
else:
    p_ideal = 0
    print("sexo não reconhecido")
print("o seu peso ideal é de: {0:.2f}".format(p_ideal))