app.directive('dropzone', function() {

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/dropzone.html',
        scope: {
            file: '=',
            fileName: '=',
            modelImage: '='
        },
        link: function(scope, element, attrs) {

            // scope.$watch('file', function(newVal, oldVal) {
            //     if(newVal !== oldVal) {
            //         scope.modelImage = scope.file;
            //     }                
            // })
            // scope.$watch('files', function(newVal, oldVal) {
            //     if(newVal !== oldVal) {
            //         createImage(newVal[0]);
            //     }                
            // });

            var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;

            processDragOverOrEnter = function(event) {
                if (event != null) {
                    event.preventDefault();
                }
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                return false;
            };

            validMimeTypes = attrs.fileDropzone;

            checkSize = function(size) {
                var _ref;
                if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
                    return true;
                } else {
                    alert("File must be smaller than " + attrs.maxFileSize + " MB");
                    return false;
                }
            };
            
            isTypeValid = function(type) {
                if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                    return true;
                } else {
                    alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                    return false;
                }
            };

            createImage = function(file) {
                var name, reader, size, type;
                if (event != null) {
                    event.preventDefault();
                }
                reader = new FileReader();
                reader.onload = function(evt) {
                    if (checkSize(size) && isTypeValid(type)) {
                        return scope.$apply(function() {
                            scope.file = evt.target.result;
                            if (angular.isString(scope.fileName)) {
                                return scope.fileName = name;
                            }
                        });
                    }
                };      
                name = file.name;
                type = file.type;
                size = file.size;
                reader.readAsDataURL(file);
                return false;
            }

            // scope.selectionImage = function(value) {
            //     angular.element('#image').click();
            //     angular.element('#image').change(function(event) {
            //         createImage(event.target.files[0]);
            //     });
            // };

            // element.bind('dragover', processDragOverOrEnter);
            // element.bind('dragenter', processDragOverOrEnter);
            // return element.bind('drop', function(event) {
            //     createImage(event.originalEvent.dataTransfer.files[0]);
            // });            

            scope.onFileSelect = function($files) {
                //$files: an array of files selected, each file has name, size, and type. 
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    scope.upload = $upload.upload({
                        url: 'server/upload/url', //upload.php script, node.js route, or servlet url 
                        //method: 'POST' or 'PUT', 
                        //headers: {'header-key': 'header-value'}, 
                        //withCredentials: true, 
                        data: {
                            myObj: $scope.myModelObj
                        },
                        file: file, // or list of files ($files) for html5 only 
                        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s) 
                        // customize file formData name ('Content-Desposition'), server side file variable name.  
                        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'  
                        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code 
                        //formDataAppender: function(formData, key, val){} 
                    }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        // file is uploaded successfully 
                        console.log(data);
                    });
                }
            }   
        }
    };

})