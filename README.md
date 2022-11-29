## Player UI

- Displays the data from the various services. The main pages are:
  - Home Page
  - Players Page - allows fo the managing of player data not controlled by the stats service
  - Integrations - import stats data, export database & merge stats data into the database

---

### Healthcheck:

- The service will fail a healthcheck if the home page cannot be loaded.

---

### Build Image

```
version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g') && docker build -t nschultz/fantasy-baseball-ui:$version .
```

---

### Dev Container

- Command for starting/stopping dev containers:

```
docker compose -f _dev/docker-compose-dev.yaml -p fantasy-baseball-ui up --build -d
docker compose -f _dev/docker-compose-dev.yaml -p fantasy-baseball-ui down
```

- Extensions are in the extensions.json file and should prompt to install on start
- Tasks are setup in tasks.json.

---

### Runtime Container

- Command for starting/stopping runtime containers:

```
docker compose -f _dev/docker-compose-runtime.yaml -p fantasy-baseball-ui up --build -d
docker compose -f _dev/docker-compose-runtime.yaml -p fantasy-baseball-ui down
```

---

### Local Connections

- Player UI
  - View Homepage: http://localhost:3000/
