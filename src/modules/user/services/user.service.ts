import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { QueryParamsDto } from 'src/common/dtos/queryOptions.dto';
import { UserRegisterDto } from 'src/modules/admin/dtos/registerUser.dto';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UserEntity } from '../entities';
import { CreatedFailedException } from '../exceptions/createdFailed.exception';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private _userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private _authService: AuthService,
  ) {}

  public async createUser(
    userRegisterDto: UserRegisterDto,
  ): Promise<UserEntity> {
    try {
      const user = this._userRepository.create(userRegisterDto);
      await this._userRepository.save(user);

      return user;
    } catch ({ message }) {
      throw new CreatedFailedException(message);
    }
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    const queryBuilder = this._userRepository.createQueryBuilder('user_alias');

    try {
      const user = await queryBuilder
        .where('user_alias.email = :email', { email })
        .getOneOrFail();

      return user;
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  public async findUserById(userId: number): Promise<UserEntity> {
    return await this._userRepository.findOne({
      where: { id: userId },
    });
  }

  public async findAllUsers(
    queryParamsDto: QueryParamsDto,
  ): Promise<Array<UserEntity>> {
    const { take } = queryParamsDto;
    const queryBuilder = this._userRepository.createQueryBuilder();
    const users = await queryBuilder.take(take).getMany();

    return users;
  }
}
