# Hash Teste Back-end

Para instruções sobre como usar e testar leia o `TUTORIAL.md`

## Contextualização

Cada parte do teste tem como objetivo pessoal atingir escalabilidade, e fácil substituição, as aplicações foram escritas primariamente seguindo dois paradigmas.

Um foi ultilizado pelas aplicações em TypeScript, foram desenvolvidos buscando atingir o isolamento e redução de lógica necessária e aumentar a testabilidade. Essencialmente se compila, a aplicação funciona e se os testes passam, ela funciona como desejado.

O outro paradigma, é mais "XGH", foi desenvolvido com o objetivo de ser essencialmente um MVP, ultilizando uma técnologia a qual é muito fora do que estou acostumado(Go) e sobre um budget de tempo. Por ambos os motivos existem alguns problemas internos da aplicação e a ausência de testes, mas dado que a API externa foi bem desenhada a possibilidade de substituição e escalabilidade se manteve.

Mesmo que a proposta do teste seja apenas dois serviços, para simplificar a arquitetura e implementação, foi adicionado um terceiro para controle e persistência de usuários.

## Segurança

Os serviços estão rodando sem SSL, pois existe uma presunção que eles serão rodados em uma maquina unica e ao menos em uma VPN(ou Amazon VPC), mesmo que o segundo não seja o ideal, a vantagem disto é que é muito mais simples configurar o ambiente, existe um ganho de performance e não inclui a complexidade inerente ao armazenamento de chaves privadas.

## Terminologia

| Nome       | Função                      |
| ---------- | --------------------------- |
| controller | Controle de entrada e saida |
| service    | Lógica de negócio           |
| model      | Camada de persistencia      |

## Fluxo de dados

Existem dois possiveis fluxos para chamadas que são:

- `controller <-> model`.
- `controller <-> service <-> model`

O primeiro é essencialmente para persistencia de dados, aonde a presença de lógica de negócio é irrisória ou nula.

O segundo é para chamadas que possuam lógica de negócio, podendo caso o service chamar a model diversas vezes, mas a controller deve chamar apenas um service.

## /apps/discounts

Responsável pelo calculo de descontos, fazendo integração com o serviço de usuarios e produtos.

Assim como o serviço de usuários foi feito uma inversão de controle, conceitualmente `dependency injection`. Para não gerar complexidade e repetição de código desnecessária as interfaces ultilizadas são controlados pelo arquivo responsável pela implementação, mesmo que isso gere um pouco mais de acoplamento, a vantagem ganhada é considerável e ainda permite o maior diferencial que é facilidade de testes unitários se necessário.

Esse serviço foi testado ultilizando-se apenas de testes unitários, dado a complexidade desnecessária que seria subir os outros serviços e suas dependencias, toda a camada de negócios e controle foram testadas e pela ausência de lógica na camada de persistencia tais testes convém confiabilidade suficiente.

## /apps/users

Esse service é responsável pela persistencia de dados de usuários, o motivo da existência é por que de um ponto de vista de escalabilidade é muito mais simples se cada serviço fosse responsável pelo seu próprio banco de dados.

Como esse serviço depende apenas de um banco de dados, é muito simples de escrever testes de integração e fácil de executar, apenas sendo necessário um alias no /etc/hosts e um banco rodando, ou um docker-compose.yml em caso de um CI.

## /apps/products

Esse é o serviço externo, responsável por servir a rota `/product` na porta `8080`, fazer a integração com o serviço de disconto e servir como persistencia de dados de produtos.

Ele é diferente, com 2 conjuntos de controllers uma para servir HTTP e outro para servir GRPC, foi desenvolvido sem muito estudo de convenções e desenho de código idiomático para a plataforma, se atendo estritamente a ser de rápido desenvolvimento, porém criando objetivamente um débito técnico.

## /packages/protos

Pacote responsável pelo build dos protobuffers para uso compartilhado por aplicações a vantagem primária de estar em um monorepo não versionado é que em caso de uma breaking change acidental o CI irá falhar no build de qualquer uma das aplicações, assim reduzindo bastante a chance deste e outros tipos de erros.

## /packages/utils

Dado o fato do gRPC não ser desenvolvido de uma forma idiomática para JavaScript em especial JavaScript moderno, temos alguns problemas de boilerplate que acabam aumentando consideravelmente a superficie da aplicação, ao fazer alguns utilitários que podem ser facilmente testados reduz-se esse boilerplate largamente e se define algumas convenções como é o caso do campo de `status` nos protobuffers, e dado as restrições aplicadas pelo TypeScript, uma resposta sem esse campo não permitirá a aplicação nem a compilar.

## Considerações adicionais

Foi ultilizado alguns forks pessoais por limitações de tempo e burocrácia para passar algumas PR, o `grpc-node` stock não possui suporte a promises e por tal motivo não é possivel extrair facilmente do `grpc_tools_node_protoc_ts` os tipos de Request e Response. Com a alteração em ambos, em conjunto com a definition alterada do `mali.js` é possivel em tempo de build se validar se está usando a Request e Response correta, além de melhorar bastante a experiência de desenvolvimento(autocomplete).

Originalmente eu estava pensando em ultilizar streams, mas dado a não ser recomendado e possuir certa complexidade adicional, foi abandonado a escolha, porém a type definition ainda consta no projeto.

- https://github.com/EduardoRFS/grpc-native-core.git#20ba246427f179d5eaaf99bcca893fd7ccc29689
- https://github.com/EduardoRFS/mali.git#b7de8855b5413b65f41a4943f6b4c9f2c12fd425
