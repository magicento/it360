/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

    //添加插件
    //config.extraPlugins = 'wenzgmap';
    config.extraPlugins = 'inlinesave';

    //移除元素路径
    config.removePlugins = 'elementspath';
    config.resize_enabled = false;//彻底移除状态栏,其实是将ckedior窗口大小调整功能关闭

	// Define changes to default configuration here. For example:
	// config.uiColor = '#AADC6E';
    config.language = 'zh-cn';  
    //config.uiColor = '#FFA';  
    config.skin = 'bootstrapck'; 
    //config.width = 850;  
    config.height = 300;  
    config.toolbar = 'Full';//Basic,Full

    config.toolbar=[
        ['Source','-','Save'],//['NewPage','Preview','-','Templates']
        //['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print','SpellChecker','Scayt'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        //['Form','Checkbox','Radio','TextField','Textarea','Select','Button','ImageButton','HiddenField'],'/',
        ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
        ['TextColor','BGColor'],
        //['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['Link','Unlink','Anchor'],
        ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
        //['Styles','Format','Font','FontSize'],
        ['Maximize','ShowBlocks']
    ];
};
