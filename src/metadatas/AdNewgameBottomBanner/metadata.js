
(function (FG) {
  FG.ADGenertorBase.extend('AdNewgameBottomBanner', {
    path: '/newgame',
    filename: 'index.js',
    title: '新游底部轮刷通栏',
    _template: function () {/*
advConfigs.config({
    type: 'DrAlterAble',
    ads: [
    <% for(var i = 0; i <this.ads.length; i++) {%>
    {
      type: 'AdZhuanquFloatad',
      url: '<%ads[i].url%>',
      source: '<%ads[i].source%>',
      minisizedImg: '<%ads[i].minisizedImg%>'
    }
    <% } %>
    ]
});
  */},
    fields: [
      {
        type: FG.TYPES.Parent,
        name: 'ads',
        minLength: 1, maxLength: 3,
        label:'轮播配置',
        childFields: [
          { type: FG.TYPES.File, name: 'source', label: '图片', value: '' },
          { type: FG.TYPES.Text, name: 'url', label: '广告链接', value: '' },
          { type: FG.TYPES.File, name: 'minisizedImg', label: '关闭按钮', value: '' }
        ]
      }]
  });
})(FG);
