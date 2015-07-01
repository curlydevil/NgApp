(function(){
    "use strict";
    
    var app = angular.module("productResourceMock",
                             ["ngMockE2E"]);
    
    app.run(function($httpBackend){
        
        var products = [
        {
            "productId" : 1,
            "productName": "Leaf rake",
            "productCode": "GDN-0011",
            "releaseDate" : "March 19, 2009",
            "description": "Leaf rake with 48-inch handle.",
            "cost": 9.00,
            "price": 19.95,
            "category": "garden",
            "tags":["leaf", "tool"],
            "imageUrl":"https://openclipart.org/image/300px/svg_to_png/26215/Leaf-Rake.png"
        },
        {
            "productId" : 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate" : "March 18, 2010",
            "description": "15 gallon capacity rolling garden cart.",
            "cost": 20.00,
            "price": 32.99,
            "category": "garden",
            "tags":["barrow", "cart", "wheelbarrow"],
            "imageUrl":"https://openclipart.org/image/300px/svg_to_png/58471/garden-cart.png"
        },
        {
            "productId" : 5,
            "productName": "Hammer",
            "productCode": "TBX-0048",
            "releaseDate" : "May 21, 2013",
            "description": "Curved claw steel hammer.",
            "cost": 1.00,
            "price": 8.99,
            "category": "toolbox",
            "tags":["tool"],
            "imageUrl":"https://openclipart.org/image/300px/svg_to_png/73/rejon-Hammer.png"
        },
        {
            "productId" : 8,
            "productName": "Saw",
            "productCode": "TBX-0022",
            "releaseDate" : "May 15, 2009",
            "description": "15-inch steel blade hand saw.",
            "cost": 6.95,
            "price": 11.55,
            "category": "garden",
            "tags":["garden", "mower"],
            "imageUrl":"https://openclipart.org/image/300px/svg_to_png/27070/egore911-saw.png"
        },
        {
            "productId" : 10,
            "productName": "Video Game Controller",
            "productCode": "GMG-0042",
            "releaseDate" : "October 15, 202",
            "description": "Standard two-button video game controller.",
            "cost": 2.22,
            "price": 35.95,
            "category": "gaming",
            "tags":["gaming", "controller", "video game"],
            "imageUrl":"https://openclipart.org/image/300px/svg_to_png/212648/Gamepad-White.png"
        }];
        
        var productUrl = "/api/products";
        $httpBackend.whenGET(productUrl).respond(products);
        
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*",'');
        
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var tokens = url.split('/');
            var id = tokens[tokens.length-1];
            var product = {"productId" : 0};
            
            if(id > 0)
                for(let i=0;i<products.length;i++){
                        if(products[i].productId == id)
                            product = products[i];
                };
                
            return [200, product, {}];
        });
        
        $httpBackend.whenPOST(productUrl).respond(function(method, url, data){
            var product = angular.fromJson(data);
            
            if(!product.productId){
                product.productId = products[products.length-1].productId+1;
                products.push(product);
                }
            else{
                for(let i = 0; i < products.length; i++){
                    if(products[i].productId == product.productId){
                        products[i] = product;
                        break;
                    }
                }
            };
            
            return [201, product, {}]
        });
        
        $httpBackend.whenGET(/app/).passThrough();
       });
}());