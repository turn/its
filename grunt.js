// JS Hint options
var JSHINT_BROWSER = {
  browser: true,
  es5: true
};

var JSHINT_NODE = {
  node: true,
  es5: true
};

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    files: {
      lib: ['build_resource/module_prefix.js', 'lib/**/*.js', 'build_resource/module_postfix.js']
    },
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<config:files.lib>'],
        dest: 'build/<%= pkg.name %>.js'
      },
      test: {
        src: ['<banner:meta.banner>', '<config:files.lib>'],
        dest: 'test/lib/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
      test: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'test/lib/<%= pkg.name %>.min.js'
      },
    },
    lint: {
      files: ['lib/**/*.js']
    },
    qunit: {
      all: ['test/**/*.html']
    },
    jshint: {
      server: {
        options: JSHINT_NODE
      },
      grunt: {
        options: JSHINT_NODE
      },
      client: {
        options: JSHINT_BROWSER
      },

      options: {
        quotmark: 'single',
        camelcase: true,
        strict: true,
        trailing: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true
      },
      globals: {}
    }
  });

  grunt.registerTask('test', 'concat:test min:test qunit');
  grunt.registerTask('default', 'concat min');
};