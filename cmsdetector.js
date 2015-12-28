(function () {
    var CMS_DICT = ['wordpress', 'joomla', 'drupal', 'magento'];

    function detectCMS () {
        var cms;

        cms = _checkMeta();
        cms = cms || _checkGlobal();
        cms = cms || _checkSources();

        return cms;
    }

    function _checkMeta () {
        var metaGenerator = document.querySelector('[name=generator]'),
            generator, cms;

        if (metaGenerator) {
            generator = metaGenerator.content.toLowerCase();

            for (var i = 0; i < CMS_DICT.length; i++) {
                if (generator.indexOf(CMS_DICT[i]) > -1) {
                    cms = CMS_DICT[i];
                    break;
                }
            }
        }

        return cms;
    }

    function _checkGlobal () {
        var cms;

        if (window.Joomla)
            cms = 'joomla';
        if (window.Drupal)
            cms = 'drupal';
        if (window.Mage)
            cms = 'magento';

        return cms;
    }

    function _checkSources () {
        var host = window.location.origin,
            cms;

        if (document.querySelectorAll('[src^="/wp-content/"]').length > 0 ||
            document.querySelectorAll('[src^="' + host + '/wp-content/"]').length > 0)
            cms = 'wordpress';
        console.log(cms);
        return cms;
    }

    window.detectCMS = function () {
        return detectCMS();
    };
})();