# Jenny's Wardrobe Admin

## Development

### Requirements

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/)

### Setup

First, setup [Jenny's Wardrobe](https://github.com/jlbelanger/wardrobe).

``` bash
git clone https://github.com/jlbelanger/wardrobe-admin.git
cd wardrobe-admin
./setup.sh
npm start
```

Your browser should automatically open http://localhost:3000/admin

### Lint

``` bash
npm run lint
```

### Test

``` bash
npm run test:cypress
```

## Deployment

Note: The deploy script included in this repo depends on other scripts that only exist in my private repos. If you want to deploy this repo, you'll have to create your own script.

``` bash
./deploy.sh
```
