import * as React from 'react';

import { useCollector } from 'studio/collector';

function createGlobalScript(propertyID: string) {
  return (
    `(function (w, d) {
      w.$$head = document.getElementsByTagName('head')[0] || document.documentElement;
      w.$$loadScript = function(src, deferred, callback) {
        var script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.defer = deferred;
        script.onload = callback;
        script.src = src;
        w.$$head.appendChild(script);
      };
    })(window, document);
    (function (w, g) {
      w.GoogleAnalyticsObject = g;
      w[g] = w[g] || function () {
        (w[g].q = w[g].q || []).push(arguments);
      }, w[g].l = +new Date();
      w[g]('create', ${JSON.stringify(propertyID)}, 'auto');
      w.$$loadScript('https://www.google-analytics.com/analytics.js', true);
      w[g]('send', 'pageview');
    }(window, 'ga'));`
  );
}

export function StaticBuilder() {
  const collector = useCollector();

  collector.addTag((
    <script type="application/javascript" dangerouslySetInnerHTML={{ __html: createGlobalScript('UA-163954177-1') }} />
  ));

  return null;
}
