maior = 0
n = int(input("Escreva um numero: "))
while n != 0:
    if n > maior:
        maior = n
    n = int(input("Escreva um numero: "))
print("o maior numero é {0}".format(maior))
