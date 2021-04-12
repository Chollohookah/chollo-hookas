import { Inject, PLATFORM_ID } from '@angular/core';

export class UTILS {
  public static isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId) {
    UTILS.isBrowser = platformId;
  }
}
