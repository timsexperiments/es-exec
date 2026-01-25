#!/bin/bash
for pkg in packages/cli packages/es-exec plugins/es-serve plugins/es-start plugins/eslint plugins/shared utils .; do
  echo "# Changelog" > $pkg/CHANGELOG.md
  echo "MIT License" > $pkg/LICENSE
  echo "node_modules" > $pkg/.npmignore
  if [ "$pkg" != "." ]; then
    echo "# Readme" > $pkg/README.md
    echo "# Contributing" > $pkg/CONTRIBUTING.md
  fi
done
