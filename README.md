#  !["formbot logo"](https://github.com/privsecx/formbot-chrome-ext/blob/master/images/icon-128.png) formbot

## A Chrome extension

To be used for development and testing, this Chrome extension uses
[Marak's Faker.js](https://github.com/Marak/Faker.js) for generating random
data and fill out forms on the active Chrome tab.  It is also bundled
with jQuery.

It tries to make smart, but not too smart, guesses about what each
field is for. It fills in with a default string if it can't.

### How to use it
Right now it's not on the Chrome Web Store, however you can git clone or download
a .zip file and unpack it.

1. Download the repo and unzip it if necessary.
1. Go to [chrome://extensions/](chrome://extensions/) in your browser.
1. Check `Developer mode.`
1. Click `Load unpacked extension...`
1. Use the file browser to navigate to the directory where the extension
has been unpacked.
1. Click `Select` or `OK` or whatever.
1. The little formbot robot should appear in your toolbar, and also at
the top of your list of extensions.

### Check boxes and radio buttons
If a checkbox is already checked, it leaves it alone. Otherwise, it randomly
selects ONE checkbox from all checkboxes in the form.

It does the same thing with radio buttons.

### Passwords
The password is "123heyheyitsthemonkees", which may or may not fit your app's
password requirements. Maybe this should be an option or something.
