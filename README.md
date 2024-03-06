This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![image](https://github.com/Spatovaliyski/chatbot/assets/13628124/6e72ec87-fee2-4301-978a-6b584c583bed)

## Features
- Simple click through chat with a conversation end in the end
- No localStorage/sessionStorage/Cookie information storage, reloading the chat re-renders the workflow
- Client component for the chat logic, where otherwise it's async loaded, using Axios as the HTTP client
- Using a context provider to spread the information to various inner components

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

or run a build version:

```bash
npm run build && npm run start
# or
yarn build && yarn start
# etc
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the solution.


