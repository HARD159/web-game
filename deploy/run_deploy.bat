@echo off

rem Нужно переименовить файлы в %HOMEPATH%\.ssh\
rem DIR %HOMEPATH%\.ssh\  ===>  id_rsa,  id_rsa.pub

SET SERVER_IP=188.166.88.166
SET deploy_script=deploy.js
SET SERVER_USER=root

title Deploy code to %SERVER_IP%

node %deploy_script%
pause