@echo off
chcp 65001 >nul
title Samvel Birthday

cd /d "%~dp0"

REM --- Если есть Python, поднимаем локальный сервер ---
where py >nul 2>nul
if not errorlevel 1 (
    echo Запускаю локальный сервер: http://localhost:8000
    echo Закрой это окно, чтобы остановить сервер.
    start "" "http://localhost:8000"
    py -m http.server 8000
    goto :end
)

where python >nul 2>nul
if not errorlevel 1 (
    echo Запускаю локальный сервер: http://localhost:8000
    echo Закрой это окно, чтобы остановить сервер.
    start "" "http://localhost:8000"
    python -m http.server 8000
    goto :end
)

REM --- Python нет, просто открываем файл ---
echo Python не найден, открываю index.html напрямую.
start "" "%~dp0index.html"

:end
endlocal