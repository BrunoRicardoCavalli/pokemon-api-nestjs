# Pokémon Teams API - NestJS

API REST desenvolvida como solução para o **Case Técnico de Desenvolvedor Backend Jr da Leany**.

A aplicação foi construída utilizando **NestJS**, **TypeScript**, **PostgreSQL** e **TypeORM**, permitindo o gerenciamento de treinadores, seus times e os Pokémon pertencentes a cada equipe.

Os dados dos treinadores e times são persistidos em um banco PostgreSQL, enquanto as informações dos Pokémon são obtidas em tempo real através da **PokéAPI**.

---

# Tecnologias Utilizadas

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Axios
- Swagger (OpenAPI)
- Jest
- class-validator
- class-transformer
- PokéAPI

---

# Funcionalidades

## Treinadores

- Criar treinador
- Listar treinadores
- Buscar treinador por ID
- Atualizar treinador
- Remover treinador

## Times

- Criar time para um treinador
- Listar times de um treinador
- Buscar time por ID
- Atualizar time
- Remover time

## Pokémon

- Adicionar Pokémon ao time
- Remover Pokémon do time
- Listar Pokémon do time
- Buscar Pokémon por nome ou ID
- Buscar Pokémon por tipo
- Retornar um Pokémon aleatório

---

# Regras de Negócio

- Um treinador pode possuir vários times.
- Um time pertence a apenas um treinador.
- Cada time pode conter no máximo **6 Pokémon**.
- Não é permitido adicionar Pokémon inexistentes.
- Antes da inclusão, a API consulta a PokéAPI para validar o Pokémon informado.
- Ao listar um time, os dados dos Pokémon são enriquecidos utilizando a PokéAPI.
- Não é permitido adicionar o mesmo Pokémon duas vezes ao mesmo time.

---

# Arquitetura

A aplicação segue a arquitetura em camadas recomendada pelo NestJS.

```
                HTTP Request
                     │
                     ▼
              Controllers
                     │
                     ▼
                Services
              ┌─────────────┐
              │             │
              ▼             ▼
        PostgreSQL      PokéAPI
        (TypeORM)      (Axios)
```

Cada camada possui responsabilidade única:

- **Controllers** recebem as requisições HTTP.
- **Services** implementam as regras de negócio.
- **Repositories (TypeORM)** realizam a persistência dos dados.
- **PokéAPI** fornece as informações completas dos Pokémon.

---

# Banco de Dados

A aplicação utiliza **PostgreSQL** executando através do Docker.

Inicie o banco:

```bash
docker compose up -d
```

---

# Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=pokemon_teams
```

---

# Instalação

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

Suba o banco:

```bash
docker compose up -d
```

Execute a aplicação:

```bash
npm run start:dev
```

---

# Documentação da API

Após iniciar a aplicação:

```
http://localhost:3000/api
```

A documentação completa está disponível através do **Swagger**.

---

# Endpoints

## Trainers

```
POST   /trainers
GET    /trainers
GET    /trainers/{id}
PATCH  /trainers/{id}
DELETE /trainers/{id}
```

## Teams

```
POST   /trainers/{trainerId}/teams
GET    /trainers/{trainerId}/teams
GET    /teams/{id}
PATCH  /teams/{id}
DELETE /teams/{id}
```

## Team Pokémon

```
POST   /teams/{teamId}/pokemons
GET    /teams/{teamId}/pokemons
DELETE /teams/{teamId}/pokemons/{pokemonTeamId}
```

## Pokémon

```
GET /pokemon
GET /pokemon/random
GET /pokemon/{nameOrId}
GET /pokemon/type/{type}
```

---

# Estrutura do Projeto

```
src
│
├── pokemon
├── trainer
├── team
├── team-pokemon
│
├── app.module.ts
└── main.ts
```

---

# Validações

A API utiliza:

- ValidationPipe Global
- class-validator
- class-transformer

Todas as entradas são validadas automaticamente antes da execução das regras de negócio.

---

# Integração com a PokéAPI

A aplicação realiza consultas à PokéAPI para:

- Validar se o Pokémon existe.
- Buscar nome.
- Buscar tipos.
- Buscar habilidades.
- Buscar sprite (imagem).

Documentação oficial:

https://pokeapi.co/

---

# Testes

O projeto possui testes unitários utilizando **Jest**.

Executar todos os testes:

```bash
npm test
```

Resultado esperado:

```
Test Suites: 8 passed, 8 total
Tests:       12 passed, 12 total
```

Gerar o build da aplicação:

```bash
npm run build
```

---

# Melhorias Implementadas

- Arquitetura em camadas utilizando NestJS.
- Integração com API externa (PokéAPI).
- DTOs para entrada e saída de dados.
- Validação automática utilizando ValidationPipe.
- Tratamento de exceções.
- Documentação com Swagger.
- Testes unitários utilizando Jest.
- Mocks das dependências externas nos testes.
- Validação para impedir Pokémon duplicados no mesmo time.

---

# Autor

**Bruno Ricardo Cavalli**

GitHub:  
https://github.com/BrunoRicardoCavalli

LinkedIn:  
https://www.linkedin.com/in/bruno-cavalli/