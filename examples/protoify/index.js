var ProtoBuf = require("protobufjs"),
    ByteBuffer = ProtoBuf.ByteBuffer,
    int_min = 0x80000000|0,
    int_max = 0x7fffffff|0;

// Option 1: Loading the .proto file directly
var JS = ProtoBuf.loadProtoFile("./json.proto").build("js");

// Option 2: Loading the .json file generated through 'proto2js json.proto > json.json'
var JS = ProtoBuf.loadJsonFile("./json.json").build("js");

// Option 3: Loading the module generated through 'proto2js json.proto -commonjs=js > json.js'
var JS = require("./json.js");

// The JS-namespace now contains Value, Array and Object

/**
 * Converts a JSON-like structure to JS-Namespace values.
 * @param {*} val JSON
 * @returns {!JS.Value} JS-Namespace value
 * @inner
 */
function _protoify(val) {
    switch (typeof val) {
        case 'number':
            if (val%1 === 0 && val >= int_min && val <= int_max)
                return new JS.Value({ 'integer': val });
            else
                return new JS.Value({ 'double': val });
        case 'string':
            return new JS.Value({ 'string': val });
        case 'boolean':
            return new JS.Value({ 'boolean': val });
        case 'object':
            if (val === null)
                return new JS.Value({ 'null': true });
            if (Object.prototype.toString.call(val) === "[object Array]") {
                var arr = new JS.Array();
                for (var i=0; i<val.length; ++i)
                    arr['values'][i] = _protoify(val[i]);
                return new JS.Value({ 'array': arr });
            }
            var obj = new JS.Object();
            for (var key in val)
                if (val.hasOwnProperty(key))
                    obj['keys'].push(_protoify(key)),
                        obj['values'].push(_protoify(val[key]));
            return new JS.Value({ 'object': obj });
        case 'undefined':
            return new JS.Value(); // undefined
        default:
            throw Error("Unsupported type: "+(typeof val)); // symbol, function
    }
}

/**
 * Converts JS-Namespace values to JSON.
 * @param {!JS.Value} value JS value
 * @returns {*} JSON
 * @inner
 */
function _jsonify(value) {
    if (value['integer'] !== null)
        return value['integer'];
    if (value['double'] !== null)
        return value['double'];
    if (value['string'] !== null)
        return value['string'];
    if (value['boolean'] !== null)
        return value['boolean'];
    if (value['null'] === true)
        return null;
    if (value['array'] !== null) {
        var values = value['array']['values'],
            i = 0,
            k = values.length,
            arr = new Array(k);
        for (; i<k; ++i)
            arr[i] = _jsonify(values[i]);
        return arr;
    }
    if (value['object'] !== null) {
        var keys = value['object']['keys'],
            values = value['object']['values'],
            i = 0,
            k = keys.length,
            obj = {};
        for (; i<k; ++i)
            obj[_jsonify(keys[i])] = _jsonify(values[i]);
        return obj;
    }
    return undefined;
}

/**
 * Converts JSON to a Buffer.
 * @param {*} json JSON
 * @returns {!Buffer|!ArrayBuffer}
 * @expose
 */
module.exports = function(json) {
    return _protoify(json).encode().toBuffer();
};

/**
 * Converts a Buffer to JSON.
 * @param {!Buffer|!ArrayBuffer} proto Buffer
 * @returns {*} JSON
 * @expose
 */
module.exports.jsonify = function(proto) {
    if (!ByteBuffer.isByteBuffer(proto))
        proto = ByteBuffer.wrap(proto);
    return _jsonify(JS.Value.decode(proto));
};
