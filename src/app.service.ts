import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import { Testcase } from './testcase/entities/testcase.entity';
import PlaywrightUtils from './utils/PlaywrightUtils';

@Injectable()
export class AppService {

  async test(step:Step[]) {
    const browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();
    const page = await context.newPage();

    const chola_Bike:Testcase = {

      "id": "2",
      "name": "Coverfox",
      "product": "car",
      "createdBy":"test",
      "steps":step
    }

    await PlaywrightUtils.performActions(
      page,
      chola_Bike,
    );
    await page.waitForTimeout(5000);
    await context.close();
    await browser.close();

    return 'created succesfully';
  }
}
