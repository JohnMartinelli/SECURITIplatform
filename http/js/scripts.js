$(document).ready(function() {


	// Closing Divs - used on Notification Boxes
	$(".canhide").click(function() {
		
		$(this).fadeOut(700);
	});
	
	// Load WYSIWYG Editor - add class 'wysiwyg' to any textarea to add functionality.
	$('.wysiwyg').wysiwyg();
	

	// Check all the checkboxes when the head one is selected:
	$('.checkall').click(
		function(){
			$(this).parent().parent().parent().parent().find("input[type='checkbox']").attr('checked', $(this).is(':checked'));   
		}
	);
	
	// Load Facebox - simple add "rel="facebook" to any link to activate Modal Dialog
	$('a[rel*=facebox]').facebox();

	// Load jQuery UI Tabs
	$("#tabs").tabs().find(".ui-tabs-nav").sortable({axis:'x'});
	
	// Load Accordion
	$("#accordion").accordion();
	
	// Load jQuery UI Datepicker - this one addes it to a normal input box with an id of #datepicker
	$("#datepicker").datepicker();
	// Load jQuery UI Datepicker - this one addes it as a calendar in the page.
	$("#datepicker-inline").datepicker();	
	
	// Load jQuery UI Progressbar 
	$("#progressbar").progressbar({
			value: 67
		});
	
	// Load jQuery UI Slider 
	$("#slider").slider();


// Closing jQuery
});



// SUPERFISH HOVER INTENT


(function($){
	/* hoverIntent by Brian Cherne */
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
	
})(jQuery);



/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);



/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

;(function($){ // $ will refer to jQuery within this closure

	$.fn.supersubs = function(options){
		var opts = $.extend({}, $.fn.supersubs.defaults, options);
		// return original object to support chaining
		return this.each(function() {
			// cache selections
			var $$ = $(this);
			// support metadata
			var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
			// get the font size of menu.
			// .css('fontSize') returns various results cross-browser, so measure an em dash instead
			var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
				'padding' : 0,
				'position' : 'absolute',
				'top' : '-999em',
				'width' : 'auto'
			}).appendTo($$).width(); //clientWidth is faster, but was incorrect here
			// remove em dash
			$('#menu-fontsize').remove();
			// cache all ul elements
			$ULs = $$.find('ul');
			// loop through each ul in menu
			$ULs.each(function(i) {	
				// cache this ul
				var $ul = $ULs.eq(i);
				// get all (li) children of this ul
				var $LIs = $ul.children();
				// get all anchor grand-children
				var $As = $LIs.children('a');
				// force content to one line and save current float property
				var liFloat = $LIs.css('white-space','nowrap').css('float');
				// remove width restrictions and floats so elements remain vertically stacked
				var emWidth = $ul.add($LIs).add($As).css({
					'float' : 'none',
					'width'	: 'auto'
				})
				// this ul will now be shrink-wrapped to longest li due to position:absolute
				// so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
				.end().end()[0].clientWidth / fontsize;
				// add more width to ensure lines don't turn over at certain sizes in various browsers
				emWidth += o.extraWidth;
				// restrict to at least minWidth and at most maxWidth
				if (emWidth > o.maxWidth)		{ emWidth = o.maxWidth; }
				else if (emWidth < o.minWidth)	{ emWidth = o.minWidth; }
				emWidth += 'em';
				// set ul to width in ems
				$ul.css('width',emWidth);
				// restore li floats to avoid IE bugs
				// set li width to full width of this ul
				// revert white-space to normal
				$LIs.css({
					'float' : liFloat,
					'width' : '100%',
					'white-space' : 'normal'
				})
				// update offset position of descendant ul to reflect new width of parent
				.each(function(){
					var $childUl = $('>ul',this);
					var offsetDirection = $childUl.css('left')!==undefined ? 'left' : 'right';
					$childUl.css(offsetDirection,emWidth);
				});
			});
			
		});
	};
	// expose defaults
	$.fn.supersubs.defaults = {
		minWidth		: 9,		// requires em unit.
		maxWidth		: 25,		// requires em unit.
		extraWidth		: 0			// extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
	};
	
})(jQuery); // plugin code ends







/**
 * WYSIWYG - jQuery plugin 0.6
 *
 * Copyright (c) 2008-2009 Juan M Martinez
 * http://plugins.jquery.com/project/jWYSIWYG
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Id: $
 */
(function( $ )
{
    $.fn.document = function()
    {
        var element = this.get(0);

        if ( element.nodeName.toLowerCase() == 'iframe' )
        {
            return element.contentWindow.document;
            /*
            return ( $.browser.msie )
                ? document.frames[element.id].document
                : element.contentWindow.document // contentDocument;
             */
        }
        return this;
    };

    $.fn.documentSelection = function()
    {
        var element = this.get(0);

        if ( element.contentWindow.document.selection )
            return element.contentWindow.document.selection.createRange().text;
        else
            return element.contentWindow.getSelection().toString();
    };

    $.fn.wysiwyg = function( options )
    {
        if ( arguments.length > 0 && arguments[0].constructor == String )
        {
            var action = arguments[0].toString();
            var params = [];

            for ( var i = 1; i < arguments.length; i++ )
                params[i - 1] = arguments[i];

            if ( action in Wysiwyg )
            {
                return this.each(function()
                {
                    $.data(this, 'wysiwyg')
                     .designMode();

                    Wysiwyg[action].apply(this, params);
                });
            }
            else return this;
        }

        var controls = {};

        /**
         * If the user set custom controls, we catch it, and merge with the
         * defaults controls later.
         */
        if ( options && options.controls )
        {
            var controls = options.controls;
            delete options.controls;
        }

        options = $.extend({
            html : '<'+'?xml version="1.0" encoding="UTF-8"?'+'><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">STYLE_SHEET</head><body style="margin: 0px;">INITIAL_CONTENT</body></html>',
            css  : {},

            debug        : false,

            autoSave     : true,  // http://code.google.com/p/jwysiwyg/issues/detail?id=11
            rmUnwantedBr : true,  // http://code.google.com/p/jwysiwyg/issues/detail?id=15
            brIE         : true,

            controls : {},
            messages : {}
        }, options);

        options.messages = $.extend(true, options.messages, Wysiwyg.MSGS_EN);
        options.controls = $.extend(true, options.controls, Wysiwyg.TOOLBAR);

        for ( var control in controls )
        {
            if ( control in options.controls )
                $.extend(options.controls[control], controls[control]);
            else
                options.controls[control] = controls[control];
        }

        // not break the chain
        return this.each(function()
        {
            Wysiwyg(this, options);
        });
    };

    function Wysiwyg( element, options )
    {
        return this instanceof Wysiwyg
            ? this.init(element, options)
            : new Wysiwyg(element, options);
    }

    $.extend(Wysiwyg, {
        insertImage : function( szURL, attributes )
        {
            var self = $.data(this, 'wysiwyg');

            if ( self.constructor == Wysiwyg && szURL && szURL.length > 0 )
            {
                if ($.browser.msie) self.focus();
                if ( attributes )
                {
                    self.editorDoc.execCommand('insertImage', false, '#jwysiwyg#');
                    var img = self.getElementByAttributeValue('img', 'src', '#jwysiwyg#');

                    if ( img )
                    {
                        img.src = szURL;

                        for ( var attribute in attributes )
                        {
                            img.setAttribute(attribute, attributes[attribute]);
                        }
                    }
                }
                else
                {
                    self.editorDoc.execCommand('insertImage', false, szURL);
                }
            }
        },

        createLink : function( szURL )
        {
            var self = $.data(this, 'wysiwyg');

            if ( self.constructor == Wysiwyg && szURL && szURL.length > 0 )
            {
                var selection = $(self.editor).documentSelection();

                if ( selection.length > 0 )
                {
                    if ($.browser.msie) self.focus();
                    self.editorDoc.execCommand('unlink', false, []);
                    self.editorDoc.execCommand('createLink', false, szURL);
                }
                else if ( self.options.messages.nonSelection )
                    alert(self.options.messages.nonSelection);
            }
        },

        insertHtml : function( szHTML )
        {
            var self = $.data(this, 'wysiwyg');

            if ( self.constructor == Wysiwyg && szHTML && szHTML.length > 0 )
            {
                if ($.browser.msie)
                {
                    self.focus();
                    self.editorDoc.execCommand('insertImage', false, '#jwysiwyg#');
                    var img = self.getElementByAttributeValue('img', 'src', '#jwysiwyg#');
                    if (img)
                    {
                        $(img).replaceWith(szHTML);
                    }
                }
                else
                {
                    self.editorDoc.execCommand('insertHTML', false, szHTML);
                }
            }
        },

        setContent : function( newContent )
        {
            var self = $.data(this, 'wysiwyg');
                self.setContent( newContent );
                self.saveContent();
        },

        clear : function()
        {
            var self = $.data(this, 'wysiwyg');
                self.setContent('');
                self.saveContent();
        },

        MSGS_EN : {
            nonSelection : 'select the text you wish to link'
        },

        TOOLBAR : {
            bold          : { visible : true, tags : ['b', 'strong'], css : { fontWeight : 'bold' }, tooltip : "Bold" },
            italic        : { visible : true, tags : ['i', 'em'], css : { fontStyle : 'italic' }, tooltip : "Italic" },
            strikeThrough : { visible : true, tags : ['s', 'strike'], css : { textDecoration : 'line-through' }, tooltip : "Strike-through" },
            underline     : { visible : true, tags : ['u'], css : { textDecoration : 'underline' }, tooltip : "Underline" },

            separator00 : { visible : true, separator : true },

            justifyLeft   : { visible : true, css : { textAlign : 'left' }, tooltip : "Justify Left" },
            justifyCenter : { visible : true, tags : ['center'], css : { textAlign : 'center' }, tooltip : "Justify Center" },
            justifyRight  : { visible : true, css : { textAlign : 'right' }, tooltip : "Justify Right" },
            justifyFull   : { visible : true, css : { textAlign : 'justify' }, tooltip : "Justify Full" },

            separator01 : { visible : true, separator : true },

            indent  : { visible : true, tooltip : "Indent" },
            outdent : { visible : true, tooltip : "Outdent" },

            separator02 : { visible : false, separator : true },

            subscript   : { visible : true, tags : ['sub'], tooltip : "Subscript" },
            superscript : { visible : true, tags : ['sup'], tooltip : "Superscript" },

            separator03 : { visible : true, separator : true },

            undo : { visible : true, tooltip : "Undo" },
            redo : { visible : true, tooltip : "Redo" },

            separator04 : { visible : true, separator : true },

            insertOrderedList    : { visible : true, tags : ['ol'], tooltip : "Insert Ordered List" },
            insertUnorderedList  : { visible : true, tags : ['ul'], tooltip : "Insert Unordered List" },
            insertHorizontalRule : { visible : true, tags : ['hr'], tooltip : "Insert Horizontal Rule" },

            separator05 : { separator : true },

            createLink : {
                visible : true,
                exec    : function()
                {
                    var selection = $(this.editor).documentSelection();

                    if ( selection.length > 0 )
                    {
                        if ( $.browser.msie )
                        {
                            this.focus();
                            this.editorDoc.execCommand('createLink', true, null);
                        }
                        else
                        {
                            var szURL = prompt('URL', 'http://');

                            if ( szURL && szURL.length > 0 )
                            {
                                this.editorDoc.execCommand('unlink', false, []);
                                this.editorDoc.execCommand('createLink', false, szURL);
                            }
                        }
                    }
                    else if ( this.options.messages.nonSelection )
                        alert(this.options.messages.nonSelection);
                },

                tags : ['a'],
                tooltip : "Create link"
            },

            insertImage : {
                visible : true,
                exec    : function()
                {
                    if ( $.browser.msie )
                    {
                        this.focus();
                        this.editorDoc.execCommand('insertImage', true, null);
                    }
                    else
                    {
                        var szURL = prompt('URL', 'http://');

                        if ( szURL && szURL.length > 0 )
                            this.editorDoc.execCommand('insertImage', false, szURL);
                    }
                },

                tags : ['img'],
                tooltip : "Insert image"
            },

            separator06 : { separator : true },

            h1mozilla : { visible : true && $.browser.mozilla, className : 'h1', command : 'heading', arguments : ['h1'], tags : ['h1'], tooltip : "Header 1" },
            h2mozilla : { visible : true && $.browser.mozilla, className : 'h2', command : 'heading', arguments : ['h2'], tags : ['h2'], tooltip : "Header 2" },
            h3mozilla : { visible : true && $.browser.mozilla, className : 'h3', command : 'heading', arguments : ['h3'], tags : ['h3'], tooltip : "Header 3" },

            h1 : { visible : true && !( $.browser.mozilla ), className : 'h1', command : 'formatBlock', arguments : ['<H1>'], tags : ['h1'], tooltip : "Header 1" },
            h2 : { visible : true && !( $.browser.mozilla ), className : 'h2', command : 'formatBlock', arguments : ['<H2>'], tags : ['h2'], tooltip : "Header 2" },
            h3 : { visible : true && !( $.browser.mozilla ), className : 'h3', command : 'formatBlock', arguments : ['<H3>'], tags : ['h3'], tooltip : "Header 3" },

            separator07 : { visible : false, separator : true },

            cut   : { visible : false, tooltip : "Cut" },
            copy  : { visible : false, tooltip : "Copy" },
            paste : { visible : false, tooltip : "Paste" },

            separator08 : { separator : false && !( $.browser.msie ) },

            increaseFontSize : { visible : false && !( $.browser.msie ), tags : ['big'], tooltip : "Increase font size" },
            decreaseFontSize : { visible : false && !( $.browser.msie ), tags : ['small'], tooltip : "Decrease font size" },

            separator09 : { separator : true },

            html : {
                visible : false,
                exec    : function()
                {
                    if ( this.viewHTML )
                    {
                        this.setContent( $(this.original).val() );
                        $(this.original).hide();
                    }
                    else
                    {
                        this.saveContent();
                        $(this.original).show();
                    }

                    this.viewHTML = !( this.viewHTML );
                },
                tooltip : "View source code"
            },

            removeFormat : {
                visible : true,
                exec    : function()
                {
                    if ($.browser.msie) this.focus();
                    this.editorDoc.execCommand('removeFormat', false, []);
                    this.editorDoc.execCommand('unlink', false, []);
                },
                tooltip : "Remove formatting"
            }
        }
    });

    $.extend(Wysiwyg.prototype,
    {
        original : null,
        options  : {},

        element  : null,
        editor   : null,

        focus : function()
        {
            $(this.editorDoc.body).focus();
        },

        init : function( element, options )
        {
            var self = this;

            this.editor = element;
            this.options = options || {};

            $.data(element, 'wysiwyg', this);

            var newX = element.width || element.clientWidth;
            var newY = element.height || element.clientHeight;

            if ( element.nodeName.toLowerCase() == 'textarea' )
            {
                this.original = element;

                if ( newX == 0 && element.cols )
                    newX = ( element.cols * 8 ) + 21;

                if ( newY == 0 && element.rows )
                    newY = ( element.rows * 16 ) + 16;

                var editor = this.editor = $('<iframe src="javascript:false;"></iframe>').css({
                    minHeight : ( newY - 6 ).toString() + 'px',
                    width     : ( newX - 0 ).toString() + 'px'
                }).attr('id', $(element).attr('id') + 'IFrame')
                .attr('frameborder', '0');

                /**
                 * http://code.google.com/p/jwysiwyg/issues/detail?id=96
                 */
                this.editor.attr('tabindex', $(element).attr('tabindex'));

                if ( $.browser.msie )
                {
                    this.editor
                        .css('height', ( newY ).toString() + 'px');

                    /**
                    var editor = $('<span></span>').css({
                        width     : ( newX - 6 ).toString() + 'px',
                        height    : ( newY - 8 ).toString() + 'px'
                    }).attr('id', $(element).attr('id') + 'IFrame');

                    editor.outerHTML = this.editor.outerHTML;
                     */
                }
            }

            var panel = this.panel = $('<ul role="menu" class="panel"></ul>');

            this.appendControls();
            this.element = $('<div></div>').css({
                width : ( newX > 0 ) ? ( newX ).toString() + 'px' : '100%'
            }).addClass('wysiwyg')
                .append(panel)
                .append( $('<div><!-- --></div>').css({ clear : 'both' }) )
                .append(editor)
		;

            $(element)
                .hide()
                .before(this.element)
		;

            this.viewHTML = false;
            this.initialHeight = newY - 8;

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=52
             */
            this.initialContent = $(element).val();
            this.initFrame();

            if ( this.initialContent.length == 0 )
                this.setContent('');

            /**
             * http://code.google.com/p/jwysiwyg/issues/detail?id=100
             */
            var form = $(element).closest('form');

            if ( this.options.autoSave )
	    {
                form.submit(function() { self.saveContent(); });
	    }

            form.bind('reset', function()
            {
                self.setContent( self.initialContent );
                self.saveContent();
            });
        },

        initFrame : function()
        {
            var self = this;
            var style = '';

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=14
             */
            if ( this.options.css && this.options.css.constructor == String )
	    {
                style = '<link rel="stylesheet" type="text/css" media="screen" href="' + this.options.css + '" />';
	    }

            this.editorDoc = $(this.editor).document();
            this.editorDoc_designMode = false;

            try {
                this.editorDoc.designMode = 'on';
                this.editorDoc_designMode = true;
            } catch ( e ) {
                // Will fail on Gecko if the editor is placed in an hidden container element
                // The design mode will be set ones the editor is focused

                $(this.editorDoc).focus(function()
                {
                    self.designMode();
                });
            }

            this.editorDoc.open();
            this.editorDoc.write(
                this.options.html
                    /**
                     * @link http://code.google.com/p/jwysiwyg/issues/detail?id=144
                     */
                    .replace(/INITIAL_CONTENT/, function() { return self.initialContent; })
                    .replace(/STYLE_SHEET/, function() { return style; })
            );
            this.editorDoc.close();

            this.editorDoc.contentEditable = 'true';

            if ( $.browser.msie )
            {
                /**
                 * Remove the horrible border it has on IE.
                 */
                setTimeout(function() { $(self.editorDoc.body).css('border', 'none'); }, 0);
            }

            $(this.editorDoc).click(function( event )
            {
                self.checkTargets( event.target ? event.target : event.srcElement);
            });

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=20
             */
            $(this.original).focus(function()
            {
                if (!$.browser.msie)
                {
                    self.focus();
                }
            });

            if ( this.options.autoSave )
            {
                /**
                 * @link http://code.google.com/p/jwysiwyg/issues/detail?id=11
                 */
                $(this.editorDoc).keydown(function() { self.saveContent(); })
                                 .keyup(function() { self.saveContent(); })
                                 .mousedown(function() { self.saveContent(); });
            }

            if ( this.options.css )
            {
                setTimeout(function()
                {
                    if ( self.options.css.constructor == String )
                    {
                        /**
                         * $(self.editorDoc)
                         * .find('head')
                         * .append(
                         *     $('<link rel="stylesheet" type="text/css" media="screen" />')
                         *     .attr('href', self.options.css)
                         * );
                         */
                    }
                    else
                        $(self.editorDoc).find('body').css(self.options.css);
                }, 0);
            }

            $(this.editorDoc).keydown(function( event )
            {
                if ( $.browser.msie && self.options.brIE && event.keyCode == 13 )
                {
                    var rng = self.getRange();
                    rng.pasteHTML('<br />');
                    rng.collapse(false);
                    rng.select();
                    return false;
                }
                return true;
            });
        },

        designMode : function()
        {
            if ( !( this.editorDoc_designMode ) )
            {
                try {
                    this.editorDoc.designMode = 'on';
                    this.editorDoc_designMode = true;
                } catch ( e ) {}
            }
        },

        getSelection : function()
        {
            return ( window.getSelection ) ? window.getSelection() : document.selection;
        },

        getRange : function()
        {
            var selection = this.getSelection();

            if ( !( selection ) )
                return null;

            return ( selection.rangeCount > 0 ) ? selection.getRangeAt(0) : selection.createRange();
        },

        getContent : function()
        {
            return $( $(this.editor).document() ).find('body').html();
        },

        setContent : function( newContent )
        {
            $( $(this.editor).document() ).find('body').html(newContent);
        },

        saveContent : function()
        {
            if ( this.original )
            {
                var content = this.getContent();

                if ( this.options.rmUnwantedBr )
		{
                    content = ( content.substr(-4) == '<br>' ) ? content.substr(0, content.length - 4) : content;
		}

                $(this.original).val(content);
            }
        },

        withoutCss: function()
        {
            if ($.browser.mozilla)
            {
                try
                {
                    this.editorDoc.execCommand('styleWithCSS', false, false);
                }
                catch (e)
                {
                    try
                    {
                        this.editorDoc.execCommand('useCSS', false, true);
                    }
                    catch (e)
                    {
                    }
                }
            }
        },

        appendMenu : function( cmd, args, className, fn, tooltip )
        {
            var self = this;
            args = args || [];

            $('<li></li>').append(
                $('<a role="menuitem" tabindex="-1" href="javascript:;">' + (className || cmd) + '</a>')
                    .addClass(className || cmd)
                    .attr('title', tooltip)
            ).click(function() {
                if ( fn ) fn.apply(self); else
                {
                    self.withoutCss();
                    self.editorDoc.execCommand(cmd, false, args);
                }
                if ( self.options.autoSave ) self.saveContent();
            }).appendTo( this.panel );
        },

        appendMenuSeparator : function()
        {
            $('<li role="separator" class="separator"></li>').appendTo( this.panel );
        },

        appendControls : function()
        {
            for ( var name in this.options.controls )
            {
                var control = this.options.controls[name];

                if ( control.separator )
                {
                    if ( control.visible !== false )
                        this.appendMenuSeparator();
                }
                else if ( control.visible )
                {
                    this.appendMenu(
                        control.command || name, control.arguments || [],
                        control.className || control.command || name || 'empty', control.exec,
                        control.tooltip || control.command || name || ''
                    );
                }
            }
        },

        checkTargets : function( element )
        {
            for ( var name in this.options.controls )
            {
                var control = this.options.controls[name];
                var className = control.className || control.command || name || 'empty';

                $('.' + className, this.panel).removeClass('active');

                if ( control.tags )
                {
                    var elm = element;

                    do {
                        if ( elm.nodeType != 1 )
                            break;

                        if ( $.inArray(elm.tagName.toLowerCase(), control.tags) != -1 )
                            $('.' + className, this.panel).addClass('active');
                    } while ((elm = elm.parentNode));
                }

                if ( control.css )
                {
                    var elm = $(element);

                    do {
                        if ( elm[0].nodeType != 1 )
                            break;

                        for ( var cssProperty in control.css )
                            if ( elm.css(cssProperty).toString().toLowerCase() == control.css[cssProperty] )
                                $('.' + className, this.panel).addClass('active');
                    } while ((elm = elm.parent()));
                }
            }
        },

        getElementByAttributeValue : function( tagName, attributeName, attributeValue )
        {
            var elements = this.editorDoc.getElementsByTagName(tagName);

            for ( var i = 0; i < elements.length; i++ )
            {
                var value = elements[i].getAttribute(attributeName);

                if ( $.browser.msie )
                {
                    /** IE add full path, so I check by the last chars. */
                    value = value.substr(value.length - attributeValue.length);
                }

                if ( value == attributeValue )
                    return elements[i];
            }

            return false;
        }
    });
})(jQuery);