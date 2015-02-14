#/bin/bash

# Get Bitters
echo "// Bitters ///////////////////////////////////////////////////////////////"
echo "// Cloning Bitters…"
git clone "git@github.com:thoughtbot/bitters.git"
echo "// Move Bitters stylesheets…"
mv bitters/app/assets/stylesheets/* inc/scss/framework/
echo "// Delete unused Bitters stylesheets…"
rm inc/scss/framework/_base.scss
rm inc/scss/framework/_grid-settings.scss
echo "// Move overrides files…"
mv inc/scss/overrides/_grid-settings.scss inc/scss/framework/_grid-settings.scss
echo "// Delete Bitters clone…"
rm -rf bitters
echo "// Delete overrides folder…"
rm -rf inc/scss/overrides

# Get Normalize
echo "// Normalize /////////////////////////////////////////////////////////////"
echo "// Cloning Normalize…"
git clone "git@github.com:necolas/normalize.css.git"
echo "// Move and rename normalize.css…"
mv normalize.css/normalize.css inc/scss/framework/_normalize.scss
echo "// Delete Normalize clone…"
rm -rf normalize.css

# git and setup cleanup
echo "// Delete .git folder…"
rm -rf .git
echo "// Delete .gitignore out of framework folder…"
rm .gitignore
echo "// Delete this setup file…"
rm setup.sh

echo "//////////////////////////////////////////////////////////////////////////"
echo "// Go forth and build something amazing (mobile first!)"
echo "//////////////////////////////////////////////////////////////////////////"
