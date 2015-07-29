# Object Literal
```javascript
var Library = (function() {
    
    var _name = "This is the name";
    
    var getName = function() {
        alert(_name);
    }
    var setName = function( newName ) {
       _name = newName; 
       alert(_name); 
    
    }
    
    return {
        setName: setName,
        getName: getName
    
    }
    
               

})();
Library.getName();
Library.setName("la");
Library.getName();
```