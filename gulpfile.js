const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const watch = require("gulp-watch");
const concat = require("gulp-concat");
const ts = require("gulp-typescript");


//defining tasks
gulp.task('sass', function(done){
    gulp.src('src/scss/homepage.scss')
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("homepage.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    gulp.src('src/scss/old_profile.scss')
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("old_profile.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    gulp.src('src/scss/content_page.scss')
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("content_page.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    gulp.src('src/scss/mod_all.scss')
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("mod_all.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    gulp.src('src/scss/common.scss' )
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("common.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    gulp.src('src/scss/verification_queue.scss')
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("verification_queue.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    gulp.src('src/scss/question_page.scss')
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("question_page.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    gulp.src('src/scss/reported_content.scss')
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("reported_content.css"))
    .pipe(gulp.dest("dist/content-scripts/css/"));
    done();
});
gulp.task("manifest", function(done){
    gulp.src("manifest.json")
        .pipe(gulp.dest("dist/"));
    done();
});
gulp.task("resources", function(done){
    gulp.src("resources/*/*.svg")
        .pipe(gulp.dest("dist/resources/"));
    gulp.src("resources/icon.png")
        .pipe(gulp.dest("dist/resources/"));
    done();
});
//watching while development
gulp.task("watch", function(done){
    watch(["./src/scss/*.scss"], gulp.series("sass"));
});

//calling all tasks on "gulp"
gulp.task("default", gulp.parallel(
    "sass", 
    "manifest", 
    "resources"
    ));
