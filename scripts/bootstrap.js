/*
 */

$(document).ready(function() {
        var git = new Timeline('#git');
        var python = new Timeline('#python');
        var hudson = new Timeline('#hudsonci');
        git.start();
        python.start();
        hudson.start();
});
