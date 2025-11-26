menor = 9999
maior = -9999
soma = 0 
for n in range(1,11):
    i = int(input("escreva um numero: "))
    if i >  0:
        if i > maior:
            maior = i
        if i < menor:
            menor = i
        soma = soma + i
    else: 
        i = int(input("escreva um numero: "))
print("o menor valor foi: {0}".format(menor))
print("o maior valor foi: {0}".format(maior))
print("A soma de todos os numeros foi: {0}".format(soma)) 