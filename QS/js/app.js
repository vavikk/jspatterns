// class person
function Person( config ) {
    'use strict';
    var config = config || {};
    
    this.template = '<ul class="person-info"><li class="name"><%=name=%></li><li class="quit_date"><%=quit_date=%></li><li class="quit_days"><%=quit_days=%></li></ul>';
    
    this.appendTo = function( elem ) {
        var parsedTpl = this.template
            .replace('<%=name=%>', this.getName)
            .replace('<%=quit_date=%>', this.getQuitDate)
            .replace('<%=quit_days=%>', this.daysNotSmoking);
        
        elem.append(parsedTpl);  
    };
    
    this.getName = function() {
        return config.name;
    };
    
    this.getQuitDate = function() {
        
        return config.quitDate;
    };
    
    this.daysNotSmoking = function() {
        return difference(config.quitDate);
    };
    
    
    
    
    return this;
};

function AppLayout( config ) {
    'use strict';
    var config = config || {},
        storage = [],
        template = '<ul class="app_layout"></ul>';
    
    this.add = function( element ) {
        storage.push(element);
    };
    
    this.appendTo = function ( element ) {
         
        var app_template = $(template);
        
        storage.forEach(function( widget ) {
            widget.appendTo(app_template); 
        });
       
        element.append(app_template);
    };
    
    
}; 

function Widget( config ) {
    'use strict';
    var config = config || {};
    
    this.template = '<ul class="widget"><li class="percent"><%=percent=%></li><li class="widget_content"><%=widget_content=%></li></ul> ';
    
    this.appendTo = function( elem ) {
        var parsedTpl = this.template
            .replace('<%=percent=%>', this.calcualtePercent)
            .replace('<%=widget_content=%>', this.getContent);
        
        elem.append(parsedTpl);  
    };
    
    this.calcualtePercent = function() {
        return config.time;
    }
    
    this.getContent = function() {
        return config.content;
    };
    
        
    return this;
};
function difference( quitDate ) {
        var date1 = new Date(quitDate);
        var date2 = new Date();
        
        var delta = Math.abs(date1 - date2) / 1000;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        var seconds = delta % 60;  // in theory the modulus is not required

        
        return days + " Days " + hours + " Hours " + minutes + " Minutes ";
    };
var person = new Person({
    name : "Vitalie",
    quitDate: "8/7/2015"
});
var carbon = new Widget({
    time : "2",
    content: "Carmon Monoxide"
});

var app = new AppLayout();
app.add(person);
app.add(carbon);
//app.add(person);
 
app.appendTo($('body'));

//person.appendTo($('body'));
