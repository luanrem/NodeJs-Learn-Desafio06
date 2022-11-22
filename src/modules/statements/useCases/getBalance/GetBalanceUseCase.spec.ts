import { CreateStatementUseCase } from './../createStatement/CreateStatementUseCase';
import "reflect-metadata"
import { CreateUserUseCase } from './../../../users/useCases/createUser/CreateUserUseCase';
import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { AppError } from '../../../../shared/errors/AppError';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

let getBalanceUseCase: GetBalanceUseCase;
let statementsRepository: InMemoryStatementsRepository;
let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Get Balance", () => {

  beforeEach(() => {
    statementsRepository = new InMemoryStatementsRepository()
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepository)
    createStatementUseCase = new CreateStatementUseCase(usersRepository, statementsRepository)
  })


  it("should be able to get a balance", async () => {
    const user = await createUserUseCase.execute({
      name: "Johnny Lawson",
      email: "bedarci@zejowan.bj",
      password: "1234",
    });

    await createStatementUseCase.execute({
      user_id: user.id,
      amount: 20,
      type: "deposit" as OperationType,
      description: "description"
    });

    const balance = await getBalanceUseCase.execute({ user_id: user.id })

    expect(balance).toHaveProperty("statement")
    expect(balance).toHaveProperty("balance")
  });

  it("should not be able to get balance from a inexistent user", () => {

    expect(async () => {
      await getBalanceUseCase.execute({ user_id: "2804998645" });
    }).rejects.toBeInstanceOf(AppError);
  })
})
