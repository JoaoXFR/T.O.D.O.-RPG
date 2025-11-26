preco_galao_eua = float(input())
preco_litro_brasil = float(input())
cotacao_dolar = float(input())

litros_por_galao = 3.8

preco_litro_eua = (preco_galao_eua / litros_por_galao) * cotacao_dolar

print(f"Gasolina EUA: R$ {preco_litro_eua:.2f}")
print(f"Gasolina Brasil: R$ {preco_litro_brasil:.2f}")

if preco_litro_eua < preco_litro_brasil:
    print("Mais barata nos EUA")
elif preco_litro_brasil < preco_litro_eua:
    print("Mais barata no Brasil")
else:
    print("Igual")
