@ECHO OFF

set EXE="C:\development\xampp\php\phpcs.bat"
REM set OPTS=--standard=PEAR --report=checkstyle --report-file=.\code-review.html
set OPTS=--standard=PEAR

%EXE%  %OPTS% %1% src 