@ECHO OFF

set EXE="C:\development\xampp\php\php.exe"
set PHPUNIT="C:\development\xampp\php\phpunit"
set OPTS=--verbose --stop-on-failure
set INCLUDE_PATH=--include-path=src;tests

%EXE% %PHPUNIT% %OPTS% %INCLUDE_PATH% tests