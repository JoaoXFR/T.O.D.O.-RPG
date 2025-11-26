e = 0
m = 0
p = float(input("excreva o peso dos peixes: "))

if p > 50:
    e = p - 50
    m = e * 4
print("Peso total dos peixes: {0}kg".format(p))
print("Peso excedente: {0}kg".format(e))
print("Multa a ser paga: R${0}".format(m))