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

angular.module('animates.angular-timeline' , [])
	.directive('animatesTimelines', function () {
		return {
			restrict: 'E',
			template : "<input type='number' ng-model='currentTick'></input>" +	
						"<span>{{currentTick}}</input>" +	
						"<div class='timelines-group' >" +
							"<div class='timelinesHeaders'>" +
								"<div ng-repeat='timeline in data' class='timeline-part timeline-header' id='{{timeline.guid}}'>" +
									"<span class='timeline-header-track'>{{timeline.name}}</span>" +
								"</div>" +
							"</div>" +
							"<div class='timelinesContainer'>" +
								"<div ng-repeat='timeline in data' class='timeline-part timeline' id='{{timeline.guid}}'>" +
									"<div class='timeline-content'>" +
										"<div class='timeline-event {{event.class}}' ng-repeat='event in timeline.events' ng-click='alert();' style='left:{{event.start}}px;width:{{event.duration}}px;'></div>" +
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>",
			scope: {
				data: '='
			},
			controller: function($scope) {
				$scope.currentTick = 0;
				$scope.$watch('currentTick', function (newVal, oldVal) {
					$scope.$emit('currentTickChanged', newVal);
				});
			}
		};
	});