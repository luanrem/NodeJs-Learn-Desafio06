import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfile: ShowUserProfileUseCase;

describe("Show user profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfile = new ShowUserProfileUseCase(usersRepositoryInMemory)
  });

  it("should be able to show user profile", async () => {
    const newUser: ICreateUserDTO = {
      name: "Test",
      email: "user@test.com",
      password: "1234",
    };

    const user = await createUserUseCase.execute(newUser);

    const response = await showUserProfile.execute(user.id)

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("email");
    expect(response).toHaveProperty("name");

  })

})
