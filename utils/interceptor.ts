/*
 * This interceptor is used to modify the response of the naver access token request as it does not strictly follow the OAuth2 spec
 * 네이버 아이디 로그인의 `expires_in`이 정수 타입이 아닌 문자열 타입으로 반환됩니다.
 * @param originalFetch
 */

export const naverFetchInterceptor =
  (originalFetch: typeof fetch) =>
  async (
    url: Parameters<typeof fetch>[0],
    options: Parameters<typeof fetch>[1] = {}
  ) => {
    if (
      url === "https://nid.naver.com/oauth2.0/token" &&
      options.method === "POST"
    ) {
      const response = await originalFetch(url, options);
      const clonedResponse = response.clone();
      const body = await clonedResponse.json();

      body.expires_in = Number(body.expires_in); // 문자열로 되어 있는, expires_in을 숫자로 변환

      const modifiedReponse = new Response(JSON.stringify(body), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });

      return Object.defineProperty(modifiedReponse, "url", {
        value: url,
      });
    }

    return originalFetch(url, options);
  };
