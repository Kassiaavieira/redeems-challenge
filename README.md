# Projeto Next.js

Este é um projeto [Next.js](https://nextjs.org) criado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Deploy no Vercel

```
https://redeems-challenge.vercel.app
```

## Funcionalidades

- Desenvolvido totalmente com [Next.js](https://nextjs.org)
- Integração com a API [ViaCEP](https://viacep.com.br) para preenchimento automático de endereço pelo CEP
- Configuração de chaves de API para comunicação

## Variáveis de Ambiente

Antes de rodar o projeto, configure as seguintes variáveis de ambiente no arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_BASE=https://api.lobby.example.com
NEXT_PUBLIC_API_KEY=PUT_YOUR_API_KEY_HERE
NEXT_PUBLIC_CLIENT_NAME=Lobby
```

> Substitua `PUT_YOUR_API_KEY_HERE` pela sua chave de API real.

## Instalação do Projeto

Siga os passos abaixo para instalar e rodar o projeto localmente:

1. **Clone o repositório:**

```bash
git clone <https://github.com/Kassiaavieira/redeems-challenge.git>
```

2. **Acesse a pasta do projeto:**

```bash
cd nome-do-projeto
```

3. **Instale as dependências:**

```bash
npm install
# ou
yarn
# ou
pnpm install
```

4. **Configure as variáveis de ambiente**  
Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis mencionadas acima.

## Executando o Projeto

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.  
Você pode começar a editar a página modificando `app/page.tsx`. A página será atualizada automaticamente conforme você salva as alterações.

## Aprender Mais

Para saber mais sobre Next.js, confira os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre os recursos e a API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - tutorial interativo de Next.js.
- [Repositório do Next.js no GitHub](https://github.com/vercel/next.js) - contribuições e feedback são bem-vindos!

