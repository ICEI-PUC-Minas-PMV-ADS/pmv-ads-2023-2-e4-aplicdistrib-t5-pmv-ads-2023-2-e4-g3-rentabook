import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "../../src/hooks/useApi";
import { userService } from "../../src/services/userService";

const email = 'user@email.com';
const name = 'user';
const password = '123';
const token = '837KSjdh28-928Usu28dm-192J02-0019skIOskd';

const mockUseApi_post = jest
  .spyOn(useApi, 'post')
  .mockImplementation(async (url, data, config) => {
    switch (url) {
      case '/login':
        {
          const { email: b_email, password: b_password } = JSON.parse(data as string);
          if (b_email === email && b_password === password) {
            return { data: true };
          }
        }
        break;

      case '/register':
        {
          const { email: b_email, name: b_name, password: b_password } = JSON.parse(data as string);
          if (b_email === email && b_name === name && b_password === password) {
            return { data: true };
          }
        }
        break;

      case '/leave':
        {
          const authToken = config?.headers?.['Authorization'];
          if (authToken === `Bearer ${token}`) {
            return { status: 200 };
          }
        }
        return { status: 404 };
    }
    return { data: false };
  });

const mockUseApi_get = jest
  .spyOn(useApi, 'get')
  .mockImplementation(async (url, config) => {
    switch (url) {
      case '/user':
        {
          const authToken = config?.headers?.['Authorization'];
          if (authToken === `Bearer ${token}`) {
            return { data: true };
          }
        }
        break;
    }
    return { data: false };
  });

const mockStorage_getItem = jest
  .spyOn(AsyncStorage, 'getItem');

const mockStorage_removeItem = jest
  .spyOn(AsyncStorage, 'removeItem');

/**
 * userService.login
 */

describe('Test userService.login', () => {
  beforeEach(() => {
    mockUseApi_post.mockClear();
  });

  it('Success', async () => {
    const response = await userService.login({ email, password });

    expect(mockUseApi_post).toBeCalledTimes(1);
    expect(mockUseApi_post.mock.calls[0][0]).toBe('/login');

    expect(response).toBe(true);
  });

  it('Invalid email', async () => {
    const email = 'not_user@email.com';
    const password = '123';

    const response = await userService.login({ email, password });

    expect(mockUseApi_post).toBeCalledTimes(1);
    expect(mockUseApi_post.mock.calls[0][0]).toBe('/login');

    expect(response).toBe(false);
  });

  it('Invalid password', async () => {
    const email = 'user@email.com';
    const password = '124';

    const response = await userService.login({ email, password });

    expect(mockUseApi_post).toBeCalledTimes(1);
    expect(mockUseApi_post.mock.calls[0][0]).toBe('/login');

    expect(response).toBe(false);
  });
});

/**
 * userService.signup
 */

describe('Test userService.signup', () => {
  beforeEach(() => {
    mockUseApi_post.mockClear();
  });

  it('Success', async () => {
    const response = await userService.signup({ name, email, password });

    expect(mockUseApi_post).toBeCalledTimes(1);
    expect(mockUseApi_post.mock.calls[0][0]).toBe('/register');

    expect(response).toBe(true);
  });

  it('Invalid name', async () => {
    const response = await userService.signup({ name: 'unregister_user', email, password });

    expect(mockUseApi_post).toBeCalledTimes(1);
    expect(mockUseApi_post.mock.calls[0][0]).toBe('/register');

    expect(response).toBe(false);
  });

  it('Invalid email', async () => {
    const response = await userService.signup({ name, email: 'not_email@email.com', password });

    expect(mockUseApi_post).toBeCalledTimes(1);
    expect(mockUseApi_post.mock.calls[0][0]).toBe('/register');

    expect(response).toBe(false);
  });

  it('Invalid password', async () => {
    const response = await userService.signup({ name, email, password: '12' });

    expect(mockUseApi_post).toBeCalledTimes(1);
    expect(mockUseApi_post.mock.calls[0][0]).toBe('/register');

    expect(response).toBe(false);
  });
});

/**
 * userService.getPrivateUser
 */

describe('Test userService.getPrivateUser', () => {
  beforeEach(() => {
    mockUseApi_get.mockClear();
    mockStorage_getItem.mockClear();
  });

  it('Success', async () => {
    mockStorage_getItem.mockResolvedValue(token);

    const response = await userService.getPrivateUser();

    expect(response).toBe(true);
  });

  it('Fail', async () => {
    mockStorage_getItem.mockResolvedValue("837KSjdh22-912Usu28dm-195J02-0c19skxOsSd");

    const response = await userService.getPrivateUser();

    expect(response).toBe(false);
  });
});

/**
 * userService.logout
 */

describe('Test userService.logout', () => {
  beforeEach(() => {
    mockUseApi_get.mockClear();
    mockStorage_getItem.mockClear();
    mockStorage_removeItem.mockClear();
  });

  it('Success', async () => {
    mockStorage_getItem.mockResolvedValue(token);

    const response = await userService.logout();

    expect(response.status).toBe(200);
  });

  it('Fail', async () => {
    mockStorage_getItem.mockResolvedValue("837KSjdh22-912Usu28dm-195J02-0c19skxOsSd");

    const response = await userService.logout();

    expect(response.status).toBe(404);

    expect(mockStorage_removeItem).toBeCalledTimes(0);
  });
});