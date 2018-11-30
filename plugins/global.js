window.history.replaceState = window.history.replaceState || function () {
};

/*美洽*/
(function (m, ei, q, i, a, j, s) {
  m[i] = m[i] || function () {
    (m[i].a = m[i].a || []).push(arguments)
  };
  j = ei.createElement(q),
    s = ei.getElementsByTagName(q)[0];
  j.defer = true;
  j.charset = 'UTF-8';
  j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';

  s.parentNode.insertBefore(j, s);
})(window, document, 'script', '_MEIQIA');

_MEIQIA('entId', 115390);

window.onload = function () {
  /*谷歌追踪代码*/
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments)
  }

  gtag('js', new Date())
  gtag('config', 'UA-127405416-1')
}



