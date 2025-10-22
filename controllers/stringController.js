const StringService = require('../services/stringService');

class StringController {
  static async createString(req, res) {
    try {
      const { value } = req.body;
      if (!value) {
        return res.status(400).json({ error: 'Missing "value" field' });
      }
      const result = await StringService.createString(value);
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async getString(req, res) {
    try {
      const { string_value } = req.params;
      console.log('Received string_value:', string_value); // Debug log
      const result = await StringService.getString(string_value);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async getAllStrings(req, res) {
    try {
      const filters = req.query;
      const result = await StringService.getAllStrings(filters);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async filterByNaturalLanguage(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: 'Missing "query" parameter' });
      }
      const result = await StringService.filterByNaturalLanguage(query);
      res.status(200).json({
        data: result.data,
        count: result.count,
        interpreted_query: {
          original: query,
          parsed_filters: result.filters_applied,
        },
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async deleteString(req, res) {
    try {
      const { string_value } = req.params;
      console.log('Received string_value for delete:', string_value); // Debug log
      await StringService.deleteString(string_value);
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}

module.exports = StringController;