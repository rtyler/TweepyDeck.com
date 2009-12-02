/*
 * Timeline objects
 */


var Timeline = (function() {
    var t = function(term) {
        this.term = term.replace('#', '%23');
    };

    t.prototype.markupTweet = function(text) {
        var newtext = '';
        $.each(text.split(' '), function(i, piece) {
            if (piece.charAt(0) == '@') {
                newtext += '<a class="mention" href="http://twitter.com/' + piece.replace('@', '') + '">';
                newtext += piece;
                newtext += '</a>';
            }
            else if (piece.charAt(0) == '#') {
                newtext += '<a class="hashtag" href="http://search.twitter.com/search?q=' + piece + '">';
                newtext += piece;
                newtext += '</a>';
            }
            else {
                newtext += piece;
            }
            newtext += ' ';
        });
        return newtext;
    };

    t.prototype.renderItem = function(data) {
        var item = '<div class="timeline row" id="' + data['id'] + '">';
           item += '<div class="timeline avatar">';
           item += '<img width="50" height="50" src="' + data['profile_image_url'] + '"/>';
           item += '<br/>';
           item += '<strong>' + data['from_user'] + '</strong>';
           item += '</div>';
           item += '<div class="timeline tweet">' + this.markupTweet(data['text']) + '</div>';
           item += '</div>';
        $('#' + this.getDivId()).append(item);
    };

    t.prototype.getDivId = function() {
        return 'timeline_';
    };

    t.prototype.start = function() {
        var timeline = this;
        $('#deck').append('<div class="timeline" id="' + this.getDivId() + '"></div>');

        $.getJSON(
                'http://search.twitter.com/search.json?rpp=10&callback=?&q=' + this.term,
                function(data) {
            $.each(data['results'], function(i, item) {
                timeline.renderItem(item); 
            });
            $('body').append('<script id="aptureScript" type="text/javascript" src="http://www.apture.com/js/apture.js?siteToken=yYBMQRz" charset="utf-8"></script>');
        });
    };

    return t;
})();
