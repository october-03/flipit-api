import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
  private readonly redis: Redis | null;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  async issueNonce(ip: string, walletAddr: string) {
    const nonce = randomUUID();
    await this.redis.set(`nonce:${ip}:${walletAddr}`, nonce, 'EX', 60 * 3);
    return nonce;
  }
}
