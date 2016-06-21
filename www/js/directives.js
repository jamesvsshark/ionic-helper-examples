(function() {
  var app = angular.module('starter.directives', []);

  app.directive('datePicker', function(ionicDatePicker, $filter) {
    return {
      restrict: 'E',
      scope: {
        placeholder: '@'
      },
      template: '<div style="width:100%">\
              <input type="text" class="readonly-input" ng-model="selectedDate" ng-click="openDatePicker()" \
              placeholder={{placeholder}} />\
            </div>',
      require: 'ngModel',
      replace: true,
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        var _modelValue; //store raw modelvalue for datepicker

        scope.openDatePicker = function() {
          ionicDatePicker.openDatePicker({
            callback: function(val) { //Mandatory
              scope.selectedDate = $filter('date')(val, 'fullDate');
            },
            from: new Date(), //Optional
            inputDate: _modelValue ? new Date(_modelValue) : new Date(), //default to today if no model value
            mondayFirst: false, //Optional
            closeOnSelect: true, //Optional
            templateType: 'popup' //Optional
          });
        }

        ngModel.$formatters.push(function(modelValue) {
          _modelValue = modelValue;
          return $filter('date')(modelValue, 'fullDate');
        });

        ngModel.$parsers.push(function(viewValue) {
          return $filter('date')(viewValue, 'fullDate');
        });

        scope.$watch('selectedDate', function() {
          ngModel.$setViewValue(scope.selectedDate);
        });

        ngModel.$render = function() {
          scope.selectedDate = ngModel.$viewValue;
        };
      }
    };

  })

  app.directive('timePicker', function(ionicTimePicker, $filter) {
    return {
      restrict: 'E',
      scope: {
        placeholder: '@',
        defaultTimePicker: '@'
      },
      template: '<div style="width:100%">\
              <input type="text" class="readonly-input" ng-model="selectedTime" ng-click="openTimePicker()" \
              placeholder="{{placeholder}}" />\
            </div>',
      require: 'ngModel',
      replace: true,
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        var _modelValue; //store raw modelvalue for timepicker

        scope.openTimePicker = function() {
          ionicTimePicker.openTimePicker({
            callback: function(val) { //Mandatory
              if (typeof(val) === 'undefined') {
                console.log('Time not selected');
              } else {
                var selectedTime = new Date(val * 1000);
                scope.selectedTime = $filter('date')(selectedTime, 'shortTime', 'UTC');
              }
            },
            inputTime: _modelValue ? ((_modelValue.getHours() * 60 * 60) + (_modelValue.getMinutes() * 60)) : Number(scope.defaultTimePicker) //Optional
          });
        }

        ngModel.$formatters.push(function(modelValue) {
          if (!modelValue)
            return '';

          return $filter('date')(modelValue, 'shortTime');
        });

        ngModel.$parsers.push(function(viewValue) {
          return viewValue;
        });

        scope.$watch('selectedTime', function() {
          ngModel.$setViewValue(scope.selectedTime);
        });

        ngModel.$render = function() {
          scope.selectedTime = ngModel.$viewValue;
        };
      }
    };

  })

})();
