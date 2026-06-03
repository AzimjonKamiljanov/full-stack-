const sanitizeSearchQuery = (value = '') => value.replace(/[%_\\]/g, ' ').trim();

module.exports = { sanitizeSearchQuery };
