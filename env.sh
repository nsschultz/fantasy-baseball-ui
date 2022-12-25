#!/bin/bash

# Recreate config file
rm -rf env-config.js
touch env-config.js

# Read in values from .env file and create env-config.js
echo "window.env = {" >> env-config.js
while read -r line || [[ -n "$line" ]];
do
  # Split on the equals sign
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi
  # Find the value or use the one from the file
  value=$(printf '%s\n' "${!varname}")
  [[ -z $value ]] && value=${varvalue}
  echo "  $varname: \"$value\"," >> env-config.js
done < .env
echo "}" >> env-config.js