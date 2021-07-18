import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { User } from './class/User';
import { UserNotFound } from './error/user-not-found';
import { UserProfile } from './class/UserProfile';
import { ProfileNotFound } from './error/profile-not-found';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpService) {
  }

  async getUserList() {
    const apiRes = await lastValueFrom(this.httpClient.get(`${process.env.API_URL}/users.json`));
    return apiRes.data;
  }

  async getUserByUsername(username: string): Promise<User> {
    const apiRes = await lastValueFrom(this.httpClient.get(`${process.env.API_URL}/users.json`));
    const profileArray: Array<User> = apiRes.data;
    const user = profileArray.find(p => p.username === username);
    if (!user)
      throw new UserNotFound;
    return user;
  }

  async getProfileByUserId(userId: string) {
    const apiRes = await lastValueFrom(this.httpClient.get(`${process.env.API_URL}/userProfiles.json`));
    const profileArray: Array<UserProfile> = apiRes.data;
    const profile = profileArray.find(p => p.userUid === userId);
    if (!profile)
      throw new ProfileNotFound;
    return profile;
  }
}