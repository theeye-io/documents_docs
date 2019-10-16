
# Tagger Documentation

## Docker enviroment

### Start development server on http://localhost:8000
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material

### Build sitio estatico
docker run --rm -it -v ${PWD}:/docs squidfunk/mkdocs-material build

### Test sitio estatico
docker run -dit  -p 8080:80 -v "$PWD"/site/:/usr/local/apache2/htdocs/ httpd
