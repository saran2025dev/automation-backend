import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { chromium } from 'playwright';
import PlaywrightUtils from 'src/utils/PlaywrightUtils';
import { Repository } from 'typeorm';
import { CreateAutoProcessDto } from './dto/create-auto-process.dto';
import { DynamicValuesDto } from './dto/dynamic-value.dto';

@Injectable()
export class AutoProcessService {


  async methodDropDown() {
    return PlaywrightUtils.methods;
  }

  async run(value: string) {
    const steps: Step[] = [
      { method: 'gotoGemini', url: 'https://gemini.google.com/app'},
      { method: 'fillInput', selector: "//div[@role='textbox']", value },
      { method: 'clickElement', selector: "//button[@aria-label='Send message']" },
      {
        method: 'print',
        selector:
          "//div[starts-with(@id,'model-response-message-content')]",
      },
    ];
 
    const result = await this.Geminitest(steps);
    return   result ;
  }

    async Geminitest(steps: Step[]) {

    const browser = await chromium.launch({ headless: true });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.context().clearCookies();
 
    const flow = {

      id: '3',

      name: 'Gemini',

      product: 'GPT',

      steps,

    };
 
    const data = await PlaywrightUtils.performActions(
      page,
      flow,
    );
 

    await browser.close();
 
    return data;

  }
 

}
