## Requerimentos

- yarn instalado ... [guia de instação](https://yarnpkg.com/en/docs/install#alternatives-stable)

## Instalação

```sh
yarn # /
```

## Deploy

Sobe, aplicações e bancos de dados, definidos no docker-compose.yml

```sh
yarn deploy # /
```

## Test (discounts)

```sh
yarn test # /apps/discounts
```

## Popular banco de dados dentro do docker

Essencialmente roda os testes e2e dentro do docker, joga uns dados random

```sh
yarn populate # /
```

## Acesso aos bancos internos

Retorna IPs para acesso ao banco dentro do docker

```sh
yarn databases # /
```
