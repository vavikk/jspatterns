# Object Literal
```javascript
(function () {
    var domElement = {
        init: function () {
            this.cacheDom();
            this.setEvents();
            this.changeColor();
        },
        cacheDom: function () {
            this.div = document.getElementsByTagName("DIV")[0];
        },
        changeColor: function (color) {
            if (!color) color = "blue";
            this.div.style.color = color;
        },
        setEvents: function () {
            this.div.addEventListener('click', function () {
                this.changeColor('red');
            }.bind(this), false);
        }
    };
    domElement.init();
})();
```
