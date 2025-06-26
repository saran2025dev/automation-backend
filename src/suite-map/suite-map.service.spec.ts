import { Test, TestingModule } from '@nestjs/testing';
import { SuiteMapService } from './suite-map.service';

describe('SuiteMapService', () => {
  let service: SuiteMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuiteMapService],
    }).compile();

    service = module.get<SuiteMapService>(SuiteMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
