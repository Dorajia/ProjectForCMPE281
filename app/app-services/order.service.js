﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', Service);

    function Service($http, $q, $window) {
        //$http.defaults.headers.common.Authorization = $window.jwtToken;

        var service = {};
        var apiServer = 'https://ec2-52-11-87-42.us-west-2.compute.amazonaws.com';
        //var apiServer = 'https://team6lbt-1160515858.us-west-2.elb.amazonaws.com';

        service.GetAll = GetAll;
        service.ConfirmOrder = ConfirmOrder;
        service.SubmitComment = SubmitComment;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            //return $http.get('/api/orders').then(handleSuccess, handleError);
            return $http.get(apiServer + '/order/getorders')
                .then(handleSuccess, handleError);
        }

        function ConfirmOrder(order_id) {
            //$http.defaults.headers.common.Authorization = $window.jwtToken;
            return $http.post(apiServer + '/order/confirm/' + order_id)
                .then(handleSuccess, handleError);

        }

        function SubmitComment(order_id, dish_id, comment) {
            //$http.defaults.headers.common.Authorization = $window.jwtToken;
            return $http.post(apiServer + '/comment/addcomments/'
                + order_id + '/' + dish_id + '/5/' + comment)
                .then(handleSuccess, handleError);

        }

        function GetById(_id) {
            return $http.get('/api/orders/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/orders/' + username).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/orders', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/orders/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/orders/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
