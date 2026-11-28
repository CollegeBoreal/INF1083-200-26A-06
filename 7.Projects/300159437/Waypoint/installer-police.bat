@echo off
REM Waypoint - telecharge la police d icones (Material Icons) dans src\fonts
cd /d "%~dp0"
if not exist "src\fonts" mkdir "src\fonts"
powershell -NoProfile -Command "Invoke-WebRequest -Uri https://github.com/google/material-design-icons/raw/master/font/MaterialIcons-Regular.ttf -OutFile src\fonts\MaterialIcons-Regular.ttf"
if exist "src\fonts\MaterialIcons-Regular.ttf" (echo. & echo Police installee dans src\fonts. Tu peux fermer cette fenetre.) else (echo. & echo Echec du telechargement. Verifie ta connexion Internet.)
pause
