import React, { useState } from 'react';
import { Layout } from 'antd';

import request from '../../utils/request';
import { scrollTo } from '../../utils';
import HeaderSearch from '../../components/HeaderSearch';

import "./style.less";

const qs = require('qs')

const { Header } = Layout

const headerHeight = 48;

const defaultOptions = {
  loading: false,
  data: undefined,
  error: null
}

const GlobalHeader = (props) => {
  // 搜索结果
  const [options, setOptions] = useState(defaultOptions)
  const [open, setOpen] = useState(false)

  // 查询 product
  const handleSearch = (value) => {
    const query = qs.stringify({
      _where: {
        _or: [{ title_contains: value }, { desc_contains: value }]
      }
    });
    request(`/products?${query}`).then(res => {
      setOptions(prevSate => ({
        ...prevSate,
        loading: false,
        data: res,
        error: null
      }))
      setOpen(true)
    })
  }

  const HeaderStyle = {
    padding: 0,
    height: headerHeight,
    lineHeight: `${headerHeight}px`,
    zIndex: 9,
    width: '100%',
  };

  const buildOptions = options => {
    return (options?.data || []).map(d => ({
      label: d.title,
      value: d.title,
      id: `${d.category.id}-${d.id}`
    }));
  }

  const handleChange = value => {
    setOpen(false)
  }

  const handleBlur = () => {
    setOpen(false)
  }

  // 选择下拉值
  const handleSelect = value => {
    const searchOptions = buildOptions(options)
    const selectedId = (searchOptions.find(d => d.value === value) || {}).id
    const Dom = document.querySelector(`[data-id="${selectedId}"]`)
    if(Dom) {
      scrollTo(Dom.getBoundingClientRect().top);
    }
    setOpen(false)
    return false
  }

  return (
    <Header style={HeaderStyle}>
      <div className='global-header'>
        <div className="flex f1" />
        <div className='right-content'>
          <HeaderSearch
            open={open}
            onSearch={handleSearch}
            buildOptions={buildOptions}
            options={options}
            isLoading={!!options.loading}
            placeholder="回车查找结果"
            onSelect={handleSelect}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </Header>
  )
}

export default GlobalHeader

