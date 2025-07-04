import { request, APIRequestContext } from '@playwright/test';

export class APIUtils {
  private apiContext!: APIRequestContext;

  async init(baseURL: string, apiKey?: string) {
    const headers: Record<string, string> = {};
    if (apiKey) headers['X-API-KEY'] = apiKey;

    this.apiContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: headers
    });
  }

  async get(path: string) {
    return await this.apiContext.get(path);
  }

  async post(path: string, body: any) {
    return await this.apiContext.post(path, { data: body });
  }

  async put(path: string, body: any) {
    return await this.apiContext.put(path, { data: body });
  }

  async delete(path: string) {
    return await this.apiContext.delete(path);
  }

  async dispose() {
    await this.apiContext.dispose();
  }
}
