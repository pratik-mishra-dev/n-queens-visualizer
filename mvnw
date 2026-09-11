#!/bin/sh
# Lightweight Maven wrapper for systems without Maven installed.
set -e
BASE_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
MAVEN_VERSION=3.9.9
MAVEN_HOME="$BASE_DIR/.mvn/apache-maven-$MAVEN_VERSION"
if [ ! -x "$MAVEN_HOME/bin/mvn" ]; then
  ARCHIVE="${TMPDIR:-/tmp}/apache-maven-$MAVEN_VERSION-bin.zip"
  URL="https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/$MAVEN_VERSION/apache-maven-$MAVEN_VERSION-bin.zip"
  command -v curl >/dev/null 2>&1 && curl -fsSL "$URL" -o "$ARCHIVE" || wget -q "$URL" -O "$ARCHIVE"
  unzip -q -o "$ARCHIVE" -d "$BASE_DIR/.mvn"
fi
exec "$MAVEN_HOME/bin/mvn" "$@"
