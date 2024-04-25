export function getStringQueryParams(params) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.keys(params)
    .forEach((key) => {
      if (params[key] !== undefined) {
        searchParams.set(key, params[key]);
      } else if (searchParams.has(key)) {
        searchParams.delete(key);
      }
    });

  return `?${searchParams.toString()}`;
}

export function getQueryParams() {
  const params = {};
  const searchParams = new URLSearchParams(window.location.search);

  Array.from(searchParams.entries())
    .forEach(([key, value]) => {
      params[key] = value;
    });

  return params;
}

// Функция добавления параметров строки запроса в URL

export function addQueryParams(params) {
  window.history.pushState(null, '', getStringQueryParams(params));
}
