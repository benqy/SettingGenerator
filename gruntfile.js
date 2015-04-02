module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/metadatas/ue-slideshow/metadata.js',
        dest: 'build/temp.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};