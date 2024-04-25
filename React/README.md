# Host

## Запуск проекта

Устанавливаем зависимости:

```
npm install
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

Запуск локального Json-server + frontend проекта c url api на Json-server:

```
npm run start:dev:mock
```

Запуск frontend проекта c url api на test server:

```
npm run start:dev
```

---

## Api FIDS

```
https://main.test.model.svo.aero/api/docs
```

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server и url api на Json-server
- `npm run start:dev` - Запуск frontend проекта на webpack dev server и url api на test server
- `start:mockServer` - Запуск Json-server
- `npm run serve` - Запуск проекта из статичной папки сборки build
- `npm run clean` - Удаление папки сборки build
- `npm run build:prod` - Сборка в prod режиме (минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test` - Запуск unit тестов с jest

---

## Архитектура проекта

Проект построен на архитектуре микрофронтов, каждый сервис которого написанв соответствии с методологией Feature sliced design.

Ссылка на схему проекта - [Miro](https://miro.com/welcomeonboard/ZjRYcjZaak03VTJ3a3RMazQyYW10bUNXMFhab01TeDJTRWN0eDhCRUdSY01oMnZ3RlJjVTlRUXZaOG5lVUtiY3wzNDU4NzY0NTUzNzg2MDI5NTc3fDI=?share_link_id=916676154518)

Ссылка на документацию - [Micro-frontends](https://micro-frontends.org/)

Ссылка на документацию - [Feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

Стоит обратить внимание при создании новых компонентов - [Cheatsheet](https://feature-sliced.design/docs/get-started/cheatsheet)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами. Локальные файлы с переводами хранятся в src/shared/config/i18/locales, нужны как заглушка, если не пришли переводы с host. Глобальные файлы с переводами хранятся в проекте host в src/shared/config/i18/locales.

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Глобальные переменные в проекте

```
__IS_DEV__: mode === 'development'  - в переменных окружения
__API__: apiUrl - в переменных окружения
__PROJECT__: для тестов
```

---

## Тесты

В проекте используются unit тесты на jest, для запуска - `npm run test`

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

##### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Конфигурация проекта

Для сборки проект использует Webpack.

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода

---

## Работа с данными

Взаимодействие с данными осуществляется с помощью redux [toolkit](https://redux-toolkit.js.org/tutorials/overview).

Запросы на сервер отправляются с помощью [RTK query](https://redux-toolkit.js.org/rtk-query/overview)

### Создание эндпоинтов делается на модуль, и инжектится в глобальный createApi сервиса

```typescript jsx
import { rtqApi } from '@/shared/api/rtqApi';

const testApi = rtqApi.injectEndpoints({
  endpoints: (build) => ({
    test: build.query<void, void>({
      query: (arg) => ({
        url: '/test',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyTestQuery } = testApi;
```

## Пример работы с данными RTK

### 1) Создание селектора с помощью buildSelector

```typescript jsx
export const [useCounterValue, getCounterValue] = buildSelector((state) => state.counter.value);
```

### 2) Создание слайса с помощью buildSlice

```typescript jsx
const initialState: CounterSchema = { value: 0 };

export const counterSlice = buildSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<number>) => {
      state.value += payload;
    },
  },
});

export const { actions: counterActions, reducer: counterReducer, useActions: useCounterActions } = counterSlice;
```

### 3) Создание схемы модуля и добавление ее в StateSchema, добавление созданого Reducer в rootReducers

```typescript jsx
export interface CounterSchema {
  value: number;
}

export interface StateSchema {
  counter: CounterSchema;

  [rtqApi.reducerPath]: ReturnType<typeof rtqApi.reducer>;
}

const rootReducers: ReducersMapObject<StateSchema> = {
  counter: counterReducer,

  [rtqApi.reducerPath]: rtqApi.reducer,
};
```

### 4) Использование

```typescript jsx
    const counterValue = useCounterValue();
    const { add } = useCounterActions();

    return (<Button type="primary" onClick={() => add(5)}>
        {counterValue}
    </Button>)
```

---
