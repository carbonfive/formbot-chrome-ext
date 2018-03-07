var RadioButtonSelections = () => {
  var _doRadios = (el) => {
    let names = $.map(jQuery(el).find("input[type=radio]"), (el) => el.getAttribute("name"));
    let unique_names = _unique(names);
    debugger;
    unique_names.forEach( (name) => {
      $(el).find(`input[name=${name}]:visible`).each( (_index, radioButtons) => {
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

  return {
    fill: _doRadios,
    clear: _clearRadios
  }

}();