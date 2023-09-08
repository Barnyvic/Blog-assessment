// Create a file named post-query.dto.ts

import { IsOptional, IsNotEmpty, IsInt, Min, MaxLength } from 'class-validator';

export class PostQueryDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Search query cannot be empty.' })
  searchQuery: string;

  @IsOptional()
  @Min(1, { message: 'Page must be greater than or equal to 1.' })
  page: string;

  @IsOptional()
  @Min(1, { message: 'Page size must be greater than or equal to 1.' })
  pageSize: string;
}
