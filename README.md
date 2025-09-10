# CS2 Skin Market

**CS2 Skin Market** é uma aplicação de e-commerce que simula a compra e venda de skins do jogo Counter-Strike 2 (CS2). O sistema permite aos usuários navegar, filtrar, comprar e vender skins, com a funcionalidade de login utilizando JWT (JSON Web Tokens) para autenticação.

## Tecnologias Utilizadas

- **Node.js**: Para a criação do backend da aplicação.
- **Express**: Framework para facilitar a criação de APIs RESTful.
- **JWT (JSON Web Tokens)**: Para autenticação de usuários e manutenção de sessões.
- **Postgres**: Banco de dados SQL utilizado para armazenar informações sobre os produtos e usuários.
- **Multer**: Para o upload de imagens das skins.
- **bcryptjs**: Para criptografar senhas dos usuários.
- **dotenv**: Para o gerenciamento de variáveis de ambiente.

## Funcionalidades

### 1. **Cadastro e Login de Usuário**

- Usuários podem se cadastrar e fazer login na plataforma.
- Autenticação baseada em **JWT** para garantir segurança nas sessões.
- Senhas são criptografadas com **bcryptjs**.

### 2. **Cadastro de Skins**

- Usuários podem cadastrar suas skins para venda, com informações como:
  - Nome da skin.
  - Preço.
  - Desgaste (float).
  - Imagem da skin.
  - Nome do vendedor.

### 3. **Filtros de Pesquisa**

- Filtragem de skins por:
  - Preço (faixa de valor).
  - Nome da skin.
  - Desgaste (valor numérico).
  - Float da skin.
- Pesquisa rápida por nome das skins.

### 4. **Visualização de Produtos**

- Visualização de todas as skins cadastradas, com as informações detalhadas (nome, preço, desgaste, float, imagem).

### 5. **Comércio de Skins**

- Usuários podem visualizar os detalhes de uma skin e realizar a compra.
- Informações sobre o vendedor são exibidas para maior transparência.

### 6. **Autenticação e Sessões**

- Todos os endpoints protegidos pela autenticação **JWT**.
- Usuários não autenticados não têm acesso às funcionalidades restritas.

## Estrutura do Projeto
