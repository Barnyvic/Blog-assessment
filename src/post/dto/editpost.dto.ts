import { IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  public readonly title?: string;

  @IsString()
  public readonly content?: string;
}
