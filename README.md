# Product Management

## 📌 Sobre o Projeto

Este é um sistema de gerenciamento de produtos, desenvolvido com **Angular** no frontend e uma API serverless no backend. A API foi inicialmente baseada no **JSON Server**, mas agora está hospedada no **Render**, garantindo maior flexibilidade e escalabilidade.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

### **Frontend (Angular)**

- **Angular** (Framework principal)
- **TypeScript** (Linguagem principal)
- **RxJS** (Gerenciamento de estado assíncrono)
- **Angular Material** (Componentes visuais)
- **Testing Library / Jest** (Testes unitários)

### **Backend (API Serverless no Render)**

- **Node.js** (Ambiente de execução)
- **JSON Server** (Simulação de API REST)
- **CORS** (Para permitir requisições do frontend)

## 📦 Como Instalar e Rodar o Projeto

### **1️⃣ Clonando o Repositório**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### **2️⃣ Instalando as Dependências**

Execute o seguinte comando na pasta do projeto:

```bash
npm install
```

### **3️⃣ Configuração do Ambiente**

O projeto já possui um sistema de ambientes configurado em `src/environments/`:

- **`environment.ts`** → Ambiente de desenvolvimento (localhost)
- **`environment.prod.ts`** → Ambiente de produção (API hospedada no Render)

Se necessário, edite os arquivos com as URLs corretas:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://product-management-zgbh.onrender.com'
};
```

### **4️⃣ Rodando o Projeto**

Para rodar a aplicação localmente, execute:

```bash
npm start
```

Acesse: **`http://localhost:4200`**

Rodar o server localmente, execute: 

```
npm run api
```

Assim o server irá escutar **`http://localhost:3000`**


## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para utilizá-lo e modificá-lo conforme necessário.

---

📢 **Dúvidas ou sugestões?** Entre em contato!

