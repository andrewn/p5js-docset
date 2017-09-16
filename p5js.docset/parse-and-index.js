const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(
  path.join(__dirname,'./Contents/Resources/Documents/js/data.js')
).toString();

const data = JSON.parse(
  contents.replace('referenceData = ', '')
);

const insert = (name, type, path) => (
  `INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES ('${name}', '${type}', '${path}');`
);

const Type = {
  Class: 'Class',
  Method: 'Method',
};

/*
  { name: 'p5.SoundRecorder',
  shortname: 'p5.SoundRecorder',
  classitems: [],
  plugins: [],
  extensions: [],
  plugin_for: [],
  extension_for: [],
  module: 'p5.sound',
  submodule: 'p5.sound',
  namespace: '',
  file: 'lib/addons/p5.sound.js',
  line: 9750,
  description: 'html string of description',
  is_constructor: 1,
  example: [ ...html string... ] }
*/
const processClassItem = (item) => {
  if (item.itemtype === 'method') {
    console.log(
      insert(item.name, Type.Method, `index.html#/${item.class}/${item.name}`)
    );
  }
}

const main = () => {
  Object.keys(data.classitems).forEach(key => processClassItem(data.classitems[key]));
}

main();
