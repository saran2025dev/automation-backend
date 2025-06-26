import { Test, TestingModule } from '@nestjs/testing';
import { SuiteMapController } from './suite-map.controller';
import { SuiteMapService } from './suite-map.service';

describe('SuiteMapController', () => {
  let controller: SuiteMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuiteMapController],
      providers: [SuiteMapService],
    }).compile();

    controller = module.get<SuiteMapController>(SuiteMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
