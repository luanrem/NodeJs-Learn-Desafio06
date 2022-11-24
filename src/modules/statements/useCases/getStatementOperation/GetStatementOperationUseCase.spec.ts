import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import { GetStatementOperationUseCase } from './GetStatementOperationUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

let getStatementOperationUseCase: GetStatementOperationUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let statementsRepositoryInMemory: InMemoryStatementsRepository;

describe("Get Statement Operation", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository()
    statementsRepositoryInMemory = new InMemoryStatementsRepository()
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepositoryInMemory,
      statementsRepositoryInMemory
    )
  })


  it("should be able to get a specific statement operation from an user_id", async () => {
    const newUser = await usersRepositoryInMemory.create({
      name: "Johnny Lawson",
      email: "bedarci@zejowan.bj",
      password: "1234",
    })

    const { user_id, id } = await statementsRepositoryInMemory.create({
      user_id: newUser.id,
      amount: 20,
      type: "deposit" as OperationType,
      description: "description"
    })


    const response = await getStatementOperationUseCase.execute({ user_id, statement_id: id })

    expect(response).toHaveProperty("id")
    expect(response).toHaveProperty("user_id")
    expect(response).toHaveProperty("amount")
    expect(response).toHaveProperty("type")
    expect(response).toHaveProperty("description")
  });

  it("should not be able to get statement with inexistent user", async () => {
    const newUser = await usersRepositoryInMemory.create({
      name: "Johnny Lawson",
      email: "bedarci@zejowan.bj",
      password: "1234",
    })

    const { id } = await statementsRepositoryInMemory.create({
      user_id: newUser.id,
      amount: 20,
      type: "deposit" as OperationType,
      description: "description"
    })

    expect(async () => {
      await getStatementOperationUseCase.execute({ user_id: "337155451", statement_id: id })
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to get statement with inexistent statement_id", async () => {
    const newUser = await usersRepositoryInMemory.create({
      name: "Johnny Lawson",
      email: "bedarci@zejowan.bj",
      password: "1234",
    })

    expect(async () => {
      await getStatementOperationUseCase.execute({ user_id: newUser.id, statement_id: "318102349" })
    }).rejects.toBeInstanceOf(AppError);
  });


})
