var TWiC = (function(namespace){
    namespace.Data = function(){

        // Queue for loading JSON
        this.m_queue = new queue();
        // Corpus JSON data
        this.m_corpusMap = {};
        this.m_corpusInfo = {};
        this.m_topicWordLists = {};
        this.m_topicColors = {};
        this.m_docInfo = {};
    };

    // Loads all JSON required for TWiC
    namespace.Data.method("LoadJSON", function(p_corpusInfoPath, p_corpusMapPath, p_docInfoPath){

        // Load the corpus information JSON
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

        // Load the corpus distance map JSON
        var corpusDistanceMap = null;
        this.m_queue.defer(function(callback) {
            d3.json(p_corpusMapPath, function(error, data) {
                corpusDistanceMap = data;
                this.m_corpusMap = corpusDistanceMap;
                callback(null, corpusDistanceMap);
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
    });
    namespace.Data.prototype.s_jsonDirectory = "data/input/json/";
    namespace.m_data = new namespace.Data();

    return namespace;
}(TWiC || {}));