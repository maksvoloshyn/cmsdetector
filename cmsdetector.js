(function () {
    var CMS_DICT = ['wordpress', 'joomla', 'drupal', 'magento', 'prestashop', 'opencart'];

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
            document.querySelectorAll('[src^="' + host + '/wp-content/"]').length > 0 ||
            document.querySelectorAll('[href^="/wp-content/"]').length > 0 ||
            document.querySelectorAll('[href^="' + host + '/wp-content/"]').length > 0)
            cms = 'wordpress';
        else if (document.querySelectorAll('[src^="catalog/view/theme/"]').length > 0 ||
            document.querySelectorAll('[src^="' + host + '/catalog/view/theme/"]').length > 0 ||
            document.querySelectorAll('[href^="catalog/view/theme/"]').length > 0 ||
            document.querySelectorAll('[href^="' + host + '/catalog/view/theme/"]').length > 0)
            cms = 'opencart';
        else if (document.querySelectorAll('[src^="//cdn.shopify.com/"]').length > 0 ||
            document.querySelectorAll('[src^="//cdn.shopify.com/"]').length > 0)
            cms = 'shopify';

        return cms;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return detectCMS;
        });
    } else {
        window.detectCMS = function () {
            return detectCMS();
        };
    }
})();