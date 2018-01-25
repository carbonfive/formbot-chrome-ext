// See https://github.com/marak/faker.js/

var Formbot = function () {
    var onMessage = function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        if (request.action === "fill") {
            sendResponse({result: "Filled"});
            Formbot.fill();
        } else if (request.action === "clear") {
            sendResponse({result: "Cleared"});
            Formbot.clear();
            console.log("there")
        }
    };

    var fill = function () {
        var el = $("form");
        el.find(".radio-group").each(function () {
            _doRadio(this);
        });
        el.find(".checkbox-group").each(function () {
            _doCheckbox(this);
        });
        _fillWithCardInfo();
    };

    var clear = function () {
        var el = $("form");
        _clearText(el);
        _clearRadiosAndCheckboxes(el);
    };


    var _fillWithCardInfo= function (data) {
        var el = $("form");
        _doDates(el);
        _doText(el);
        _doEmail(el);
        _doNumber(el);
        _doPassword(el);
        _doSelects(el);
    };

    var _randomInteger = function(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    };

    var _doText = function (el) {
        const cardData = faker.helpers.createCard();
        $(el).find("input[type='text']").each(function () {
            var name_attr = $(this).attr("name");
            var names = cardData.name.split(" ");
            var firstName = names[0];
            var lastName = names[1];
            if (name_attr !== undefined) {
                if (name_attr.match(/name/)) {
                  if (name_attr.match(/first_name/)) {
                    $(this).val(firstName)
                  } else if (name_attr.match(/last_name/)) {
                    $(this).val(lastName)
                  } else if (name_attr.match(/company/)) {
                    $(this).val(cardData.company.name)
                  } else {
                    $(this).val(cardData.name)
                  }
                } else if (name_attr.match(/address/)) {
                    $(this).val(cardData.address.streetB);
                } else if (name_attr.match(/city/)) {
                    $(this).val(cardData.address.city)
                } else if (name_attr.match(/state|identification_origin/)) {
                  $(this).val(cardData.address.state)
                } else if (name_attr.match(/zip/)) {
                  $(this).val(cardData.address.zipcode);
                } else if (name_attr.match(/country/)) {
                  $(this).val("USA");
                } else if (name_attr.match(/phone/)) {
                  $(this).val(cardData.phone);
                } else if (name_attr.match(/ssn|social.security.number|tax_id/)) {
                  var randomLastFour = _randomInteger(1000, 9999).toString();
                  $(this).val("666-38-" + randomLastFour);
                } else if (name_attr.match(/number/)) {
                  $(this).val("10101010101");
                } else if (name_attr.match(/income/)) {
                  $(this).val(Math.floor(1000000 * Math.random()))
                } else {
                  $(this).val("FUS RO DAH")
                }
            }
        })
    };

    var _doEmail= function (el) {
        const email = faker.internet.email();
        $(el).find("input[type=email],input[name*=email]").val(email.replace(".com",".example.com"));
    };

    var _doDates= function (el) {
        $(el).find("input[type=date]").each(function () {
            var name_attr = $(this).attr("name");
            if (name_attr.match(/birth|dob/)) {
                var dob = _randomBirthDate();
                $(this).val(dob);
            } else if (name_attr.match(/expir/)) {
                $(this).val("2022-12-31")
            } else {
                $(this).val("2017-10-31")
            }
        })
    };

    var _doRadio= function (el) {
        const $radios = $(el).find("input:radio");

        // don't override if there is already a selection
        const unChecked = $(el).find("input:radio:checked").length === 0;

        if ($radios.length && unChecked) {
            const selection = _selectOne($radios);
            $radios[selection].checked = true
        }
    };

    var _doCheckbox= function (el) {
        const $checkboxes = $(el).find("input:checkbox");

        // don't override if there is already a selection
        var unChecked = $(el).find("input:checkbox:checked").length === 0;

        if ($checkboxes.length && unChecked) {
            var selection = _selectOne($checkboxes);
            $checkboxes[selection].checked = true
        }
    };

    var _doNumber= function(el) {
      const $numbers = $(el).find("input[type=number]");
      $numbers.each(function() {
        num = Math.floor(Math.random()*10);
        $(this).val(num);
      })
    };

    var _doSelects = function(el) {
        const $selects = $(el).find("select");
        $selects.each(function(index, select) {
            $opts = $(select).find("option");
            const randomIndex = _selectOne($opts);
            $opts[randomIndex].selected = true;
        });
    };

    var _doPassword = function(el) {
        const $passwords = $(el).find("input[type=password]");
        $passwords.val("123heyheyitsthemonkees");
    };

    var _clearText= function (el) {
        $(el).find("input[type=text],input[type=email],input[type=date]").val("")
    };

    var _clearRadiosAndCheckboxes= function (el) {
        $(el).find("input:radio,input:checkbox").each(function () {
            this.checked = false;
        })
    };

    var _randomBirthDate= function () {
        var year = Math.floor(80 * Math.random()) + 18;
        var month = Math.floor(11 * Math.random()) + 1;
        var day = Math.floor(30 * Math.random()) + 1;

        var date = new Date(year, month, day);
        return date.toISOString().slice(0, 10);
    };

    var _selectOne = function ($inputs) {
        return Math.floor($inputs.length * Math.random());
    };

    return {
        fill: fill,
        clear: clear,
        onMessage: onMessage
    }
}();
chrome.runtime.onMessage.addListener(Formbot.onMessage);

