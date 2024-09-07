import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Query,
  Redirect,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { CreateCatDto, ListAllEntities } from './module/catModule';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('breed')
  async getHello(@Res({ passthrough: true }) res: Response): Promise<string> {
    // res.status(HttpStatus.OK).send(this.appService.getHello('เสือก'));
    res.status(HttpStatus.CREATED);
    return this.appService.getHello('เสือก');
  }

  @Get('test')
  findAll(@Req() request: Request): string {
    return `This action returns all cats ${request.method}`;
  }

  @Get('query')
  find(@Query() query: ListAllEntities): string {
    return `the limit of your query is ${query.limit}`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createCatDto: CreateCatDto): CreateCatDto[] {
    this.appService.create(createCatDto);
    return this.appService.findAll();
  }
}
