# update-section [![build status](https://secure.travis-ci.org/thlorenz/update-section.png)](http://travis-ci.org/thlorenz/update-section)

[![testling badge](https://ci.testling.com/thlorenz/update-section.png)](https://ci.testling.com/thlorenz/update-section)

Updates a section inside a file with newer content while removing the old content.

```js
var updateSection = require('update-section');

var original = [
    '# Some Project'
  , ''
  , 'Does a bunch of things'
  , ''
  , 'START -- GENERATED GOODNESS'
  , 'this was painstakingly generated'
  , 'as was this'
  , 'END -- GENERATED GOODNESS' , ''
  , ''
  , '## The End'
  , ''
  , 'Til next time'
].join('\n');

var update = [
    'START -- GENERATED GOODNESS'
  , 'this was painstakingly re-generated'
  , 'and we added another line'
  , 'here'
  , 'END -- GENERATED GOODNESS'
].join('\n');

function matchesStart(line) {
  return (/START -- GENERATED GOODNESS/).test(line);  
}

function matchesEnd(line) {
  return (/END -- GENERATED GOODNESS/).test(line);  
}

var updated = updateSection(original, update, matchesStart, matchesEnd);
console.log(updated);
```

#### Output
```
# Some Project

Does a bunch of things

START -- GENERATED GOODNESS
this was painstakingly re-generated
and we added another line
here
END -- GENERATED GOODNESS

## The End

Til next time
```

## Installation

    npm install update-section

## API

### updateSection(content, section, matchesStart, matchesEnd)

```
/**
 * Updates the content with the given section. 
 *
 * If previous section is found it is replaced.
 * Otherwise the section is appended to the end of the content.
 *
 * @name updateSection
 * @function
 * @param {String} content that may or may not include a previously added section
 * @param {String} section the section to update
 * @param {Function} matchesStart when called with a line needs to return true iff it is the section start line
 * @param {Function} matchesEnd when called with a line needs to return true iff it is the section end line
 * @return {String} content with updated section
 */
```

## License

MIT
