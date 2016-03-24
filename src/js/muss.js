(function ( $ ) {
    $._html = function(target, tag, attribute, content) {
        var render = "<" + tag + " ";
      
        for ( attr in attribute) {
            var attr_value = attribute[attr];
            render += " " + attr + "=\"" + attr_value + "\"";  
        }
    
        render += ">" + content + "</" + tag + ">";
        $(target).append(render);
    };
    
    $.muss = function(_targets, _styles) {
        if ( $.isArray(_targets) ) {
            for ( var _target in _targets ) {
                var css_target = $(_targets[_target]);         
            
                for ( var _style in _styles ) {
                   css_target.css(_style, _styles[_style]);
                }
            }
        } else {
            for ( var _style in _styles ) {
                $(_targets).css(_style, _styles[_style]);
            }
        }
    };
}( jQuery ));