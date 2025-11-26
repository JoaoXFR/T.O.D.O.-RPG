cont_total = 0
cont_1 = 0 
cont_2 = 0 
cont_3 = 0 
cont_4 = 0
indentificador = int(input("Informe a identificação: "))
while indentificador != 0:
    print("1 - nescessidade de esfera ")
    print("2 - nescessidade de limpeza ")
    print("3 - nescessidade de troca de cabo ou conector ")
    print("4 - quebrado ou inutilizado ")
    defeito = int(input("Informe qual o defeito: "))
    if defeito == 1:
        cont_1 = cont_1 + 1
    elif defeito == 2:
        cont_2 = cont_2 + 1
    elif defeito == 3:
        cont_3 = cont_3 + 1
    elif defeito == 4:
        cont_4 = cont_4 + 1 
    cont_total = cont_total +1
    indentificador = int(input("Informe a identificação: "))
p1 = (cont_1 / cont_total) * 100.0
p2 = (cont_2 / cont_total) * 100.0
p3 = (cont_3 / cont_total) * 100.0
p4 = (cont_4 / cont_total) * 100.0
print("Quantidade total de mouses: {0}".format(cont_total))
print("Situação                                      Quantidade    Percentual")
print("1 - Nescessidade de Esfera                        {0}          {1:.2f}%".format(cont_1,p1))
print("2 - nescessidade de limpeza                       {0}          {1:.2f}%".format(cont_2,p2))
print("3 - nescessidade de troca de cabo ou conector     {0}          {1:.2f}%".format(cont_3,p3))
print("4 - quebrado ou inutilizado                       {0}          {1:.2f}%".format(cont_4,p4)) 