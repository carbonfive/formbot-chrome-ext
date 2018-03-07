// See https://github.com/marak/faker.js/

var Formbot = () => {

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
        var el = jQuery("form");
        _clearText(el);
        _clearRadiosAndCheckboxes(el);
        _clearSelects(el);
    };


    var _fillWithCardInfo= function (data) {
        var el = jQuery("form");
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
        jQuery(el).find("input[type='text']:visible").each(function () {
            let name_attr = jQuery(this).attr("name");

            let names = cardData.name.split(" ");
            let firstName = names[0];
            let lastName = names[1];
            if (name_attr !== undefined) {
                if (name_attr.match(/name/i)) {
                  if (name_attr.match(/first.?name/i)) {
                    jQuery(this).val(firstName)
                  } else if (name_attr.match(/last.?name/i)) {
                    jQuery(this).val(lastName)
                  } else if (name_attr.match(/company/i)) {
                    jQuery(this).val(cardData.company.name)
                  } else {
                    jQuery(this).val(cardData.name)
                  }
                } else if (name_attr.match(/address/i)) {
                    jQuery(this).val(cardData.address.streetB);
                } else if (name_attr.match(/city/i)) {
                    jQuery(this).val(cardData.address.city)
                } else if (name_attr.match(/state|identification.?origin/i)) {
                  jQuery(this).val(cardData.address.state)
                } else if (name_attr.match(/zip/i)) {
                  jQuery(this).val(cardData.address.zipcode);
                } else if (name_attr.match(/country/i)) {
                  jQuery(this).val("USA");
                } else if (name_attr.match(/phone/i)) {
                  jQuery(this).val(cardData.phone);
                } else if (name_attr.match(/ssn|social.security.number|tax.?id/i)) {
                  var randomLastFour = _randomInteger(1000, 9999).toString();
                  jQuery(this).val("666-38-" + randomLastFour);
                } else if (name_attr.match(/number/i)) {
                  jQuery(this).val("10101010101");
                } else if (name_attr.match(/income/i)) {
                  jQuery(this).val(Math.floor(1000000 * Math.random()))
                } else {
                  jQuery(this).val(defaultInputText)
                }
            }
        })
    };

    var _doEmail= function (el) {
        const email = faker.internet.email();
        jQuery(el).find("input[name*=email]:visible").val(email.replace(".com",".example.com"));
    };

    var _doDates= function (el) {
        jQuery(el).find("input[type=date]").each(function () {
            var name_attr = jQuery(this).attr("name");
            if (name_attr.match(/birth|dob/)) {
                var dob = _randomBirthDate();
                jQuery(this).val(dob);
            } else if (name_attr.match(/expir/)) {
                jQuery(this).val("2022-12-31")
            } else {
                jQuery(this).val("2017-10-31")
            }
        })
    };


    var _doRadios = (el) => {
      let names = jQuery.map(jQuery(el).find("input[type=radio]"), (el) => el.getAttribute("name"));
      let unique_names = _unique(names);
      debugger;
      unique_names.forEach( (name) => {
        jQuery(el).find(`input[name=${name}]:visible`).each( (_index, radioButtons) => {
          _doRadio(radioButtons);
        })
      });
    };

    var _doRadio = (radioButtons) => {
      const $radioButtons = jQuery(radioButtons)
      const checked = $radioButtons.find("input[type=radio]:checked").length !== 0;
      // don't override if there is already a selection
      if (checked) { return; }

      const selection = _selectOne($radioButtons);
      $radioButtons[selection].checked = true
    };

    var _doCheckboxes = (el) => {

    };

    var _doCheckbox = (el)  => {
        const $checkboxes = jQuery(el).find("input:checkbox:visible");

        // don't override if there is already a selection
        var unChecked = jQuery(el).find("input:checkbox:checked").length === 0;

        if ($checkboxes.length && unChecked) {
            var selection = _selectOne($checkboxes);
            $checkboxes[selection].checked = true
        }
    };

    var _doNumber= function(el) {
      const $numbers = jQuery(el).find("input[type=number]:visible");
      $numbers.each(function() {
        num = Math.floor(Math.random()*10);
        jQuery(this).val(num);
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
        const $passwords = jQuery(el).find("input[type=password]:visible");
        $passwords.val("123heyheyitsthemonkees");
    };

    var _doTextarea = function(el) {
      const $textareas = jQuery(el).find("textarea");
      const loremText = faker.lorem.paragraph();
      $textareas.val(loremText);
    }

    var _clearText= function (el) {
        jQuery(el).find("input[type=text],input[type=email],input[type=date],textarea").val("")
    };

    var _clearRadiosAndCheckboxes= function (el) {
        jQuery(el).find("input[type=radio],input:checkbox").each(function () {
            this.checked = false;
        })
    };

    var _clearSelects = function (el) {
        jQuery(el).find("option").each(function () { this.selected = false; })
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

        var el = jQuery("form");
        _doRadios(el);
        el.find(".checkbox-group:visible").each(function () {
          _doCheckbox(this);
        });
        _fillWithCardInfo();

    };


    var _unique = function(fromArray) {
      unique = [];
      fromArray.forEach(function(element) {
        if (!unique.includes(element)){
          unique.push(element);
        }
      });
      return unique;
    };

    return {
        fill: fill,
        clear: clear,
        onMessage: onMessage
    }
}();
chrome.runtime.onMessage.addListener(Formbot.onMessage);

