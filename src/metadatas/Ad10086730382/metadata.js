(function (FG) {
  FG.ADGenertorBase.extend('Ad10086730382', {
    path: '/17173',
    filename: 'index.js',
    title: '组图广告',
    _template: function () {/*!
advConfigs.config({
    fuckIe6: <%fuckIe6%>,
    type:'AdSlideShow',
    randomShow: <%randomShow%>,
    autoPlay: <%autoPlay%>,
    animateSpeed: <%animateSpeed%>,
    defaultAni: '<%defaultAni%>',
    thumbAniInterval: <%thumbAniInterval%>,
    <%if(this.interval<100){%>
    intervale:700,
    <%}else{%>
    interval: <%interval%>,
    <%}%>
    ads: [<% for(var i = 0;i<this.ads.length; i++) { %>{
        img: "<%ads[i].img%>",
        thumbImg: "<%ads[i].thumbImg%>",
        link:"<%ads[i].link%>",
        title:"<%ads[i].title%>",
        desc:"<%ads[i].desc%>"
    }<% } %>]
});
  */},
    fields: [
      { type: FG.TYPES.Bool, name: 'fuckIe6', label: 'ie6禁用动画', value: 'true' },
      { type: FG.TYPES.Bool, name: 'randomShow', label: '随机图片顺序', value: 'false' },
      { type: FG.TYPES.Bool, name: 'autoPlay', label: '自动播放', value: 'true' },
      { type: FG.TYPES.Number, name: 'animateSpeed', label: '大图动画速度(毫秒)', value: '1500' },
      { type: FG.TYPES.Number, name: 'thumbAniInterval', label: '缩略图动画时间(毫秒)', value: '800' },
      { type: FG.TYPES.Number, name: 'interval', label: '自动播放间隔(毫秒)', value: '2000' },
      { type: FG.TYPES.Enum, name: 'defaultAni', label: '默认动画', value: 'random',
        enumList: 'fadeIn,slideRight,lineRight,lineTop,lineLeft,lineBottom,random'.split(',')},
      {
        type: FG.TYPES.Parent, name: 'ads', length: 'auto', minLength: 1, maxLength: 3, label: '图片配置',
        childFields: [
          { type: FG.TYPES.File, name: 'img', label: '大图' },
          { type: FG.TYPES.File, name: 'thumbImg', label: '缩略图' },
          { type: FG.TYPES.File, name: 'link', label: '图片链接' },
          { type: FG.TYPES.File, name: 'title', label: '标题' },
          { type: FG.TYPES.File, name: 'desc', label: '描述' }
        ]
      },
    ]
  });
})(FG);
