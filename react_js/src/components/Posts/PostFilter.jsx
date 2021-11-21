import React from "react";
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";


const PostFilter = ({ children, filter, setFilter }) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={event => setFilter({ ...filter, query: event.target.value })}
        type="text"
        placeholder="Поиск"
      />
      <div className='flex-wrap'>
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
          defaultValue="Сортировка"
          options={[
            { value: 'id', name: 'По номеру' },
            { value: 'title', name: 'По заголовку' },
            { value: 'body', name: 'По описанию' }
          ]}
        />
        {children}
      </div>
    </div>
  )
};

export default PostFilter;
