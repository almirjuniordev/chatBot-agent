var $messages = $('.messages-content'), d, h, m, i = 0;
var popups = [];
var token = "<numero do token>";
var baseUrl = "https://api.dialogflow.com/v1/";
var client = new ApiAi.ApiAiClient({ accessToken: token });


$(window).on('load', function () {
    $messages.mCustomScrollbar();
    setTimeout(function () {
        $("#chat").hide();
    }, 100);
});

$(window).on('keydown', function (e) {
    if (e.which == 13) {
        InserirMensagem();
        return false;
    }
})



$('.message-submit').click(function () {
    InserirMensagem();
});



$('.button').click(function () {
    $('.menuChat .items span').toggleClass('active');
    $('.menuChat .button').toggleClass('active');
});


// function GetTokenFileTXT(file)
// {
// 	var str = "";
// 	var txtFile = new File(file);
// 	txtFile.open("r");
// 	while (!txtFile.eof) {
// 		// read each line of text
// 		str += txtFile.readln() + "\n";
// 	}
// 	return str;
// }


function AtualizarScroll() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}


function setDate() {

    $('<div class="timestamp">' + getHora() + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));

}

function getHora() {
    var tempo = new Date();
    var hora = tempo.getHours();
    var minutos = tempo.getMinutes();
    var tempoString = "" + ((hora > 12) ? hora - 12 : hora);
    tempoString += ((minutos < 10) ? ":0" : ":") + minutos;
    return tempoString;
}

function InserirMensagem() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }


    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    AtualizarScroll();
    setTimeout(function () {
        EnviarMensagem(msg);
    }, 1000 + (Math.random() * 20) * 100);
}

function EnviarMensagem(msg) {
    if ($('.message-input').val() != '') {
        return false;
    }


    $('<div class="message loading new"><figure class="avatar"><img src="https://botlist.co/system/BotList/Bot/logos/000/002/523/medium/BotList_avatar_2017.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    AtualizarScroll();

    setTimeout(function () {
        $('.message.loading').remove();

        var resposta;
        if (msg != "") {
            EnviarApi(msg)
            .then(function (response) {
                var result;
                try {
                    resposta = response.result.fulfillment.speech
                } catch (error) {
                    resposta = "";
                }
                $('<div class="message new"><figure class="avatar"><img src="https://botlist.co/system/BotList/Bot/logos/000/002/523/medium/BotList_avatar_2017.png" /></figure>' + resposta + '</div>').appendTo($('.mCSB_container')).addClass('new');
                setDate();
                AtualizarScroll();

            })
            .catch(function (err) {
            });
        }


            EnviarApi()
            .then(function (response) {
                var result;
                try {
                    resposta = response.result.fulfillment.speech
                } catch (error) {
                    resposta = "";
                }
                $('<div class="message new"><figure class="avatar"><img src="https://botlist.co/system/BotList/Bot/logos/000/002/523/medium/BotList_avatar_2017.png" /></figure>' + resposta + '</div>').appendTo($('.mCSB_container')).addClass('new');
                setDate();
                AtualizarScroll();

            })
            .catch(function (err) {
            });
    }, 1000 + (Math.random() * 20) * 100);

}
function close_popup() {
    $("#chat").hide();
    clear();
}

function open_popup() {
    AtualizarScroll();
    $("#chat").show();
    EnviarMensagem("");

}

function clear() {
    $('.menuChat .items span').removeClass('active');
    $('.menuChat .button').removeClass('active');

    var list = document.getElementById("mCSB_1_container")

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function EnviarApi(text) {
    return client.textRequest(text);
}


function EnviarApi() {
    return client.eventRequest('Welcome');
}










