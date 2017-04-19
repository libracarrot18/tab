;(function ($) {

    var Tab = function (tab) {
        var _this = this;
        this.config = {
            "triggerType":"click",
            "effect":"default",
            "invoke":1,
            "auto":false
        }
        this.tabDom = tab;
        if(this.getConfig()){
            $.extend(this.config,this.getConfig());
        }
        this.tabItems = this.tabDom.find('ul.tabWrap .tabItem');
        this.contentItems = this.tabDom.find('div.contentWrap .contentItem');
        this.contentWrap = this.tabDom.find('div.contentWrap');

        var config = this.config;
        if(config.triggerType === 'click'){
            this.tabItems.on(config.triggerType,function () {
                _this.invoke($(this));
            })
        }else {
            this.tabItems.on('mouseover',function () {
                _this.invoke($(this));
            })
            this.tabItems.on('click',function () {
                _this.invoke($(this));
            })
        }
        if(config.auto){
            var _this = this;
            this.timer = null;
            this.loop = 0;
            this.autoPlay();
            _this.tabDom.hover(
                function () {
                    window.clearInterval(_this.timer);
                },
                function () {
                    _this.autoPlay();
                }
            );
        }
        if(config.invoke){
            this.invoke(this.tabItems.eq(config.invoke));
        }
    };
    Tab.prototype = {
        autoPlay:function () {
            var _this      = this,
            tabItems       = _this.tabItems,
                tabLength  = tabItems.length,
                config     = _this.config;
            this.timer = window.setInterval(function () {
                _this.loop++;
                if(_this.loop >= tabLength){
                    _this.loop = 0;
                }
                tabItems.eq(_this.loop).trigger('click');
            },config.auto)

        },
        invoke:function (currentTab) {
            var _this = this;
            var effect = _this.config.effect;
            currentTab.addClass('active').siblings().removeClass('active');
            var index = currentTab.index();
            var contentItems = _this.contentItems;
            if(effect === 'default'){
                contentItems.eq(index).addClass('current').siblings().removeClass('current');
            }else {
                contentItems.eq(index).fadeIn().siblings().fadeOut();
            }
            if(_this.config.auto){
                _this.loop = index;
            }
        },
        getConfig:function () {
            var config = this.tabDom.attr("tab-config");
            if(config&&config!=''){
                return $.parseJSON(config);
            }else {
                return null
            }
        }
    };

    $.fn.extend({
        tab:function () {
            this.each(function () {
               new Tab($(this));
            });
            return this;
        }
    })

    window.Tab = Tab;
})(jQuery);