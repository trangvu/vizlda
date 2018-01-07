/**
 * Created by trang on 01/01/18.
 */

var Searcher = (function(namespace) {
    namespace.searchDocs = function() {
        selectEle = document.getElementById("cat-select");
        var cat = selectEle.options[selectEle.selectedIndex].value;
        $("#search-dropdown").removeClass("open");
        var keyword = document.getElementById("keyword").value;
        this.goToTab("#tab03");
        //TODO: update list documents
        return false;
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
