function Product(name) {
    var self = this;
    self.name = name;
    self.bought = ko.observable(false);
}

function Category(name, products) {
    var self = this;
    self.name = name;
    self.products = ko.observableArray(products);
    self.boughtProducts = ko.computed(function () {
        return self.products().filter(function (product) {
            return product.bought();
        });
	});
    self.notBoughtProducts = ko.computed(function () {
        return self.products().filter(function (product) {
            return !product.bought();
        });
	});
}

function ShoppingListViewModel() {
    var self = this;
    
    self.rawList = ko.observable("tu wklej listę zakupów");
    
    self.processList = function() {
        self.categories.removeAll();
        var lines = self.rawList().split("\n");
        var numLines = lines.length;
        var currentCategory = {};
        for (var i = 0; i < numLines; i++) {
            var line = lines[i];
            if (line.length > 0) {
	           if (line.indexOf('*') == 0) {
		          currentCategory.products.push(new Product(line.substring(2)));
	           } else {
		          currentCategory = new Category(line, []);
		          self.categories.push(currentCategory);
	           }
            }
        }
    };
    
    self.categories = ko.observableArray([ ]);
    
    self.boughtCategories = ko.computed(function () {
        return self.categories().filter(function (category) {
            return category.boughtProducts().length > 0;
        });
	});

    self.notBoughtCategories = ko.computed(function () {
        return self.categories().filter(function (category) {
            return category.notBoughtProducts().length > 0;
        });
	});
    
}

ko.applyBindings(new ShoppingListViewModel());