// Create a file named post-query.dto.ts

import { IsOptional, IsNotEmpty, IsInt, Min, MaxLength } from 'class-validator';

export class PostQueryDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Search query cannot be empty.' })
  searchQuery: string;

  @IsOptional()
  @IsInt({ message: 'Page must be an integer.' })
  @Min(1, { message: 'Page must be greater than or equal to 1.' })
  page: number;

  @IsOptional()
  @IsInt({ message: 'Page size must be an integer.' })
  @Min(1, { message: 'Page size must be greater than or equal to 1.' })
  pageSize: number;
}
