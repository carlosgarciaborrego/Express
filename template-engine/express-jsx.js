const fs = require('fs');

function getKeyFromOptions(options){
    const { sttings, _locals, ...objectKeys } = options;
    return Object.keys(objectKeys);
}

function getRenderedContent(content, object){
    const keys = getKeyFromOptions(object);
    let contentString = content.toString();

    for(let key of keys){
        contentString = contentString.replace(new RegExp(`\{${key}\}`, "gi"), 
        object[key])
    }
    return contentString;
} 

function expressJxs(filePath, options, callback){
    fs.readFile(filePath, function(err, content){
        if(err){
            return callback(err);
        }

        const rendered = getRenderedContent(content, options);

        return callback(null, rendered);
    })
}

module.exports = expressJxs;