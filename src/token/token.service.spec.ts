import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { PrismaService } from 'nestjs-prisma';

describe('tokenService', () => {
  let tokenService: TokenService;
  let prisma: DeepMocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: PrismaService,
          useValue: createMock<PrismaService>(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    tokenService = module.get<TokenService>(TokenService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });
});
