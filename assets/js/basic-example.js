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

      $http.get('http://localhost:1337/question').success(function(data) {
        /* Devuelve el objeto resultante de mezclar dos objetos*/
        var merge = function(A, B){
          for(var k in B) if(!(k in A)) A[k] = B[k]
          return A;
        }

        var add_to_branch = function(node, nodes, tree){
          var _tree = tree;
          console.log(node, nodes, tree)
          for(var i in tree){

            // Si encuentra que hay un rama en el arbol con su mismo id (por que un hijo lo 'aparto'), entonces se mezcla con ella
            if(node.id == tree[i].id){
              tree[i] = merge(tree[i], node)
              break

            // Si tiene dependencia
            }else if(node.dependency && node.dependency.id){

              // si encuentra a su padre
              if(node.dependency.id == tree[i].id){
                // añadelo al padre
                  if(tree[i].nodes && tree[i].nodes.length > 0){
                    tree[i].nodes.push(node)
                    break;
                  }else{
                    tree[i].nodes =[node]
                    break;
                  }
                
              }

              // De lo contrario busca entre los hijos de la rama actual
              else if(tree[i].nodes && tree[i].nodes.length > 0){
                add_to_branch(node, tree[i].nodes)
              } 
            }else{
              tree.push(node);
              break
            }
          } 

          if(tree !== _tree) 
            return { 'tree': tree, "node": null }
          else 
            return { 'tree': null, "node": node }
        }

        var add_to_tree = function(nodes, tree){
          // si no hay más nodos, devuelve el arbol
          if(nodes.length < 1) return tree
          var node = nodes.shift()

          var d = add_to_branch(node, nodes, tree)
          console.log(d)
          if(!d.tree) nodes.push(d.node)

          add_to_tree(nodes, tree);

        }

        var tree = add_to_tree(data, [])
        
        console.log(data)
      });



      $scope.data = [
        {
          "id": "55767221ac4ec3825d33a891",
          "title": "Nombre",
          "type": "string",
          "enable": true,
          "nodes": [],
        },
        {
          "id": "5576727dac4ec3825d33a892",
          "title": "Edad",
          "type": "integer",
          "enable": true,
          "nodes": [],
        },
        {
          "id": "557672c8ac4ec3825d33a893",
          "title": "Sexo",
          "type": "string",
          "enable": true,
          "choices": ["Masculino", "Femenino", "Otro"],
          "nodes": [],
        },
        {
          "id": "55767344ac4ec3825d33a894",
          "title": "¿Dio datos de Contacto?",
          "type": "string",
          "enable": true,
          "choices": ["Si", "No"],
          "nodes": [
            {
              "id": "5576741bac4ec3825d33a895",
              "title": "Twitter",
              "type": "string",
              "enable": true,
              "if_parent":"Si",
              "nodes": [],
            },
            {
              "id": "5576743bac4ec3825d33a896",
              "title": "Correo",
              "type": "string",
              "enable": true,
              "if_parent":"Si",
              "nodes": [],
            },
            {
              "id": "5576745bac4ec3825d33a897",
              "title": "Teléfono",
              "type": "string",
              "if_parent":"Si",
              "enable": true,
              "nodes": [],
            }
          ],
        }
      ];


    }]);

}());