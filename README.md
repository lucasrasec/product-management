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

## Questionário comportamental!

Q: Você é responsável por entregar uma nova funcionalidade em uma aplicação Angular.
A data de entrega está próxima, mas você percebe que ainda existem bugs críticos que precisam ser
resolvidos antes da entrega.
Seu líder pede uma atualização na daily.

O que você faria e qual seria sua resposta?

R: Na daily, eu informo a equipe sobre os bugs críticos que foram identificados, explicando qual o impacto no funcionamento e em entregas. Também compartilho o que irei fazer ou já fiz para corrigi-los e estimo o tempo necessário para resolver as questões. Se eu perceber que o prazo pode ser comprometido, eu comunicaria o fato ao líder de forma clara e honesta, trazendo alternativas, que vão desde priorizar as correções críticas ou dividir tarefas com a equipe caso julgue que ajudaria para encurtar o tempo para a solução. Se precisar ainda ajudaria algum colega para terminar essa solução mais rápido e manter uma entrega com qualidade.

Q: Você está trabalhando em uma implementação importante e complexa em Angular e seu líder
solicita que você assuma uma tarefa emergencial que precisa ser finalizada em um curto prazo.

Como você priorizaria suas atividades e que abordagem seguiria?

R: Para começar, tentaria entender a urgência e o alcance da nova tarefa e seu efeito em relação à demanda com a qual estou trabalhando. Depois, contaria para o meu líder sobre os dois pontos, para que possamos tomar uma decisão e definir o melhor caminho a seguir.Se realmente a nova demanda for prioritária, organizaria a minha tarefa atual de modo que a interrupção não prejudique o trabalho no futuro, podendo me dedicar à nova, sem comprometer o que foi feito até aqui .Se não, eu buscaria alternativas, como dividir a demanda com outro colega ou rever o prazo, dando ênfase que ambas as entregas devem ser entregues com a qualidade necessária.

Q: Após a liberação de uma nova funcionalidade para produção, os usuários começam a relatar
problemas. Você é acionado para resolver a situação.

Quais ações tomaria do momento em que os problemas foram reportados até a solução final?

R: Após a identificação do problema a primeira ação seria coletar o maximo de informação sobre o que está acontecendo. Coletando essas informações com uusário ou verificando logs e monitorando erros, após esaas identificações procuraria reprozir o erro em um ambiente controlado. Com o problema identificado comunicaria a equipe e os interessados sobre a situação para verificar a necessidade de alguma tomada de decisão como um rollback na funcionalidade.

Com a comunicação realizada e o problema identificado começaria a trabalhar na correção garantindo que a solução seja testada adequadamente antes de ser aplicada em produção. Com a solução liberada veria a necessidade de ficar em alerta por um tempo acompanhando os usuários para garantir que o problema não volte a ocorrer.

Q: Durante a implementação de uma funcionalidade crítica, surgem atrasos devido a especificações
não claras.
Você estima um atraso de um dia na entrega planejada.

Como você informaria essa situação à equipe e qual seria seu plano de ação?

R: Primeiramente, eu comunicaria o time sobre os atrasos, explicando, claramente, que as especificações não estavam suficientemente claras e essas causaram o atraso. Desta forma, eu destacaria o impacto no cronograma, indicando que a entrega seria postergada em um dia. Em seguida, eu tentaria esclarecer as especificações o mais rápido possível, convocando uma reunião com o líder ou responsáveis para garantir que todos os pontos pendentes estejam alinhados. Também manteria a equipe informada sobre o progresso e garantiria que todos os envolvidos estivessem de acordo com as novas definições. Por fim, eu tomaria todas as medidas que fossem necessárias para que o atraso de um dia não se tornasse um problema maior.
