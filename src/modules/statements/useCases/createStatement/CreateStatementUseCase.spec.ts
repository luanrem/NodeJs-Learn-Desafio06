import { CreateStatementUseCase } from './CreateStatementUseCase';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { ICreateStatementDTO } from './ICreateStatementDTO';
import { AppError } from '../../../../shared/errors/AppError';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

let statementsRepositoryInMemory: InMemoryStatementsRepository
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase

describe("Create Statement", () => {

  beforeEach(() => {
    statementsRepositoryInMemory = new InMemoryStatementsRepository()
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepositoryInMemory)
  })

  it("should be able to create a new statement", async () => {
    const newUser: ICreateUserDTO = {
      name: "Marc Cummings",
      email: "fum@zoafo.gg",
      password: "1234",
    };

    const user = await createUserUseCase.execute(newUser);

    const type = "deposit" as OperationType

    const statement: ICreateStatementDTO = {
      user_id: user.id,
      amount: 20,
      type,
      description: "description"
    }

    const statementCreated = await createStatementUseCase.execute(statement);

    expect(statementCreated).toHaveProperty("id")
    expect(statementCreated).toHaveProperty("user_id")
    expect(statementCreated).toHaveProperty("amount")
    expect(statementCreated).toHaveProperty("type")
    expect(statementCreated).toHaveProperty("description")
  })

  it("should not be able to create a statement with a inexistent user", async () => {
    const type = "deposit" as OperationType

    const statement: ICreateStatementDTO = {
      user_id: "3818995447",
      amount: 20,
      type,
      description: "description"
    }

    expect(async () => {
      await createStatementUseCase.execute(statement);
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to withdraw if balance is less than amount", async () => {
    const newUser: ICreateUserDTO = {
      name: "Lulu Wade",
      email: "ro@hahamti.pn",
      password: "2870421770",
    };

    const user = await createUserUseCase.execute(newUser);

    await createStatementUseCase.execute({
      user_id: user.id,
      amount: 20,
      type: "deposit" as OperationType,
      description: "description"
    });


    expect(async () => {
      await createStatementUseCase.execute({
        user_id: user.id,
        amount: 40,
        type: "withdraw" as OperationType,
        description: "description"
      });
    }).rejects.toBeInstanceOf(AppError);

  })
})
