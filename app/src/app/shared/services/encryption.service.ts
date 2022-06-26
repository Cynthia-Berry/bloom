import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CUSTOM_CONSTANTS } from '../utils/constant';

@Injectable()
export class EncryptionService {
  private static KEY = CUSTOM_CONSTANTS.ENCRYPTION_KEY;

  static encrypt(data: any) {
    if (!data) return null;
    return CryptoJS.AES.encrypt(JSON.stringify(data), EncryptionService.KEY).toString();
  }

  static decrypt(data: string | undefined) {
    if (!data) return null;
    const decryptData = CryptoJS.AES.decrypt(data.toString(), EncryptionService.KEY);
    return JSON.parse(decryptData.toString(CryptoJS.enc.Utf8));
  }

  static jwtDecrypt(token: any) {
    if (!token) return null;
    if (typeof (token) === 'object') return token;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  constructor() {
  }

}
