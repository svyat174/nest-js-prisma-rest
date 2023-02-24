import { IsOptional, IsPositive } from 'class-validator';

export class PaginationAndSearchQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  offset: number;

  @IsOptional()
  search: string;
}
