# Site
Yet another MEAN stack based publishing system! This project is intended as a 
personal sandbox for fullstack JavaScript based development.

- Runtime Environments: Heroku, Docker Compose, macOS
- Persistence: MongoDB
- WebApp framework: ExpressJS
- Server side templating: Jade
- JS Libraries: AngularJS, jQuery, Google Maps API, GB (personal library)
- CSS: Bootstrap, LESS CSS
- Rich Text Editor: textAngular
- Build: Grunt, Bower, UglifyJS, CSSMin


## Docker Setup

- Edit ./Dockerfile with proper social network credentials.
- Data is preloaded from `./loader/mongodb/db-load.sh`
- `./loader/mongodb/users.json` is commented out.
- `docker-compose build`
- `docker-compose up`


## Heroku Notes

- edit `.buildpacks`
- To install ImageMagick on Cedar-14:
https://github.com/ello/heroku-buildpack-imagemagick-cedar-14


