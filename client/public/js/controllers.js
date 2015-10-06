app.controller("ProjectController", function ($scope, httpFactory, $timeout) {

  // for quick clearing of everything
  $scope.success = false;
  $scope.project = {};

  getProjects = function (url) {
    httpFactory.get(url)
      .then(function (response) {
      //need to save the data to variable
      $scope.projects = response.data;
    });
  };
  getProjects('/api/v1/projects');

  function messageTimeout() {
    $scope.success = false;
  }

  $scope.postProject = function() {
    // var payload = {
    //   'name': $scope.name,
    //   'type': $scope.type,
    //   'abv': $scope.abv
    // };
    var payload = $scope.project;
    httpFactory.post('/api/v1/projects', payload)
      .then(function(response) {
        $scope.projects.push(response.data);
        // $scope.name = "";
        // $scope.type = "";
        // $scope.abv = "";
        $scope.project = {};
        $scope.success = true;
        $scope.message = "added a new project, thanks!";
        $timeout(messageTimeout, 5000);
      });
  };

});
