'use strict';

var module = angular.module('demo', ['animates.angular-timeline'])
  .controller('DemoTimelineGroupCtrl',  function ($scope) {
    $scope.tick = 200;
    $scope.timelines = 
        [
          {
            guid : 'timeline1',
            name : 'timeline1-name',
            events : 
              [
                { 
                  name : 'animation1',
                  start : 10,
                  duration : 190,
                  'class' : 'fade-out',
                },
                { 
                  name : 'animation2',
                  start : 210,
                  duration : 200,
                  'class' : 'fade-in',
                }
              ]
          },
          {
            guid : 'timeline2',
            name : 'timeline2-name',
            events : 
              [
                { 
                  name : 'animation3',
                  start : 100,
                  duration : 100
                },
                { 
                  name : 'animation4',
                  start : 500,
                  duration : 450
                }
              ]
          },
          {
            guid : 'timeline3',
            name : 'timeline3-name',
            events : 
              [
                { 
                  name : 'animation4',
                  start : 150,
                  duration : 100
                },
                { 
                  name : 'animation5',
                  start : 500,
                  duration : 4500
                }
              ]
          },
          {
            guid : 'timeline4',
            name : 'timeline4-name',
            events : 
              [
                { 
                  name : 'animation6',
                  start : 150,
                  duration : 100
                },
                { 
                  name : 'animation7',
                  start : 500,
                  duration : 4500
                }
              ]
          }
        ];
    
      $scope.onTickChange = function (newVal, oldVal) {
        alert(newVal);
      };

      $scope.changeTick = function (){
        $scope.tick = 100;
      };
    });