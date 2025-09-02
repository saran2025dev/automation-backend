import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';
import { configService } from 'src/config/config.service';
import { AutoProcessService } from './auto-process.service';
import { CreateAutoProcessDto } from './dto/create-auto-process.dto';
import { DynamicValuesDto } from './dto/dynamic-value.dto';
import { RunAutomationDto } from './dto/automatio-run-dto';

@Controller('auto-process')
export class AutoProcessController {
  constructor(private readonly autoProcessService: AutoProcessService) {}



  @Get('methods')
  methods() {
    return this.autoProcessService.methodDropDown();
  }

  


  @Post('gemini-run')
  async run(@Body() { value }: RunAutomationDto) {
    // only pass value; service constructs steps & executes
    return this.autoProcessService.run(value);
  }
}
