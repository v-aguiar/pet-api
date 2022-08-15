const CategoryUtils = {
  getByInput: (inputValue: string) => {
    const categories = ["cat", "dog", "rabbit", "rodent", "bird", "other"];
    const categoriesFilter = categories.filter((category) => category.includes(inputValue));

    if (!categoriesFilter) {
      throw {
        name: "notFound",
        message: "⚠ No category matching the input value found."
      };
    }

    return categoriesFilter;
  }
};

export default CategoryUtils;
