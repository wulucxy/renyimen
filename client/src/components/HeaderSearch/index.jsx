import { SearchOutlined, LoadingOutlined, FrownOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Tooltip } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { isEmpty } from 'lodash'

import cx from 'classnames';
import './index.less';

const HeaderSearch = (props) => {
  const {
    className,
    onVisibleChange,
    placeholder,
    open,
    defaultOpen,
    buildOptions,
    options,
    isLoading,
    onChange,
    onSelect,
    ...restProps
  } = props;

  const inputRef = useRef(null);
  const showSuffix = useRef(false);

  const [searchMode, setSearchMode] = useState(false);

  const searchOptions = buildOptions(options)

  const buildSuffix = (options) => {
    if (!showSuffix.current) return <span />
    const suffixMap = {
      isLoading: <LoadingOutlined />,
      isEmpty: <Tooltip title="当前查询无结果" placement="bottomRight"><FrownOutlined /></Tooltip>,
    }

    const suffix = !isLoading && Array.isArray(options.data) && isEmpty(options.data)
      ? suffixMap['isEmpty']
      : isLoading ? suffixMap['isLoading'] : <span />

    return suffix;
  }

  const handleInputChange = (event) => {
    // 输入时不展示
    showSuffix.current = false
    onChange(event.target.value)
  }

  useEffect(() => {
    if (searchMode && inputRef.current) {
      inputRef.current.input.focus();
    }
  }, [searchMode, inputRef])

  const inputClass = cx('input', {
    show: searchMode,
  });

  const suffix = buildSuffix(options)

  return (
    <div
      className={cx(className, 'headerSearch')}
      onClick={() => {
        setSearchMode(true);
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
          fontSize: 16
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        style={{
          height: 28,
          marginTop: -6,
        }}
        options={searchOptions}
        onSelect={onSelect}
        open={open}
      >
        <Input
          ref={inputRef}
          aria-label={placeholder}
          placeholder={placeholder}
          suffix={suffix}
          allowClear
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              showSuffix.current = true
              if (restProps.onSearch) {
                restProps.onSearch(e.target.value);
              }
            }
          }}
          onBlur={() => {
            if (restProps.onBlur) {
              restProps.onBlur();
            }
            setSearchMode(false);
          }}
          onFocus={() => {
            showSuffix.current = false
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;