import { categoryProps } from "@/Interface";
import { Select } from "antd";
import { FC } from "react";

const Category: FC<categoryProps> = ({
  categories,
  setSelectedCategory,
  selectedCategory,
}) => {
  const options = [{ value: "all", label: "All" }];
  options.push.apply(
    options,
    categories.map(({ id, name }) => ({
      value: id,
      label: name,
    }))
  );

  const handleChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <Select
      className='selectWidth'
      defaultValue='all'
      value={selectedCategory}
      options={options}
      onChange={handleChange}
    />
  );
};

export default Category;
