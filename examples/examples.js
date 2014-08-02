'use strict';

var module = angular.module('demo', ['animates.angular-timeline'])
  .controller('DemoTimelineGroupCtrl',  function ($scope) {
    $scope.tick = 200;
    $scope.timelines =
        [
          {
            guid : 'timeline1',
            name : 'timeline1-name',
            lines : [
              {
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
              }, {
                name : 'multiAnimation1',
                points :
                [
                  {
                    tick : 10,
                    id : 'guid1',
                  },
                  {
                    tick : 210,
                    id : 'guid2',
                  }
                ]
              }, {
                name : 'multiAnimation2',
                points :
                [
                  {
                    tick : 24,
                    id : 'guid7',
                  },
                  {
                    tick : 104,
                    id : 'guid5',
                  },
                  {
                    tick : 250,
                    id : 'guid6',
                  }
                ]
              }
            ]
          }, {
            guid : 'timeline2',
            name : 'timeline2-name',
            lines : [
                {
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
                }, {
                  name : 'multiAnimation3',
                  points :
                  [
                    {
                      tick : 10,
                      id : 'guid3',
                    },
                    {
                      tick : 210,
                      id : 'guid4',
                    }
                  ]
                }
              ]
            }, {
              guid : 'timeline4',
              name : 'timeline4-name',
              lines : [
                {
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
