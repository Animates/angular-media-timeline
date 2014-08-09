'use strict';

var module = angular.module('demo', ['animates.angular-timeline'])
  .controller('DemoTimelineGroupCtrl', function ($scope) {
    $scope.tick = 200;
    $scope.disable = false;

    $scope.timelines =
        [
          {
            name : 'timeline1-name',
            data : { id : 'timeline1' },
            lines : [
              {
                events :
                [
                  {
                    name : 'animation1',
                    data : { id : 'animation1-guid' },
                    start : 10,
                    duration : 190,
                    'class' : 'fade-out',
                  },
                  {
                    name : 'animation2',
                    data : { id : 'animation2-guid' },
                    start : 210,
                    duration : 200,
                    'class' : 'fade-in',
                  }
                ]
              }, {
                name : 'multiAnimation1',
                data : { id : 'multiAnimation1-guid' },
                points :
                [
                  {
                    tick : 10,
                    data : { id : 'guid1' },
                  },
                  {
                    tick : 210,
                    data : { id : 'guid2' },
                  }
                ]
              }, {
                name : 'multiAnimation2',
                points :
                [
                  {
                    tick : 24,
                    data : { id : 'guid7' },
                  },
                  {
                    tick : 104,
                    data : { id : 'guid5' },
                  },
                  {
                    tick : 250,
                    data : { id : 'guid6' },
                  }
                ]
              }
            ]
          }, {
            name : 'timeline2-name',
            data : { id : 'timeline2-guid' },
            lines : [
                {
                  events :
                  [
                    {
                      name : 'animation3',
                      data : { id : 'animation3-guid' },
                      start : 100,
                      duration : 100
                    },
                    {
                      name : 'animation4',
                      data : { id : 'animation4-guid' },
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
              name : 'timeline4-name',
              data : { id : 'timeline4-guid' },
              lines : [
                {
                  events :
                  [
                    {
                      name : 'animation6',
                      data : { id : 'animation6-guid' },
                      start : 150,
                      duration : 100
                    },
                    {
                      name : 'animation7',
                      data : { id : 'animation7-guid' },
                      start : 500,
                      duration : 4500
                    }
                  ]
                }
              ]
            }
        ];

      $scope.onTickChange = function (tick) {
        console.log(tick);
      };

      $scope.onPointMove = function (timelineData, eventData, pointData, newTick) {
        console.log('onPointMove');
        console.log(timelineData);
        console.log(eventData);
        console.log(pointData);
        console.log(newTick);
        console.log('------');
      };

      $scope.onPointClick = function (timelineData, eventData, pointData) {
        console.log('onPointClick');
        console.log(timelineData);
        console.log(eventData);
        console.log(pointData);
        console.log('------');
      };

      $scope.onMultiplePointEventSelected = function (timelineData, eventData) {
        console.log('onMultiplePointEventSelected');
        console.log(timelineData);
        console.log(eventData);
        console.log('------');
      };

      $scope.onEventStartChange = function (timelineData, eventData, newStartTick) {
        console.log('onEventStartChange');
        console.log(timelineData);
        console.log(eventData);
        console.log(newStartTick);
        console.log('------');
      };

      $scope.onEventDurationChange = function (timelineData, eventData, newDuration) {
        console.log('onEventDurationChange');
        console.log(timelineData);
        console.log(eventData);
        console.log(newDuration);
        console.log('------');
      };

      $scope.onEventClick = function (timelineData, eventData){
        console.log('onEventClick');
        console.log(timelineData);
        console.log(eventData);
        console.log('------');
      };

      $scope.changeTick = function (){
        $scope.tick = 100;
      };
    });
