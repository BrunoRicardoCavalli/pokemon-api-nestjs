# Pokémon Teams API - NestJS

API REST desenvolvida como solução para o **Case Técnico de Desenvolvedor Backend Jr da Leany**.

A aplicação foi construída utilizando **NestJS**, **PostgreSQL** e **TypeORM**, permitindo o gerenciamento de treinadores, seus times de Pokémon e os Pokémon pertencentes a cada time.

Os dados dos treinadores, times e equipes são persistidos localmente no PostgreSQL, enquanto as informações dos Pokémon são obtidas em tempo real através da **PokéAPI**.

---

# Tecnologias utilizadas

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Axios
- Swagger (OpenAPI)
- class-validator
- class-transformer
- PokéAPI

---

# Funcionalidades

### Treinadores

- Criar treinador
- Listar treinadores
- Buscar treinador por ID
- Atualizar treinador
- Remover treinador

### Times

- Criar time para um treinador
- Listar times de um treinador
- Buscar time por ID
- Atualizar time
- Remover time

### Pokémon

- Adicionar Pokémon ao time
- Remover Pokémon do time
- Listar Pokémon do time
- Buscar Pokémon por nome ou ID
- Buscar Pokémon por tipo
- Retornar Pokémon aleatório

### Regras de negócio

- Um treinador pode possuir vários times.
- Um time pertence a apenas um treinador.
- Um time pode conter no máximo **6 Pokémon**.
- Antes de adicionar um Pokémon ao time é realizada uma validação na PokéAPI para verificar se ele realmente existe.
- Ao listar os Pokémon do time, a API retorna informações enriquecidas diretamente da PokéAPI.

---

# Tecnologias e Arquitetura

A aplicação segue a arquitetura em camadas recomendada pelo NestJS.

```
Controller
      │
      ▼
Service
      │
      ├── PostgreSQL (TypeORM)
      │
      └── PokéAPI
```

Cada camada possui responsabilidade única:

- **Controllers** recebem as requisições HTTP.
- **Services** concentram toda a regra de negócio.
- **Repositories (TypeORM)** realizam a comunicação com o banco de dados.
- **PokéAPI** fornece os dados completos dos Pokémon.

---

# Banco de Dados

A aplicação utiliza **PostgreSQL** executando através do Docker.

## docker-compose.yml

```bash
docker compose up -d
```

---

# Variáveis de ambiente

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

Suba o banco utilizando Docker:

```bash
docker compose up -d
```

Execute a aplicação:

```bash
npm run start:dev
```

---

# Documentação

Após iniciar a aplicação:

```
http://localhost:3000/api
```

Toda a documentação está disponível através do **Swagger**.

---

# Principais Endpoints

## Trainer

```
POST   /trainers
GET    /trainers
GET    /trainers/{id}
PATCH  /trainers/{id}
DELETE /trainers/{id}
```

---

## Team

```
POST   /trainers/{trainerId}/teams
GET    /trainers/{trainerId}/teams
GET    /teams/{id}
PATCH  /teams/{id}
DELETE /teams/{id}
```

---

## Team Pokémon

```
POST   /teams/{teamId}/pokemons
GET    /teams/{teamId}/pokemons
DELETE /teams/{teamId}/pokemons/{pokemonTeamId}
```

---

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

As entradas são validadas automaticamente antes de chegarem aos serviços.

---

# Integração com a PokéAPI

A aplicação realiza consultas à PokéAPI para:

- Validar se um Pokémon existe.
- Buscar nome.
- Buscar tipos.
- Buscar habilidades.
- Buscar sprite (imagem).

Documentação oficial:

https://pokeapi.co/

---

# Autor

**Bruno Ricardo Cavalli**

GitHub

https://github.com/BrunoRicardoCavalli

LinkedIn

https://www.linkedin.com/in/bruno-cavalli/