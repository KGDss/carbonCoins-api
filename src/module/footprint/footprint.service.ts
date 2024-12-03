import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Report, Prisma } from '@prisma/client';
import { PrismaService } from 'src/cores/prisma.service';
import {
  getPageInformation,
  getPagination,
  getSort,
} from 'src/cores/utils.service';
import { GetAllCarbonFootprintReportDto } from './footprint.dto';

const query = (query: GetAllCarbonFootprintReportDto) => {
  const where: Prisma.ReportWhereInput = {};

  if (query.query) {
    where.OR = [
      { report_name: { contains: query.query, mode: 'insensitive' } },
    ];
  }

  return where;
};

@Injectable()
export class CarbonFootprintService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.ReportWhereUniqueInput): Promise<Report> {
    const report = await this.prisma.report.findUnique({
      where: where,
    });

    if (!report) {
      throw new HttpException(
        `Report with id:${where.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return report;
  }

  async findAllByQuery(q: GetAllCarbonFootprintReportDto) {
    const { limit, skip } = getPageInformation(q.limit, q.page);
    const order = getSort(q.sort, q.reverse);
    const where = query(q);

    const countStmt = this.prisma.report.count({ where });
    const queryStmt = this.prisma.report.findMany({
      where,
      orderBy: order,
      take: limit,
      skip,
    });
    const [count, reports] = await Promise.all([countStmt, queryStmt]);

    const response = {
      pagination: getPagination(limit, q.page, count),
      reports,
    };

    return response;
  }

  async createReport(data: Prisma.ReportCreateInput): Promise<Report> {
    return await this.prisma.report.create({
      data,
    });
  }
}
