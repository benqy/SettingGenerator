/// <reference path="../../core.js" />
(function (FG) {
  FG.ADGenertorBase.extend('Ad2PTopbg01', {
    path: '/2p',
    filename: 'index.js',
    title: '2p首页背景广告',
    _template: function () {/*
advConfigs.config({
    advid:'<%advid%>',
  type: 'Ad2PTopbg',
  adTHeight:100,
  src: '<%src%>',
  url :'<%url%>'
});
  */},
    fields: [
      { type: FG.TYPES.File, name: 'src', label: '图片', value: '', maxSize:20},
      { type: FG.TYPES.Text, name: 'url', label: '广告链接', value: '' }
    ]
  });
})(FG);
