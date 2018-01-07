var TWiC = (function(namespace){
    namespace.Data = function(){

        // Queue for loading JSON
        this.m_queue = new queue();
        // Corpus JSON data
        this.m_corpusInfo = {};
        this.m_topicWordLists = {};
        this.m_topicColors = {};
        this.m_docInfo = {};
        this.m_categories = [];
    };

    // Loads all JSON required for TWiC
    namespace.Data.method("LoadJSON", function(p_corpusInfoPath, p_docInfoPath, p_metaDataPath){

        // Load the corpus information JSON1
        var corpusInfo = null;
        this.m_queue.defer(function(callback) {
            d3.json(p_corpusInfoPath, function(error, data) {
                corpusInfo = data;
                this.m_corpusInfo = corpusInfo;
                this.m_topicWordLists = corpusInfo.topword;
                this.m_topicColors = corpusInfo.color;
                callback(null, corpusInfo);
            }.bind(this));
        }.bind(this));

        // Load the doc information JSON
        var docInfo = null;
        this.m_queue.defer(function(callback) {
            d3.json(p_docInfoPath, function(error, data) {
                docInfo = data;
                this.m_docInfo = docInfo;
                callback(null, docInfo);
            }.bind(this));
        }.bind(this));

        var metaInfo = null;
        this.m_queue.defer(function(callback) {
            d3.json(p_metaDataPath, function(error, data) {
                metaInfo = data;
                this.m_categories = metaInfo.tags;
                callback(null, metaInfo);
            }.bind(this));
        }.bind(this));
    });

    namespace.Data.method("PopulateSearchCategories", function(selectorId){
        for (var i = 0, len = this.m_categories.length; i < len; i++) {
            var val = i + 1;
            $(selectorId).append("<option value='"+ val +"'>" + this.m_categories[i] +"</option>");
        }
    });
    namespace.Data.prototype.s_jsonDirectory = "data/input/json/";
    namespace.m_data = new namespace.Data();

    return namespace;
}(TWiC || {}));