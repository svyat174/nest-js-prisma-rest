import { IsNotEmpty } from 'class-validator';

export class CreateSkillsDto {
  @IsNotEmpty()
  readonly name: string;
}
