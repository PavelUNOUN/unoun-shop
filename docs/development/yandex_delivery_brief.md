# UNOUN — подключение Яндекс.Доставки

## Где что взять в кабинете Яндекса

Нужный вам сценарий: только `Яндекс Доставка`, только `ПВЗ -> ПВЗ`, без курьера и без СДЭК.

### 1. Bearer token

Где брать:

1. Зайти в личный кабинет: `https://dostavka.yandex.ru`
2. Открыть вкладку `Интеграция`
3. Нажать `Получить токен`
4. Скопировать токен из `Профиль компании -> Токен для API`

Что положить в `.env`:

- `YANDEX_DELIVERY_API_TOKEN`

### 2. Боевой хост API

Для production используется:

- `https://b2b-authproxy.taxi.yandex.net`

Что положить в `.env`:

- `YANDEX_DELIVERY_ENV=production`

Для тестов:

- `YANDEX_DELIVERY_ENV=test`
- тестовый хост: `https://b2b.taxi.tst.yandex.net`

### 3. `platform_station_id` точки отправки

Это ID вашей исходной точки в логистической платформе Яндекса. Для нашего сценария это источник, откуда заказ уходит в сеть Яндекс.Доставки.

Где брать:

- боевой `platform_station_id` Яндекс выдает по запросу через менеджера / поддержку;
- в тесте Яндекс дает публичный тестовый ID.

Что положить в `.env`:

- `YANDEX_DELIVERY_SOURCE_STATION_ID`

### 4. `merchant_id`

Это ID мерчанта-отправителя. Он нужен для создания заявок и офферов.

Как получить:

1. После подключения мерчанта проверить статус регистрации методом
   `GET /api/b2b/platform/merchant/register`
2. Если ID не виден или доступ к методу еще не выдан, запросить его у менеджера Яндекс.Доставки

Что положить в `.env`:

- `YANDEX_DELIVERY_MERCHANT_ID`

### 5. Что подготовить до API

Нужно заранее собрать:

- юридические данные отправителя;
- адрес исходной точки / ПВЗ, из которого идет отправка;
- вес и габариты коробки;
- название товара, артикул, цену;
- телефон и email получателя;
- понимание, какой ПВЗ будет точкой отправки со стороны магазина.

## Что уже подготовлено в проекте

В коде уже переведено на новый сценарий:

- checkout больше не описывает СДЭК и работает только с `Яндекс ПВЗ`;
- добавлен route `app/api/delivery/pickup-points/route.ts`;
- добавлен адаптер `src/server/delivery/yandexDelivery.ts`;
- список ПВЗ теперь грузится по городу и умеет работать в `mock/live`;
- заказ сохраняется как `YANDEX_PICKUP`;
- в `.env.example` добавлены переменные под Яндекс.Доставку;
- тексты checkout, delivery, offer, account и admin обновлены под Яндекс.

## Какие env нужны

В проекте сейчас используются:

- `YANDEX_DELIVERY_ENV`
- `YANDEX_DELIVERY_API_TOKEN`
- `YANDEX_DELIVERY_MERCHANT_ID`
- `YANDEX_DELIVERY_SOURCE_STATION_ID`

## Какой API нужен именно нам

Под сценарий `ПВЗ -> ПВЗ` на первом этапе достаточно такого набора:

1. `POST /api/b2b/platform/location/detect`
   Нужен, чтобы определить `geo_id` по городу пользователя.
2. `POST /api/b2b/platform/pickup-points/list`
   Нужен, чтобы получить список доступных ПВЗ для выбора в checkout.
3. `POST /api/b2b/platform/offers/create`
   Нужен, чтобы получить офферы доставки до выбранного ПВЗ.
4. `POST /api/b2b/platform/offers/confirm`
   Нужен, чтобы подтвердить выбранный оффер после успешной оплаты.
5. `GET /api/b2b/platform/request/info`
   Нужен, чтобы получать статус заявки и показывать его в админке / кабинете.

## Какой порядок подключения

### Этап 1. Подставить доступы

Заполнить `.env`:

- `YANDEX_DELIVERY_ENV`
- `YANDEX_DELIVERY_API_TOKEN`
- `YANDEX_DELIVERY_MERCHANT_ID`
- `YANDEX_DELIVERY_SOURCE_STATION_ID`

### Этап 2. Проверить ПВЗ

После подстановки токена checkout начнет ходить в:

- `POST /api/b2b/platform/location/detect`
- `POST /api/b2b/platform/pickup-points/list`

Это уже даст живой список ПВЗ по городу вместо mock-данных.

### Этап 3. Подключить офферы

Следующий технический шаг:

- на сервере вызвать `offers/create` для выбранного ПВЗ;
- сохранить `offer_id`, стоимость и ETA в заказ;
- после успешной оплаты вызвать `offers/confirm`.

### Этап 4. Подключить статусы

После подтверждения оффера:

- сохранить внешний ID заявки Яндекса;
- синхронизировать `request/info`;
- показать статус в админке и позже в аккаунте.

## Важные замечания

- тестовый контур Яндекса ограничен Москвой;
- тестовый Bearer token и тестовый `platform_station_id` уже опубликованы в официальной документации;
- боевой токен берется в кабинете, а боевой `platform_station_id` обычно выдается менеджером;
- если вы меняете пароль от кабинета, Bearer token перестает действовать, его нужно получить заново.

## Полезные официальные ссылки

- Доступ к API: https://yandex.ru/support/delivery-profile/ru/api/other-day/access
- Введение: https://yandex.ru/support/delivery-profile/ru/api/other-day/
- Список методов: https://yandex.ru/support/delivery-profile/ru/api/other-day/ref/
- Получение `geo_id`: https://yandex.ru/support/delivery-profile/ru/api/other-day/ref/2.-Tochki-samoprivoza-i-PVZ/apib2bplatformlocationdetect-post
- Список ПВЗ: https://yandex.ru/support/delivery-profile/ru/api/other-day/ref/2.-Tochki-samoprivoza-i-PVZ/apib2bplatformpickup-pointslist-post
- Создание оффера: https://yandex.ru/support/delivery-profile/ru/api/other-day/ref/3.-Osnovnye-zaprosy/apib2bplatformofferscreate-post
- Статус заявки: https://yandex.ru/support/delivery-profile/ru/api/other-day/ref/3.-Osnovnye-zaprosy/apib2bplatformrequestinfo-get

