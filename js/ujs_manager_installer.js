// ==UserScript==
// @name        UJS Manager - script installer
// @include     *.js*
// @version     0.2
// @servicepath {{service_path}}
// @uniqueid    {{unique_id}}
// ==/UserScript==

window.addEventListener(
  'load',
  function()
  {
    // try to detect user scripts by pre tag alone
    if ( !(document && document.body && document.body.childElementCount == 1
        && document.body.firstChild.tagName.toLowerCase() == 'pre'
        && location.href.match(/\.js($|\?)/))  // matches .js files (also with query)
      )
      return;

    var badge = document.createElement('div');
    badge.setAttribute('style', 'background:-o-skin("Content Block Toolbar Skin");' +
        'padding:6px; font-family:Verdana,sans-serif; font-size:12px;');


    badge.show = function()
    {
      this.style.marginTop = (parseInt(this.style.marginTop)+2) + 'px';

      if ( parseInt(this.style.marginTop) < 0 )
        setTimeout( function(){ badge.show(); }, 10 );
      else
        this.style.marginTop = 0;
    }

    badge.hide = function()
    {
      if ( !this.cachedHeight)
        this.cachedHeight = -this.scrollHeight;

      if ( parseInt(this.style.marginTop) > this.cachedHeight )
      {
        this.style.marginTop = (parseInt(this.style.marginTop)-4) + 'px';
        setTimeout( function(){ badge.hide(); }, 10 );
      }
      else
      {
        this.parentNode.removeChild(this);
      }
    }

    var info_img = document.createElement('img');
      info_img.setAttribute('style', 'vertical-align:middle; padding: 3px;');
      info_img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAABrElEQVQ4y42ST2sTQRjGfzNJFNrGFqSI4EEQwZMfwg8geC3e%2FQR%2BBkU8e9ZDr4KCF4WCPfWg2OjNP63YhG2bzTZp82%2BzM%2FN6mNlJarHpC8O%2BzMzze959dhWhnjfyZeDFYk2tcU4NCmE8GtFPs7eHSfKoWh7cXb30uF5l7eYSaAVWwIh%2FWgEBJg5aAzhMh7RUfr95dDCOgDt1HixUoaLAKdDO71sHxoIDEFitOXYHQ5JORu9kcD0C6jUyrb1TRUBpL7AOREMhHlLRiuZ%2BStrOxsn3r68iQGl6AMrrEAEXRCaAHGCdDDffrD%2Fc%2BbKV7DU2OxGAgKjYIoBx0wxmlv348tk3oAkUEWABPRNY4bxzYX1vw0RWouUYYApwYIK9CSu3PnkbYA6fxWxFQB6SlnBxEsT%2Futv%2FAUbWi8tLZXAmvFKEuPMmmHVi2pdfozw%2FA3j6%2Fqe8%2B%2FSLebVyZZEb166qU4D1jYYs3741V%2Fx7t0Wv2ycf5pfPTJCmR3MBS%2FUFnBOsszr8bx5wPDL0TMZFqt89mRy3956cmmBj%2B88K3R%2F3LgLY2d5KPn943QHa5d5f8IMRwykVhgcAAAAASUVORK5CYII%3D';

    var install_but = document.createElement('button');
      install_but.textContent = 'Install User Script';
      install_but.setAttribute('style', 'float:right;');
      install_but.onclick = function(){ install_script(location.href); }

    var close_but = document.createElement('button');
      //close_but.textContent = 'X';
      close_but.setAttribute('style', 'float:right; padding:0; margin:3px; border:none;'+
          'background:-o-skin("Speed Dial Thumbnail Close Button Skin"); width:-o-skin;'+
          'height:-o-skin; cursor:pointer;');
      close_but.onclick = function(){ badge.hide(); };

    var desc = document.createElement('span');
      desc.textContent = ' UJS Manager detected script file. It can be installed as a user script. ';

    // we can't install from file://
    if ( location.protocol == 'file:' )
    {
      desc.textContent = ' UJS Manager detected script file but it does not support '+
        'installation from local filesystem. File has to be saved manually.';
      install_but.disabled = true;
    }

    badge.appendChild(close_but);
    badge.appendChild(install_but);
    badge.appendChild(info_img);
    badge.appendChild(desc);

    document.documentElement.insertBefore(badge, document.body);

    // hide badge (we want it animate to screen)
    badge.style.marginTop = -badge.scrollHeight+'px';

    badge.show()

    function install_script(uri)
    {
      var unique_id = '{{unique_id}}';
      var service_uri = '{{service_path}}';

      var form = document.createElement('form');
      form.action = service_uri;
      form.method = 'post';
      form.enctype = 'multipart/form-data';
      form.innerHTML = '<textarea name="script_body">' +
                       document.getElementsByTagName('pre')[0].textContent + '</textarea>' +
                       '<input type="text" name="install_script" value="' + uri + '">' +
                       '<input type="text" name="unique_id" value="' + unique_id +'">';
      form.submit();
    }
  },
  false
);