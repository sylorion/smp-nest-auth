// src/cache/cache.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cacheConfig from './../config/cache.conf.js';
import { MemoryCacheModule } from '../cache/memory-cache.module.js';
import { RedisCacheModule } from '../cache/redis-cache.module.js';
import { CacheService } from './../services/CacheService.js';
import { MEMORY_CACHE, MEMORY_CACHE_MANAGER, REDIS_CACHE, REDIS_CACHE_MANAGER } from '../cache/cache.constants.js';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [cacheConfig] }),
    MemoryCacheModule,
    RedisCacheModule,
  ],
  providers: [
    {
      provide: MEMORY_CACHE,
      useExisting: MEMORY_CACHE_MANAGER,
    },
    {
      provide: REDIS_CACHE,
      useExisting: REDIS_CACHE_MANAGER,
    },
    CacheService,
  ],
  exports: [CacheService],
})
export class SMPCacheModule {}

