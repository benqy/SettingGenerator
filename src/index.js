var index = 0,gfield;
var advid = '';
var fieldFactory = {
  renderChild: function (field,index) {
    var formStr = '';
    formStr += '<div class="parent"><h3>' + field.label + (index * 1 + 1) + '</h3>';
    for (var j = 0; j < field.childFields.length; j++) {
      formStr += fieldFactory[field.childFields[j].type](field.childFields[j], field.name + '[' + index + ']');
    }
    formStr += '</div>';
    return formStr;
  },
  Parent: function (field) {
    var formStr = '',i;
    if (field.length && field.length !== 'auto') {
      for (i = 0; i < field.length; i++) {
        formStr += fieldFactory.renderChild(field, i);
      }
    }
    else{
      if (field.minLength) {
        for (i = 0; i < field.minLength; i++) {
          formStr += fieldFactory.renderChild(field, i);
        }
      }
      index = i;
      gfield = field;
      formStr += '<div><a href="javascript:;" id="addConfig">增加' + field.label + '</a></div>';
    }
    return formStr;
  },
  Text: function (field, parent) {
    var formHtml = '<div><span>' + field.label + '</span><input type="text" name="' + (parent ? parent + '[' : '') + field.name + (parent ? ']' : '') + '" value="' + (field.value || '') + '"></div>';
    return formHtml;
  },
  File: function (field, parent) {
    return this.Text(field, parent);
  },
  Number: function (field, parent) {
    return this.Text(field, parent);
  },
  Bool: function (field, parent) {
    var name = (parent ? parent + '[' : '') + field.name + (parent ? ']' : '');
    var formHtml = '<div><span>' + field.label + '</span>';
    formHtml += '<select name="' + name + '">';
    formHtml += '<option value="true"' + (field.value == 'true' ? 'selected="true"' : '') + '>是</option>';
    formHtml += '<option value="false" ' + (field.value == 'false' ? 'selected="true"' : '') + '>否</option>';
    formHtml +='</select></div>';
    return formHtml;
  },
  Enum: function (field, parent) {
    var name = (parent ? parent + '[' : '') + field.name + (parent ? ']' : '');
    var formHtml = '<div><span>' + field.label + '</span>';
    formHtml += '<select name="' + name + '">';
    for (var i = 0; i < field.enumList.length; i++) {
      formHtml += '<option value="' + field.enumList[i] + '" ' + (field.enumList[i] == field.value ? 'selected="true"' : '') + '>' + field.enumList[i] + '</option>';
    }
    formHtml += '</select></div>';
    return formHtml;
  }
};
var meta;

var dbObj = {name:'SettingGenerator',version:4},tableName = 'formData';

//打开数据库
function initDB(dbObj,cb) {
    dbObj.version = dbObj.version || 1;
    var request = indexedDB.open(dbObj.name, dbObj.version);
    request.onerror = function (e) {
        console.log(e.currentTarget.error.message);
    };
    request.onsuccess = function (e) {
      dbObj.db = e.target.result;
      cb&&cb();
    };
    request.onupgradeneeded = function (e) {
      var thisDB = e.target.result;
      if (!thisDB.objectStoreNames.contains(tableName)) {
        console.log(tableName);
        var objStore = thisDB.createObjectStore(tableName, {keyPath: "advid", autoIncrement: true});
        objStore.createIndex("advid", "advid", {unique: false});
      }
      cb&&cb();
    };
}
function addData(data) {
    var transaction = dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
        console.log("transaction complete");
    };
    transaction.onerror = function (event) {
        console.dir(event);
    };
    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.add(data);
}

function deleteData(advid, cb) {
    var transaction = dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
        console.log("transaction complete");
    };
    transaction.onerror = function (event) {
        console.dir(event)
    };
    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.delete(advid);
    request.onsuccess = function (e) {
        if (cb) {
            cb({
                error: 0,
                data : parseInt(advid)
            })
        }
    };
    request.onerror = function (e) {
        if (cb) {
            cb({
                error: 1
            })
        }
    }
}

function updateData(advid, data, cb) {
  console.log(data)
    var transaction = dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
        console.log("transaction complete");
    };
    transaction.onerror = function (event) {
        console.dir(event)
    };

    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.get(advid);
    request.onsuccess = function (e) {
        var thisDB = e.target.result;
        for (var key in data) {
            thisDB[key] = data[key];
        }
        objectStore.put(thisDB);
        if (cb) {
            cb({
                error: 0,
                data : thisDB
            })
        }
    };
    request.onerror = function (e) {
        if (cb) {
            cb({
                error: 1
            })
        }
    }
}

function getDataById(advid, cb) {
    var transaction = dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
        console.log("transaction complete");
    };
    transaction.onerror = function (event) {
        console.dir(event);
    };

    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.get(advid);
    request.onsuccess = function (e) {
        if (cb) {
            cb(e);
        }
    };
    request.onerror = function (e) {
        if (cb) {
            cb({
                error: 1
            });
        }
    };
}

//将表单存储到数据库中
var formToCode = function () {
  var data = $('#form').serializeJSON({ useIntKeysAsArrayIndex: true });
  var dbData = $('#form').serializeObject();
  dbData.advid = advid;
  getDataById(advid,function(e){
    if(e.target.result){
      deleteData(advid,function(){
        addData(dbData);         
      });
    }
    else{
      addData(dbData);
    }
  });
  $('#code').text( meta.compile(data));
};

var loadForm = function (advid){
  getDataById(advid,function(e){
  	$('#form').deserialize(e.target.result);
    formToCode();
  });
};
var initAdvList = function(){
  //模拟数据
  var list = {
    ad17173indexbanner1:{
      advid:'ad17173indexbanner1',
      name:'[1]17173首页第一通栏（三轮换）'
    },
    Ad2PTopbg01:{
      advid:'Ad17173Duilian1',
      name:'[2]17173首页固定对联（三轮换）'
    },
    ad17173banner2:{
      advid:'ad17173banner2',
      name:'[3]首页第二通栏（三轮换）'
    }
  };
  var $select = $('#advList');
  Object.keys(list).forEach(function(key){
    var obj = list[key];
    $select.append('<option value="'+obj.advid+'">'+obj.name+'</option>');
  });
  
};
initDB(dbObj);
initAdvList();
var loadMeta = function(advid){
  FG.loadMetadata(advid, function (m) {
    meta = m;
    $('#title').text(meta.title);
    var fields = meta.fields, forms = '';
    for (var i = 0; i < fields.length; i++) {
      forms += fieldFactory[fields[i].type](fields[i]);                
    }
    $('#form').text('').prepend(forms);
    $('#addConfig').on('click',function () {
      if (gfield.maxLength > index) {
        var child = fieldFactory.renderChild(gfield, index);
        index++;
        $('.parent:last').after(child);
      }
    });
    $('form input,form select').on('change',function(){
      formToCode();
    });
    loadForm(advid);
  });
};
$('#advList').on('change',function(){
  advid = $(this).val();
  $('#code').text('');
  $('#form').text('');
  loadMeta(advid);
});