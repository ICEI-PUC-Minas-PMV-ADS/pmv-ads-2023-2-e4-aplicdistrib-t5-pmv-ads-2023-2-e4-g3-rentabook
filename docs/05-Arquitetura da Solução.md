# Arquitetura da Solução



<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g3-rentabook/blob/main/docs/img/imagem_2023-09-08_154329598.png">

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g3-rentabook/blob/3f76041d13362a5ac1ca45a126c5497a8ca6e797/docs/img/Diagrama%20de%20classe%20RentABook.png" alt="Diagrama de classes">

Acesse o link abaixo para visualizar o diagrama completo.

> - [Diagramas de Classes RentABook - Lucidchart](https://lucid.app/lucidchart/4d4f1757-4a0b-451a-b8a5-e19dde46423a/edit?viewport_loc=-400%2C-186%2C404%2C189%2CHWEp-vi-RSFO&invitationId=inv_863d048b-9aa6-4f41-9538-69c68af99aee)


## Modelo ER

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g3-rentabook/blob/main/docs/img/diag.png" >

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

Usando a ferramenta mongosh, disponibilizada com o cliente do mongo, deve-se seguir os seguintes passos.

Criar o banco de dados:

```
use rentabook_db
```

Criar as collections dos dados:
```
db.createCollection("users")
db.createCollection("announcements")
db.createCollection("images")
db.createCollection("addresses")
db.createCollection("notifications")
db.createCollection("roles")
db.createCollection("rents")
db.createCollection("trades")
db.createCollection("sales")
db.createCollection("ratings")
db.createCollection("chats")
db.createCollection("chat_messages")
```

## Tecnologias Utilizadas

Tecnologias Utilizadas:

Kotlin: Uma linguagem de programação moderna e concisa para desenvolvimento Android e aplicações backend.
Framework de Desenvolvimento:

Spring Framework: Um framework de aplicação Java amplamente utilizado para criar aplicativos Java empresariais.
Banco de Dados:

MongoDB: Um banco de dados NoSQL altamente escalável e flexível, adequado para armazenar dados de forma eficiente.
Ferramenta de Gerenciamento de Banco de Dados:

MongoDB Compass: Uma interface gráfica para facilitar o gerenciamento e visualização dos dados armazenados no MongoDB.
Ambiente de Desenvolvimento Integrado (IDE):

IntelliJ IDEA: Uma IDE poderosa para desenvolvimento Kotlin e Java.
Ferramenta de Teste de API:

Insomnia: Uma ferramenta de teste de API que permite testar e depurar chamadas de API de forma eficiente.
Documentação de API:

Swagger: Uma estrutura para documentar APIs REST de forma padronizada e gerar documentação interativa.

Explicação:

Usuário: Inicia a interação com o sistema acessando a plataforma Rentabook por meio de um navegador da web ou aplicativo móvel.

Frontend: O frontend da aplicação, desenvolvido em React Native, apresenta a interface de usuário intuitiva e permite que os usuários naveguem pelos livros, listem seus próprios livros e iniciem interações, como compra, venda ou troca.

Backend (Spring Framework): O backend da aplicação é construído utilizando o Spring Framework e é responsável por processar as solicitações do frontend, interagir com o banco de dados MongoDB e gerenciar as operações de compra, venda e troca de livros.

Banco de Dados MongoDB: O MongoDB armazena os dados do aplicativo, incluindo informações sobre livros, usuários, transações e interações.

Ferramenta de Gerenciamento de Banco de Dados (MongoDB Compass): O MongoDB Compass é utilizada para gerenciar e visualizar os dados no banco de dados MongoDB.

IDE (IntelliJ IDEA): Utilizamos o IntelliJ IDEA para escrever, depurar e testar o código Kotlin e Spring.

Ferramenta de Teste de API (Insomnia): Utilizamos o Insomnia para testar a API, garantindo que elas funcionem corretamente e atendam aos requisitos.

Documentação de API (Swagger): O Swagger é usado para documentar a API do Rentabook, criando uma documentação interativa que os desenvolvedores e os usuários podem consultar para entender como interagir com a plataforma.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
