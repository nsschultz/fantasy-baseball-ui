## Player UI
* Displays the data from the various services. The main pages are:
  * Home Page
  * Players Page - allows fo the managing of player data not controlled by the stats service
  * Integrations - import stats data, export database & merge stats data into the database

---
### Healthcheck:
* The service will fail a healthcheck if the home page cannot be loaded.

---
### Dev Container
* Command for starting container:
```
docker run --rm -it --workdir /app -v $(pwd):/app -p 3000:3000 node:13.12.0 bash
```
* Commands for installing VS Code extensions (from within container):
```
code --install-extension amatiasq.sort-imports@6.2.6
```