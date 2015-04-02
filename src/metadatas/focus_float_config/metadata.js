(function (FG) {
  FG.ADGenertorBase.extend('focus_float_config', {
    title: '焦点图包框流媒体(四轮换)',
    _template: function () {/*
[<% for(var i = 0; i <this.ads.length; i++) {%>{
    //广告地址
    url: '<%ads[i].url%>',
    //小图
    focusUp: '<%ads[i].focusUp%>',
    //覆盖flash素材
    focusCover: '<%ads[i].focusCover%>',
    focusContent: {
      //焦点图缩略图
      thumb: '<%ads[i].thumb%>',
      //焦点图大图
      image: '<%ads[i].image%>',
      alt: '',
      width: 365  
    }
}<% } %>]
  */},
    fields: [
      {
        type: FG.TYPES.Parent,
        name: 'ads',
        length:4,
        label:'轮播配置',
        childFields: [
          { type: FG.TYPES.File, name: 'source', label: '素材地址', value: '' },
          { type: FG.TYPES.Text, name: 'link', label: '广告链接', value: '' }
        ]
      }]
  });
})(FG);