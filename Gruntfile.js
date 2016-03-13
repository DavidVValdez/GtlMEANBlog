module.exports = function(grunt){
    grunt.initConfig({
        browserify:{
            dist:{
                options:{
                    transform:[['babelify',{presets:['../node_modules/babel-preset-react/']}]]
                },
                src:'react/admin.js',
                dest:'admin/js/admin.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default','browserify');

};

/*browserify -t [ babelify --presets [ react ] ] index.js -o /web/vhosts/playground/docroot/react/react1/keso2.js */
