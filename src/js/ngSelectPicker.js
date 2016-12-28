/*!
 * ngSelectPicker v1.0.2
 * Copyright 2016 Eric Ferreira
 * Contato: ericferreira1992@gmail.com
 */

(function() {
    'use strict';

    angular.module('ngSelectPicker', [], function(){});
    angular.module('ngSelectPicker').directive('selectpicker', function ($location, $timeout, $compile) {
        return {
            restrict: 'EA',

            template: '' +
                    '<div class="selectpicker">'+
                        '<div class="selectpicker-input" ng-click="toggleCombo()">'+
                            '<div ng-if="todosChecked">Todos</div>'+
                            '<div ng-if="!todosChecked">{{checados|joinSelectPicker}}</div>'+
                            '<div><i class="fa fa-caret-down"></i></div>'+
                        '</div>'+
                        '<div class="selectpicker-combo" ng-class="{\'selectpicker-combo-in\': showCombo == 1, \'selectpicker-combo-out\': showCombo == 0}">'+
                            '<div class="selectpicker-combo-search" ng-style="!filtro && {\'display\': \'none\'}">'+
                                '<input type="text" class="form-control" ng-model="filtroInput" />'+
                            '</div>'+
                            '<div class="selectpicker-combo-itens">'+
                                '<div class="selectpicker-combo-item" ng-click="toggleTodos()">'+
                                    '<div><strong>{{todosNome}}</strong></div>'+
                                    '<div><i class="fa" ng-class="{\'fa-check\': todosChecked}"></i></div>'+
                                '</div>'+
                                '<div ng-transclude></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',

            transclude: true,
            require: '^ngModel',
            scope: {
                ngModel:'='
            },
            link: function(scope, element, attrs){
                /* --- LISTNERS --- */
                angular.element(document).bind('click', function(event){
                    //Verifica se clicou num elemento dentro do combo
                    if (element.find(event.target).length > 0) {
                        scope.$apply(function(){
                            scope.clicouDentro = true;
                        });
                    }
                    else{
                        scope.$apply(function(){
                            scope.clicouDentro = false;
                            scope.showCombo = 0;
                        });
                    }
                });
                angular.element(document).bind('keypress', function(event){
                    if(scope.clicouDentro && scope.showCombo == 1){
                        element.find('input').focus();
                    }
                });
                angular.element(document).bind('keyup', function(event){
                    if(scope.clicouDentro){
                        if(event.keyCode == 27 && scope.showCombo == 1)
                            scope.$apply(function(){
                                scope.showCombo = 0;
                            });
                        else if(event.keyCode == 46 && scope.showCombo != 1)
                            scope.$apply(function(){
                                scope.checados = [];
                                scope.todosChecked = false;
                            });
                        if(event.keyCode == 8)
                            element.find('input').focus();
                    }
                });

                scope.inicializa = function(){
                    scope.checados = [];
                    scope.itens = [];
                    scope.filtroInput = '';
                    scope.todosChecked = false;
                    scope.showCombo = -1;
                    scope.clicouDentro = true;

                    $timeout(function(){
                        var optionsDiv = element[0].children[0].children[1].children[1].children[1];
                        var optionsArray = optionsDiv.children;

                        angular.forEach(optionsArray, function(opt){
                            var el = angular.element(opt)[0];
                            scope.itens.push({
                                valor: el.getAttribute('value'),
                                texto: el.innerHTML
                            });
                        });

                        angular.element(optionsDiv)[0].remove();

                        optionsDiv = element[0].children[0].children[1].children[1];
                        var repeatElement = angular.element(
                            '<div ng-repeat="i in itens | filter: filtroInput" class="selectpicker-combo-item" ng-class="{\'disabled\': todosChecked}" ng-click="toggleCheck(i)">'+
                                '<div>{{i.texto}}</div>'+
                                '<div><i class="fa" ng-class="{\'fa-check\': todosChecked || verificaSeCheckado(i.valor)}"></i></div>'+
                            '</div>'
                        );
                        angular.element(optionsDiv).append(repeatElement);
                        $compile(repeatElement)(scope);
                    }, 1);

                    if(attrs.filtro == undefined || attrs.filtro == 'true')
                        scope.filtro = true;
                    else
                        scope.filtro = false;

                    if(attrs.todosNome != undefined && attrs.todosNome != '')
                        scope.todosNome = attrs.todosNome;
                    else
                        scope.todosNome = 'Todos';

                    scope.$watch('ngModel',function(v){
                        scope.checados = (v != undefined) ? v : [];
                    },true);
                };

                scope.toggleCombo = function(){
                    scope.showCombo = scope.showCombo <= 0 ? 1 : 0;
                };

                scope.verificaSeCheckado = function(valor){
                    for(var i = 0; i < scope.checados.length; i++){
                        if(scope.checados[i].valor == valor)
                            return true;
                    }
                    return false;
                };

                scope.toggleCheck = function(item){
                    if(!scope.todosChecked){
                        if(scope.verificaSeCheckado(item.valor)){
                            var newItens = [];
                            scope.checados.forEach(function(i){
                                if(i.valor != item.valor)
                                    newItens.push(i);
                            });

                            scope.checados = newItens;
                        }
                        else
                            scope.checados.push(item);
                    }
                };

                scope.toggleTodos = function(){
                    scope.todosChecked = !scope.todosChecked;

                    if(scope.todosChecked)
                        scope.checados = scope.itens;
                    else
                        scope.checados = [];
                };

                scope.inicializa();
            }
        }
    })
    .filter('joinSelectPicker', function () {
        return function (input)
        {
            if(input != undefined && input != null)
            {
                var listaJoined = '';
                for(var i = 0; i < input.length; i++){
                    listaJoined += (listaJoined == '' ? '' : ', ') + input[i].texto;
                };

                return listaJoined;
            }
            return '';
        }
    });
})();