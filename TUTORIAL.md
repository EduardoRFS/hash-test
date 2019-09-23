## Requerimentos

- docker e docker-compose instalado

## Deploy

Sobe, aplicações e bancos de dados, definidos no docker-compose.yml

```sh
docker-compose up --build -d # /
```

## Populate

Para rodar migrations no banco de dados e popular os dados

```sh
./POPULATE.sh # /
```

## Testar

Teste ambos os comandos um irá estar de aniversário hoje e logo terá um desconto

```sh
curl -H "X-USER-ID: b9ca41e9-9ce9-4852-8b11-c6386cfb0e25" localhost:8080/product
curl -H "X-USER-ID: 3f045e1b-3ff7-429c-9ca1-e4e7585b48a6" localhost:8080/product
```

## Acesso aos bancos internos

Retorna IPs para acesso ao banco dentro do docker

```sh
yarn databases # /
```
