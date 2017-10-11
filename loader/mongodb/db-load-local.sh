#!/bin/bash

mongoimport --drop --host localhost --db site --collection users --file users.json
mongoimport --drop --host localhost --db site --collection pages  --file pages.json
mongoimport --drop --host localhost --db site --collection jobs --file jobs.json
mongoimport --drop --host localhost --db site --collection tiles --file tiles.json
mongoimport --drop --host localhost --db site --collection stream --file stream.json
mongoimport --drop --host localhost --db site --collection trackdbs --file trackdbs.json
mongoimport --drop --host localhost --db site --collection locations --file locations.json
