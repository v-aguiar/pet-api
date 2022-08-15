import CategoryUtils from "../utils/categoryUtils.js";

const categoryService = {
  getByInput: async (inputValue: string) => {
    const categories = CategoryUtils.getByInput(inputValue);

    return categories;
  }
};

export default categoryService;
