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
	.directive('animatesTimelinepoint', function () {
		return {
			restrict: 'E',
			template:	"",
			scope: {
				point: '=',
				eventData: '=',
				pointMove: "&",
				pointClick: "&",
				multiplepointeventSelected: "&"
			},
			link: function ($scope, element, attrs) {
				element.css({
					left: $scope.point.tick + 'px'
				});

				element.on('click', function () {
						$scope.eventClick({
							eventData : $scope.eventData,
							pointData : $scope.point.data
						});

						$scope.multiplepointeventSelected({
							eventData : $scope.eventData
						});
					});
			}
		};
	})
	.directive('animatesTimelineevent', function ($document) {
		return {
			restrict: 'E',
			template:	"",
			scope: {
				evt: '=',
				eventStartchange: "&",
				eventDurationchange: "&",
				eventClick: "&"
			},
			link: function ($scope, element, attrs) {
				var evt = $scope.evt,
					x, originalDuration;

				element.css({
					left: evt.start + 'px',
					width: evt.duration + 'px'
				});

				element.addClass(evt.class);

				element.on('click', function () {
					$scope.eventClick({
						eventData : $scope.evt.data
					});
				});

				element.on('mouseover', function(event) {
					var y = event.pageX - evt.start;

					if (y <= 10) {
						element.css({
							'cursor': 'ew-resize'
						});
					} else if ((evt.duration - y) <= 10) {
						element.css({
							'cursor': 'ew-resize'
						});
					} else {
						element.css({
							'cursor': 'move'
						});
					}
				});

				element.on('mousedown', function(event) {
					// Prevent default dragging of selected content
					event.preventDefault();
					x = event.pageX - evt.start;
					originalDuration = evt.duration;

					element.css({
						'z-index': 1000
					});

					if (x <= 10) {
						$document.on('mousemove', elementExpandFront);
						$document.on('mouseup', elementExpandFrontEnd);
					} else if ((evt.duration - x) <= 10) {
						$document.on('mousemove', elementExpandBack);
						$document.on('mouseup', elementExpandBackEnd);
					} else {
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
				}

				function elementMoveEnd() {
					$document.unbind('mousemove', elementMove);
					$document.unbind('mouseup', elementMoveEnd);

					$scope.eventStartchange({
						eventData : $scope.evt.data,
						newStartTick : evt.start
					});
				}

				function elementExpandFront(event) {
					var newStart = event.pageX - x,
							newDuration = (newStart - evt.start) + originalDuration;

					if (newStart > 0 && newDuration > 0) {
						evt.duration = newDuration;
						evt.start = newStart;
						element.css({
							left: newStart + 'px',
							width: evt.duration + 'px'
						});
					}
				}

				function elementExpandFrontEnd() {
					$document.unbind('mousemove', elementExpandFront);
					$document.unbind('mouseup', elementExpandFrontEnd);

					$scope.eventStartchange({
						eventData : $scope.evt.data,
						newStartTick : evt.start
					});

					$scope.eventDurationchange({
						eventData : $scope.evt.data,
						newDuration : evt.duration
					});
				}

				function elementExpandBack(event) {
					var newStart = event.pageX - x,
						newDuration = (newStart - evt.start) + originalDuration;

					if (newDuration > 0) {
						evt.duration = newDuration;
						element.css({
							width: evt.duration + 'px'
						});
					}
				}

				function elementExpandBackEnd() {
					$document.unbind('mousemove', elementExpandBack);
					$document.unbind('mouseup', elementExpandBackEnd);

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
			template:	"<div class='timeline-content'>" +
									"<animates-timelinepoint class='timeline-point' ng-repeat='point in line.points' point='point' event-data='line.data' " +
										"point-move='internalPointMove(pointData, newTick)' " +
										"point-click='internalPointClick(pointData)' " +
										"multiplepointevent-selected='internalMultiplePointEventSelected(eventData)' " +
										"> </animates-timelinepoint>" +

									"<animates-timelineevent class='timeline-event' ng-repeat='event in line.events' evt='event' " +
										"event-startchange='internalEventStartChange(eventData, newStartTick)' " +
										"event-durationchange='internalEventDurationChange(eventData, newDuration)' " +
										"event-click='internalEventClick(eventData)' " +
										"> </animates-timelineevent>" +
								"</div>",
			scope: {
				line: '=data',
				timelineData: '=',
				eventStartchange: "&",
				eventDurationchange: "&",
				eventClick: "&",
				pointMove: "&",
				pointClick: "&",
				multiplepointeventSelected: "&"
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

				$scope.internalPointMove = function (pointData, newTick) {
					if ($scope.pointMove) {
						$scope.pointMove({
							timelineData : $scope.timelineData,
							pointData : pointData,
							newTick : newTick
						});
					}
				};

				$scope.internalPointClick = function (pointData) {
					if ($scope.pointClick) {
						$scope.pointClick({
							timelineData : $scope.timelineData,
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
			}
		};
	})
	.directive('animatesTimelines', function () {
		return {
			restrict: 'E',
			template: "<input type='number' ng-change='internalTickChange()' ng-model='tick'></input>" +
						"<span>{{tick}}</span>" +
						"<div class='timelines-group' >" +
							"<div class='timelinesHeaders'>" +
								"<div ng-repeat='timeline in data' class='timeline-part timeline-header' data='timeline.data'>" +
									"<span class='timeline-header-track'>{{timeline.name}}</span>" +
								"</div>" +
							"</div>" +
							"<div class='timelinesContainer'>" +
								"<div ng-repeat='timeline in data' class='timeline-part timeline' data='timeline.data'>" +
									"<animates-timeline ng-repeat='line in timeline.lines' data='line' timeline-data='timeline.data' " +
										"point-move='internalPointMove(timelineData, pointData, newTick)' " +
										"point-click='internalPointClick(timelineData, pointData)' " +
										"multiplepointevent-selected='internalMultiplePointEventSelected(timelineData, eventData)' " +
										"event-startchange='internalEventStartChange(timelineData, eventData, newStartTick)' " +
										"event-durationchange='internalEventDurationChange(timelineData, eventData, newDuration)' " +
										"event-click='internalEventClick(timelineData, eventData)' " +
									"> </animates-timeline>" +
								"</div>" +
							"</div>" +
						"</div>",
			scope: {
				data: '=',
				tick: '=',
				tickChange: "&",
				eventStartchange: "&",
				eventDurationchange: "&",
				eventClick: "&",
				pointMove: "&",
				pointClick: "&",
				multiplepointeventSelected: "&"
			},
			controller : function ($scope) {
				$scope.internalTickChange = function () {
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

				$scope.internalPointMove = function (timelineData, pointData, newTick) {
					if ($scope.pointMove) {
						$scope.pointMove({
							timelineData : timelineData,
							pointData : pointData,
							newTick : newTick
						});
					}
				};

				$scope.internalPointClick = function (timelineData, pointData) {
					if ($scope.pointClick) {
						$scope.pointClick({
							timelineData : timelineData,
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
			}
		};
	});
