@echo off
setlocal
set "BASE_DIR=%~dp0"
set "MAVEN_VERSION=3.9.9"
set "MAVEN_HOME=%BASE_DIR%.mvn\apache-maven-%MAVEN_VERSION%"
if not exist "%MAVEN_HOME%\bin\mvn.cmd" (
  set "ARCHIVE=%TEMP%\apache-maven-%MAVEN_VERSION%-bin.zip"
  powershell -NoProfile -Command "Invoke-WebRequest -UseBasicParsing 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip' -OutFile '%ARCHIVE%'"
  powershell -NoProfile -Command "Expand-Archive -Force '%ARCHIVE%' '%BASE_DIR%.mvn'"
)
call "%MAVEN_HOME%\bin\mvn.cmd" %*
