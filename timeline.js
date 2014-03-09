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
	.directive('animatesTimelinesGroup', function () {
		return {
			restrict: 'E',
			templateUrl : '/templates/timelines.html',
			scope: {
		      data: '='
		    },
		    controller: function($scope) {
			}
		};
	});