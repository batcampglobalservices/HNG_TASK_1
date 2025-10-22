const crypto = require('crypto');
const { analyzeString } = require('../utils/stringAnalyzer');

const strings = new Map(); // In-memory storage

class StringService {
  static async createString(value) {
    if (!value || typeof value !== 'string') {
      throw { status: 422, message: 'Invalid data type for "value" (must be string)' };
    }

    const properties = analyzeString(value);
    const id = properties.sha256_hash;

    if (strings.has(id)) {
      throw { status: 409, message: 'String already exists in the system' };
    }

    const stringData = {
      id,
      value,
      properties,
      created_at: new Date().toISOString(),
    };

    strings.set(id, stringData);
    console.log('Stored strings:', Array.from(strings.keys())); // Debug log
    return stringData;
  }

  static async getString(value) {
    const id = crypto.createHash('sha256').update(value).digest('hex');
    console.log('Looking for id:', id, 'in strings:', Array.from(strings.keys())); // Debug log
    const stringData = strings.get(id);
    if (!stringData) {
      throw { status: 404, message: 'String does not exist in the system' };
    }
    return stringData;
  }

  static async getAllStrings(filters) {
    const { is_palindrome, min_length, max_length, word_count, contains_character } = filters;
    let filteredStrings = Array.from(strings.values());

    if (is_palindrome !== undefined) {
      filteredStrings = filteredStrings.filter((s) => s.properties.is_palindrome === (is_palindrome === 'true'));
    }
    if (min_length) {
      filteredStrings = filteredStrings.filter((s) => s.properties.length >= parseInt(min_length));
    }
    if (max_length) {
      filteredStrings = filteredStrings.filter((s) => s.properties.length <= parseInt(max_length));
    }
    if (word_count) {
      filteredStrings = filteredStrings.filter((s) => s.properties.word_count === parseInt(word_count));
    }
    if (contains_character) {
      filteredStrings = filteredStrings.filter((s) => s.value.includes(contains_character));
    }

    return {
      data: filteredStrings,
      count: filteredStrings.length,
      filters_applied: filters,
    };
  }

  static async deleteString(value) {
    const id = crypto.createHash('sha256').update(value).digest('hex');
    console.log('Deleting id:', id, 'from strings:', Array.from(strings.keys())); // Debug log
    if (!strings.has(id)) {
      throw { status: 404, message: 'String does not exist in the system' };
    }
    strings.delete(id);
  }

  static async filterByNaturalLanguage(query) {
    const parsedFilters = parseNaturalLanguageQuery(query);
    return this.getAllStrings(parsedFilters);
  }
}

// Basic natural language query parser
function parseNaturalLanguageQuery(query) {
  const filters = {};
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('single word') && lowerQuery.includes('palindromic')) {
    filters.word_count = '1';
    filters.is_palindrome = 'true';
  } else if (lowerQuery.includes('longer than')) {
    const match = lowerQuery.match(/longer than (\d+)/);
    if (match) filters.min_length = parseInt(match[1]) + 1;
  } else if (lowerQuery.includes('palindromic') && lowerQuery.includes('first vowel')) {
    filters.is_palindrome = 'true';
    filters.contains_character = 'a'; // Assuming 'a' as the first vowel
  } else if (lowerQuery.includes('containing the letter')) {
    const match = lowerQuery.match(/containing the letter (\w)/);
    if (match) filters.contains_character = match[1];
  } else {
    throw { status: 400, message: 'Unable to parse natural language query' };
  }

  return filters;
}

module.exports = StringService;