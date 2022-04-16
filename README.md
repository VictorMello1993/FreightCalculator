# Freight Calculator

![Screenshot_3](/uploads/6e5c20e2454018db176b8efad7b9f3ba/Screenshot_3.png)

</br>

![Screenshot_4](/uploads/16502f0f56998f3270c9c17722e1e175/Screenshot_4.png)


O projeto em questão visa calcular o valor do frete e o prazo de entrega (em dias úteis) da encomenda utilizando API dos Correios.


## Bibliotecas utilizadas

* <a href="https://create-react-app.dev/">React</a>
* <a href="https://reactstrap.github.io/?path=/story/home-installation--page">Reactstrap</a>
* <a href="https://formik.org/docs/overview">Formik</a>
* <a href="https://styled-components.com/">Styled components</a>
* <a href="https://www.npmjs.com/package/yup?activeTab=readme">Yup</a>
* <a href="https://www.npmjs.com/package/react-input-mask">React Input Mask</a>
* <a href="https://www.npmjs.com/package/axios">Axios</a>
* <a href="https://react-icons.github.io/react-icons/">React Icons</a>
* <a href="https://www.npmjs.com/package/correios-brasil">Correios Brasil</a>
* <a href="https://www.npmjs.com/package/dotenv">Dotenv</a>
* <a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a>
* <a href="https://www.npmjs.com/package/jwt-decode">jwt-decode</a>
* <a href="https://www.npmjs.com/package/nodemon">Nodemon</a>

## Executando o projeto

1. Clone o repositório
```sh
   git clone https://gitlab.com/pos-fullstack-2022-01/projeto-interfaces-victor-mello.git
```

2. Instale todas as dependências do projeto
```sh
   # Usando npm
   npm install

   #Usando yarn
   yarn
```

3. Execute o projeto front-end
```sh
   # Usando npm
   npm run start

   #Usando yarn
   yarn start
```

4. Execute o projeto back-end. Para isso, é preciso dividir o terminal em dois, um para rodar o front-end (conforme o passo 3), e outro para back-end. Nesse último terminal, navegar para a pasta raíz onde está toda a implementação do back-end e rodar o comando abaixo:
```sh
   # Usando npm
   npm run dev

   #Usando yarn
   yarn dev
```

Foi implementado como plus a autenticação com Redux consumo de API do Strapi para fins de estudos. Neste último caso, a URL base de acesso é 
```http://localhost:1337/api```. Basta adicionar essa URL nas variáveis de ambiente em um arquivo .env na variável ```REACT_APP_API_STRAPI```, na raíz do projeto. Porém, antes de chegar nessa implementação, inicialmente foi criada uma micro API responsável com a mesma finalidade de login e validação do token. A URL base é ```http://localhost:3002```. Basta incluí-la no ```.env``` na variável ```REACT_APP_API```. É preciso criar a variável de ambiente ```REACT_APP_API_LOCATION``` que diferencia o tipo de API que está sendo utilizado. Se ela estiver setada como ```local```, o back-end irá executar na porta 3002. Caso queira executar o Strapi, seta como ```strapi```.
