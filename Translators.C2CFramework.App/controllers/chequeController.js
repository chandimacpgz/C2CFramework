(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('chequeController', chequeController);

    chequeController.$inject = ['$scope', '$state', '$element', 'BankService','ChequeService'];
    function chequeController($scope, $state, $element, BankService, ChequeService) {
        
        $scope.signaturecrop = {};
        $(document).ready(function () {
            $scope.signaturebutton = true;
            $("#imgfile").change(function () {
                var input, file, fr, img;

                if (typeof window.FileReader !== 'function') {
                    write("The file API isn't supported on this browser yet.");
                    return;
                }

                input = document.getElementById('imgfile');
                if (!input) {
                    write("Um, couldn't find the imgfile element.");
                }
                else if (!input.files) {
                    write("This browser doesn't seem to support the `files` property of file inputs.");
                }
                else if (!input.files[0]) {
                    write("Please select a file before clicking 'Load'");
                }
                else {
                    file = input.files[0];
                    fr = new FileReader();
                    fr.onload = createImage;
                    fr.readAsDataURL(file);
                }

                function createImage() {
                    img = new Image();
                    img.onload = imageLoaded;
                    img.src = fr.result;
                    $scope.signaturebutton = false;
                }

                function imageLoaded() {
                    var canvas = document.getElementById("canvas")
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    //alert(canvas.toDataURL("image/png"));


                }
            });
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
                            $scope.signaturecrop.cropType = 'Signature';
                            $scope.signaturecrop.cropStartX = cropPoint[0];
                            $scope.signaturecrop.cropStartY = cropPoint[1];
                            $scope.signaturecrop.cropWidth = cropPoint[2];
                            $scope.signaturecrop.cropHeight = cropPoint[3];
                            
                            ChequeService.addSignature($scope.signaturecrop).then(function (state) {
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
                        if (confirm("Press a button!") == true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
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
                        if (confirm("Press a button!") == true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
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
                        if (confirm("Press a button!") == true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
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
                        if (confirm("Press a button!") == true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
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
                        if (confirm("Press a button!") == true) {
                            console.log('left= ' + cropPoint[0] + ' top= ' + cropPoint[1]);
                            console.log('width= ' + cropPoint[2] + ' height= ' + cropPoint[3]);
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