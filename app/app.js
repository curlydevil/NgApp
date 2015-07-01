(function () {
    "use strict";
    var app = angular.module("productManagement", 
                             ["common.services",
                              "ui.router",
                              "ui.mask",
                              "ui.bootstrap",
                              "angularCharts",
                              "productResourceMock"]);
    
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
                                return productResource.query().$promise;
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