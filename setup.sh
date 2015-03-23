#/bin/bash

echo "/////////////////////////////////////////////////////"
echo "  _                      _     _                     "
echo " | |                    | |   | |                    "
echo " | |    _   _ _ __   ___| |__ | |__  _   _ _ __ __ _ "
echo " | |   | | | | '_ \ / __| '_ \| '_ \| | | | '__/ _' |"
echo " | |___| |_| | | | | (__| | | | |_) | |_| | | | (_| |"
echo " |______\__, |_| |_|\___|_| |_|_.__/ \__,_|_|  \__, |"
echo "         __/ |                                  __/ |"
echo "        |___/                                  |___/ "
echo "/////////////////////////////////////////////////////"
echo ""
# Get Bitters
echo "// Bitters //////////////////////////////////////////"
echo "// Cloning Bitters…"
git clone "git@github.com:thoughtbot/bitters.git"
echo "// Moving Bitters stylesheets…"
mv bitters/app/assets/stylesheets/* inc/scss/framework/
echo "// Deleting unused Bitters stylesheets…"
rm inc/scss/framework/_base.scss
rm inc/scss/framework/_grid-settings.scss
echo "// Moving overrides files…"
mv inc/scss/overrides/_grid-settings.scss inc/scss/framework/_grid-settings.scss
echo "// Deleting Bitters clone…"
rm -rf bitters
echo "// Deleting overrides folder…"
rm -rf inc/scss/overrides

# Get Normalize
echo "// Normalize ////////////////////////////////////////"
echo "// Cloning Normalize…"
git clone "git@github.com:necolas/normalize.css.git"
echo "// Moving and renaming normalize.css…"
mv normalize.css/normalize.css inc/scss/framework/_normalize.scss
echo "// Deleting Normalize clone…"
rm -rf normalize.css

# git and setup cleanup
echo "// Cleanup ///////////////////////////////////////////"

echo "// Deleting .git folder…"
rm -rf .git
echo "// Deleting .gitkeep out of framework folder…"
rm inc/scss/framework/.gitkeep
echo "// Deleting this setup file…"
rm setup.sh

echo "/////////////////////////////////////////////////////"
echo "//     ★ Go forth and build something amazing…     //"
echo "//            ✩ Remember, mobile first!            //"
echo "/////////////////////////////////////////////////////"
