/**
 * 尝试创建一个可以执行简单动画的函数
 * @param {Object} obj 要执行动画的对象
 * @param {String} attr 要执行的动画的样式，比如：left、top、width、height
 * @param {Number} target 执行动画的目标位置
 * @param {Number} speed 移动的速度
 * @param {Function} callback 回调函数，这个函数将会在动画执行完毕之后执行
 */
 function move(obj, attr, target, speed, callback) {
    // 关闭上一个定时器
    clearInterval(obj.timer);

    // 获取元素目前的位置
    var current = parseInt(getStyle(obj, attr));

    // 判断速度的正负值
    // 如果从0 向800移动，则speed为正
    // 如果从800向0移动，则speed为负
    if(current > target){
        // 此时速度应为负值
        speed = -speed;
    }
    // 开启一个定时器，用来执行动画效果
    // 向执行动画的对象中添加一个timer属性，用来保存他自己的定时器的标识
    obj.timer = setInterval(function (){
        // 获取box1原来的left值
        var oldValue = parseInt(getStyle(obj, attr));
        // 在旧值的基础上增加
        var newValue = oldValue + speed;
        // 判断newValue是都大于800
        // 从800向0移动
        // 向左移动时，需要判断newValue是否小于target
        // 向右移动时，需要判断newValue是否大于target
        if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
            newValue = target;
        }
        // 将新值赋给box1
        obj.style[attr] = newValue + "px";

        // 当元素移动到800px时，使其停止执行动画
        if(newValue == target){
            // 达到目标，关闭定时器
            clearInterval(obj.timer);
            // 动画执行完毕，调用回调函数
            callback && callback();
        }
    }, 30);
};

/**
 * 获取元素的样式
 * @param {Object} obj 要获取样式的元素
 * @param {String} name 要获取的样式名
 */
function getStyle(obj, name){
    if(window.getComputedStyle){
        return getComputedStyle(obj, null)[name];
    }else{
        return obj.currentStyle[name];
    }
}

/**
 * 定义一个函数，用来向一个元素中添加指定的class属性值
 * @param {Object} obj 要添加class属性的元素
 * @param {String} newClassName 要添加的class值
 */
 function addClass(obj, newClassName) {
    // 检查obj中是否含有newClassName
    if(!hasClass(obj, newClassName)){
        obj.className += " " + newClassName;    
    }
};

/**
 * 判断一个元素中是否含有指定的class属性值
 * @param {Object} obj 判断的元素
 * @param {String} newClassName 判断class属性
 * @return {Boolean} true-含有该class，false-不含该class
 */
function hasClass(obj, newClassName) {
    // 判断obj中有没有newClassName class
    // 创建一个正则表达式
    // var reg = /\bb2\b/;
    var reg = new RegExp("\\b" + newClassName + "\\b");
    // alert(reg);
    // alert(reg.test(obj.className));
    return reg.test(obj.className);
};

/**
 * 删除一个元素中的指定的class属性
 * @param {Object} obj 要删除的元素
 * @param {String} newClassName 要删除class属性
 */
function removeClass(obj, newClassName) {
    // 创建一个正则表达式
    var reg = new RegExp("\\b" + newClassName + "\\b");
    // 删除class
    obj.className = obj.className.replace(reg, "");
};

/**
 * toggleClass可以用来切换一个类，如果元素中具有该类，则删除；如果元素中没有该类，则添加
 * @param {Object} obj 操作的元素
 * @param {String} newClassName 要操作class属性
 */
function toggleClass(obj, newClassName) {
    // 判断obj中是否含有newClassName
    if(hasClass(obj, newClassName)){
        // 有，则删除
        removeClass(obj, newClassName);
    }else{
        // 没有，则添加
        addClass(obj, newClassName);
    }
};