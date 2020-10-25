import axios from "axios";
import { getAuthHeaders } from "./auth";
import { getCurrentPosition } from './location';

const Articles = {
  async index(category) {
    try {
      let result;
      if (category) {
        result = await axios.get(`/articles/?category=${category}`);
      } else {
        result = await axios.get("/articles");
      }
      return result.data.articles;
    } catch (error) {
      return error.response.data.error;
    }
  },

  async localIndex() {
    const location = await getCurrentPosition()
    try {
      let result = await axios.get(`/articles/?location=${location}`);
      return {articles: result.data.articles, location: location}
    } catch (error) {
      return error.response.data.error;
    }
  },

  async show(articleId, authenticated) {
    try {
      let result;
      if (authenticated) {
        result = await axios.get(`/articles/${articleId}`, {
          headers: getAuthHeaders(),
        });
      } else {
        result = await axios.get(`/articles/${articleId}`);
      }
      return result.data.article;
    } catch (error) {
      return error.response.data.error;
    }
  },
};
export default Articles;
