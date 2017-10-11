FROM mongo:3.4
MAINTAINER Kyo Suayan

COPY db-load.sh /loader/db-load.sh
RUN chmod a+x /loader/db-load.sh

## COPY users.json /loader/users.json
COPY pages.json /loader/pages.json
COPY jobs.json /loader/jobs.json
COPY tiles.json /loader/tiles.json
COPY stream.json /loader/stream.json
COPY trackdbs.json /loader/trackdbs.json
COPY locations.json /loader/locations.json

CMD "/loader/db-load.sh"