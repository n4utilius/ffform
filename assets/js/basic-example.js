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

      var merge = function(A, B){
        /* Devuelve el objeto resultante de mezclar dos objetos*/
        for(var k in B) if(!(k in A)) A[k] = B[k];
        return A;
      }
        
      var search_and_add = function(node, tree){
        for(var i in tree){
          // Si encuentra que hay un rama en el arbol con su mismo id (por que un hijo lo 'aparto'), entonces se mezcla con ella
          if(node.id == tree[i].id){
            tree[i] = merge(tree[i], node);
            break;

          // Si tiene dependencia (o un padre)
          }else if(node.dependency && node.dependency.id){
            // si encuentra a su padre
            if(node.dependency.id == tree[i].id){
              // añadelo al padre
              if(tree[i].nodes && tree[i].nodes.length > 0){
                tree[i].nodes.push(node);
                break;
              }else{
                tree[i].nodes =[node];
                break;
              }
            }

            // De lo contrario busca entre los hijos de la rama actual
            else if(tree[i].nodes && tree[i].nodes.length > 0){
              tree = aux(node, tree[i].nodes)
            } 

          }
        }

        return tree
      }

      var add_to_branch = function(nodes, tree){
        var node = nodes.shift();
        if( tree.length < 1) tree.push(node);
        else tree = search_and_add(node, tree);
        add_to_tree( nodes, tree );
      }

      var add_to_tree = function(nodes, tree){
        // si no hay más nodos, devuelve el arbol
        if(nodes.length < 1) return tree;
        add_to_branch(nodes, tree);
      }

      $http.get('http://localhost:1337/question').success(function(data) {
        var tree = add_to_tree(data, []);
        console.log(tree);

        
      });

    }]);

}());