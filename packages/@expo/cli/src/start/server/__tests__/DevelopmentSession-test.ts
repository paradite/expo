import nock from 'nock';

import { getExpoApiBaseUrl } from '../../../api/endpoint';
import * as ProjectDevices from '../../project/devices';
import { DevelopmentSession } from '../DevelopmentSession';

const asMock = (fn: any): jest.Mock => fn as jest.Mock;

jest.mock('../../../api/settings', () => ({
  APISettings: {
    isOffline: false,
  },
}));
jest.mock('../../project/devices', () => ({
  getDevicesInfoAsync: jest.fn(),
}));
jest.mock('../../../api/user/user');

describe(`startAsync`, () => {
  it(`starts a dev session`, async () => {
    const session = new DevelopmentSession('/', 'http://localhost:19001/');

    asMock(ProjectDevices.getDevicesInfoAsync).mockResolvedValue({
      devices: [{ installationId: '123' }, { installationId: '456' }],
    });

    const exp = {
      name: 'my-app',
      slug: 'my-app',
      description: 'my-foo-bar',
      primaryColor: '#4630eb',
    };
    const runtime = 'native';
    const startScope = nock(getExpoApiBaseUrl())
      .post('/v2/development-sessions/notify-alive?deviceId=123&deviceId=456')
      .reply(200, '');
    const closeScope = nock(getExpoApiBaseUrl())
      .post('/v2/development-sessions/notify-close?deviceId=123&deviceId=456')
      .reply(200, '');

    await session.startAsync({
      exp,
      runtime,
    });

    await session.closeAsync();

    expect(ProjectDevices.getDevicesInfoAsync).toHaveBeenCalledTimes(2);
    expect(startScope.isDone()).toBe(true);
    expect(closeScope.isDone()).toBe(true);
  });
});
