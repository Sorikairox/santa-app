import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { User, UserProfile } from './class';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpService) {
  }

  async getUserList() {
    const apiRes = await lastValueFrom(this.httpClient.get(`${process.env.API_URL}/users.json`));
    return apiRes.data;
  }

  async getUserByUsername(username: string) {
    const apiRes = await lastValueFrom(this.httpClient.get(`${process.env.API_URL}/users.json`));
    const profileArray: Array<User> = apiRes.data;
    return profileArray.find(p => p.username === username) || null;
  }

  async getProfileByUserId(userId: string) {
    const apiRes = await lastValueFrom(this.httpClient.get(`${process.env.API_URL}/userProfiles.json`));
    const profileArray: Array<UserProfile> = apiRes.data;
    return profileArray.find(p => p.userUid === userId) || null;
  }
}