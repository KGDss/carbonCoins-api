import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.log('Connecting to PostgreSQL.');
    await this.$connect();
    this.logger.log('Connected to PostgreSQL!');

    const ignoreModel = [
      'HospitalStaffs',
      'MedicalHistoryFile',
      'PeakFlowAverage',
    ];
    this.$use(async (params, next) => {
      console.log('🚀 ~ params:', params);
      // Check incoming query type

      if (ignoreModel.includes(params.model)) return next(params);

      /**
       * @description Soft delete
       */
      if (params.action == 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update';
        params.args['data'] = { deleted_at: new Date() };
      }

      if (params.action == 'deleteMany') {
        // Delete many queries
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deleted'] = new Date();
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }

      const arrAction = [
        'findFirst',
        'findMany',
        'findUnique',
        'count',
        'groupBy',
      ];
      if (arrAction.includes(params.action)) {
        if (params.action == 'findUnique') params.action = 'findFirst';

        // Delete queries
        // Change action to an update

        // Find many queries
        if (params.args.where) {
          if (params.args.where.deleted == undefined) {
            // Exclude deleted records if they have not been explicitly requested
            params.args.where['deleted_at'] = null;
          }
        } else {
          params.args['where'] = { deletedAt: null };
        }
      }

      return next(params);
    });
  }
}
