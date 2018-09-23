//1.
var app = angular.module('app', []);
//2.
app.service('serv', function ($http) {
    this.getData = function () {
        var response = $http.get('http://localhost:8200/api/EmployeeInfoesAPI');
        return response;
    };
    this.post = function (emp) {
        var response = $http({
            url: 'http://localhost:8200/api/EmployeeInfoesAPI',
            method: 'post',
            data: emp,
            datatype: 'json',
            contenttype: 'application/json;utf-8'
        });
        return response;
    };
});

//3.
app.controller('ctrl', function ($scope, serv) {
    $scope.Employee = {
        EmpNo: 0,
        EmpName: '',
        Salary: 0,
        DeptName: '',
        Designation: ''
    };

    $scope.Employees = [];
    $scope.Message = '';

    load();
    function load() {
        var promise = serv.getData();
        promise.then(function (resp) {
            $scope.Employees = resp.data;
            $scope.Message = 'Call is successful...';

        }, function (err) {
            $scope.Message = 'Call failed...' + err.status;
        });
    };

    $scope.clear = function () {
        $scope.Employee.EmpNo = 0;
        $scope.Employee.EmpName = '';
        $scope.Employee.Salary = 0;
        $scope.Employee.DeptName = '';
        $scope.Employee.Designation = '';
    };

    $scope.save = function () {
        var promise = crudserv.post($scope.Employee);
        promise.then(function (resp) {
            $scope.Employee.EmpNo = resp.data.EmpNo;
            $scope.Message = 'Call Completed Succesfully';
            loadData();
        }, function (err) {
            $scope.Message = 'Call Fail ' + err.status;
        });
    };
});