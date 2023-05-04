import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class Pagination {
  @ApiPropertyOptional({
    type: Number,
    description: 'No of items you want to see on a specific page',
    example: 4,
  })
  @IsOptional()
  pageSize: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @IsOptional()
  pageNumber: string;

  // @ApiPropertyOptional()
  // @IsOptional()
  // search: string;
}
