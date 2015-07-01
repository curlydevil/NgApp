(function(){
    "use strict";
    angular.module("productManagement")
            .controller("ProductListCtrl", ["productResource", ProductListController]);
    
    function ProductListController(productResource){
        var vm = this;
        
        productResource.query(function(data){
            vm.products = data;
        });
                                                           
        vm.showImage = false;
        
        vm.toggleImage = function(){
            vm.showImage = !vm.showImage;
        }
    }
}())