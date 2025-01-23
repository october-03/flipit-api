import { IsString } from 'class-validator';

export class IssueNonceDto {
  @IsString()
  walletAddress: string;
}
