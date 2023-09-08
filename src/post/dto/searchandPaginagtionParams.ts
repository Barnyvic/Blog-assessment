// Create a file named post-query.dto.ts

import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class PostQueryDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Search query cannot be empty.' })
  searchQuery: string;

  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  pageSize: string;
}
