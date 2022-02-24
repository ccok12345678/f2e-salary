#!/user/bin/env sh
set -e

yarn build --production

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ccok12345678/f2e-salary.git master:gh-pages

cd -