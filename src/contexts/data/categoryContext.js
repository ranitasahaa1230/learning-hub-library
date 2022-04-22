import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [sidebars, toggleSidebar] = useState(false);
  const [categoryState, setCategoryState] = useState({
    loading: false,
    categories: [],
    error: "",
  });

  const handleToggleSidebar = () => toggleSidebar((prev) => !prev);

  useEffect(() => {
    (async () => {
      try {
        setCategoryState((prevState) => ({
          ...prevState,
          loading: true,
          error: "",
        }));
        const { status, data } = await axios.get("/api/categories");
        if (status === 200) {
          setCategoryState((prevState) => ({
            ...prevState,
            categories: data.categories,
            loading: false,
          }));
        }
      } catch (err) {
        setCategoryState((prevState) => ({
          ...prevState,
          error: err.response.data.errors[0],
          loading: false,
        }));
      }
    })();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryState, setCategoryState, sidebars, handleToggleSidebar }}>
      {children}
    </CategoryContext.Provider>
  );
};
const useCategory = () => useContext(CategoryContext);

export { useCategory, CategoryProvider };
