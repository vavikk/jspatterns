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
        var quitDay = new Date("8/6/2015"),
            toDay = new Date(),
            endDay = new Date();
        
         
        
        endDay.setDate(quitDay.getDate() + config.time);
        console.log(quitDay)
        console.log(config.time)
        console.log(endDay)
        
        return Math.round(100 - ((endDay.getDate() - quitDay.getDate()) * 100 ) / toDay.getDate()) + '%' 
    }
    
    this.getContent = function() {
        return config.content;
    };
    
        
    return this;
};
function difference( quitDate ) {
        var startDate = new Date(quitDate),
            toDay = new Date();
    
       
        var delta = Math.abs(startDate - toDay) / 1000;

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
    quitDate: "8/2/2015 23:04:00"
});
var carbon = new Widget({
    time : 4,
    content: "Carbon Monoxide and O2 levels"
});

var smell = new Widget({
    time : 10,
    content: "Smell"
});

var app = new AppLayout();
app.add(person);
app.add(carbon);
//app.add(smell);
//app.add(person);
 
app.appendTo($('body'));

//person.appendTo($('body'));
