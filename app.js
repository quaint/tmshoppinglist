function Product(name, bought) {
    var self = this;
    self.name = name;
    self.bought = ko.observable(bought);
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

function ShoppingListViewModel(savedList) {
    var self = this;

    self.rawList = ko.observable("");

    self.processList = function () {
        self.categories.removeAll();
        var lines = self.rawList().split("\n");
        var numLines = lines.length;
        var currentCategory = {};
        for (var i = 0; i < numLines; i++) {
            var line = lines[i];
            if (line.length > 0) {
                if (line.indexOf('*') == 0) {
                    currentCategory.products.push(new Product(line.substring(2), false));
                } else {
                    currentCategory = new Category(line, []);
                    self.categories.push(currentCategory);
                }
            }
        }
        self.selectedTab('notbought');
    };

    self.categories = ko.observableArray(savedList.map(function (savedCategory) {
        var products = [];
        for (var i = 0; i < savedCategory.products.length; i++) {
            var product = new Product(savedCategory.products[i].name, savedCategory.products[i].bought);
            products.push(product);
        } 
        return new Category(savedCategory.name, products);
    }));

    self.selectedTab = ko.observable('email');

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

    ko.computed(function () {
        localStorage.setItem('shopping-list', ko.toJSON(self.categories));
    }.bind(this)).extend({
        rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' }
    });
}

var savedList = ko.utils.parseJson(localStorage.getItem('shopping-list'));

var viewModel = new ShoppingListViewModel(savedList || []);
ko.applyBindings(viewModel);

Router({ '/:filter': viewModel.selectedTab }).init();