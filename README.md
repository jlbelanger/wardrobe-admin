# Jenny's Wardrobe Admin

## Development

### Requirements

- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Setup

First, setup [Jenny's Wardrobe](https://github.com/jlbelanger/wardrobe).

``` bash
git clone https://github.com/jlbelanger/wardrobe-admin.git
cd wardrobe-admin
./setup.sh
yarn start
```

View the site at http://localhost:3000/admin

### Lint

``` bash
yarn lint
```

### Test

``` bash
yarn test:cypress
```

## Deployment

Note: The deploy script included in this repo depends on other scripts that only exist in my private repos. If you want to deploy this repo, you'll have to create your own script.

``` bash
./deploy.sh
```
