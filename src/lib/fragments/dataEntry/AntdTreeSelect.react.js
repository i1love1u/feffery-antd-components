import React, { useEffect, useMemo, useContext } from 'react';
import { TreeSelect, ConfigProvider } from 'antd';
import { str2Locale } from '../../components/locales.react';
import { isUndefined, isString } from 'lodash';
import { flatToTree } from '../../components/utils';
import useCss from '../../hooks/useCss';
import PropsContext from '../../contexts/PropsContext';
import { propTypes, defaultProps } from '../../components/dataEntry/AntdTreeSelect.react';

const { SHOW_ALL, SHOW_CHILD, SHOW_PARENT } = TreeSelect;

// 定义勾选项回填策略映射字典
const str2ShowCheckedStrategy = new Map(
    [
        ['show-all', SHOW_ALL],
        ['show-child', SHOW_CHILD],
        ['show-parent', SHOW_PARENT]
    ]
)

// 定义树选择组件AntdTreeSelect，api参数参考https://ant.design/components/tree-select-cn/
const AntdTreeSelect = (props) => {
    // 取得必要属性或参数
    let {
        id,
        style,
        className,
        popupClassName,
        key,
        locale,
        treeData,
        treeDataMode,
        allowClear,
        bordered,
        treeLine,
        listHeight,
        placeholder,
        value,
        defaultValue,
        maxTagCount,
        multiple,
        size,
        treeCheckable,
        treeCheckStrictly,
        treeDefaultExpandAll,
        treeDefaultExpandedKeys,
        treeExpandedKeys,
        virtual,
        disabled,
        placement,
        status,
        treeNodeFilterProp,
        treeNodeFilterMode,
        autoClearSearchValue,
        popupContainer,
        setProps,
        readOnly,
        showCheckedStrategy,
        dropdownBefore,
        dropdownAfter,
        persistence,
        persisted_props,
        persistence_type,
        loading_state,
        batchPropsNames
    } = props;

    // 批属性监听
    useEffect(() => {
        if (batchPropsNames && batchPropsNames.length !== 0) {
            let _batchPropsValues = {};
            for (let propName of batchPropsNames) {
                _batchPropsValues[propName] = props[propName];
            }
            setProps({
                batchPropsValues: _batchPropsValues
            })
        }
    })

    const context = useContext(PropsContext)
    locale = (context && context.locale) || locale

    useEffect(() => {
        if (!value && defaultValue) {
            setProps({ value: defaultValue })
        }
        if (!treeExpandedKeys && treeDefaultExpandedKeys) {
            setProps({ treeExpandedKeys: treeDefaultExpandedKeys })
        }
    }, [])

    const flatToTreeData = useMemo(() => {
        return flatToTree(treeData);
    }, [treeData])

    // 用于获取用户已选择值的回调函数
    const updateSelectedValue = (e) => {

        if (treeCheckStrictly) {
            setProps({ value: e.map(item => item.value) })
        } else {
            setProps({ value: e })
        }

    }

    // 返回定制化的前端组件
    return (
        <ConfigProvider locale={str2Locale.get(locale)}>
            <TreeSelect
                id={id}
                className={
                    isString(className) ?
                        className :
                        (className ? useCss(className) : undefined)
                }
                style={{
                    width: '100%',
                    ...style
                }}
                popupClassName={popupClassName}
                key={key}
                treeData={treeDataMode === 'flat' ? flatToTreeData : treeData}
                allowClear={isUndefined(readOnly) ? allowClear : !readOnly}
                bordered={bordered}
                treeLine={treeLine}
                listHeight={listHeight}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                maxTagCount={maxTagCount}
                multiple={multiple}
                size={
                    context && !isUndefined(context.componentSize) ?
                        context.componentSize :
                        size
                }
                treeCheckable={treeCheckable}
                showCheckedStrategy={str2ShowCheckedStrategy.get(showCheckedStrategy)}
                treeCheckStrictly={treeCheckStrictly}
                treeDefaultExpandAll={treeDefaultExpandAll}
                treeDefaultExpandedKeys={treeDefaultExpandedKeys}
                treeExpandedKeys={treeExpandedKeys}
                onChange={updateSelectedValue}
                showSearch={true}
                virtual={virtual}
                disabled={
                    context && !isUndefined(context.componentDisabled) ?
                        context.componentDisabled :
                        disabled
                }
                placement={placement}
                status={status}
                treeNodeFilterProp={treeNodeFilterProp}
                filterTreeNode={
                    (inputValue, treeNode) => {
                        // 处理''特殊情况
                        inputValue = inputValue || ''
                        if (inputValue !== '') {
                            if (treeNodeFilterMode === 'case-insensitive') {
                                // 进行大小写不敏感筛选
                                return (treeNode[treeNodeFilterProp] || '').toLowerCase()
                                    .includes(inputValue.toLowerCase())
                            } else if (treeNodeFilterMode === 'case-sensitive') {
                                // 判断输入的内容是否是当前选项筛选依据字段值的子串
                                return treeNode[treeNodeFilterProp].includes(inputValue)
                            } else if (treeNodeFilterMode === 'regex') {
                                // 判断输入的正则规则是否匹配当前选项筛选依据字段值
                                try {
                                    // 尝试进行正则匹配
                                    return eval(`/${inputValue}/`).test(treeNode[treeNodeFilterProp])
                                } catch {
                                    // 忽略非法的正则表达式
                                    return false
                                }
                            }
                        }
                        return false
                    }
                }
                autoClearSearchValue={autoClearSearchValue}
                dropdownRender={
                    (dropdownBefore || dropdownAfter) ?
                        (menu) => {
                            return (
                                <>
                                    {dropdownBefore}
                                    {menu}
                                    {dropdownAfter}
                                </>
                            );
                        } : undefined
                }
                onTreeExpand={(e) => {
                    setProps({ treeExpandedKeys: e })
                }}
                persistence={persistence}
                persisted_props={persisted_props}
                persistence_type={persistence_type}
                data-dash-is-loading={
                    (loading_state && loading_state.is_loading) || undefined
                }
                getPopupContainer={
                    popupContainer === 'parent' ?
                        (triggerNode) => triggerNode.parentNode :
                        undefined
                }
                open={isUndefined(readOnly) || !readOnly ? undefined : false}
            />
        </ConfigProvider>
    );
}

export default AntdTreeSelect;

AntdTreeSelect.defaultProps = defaultProps;
AntdTreeSelect.propTypes = propTypes;