
function touchMobile(em,maxzm){
    var startEvent = 'touchstart';
    var moveEvent  = 'touchmove';
    var endEvent   = 'touchend touchcancel';
    var maxZoom = maxzm;
    var moveEnable = false;
    var isPinch = false;
    var scrollX, scrollY;
    var touchX, touchY;
    var pinchVal;
    this._callZoom = null;
    this._callMove = null;
    this._callSet = null;
    var curZoom = 1;
    var moveX = null;
	var moveY = null;
    this.em = em;
    var _this = this;
    setTimeout(function(){
        moveEnable = true;
    },100);
    function zm(nzm,px,py){
        newZoom = Math.min(nzm, maxZoom);
        curZoom = newZoom;
        if(_this._callZoom!=null){
            _this._callZoom(curZoom,newZoom,px,py)
        }
    }
    this.em.on(startEvent,function(e){
        
        
        var moveFlg = false;
        var _touch =  e.originalEvent.touches || e.originalEvent.changedTouches;
        if(_touch.length>=2){
            pinchVal = Math.sqrt(Math.pow(_touch[1].pageX-_touch[0].pageX, 2) + Math.pow(_touch[1].pageY-_touch[0].pageY, 2));
            isPinch = true;
        }else{
            touchX = _touch[0].pageX;
			touchY = _touch[0].pageY;
            if(_this._callSet!=null){
                _this._callSet(touchX,touchY)
            }
            isPinch = false;
        }
        $(document).on(moveEvent,function(e){
            if(!moveEnable){return;}
            var _touch =  e.originalEvent.touches || e.originalEvent.changedTouches;
            if(_touch.length>=2){
                var newPinchVal;
                var pinchX = (_touch[0].pageX + _touch[1].pageX)/2;
                var pinchY = (_touch[0].pageY + _touch[1].pageY)/2;
                newPinchVal = Math.sqrt(Math.pow(_touch[1].pageX-_touch[0].pageX, 2) + Math.pow(_touch[1].pageY-_touch[0].pageY, 2));
                //zoomIn(curZoom*(newPinchVal/pinchVal), pinchX, pinchY);
                
                zm(curZoom*(newPinchVal/pinchVal), pinchX, pinchY, _touch[0].pageX, _touch[0].pageY)
                //_callZoom(curZoom*(newPinchVal/pinchVal), pinchX, pinchY)
                
                
                pinchVal = newPinchVal;
            }else{
                moveX = _touch[0].pageX;
				moveY = _touch[0].pageY;
                if(_this._callMove!=null){
                    _this._callMove(moveX,moveY,touchX,touchY)
                }
            }
            if (touchX !== moveX || touchY !== moveY){
				moveFlg = true;
			} else {
				return;
			}
        })
    }).on(endEvent, function(e){

    })
}