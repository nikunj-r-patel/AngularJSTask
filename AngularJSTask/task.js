const taskDone = document.querySelectorAll("input[type='checkbox']:checked");
for (let i = 0; i < taskDone.length; i++) {
    document.getElementById("done").style.textDecoration = "line-through";
}
var app = angular.module('TaskMe', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: 'TaskCtrl',
            templateUrl: 'AngularJSTask.html'
        })
        .otherwise({
            redirectTo: "/"
        });
});
app.controller('TaskCtrl', ['$scope', '$filter', function ($scope, $filter) {
    $scope.headings = [];
    $scope.newHeading = "";
    $scope.taskName = "";
    $scope.addHeading = function () {
        if ($scope.newHeading) {
            $scope.headings.push({ name: $scope.newHeading, tasks: [] });
            $scope.newHeading = "";
        }
    };
    $scope.addTask = function (headingIndex, taskName) {
        if (taskName) {
            $scope.headings[headingIndex].tasks.push({ name: taskName, done: false });
        };
        $scope.taskName = "";
    };
    $scope.toggleTask = function (headingIndex, taskIndex) {
        $scope.headings[headingIndex].tasks[taskIndex].done = !$scope.headings[headingIndex].tasks[taskIndex].done;
    };
    $scope.removeCompleted = function () {
        for (var i = 0; i < $scope.headings.length; i++) {
            $scope.headings[i].tasks = $filter('filter')($scope.headings[i].tasks, { done: false });
        }
    };
    $scope.getTotalTasks = function () {
        var totalTasks = 0;
        for (let i = 0; i < $scope.headings.length; i++) {
            totalTasks += $scope.headings[i].tasks.length;
        }
        return totalTasks;
    };
    $scope.getTotalTasksCompleted = function () {
        var totalCompleted = 0;
        for (let i = 0; i < $scope.headings.length; i++) {
            for (let j = 0; j < $scope.headings[i].tasks.length; j++) {
                if ($scope.headings[i].tasks[j].done) {
                    totalCompleted++;
                }
            }
        }
        return totalCompleted;
    };
    $scope.getTotalTasksRemaining = function () {
        return $scope.getTotalTasks() - $scope.getTotalTasksCompleted();
    };
    $scope.removeCompletedForHeading = function(headingIndex) {
        $scope.headings[headingIndex].tasks = $filter('filter')($scope.headings[headingIndex].tasks, { done: false });
    };
}]);


