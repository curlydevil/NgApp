(function () {
    "use strict";
    var app = angular.module("productManagement", 
                             ["common.services",
                              "ui.router",
                              "ui.mask",
                              "ui.bootstrap",
                              "productResourceMock",
                              "angularCharts",
                              ]);

    app.config(function($provide){
        $provide.decorator("$exceptionHandler",
                           ["$delegate",
                           function($delegate){
                               return function(exception, cause){
                                   exception.message = "Please, contact the Help Desk! \n Message: " + exception.message;
                                   $delegate(exception, cause);
                                   alert(exception.message);
                               };
                           }]);
    });
    
    app.config(["$stateProvider", "$urlRouterProvider",
                function($stateProvider, $urlRouterProvider){
                    $stateProvider
                        .state("home", {
                        url:"/",
                        templateUrl: "app/welcomeView.html"
                    })
                        .state("productList", {
                        url: "/products",
                        templateUrl: "app/products/productListView.html",
                        controller: "ProductListCtrl",
                        controllerAs: "vm"
                    })
                        .state("productEdit", {
                        abstract: true,
                        url: "/products/edit/:productId",
                        templateUrl: "app/products/productEditView.html",
                        controller: "ProductEditCtrl",
                        controllerAs: "vm",
                        resolve: {
                            productResource: "productResource",
                            product: function(productResource, $stateParams){
                                var productId = $stateParams.productId;
                                return productResource
                                    .get({productId: productId})
                                    .$promise;
                            }
                        }
                    })
                        .state("productEdit.info", {
                        url: "/info",
                        templateUrl: "app/products/productEditInfoView.html"
                        
                    })
                        .state("productEdit.price", {
                        url: "/proce",
                        templateUrl: "app/products/productEditPriceView.html"
                        
                    })
                        .state("productEdit.tags", {
                        url: "/tags",
                        templateUrl: "app/products/productEditTagsView.html"
                        
                    })
                        .state("priceAnalytics", {
                        url: "/priceAnalytics",
                        templateUrl: "app/prices/priceAnalyticsView.html",
                        controller: "PriceAnalyticsCtrl",
                        resolve: {
                            productResource: "productResource",
                            products: function(productResource){
                                return productResource.query(
                                function(response){},
                                function(response){
                                    toastr.warning(response.data,
                                                   "Error code: " + response.status);
                                    }).$promise;
                            }
                        }
                    })
                        .state("productDetail", {
                        url: "/products/:productId",
                        templateUrl: "app/products/productDetailView.html",
                        controller: "ProductDetailCtrl",
                        controllerAs: "vm",
                        resolve: {
                            productResource: "productResource",
                            product: function(productResource, $stateParams){
                                var productId = $stateParams.productId;
                                return productResource
                                    .get({productId: productId})
                                    .$promise;
                            }
                        }
                    })
                    ;
                    
        $urlRouterProvider.otherwise("/");
        
        
    }]
    );
}());
