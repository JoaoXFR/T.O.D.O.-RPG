n1 = int(input("informe o primeiro numero: "))
n2 = int(input("informe o segundo numero: "))
n3 = int(input("informe o terceiro numero: "))
n4 = int(input("informe o quarto numero: "))
q1 = n1 ** 2
q2 = n2 ** 2
q3 = n3 ** 2
q4 = n4 ** 2
if q3 >= 1000:
    print("O quadrado do terceiro numero é de: {0}".format(q3))
else:
    print("O quadrado do primeiro({0}) numero é de: {1}".format(n1,q1))
    print("O quadrado do segundo({0}) numero é de: {1}".format(n2, q2))
    print("O quadrado do terceiro({0}) numero é de: {1}".format(n3, q3))
    print("O quadrado do quarto({0}) numero é de: {1}".format(n4, q4))