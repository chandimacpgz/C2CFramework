(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('chequeController', chequeController);

    chequeController.$inject = ['$scope', '$state', '$element', 'BankService', 'ChequeService', 'endPoints', '$rootScope', '$mdDialog'];
    function chequeController($scope, $state, $element, BankService, ChequeService, endPoints, $rootScope, $mdDialog) {
        if ($rootScope.currentCheque != undefined) {
            $scope.loadImage = $rootScope.currentCheque.archievedChequeFrontPath;
        }

        function showAlert() {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Cheque Added Successfully')
                    .textContent('Crop points of cheque elements defined.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')
                    .targetEvent($state.go('home'))
            );
        };

        var dataURL = endPoints.webApi + "/ChequeImageData/ArchievedCheques/" + $scope.loadImage;
        $(document).ready(function () {
            $scope.showSignature = false;
            $scope.showDate = true;
            $scope.showMicr = true;
            $scope.showCourtesyamount = true;
            $scope.showPayee = true;
            $scope.showLegalamount = true;
            $scope.signaturecrop = {};
            $scope.courtesyamountcrop = {};
            $scope.legalamountcrop = {};
            $scope.datecrop = {};
            $scope.micrcrop = {};
            $scope.payeecrop = {};
            loadCanvas(dataURL);
            function loadCanvas(dataURL) {
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');
                var imageObj = new Image();
                imageObj.onload = function () {
                    canvas.width = imageObj.width;
                    canvas.height = imageObj.height;
                    context.drawImage(this, 0, 0);
                };
                imageObj.src = dataURL;
            }
        });

        var canvas = document.getElementById('canvas');
        if (canvas.width !== 0) {

        }

        $scope.signature = function () {
            var cropPoint = new Array(4);
            initDraw(document.getElementById('canvasDiv'));



            function initDraw(canvas) {
                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) { //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) { //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };
                var element = null;

                canvas.onmousemove = function (e) {
                    setMousePosition(e);
                    if (element !== null) {
                        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

                        cropPoint[0] = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        cropPoint[1] = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        cropPoint[2] = Math.abs(mouse.x - mouse.startX);
                        cropPoint[3] = Math.abs(mouse.y - mouse.startY);
                    }


                }

                canvas.onclick = function (e) {
                    if (element !== null) {

                        if (confirm("Press a button!") === true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
                            $scope.signaturecrop.cropType = "Signature";
                            $scope.signaturecrop.cropStartX = cropPoint[0];
                            $scope.signaturecrop.cropStartY = cropPoint[1];
                            $scope.signaturecrop.cropWidth = cropPoint[2];
                            $scope.signaturecrop.cropHeight = cropPoint[3];
                            $scope.signaturecrop.bankId = $rootScope.currentCheque.bankId;
                            $scope.signaturecrop.chequeId = $rootScope.currentCheque.id;

                            ChequeService.addSignature($scope.signaturecrop).then(function (state) {
                                $scope.showSignature = true;
                                $scope.showCourtesyamount = false;
                                $scope.result = state.data;
                            });

                        } else {
                            element.style = '';
                        }

                        element = null;
                        canvas.style.cursor = "default";
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }


                }
            }
        }

        $scope.signature = function () {
            var cropPoint = new Array(4);
            initDraw(document.getElementById('canvasDiv'));



            function initDraw(canvas) {
                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) { //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) { //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };
                var element = null;

                canvas.onmousemove = function (e) {
                    setMousePosition(e);
                    if (element !== null) {
                        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

                        cropPoint[0] = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        cropPoint[1] = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        cropPoint[2] = Math.abs(mouse.x - mouse.startX);
                        cropPoint[3] = Math.abs(mouse.y - mouse.startY);
                    }


                }

                canvas.onclick = function (e) {
                    if (element !== null) {

                        if (confirm("Press a button!") === true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
                            $scope.signaturecrop.cropType = "Signature";
                            $scope.signaturecrop.cropStartX = cropPoint[0];
                            $scope.signaturecrop.cropStartY = cropPoint[1];
                            $scope.signaturecrop.cropWidth = cropPoint[2];
                            $scope.signaturecrop.cropHeight = cropPoint[3];
                            $scope.signaturecrop.bankId = $rootScope.currentCheque.bankId;
                            $scope.signaturecrop.chequeId = $rootScope.currentCheque.id;

                            ChequeService.addCropPoint($scope.signaturecrop).then(function (state) {
                                $scope.showSignature = true;
                                $scope.showCourtesyamount = false;
                                $scope.result = state.data;
                            });

                        } else {
                            element.style = '';
                        }

                        element = null;
                        canvas.style.cursor = "default";
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }


                }
            }
        }

        $scope.courtesyamount = function () {
            var cropPoint = new Array(4);
            initDraw(document.getElementById('canvasDiv'));



            function initDraw(canvas) {
                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) { //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) { //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };
                var element = null;

                canvas.onmousemove = function (e) {
                    setMousePosition(e);
                    if (element !== null) {
                        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

                        cropPoint[0] = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        cropPoint[1] = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        cropPoint[2] = Math.abs(mouse.x - mouse.startX);
                        cropPoint[3] = Math.abs(mouse.y - mouse.startY);
                    }


                }

                canvas.onclick = function (e) {
                    if (element !== null) {

                        if (confirm("Press a button!") === true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
                            $scope.courtesyamountcrop.cropType = "NumericalAmount";
                            $scope.courtesyamountcrop.cropStartX = cropPoint[0];
                            $scope.courtesyamountcrop.cropStartY = cropPoint[1];
                            $scope.courtesyamountcrop.cropWidth = cropPoint[2];
                            $scope.courtesyamountcrop.cropHeight = cropPoint[3];
                            $scope.courtesyamountcrop.bankId = $rootScope.currentCheque.bankId;
                            $scope.courtesyamountcrop.chequeId = $rootScope.currentCheque.id;

                            ChequeService.addCropPoint($scope.courtesyamountcrop).then(function (state) {
                                $scope.showCourtesyamount = true;
                                $scope.showLegalamount = false;
                                $scope.result = state.data;
                            });

                        } else {
                            element.style = '';
                        }

                        element = null;
                        canvas.style.cursor = "default";
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }


                }
            }
        }

        $scope.legalamount = function () {
            var cropPoint = new Array(4);
            initDraw(document.getElementById('canvasDiv'));



            function initDraw(canvas) {
                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) { //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) { //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };
                var element = null;

                canvas.onmousemove = function (e) {
                    setMousePosition(e);
                    if (element !== null) {
                        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

                        cropPoint[0] = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        cropPoint[1] = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        cropPoint[2] = Math.abs(mouse.x - mouse.startX);
                        cropPoint[3] = Math.abs(mouse.y - mouse.startY);
                    }


                }

                canvas.onclick = function (e) {
                    if (element !== null) {

                        if (confirm("Press a button!") === true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
                            $scope.legalamountcrop.cropType = "Amount";
                            $scope.legalamountcrop.cropStartX = cropPoint[0];
                            $scope.legalamountcrop.cropStartY = cropPoint[1];
                            $scope.legalamountcrop.cropWidth = cropPoint[2];
                            $scope.legalamountcrop.cropHeight = cropPoint[3];
                            $scope.legalamountcrop.bankId = $rootScope.currentCheque.bankId;
                            $scope.legalamountcrop.chequeId = $rootScope.currentCheque.id;

                            ChequeService.addCropPoint($scope.legalamountcrop).then(function (state) {
                                $scope.showLegalamount = true;
                                $scope.showDate = false;
                                $scope.result = state.data;
                            });

                        } else {
                            element.style = '';
                        }

                        element = null;
                        canvas.style.cursor = "default";
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }


                }
            }
        }

        $scope.date = function () {
            var cropPoint = new Array(4);
            initDraw(document.getElementById('canvasDiv'));



            function initDraw(canvas) {
                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) { //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) { //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };
                var element = null;

                canvas.onmousemove = function (e) {
                    setMousePosition(e);
                    if (element !== null) {
                        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

                        cropPoint[0] = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        cropPoint[1] = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        cropPoint[2] = Math.abs(mouse.x - mouse.startX);
                        cropPoint[3] = Math.abs(mouse.y - mouse.startY);
                    }


                }

                canvas.onclick = function (e) {
                    if (element !== null) {

                        if (confirm("Press a button!") === true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
                            $scope.datecrop.cropType = "Date";
                            $scope.datecrop.cropStartX = cropPoint[0];
                            $scope.datecrop.cropStartY = cropPoint[1];
                            $scope.datecrop.cropWidth = cropPoint[2];
                            $scope.datecrop.cropHeight = cropPoint[3];
                            $scope.datecrop.bankId = $rootScope.currentCheque.bankId;
                            $scope.datecrop.chequeId = $rootScope.currentCheque.id;

                            ChequeService.addCropPoint($scope.datecrop).then(function (state) {
                                $scope.showDate = true;
                                $scope.showMicr = false;
                                $scope.result = state.data;
                            });

                        } else {
                            element.style = '';
                        }

                        element = null;
                        canvas.style.cursor = "default";
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }


                }
            }
        }

        $scope.micr = function () {
            var cropPoint = new Array(4);
            initDraw(document.getElementById('canvasDiv'));



            function initDraw(canvas) {
                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) { //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) { //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };
                var element = null;

                canvas.onmousemove = function (e) {
                    setMousePosition(e);
                    if (element !== null) {
                        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

                        cropPoint[0] = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        cropPoint[1] = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        cropPoint[2] = Math.abs(mouse.x - mouse.startX);
                        cropPoint[3] = Math.abs(mouse.y - mouse.startY);
                    }


                }

                canvas.onclick = function (e) {
                    if (element !== null) {

                        if (confirm("Press a button!") === true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
                            $scope.micrcrop.cropType = "MICR";
                            $scope.micrcrop.cropStartX = cropPoint[0];
                            $scope.micrcrop.cropStartY = cropPoint[1];
                            $scope.micrcrop.cropWidth = cropPoint[2];
                            $scope.micrcrop.cropHeight = cropPoint[3];
                            $scope.micrcrop.bankId = $rootScope.currentCheque.bankId;
                            $scope.micrcrop.chequeId = $rootScope.currentCheque.id;

                            ChequeService.addCropPoint($scope.micrcrop).then(function (state) {
                                $scope.showMicr = true;
                                $scope.showPayee = false;
                                $scope.result = state.data;
                            });

                        } else {
                            element.style = '';
                        }

                        element = null;
                        canvas.style.cursor = "default";
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }


                }
            }
        }

        $scope.payee = function () {
            var cropPoint = new Array(4);
            initDraw(document.getElementById('canvasDiv'));



            function initDraw(canvas) {
                function setMousePosition(e) {
                    var ev = e || window.event; //Moz || IE
                    if (ev.pageX) { //Moz
                        mouse.x = ev.pageX + window.pageXOffset;
                        mouse.y = ev.pageY + window.pageYOffset;
                    } else if (ev.clientX) { //IE
                        mouse.x = ev.clientX + document.body.scrollLeft;
                        mouse.y = ev.clientY + document.body.scrollTop;
                    }
                };

                var mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                };
                var element = null;

                canvas.onmousemove = function (e) {
                    setMousePosition(e);
                    if (element !== null) {
                        element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                        element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                        element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                        element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';

                        cropPoint[0] = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        cropPoint[1] = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        cropPoint[2] = Math.abs(mouse.x - mouse.startX);
                        cropPoint[3] = Math.abs(mouse.y - mouse.startY);
                    }


                }

                canvas.onclick = function (e) {
                    if (element !== null) {

                        if (confirm("Press a button!") === true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
                            $scope.payeecrop.cropType = "Payee";
                            $scope.payeecrop.cropStartX = cropPoint[0];
                            $scope.payeecrop.cropStartY = cropPoint[1];
                            $scope.payeecrop.cropWidth = cropPoint[2];
                            $scope.payeecrop.cropHeight = cropPoint[3];
                            $scope.payeecrop.bankId = $rootScope.currentCheque.bankId;
                            $scope.payeecrop.chequeId = $rootScope.currentCheque.id;

                            ChequeService.addCropPoint($scope.payeecrop).then(function (state) {
                                $scope.showPayee = true;
                                $scope.result = state.data;
                                showAlert();
                            });

                        } else {
                            element.style = '';
                        }

                        element = null;
                        canvas.style.cursor = "default";
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }


                }
            }
        }



    }
})();