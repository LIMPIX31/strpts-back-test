# Тестовое задание в starpets

## Часть 1

### 1. Установите зависимости
```bash
yarn install
```

### 2. Запустите сервис
Сервис будет запущен на 9000 порту
```bash
docker compose up service-first -d
```

#### Сбросить все контейнеры (сервис и бд)
```bash
docker compose down
```

### 4. Протестируйте сервис
Перед этим подняв контейнеры
```bash
yarn workspace @test/benchmark start
```
Ожидаемый результат:
```
...
...
benchmark: 12.870s
Passed: 5000
Failed: 5000
Crashed: 0
```