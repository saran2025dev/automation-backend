import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chromium } from 'playwright';
import PlaywrightUtils from 'src/utils/PlaywrightUtils';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateTestcaseDto, StepsDto } from './dto/create-testcase.dto';
import { Testcase } from './entities/testcase.entity';

@Injectable()
export class TestcaseService {
  constructor(
    @InjectRepository(Testcase)
    private readonly autoProcessRepository: Repository<Testcase>,
  ) {}

  async methodDropDown() {
    return PlaywrightUtils.methods;
  }

  async create(dto: CreateTestcaseDto) {
    const createdScript = this.autoProcessRepository.create({ ...dto });
    return await this.autoProcessRepository.save(createdScript);
  }

  async find() {
    return await this.autoProcessRepository.find({
      where: [{ createdBy: Not(IsNull()) }],
    });
  }

  async runSingleTestCase(step: StepsDto) {
    const browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();
    const page = await context.newPage();

    const testcase: Testcase = {
      id: '1',
      name: 'Name',
      product: 'Google',
      createdBy: 'Dev',
      steps: step.steps,
    };

    await PlaywrightUtils.performActions(page, testcase);
    await page.waitForTimeout(5000);
    await context.close();
    await browser.close();

    return 'created succesfully';
  }
  
}
