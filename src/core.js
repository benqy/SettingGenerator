/**
 * 配置表单生成工具
 * @version

   v0.1.0
      基础功能完成
 * @module FG
 * @class FG
 * @main FG
 * @static
 */
(function (global) {

  var FG = global.FG = global.FormGererator = {};

  /**
  * 合并对象,后面的覆盖前面
  * @method merge
  * @namespace FG
  * @param {Object} args  要合并的对象(Object),可以为2至n个
  * @return {Object} 合并后的对象
  * @static
  */
  FG.merge = function () {
    /// <summary>
    /// 合并对象,后面的覆盖前面
    /// </summary>
    /// <param name="args" type="arguments">
    /// 
    /// </param>
    ///<returns type="Object" />
    var length = arguments.length;
    if (length < 1) return {};
    if (length < 2) {
      return FG.merge(FG, arguments[0]);
    }
    var result = arguments[0];
    for (var i = 1; i < length; i++) {
      var obj = arguments[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = obj[key];
        }
      }
    }
    return result;
  };
  FG.merge({
    /**
    * 传入指定的模版和数据,返回解析后的内容
    * @method compile
    * @namespace FG
    * @param {String} tmpl 要解析的模版
    * @param {Object} modal 用于模版解析的数据
    * @return String 解析后的内容
    * @static
    */
    compile: function (tmpl, modal) {
      var re = /<%([^%>]+)?%>/g,
      reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
      code = 'var r=[];\n',
      trimReg = /(^\s+)|(\s+$)/g,
      cursor = 0;
      //for循环的项之间自动加上逗号
      //tmpl = tmpl.replace(/<%\s*for.*%>/g, '<% for(var i = 0; i < this.ads.length; i++) {%>\n<% if(i!=0){%>\n,\n<% }%>');
      tmpl = tmpl.replace(/<%\s*for.*%>/g, function ($0, $1, $2) {
        return $0 + '<% if(i!=0){%>,<% }%>';
      });
      tmpl = tmpl.replace(/\n/g, '\\n');
      /*if (modal.advid) {
        tmpl = tmpl.replace('advConfigs.config({', "advConfigs.config({\\n    advid:'" + modal.advid + "',");
      }*/
      var add = function (line, js) {
        js ?
        (code += line.match(reExp) ? line + '\n' : 'r.push(this.' + line.replace(trimReg, '') + ');\n')
        :
        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
      }
      while (match = re.exec(tmpl)) {
        add(tmpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
      }
      add(tmpl.substr(cursor, tmpl.length - cursor));
      code += 'return r.join("");';
      return new Function(code.replace(/[\r\t\n]/g, '')).apply(modal);
    },
    /**
    * 加载脚本文件后执行回调函数
    * @method loadScript
    * @namespace FG
    * @param {String} url  要加载的脚本文件
    * @param {Function} fn 回调函数
    * @static
    */
    loadScript: function (url, fn) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      if (script.addEventListener) {
        script.addEventListener("load", fn, false);
      } else if (script.attachEvent) {
        script.attachEvent("onreadystatechange", function () {
          var target = window.event.srcElement;
          if (target.readyState == "loaded") {
            fn();
          };
        });
      }
      document.getElementsByTagName("head")[0].appendChild(script);
    },

    /**
    * 根据id加载配置文件
    * @method loadMetadata
    * @namespace FG
    * @param {String} id  要加载的配置文件id(如果是用于广告,则为广告位id)
    * @param {Function} function(FG.GenertorBase)
    * @static
    */
    loadMetadata: function (id, fn) {
      var url = FG.BASE_DIR + '/metadatas/' + advid.toLowerCase() + '/metadata.js';
      if (FG[advid]) {
        fn(new FG[advid]);
      }
      else {
        this.loadScript(url, function () {
          fn(new FG[advid]());
        });
      }
    }
  });


  var initializing = false,
    fnTest = /xyz/.test(function () { xyz; }) ? /\bbase\b/ : /.*/;

  /**
    * 所有构造函数的父类,用于实现继承.FG中所有构造函数都是通过FG.Class.extend来创建.
    * 
    * @class Class
    * @namespace FG
    * @static
    */
  function Class() { };

  /**
    * 继承当前构造函数,创建新的构造函数
    * 
    * @method extend
    * @namespace FG
    * @param {String} ns 要创建的构造函数的名称,此构造函数将依附在FG命名空间下.
    * @param {Object} prop 构造函数成员
    * @return Function 子类构造函数
    * @static
    */
  Class.extend = function (ns, prop) {
    /// <summary>
    /// 从当前类派生出子类,可以使用this.base()调用当前方法的父方法
    /// </summary>
    /// <param name="ns" type="String">
    /// 附加到FG命名空间下的类名称
    /// </param>
    /// <param name="prop" type="Object">
    /// 类成员,如果包含init方法,将会在调用构造函数时被自动调用
    /// </param>
    ///<returns type="Function" />
    if (arguments.length == 2) {
      var firstLetter = ns.split('')[0];
      //强制要求构造函数大写开头
      //if (firstLetter.toUpperCase() != firstLetter) {
      //  throw new Error("Constructor must begin with Uppercase letter:" + ns);
      //}
      var Fn = this.extend(prop);
      Fn.classType = ns;
      FG[ns] = Fn;
      return;
    }
    prop = arguments[0];
    var base = this.prototype;
    initializing = true;
    var prototype = new this();
    initializing = false;
    for (var name in prop) {
      prototype[name] = typeof prop[name] == "function" &&
        typeof base[name] == "function" && fnTest.test(prop[name]) ?
        (function (attrName, fn) {
          return function () {
            var tmp = this.base;
            this.base = base[attrName];

            var ret = fn.apply(this, arguments);
            this.base = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    function classs() {
      if (!initializing && this.init)
        this.init.apply(this, arguments);
    }

    classs.prototype = prototype;

    classs.prototype.constructor = classs;

    classs.extend = Class.extend;

    return classs;
  };

  FG.Class = Class;

  /**
  * 表单配置接口,声明每个表单配置类必须实现的功能.
  *
  * @class FG.IGenertor
  * @module FG
  * @constructor
  * @extends FG.Class
  */
  FG.Class.extend('IGenertor', {
    init: function () {
    },
    /**
    * 用来编写当前配置类的模版,要取得模版内容,请使用getTemplate方法.
    * 详见:模版编写文档.
    * 
    * @Private
    * @property _template
    * @type {Function}
    * @default function(){}
    */
    _template: function () { },
    /**
    * 当前配置类的字段描述,用于描述表单字段的内容.
    *
    * @property fields
    * @type {Array}
    * @default []
    */
    fields: [],
    /**
    * 取得当前模版内容.
    * @method getTemplate
    * @return {String} 配置模版
    */
    getTemplate: function () {
    },
    /**
    * 将传入的对象传入到当前模版中解析,并返回解析后的内容.
    * @method compile
    * @param {Object} data 要解析的数据
    * @return {String} 模版与数据解析后的配置内容
    */
    compile: function (data) { },
    /**
    * 生成Parent类型字段的表单项.
    * @method renderParent
    * @param {Object} field 字段配置
    * @param {String} parentName 父字段的Name
    * @return {String} 表单项html
    */
    renderParent: function (field, parentName) { },
    /**
    * 生成Hidden类型字段的表单项.
    * @method renderHidden
    * @param {Object} field 字段配置
    * @return {String} 表单项html
    */
    renderHidden: function (field) { },
    /**
    * 生成Date类型字段的表单项.
    * @method renderDate
    * @param {Object} field 字段配置
    * @return {String} 表单项html
    */
    renderDate: function (field) { },
    /**
    * 生成Time类型字段的表单项.
    * @method renderTime
    * @param {Object} field 字段配置
    * @return {String} 表单项html
    */
    renderTime: function () { },
    /**
    * 生成File类型字段的表单项.
    * @method renderFile
    * @param {Object} field 字段配置
    * @return {String} 表单项html
    */
    renderFile: function () { },
    /**
    * 生成Number类型字段的表单项.
    * @method renderNumber
    * @param {Object} field 字段配置
    * @return {String} 表单项html
    */
    renderNumber: function () { },
    /**
    * 生成Text类型字段的表单项.
    * @method renderText
    * @param {Object} field 字段配置
    * @return {String} 表单项html
    */
    renderText: function () {}
  });


  /**
  * 广告配置文件基类,实现了广告模版解析.表单生成等功能.每个配置文件都继承此类
  *
  * @class FG.ADGenertorBase
  * @module FG
  * @constructor
  * @extends FG.IGenertor
  */
  FG.IGenertor.extend('ADGenertorBase', {
    /**
    * 投放代码在cdn中的存放路径
    *
    * @property path
    * @type {String}
    * @default ''
    */
    path: '',
    /**
    * 投放代码在cdn中的文件名
    *
    * @property filename
    * @type {String}
    * @default ''
    */
    filename: '',
    /**
    * 广告位标题
    *
    * @property title
    * @type {String}
    * @default ''
    */
    title: '',
    init: function () {

    },
    getTemplate: function () {
      return this._template.toString().split(/\n/).slice(1, -1).join('\n');
    },
    compile: function (data) {
      return FG.compile(this.getTemplate(),data);
    },
    renderPanent: function (field,parentName,bf,af) {

    },
    renderHidden: function () {

    },
    renderDate: function () {

    },
    renderTime:function(){

    },
    renderFile:function(){

    },
    renderNumber:function(){

    },
    renderText: function () {

    }
  });


  FG.merge({
    /**
      * 支持的字段类型列表
      * 
      * @class FG.TYPES
      * @namespace FG
      * @static
      */
    TYPES: {
      /**
      * 对象类型,包含多个子字段
      * 
      * @property Parent
      * @type {String}
      */
      Parent: 'Parent',
      /**
      * 隐藏字段
      * @property Hidden
      * @type {String}
      */
      Hidden: 'Hidden',
      /**
      * 日期类型
      * @property Date
      * @type {String}
      */
      Date: 'Date',
      /**
      * 时间类型
      * @property Time
      * @type {String}
      */
      Time: 'Time',
      /**
      * 文件类型
      * @property File
      * @type {String}
      */
      File: 'File',
      /**
      * 数值类型
      * @property Number
      * @type {String}
      */
      Number: 'Number',
      /**
      * 文本类型
      * @property Text
      * @type {String}
      */
      Text: 'Text',
      /**
      * Boolean类型
      * @property Bool
      * @type {String}
      */
      Bool: 'Bool',
      /**
      * 枚举(列表)类型
      * @property Enum
      * @type {String}
      */
      Enum: 'Enum'
    }
  });
  FG.BASE_DIR = 'http://10.5.15.99:10086/src';

})(this);