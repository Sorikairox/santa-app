import { UserService } from '../service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ProfileNotFound, UserNotFound } from '../errors';

describe('User Service Unit', () => {
  let service: UserService;
  let httpService: HttpService;

  beforeAll(() => {
    httpService = new HttpService();
    service = new UserService(httpService);
  });
  describe('getUserList', () => {
    it ('return user api returned value', async () => {
      const getSpy = jest.spyOn(httpService, 'get').mockImplementation(() => of({
        data : [{fakeUser: true}]
      }) as any);
      const res = await service.getUserList()
      expect(getSpy).toHaveBeenCalled();
      expect(res).toEqual([{fakeUser: true}]);
    });
  });

  describe('getUserByUsername', () => {
    let getSpy;
    beforeAll(() => {
      getSpy = jest.spyOn(httpService, 'get').mockImplementation(() => of({
        data : [{
          "username": "charlie.brown",
          "uid": "730b0412-72c7-11e9-a923-1681be663d3e"
        },
          {
            "username": "james.bond",
            "uid": "730b06a6-72c7-11e9-a923-1681be663d3e"
          },
          {
            "username": "bugs.bunny",
            "uid": "730b0804-72c7-11e9-a923-1681be663d3e"
          }]
      }) as any);
    })
    it ('return user with given username', async () => {
      const res = await service.getUserByUsername('charlie.brown')
      expect(getSpy).toHaveBeenCalled();
      expect(res).toEqual({
        "username": "charlie.brown",
        "uid": "730b0412-72c7-11e9-a923-1681be663d3e"
      });
    });
    it ('throw when no user with username', async () => {
      const res = service.getUserByUsername('cannotfindit')
      expect(getSpy).toHaveBeenCalled();
      await expect(res).rejects.toThrow(UserNotFound);
    });
  });

  describe('getProfileByUserId', () => {
    let getSpy;
    beforeAll(() => {
      getSpy = jest.spyOn(httpService, 'get').mockImplementation(() => of({
        data : [{
          "userUid": "730b0412-72c7-11e9-a923-1681be663d3e",
          "address": "219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo",
          "birthdate": "2017/12/05"
        },
          {
            "userUid": "730b06a6-72c7-11e9-a923-1681be663d3e",
            "address": "365-1095, Minowada, Shirataka-machi Nishiokitama-gun, Yamagata",
            "birthdate": "1987/01/01"
          },
          {
            "userUid": "730b0804-72c7-11e9-a923-1681be663d3e",
            "address": "292-1082, Yodacho, Obihiro-shi, Hokkaido",
            "birthdate": "2010/23/01"
          }]
      }) as any);
    });
    it ('return user profile ', async () => {
      const res = await service.getProfileByUserId('730b0412-72c7-11e9-a923-1681be663d3e')
      expect(getSpy).toHaveBeenCalled();
      expect(res).toEqual({
        "userUid": "730b0412-72c7-11e9-a923-1681be663d3e",
        "address": "219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo",
        "birthdate": "2017/12/05"
      });
    });
    it ('throw when no profile with username', async () => {
      const res = service.getProfileByUserId('fakeuuid')
      expect(getSpy).toHaveBeenCalled();
      await expect(res).rejects.toThrow(ProfileNotFound);
    });
  });
});