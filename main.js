var str = '';
    var $name = $('#name');
    var $preview = $('.preview');
    var $pastOn = $('.data-input #past-on');
    var $obstacle = $('.data-input #obstacle');
    var $pastContent = $('.data-input #past-content');
    var $todayContent = $('.data-input #today-content');
    var $todayTarget = $('.data-input #today-target');
    var $chatName = $('span.name');
    var $chatTime = $('span.time');
    var $btnGenerate = $('.btn-generate');

    $btnGenerate.on('click', function(e){
        e.preventDefault();
        $('body').toggleClass('modal-open');
    });

    setInterval(function () {
        var d = new Date();
        $chatTime.text(d.getHours() + ':' + d.getMinutes());
    }, 1000);

    $('.data-input').on('keyup', '.form-input', function (e) {
        var tempStr = '';
        $chatName.text($name.val());
        str = '';
        if ($name.val() === '') {
            str += '<em>Name not specified</em><br />';
        }
        else {
            str += "<strong>" + $name.val() + "</strong><br />";
        }

        if ($pastOn.val() === '') {
            str += 'Yesterday:<br />';
        }
        else {
            str += 'On ' + $pastOn.val() + ':<br />'
        }

        if ($pastContent.val() === '') {
            str += '<p><em>none</em></p>';
        }
        else {
            tempStr = '';
            $.each($pastContent.val().split("\n"), function (index, item){
                tempStr += '<p>&bull; ' + item + '</p>';
            });
            str += tempStr; 
        }

        str += '<br />Obstacle:<br />';

        if ($obstacle.val() === '') {
            str += '<p><em>none</em></p>';
        }
        else {
            tempStr = '';
            $.each($obstacle.val().split("\n"), function (index, item){
                tempStr += '<p>&bull; ' + item + '</p>';
            });
            str += tempStr; 
        }

        str += '<br />Today:<br />';
        if ($todayContent.val() === '') {
            str += '<p><em>none</em></p>';
        }
        else {
            tempStr = '';
            $.each($todayContent.val().split("\n"), function (index, item){
                tempStr += '<p>&bull; ' + item + '</p>';
            });
            str += tempStr; 
        }

        str += '<br />Target:<br />';
        if ($todayTarget.val() === '') {
            str += '<p><em>none</em></p>';
        }
        else {
            tempStr = '';
            $.each($todayTarget.val().split("\n"), function (index, item){
                tempStr += '<p>&bull; ' + item + '</p>';
            });
            str += tempStr; 
        }
        str = str.replace(new RegExp("\n", 'g'), "<br />");
        $preview.html(str);
    });

    function copy(text) {
        text = text.replace(new RegExp('<strong>', 'g'), "*");
        text = text.replace(new RegExp('</strong>', 'g'), "*");
        text = text.replace(new RegExp('<em>', 'g'), "_");
        text = text.replace(new RegExp('</em>', 'g'), "_");
        text = text.replace(new RegExp('<p>', 'g'), "");
        text = text.replace(new RegExp('</p>', 'g'), '\n');
        text = text.replace(new RegExp('<br />', 'g'), '\n');
        var parser = new DOMParser;
        var dom = parser.parseFromString(text, 'text/html');
        var text = dom.body.textContent;
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(text).select();
        document.execCommand("copy");
        $temp.remove();
    }

    $('.btn-copy').on('click', function (e) {
        e.preventDefault();
        copy(str);
    });