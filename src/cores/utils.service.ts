import * as bcrypt from 'bcrypt';

//*Password
export const encodePassword = async (rawPassword: string): Promise<string> => {
  const SALT = await bcrypt.genSalt();
  return await bcrypt.hash(rawPassword, SALT);
};

export const comparePasswrod = async (
  rawPassword: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(rawPassword, hash);
};

//*Pagination
export const getSort = (sort: string, reverse: boolean) => {
  const _sort = {};
  _sort[sort ? sort : 'created_at'] = reverse ? 'desc' : 'asc';
  return _sort;
};

export const getPageInformation = (limit: number, page: number) => {
  const _limit = Number(limit ? limit : 10);
  const _skip = Number(page ? (page - 1) * _limit : 0);
  return { limit: _limit, skip: _skip };
};

export const getPagination = (limit: number, page: number, total: number) => {
  return {
    page: page ? Number(page) : 1,
    page_size: limit,
    page_count: Math.ceil(total / Number(limit)),
    total: total,
  };
};
