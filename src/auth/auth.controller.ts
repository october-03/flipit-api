import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IssueNonceDto } from './dto/issue-nonce.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('issue-nonce')
  async issueNonce(@Req() req: Request, @Body() body: IssueNonceDto) {
    const ip = (req.headers['x-forwarded-for'] as string) || req['ip'];

    if (!ip) {
      throw new HttpException('IP address not found', HttpStatus.BAD_REQUEST);
    }

    return await this.authService.issueNonce(ip, body.walletAddress);
  }
}
