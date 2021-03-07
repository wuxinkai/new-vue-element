export default function (
  //这些都是参数 不传参的时候默认显示以下定义的
  msg = "是否确认新建",
  title = "系统提示",
  title1 = "此项为新建一名用户",
  iconType = "el-icon-warning", //图标类型
  iconColor = "#ccc", //图标颜色
  settings = {}
) {
  Object.assign(settings, {
    //合并对象
    customClass: "confirm-box",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    dangerouslyUseHTMLString: true //允许确认框内容为html格式
  });
  let iconAry = iconType.split("-")

  if (iconAry.length > 1) {
    if (iconAry[1] == "img") {
      var iconStyleNext = "confirm-img-show";
      iconType = null
    }
  }
  return this.$confirm(
    //定义样式已经设置为html格式，可以自定义( 这里我直接写了内联 )
    `<div style="height:94px;margin:auto;display:flex;justify-content: start;">
      <i class="${iconType} ${iconStyleNext}" style="font-size:43px;align-self:center;margin-right:5px;color:${iconColor}"></i>
      <span style="display:block;align-self: center;margin-left:5px">
        <p style="font-weight:bold;color: #6C6C6C;font-size: 15px;">${msg}</p>
        <p style="color: #ABA5A5;">${title1}</p>
      </span>
      </div>
      `,
    //把定义的参数反出去
    title,
    settings,
    title1,
    iconType,
    iconColor
  );
}

