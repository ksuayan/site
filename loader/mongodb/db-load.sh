#!/bin/bash

# mongoimport --drop --host db --db site --collection users --file /loader/users.json
mongoimport --drop --host db --db site --collection pages  --file /loader/pages.json
mongoimport --drop --host db --db site --collection jobs --file /loader/jobs.json
mongoimport --drop --host db --db site --collection tiles --file /loader/tiles.json
mongoimport --drop --host db --db site --collection stream --file /loader/stream.json
mongoimport --drop --host db --db site --collection trackdbs --file /loader/trackdbs.json
mongoimport --drop --host db --db site --collection locations --file /loader/locations.json