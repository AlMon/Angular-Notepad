var notepad = angular.module("notepad", ["LocalStorageModule", "xeditable", "ngAnimate", "truncate"]);

notepad.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('ngpad');
});

notepad.run(function(editableOptions) {
  editableOptions.theme = 'default';
});

notepad.controller("NotesCtrl", ["$scope", "localStorageService", function($scope, localStorageService){
  
  $scope.notes = [];
  
  //Get the bookmarksData from Local Storage if there is some already in place
  $scope.getNotes = function(){
    if(localStorageService.get("noteData")){
      $scope.notes = localStorageService.get("noteData");
    } else {
      $scope.notes = [];
    }
  }
  
  $scope.addNote = function(){
    $scope.notes.unshift({
      title: $scope.title,
      category: $scope.category,
      content: $scope.content
    });
    localStorageService.set("noteData", $scope.notes);
    $scope.title = "",
    $scope.category = "",
    $scope.content = ""
  }
  
  $scope.removeNote = function(start){
    var confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      $scope.notes.splice(start, 1);
      localStorageService.set("noteData", $scope.notes);
    }
    localStorageService.set("noteData", $scope.notes);
  }
  
}]);