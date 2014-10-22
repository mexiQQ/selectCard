// JavaScript Document

//jQuery 闭包
(function ($) {
  var defaults = {
    eventname: 'propertychange input',
    width: '200px',
    borderCss: "combox_border",
    inputCss:  "combox_input",
    buttonCss: "combox_button",
    selectCss: "combox_select",
    inputId: 'selectCard',
    datas: '',
    ajax: ''
  };

  $.fn.selectCard=function (options) {
    var options = $.extend(defaults, options);

    return this.each(function(){
      var _this = $(this);
      _this = _initBorder(_this);//初始化外框CSS
      _this = _initInput(_this);//初始化输入框

      if(options.ajax === '') {
        if(options.datas.length > 0){
          _initSelect(_this, options.datas);
        }
      } else {
        $("#" + options.inputId).bind("propertychange input",function(){

          var text = $("#"+options.inputId).val();
          var $ul = _this.children('ul');

          if(text === '') {
            $ul.empty();
          } else {
            var term = options.ajax.data();
            for(var a in term)
              term = a;

            $.ajax({
              url:options.ajax.url,
              type:options.ajax.type,
              dataType:options.ajax.dataType,
              data: function(){
                if(options.ajax.type=="GET")
                  return term+'='+text;
                else
                  return '{'+term+':'+text+'}';
              }(),

              timeout:5000,
              success: function(json){
                $ul.empty();
                var _boder=_initSelect(_this,json);
                $_ul=_boder.children('ul');
                $_ul.slideDown('fast');

                console.log(json);
              },
              error: function(error){
                console.log(error);
              }

            });
          }
        });
      }
    });

    function _initBorder($border) {//初始化外框CSS
      $border.css({'display':'inline-block', 'position':'relative'}).addClass(options.borderCss);
      return $border;
    }

    function _initInput($border){//初始化输入框

      if(!defaults.inputId) {
        var input = '<input type="text" class="'+options.inputCss+'"/>';
      }else {
        var input = '<input type="text" class="'+options.inputCss+'" id="'+options.inputId+'"/>';
      }

      term = $border.children('input');
      $border.append(input);
      $border.append('<font class="ficomoon icon-angle-bottom '+options.buttonCss+'" style="display:inline-block"></font>');
      //绑定下拉特效
      $border.delegate('font', 'click', function() {
        var $ul = $border.children('ul');
        if($ul.css('display') == 'none') {
          $ul.slideDown('fast');
          $(this).removeClass('icon-angle-bottom').addClass('icon-angle-top');
        }else {
          $ul.slideUp('fast');
          $(this).removeClass('icon-angle-top').addClass('icon-angle-bottom');
        }
      });
      return $border;//IE6需要返回值
    }

    function _initSelect($border,datas) {
      
      //初始化下拉列表
      $border.append('<ul style="position:absolute;left:-1px;display:none" class="'+options.selectCss+'">');

      var $ul = $border.children('ul');
      $ul.css('top',$border.height()+1);
      var length = datas.length;

      $.each(datas,function(index,data){
        $ul.append('<li><a href="javascript:void(0)">'+data['id']+'</a></li>');
      });

      $ul.delegate('li', 'click', function() {
        $border.children(':text').val($(this).text());
        $ul.hide();
        $border.children('font').removeClass('icon-angle-top').addClass('icon-angle-bottom');//确定的时候要将下拉的icon改变
      });
      //点击其他地方影藏下拉列表
      $(document).click(function(e) {
        e = window.event || e; // 兼容IE7
        var $obj = $(e.srcElement || e.target);
        if($obj.closest($border).length <= 0) {
          $ul.hide();
          $border.children('font').removeClass('icon-angle-top').addClass('icon-angle-bottom');//确定的时候要将下拉的icon改变
        }
      });
      return $border;
    }
  }
})(jQuery);