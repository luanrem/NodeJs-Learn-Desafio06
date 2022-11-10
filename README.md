![ignite image](.github/cover-node.js.png)

#  Chapter III - Desafio 01: Database Queries :rocket: :purple_heart:

## :golf: Objective

In this challenge, you must create unit tests for a ready-made application using everything you've learned about testing so far.

- Unit Test
- Integration Test
- Database

## :white_check_mark: Requirements 


### Application Routes 

#### Post
_/api/v1/users_
- [ ] The route receives **name**, **email** and **password** within the body of the request, saves the user created in the database and returns an empty response with status **201**.

#### Post
_/api/v1/sessions_

- [ ] The route receives **email** and **password** in the body of the request and returns the authenticated user's data along with a JWT token.

#### Get
_/api/v1/profile_

- [ ] The route receives a JWT token through the request header and returns the authenticated user's information.

#### Get
_/api/v1/statements/balance_

- [ ] The route receives a JWT token through the request header and returns a list of all the authenticated user's deposit and withdrawal operations and also the total balance in a **balance** property.

#### Post
_/api/v1/statements/deposit_

- [ ] The route receives a JWT token by the header and **amount** and **description** in the request body, records the value deposit operation and returns the information of the created deposit with status **201**.

#### Post
_/api/v1/statements/withdraw_

- [ ] The route receives a JWT token by the header and **amount** and **description** in the body of the request, records the amount withdrawal operation (if the user has a valid balance) and returns the information of the withdrawal created with status 201.

#### Get
_/api/v1/statements/:statement_id_

- [ ] The route receives a JWT token by the header and the id of a registered operation (withdrawal or deposit) in the URL of the route and returns the information of the operation found.

### Test Specifications

building
