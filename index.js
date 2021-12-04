var fs = require("fs-extra");

async function go() {
  global["info"] = {};
  global['AllClassesFolder'] = '/Volumes/BOOTCAMP/@/sdk/build/docs'
  info.toolkit = 'classic';
  info.data = require(`${AllClassesFolder}/${info.toolkit}/${info.toolkit}-all-classes-flatten.json`);
  for (i = 0; i < info.data.global.items.length; i++) {
    doLaunch(info.data.global.items[i],i);
  }
}
go()

function doLaunch(item,i) {
  //console.log(item.alias)
  if (item.alias === 'widget.panel') {
    console.log('***************')
    console.log(item)
  }
  var component = process.argv[2]
  //var processIt = shouldProcessIt(item)
  var processIt = true;
  if (processIt == true) {
    switch(item.$type) {
      case 'property':
        break;
      case 'class':
        if (item.alias != undefined) {
          var doIt = 'no'
          var aliasArray = item.alias.split(',');
          if (aliasArray.length === 2) {
            if (aliasArray[0].substring(0, 6) === 'widget') {
              if (aliasArray[0].slice(7) === component) {
                doIt = 'yes'
              }
              if (aliasArray[1].substring(0, 6) === 'widget') {
                if (aliasArray[1].slice(7) === component) {
                  doIt = 'yes'
                }
              }
            }
          }
          else {
            if (aliasArray[0].substring(0, 6) === 'widget') {
              if (aliasArray[0].slice(7) === component) {
                doIt = 'yes'
              }
            }
          }
          //if (item.alias.substring(0, 6) == 'widget') {
          if (doIt === 'yes') {


              //console.log(item.items)
              //configs
              //events
              //methods
              //sass-mixins
              //static-methods
              //static-properties
              //vars

              var configsArray = []
              const foundConfigs = item.items.find(element => element.$type === 'configs');
              var configs = foundConfigs.items;
              //console.log(configs)
              for (i = 0; i < configs.length; i++) {
                var config = configs[i]
                var o = {}
                o.name = config.name;
                //o.text = config.text;
                o.type = config.type;
                o.defaultValue = config.value;
                configsArray.push(o)
              }

              var methodsArray = []
              const foundMethods = item.items.find(element => element.$type === 'methods');
              var methods = foundMethods.items;
              //console.log(methods)
              for (i = 0; i < methods.length; i++) {
                var method = methods[i]
                var o = {}
                o.name = method.name;
                //o.text = method.text;
                var methodParamsArray = []
                if (method.items !== undefined) {
                  for (j = 0; j < method.items.length; j++) {
                    var param = method.items[j]
                    if (param.$type === 'return') {
                      o.returnType = p.type
                    }
                    if (param.$type === 'param') {
                      var p = {}
                      p.name = param.name
                      p.type = param.type
                      methodParamsArray.push(p)
                    }
                  }
                  o.params = methodParamsArray
                }
                else {
                  //o.params = []
                }
                methodsArray.push(o)
              }

              var eventsArray = []
              const foundEvents = item.items.find(element => element.$type === 'events');
              var events = foundEvents.items;
              //console.log(events)
              for (i = 0; i < events.length; i++) {
                var event = events[i]
                var o = {}
                o.name = event.name;
                //o.text = event.text;

                var eventParamsArray = []
                if (event.items !== undefined) {
                  for (j = 0; j < event.items.length; j++) {
                    var param = event.items[j]
                    if (param.$type === 'return') {
                      o.returnType = p.type
                    }
                    if (param.$type === 'param') {
                      var p = {}
                      p.name = param.name
                      p.type = param.type
                      eventParamsArray.push(p)
                    }
                  }
                  o.params = eventParamsArray
                }
                else {
                  //o.params = []
                }
                eventsArray.push(o)
              }


var primaryCollection = 'na'
var primaryCollectionBaseType = 'na'
if (component === 'grid') {
  var primaryCollection = 'columns'
  var primaryCollectionBaseType = 'Ext.grid.column.Column'
}
if (component === 'panel') {
  var primaryCollection = 'items'
  var primaryCollectionBaseType = 'Ext.Component'
}



              var v = {
                "xtype":component, //item.alias.slice(7),
                "name":item.name,
                "extends":item.extends,
                "extended":item.extended,
                "primaryCollection":primaryCollection,
                "primaryCollectionBaseType":primaryCollectionBaseType,
                "numConfigs": configsArray.length,
                "numMethods": methodsArray.length,
                "numEvents": eventsArray.length,
                "configs":configsArray,
                "methods":methodsArray,
                "events":eventsArray
              }
              //console.log(v)
              fs.writeFileSync('./data/' + component + '.json', JSON.stringify(v,null,2));

          }
          else {
            //console.log(aliasArray)
          }
        }
        break;
      case 'method':
        break;
      case 'enum':
        break;
      default:
        console.log('default: ' + item.$type)
    }
  }
}

function shouldProcessIt(o) {
  var processIt = false;

  if (info.toolkit == 'classic') {
    var item = o
    if (item.alias != undefined) {
      if (item.alias.substring(0, 6) == 'widget') {
        processIt = true;
      }
    }
    if (o.extended != undefined) {
      if ( o.extended.includes("Ext.Base")) {
        processIt = true
      }
    }
    if (o.name == 'Ext.Widget') {
      processIt = true
    }
    if (o.name == 'Ext.Evented') {
        processIt = true
    }
    if (o.name == 'Ext.Base') {
        processIt = true
    }
    // if (o.name == 'Ext.grid.column.Column') {
    //   processIt = false
    // }

    var aliases = []
    item.xtypes = []
    if (item.alias != undefined) {
      aliases = item.alias.split(",")
      for (alias = 0; alias < aliases.length; alias++) {
        if (aliases[alias].substring(0, 6) == 'widget') {
          var xtypelocal = aliases[alias].substring(7)
          item.xtypes.push(xtypelocal)
        }
      }
    }


    // if (processIt == true) {
    //   console.log(item.alias)
    // }

    return processIt
  }
  if (info.toolkit == 'modern') {
    if (o.extended == undefined) {
      processIt = false;
    }
    else {
        var n = o.extended.indexOf("Ext.Widget");
        if (n != -1) {
            processIt = true;
        }
        else {
            processIt = false;
        }
    }
    if (o.name == 'Ext.Widget') {
        processIt = true
    }
    if (o.name == 'Ext.Evented') {
        processIt = true
    }
    if (o.name == 'Ext.Base') {
        processIt = true
    }
    if (o.items == undefined) {
        processIt = false
    }


    return processIt
  }



  // if (info.toolkit == 'modern') {

  //   // var localxtypes = [];
  //   // if (o.alias != undefined) {
  //   //   //if (item.alias.substring(0, 6) == 'widget') {
  //   //     var aliases = o.alias.split(",")
  //   //     for (alias = 0; alias < aliases.length; alias++) {
  //   //       if (aliases[alias].substring(0, 6) == 'widget') {
  //   //         var xtypelocal = aliases[alias].substring(7)
  //   //         localxtypes.push(xtypelocal)
  //   //       }
  //   //     //}
  //   //   }
  //   // }

  //   // if (localxtypes.length == 0) {
  //   //   processIt = false;
  //   //   return processIt;
  //   // }






  //   if (o.alias == undefined) {
  //     processIt = false;
  //   }

  //   else if (o.extended == undefined) {
  //     processIt = false;
  //   }
  //   else {
  //       var n = o.extended.indexOf("Ext.Widget");
  //       if (n != -1) {
  //           processIt = true;
  //       }
  //       else {
  //           processIt = false;
  //       }
  //   }
  //   if (o.name == 'Ext.Widget') {
  //       processIt = true
  //   }
  //   if (o.name == 'Ext.Evented') {
  //       processIt = true
  //   }
  //   if (o.name == 'Ext.Base') {
  //       processIt = true
  //   }
  //   if (o.items == undefined) {
  //       processIt = false
  //   }
  //   return processIt
  // }
}