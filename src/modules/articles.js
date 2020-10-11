import axios from "axios";

const Articles = {
  async index(category) {
    let params = category && { category: category }
    let result = await axios.get("/articles", { params: params });
    return result.data.articles;
  },
  async show(articleId) {
    try {
      let result = await axios.get(`/articles/${articleId}`);
      return result.data.article;
    } catch (error) {
      return error.response.data.error;
    }
  },
};
export default Articles;
