var myApp = angular.module('myApp', []);

var template =
`<div class="container">
    <div class="row">
        <div class="col-lg-10"></div>
            <button type="button" class="btn btn-danger" ng-click="AskServer()">Ask data to server</button>
    </div>
    <div ng-if="clicked">
        <div class="row" ng-if="loading">
            <div class="loader"></div>
        </div>
        <div class="row" ng-if="loading==false">
            <div class="col-lg-3"><strong>Name</strong></div>
            <div class="col-lg-3"><strong>Pok&egravemon</strong></div>
            <div class="col-lg-4"><strong>URL</strong></div>
        </div>
    </div>
    <br>
    <div ng-repeat="x in mywelcome.results.slice(0, 15) | orderBy:'name'">
      <my-pokemon mywelcome="x"></my-pokemon>
    </div>  
</div>     
`

myApp.directive('myDirective', function() {
    return { 
        controller: function($scope, $http){
            $scope.mywelcome = ''
            $scope.mywelcome.results = ''
            $scope.clicked= false
            $scope.AskServer = function(){
                $scope.clicked=true;
                $scope.loading = true;
                var ads = $http.get('https://pokeapi.co/api/v2/pokemon/')
                ads.then(
                function(success){ 
                    $scope.mywelcome = success.data; 
                    console.log($scope.mywelcome)
                     $scope.loading=false},
                function(error){ console.log("ritenta");$scope.loading=false}
                )
            }
        },
        template: template,
    }
  });

myApp.directive('myPokemon', function(){
    return {
        scope :{
            name: "=",
            url: "=",
            mywelcome: "=",
            loading:"=",
             },
        template: template_mypokemon,
        controller: function($scope, $http){
            $scope.pokemon=false
            $scope.card=false
            $scope.AskSinglePokemon = function(){
                $http.get($scope.mywelcome.url).then(function(success){
                    $scope.pokemon = success.data;
                    console.log("ciao", success)
                },
                function(error){
            
                })
            }
            $scope.showCard = function(){
                $scope.card=true;                
              }
            $scope.AskSinglePokemon();
        }
    }
});

var template_mypokemon = 
`<div class="row">
    <div class="col-lg-3"><div class="name">{{mywelcome.name}}</div></div>
    <div class="col-lg-3" ng-if="pokemon!==false" >
        <img src="{{pokemon.sprites.front_default}}" class="sprite"></img>
    </div>
    <div class="col-lg-4"><a href="{{mywelcome.url}}">{{mywelcome.url}}</a></div>
    <div class="col-lg-2" ng-if="pokemon!==false" >
        <button type="button" class="btn btn-warning" ng-click="showCard()">Show card</button>
        <div ng-if="card==true"class="card text-white bg-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">{{mywelcome.name}}</div>
             <div class="card-body">
                <h6>Abilities:</h6><br>
                <p ng-repeat="ability in pokemon.abilities">{{ability.ability.name}}</p>
             </div>
        </div>
    </div>
 </div>
 <br>
`
