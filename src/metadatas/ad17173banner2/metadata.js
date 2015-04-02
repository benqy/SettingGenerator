(function (FG) {
  FG.ADGenertorBase.extend('ad17173banner2', {
    title: '首页第二通栏（三轮换）',
    _template: function () {/*
advConfigs.config({
  type: 'DrAlterAble',
  cookieId:'ad17173banner2',
  ads: [<% for(var i = 0; i <this.ads.length; i++) {%>{
    type: 'Ad17173Banner',
    advid:'ad17173banner2',
    width:750,
    height:120,
    source: '<%ads[i].source%>',
    link: '<%ads[i].link%>'
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
          { type: FG.TYPES.File, name: 'source', label: '素材地址', value: '' },
          { type: FG.TYPES.Text, name: 'link', label: '广告链接', value: '' }
        ]
      }]
  });
})(FG);