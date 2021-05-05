import { Inject, PLATFORM_ID } from '@angular/core';

export class UTILS {
  public static universalBtoa = (str: string) => {
    return btoa(str);
  };

  public static universalAtob = (b64Encoded: string) => {
    return atob(b64Encoded);
  };
}
