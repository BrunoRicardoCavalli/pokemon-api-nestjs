# Pokémon API - NestJS

API REST desenvolvida como solução para o Case Técnico de Desenvolvedor Backend Jr da Leany.

A aplicação foi construída utilizando **NestJS** e realiza integração com a **PokéAPI**, permitindo consultar informações sobre Pokémon, listar Pokémon com paginação, pesquisar por tipo e obter um Pokémon aleatório.

---

## Tecnologias utilizadas

- NestJS
- TypeScript
- Axios
- Swagger
- PokéAPI

---

## Funcionalidades

- Listagem de Pokémon com paginação
- Busca de Pokémon por nome ou ID
- Busca de Pokémon por tipo
- Retorno de um Pokémon aleatório
- Documentação automática utilizando Swagger
- Tratamento de erros para recursos inexistentes

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/BrunoRicardoCavalli/pokemon-api-nestjs.git
```

Entre na pasta:

```bash
cd pokemon-api-nestjs
```

Instale as dependências:

```bash
npm install
```

---

## Executando o projeto

Modo desenvolvimento:

```bash
npm run start:dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

## Documentação da API

Após iniciar o projeto, acesse:

```
http://localhost:3000/api
```

A documentação Swagger permite testar todos os endpoints diretamente pelo navegador.

---

## Endpoints

### Listar Pokémon

```
GET /pokemon
```

Exemplo:

```
GET /pokemon?limit=10&offset=0
```

---

### Buscar Pokémon por nome ou ID

```
GET /pokemon/{nameOrId}
```

Exemplos:

```
GET /pokemon/pikachu

GET /pokemon/25
```

---

### Buscar Pokémon por tipo

```
GET /pokemon/type/{type}
```

Exemplo:

```
GET /pokemon/type/fire
```

---

### Pokémon aleatório

```
GET /pokemon/random
```

---

## Tratamento de erros

Caso um Pokémon ou tipo não exista, a API retorna:

```
404 Not Found
```

---

## Estrutura do projeto

```
src/
│
├── main.ts
├── app.module.ts
│
└── pokemon/
    ├── pokemon.controller.ts
    ├── pokemon.module.ts
    ├── pokemon.service.ts
```

---

## Arquitetura

A aplicação segue a arquitetura recomendada pelo NestJS:

```
Controller
        │
        ▼
Service
        │
        ▼
PokéAPI
```

O Controller é responsável por receber as requisições HTTP, enquanto o Service concentra toda a lógica de negócio e comunicação com a PokéAPI.

---

## Autor

Bruno Ricardo Cavalli

GitHub:
https://github.com/BrunoRicardoCavalli

LinkedIn:
https://www.linkedin.com/in/bruno-cavalli/