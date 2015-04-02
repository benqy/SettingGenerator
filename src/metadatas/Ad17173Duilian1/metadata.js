(function (FG) {
  FG.ADGenertorBase.extend('Ad17173Duilian1', {
    title: '17173首页固定对联（三轮换）',
    _template: function () {/*
advConfigs.config({
  type: 'DrAlterAble',
  cookieId:'Ad17173Duilian',
  ads: [<% for(var i = 0; i <this.ads.length; i++) {%>{
    type: 'Ad17173Duilian',
    advid:'Ad17173Duilian1',
    source_left: '<%ads[i].source_left%>',
    source_right: '<%ads[i].source_right%>',
    link: '<%ads[i].link%>',
    width:110,
    height:300
  }<% } %>]
});
  */},
    fields: [
      {
        type: FG.TYPES.Parent,
        name: 'ads',
        length:3,
        label:'轮播配置',
        childFields: [
          { type: FG.TYPES.File, name: 'source_left', label: '左侧图片素材', value: '' },
          { type: FG.TYPES.File, name: 'source_right', label: '右侧图片素材', value: '' },
          { type: FG.TYPES.Text, name: 'link', label: '广告链接', value: '' }
        ]
      }]
  });
})(FG);