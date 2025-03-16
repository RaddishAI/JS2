/**
 * Custom fetch function that allows for optional auth requests
 * @param {string} url
 * @param {*} initialOptions
 * @param {boolean} shouldUseAuth
 * @returns
 */
export async function doFetch(url, initialOptions = {}, shouldUseAuth = false) {
    try {
      const customOptions = {
        headers: {
          'Content-Type': 'application/json',
          ...initialOptions.headers,
        },
        ...initialOptions,
      };
  
      if (shouldUseAuth) {
        const accessToken = localStorage.getItem('accessToken');
        customOptions.headers.Authorization = `Bearer ${accessToken}`;
        if (!accessToken) {
            console.error("No access token found! User must log in.");
            return { ok: false, data: { error: "Unauthorized. No access token." } };
        }
        customOptions.headers['X-Noroff-API-Key'] =
          '16f09ba4-96fb-494a-8c62-69b71a3aaa80';
      }
  
      const response = await fetch(url, customOptions);
      const json = await response.json();
      return { ok: response.ok, data: json }; 
    } catch (error) {
      console.log(error);
    }
  }
  