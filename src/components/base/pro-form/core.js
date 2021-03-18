import ElementMap from './element-map'
// element-ui 自带判断方法
import { isString, isObject, isHtmlElement, isFunction, isUndefined, isDefined } from 'element-ui/src/utils/types'
//  element-ui 自带判断方法
export function computeFormItem(config, form) {


  //(1)复制对象原对象不变
  const item = { ...config }

  // (2) 计算组件真实对应的名称并传入一些默认配置   用来判断是什么类型的  通过这样的方式可以去匹配页面内容
  const res = ElementMap[item.type || 'input']

  // （3）设置类型  有自定义类型和 element框架类型
  item.type = res.component

  //（4） element-map.js默认属性（res）和 自己项目中（item）的属性进行合并
  item.props = Object.assign({}, res.props, item.props)

  //(5) 处理联动组件 现在还没有
  if (isFunction(item.getProps)) { Object.assign(item.props, item.getProps(form)) }
  // !!item.isShow(form)  =>  !undefined==true   !!undefined== false    
  item._isShow = isFunction(item.isShow) ? !!item.isShow(form) : true

  //(6) 处理 校验
  item._rule = getRule(item)


  //(7) 设置内容宽度
  if (item.contentWidth) {
    const temp = typeof item.contentWidth === 'number' ? `${item.contentWidth}px` : item.contentWidth
    item.props.style = { width: temp }
  }
  //(8)返回所有数据
  return item
}

// 组件提示区分 不同的验证方式
const InputMap = ['el-input', 'el-input-number', 'ba-editor']
//校验方法 
function getRule(item) {
  //获取item的属性
  const { rule, isRequired, type, title } = item

  // 判断是否有 验证
  if (typeof isRequired === 'boolean' && isRequired) {
    const isInput = InputMap.indexOf(type) > -1
    return {
      required: true,
      message: `请${isInput ? '输入' : '选择'}${title}`,
      trigger: `${isInput ? 'blur' : 'change'}`
    }
  } else if (isRequired) {
    return rule
  } else {
    return null
  }

}