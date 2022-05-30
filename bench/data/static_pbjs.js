/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("../../minimal");

var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var $root = $protobuf.roots.test_bench || ($protobuf.roots.test_bench = {});

function setProperties (context, properties) {
    return properties && Object.keys(properties).forEach(function(k) {
        if(properties[k] != null) {
            context[k] = properties[k];
        }
    });
}

$root.Test = (function() {


    function Test(properties) {
        setProperties(this, properties);
    }

    Test.type = 'Test';
    Test.prototype.type = 'Test';

    Test.prototype.string = "";
    Test.prototype.uint32 = 0;
    Test.prototype.inner = null;
    Test.prototype.float = 0;

    var fieldNameMap = {
        1: 'string',
        2: 'uint32',
        3: 'inner',
        4: 'float'
    };

    Test.fieldNumberByName = function fieldNumberByName(name) {
        var num = Object.keys(fieldNameMap).find(key => fieldNameMap[key] === name);
        return Number(num);
    };

    Test.fieldByNumber = function fieldByNumber(num) {
        return fieldNameMap[num];
    };

    Test.prototype.fieldByNumber = Test.fieldByNumber;

    Test.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.string != null && Object.hasOwnProperty.call(message, "string"))
            writer.uint32(10).string(message.string);
        if (message.uint32 != null && Object.hasOwnProperty.call(message, "uint32"))
            writer.uint32(16).uint32(message.uint32);
        if (message.inner != null && Object.hasOwnProperty.call(message, "inner"))
            $root.Test.Inner.encode(message.inner, writer.uint32(26).fork()).ldelim();
        if (message.float != null && Object.hasOwnProperty.call(message, "float"))
            writer.uint32(37).float(message.float);
        return writer;
    };

    Test.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Test();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.string = reader.string();
                break;
            case 2:
                message.uint32 = reader.uint32();
                break;
            case 3:
                message.inner = $root.Test.Inner.decode(reader, reader.uint32());
                break;
            case 4:
                message.float = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Test.Inner = (function() {


        function Inner(properties) {
            setProperties(this, properties);
        }

        Inner.type = 'Inner';
        Inner.prototype.type = 'Inner';

        Inner.prototype.int32 = 0;
        Inner.prototype.innerInner = null;
        Inner.prototype.outer = null;

        var fieldNameMap = {
            1: 'int32',
            2: 'innerInner',
            3: 'outer'
        };

        Inner.fieldNumberByName = function fieldNumberByName(name) {
            var num = Object.keys(fieldNameMap).find(key => fieldNameMap[key] === name);
            return Number(num);
        };

        Inner.fieldByNumber = function fieldByNumber(num) {
            return fieldNameMap[num];
        };

        Inner.prototype.fieldByNumber = Inner.fieldByNumber;

        Inner.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.int32 != null && Object.hasOwnProperty.call(message, "int32"))
                writer.uint32(8).int32(message.int32);
            if (message.innerInner != null && Object.hasOwnProperty.call(message, "innerInner"))
                $root.Test.Inner.InnerInner.encode(message.innerInner, writer.uint32(18).fork()).ldelim();
            if (message.outer != null && Object.hasOwnProperty.call(message, "outer"))
                $root.Outer.encode(message.outer, writer.uint32(26).fork()).ldelim();
            return writer;
        };

        Inner.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Test.Inner();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.int32 = reader.int32();
                    break;
                case 2:
                    message.innerInner = $root.Test.Inner.InnerInner.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.outer = $root.Outer.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        Inner.InnerInner = (function() {


            function InnerInner(properties) {
                setProperties(this, properties);
            }

            InnerInner.type = 'InnerInner';
            InnerInner.prototype.type = 'InnerInner';

            InnerInner.prototype.long = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
            InnerInner.prototype["enum"] = 0;
            InnerInner.prototype.sint32 = 0;

            var fieldNameMap = {
                1: 'long',
                2: 'enum',
                3: 'sint32'
            };

            InnerInner.fieldNumberByName = function fieldNumberByName(name) {
                var num = Object.keys(fieldNameMap).find(key => fieldNameMap[key] === name);
                return Number(num);
            };

            InnerInner.fieldByNumber = function fieldByNumber(num) {
                return fieldNameMap[num];
            };

            InnerInner.prototype.fieldByNumber = InnerInner.fieldByNumber;

            InnerInner.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.long != null && Object.hasOwnProperty.call(message, "long"))
                    writer.uint32(8).int64(message.long);
                if (message["enum"] != null && Object.hasOwnProperty.call(message, "enum"))
                    writer.uint32(16).int32(message["enum"]);
                if (message.sint32 != null && Object.hasOwnProperty.call(message, "sint32"))
                    writer.uint32(24).sint32(message.sint32);
                return writer;
            };

            InnerInner.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Test.Inner.InnerInner();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.long = reader.int64();
                        break;
                    case 2:
                        message["enum"] = reader.int32();
                        break;
                    case 3:
                        message.sint32 = reader.sint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            return InnerInner;
        })();

        return Inner;
    })();

    Test.Enum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ONE"] = 0;
        values[valuesById[1] = "TWO"] = 1;
        values[valuesById[2] = "THREE"] = 2;
        values[valuesById[3] = "FOUR"] = 3;
        values[valuesById[4] = "FIVE"] = 4;
        return values;
    })();

    return Test;
})();

$root.Outer = (function() {


    function Outer(properties) {
        setProperties(this, properties);
    }

    Outer.type = 'Outer';
    Outer.prototype.type = 'Outer';

    Outer.prototype.bool = $util.emptyArray;
    Outer.prototype.double = 0;

    var fieldNameMap = {
        1: 'bool',
        2: 'double'
    };

    Outer.fieldNumberByName = function fieldNumberByName(name) {
        var num = Object.keys(fieldNameMap).find(key => fieldNameMap[key] === name);
        return Number(num);
    };

    Outer.fieldByNumber = function fieldByNumber(num) {
        return fieldNameMap[num];
    };

    Outer.prototype.fieldByNumber = Outer.fieldByNumber;

    Outer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.bool != null && message.bool.length) {
            writer.uint32(10).fork();
            for (var i = 0; i < message.bool.length; ++i)
                writer.bool(message.bool[i]);
            writer.ldelim();
        }
        if (message.double != null && Object.hasOwnProperty.call(message, "double"))
            writer.uint32(17).double(message.double);
        return writer;
    };

    Outer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Outer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.bool && message.bool.length))
                    message.bool = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.bool.push(reader.bool());
                } else
                    message.bool.push(reader.bool());
                break;
            case 2:
                message.double = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    return Outer;
})();

module.exports = $root;
