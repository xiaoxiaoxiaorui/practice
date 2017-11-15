/**
 * Created by Administrator on 2017/11/1.
 */

  var eventHandle = {
      //  添加事件处理
      addEventHandle:function (element,Type,Handle) {
          if(element.addEventListener){
              element.addEventListener(Type,Handle,false);
          }else if(element.attachEvent){
              element.attachEvent('on'+Type,Handle);
          }else{
              element['on'+Type]=Handle;
          }
      },
      //  删除事件
      removeEventHandle:function (element,Type,Handle) {
          if(element.removeEventListener){
              element.removeEventListener(Type,Handle,false);
          }else if(element.detachEvent){
              element.detachEvent('on'+Type,Handle);
          }else{
              element['on'+Type]=Handle;
          }
      },
      //  获取事件
      getEvent:function (event) {
          return event?event:window.event;
      },
      //  获取事件类型
      getType:function (event) {
          return event.type;
      },
      //  获取事件目标
      getTarget:function (event) {
          if(event.target){
              return event.target;
          }else{
              return event.srcElement;
          }
      },
      //  阻止事件冒泡
      stopPropagation:function (event) {
          if(event.stopPropagation){
              event.stopPropagation();
          }else{
              event.cancelBubble = true;  // ie下阻止冒泡（true为阻止默认）
          }
      },
      //  阻止事件默认行为
      preventDefault:function (event) {
          if(event.preventDefault){
              event.preventDefault();
          }else{
              event.returnValue = false;   //   IE下阻止默认行为(false为阻止默认行为)
          }
      }
  };
