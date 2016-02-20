/**
*  Module
*
* Description
*/
var app = angular.module('myApp', []);
app.controller('ctrl', function($scope){
	$scope.a = 'a';
	$scope.todos = [];
	$scope.responsiables = ['Menash','Elody'];
	$scope.filterBy = 'all';
	for(var i=0;i<4;i++)
		$scope.todos.push(todoConstactor('title'+i,'content'+i,'',getTodayDate()));

	$scope.addTodoList = function()
	{
		$scope.todos.push(todoConstactor($scope.title,$scope.content,$scope.data.singleSelect,formatingDate($scope.when)))
	}
	$scope.isFinish =function(todo)
	{
		todo.isDone  = true;

	}
	$scope.numOfTodoNotDone = function()
	{
		var count = 0;

		for(todo in $scope.todos)
		{
			if(!$scope.todos[todo].isDone)
				count++;
		}
		return count;
	}

	$scope.remove =function(todo)
	{
		$scope.todos.pop(todo);
	}

	function todoConstactor(title,content,responsiable,when)
	{
		return { title:title,
				 isDone:false,
			     content:content,
			     responsiable:responsiable,
			     when:when
				}
	}
	$scope.filterDate = function(todo) {
		if($scope.filterBy == 'all')
			return true;
		if(todo.when == getTodayDate())
			return true;
    }

    $scope.publicDateConverting = function(d)
    {
    	return formatingDate(d);
    }

    function getTodayDate()
    {
    	return formatingDate(new Date());
	}
	function formatingDate(d)
	{
		return (d.getDate() + 1) + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
		 
	} 
});
 app.	directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) 
      {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })

   app.directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsController) {
        tabsController.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })