## Test node js webserver

### Установка нужных библиотек из дериктории app
```sh
    npm install
```

### Запуск сервера из дериктории app
```sh
    npm run start
```

### Главная страница с index.html
http://localhost:3000/

### Пример работы с запросом и ответ не html,а json-обьект
http://localhost:3000/docs?first_name=hi 
выдаст 
`{"first_name":"hi"}`


### Docker

#### build

```sh
    docker build app -f app/Dockerfile -t web-game 
```

#### run

```sh
    docker run --rm -p 3000:3000 web-game
```

#### run by docker-compose

```sh
    docker-compose up
```
