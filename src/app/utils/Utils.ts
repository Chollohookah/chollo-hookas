import { Inject, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
export class UTILS {
  public static encryptWithAES(str) {
    return CryptoJS.AES.encrypt(str, environment.AES_KEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  public static decryptWithAES(str) {
    return CryptoJS.AES.decrypt(str, environment.AES_KEY as any, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }

  public static convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}
