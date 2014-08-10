/**
@toc

@param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
TODO

@param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
TODO

@dependencies
TODO

@usage
partial / html:
TODO

controller / js:
TODO

//end: usage
*/

'use strict';

angular.module('animates.angular-timeline', [])
	.directive('animatesTimelinepoint', function ($document) {
		return {
			restrict: 'E',
			template:	'',
			scope: {
				timelineTick: '=',
				point: '=',
				eventData: '=',
				isDisable: '=',
				pointMove: '&',
				pointClick: '&',
				multiplepointeventSelected: '&'
			},
			link:
			{
				pre: function ($scope, element) {
					element.css({
						left: $scope.point.tick + 'px'
					});
				},
				post: function ($scope, element) {
					var point = $scope.point,
						x, originalZIndex;

					element.on('click', function () {
							if (!$scope.isDisable) {
								$scope.pointClick({
									eventData : $scope.eventData,
									pointData : point.data
								});

								$scope.multiplepointeventSelected({
									eventData : $scope.eventData
								});
							}
						});

					element.on('mousedown', function(event) {
						if (!$scope.isDisable) {
							// Prevent default dragging of selected content
							event.preventDefault();

							x = event.pageX - point.tick;
							originalZIndex = element.css('z-index');

							element.css({
								'z-index': 1000
							});

							$document.on('mousemove', elementMove);
							$document.on('mouseup', elementMoveEnd);
						}
					});

					function elementMove(event) {
						var newTick = event.pageX - x;
						if (newTick > 0) {
							point.tick = newTick;
							element.css({
								left: newTick + 'px'
							});
						}
						$scope.$apply();
					}

					function elementMoveEnd() {
						$document.unbind('mousemove', elementMove);
						$document.unbind('mouseup', elementMoveEnd);

						element.css({
							'z-index': originalZIndex
						});

						$scope.pointMove({
							eventData : $scope.eventData,
							pointData : point.data,
							newTick : point.tick
						});
					}
				}
			}
		};
	})
	.directive('animatesTimelineevent', function ($document) {
		return {
			restrict: 'E',
			template:	'<span class="left" ng-class="{cursor: !isDisable, highlight: evt.start === timelineTick}"></span><span class="center" ng-class="{cursor: !isDisable}"></span><span class="right" ng-class="{cursor: !isDisable, highlight: (evt.start + evt.duration) === timelineTick}"></span>',
			scope: {
				evt: '=',
				isDisable: '=',
				eventStartchange: '&',
				eventDurationchange: '&',
				timelineTick: '=',
				eventClick: '&'
			},
			link: function ($scope, element) {
				var evt = $scope.evt,
					x, originalDuration, originalZIndex, originalEndPosition,
					leftElement = angular.element(element[0].querySelector('.left')),
					centerElement = angular.element(element[0].querySelector('.center')),
					rightElement = angular.element(element[0].querySelector('.right')),
					border = 30;

				element.css({
					left: evt.start + 'px',
					width: evt.duration + 'px'
				});

				centerElement.css({
					width: (evt.duration - border) + 'px'
				});

				element.addClass(evt.class);

				element.on('click', function () {
					if (!$scope.isDisable) {
						$scope.eventClick({
							eventData : evt.data
						});
					}
				});

				leftElement.on('mousedown', function(event) {
					if (!$scope.isDisable) {
						// Prevent default dragging of selected content
						event.preventDefault();
						x = event.pageX - evt.start;
						originalDuration = evt.duration;
						originalZIndex = element.css('z-index');
						originalEndPosition = evt.start + evt.duration;

						element.css({
							'z-index': 1000
						});

						$document.on('mousemove', elementExpandFront);
						$document.on('mouseup', elementExpandFrontEnd);
					}
				});

				rightElement.on('mousedown', function(event) {
					if (!$scope.isDisable) {
						// Prevent default dragging of selected content
						event.preventDefault();
						x = event.pageX - evt.start;
						originalDuration = evt.duration;
						originalZIndex = element.css('z-index');

						element.css({
							'z-index': 1000
						});

						$document.on('mousemove', elementExpandBack);
						$document.on('mouseup', elementExpandBackEnd);
					}
				});

				centerElement.on('mousedown', function(event) {
					if (!$scope.isDisable) {
						// Prevent default dragging of selected content
						event.preventDefault();
						x = event.pageX - evt.start;
						originalDuration = evt.duration;
						originalZIndex = element.css('z-index');

						element.css({
							'z-index': 1000
						});

						$document.on('mousemove', elementMove);
						$document.on('mouseup', elementMoveEnd);
					}
				});

				function elementMove(event) {
					var newStart = event.pageX - x;
					if (newStart > 0) {
						evt.start = newStart;
						element.css({
							left: newStart + 'px'
						});
					}
					$scope.$apply();
				}

				function elementMoveEnd() {
					$document.unbind('mousemove', elementMove);
					$document.unbind('mouseup', elementMoveEnd);

					element.css({
						'z-index': originalZIndex
					});

					$scope.eventStartchange({
						eventData : evt.data,
						newStartTick : evt.start
					});
				}

				function elementExpandFront(event) {
					var newStart = event.pageX - x,
							newDuration = originalEndPosition - newStart;

					if (newStart > 0 && newDuration > 0) {
						evt.duration = newDuration;
						evt.start = newStart;
						element.css({
							left: newStart + 'px',
							width: newDuration + 'px'
						});

						centerElement.css({
							width: (newDuration - border) + 'px'
						});
					}
					$scope.$apply();
				}

				function elementExpandFrontEnd() {
					$document.unbind('mousemove', elementExpandFront);
					$document.unbind('mouseup', elementExpandFrontEnd);

					element.css({
						'z-index': originalZIndex
					});

					$scope.eventStartchange({
						eventData : evt.data,
						newStartTick : evt.start
					});

					$scope.eventDurationchange({
						eventData : evt.data,
						newDuration : evt.duration
					});
				}

				function elementExpandBack(event) {
					var newStart = event.pageX - x,
						newDuration = (newStart - evt.start) + originalDuration;

					if (newDuration > 0) {
						evt.duration = newDuration;
						element.css({
							width: newDuration + 'px'
						});

						centerElement.css({
							width: (newDuration - border) + 'px'
						});
					}
					$scope.$apply();
				}

				function elementExpandBackEnd() {
					$document.unbind('mousemove', elementExpandBack);
					$document.unbind('mouseup', elementExpandBackEnd);

					element.css({
						'z-index': originalZIndex
					});

					$scope.eventDurationchange({
						eventData : $scope.evt.data,
						newDuration : evt.duration
					});
				}
			}
		};
	})
	.directive('animatesTimeline', function () {
		return {
			restrict: 'E',
			template:	'<div class="timeline-content">' +
									'<animates-timelinepoint class="timeline-point" ng-repeat="point in line.points" point="point" event-data="$parent.line.data" is-disable="isDisable" ng-class="{cursor: !isDisable, highlight: timelineTick === point.tick}" timeline-tick="timelineTick"' +
										'point-move="internalPointMove(eventData, pointData, newTick)" ' +
										'point-click="internalPointClick(eventData, pointData)" ' +
										'multiplepointevent-selected="internalMultiplePointEventSelected(eventData)">' +
									'</animates-timelinepoint>' +

									'<animates-timelineevent class="timeline-event" ng-repeat="event in line.events" evt="event" timeline-tick="timelineTick" is-disable="isDisable" ng-class="{highlight : (timelineTick >= event.start) && (timelineTick <= (event.start + event.duration))}"' +
										'event-startchange="internalEventStartChange(eventData, newStartTick)" ' +
										'event-durationchange="internalEventDurationChange(eventData, newDuration)" ' +
										'event-click="internalEventClick(eventData)">' +
									' </animates-timelineevent>' +
								'</div>',
			scope: {
				line: '=data',
				timelineData: '=',
				isDisable: '=',
				eventStartchange: '&',
				eventDurationchange: '&',
				eventClick: '&',
				pointMove: '&',
				pointClick: '&',
				multiplepointeventSelected: '&',
				maxTick: '=',
				timelineTick: '='
			},
			controller : function ($scope) {
				$scope.internalEventStartChange = function (eventData, newStartTick) {
					if ($scope.eventStartchange) {
						$scope.eventStartchange({
							timelineData : $scope.timelineData,
							eventData : eventData,
							newStartTick : newStartTick
						});
					}
				};

				$scope.internalEventDurationChange = function (eventData, newDuration) {
					if ($scope.eventDurationchange) {
						$scope.eventDurationchange({
							timelineData : $scope.timelineData,
							eventData : eventData,
							newDuration : newDuration
						});
					}
				};

				$scope.internalEventClick = function (eventData) {
					if ($scope.eventClick) {
						$scope.eventClick({
							timelineData : $scope.timelineData,
							eventData : eventData
						});
					}
				};

				$scope.internalPointMove = function (eventData, pointData, newTick) {
					if ($scope.pointMove) {
						$scope.pointMove({
							timelineData : $scope.timelineData,
							eventData : eventData,
							pointData : pointData,
							newTick : newTick
						});
					}
				};

				$scope.internalPointClick = function (eventData, pointData) {
					if ($scope.pointClick) {
						$scope.pointClick({
							timelineData : $scope.timelineData,
							eventData : eventData,
							pointData : pointData
						});
					}
				};

				$scope.internalMultiplePointEventSelected = function (eventData) {
					if ($scope.multiplepointeventSelected) {
						$scope.multiplepointeventSelected({
							timelineData : $scope.timelineData,
							eventData : eventData
						});
					}
				};
			},
			link: function ($scope, element) {
				if ($scope.line.points) {
					element.addClass('points');
				}

				if ($scope.line.events) {
					element.addClass('events');
				}
			}
		};
	})
	.directive('animatesTimelines', function ($timeout, $document) {
		return {
			restrict: 'E',
			template:
						'<div class="timelines-tick-navigator">' +
							'<div class="tickHandlerHeader" ></div>' +
							'<div class="tickHandlerScrollerContainer" >' +
								'<div class="tickHandlerContainer" style="width:{{maxTick}}px;">' +
									'<div class="tickHandler" style="left:{{tick-5}}px;" ng-class="{cursor: !isDisable}"></div>' +
								'</div>' +
							'</div>' +
						'</div>' +

						'<div class="timelines-group">' +
							'<div class="timelinesHeaders">' +
								'<div ng-repeat="timeline in data" class="timeline-part timeline-header" data="timeline.data" rel="{{$index}}">' +
									'<span class="timeline-header-track" title="timeline.name" >{{timeline.name}}</span>' +
								'</div>' +
							'</div>' +

							'<div class="timelinesContainer">' +
								'<div class="verticalLine" style="left:{{tick}}px"></div>' +
								'<div ng-repeat="timeline in data" class="timeline-part timeline" data="timeline.data">' +
									'<div class="elementLinesContainer" rel="{{$index}}" style="width:{{maxTick}}px;">' +

										'<animates-timeline ng-repeat="line in timeline.lines" data="line" timeline-data="timeline.data" timeline-tick="tick" max-tick="maxTick" is-disable="isDisable"' +
											'point-move="internalPointMove(timelineData, eventData, pointData, newTick)" ' +
											'point-click="internalPointClick(timelineData, eventData, pointData)" ' +
											'multiplepointevent-selected="internalMultiplePointEventSelected(timelineData, eventData)" ' +
											'event-startchange="internalEventStartChange(timelineData, eventData, newStartTick)" ' +
											'event-durationchange="internalEventDurationChange(timelineData, eventData, newDuration)" ' +
											'event-click="internalEventClick(timelineData, eventData)">' +
										'</animates-timeline>' +

									'</div>' +
								'</div>' +
							'</div>' +
						'</div>',
			scope: {
				data: '=',
				externalTick: '=tick',
				isDisable: '=',
				tickChange: '&',
				eventStartchange: '&',
				eventDurationchange: '&',
				eventClick: '&',
				pointMove: '&',
				pointClick: '&',
				multiplepointeventSelected: '&'
			},
			controller : function ($scope, $element) {
				$scope.tick = $scope.externalTick;
				$scope.maxTick = 5000;

				$scope.$watch('externalTick', function() {

					$scope.tick = $scope.externalTick;

					if ($scope.tickChange) {
						$scope.tickChange( { tick: $scope.tick });
					}
				});

				$scope.$watchCollection('data', function() {
					$scope.updateHeaders();
				});

				$scope.updateHeaders = function () {
					$timeout(function () {
						angular.forEach($element[0].querySelectorAll('.elementLinesContainer'), function(timeline) {
							var index = angular.element(timeline).attr('rel'),
								height = angular.element(timeline)[0].offsetHeight;

							$element[0].querySelector('.timeline-header[rel="' + index + '"]').style.height = height - 1 + 'px';
						});
					});
				};

				$scope.internalTickChange = function () {
					$scope.$apply(function (){ $scope.externalTick = $scope.tick;});

					if ($scope.tickChange) {
						$scope.tickChange( { tick: $scope.tick });
					}
				};

				$scope.internalEventStartChange = function (timelineData, eventData, newStartTick) {
					if ($scope.eventStartchange) {
						$scope.eventStartchange({
							timelineData : timelineData,
							eventData : eventData,
							newStartTick : newStartTick
						});
					}
				};

				$scope.internalEventDurationChange = function (timelineData, eventData, newDuration) {
					if ($scope.eventDurationchange) {
						$scope.eventDurationchange({
							timelineData : timelineData,
							eventData : eventData,
							newDuration : newDuration
						});
					}
				};

				$scope.internalEventClick = function (timelineData, eventData) {
					if ($scope.eventClick) {
						$scope.eventClick({
							timelineData : timelineData,
							eventData : eventData
						});
					}
				};

				$scope.internalPointMove = function (timelineData, eventData, pointData, newTick) {
					if ($scope.pointMove) {
						$scope.pointMove({
							timelineData : timelineData,
							eventData : eventData,
							pointData : pointData,
							newTick : newTick
						});
					}
				};

				$scope.internalPointClick = function (timelineData, eventData, pointData) {
					if ($scope.pointClick) {
						$scope.pointClick({
							timelineData : timelineData,
							eventData : eventData,
							pointData : pointData
						});
					}
				};

				$scope.internalMultiplePointEventSelected = function (timelineData, eventData) {
					if ($scope.multiplepointeventSelected) {
						$scope.multiplepointeventSelected({
							timelineData : timelineData,
							eventData : eventData
						});
					}
				};
			},
			link : {
				post : function ($scope, element) {

					$scope.updateHeaders();

					var x, originalTick,
						tickHandlerElement = angular.element(element[0].querySelector('.tickHandler')),
						timelineContainerElement = angular.element(element[0].querySelector('.timelinesContainer')),
						tickHandlerScrollerContainerElement = angular.element(element[0].querySelector('.tickHandlerScrollerContainer'));

					timelineContainerElement.on('scroll', function () {
						tickHandlerScrollerContainerElement[0].scrollLeft = timelineContainerElement[0].scrollLeft;
					});

					tickHandlerElement.on('mousedown', function(event) {
						if (!$scope.isDisable) {
							// Prevent default dragging of selected content
							event.preventDefault();

							x = event.pageX - $scope.tick;
							originalTick = $scope.tick;

							$document.on('mousemove', tickHandlerMove);
							$document.on('mouseup', tickHandlerMoveEnd);
						}
					});

					function tickHandlerMove(event) {
						var newTick = event.pageX - x;

						if (newTick > 0 && newTick <= $scope.maxTick) {
							$scope.$apply(function () {
								$scope.tick = newTick;
							});

							originalTick = newTick;
							$scope.internalTickChange();
						}
					}

					function tickHandlerMoveEnd() {
						$document.unbind('mousemove', tickHandlerMove);
						$document.unbind('mouseup', tickHandlerMoveEnd);

						if (originalTick !== $scope.tick) {
							$scope.internalTickChange();
						}
					}
				}
			}
		};
	});
