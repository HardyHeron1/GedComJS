@ECHO OFF

set EXE="C:\development\xampp\php\phpdoc.bat"
set OPTS=-d src -t docs

%EXE%  %OPTS% 