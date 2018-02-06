// See https://github.com/marak/faker.js/

var Formbot = function () {

    var defaultInputText, defaultTextAreaTextStyle, radioButtonGroupSelector;

    var onMessage = function(request, sender, sendResponse) {
        if (request.action === "fill") {
            sendResponse({result: "Filled"});
            Formbot.fill();
        } else if (request.action === "clear") {
            sendResponse({result: "Cleared"});
            Formbot.clear();
        }
    };

    var fill = function () {
        chrome.storage.sync.get(["defaultInputText","defaultTextAreaTextStyle","radioButtonGroupSelector"], _setDefaultsAndFill);
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
        _doTextarea(el);
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
        $(el).find("input[type='text']:visible").each(function () {
            let name_attr = $(this).attr("name");

            let names = cardData.name.split(" ");
            let firstName = names[0];
            let lastName = names[1];
            if (name_attr !== undefined) {
                if (name_attr.match(/name/i)) {
                  if (name_attr.match(/first.?name/i)) {
                    $(this).val(firstName)
                  } else if (name_attr.match(/last.?name/i)) {
                    $(this).val(lastName)
                  } else if (name_attr.match(/company/i)) {
                    $(this).val(cardData.company.name)
                  } else {
                    $(this).val(cardData.name)
                  }
                } else if (name_attr.match(/address/i)) {
                    $(this).val(cardData.address.streetB);
                } else if (name_attr.match(/city/i)) {
                    $(this).val(cardData.address.city)
                } else if (name_attr.match(/state|identification.?origin/i)) {
                  $(this).val(cardData.address.state)
                } else if (name_attr.match(/zip/i)) {
                  $(this).val(cardData.address.zipcode);
                } else if (name_attr.match(/country/i)) {
                  $(this).val("USA");
                } else if (name_attr.match(/phone/i)) {
                  $(this).val(cardData.phone);
                } else if (name_attr.match(/ssn|social.security.number|tax.?id/i)) {
                  var randomLastFour = _randomInteger(1000, 9999).toString();
                  $(this).val("666-38-" + randomLastFour);
                } else if (name_attr.match(/number/i)) {
                  $(this).val("10101010101");
                } else if (name_attr.match(/income/i)) {
                  $(this).val(Math.floor(1000000 * Math.random()))
                } else {
                  $(this).val(defaultInputText)
                }
            }
        })
    };

    var _doEmail= function (el) {
        const email = faker.internet.email();
        $(el).find("input[name*=email]:visible").val(email.replace(".com",".example.com"));
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
      $(el).find(radioButtonGroupSelector + ":visible").each(function(index, childEl) {
        const $radios = $(childEl).find("input:radio:visible");

        // don't override if there is already a selection
        const unChecked = $(childEl).find("input:radio:checked").length === 0;

        if ($radios.length && unChecked) {
          const selection = _selectOne($radios);
          $radios[selection].checked = true
        }
      });
    };

    var _doCheckbox= function (el) {
        const $checkboxes = $(el).find("input:checkbox:visible");

        // don't override if there is already a selection
        var unChecked = $(el).find("input:checkbox:checked").length === 0;

        if ($checkboxes.length && unChecked) {
            var selection = _selectOne($checkboxes);
            $checkboxes[selection].checked = true
        }
    };

    var _doNumber= function(el) {
      const $numbers = $(el).find("input[type=number]:visible");
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
        const $passwords = $(el).find("input[type=password]:visible");
        $passwords.val("123heyheyitsthemonkees");
    };

    var _doTextarea = function(el) {
      const $textareas = $(el).find("textarea");
      const loremText = faker.lorem.paragraph();
      $textareas.val(loremText);
    }

    var _clearText= function (el) {
        $(el).find("input[type=text],input[type=email],input[type=date],textarea").val("")
    };

    var _clearRadiosAndCheckboxes= function (el) {
        $(el).find("input:radio,input:checkbox").each(function () {
            this.checked = false;
        })
    };

    var _randomBirthDate= function () {
        const year = Math.floor(80 * Math.random()) + 18;
        const month = Math.floor(11 * Math.random()) + 1;
        const day = Math.floor(30 * Math.random()) + 1;

        const date = new Date(year, month, day);
        return date.toISOString().slice(0, 10);
    };

    var _selectOne = function ($inputs) {
        return Math.floor($inputs.length * Math.random());
    };

    var _setDefaultsAndFill = function(chromeSyncItems) {
        defaultTextAreaTextStyle = chromeSyncItems.defaultTextAreaTextStyle;
        defaultInputText = chromeSyncItems.defaultInputText;
        radioButtonGroupSelector = chromeSyncItems.radioButtonGroupSelector;

        var el = $("form");
        el.find(".radio-group:visible").each(function () {
          _doRadio(this);
        });
        el.find(".checkbox-group:visible").each(function () {
          _doCheckbox(this);
        });
        _fillWithCardInfo();

    };

    return {
        fill: fill,
        clear: clear,
        onMessage: onMessage
    }
}();
chrome.runtime.onMessage.addListener(Formbot.onMessage);

