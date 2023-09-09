# Full Stack E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MySQL, 2023


This is a repository for a Full Stack E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, Azure SQL with Sql Server

[VIDEO LINK](https://drive.google.com/drive/folders/1bx-68Fzv9aq4WTmuRhgxezCUfFeeqwrh?usp=sharing)

Key Features:

-[x] We will be using Shadcn UI for the Admin!
-[x] Our admin dashboard is going to serve as both CMS, Admin and API!
-[x] You will be able to control mulitple vendors / stores through this single CMS! (For example you can have a "Shoe store" and a "Laptop store" and a "Suit store", and our CMS will generate API routes for all of those individually!)
-[x] You will be able to create, update and delete categories!
-[x] You will be able to create, update and delete products!
-[x] You will be able to upload multiple images for products, and change them whenever you want!
-[x] You will be able to create, update and delete filters such as "Color" and "Size", and then match them in the "Product" creation form.
-[x] You will be able to create, update and delete "Billboards" which are these big texts on top of the page. You will be able to attach them to a single category, or use them standalone (Our Admin generates API for all of those cases!)
-[x] You will be able to Search through all categories, products, sizes, colors, billboards with included pagination!
-[x] You will be able to control which products are "featured" so they show on the homepage!
-[x] You will be able to see your orders, sales, etc.
-[ ] You will be able to see graphs of your revenue etc.
-[x] You will learn NextAuth for authentication!
-[ ] Order creation
-[ ] Stripe checkout
-[ ] Stripe webhooks
-[x] Azure SQL + Prisma + Azure SQL Database Servers


## Using Azure SQL Database and Server Service 
- 1. Create an Azure SQL Database:
  - Sign in to your Azure portal.
  - Click on "Create a resource" or navigate to the "SQL databases" service.
  - Follow the wizard to configure your database, including choosing the performance tier (DTUs or vCores), specifying a server, setting up security (firewalls, authentication), and defining database options.
  
- 2. Connect to Your Azure SQL Database:
  - Once your database is created, you can connect to it using various tools and methods:
  - Azure Portal: You can use the Azure portal's query editor for basic database interactions.
  - SQL Server Management Studio (SSMS): Connect to your Azure SQL Database using SSMS.
  - Azure Data Studio: A cross-platform tool that allows you to connect to and manage Azure SQL Databases.
  - Connection Strings: You'll need connection strings (server name, database name, authentication details) to connect from applications.

- Azure SQL Database Schema
  - Database Contains 11 Relational Tables 
  - Tables are Users , Accounts , Store , Billboard , Category , Product , Size , Color , Order , OrderItem , Image
  - User: Relational Model keeps records of all users Authorized to our website
  - Accounts: Relational Model kepps records of Authentication of users through google provider
  - Store: This Table keeps record of stores for a particular user
  - Billboard: This Table keeps records of billboards under every stores for a particular user
  - Category: This table keeps records of categories we have in a store
  - Sizes: This table keeps records of all variety of sizes we want to store for a particular store which we use for products
  - Colors:  This table keeps records of all variety of colors we want to store for a particular store which we use for products
  - Products: This relation keeps records of all product under partivular category and store with certain colors and size which were already recorded
  - Orders: All orders made by customers from customer panel
  - Image: All the records for image links corresponds to products

## Using Azue Static Web Apps Service
Started fast and finish faster with source code integration from GitHub, live debugging, and one-click publish directly from Microsoft Visual Studio IDE. Easily connect to your database of choice, and tap into an ecosystem of OSS packages, APIs, connectors, and services through the Azure Marketplace, expediting development. Quickly add custom domains and SSL, single sign-on (SSO) integration with popular identity providers, and application health monitoring to your apps with the Azure portal.
1. Create a Web App: Log in to the Azure portal (portal.azure.com) and click on "Create a resource." Search for "Web App" and click on "Create" to start the creation process.
2. Configure Web App Settings: In the creation wizard, you'll need to provide details such as the subscription, resource group, and a unique name for your Web App. You'll also need to select the operating system (Windows or Linux) and the runtime stack (e.g., Node.js, .NET, Python, PHP, etc.) that your website requires.
3. Configure App Service Plan: An App Service Plan defines the location, size, and scale of the underlying infrastructure for your Web App. You can choose an existing plan or create a new one.
4. Deployment Options: Once the Web App is created, go to the "Deployment Center" in the Azure portal. Here, you can choose from various deployment options, such as Azure Pipelines, GitHub, Bitbucket, Local Git, or FTP. Select the option that suits your development workflow and connect your repository.
5. Configure Deployment Source: Configure the deployment source, and Azure will automatically build and deploy your website whenever you push changes to the connected repository.
6. Configure Custom Domains (Optional): If you have a custom domain for your website, you can configure it in the "Custom Domains" section of the Web App settings.
7. Enable HTTPS (Optional): You can enable HTTPS for your website by configuring a TLS/SSL certificate. Azure also provides a free certificate through Azure App Service Managed Certificates.
8. Scaling and Monitoring (Optional): Depending on your website's traffic, you can configure scaling options to automatically adjust the number of instances to handle increased load. Additionally, you can set up monitoring and alerts to keep track of the website's performance.
9. Testing and Verification: Once the deployment is complete, you can access your website using the URL provided in the Web App overview. Test the website thoroughly to ensure it works as expected.

![Website Screenshot](https://github.com/OPTIMUS-PRIME2001/MFRT_Project/blob/master/public/images/Website_%20Screenshot.jpeg)



### Prerequisites

**Node version 16.x**

### Cloning the repository

```shell
git clone https://github.com/OPTIMUS-PRIME2001/ECommerce.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

### Connect to Azure SQL Database and Push Prisma
```shell
npx prisma generate
npx prisma db push
```

## Initial ReadMe Commit By Nextjs 13
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
