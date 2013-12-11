'use strict';

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
var updateSection = module.exports = function updateSection(content, section, matchesStart, matchesEnd) {
  if (!content) return section;

  var lines = content.split('\n')
    , startIdx = -1
    , endIdx = -1
    , hasStart = false
    , hasEnd = false
    , line;

  if (!lines.length) return section;

  for (var i = 0; i < lines.length; i++) {
    line = lines[i]
    if (!hasStart && matchesStart(line)) { 
      startIdx = i;
      hasStart = true;
    } else if (!hasEnd && matchesEnd(line)) {
      endIdx = i;
      hasEnd = true;
    }
    if (hasStart && hasEnd) break;
  }

  // no previous section found in content not just append
  if (!hasStart) return content + '\n\n' + section;

  // no end, correct it to be all remaining lines after start
  if (!hasEnd) {
    endIdx = lines.length;
    hasEnd = true;
  }

  var sectionLines = section.split('\n')
    , dropN = endIdx - startIdx + 1;

  [].splice.apply(lines, [ startIdx, dropN ].concat(sectionLines))

  return lines.join('\n');
}
