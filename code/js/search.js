/**
 * Created by trang on 01/01/18.
 */

var Searcher = (function(namespace) {
    namespace.Store = function(){};
    namespace.Store.prototype.s_searchListener = [];
    namespace.searchDocs = function() {
        selectEle = document.getElementById("cat-select");
        var cat = selectEle.options[selectEle.selectedIndex].value;
        $("#search-dropdown").removeClass("open");
        var keyword = document.getElementById("keyword").value;
        if (keyword == "") {
            keyword = document.getElementById("outer-keywords").value;
        }
        var data = {}
        data['cat'] = cat;
        data['keyword'] = keyword;
        this.dispatchSearchEvent(data);
        this.goToTab("#tab03");
        //TODO: update list documents
        return false;
    }

    namespace.registerSearchEvent = function(element) {
        namespace.Store.prototype.s_searchListener.push(element);
    }

    namespace.dispatchSearchEvent = function(data) {
        var elements = namespace.Store.prototype.s_searchListener;
        for (var i = 0; i < elements.length; i++) {
            elements[i].Update(data,"search");
        }
    }

    namespace.toggleSearchForm = function() {
        element = $("#search-dropdown");
        if (element.hasClass("open")) {
            element.removeClass("open");
        } else {
            element.addClass("open");
            document.getElementById("outer-keywords").value = "";
        }
    }

    namespace.goToTab = function(tabId) {
        //get displaying tab content jQuery selector
        var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');

        //find actived navigation and remove 'active' css
        var actived_nav = $('.nav-tabs > li.active');
        actived_nav.removeClass('in active');
        $(tabId).parents('li').addClass('in active');

        //hide displaying tab content
        $(active_tab_selector).removeClass('in active');
        $(active_tab_selector).addClass('hide');

        //show target tab content
        var target_tab_selector = $(tabId).attr('href');
        $(target_tab_selector).removeClass('hide');
        $(target_tab_selector).addClass('in active');
        var c = $(".div_twic_level");
        c.packery();
    }
    return namespace;
}(Searcher || {}));
