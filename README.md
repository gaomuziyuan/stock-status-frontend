This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## User Login

Adam(admin):  
username: Adam, password: Adam

Jane(manager):  
username: Jane, password: Jane

Painter(member):  
username: Painter, password: Painter

John(senior):  
username: John, password: John

## Business Logic

**Adam(admin):**

Adam can manage users' role and enable/disable user login.

**_Role management:_**

Search the role first and press enter to change the role.

**_Login permission:_**

Switch to enable/disable user's access to the web app.

**Jane(manager):**

Jane can drag and drop paint card to different kanban lanes

**Painter(member):**

Painter can update the stock of paint cards at Inventory

**John(Senior):**

John can view the stock of paint cards

John(senior):  
username: John, password: John

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on Heroku

**_paint-kanban-frontend.yml_**
