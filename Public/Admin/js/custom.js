
jQuery(window).load(function() {
   
   // Page Preloader
   jQuery('#status').fadeOut();
   jQuery('#preloader').delay(350).fadeOut(function(){
      jQuery('body').delay(350).css({'overflow':'visible'});
   });
});

jQuery(document).ready(function($) {
    /**
     * 重发送激活邮件 start
     */
    //显示消息
    function showalertmsg(msg){
        $('img.loadingimg').addClass('hidden');
        var body = '<div class="alert alert-warning fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+msg+'</div>';
        return body;
    }
    //验证邮箱
    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    //验证表单
    function checkForm1(){
        var form = $('form#resendemailform');
        if(form.find('input.account').val() == ''){
            var msg = showalertmsg('<strong>对不起！</strong> 请填写完整的<span class="red">注册用户名</span>（非姓名）信息！');
            form.find('div.showmessage').html(msg);
            return false;
        }
        if(!IsEmail(form.find('input.email').val())){
            var msg = showalertmsg('<strong>对不起！</strong> 请填写正确的<span class="red">注册邮箱</span>信息！');
            form.find('div.showmessage').html(msg);
            return false;
        }
        if(form.find('input.verify').val() == ''){
            var msg = showalertmsg('<strong>对不起！</strong> 请填写<span class="red">验证码</span>信息！');
            form.find('div.showmessage').html(msg);
            return false;
        }
    }
    function checkForm2(){
        var form = $('form#forgotpwdform');
        if(form.find('input.account').val() == ''){
            var msg = showalertmsg('<strong>对不起！</strong> 请填写完整的<span class="red">注册用户名</span>（非姓名）信息！');
            form.find('div.showmessage').html(msg);
            return false;
        }
        if(!IsEmail(form.find('input.email').val())){
            var msg = showalertmsg('<strong>对不起！</strong> 请填写正确的<span class="red">注册邮箱</span>信息！');
            form.find('div.showmessage').html(msg);
            return false;
        }
        if(form.find('input.verify').val() == ''){
            var msg = showalertmsg('<strong>对不起！</strong> 请填写<span class="red">验证码</span>信息！');
            form.find('div.showmessage').html(msg);
            return false;
        }
    }

    //验证前准备
    if($('form#resendemailform').length > 0){
        $('form#resendemailform').ajaxForm({
            beforeSubmit:checkForm1,  // 表单提交执行前检测
            success:complete1,  // 表单提交后执行函数
            dataType: 'json'
        });
    }
    if($('form#forgotpwdform').length > 0){
        $('form#forgotpwdform').ajaxForm({
            beforeSubmit:checkForm2,  // 表单提交执行前检测
            success:complete2,  // 表单提交后执行函数
            dataType: 'json'
        });
    }


    //返回值
    function complete1(data){
        //console.log(data);
        var msg = showalertmsg('<span class="red">'+data+'</span>');
        $('form#resendemailform div.showmessage').html(msg);
        $('form#resendemailform img.verifyimg').click();
    }
    function complete2(data){
        //console.log(data);
        var msg = showalertmsg('<span class="red">'+data+'</span>');
        $('form#forgotpwdform div.showmessage').html(msg);
        $('form#forgotpwdform img.verifyimg').click();
    }

    //提交
    $('form#resendemailform button.submit').click(function(){
        $('img.loadingimg').removeClass('hidden');
        $('form#resendemailform div.showmessage').html('');
        $('form#resendemailform').submit();
    });
    $('form#forgotpwdform button.submit').click(function(){
        $('img.loadingimg').removeClass('hidden');
        $('form#forgotpwdform div.showmessage').html('');
        $('form#forgotpwdform').submit();
    });
    /**
     * 重发送激活邮件 end
     */

    $('input.verify').focus(function(){
        //重新获取验证码
        $(this).parent().parent().find('img.verifyimg:eq(0)').click();
    });

   // Toggle Left Menu
   jQuery('.nav-parent > a').click(function() {

      var parent = jQuery(this).parent();
      var sub = parent.find('> ul');

      // Dropdown works only when leftpanel is not collapsed
      if(!jQuery('body').hasClass('leftpanel-collapsed')) {
         if(sub.is(':visible')) {
            sub.slideUp(200, function(){
               parent.removeClass('nav-active');
               jQuery('.mainpanel').css({height: ''});
               adjustmainpanelheight();
            });
         } else {
            closeVisibleSubMenu();
            parent.addClass('nav-active');
            sub.slideDown(200, function(){
               adjustmainpanelheight();
            });
         }
      }
      return false;
   });

   function closeVisibleSubMenu() {
      jQuery('.nav-parent').each(function() {
         var t = jQuery(this);
         if(t.hasClass('nav-active')) {
            t.find('> ul').slideUp(200, function(){
               t.removeClass('nav-active');
            });
         }
      });
   }

   function adjustmainpanelheight() {
      // Adjust mainpanel height
      var docHeight = jQuery(document).height();
      if(docHeight > jQuery('.mainpanel').height())
         jQuery('.mainpanel').height(docHeight);
   }


   // Tooltip
   jQuery('.tooltips').tooltip({ container: 'body'});

   // Popover
   jQuery('.popovers').popover();

   // Close Button in Panels
   jQuery('.panel .panel-close').click(function(){
      jQuery(this).closest('.panel').fadeOut(200);
      return false;
   });

   // Form Toggles
   if(jQuery('.toggle').length > 0){
       jQuery('.toggle').toggles({on: true});
   }

   if(jQuery('.toggle-chat1').length > 0){
       jQuery('.toggle-chat1').toggles({on: false});
   }


   // Sparkline
   if(jQuery('#sidebar-chart').length > 0){
       jQuery('#sidebar-chart').sparkline([4,3,3,1,4,3,2,2,3,10,9,6], {
           type: 'bar',
           height:'30px',
           barColor: '#428BCA'
       });
   }

   if(jQuery('#sidebar-chart2').length > 0){
       jQuery('#sidebar-chart2').sparkline([1,3,4,5,4,10,8,5,7,6,9,3], {
          type: 'bar',
          height:'30px',
          barColor: '#D9534F'
       });
   }
   if(jQuery('#sidebar-chart3').length > 0){
       jQuery('#sidebar-chart3').sparkline([5,9,3,8,4,10,8,5,7,6,9,3], {
          type: 'bar',
          height:'30px',
          barColor: '#1CAF9A'
       });
   }
   if(jQuery('#sidebar-chart4').length > 0){
       jQuery('#sidebar-chart4').sparkline([4,3,3,1,4,3,2,2,3,10,9,6], {
          type: 'bar',
          height:'30px',
          barColor: '#428BCA'
       });
   }
   if(jQuery('#sidebar-chart5').length > 0){
       jQuery('#sidebar-chart5').sparkline([1,3,4,5,4,10,8,5,7,6,9,3], {
          type: 'bar',
          height:'30px',
          barColor: '#F0AD4E'
       });
   }


   // Minimize Button in Panels
   jQuery('.minimize').click(function(){
      var t = jQuery(this);
      var p = t.closest('.panel');
      if(!jQuery(this).hasClass('maximize')) {
         p.find('.panel-body, .panel-footer').slideUp(200);
         t.addClass('maximize');
         t.html('&plus;');
      } else {
         p.find('.panel-body, .panel-footer').slideDown(200);
         t.removeClass('maximize');
         t.html('&minus;');
      }
      return false;
   });


   // Add class everytime a mouse pointer hover over it
   jQuery('.nav-bracket > li').hover(function(){
      jQuery(this).addClass('nav-hover');
   }, function(){
      jQuery(this).removeClass('nav-hover');
   });


   // Menu Toggle
   jQuery('.menutoggle').click(function(){

      var body = jQuery('body');
      var bodypos = body.css('position');

      if(bodypos != 'relative') {

         if(!body.hasClass('leftpanel-collapsed')) {
            body.addClass('leftpanel-collapsed');
            jQuery('.nav-bracket ul').attr('style','');

            jQuery(this).addClass('menu-collapsed');

         } else {
            body.removeClass('leftpanel-collapsed chat-view');
            jQuery('.nav-bracket li.active ul').css({display: 'block'});

            jQuery(this).removeClass('menu-collapsed');

         }
      } else {

         if(body.hasClass('leftpanel-show'))
            body.removeClass('leftpanel-show');
         else
            body.addClass('leftpanel-show');

         adjustmainpanelheight();
      }

   });

   // Chat View
   jQuery('#chatview').click(function(){

      var body = jQuery('body');
      var bodypos = body.css('position');

      if(bodypos != 'relative') {

         if(!body.hasClass('chat-view')) {
            body.addClass('leftpanel-collapsed chat-view');
            jQuery('.nav-bracket ul').attr('style','');

         } else {

            body.removeClass('chat-view');

            if(!jQuery('.menutoggle').hasClass('menu-collapsed')) {
               jQuery('body').removeClass('leftpanel-collapsed');
               jQuery('.nav-bracket li.active ul').css({display: 'block'});
            } else {

            }
         }

      } else {

         if(!body.hasClass('chat-relative-view')) {

            body.addClass('chat-relative-view');
            body.css({left: ''});

         } else {
            body.removeClass('chat-relative-view');
         }
      }

   });

   reposition_searchform();

   jQuery(window).resize(function(){

      if(jQuery('body').css('position') == 'relative') {

         jQuery('body').removeClass('leftpanel-collapsed chat-view');

      } else {

         jQuery('body').removeClass('chat-relative-view');
         jQuery('body').css({left: '', marginRight: ''});
      }

      reposition_searchform();

   });

   function reposition_searchform() {
      if(jQuery('.searchform').css('position') == 'relative') {
         jQuery('.searchform').insertBefore('.leftpanelinner .userlogged');
      } else {
         jQuery('.searchform').insertBefore('.header-right');
      }
   }


   // Sticky Header
   if(jQuery.cookie('sticky-header'))
      jQuery('body').addClass('stickyheader');

   // Sticky Left Panel
   if(jQuery.cookie('sticky-leftpanel')) {
      jQuery('body').addClass('stickyheader');
      jQuery('.leftpanel').addClass('sticky-leftpanel');
   }

   // Left Panel Collapsed
   if(jQuery.cookie('leftpanel-collapsed')) {
      jQuery('body').addClass('leftpanel-collapsed');
      jQuery('.menutoggle').addClass('menu-collapsed');
   }

   // Changing Skin
   var c = jQuery.cookie('change-skin');
   if(c) {
      jQuery('head').append('<link id="skinswitch" rel="stylesheet" href="css/style.'+c+'.css" />');
   }

    if(jQuery("#adminloginform").length > 0){
        // Basic Form
        jQuery("#adminloginform").validate({
            highlight: function(element) {
                jQuery(element).removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                jQuery(element).removeClass('has-error');
            }
        });
    }

    //菜单添加active
    if(($('ul.nav.nav-pills').length > 0) && ($('input.requesturl').val() != '')){
        $('ul.nav.nav-pills li a').each(function(){
            if($(this).attr('href') == $('input.requesturl').val()){
                $(this).parent('li').addClass('active')
                    .parent('ul.children').show()
                    .parent('li.nav-parent').addClass('nav-active active');
            }
        });
    }

    //添加新内容类型
    if($('form#addnodetypeform').length > 0){
        $('a.addnodetypeaction').click(function(){$('.form-control').val('')});
        $('form#addnodetypeform').ajaxForm({
            beforeSubmit:function(){
                $('input.nodetypeid').remove();
                if(!$('input.form-control.type').val().match(/^[a-za-z]*$/)){
                    $('span.returnmsg').html('机器名仅能使用字母组合！');
                    return false;
                }
            },
            //表单提交后执行函数
            success:function(data){
                console.log(data);
                if(data == 'success'){
                    msg = '欧耶，操作成功！';
                }else if(data == 'verifyerror'){
                    msg = '验证码不正确！';
                }else{
                    msg = '操作失败，请检查数据，或者稍后再试！';
                }
                $('span.returnmsg').html(msg);
            },
            dataType: 'json'
        });
        //修改内容类型
        $('a.nodetypeedit').click(function(){
            $.post('/Admin/Node/getNodeType.html',{id:$(this).attr('data-nodetypeid')},function(data,status){
                if(status == 'success'){
                    //console.log(data);
                    var jsonData = eval("("+data+")");
                    //console.log(jsonData);
                    $('form#addnodetypeform input.name').val(jsonData.name);
                    $('form#addnodetypeform input.type').val(jsonData.type);
                    $('form#addnodetypeform textarea.description').val(jsonData.description);
                    var idinput = '<input class="nodetypeid" type="hidden" value="'+jsonData.id+'" name="id" />';
                    $('form#addnodetypeform').append(idinput);
                }
            });
        });
        //禁用
        $('ul.dropdown-menu li a.disable').live("click",function(){
            var t = $(this);
            $.post('/Admin/Node/disableNodeType.html',{id:$(this).attr('data-nodetypeid')},function(data,status){
                if(data == 'success'){
                    t.text('启用').removeClass('disable').addClass('enable');
                    t.parent().parent().parent().find('button.btn-xs').removeClass('btn-primary').addClass('btn-default');
                }
            })
        });
        //启用
        $('ul.dropdown-menu li a.enable').live("click",function(){
            var t = $(this);
            $.post('/Admin/Node/enableNodeType.html',{id:$(this).attr('data-nodetypeid')},function(data,status){
                if(data == 'success'){
                    t.text('禁用').removeClass('enable').addClass('disable');
                    t.parent().parent().parent().find('button.btn-xs').removeClass('btn-default').addClass('btn-primary');
                }
            })
        });
        //删除
        $('ul.dropdown-menu li a.delete').click(function(){
            var t = $(this);
            bootbox.confirm("确定删除么？危险动作！", function(result) {
                if(result){
                    $.post('/Admin/Node/deleteNodeType.html',{id:t.attr('data-nodetypeid')},function(data,status){
                        if(data == 'success'){
                            t.parent().parent().parent().parent().parent().remove();
                        }
                    });
                }
            });
        });
    }
    //编辑，添加字段
    if($('.selectpicker').length > 0){$('.selectpicker').selectpicker();}
    if($('form#addnodetypefieldform').length > 0){
        //自定义模式选择
        $('select.myTabDrop1typelistbox').live('change',function(){
            var tabpaneid = $(this).find("option:selected").attr('data-tabid');
            $('div.tab-pane').addClass('fade').hide();
            $('div#'+tabpaneid).removeClass('fade').show();
        });
        //是否为select list.
        $('select.selectpicker.fieldtype').change(function(){
            var data_type = $(this).find("option:selected").attr('data-type');
            var type_arr = [ "select","radio","checkbox","select_multiple" ];
            if($.inArray(data_type,type_arr) != '-1'){
                //显示附加选项
                $.post('/Admin/Node/getCustomOrTaxonomyTpl.html',{},function(data,status){
                    $('div.typelistbox').html(data);
                });
            }else{
                $('div.typelistbox').html('');
            }
        });
        //添加字段
        $('form#addnodetypefieldform').ajaxForm({
            beforeSubmit:function(){
                //$('input.nodetypeid').remove();
                if(!$('input.form-control.type').val().match(/^[a-za-z0-9]*$/)){
                    $('span.returnmsg').html('机器名仅能使用字母组合！');
                    return false;
                }
            },
            //表单提交后执行函数
            success:function(data){
                console.log(data);
                if(data == 'success'){
                    msg = '欧耶，操作成功！';
                    reloadfieldslist();
                }else if(data == 'verifyerror'){
                    msg = '验证码不正确！';
                }else{
                    msg = '操作失败，请检查数据，或者稍后再试！';
                }
                $('span.returnmsg').html(msg);
            },
            dataType: 'json'
        });
    }
    $('a.addnodetypefieldaction').click(function(){
        $('form#addnodetypefieldform div.modal-body').find('input,textarea').val('');
        $('form#addnodetypefieldform div.modal-body').find('span.returnmsg').html('');
    });
    $('ul.dropdown-menu li a.nodefieldedit').live("click",function(){
        //点击修改字段
        $.post('/Admin/Node/getNodetypeFieByld.html',{field_id:$(this).attr('data-nodetypefieldid')},function(data,status){
            var jsonData = eval("("+data+")");
            console.log(jsonData);
            $('form#addnodetypefieldform input.labels').val(jsonData.name);
            $('form#addnodetypefieldform input.type').val(jsonData.type);
            $('form#addnodetypefieldform textarea.description').val(jsonData.description);
            //var idinput = '<input class="nodetypeid" type="hidden" value="'+jsonData.id+'" name="id" />';
            //$('form#addnodetypeform').append(idinput);
        });
    });
    $('a.saveorderbtn').click(function(){
        var param = '';
        $('table#table-fieldslist tbody tr').each(function(index,element){
            $(this).attr('data-order',index+1);
            param += ($(this).attr('data-id')+'##'+(index+1)+'--');
        });
        //alert(parma);//1##2--2##1--3##4--4##5--5##3--6##6--7##7--8##8--9##9--10##10--11##11--
        $.post('/Admin/Node/saveorder.html',{param:param},function(data,status){
            if(status == 'success'){
                alert('保存成功');
            }else{
                alert('保存失败');
            }
        });
    });
    //重新加载字段列表
    function reloadfieldslist(){
        $.post('/Admin/Node/reloadfieldslist.html',{bundle:$('input#bundle').val()},function(data,status){
            if(status == 'success'){
                $('table.table-fieldslist tbody').html(data);
            }
        });
    }





    //加载编辑器
    if($('#content').length > 0){
        CKEDITOR.replace( 'content',{
            filebrowserBrowseUrl : __public+'/Common/ckeditor/ckfinder/ckfinder.html',
            filebrowserImageBrowseUrl : __public+'/Common/ckeditor/ckfinder/ckfinder.html?Type=Images',
            filebrowserFlashBrowseUrl : __public+'/Common/ckeditor/ckfinder/ckfinder.html?Type=Flash',
            filebrowserUploadUrl : __public+'/Common/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
            filebrowserImageUploadUrl : __public+'/Common/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
            filebrowserFlashUploadUrl : __public+'/Common/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
        });

        //激活所有可用的编辑器功能,并且将不会过滤输入的数据。
        CKEDITOR.config.allowedContent = true;
        //在线编辑
        CKEDITOR.disableAutoInline = true;
        CKEDITOR.inline('editable',{
            on: {
                blur: function(event) {
                    if (event.editor.checkDirty()){
                        console.log(event.editor.getData());
                        //do ajax post to database;
                    }
                }
            }
        });
    }
    if($("#table-fieldslist").length > 0){
        $("#table-fieldslist").tableDnD({
            onDrop: function(table, row) {

            }
        });
    }


    console.log("我爱中国，我爱北京天安门！\n反对独裁，追求自由与公平！反对一切反对人民的组织！\n想让自己的成就在亿万用户面前展现吗？想让世界看得你的光芒吗？\n加入我们，在这里不仅是工作，投入你的时间和热情，滴滴汗水终会汇聚成不平凡的成果。\n期待你的加盟。http://www.lamp99.com");
    console.log("%c请在邮件中注明来自:console   Mail To:Jochen.Zhang<info@lamp99.com>","color:red");
    console.log("%c","padding:50px 300px;line-height:120px;background:url('http://wayouliu.duapp.com/img/tagsImg/youth.gif') no-repeat;");



});
