## Test node js webserver

### Установка нужных библиотек
```sh
    npm --prefix ./app install
```

### Запуск сервера
```sh
    npm  --prefix ./app run start
```

### Главная страница с index.html
http://localhost:3000/

### Пример работы с запросом и ответ не html,а json-обьект
http://localhost:3000/test_get?first_name=hi 
выдаст 
`{"first_name":"hi"}`

