/* ============= Model ============= */

var model = {
    currentCat: null,
    cats : [
        {
            clickCount : 0,
            name : 'Taby',
            imgSrc : 'http://placehold.it/100x100'
        },
        {
            clickCount : 0,
            name : 'Vasili',
            imgSrc : 'http://placehold.it/100x150'
        }
    ]
};

/* ================ controller ===================*/

var controller = {
    
    init: function() {
        model.currentCat = model.cats[0];
        
        catListView.init();
        catView.init();
    },
    
    getCurrentCat: function() {
        return model.currentCat;
    },
    
    getCats: function() {
        return model.cats;        
    },
    
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    
    incrementCounter: function() {
        model.currentCat.clickCount++;
                    console.log('AsI?')
        catView.render();
    }
};

/* ================= Views ======================*/

var catView = {
    
    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        
        this.catImageElem.addEventListener("click", function(e) {
            controller.incrementCounter();
        }); 
        
        this.render();
    },
    
    render: function() {
        
        var currentCat = controller.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    
    }
};

var catListView = {

    init: function() {
        this.catListElem = document.getElementById('cat-list');
        this.render();
    
    },
    
    render: function() {
        var cats = controller.getCats();
        
        this.catListElem.innerHTML = '';
        
        for(var i=0; i< cats.length; i++) {
            var cat = cats[i];
            
            var elem = document.createElement('li');
            elem.textContent = cat.name;
            
            elem.addEventListener('click', (function(cat) {
                return function() {
                    controller.setCurrentCat(cat);
                    catView.render();
                }
            })(cat));
            
            this.catListElem.appendChild(elem);
        
        };
 
    }

}



controller.init();