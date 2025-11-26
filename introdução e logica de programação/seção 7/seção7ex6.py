n = int(input("Informe o numero para ser feito a tabuada: "))
while n < 1 or n > 10:
    n = int(input("Informe o numero para ser feito a tabuada: "))
print("Tabuada do numero {0}".format(n))
for i in range(1, 11):
    print("{0} X {1} = {2}".format(n, i, (n*i)))