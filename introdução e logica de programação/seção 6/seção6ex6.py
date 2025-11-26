c = int(input("Escreva o seu código: "))
n_h = float(input("Escreva quantas horas foram trabalhadas: "))
e = 0
if n_h <= 50:
    salario = n_h * 10
elif n_h > 50:
    e = (n_h - 50) * 20
    salario = (50 * 10) + e
print("O seu salario atual será de: R${0:.2f}".format(salario))
print("Salario extra já adicionado: R${0:.2f}".format(e))