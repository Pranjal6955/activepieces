import { HttpMethod, httpClient } from '@activepieces/pieces-common';

interface EdenAiRequestOptions {
  auth: string;
  endpoint: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

export async function edenAiRequest<T = unknown>({
  auth,
  endpoint,
  method = HttpMethod.POST,
  body,
  headers = {},
}: EdenAiRequestOptions): Promise<T> {
  const url = `https://api.edenai.run/v2/${endpoint}`;
  // If sending FormData, caller must set appropriate headers.
  const isFormData = typeof body === 'object' && body?.constructor?.name === 'FormData';
  const finalHeaders = {
    Authorization: `Bearer ${auth}`,
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
  };
  const response = await httpClient.sendRequest({
    method,
    url,
    headers: finalHeaders,
    body,
  });
  return response.body;
} 