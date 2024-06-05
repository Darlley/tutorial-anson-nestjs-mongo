import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateUserSttingsDto {
  @IsBoolean()
  @IsOptional()
  receiveNotifications?: boolean;

  @IsBoolean()
  @IsOptional()
  receiveEmails?: boolean;

  @IsBoolean()
  @IsOptional()
  receiveSMS?: boolean;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
  
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateUserSttingsDto)
  settings?: CreateUserSttingsDto;
}
