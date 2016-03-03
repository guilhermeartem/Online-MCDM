(function () {
  'use strict';

  describe('Decisions Route Tests', function () {
    // Initialize global variables
    var $scope,
      DecisionsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DecisionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DecisionsService = _DecisionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('decisions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/decisions');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          DecisionsController,
          mockDecision;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('decisions.view');
          $templateCache.put('modules/decisions/client/views/view-decision.client.view.html', '');

          // create mock Decision
          mockDecision = new DecisionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Decision Name'
          });

          //Initialize Controller
          DecisionsController = $controller('DecisionsController as vm', {
            $scope: $scope,
            decisionResolve: mockDecision
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:decisionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.decisionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            decisionId: 1
          })).toEqual('/decisions/1');
        }));

        it('should attach an Decision to the controller scope', function () {
          expect($scope.vm.decision._id).toBe(mockDecision._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/decisions/client/views/view-decision.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DecisionsController,
          mockDecision;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('decisions.create');
          $templateCache.put('modules/decisions/client/views/form-decision.client.view.html', '');

          // create mock Decision
          mockDecision = new DecisionsService();

          //Initialize Controller
          DecisionsController = $controller('DecisionsController as vm', {
            $scope: $scope,
            decisionResolve: mockDecision
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.decisionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/decisions/create');
        }));

        it('should attach an Decision to the controller scope', function () {
          expect($scope.vm.decision._id).toBe(mockDecision._id);
          expect($scope.vm.decision._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/decisions/client/views/form-decision.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DecisionsController,
          mockDecision;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('decisions.edit');
          $templateCache.put('modules/decisions/client/views/form-decision.client.view.html', '');

          // create mock Decision
          mockDecision = new DecisionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Decision Name'
          });

          //Initialize Controller
          DecisionsController = $controller('DecisionsController as vm', {
            $scope: $scope,
            decisionResolve: mockDecision
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:decisionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.decisionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            decisionId: 1
          })).toEqual('/decisions/1/edit');
        }));

        it('should attach an Decision to the controller scope', function () {
          expect($scope.vm.decision._id).toBe(mockDecision._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/decisions/client/views/form-decision.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
