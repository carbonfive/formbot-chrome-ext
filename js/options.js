// Saves options to chrome.storage
const RBG_OPTION_SELECTOR = 'radio-button-group';
const INPUT_TEXT_OPTION_SELECTOR =  'default-input-text';
const INPUT_TEXTAREA_OPTION_SELECTOR = 'default-textarea-text';

const DEFAULT_RBG_SELECTOR = '.radio-group';
const DEFAULT_PLACEHOLDER = "FUS RO DAH";
const DEFAULT_TEXTAREA_STYLE = 'ipsum';


const DEFAULT_OPTIONS = {
    radioButtonGroupSelector: DEFAULT_RBG_SELECTOR,
    defaultInputText: DEFAULT_PLACEHOLDER,
    defaultTextAreaTextStyle: DEFAULT_TEXTAREA_STYLE
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(DEFAULT_OPTIONS, function(items) {
    update_options_fields(items)
  });
}

function save_options() {
  const newOptions = {
    radioButtonGroupSelector: document.getElementById(RBG_OPTION_SELECTOR).value,
    defaultInputText: document.getElementById(INPUT_TEXT_OPTION_SELECTOR).value,
    defaultTextAreaTextStyle: document.getElementById(INPUT_TEXTAREA_OPTION_SELECTOR).selected
  };
  chrome.storage.sync.set(newOptions, function() {
    update_status("Options saved.")
  });
}

function reset_options() {
  chrome.storage.sync.set(DEFAULT_OPTIONS, function() {
    update_options_fields(DEFAULT_OPTIONS);
    update_status('Options reset to defaults.')
  });
}

function update_options_fields (items) {
  document.getElementById(RBG_OPTION_SELECTOR).value = items.radioButtonGroupSelector;
  document.getElementById(INPUT_TEXT_OPTION_SELECTOR).value = items.defaultInputText;

  let textareaSelect = document.getElementById(INPUT_TEXTAREA_OPTION_SELECTOR);
  let options = textareaSelect.childNodes;
  for (let option of options) {
    if (option.value === items.defaultTextAreaTextStyle) {
      option.selected = selected
    }
    break;
  }
}
function update_status(status_text) {
  // Update status to let user know options were reset.
  var status = document.getElementById('status');
  status.setAttribute("class","");
  status.textContent = status_text;
  setTimeout(function() {
    status.setAttribute("class", "hidden");
    status.textContent = '';
  }, 1500);

}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();
  document.getElementById('save').addEventListener('click', save_options);
  document.getElementById('reset').addEventListener('click', reset_options);
});
