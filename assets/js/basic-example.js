(function () {
  'use strict';

  angular.module('demoApp')
    .controller('BasicExampleCtrl', ['$scope', '$http', function ($scope, $http) {

      $scope.remove = function(scope) {
        scope.remove();
      };

      $scope.toggle = function(scope) {
        scope.toggle();
      };

      $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0,0, a);
      };

      $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };

      $scope.collapseAll = function() {
        $scope.$broadcast('collapseAll');
      };

      $scope.expandAll = function() {
        $scope.$broadcast('expandAll');
      };

      var search_and_add = function(node, tree){
        /* Si no tiene dependencias (padres), añadelo a 'tree' directamente*/

        if(!node.dependency || !node.dependency.id){
          tree.push(node); return tree;
        } 

        for(var i in tree){
          // si encuentra a su padre añadelo en él
          if(node.dependency.id == tree[i].id){
            if(tree[i].nodes.length > 0){
              tree[i].nodes.push(node); 
              break;
            }else{
              tree[i].nodes =[node]; 
              break;
            }
          }

          // De lo contrario busca entre los hijos de la rama actual
          else if(tree[i].nodes.length > 0){
            tree[i].nodes = search_and_add(node, tree[i].nodes); 
          } 
        }

        return tree
      }

      var add_to_branch = function(nodes, tree){
        var node = nodes.shift();
        if( tree.length < 1) tree.push(node);
        else tree = search_and_add(node, tree);
        create_tree(nodes, tree);
      }

      var create_tree = function(nodes, tree){
        if(nodes.length > 0) add_to_branch(nodes, tree);
        return tree;
      }

      $http.get('http://localhost:1337/question').success(function(data) {
        /* Tiene que ordenarse para agregar correctamente a los elementos padre*/
        data = data.sort( function(a, b) { return a.order_num - b.order_num; })

        // Agregar a todos el campo nodes
        for (var i in data) data[i].nodes = []
          
        $scope.data = create_tree( data, [] );

      });

    }]);

}());