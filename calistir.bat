@echo off
REM ALEF GROUP sitesini http://localhost:8182 adresinde baslatir
cd /d "%~dp0"
node server.js %*
