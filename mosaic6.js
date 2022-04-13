//mosaic 6

(function () {
    var l = ".filtered",
        p = ".item",
        r = ".item.open",
        t = "Failed to parse post content",
        u = "animating",
        v = "filtered",
        w = "object",
        y = "string",
        z;
    function aa(a) {
        var b = 0;
        return function () {
            return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
        };
    }
    function ba(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : { next: aa(a) };
    }
    function ca(a) {
        for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
        return c;
    }
    var da =
        "function" == typeof Object.defineProperties
            ? Object.defineProperty
            : function (a, b, c) {
                  if (a == Array.prototype || a == Object.prototype) return a;
                  a[b] = c.value;
                  return a;
              };
    function ea(a) {
        a = [w == typeof globalThis && globalThis, a, w == typeof window && window, w == typeof self && self, w == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c;
        }
        throw Error("Cannot find global object");
    }
    var fa = ea(this);
    function A(a, b) {
        if (b)
            a: {
                var c = fa;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c)) break a;
                    c = c[e];
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && da(c, a, { configurable: !0, writable: !0, value: b });
            }
    }
    A("Array.prototype.find", function (a) {
        return a
            ? a
            : function (b, c) {
                  a: {
                      var d = this;
                      d instanceof String && (d = String(d));
                      for (var e = d.length, f = 0; f < e; f++) {
                          var g = d[f];
                          if (b.call(c, g, f, d)) {
                              b = g;
                              break a;
                          }
                      }
                      b = void 0;
                  }
                  return b;
              };
    });
    A("Array.from", function (a) {
        return a
            ? a
            : function (b, c, d) {
                  c =
                      null != c
                          ? c
                          : function (h) {
                                return h;
                            };
                  var e = [],
                      f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
                  if ("function" == typeof f) {
                      b = f.call(b);
                      for (var g = 0; !(f = b.next()).done; ) e.push(c.call(d, f.value, g++));
                  } else for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
                  return e;
              };
    });
    A("Object.is", function (a) {
        return a
            ? a
            : function (b, c) {
                  return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
              };
    });
    A("Array.prototype.includes", function (a) {
        return a
            ? a
            : function (b, c) {
                  var d = this;
                  d instanceof String && (d = String(d));
                  var e = d.length;
                  c = c || 0;
                  for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                      var f = d[c];
                      if (f === b || Object.is(f, b)) return !0;
                  }
                  return !1;
              };
    });
    A("String.prototype.includes", function (a) {
        return a
            ? a
            : function (b, c) {
                  if (null == this) throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
                  if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
                  return -1 !== (this + "").indexOf(b, c || 0);
              };
    });
    blogger
        .templates()
        .compile(
            '\x3c!-- Expected scope: Any. Attributes {format, type} --\x3e\n{template:Adsense}\n{block:HasAdsense}\n<div class=\'adsense\' data-host=\'{AdsenseHost}\' data-client=\'{AdsenseClient}\'\n     data-format=\'{format}\' data-type=\'{type}\'></div>\n{/block:HasAdsense}\n{/template:Adsense}\n\x3c!-- Attributes {class, top, bottom, title} --\x3e\n{template:Ribbon}\n{block:Ifurl}\n<a class="ribbon {class} {block:small}small{/block:small}" title="{title}" href="{url}" itemprop="url">\n{/block:Ifurl}\n{block:IfNoturl}\n<abbr class="ribbon {class} {block:small}small{/block:small}" title="{title}">\n{/block:IfNoturl}\n  <div class="top ribbon-piece">{top}</div>\n  <div class="bottom ribbon-piece">{bottom}</div>\n  <div class="tail">\n    <div class="left ribbon-piece"></div>\n    <div class="right ribbon-piece"></div>\n  </div>\n{block:Ifurl}\n</a>\n{/block:Ifurl}\n{block:IfNoturl}\n</abbr>\n{/block:IfNoturl}\n{/template:Ribbon}\n\n\x3c!-- Attributes {class, empty, value} --\x3e\n{template:Bubble}\n<span class="bubble {block:empty}empty{/block:empty} {class}" title="{title}">\n  <span class="bubble-content">{value}</span>\n  <span class="bubble-tail"></span>\n</span>\n{/template:Bubble}\n\n\x3c!-- Placeholder template for common (hidden) includes across views. --\x3e\n{template:MiscHidden}\n{block:browser:chrome}\n<div id="chromefix">\n\x3c!-- Fix Chrome 12+ bug with GPU accelerated composition causing\nflickering/performance issues. Note: put this last, else text glitches. --\x3e\n</div>\n{/block:browser:chrome}\n{/template:MiscHidden}\n\n{template:Loading}\n<div id="loading">\n  <span>{lang:Loading}</span>\n</div>\n{/template:Loading}\n\n{template:Menu}\n<div class="menu">\n  <span class="menu-heading">{Title}<span class="indicator"></span></span>\n  <ul>\n    {block:Items}\n    <li class="{Label}"><span class="menu-background"></span><a class="menu-item" href="{URL}" target="_self">{Label}</a></li>\n    {/block:Items}\n  </ul>\n</div>\n{/template:Menu}\n\n{template:QuickSearch}\n<div class="quick-search">\n  <ul class="results">\n  {block:Posts}\n    <li class="result" data-identifier="{PostID}">\n      {block:PhotoURL}\n      <img class=\'thumbnail\' src=\'{PhotoURL size="48" square="true"}\' style=\'width: 48px; height: 48px;\'/>\n      {/block:PhotoURL}\n      <span class="date" title="{TimeAgo}">{DayOfMonth}{DayOfMonthSuffix} {ShortMonth}, {Year}</span>\n      <span class="title" title="{Title}">{HTMLEscapedTitle}</span>\n      <div class="snippet">{Snippet term="{HTMLEscapedSearchQuery}" class="term" before="50" after="300" length="300"}</div>\n    </li>\n  {/block:Posts}\n  {block:HasPosts}\n  <li class="server">\n    <span class="message">{lang:Show all SearchResultCount}</span>\n  </li>\n  {/block:HasPosts}\n  {block:IfNotPosts}\n  <li class="server">\n    <span class="message">{lang:No results for SearchQuery2}</span>\n  </li>\n  {/block:IfNotPosts}\n  </ul>\n</div>\n{/template:QuickSearch}\n\n{template:Message}\n<div id="message"><span>{text}</span></div>\n{/template:Message}\n\n{template:EmptyMessage}\n{block:IfNotPostCount}{Message text="{lang:No posts found}"}{/block:IfNotPostCount}\n{/template:EmptyMessage}\n\n{template:AttributionContainer}\n<div id="attribution-container"></div>\n{/template:AttributionContainer}\n\x3c!-- Expected scope: Post --\x3e\n{template:Comments}\n<div class="comments" data-defer="{defer}">\n  <div class="comments-header toggle-switch">\n    {Bubble class="comments-count {class}" value="{CommentCount}" title="{CommentCountWithLabel}"}\n    <h3>\n    {block:CommentCount}{lang:View comments}{/block:CommentCount}\n    {block:IfNotCommentCount}{lang:Add a comment}{/block:IfNotCommentCount}\n    </h3>\n  </div>\n  {BloggerComments}\n</div>\n{/template:Comments}\n\n{template:GComments}\n\x3c!-- G+ comments, no longer available. The template is retained for backwards-compatibility. --\x3e\n{/template:GComments}\n\n{template:PlusCommentsCountBubble}\n\x3c!-- G+ comments, no longer available. The template is retained for backwards-compatibility. --\x3e\n{/template:PlusCommentsCountBubble}\n\n\x3c!-- Comments/Notes: interchangeable --\x3e\n{template:Notes}\n{Comments}\n{/template:Notes}\n\n\x3c!-- Expected scope: Post --\x3e\n{template:BloggerComments}\n<div class="comments-wrapper blogger-comments toggle-container" data-itemid="{PostID}">\n  <div class="comments-content"></div>\n  <div class="comments-footer">\n    {block:BoqCommentIframeForm}\n    <iframe frameborder="0" class="comments-replybox"\n        data-src="{BloggerBase}/comment/frame/{BlogID}?hl={Locale}&po={PostID}&lr={LoginRedirectParam}">\n    </iframe>\n    {/block:BoqCommentIframeForm}\n    {block:IfNotBoqCommentIframeForm}\n    <iframe frameborder="0" class="comments-replybox"\n        data-src="{BloggerBase}/comment-iframe.g?blogID={BlogID}&amp;postID={PostID}"></iframe>\n    {/block:IfNotBoqCommentIframeForm}\n  </div>\n</div>\n{/template:BloggerComments}\n\n\x3c!-- Expected scope: Post --\x3e\n{template:PlusComments}\n\x3c!-- G+ comments, no longer available. The template is retained for backwards-compatibility. --\x3e\n{/template:PlusComments}\n\n{template:CommentBubble}\n{block:Post.CommentCount}\n  {Bubble class="comments-count {class}" value="{Post.CommentCount}" title="{Post.CommentCountWithLabel}"}\n{/block:Post.CommentCount}\n{/template:CommentBubble}\n{template:GadgetDock}\n{block:Gadgets}\n<div id="gadget-dock" class="gadget-notifying"></div>\n{/block:Gadgets}\n{/template:GadgetDock}\n\n\x3c!-- Attributes {id} --\x3e\n{template:GadgetDockItem}\n<div class="gadget-item" data-gadget-id="{id}">\n</div>\n{/template:GadgetDockItem}\n\n\x3c!-- Attributes {title, icon, icon-selected} --\x3e\n{template:GadgetDockItemContents}\n  <div class="gadget-menu">\n    <div class="gadget-icons">\n      <img class="gadget-icon" src="{icon}" />\n      <img class="gadget-icon-selected" src="{icon-selected}" />\n    </div>\n    <span class="gadget-title">{title}</span>\n  </div>\n  <div class="gadget-container">\n    <div class="gadget">\n      <span class="gadget-title">{title}</span>\n      <div class="gadget-content"></div>\n    </div>\n  </div>\n{/template:GadgetDockItemContents}\n\n{template:GadgetDockResizeDetector}\n<iframe class="gadget-resize-detector"></iframe>\n{/template:GadgetDockResizeDetector}\n\x3c!-- Expected scope: Blog --\x3e\n{template:Header}\n<div id="header-container">\n  <div id="header" class="header">\n    <div class="header-bar">\n      {block:BlogID}{BlogHeader}{/block:BlogID}\n      {block:PlusID}{block:IfNotBlogID}{PlusHeader}{/block:IfNotBlogID}{/block:PlusID}\n    </div>\n    <div class="header-drawer sticky open">\n      {block:HasViews}\n      <div id="views" class="{block:HasPages}menu{block:HasPages}{block:IfNotPages}tabs{block:IfNotPages}">\n        <span class="menu-heading">{CurrentView}<span class="indicator"></span></span>\n        <ul>\n          {block:Views}\n          <li class="{Label}"><span class="menu-background"></span><a class="menu-item{block:Current} current{/block:Current}" href="{URL}" target="_self" data-view-name="{Name}">{LocalizedLabel}</a></li>\n          {/block:Views}\n        </ul>\n      </div>\n      {/block:HasViews}\n      {block:HasPages}\n      <div id="pages" class="tabs">\n        <span class="menu-heading">Pages<span class="indicator"></span></span>\n        <ul>\n          {block:Pages}\n          <li><span class="menu-background"></span><a class="menu-item" data-item-type="page" data-id="{ID}" href="{URL}">{Label}</a></li>\n          {/block:Pages}\n        </ul>\n      </div>\n      {/block:HasPages}\n      <div class="blog-admin admin-controls">\n        <a class="new-post" href="{BloggerBase}/post-edit.g?blogID={BlogID}&from=pencil" target="_self" title="{lang:New post}"></a>\n        <a class="dashboard" href="https://www.blogger.com/home" target="_self" title="{lang:Dashboard}"></a>\n      </div>\n    </div>\n  </div>\n</div>\n<script>\n  (function($) {\n    // Make the pages switch between tabs and menu as needed\n    var pages = $(\'#pages\');\n    var tabs = pages.length ? pages : $(\'#views\'); // If no pages, views will be tabs, same resizing applies.\n    if (tabs.length) {\n      function onResize(e) {\n        tabs.removeClass(\'menu\').addClass(\'tabs\');\n        var taken = 0;\n        tabs.parent().children().each(function() {\n          taken += this.offsetWidth;\n        });\n        var overflowing = tabs.parent().width() < (taken + 50); // Add a buffer for safety.\n        overflowing ? tabs.removeClass(\'tabs\').addClass(\'menu\') : tabs.addClass(\'tabs\');\n      }\n      window.addEventListener(\'resize\', onResize);\n      onResize(); // Resize immediately.\n\n      // Mark a page as selected when it is open.\n      var rePage = new RegExp(\'.*/p(/[^/]+.html$)\');\n      $(blogger.ui()).bind(\'select clearselection\', function(e, item) {\n        pages.find(\'.menu-item\').each(function(){\n          var current = false;\n          if (item) {\n            var us = rePage.exec($(this).attr(\'href\'));\n            var them = rePage.exec(item.url);\n            current = !!(us && them && (us[1] == them[1]));\n          }\n          $(this).toggleClass(\'current\', current);\n        });\n      });\n    }\n  })(jQuery);\n\x3c/script>\n{/template:Header}\n\n{template:BlogHeader}\n<span class="title" onclick="$(\'html,body\').stop().animate({\'scrollTop\': 0})">\n  <a href="/" target="_self"><h1 title={JSTitle}>{Title}</h1></a>\n  {block:HasDescription}<h3 title={JSDescription}>{Description}</h3>{/block:HasDescription}\n</span>\n<input type="text" id="search" autocomplete="off" placeholder="{lang:Search}">\n{/template:BlogHeader}\n\n{template:PlusHeader}\n<span class="title" onclick="$(\'html,body\').stop().animate({\'scrollTop\': 0})">\n  <a href="{AuthorURL}" target="_self"><h1 title={JSTitle}>{Title}</h1></a>\n  <div id="follow-author">\n    {PlusBadge id="{PlusID}"}\n  </div>\n</span>\n{/template:PlusHeader}\n{template:Overview}\n<div id="overview">\n  <div class="overview-backdrop"></div>\n</div>\n{/template:Overview}\n\n{template:OverviewItem}\n<div class="overview-panel">\n  <div class="overview-wrap">\n    <div class="overview-inner">\n      <div class="overview-header">\n        <div class="overview-controls-left">\n          <a class="kd-button small left previous {block:IfNotPreviousPost}disabled{/block:IfNotPreviousPost}" title="{lang:Newer}" href="{PreviousPost}"><img width="21" height="21" src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAYUlEQVQ4y2P4//8/A7Uxw6ihuCWxAFZ2DgMgfgCiqWIo1MAPQPwfZDDFhqIZ+IFil2IzECROtqG4DCTbUHwGUmLoA6iBIJyAHnGDx6U0CVOaxT7N0inNchTV8v5oIU0WBgCihhmGBdyx8gAAAABJRU5ErkJggg==\'/>\n          </a>\n          <a class="kd-button small right next {block:IfNotNextPost}disabled{/block:IfNotNextPost}" title="{lang:Older}" href="{NextPost}"><img width="21" height="21" src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAYUlEQVQ4jWP4//8/A7Ux1Q0cRoaysnMYAPEDEM2ABZBrKMjA/0D8AZvBlLj0Ay6DyTIUBPAZTLah+AymyFBcBlNsKNTgBKihIPxg8LmU6mFK9dinSTqlZY6ibt4nF49wQwEZ7RmGkO+jqQAAAABJRU5ErkJggg==\'/>\n          </a>\n        </div>\n        {Sharing url=\'{Permalink}\' httpUrl=\'{HttpPermalink}\' text=\'{Title}\' delay=\'1000\' width="90" disable-twitter="true" disable-facebook="true"}\n        <div class="overview-controls-right">\n          <a class="kd-button small close" title="{lang:Close}" href="/">\n            {OverviewCloseImage}\n          </a>\n        </div>\n      </div>\n      <div class="overview-content" tabindex="0">\n      {Post disable-sharing="false"}\n      </div>\n    </div>\n  </div>\n</div>\n{/template:OverviewItem}\n\n{template:ViewItem}\n<div class="viewitem-panel {block:Placeholder}placeholder{/block:Placeholder}">\n  <div class="viewitem-wrap">\n    <div class="viewitem-background"></div>\n    <div class="viewitem-header"></div>\n    <div class="viewitem-inner">\n      {block:Placeholder}\n      <span class="blogger-gear"></span>\n      {/block:Placeholder}\n      {block:IfNotPlaceholder}\n      <div class="viewitem-content" tabindex="0">\n      {block:Post}{Post}{/block:Post}\n      {block:Page}{Page}{/block:Page}\n      </div>\n      {block:IfNotPlaceholder}\n    </div>\n  </div>\n</div>\n{/template:ViewItem}\n\n{template:Lightbox}\n<div id="lightbox">\n  <div class="lightbox-backdrop"></div>\n  {LightboxItem}\n</div>\n{/template:Lightbox}\n\n{template:LightboxItem}\n<div class="lightbox-panel">\n  <div class="lightbox-wrap">\n    <div class="lightbox-inner">\n      <div class="lightbox-header">\n        <h2 class="lightbox-title" title="{title}">{title}</h2>\n        <div class="lightbox-controls-right">\n          <a class="kd-button small close" title="{lang:Close}" href="/">\n            {OverviewCloseImage}\n          </a>\n        </div>\n      </div>\n      <div class="lightbox-content" tabindex="0">\n        <div class="lightbox-contentwrap"></div>\n      </div>\n    </div>\n  </div>\n</div>\n{/template:LightboxItem}\n\n{template:OverviewCloseImage}\n<img width="21" height="21" src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAK9JREFUeNpjYBgFQxpoAPFqIObBIicBxOuhNFbAjEN8NxA7AbEd1PBfSAbuB2IbIFYB4pWkGHoQiEOAWAvJYCGogSBf3ADiUCD+gk0zI4Eg2A913REgFkEy0BGIX5DqfRB4A8RbkVwsQoyBIMBEIMI+QDGyRV8IxTI+l0qgheEftDD+Raqh6AY6QmM6hBiDcRkKMlAPLQzRw1gNajDRAJQOT+NI4CDXn4fSo2AUoAEAj24p6G8syswAAAAASUVORK5CYII=\'/>\n{/template:OverviewCloseImage}\n\x3c!-- Expected scope: Post --\x3e\n{template:Post}\n  {block:Blogger}{BloggerPost}{/block:Blogger}\n  {block:IfNotBlogger}{GenericPost}{/block:IfNotBlogger}\n{/template:Post}\n\n{template:BloggerPost}\n<div class="article hentry {TagsAsClasses} {block:HasAdsense}has-ads{/block:HasAdsense}" itemscope itemtype="http://schema.org/BlogPosting">\n  {PostMetaData}\n  {block:HasAdsense}\n  <div class="adsense-aside">\n    {Adsense format="vertical"}\n  </div>\n  {/block:HasAdsense}\n  <div class="article-header">{PostHeader}</div>\n  <div class="article-content entry-content" itemprop="articleBody">{Body}</div>\n  <div class="article-footer">\n    {PublishInfo}\n    {GeoLocationInfo}\n    {block:HasTags}\n    <div class="labels" itemprop="keywords">\n      {lang:Labels}: {block:Tags}<a class="label" href="{TagURL}" target="_self">{Tag}</a> {/block:Tags}\n    </div>\n    {/block:HasTags}\n    {block:IfNotdisable-sharing}\n    {Sharing url=\'{Permalink}\' httpUrl=\'{HttpPermalink}\' text=\'{HTMLEscapedTitle}\' width="90" defer="{defer-sharing}" delay=\'1000\'}\n    {/block:IfNotdisable-sharing}\n  </div>\n\n  {block:HasAdsense}\n  <div class="adsense-footer">\n    {Adsense format="horizontal"}\n  </div>\n  {/block:HasAdsense}\n\n  {block:IfNotdisable-comments}\n  {block:HasComments}\n    {Comments defer="{defer-comments}"}\n  {/block:HasComments}\n  {/block:IfNotdisable-comments}\n</div>\n{/template:BloggerPost}\n\n{template:PublishInfo}\n<div class="publish-info">\n  {block:PostAuthorURL}\n    {lang:Posted TimeAgo by PostAuthorName 2}\n  {block:PostAuthorURL}\n  {block:IfNotPostAuthorURL}\n    {lang:Posted TimeAgo by PostAuthorName}\n  {/block:IfNotPostAuthorURL}\n</div>\n{/template:PublishInfo}\n\n{template:PostMetaData}\n  {block:PhotoURL}\n    <meta itemprop="image_url" content="{PhotoURL}"/>\n    <meta itemprop="thumbnailUrl" content="{PhotoURL}"/>\n  {/block:PhotoURL}\n  <meta itemprop="blogId" content="{BlogID}"/>\n  <meta itemprop="postId" content="{PostID}"/>\n{/template:PostMetaData}\n\n{template:GeoLocationInfo}\n{block:HasGeoLocationName}\n<div class="geolocation-info">\n  {lang:Location GeoLocationName}\n</div>\n{/block:HasGeoLocationName}\n{/template:GeoLocationInfo}\n\n{template:GeoLocationURL}\nhttps://maps.google.com/maps?q={URLEncodedGeoLocationName}@{GeoLocationLatitude},{GeoLocationLongitude}&z=10\n{/template:GeoLocationURL}\n\n{template:PostHeader}\n{Ribbon class="date" top="{ShortMonth}" bottom="{DayOfMonth}" title="{TimeAgo}" url="{Permalink}"}\n<h1 class="title entry-title" itemprop="name">\n  {block:RelatedURL}\n  <a href="{RelatedURL}">{ReblogBadge}{HTMLEscapedTitle}</a>\n  {/block:RelatedURL}\n  {block:IfNotRelatedURL}\n  <a href="{Permalink}" rel="bookmark" itemprop="url" data-item-type="post" data-id="{PostID}">{ReblogBadge}{HTMLEscapedTitle}</a>\n  {/block:IfNotRelatedURL}\n  {PostAdmin}\n</h1>\n{/template:PostHeader}\n\n\x3c!-- Expected scope: Page --\x3e\n{template:Page}\n<div class="article hentry {TagsAsClasses}" itemscope itemtype="http://schema.org/BlogPosting">\n  <div class="article-header">\n    <h1 class="title entry-title">\n      <a href="{Permalink}" rel="bookmark" itemprop="url" data-item-type="page" data-id="{PageID}">{HTMLEscapedTitle}</a>\n      <span class="blog-admin"><a class="edit" href="{BloggerBase}/page-edit.g?blogID={BlogID}&pageID={PageID}&from=pencil" target="_self" title="Edit"></a></span>\n    </h1>\n  </div>\n  <div class="article-content entry-content" itemprop="articleBody">{Body}</div>\n  <div class="article-footer"></div>\n</div>\n{/template:Page}\n\n{template:PostAdmin}\n{block:Blogger}\n<span class="blog-admin"><a class="edit" href="{BloggerBase}/post-edit.g?blogID={BlogID}&postID={PostID}&from=pencil" target="_self" title="Edit"></a></span>\n{/block:Blogger}\n{/template:PostAdmin}\n\n{template:GenericPost}\n<div class="article hentry" itemscope itemtype="http://schema.org/BlogPosting">\n  <div class="article-header">{PostHeader}</div>\n  <div class="article-content entry-content" itemprop="articleBody">\n    {Body}\n    {block:Attachments}\n      {block:Photo}\n        <img src="{PhotoURL-HighRes}" width="{PhotoWidth}" height="{PhotoHeight}" alt="{Caption}" style="display: block;"/>\n      {/block:Photo}\n      {block:Video}{Video}{/block:Video}\n      {block:Article}\n      <div>\n        <h4>\n          <a href="{URL}" title="{Caption}">{Caption}</a>\n        </h4>\n        {block:HasContent}\n          <p>{Content}</p>\n        {/block:HasContent}\n      </div>\n      {/block:Article}\n    {/block:Attachments}\n  </div>\n  <div class="article-footer">\n    {PublishInfo}\n    {GeoLocationInfo}\n    {SharePlusOne url="{Permalink}" text="{HTMLEscapedTitle}"}\n  </div>\n  {block:HasComments}\n    {Comments defer="true"}\n  {/block:HasComments}\n</div>\n{/template:GenericPost}\n\n{template:ReblogBadge}\n{block:Flickr}\n<span class="reblog-badge">\n<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQA2LzI0LzA59sFr4wAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAG9SURBVDiNlZK9ahtBFIXPDOP9wzvKSsRNcHCCA8EpQtwtfgEX9iMImbR5gDxJKhfCpHSrJg9g0ikEEdwoEagTSLt4QLE8O/dOCuEVKgLe2x7Ouee7M2I8Hre99wNmztFgpJTfhRBnylo7yLIsz7IMQognmb33KMsyL8tyoKy1eRzHqKqqSQHEcYzZbJYr5xyEEGDmRgFCCDjnoKqqAhE1Mj9OVVXrgKbbtwKcc2Bm3Pz8g96XIcxfB50oXH06xsn71wCA6c0vTHpfweYBUod4ddXFy5N3cM5BPgb0Lscw4QHQfgMTHuDi8jeYGcyMoneNQ5PiLZ7j0KQoLq7BzJsbMDNM8AIQsq535+Mabd/EkNg88f6dAjNvI2idwtxvbtGKZR2Q6BQwD7UmWmHdQBIRmBn97h50ugvsJNDpLvrdvRoh6J8j0gkiKEQ6wU7/HMwMIoKy1oKIcPRshdvPLUi53myMAVEEAFgeJdC3H7e0iAjW2g1CEARYrVZ1zSAIaoT/ac45KCLCfD5Hu91u9AeKolgjeO+Hk8nkmIjQ6XSeZF4sFphOp/DeD5VS6nS5XH4bjUYfmjRQSv0Iw/D0HxnKDX6sx/D3AAAAAElFTkSuQmCC\'/>\n</span>\n{/block:Flickr}\n{block:Plus}\n<span class="reblog-badge">\n<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAB1klEQVQoU2O4621JEmK442Vxw9P8Jm501skQiM45GQLVAFUy3PKwu1M/6ePxk9/e/f0PBx+uvKr0vuZuBkSnHQyAwmccDYHsq25mDK8uvfm+qeSGh8nlwMCnex4B5X4dar7uZnIZhk466AMFTznqA0UuuZow/P9//qGf0SUXo4tA5BH77iVQ9vPrEssT9npwBBSCs4EaDtx2NTjnBEW3lt0HSn9dFHnK0xLIwARADU8eJeidttc7ZQdC51p2gayYGXzEWhuOgCIwtg7D/7//v63POmGjcwyMLsy48P/XpbvBUC5Q5JCVFlADkASyj9poM3z9BuR+eruo6Gyw69nKCZ/e3HtWbXvQShOO9llqAFXstdA4YKkJRAwnguNuzlvyYtfez++A4t9f1NvtNVPfg4R2mapBEESQ4bC5+g4T1R0mwU/e/P/3/8OjAhMwFydiOGCiutVQeYuh7tmNL/7//P//x90HpU5gEeyI4Xzb1Ef7DzzbuOzBmmWPTz74BwrI9y+7QrfoK25ERRvAXIave3sOuamv05VfD0Jah7q3fv8F0nM3WQcsgkAQNQwnTORXacsio82Fa38AA25xOJo4hMuwT1durbbMGhQU+fDr/zddjqiCUDUAmzuTnmNga6gAAAAASUVORK5CYII=\'/>\n</span>\n{/block:Plus}\n{block:YouTube}\n<span class="reblog-badge">\n<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdElEQVQ4EcVTPUsDQRB9u7eJF0KEBATBIBoRUdQmhfgDrMRG1NIfYSHWIkRREPEDBX+HCUSbKKm0EhTBKrUkRcLlvNxmnY0h7JGYJoUDc8y+efNmZu+OKaUwiPFBinUtKyYRYfXoLVOYofMCeVgn+tgr5TwovC2Va9vsKR7NELDXp6Bf6pBLplZ8kjNdhkOYurhGKJUK4CZHx7qWewrjDephurRtJDa2sHhfQHx9M5AzebpWCyTIYXq9CbiuC49zTJ6eY+LkDP6QHeC0+QnhAVb3kgqO43Tg2OoaklLic3eng7UDSzR6fAeqGRSolEooXF0i2YOrJ5CkFphC0QXpFbS957J4zBxg1qOVGGthxkMK2qVMwIgBQvlNONUqHo6P8JW9w7zg1IG17sDkUVxmN8ORZwrSZkKPVPR8TAsLo7yrq0l9Eb5SeRIPCGjGcvh3K/2+/zSFvPiuuvtWzB4j0lyb2CVmCHxQXGudGXIVqmX//jf+AF6oryUyXsGzAAAAAElFTkSuQmCC\'/>\n</span>\n{/block:YouTube}\n{/template:ReblogBadge}\n\x3c!-- Expected scope: Any. Attributes {defer} --\x3e\n\x3c!-- TODO: revisit the disable logic --\x3e\n{template:Sharing}\n<div class="share-controls {block:defer}defer{/block:defer} {block:delay}delay{/block:delay}" data-defer="{defer}" data-delay="{delay}">\n{block:IfNotdisable-twitter}{ShareTwitter}{/block:IfNotdisable-twitter}\n{block:IfNotdisable-facebook}{ShareFacebook}{/block:IfNotdisable-facebook}\n</div>\n{/template:Sharing}\n\n{template:ShareTwitter}\n<span data-href="http://twitter.com/share" class="share-twitter twitter-share-button {block:defer}defer{/block:defer}" data-url="{url}" data-count="{count}" data-size="{size}" data-text={JSPlaintexttext}></span>\n{/template:ShareTwitter}\n\n{template:ShareFacebook}\n<span class="share-facebook {block:defer}defer{/block:defer}" data-url="{httpUrl}" data-count="{count}" data-layout="{layout}" data-text={JSPlaintexttext}></span>\n{/template:ShareFacebook}\n\n{template:Welcome}\n<style>\n  {LoadingCSS}\n\n  body {\n    background-color: #eee;\n  }\n  div {\n    height: 100px;\n    left: 50%;\n    margin-left: -50px;\n    margin-top: -50px;\n    text-align: center;\n    top: 50%;\n    width: 100px;\n    position: fixed;\n  }\n\n  .blogger-gear {\n    margin: 2px auto;\n  }\n\n  {text:Custom CSS}\n</style>\n<div>\n  <span class="blogger-gear"></span>\n</div>\n{/template:Welcome}\n\n{template:ErrorMessage}\n<style>\n  {CoreCSS}\n\n  #main {\n    background-color: #eee;\n    color: #e4e4e4;\n    font-size: 18px;\n    height: 100%;\n    left: 0;\n    overflow: hidden;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  #main .fourOhFour {\n    color: #e0e0e0;\n  }\n\n  #message {\n    background-color: white;\n    {css-box-shadow value="inset 0px 0px 10px rgba(0, 0, 0, 0.6)"}\n    color: #cb4534;\n    font-size: 20px;\n    left: 50%;\n    margin-left: -200px;\n    margin-top: -50px;\n    overflow: hidden;\n    padding: 15px;\n    text-align: center;\n    text-shadow: 0px 1px 3px #999;\n    top: 50%;\n    width: 400px;\n    position: absolute;\n    {css-transform value="rotateZ(3deg)"}\n    {css-crossbrowser property="transform-style" value="preserve-3d"}\n  }\n\n  a, a:hover, a:visited {\n    color: #4d90fe;\n    text-decoration: none;\n  }\n  a:hover {\n    text-decoration: underline;\n  }\n</style>\n<div id="main">\n  <div id="message">\n    <span>{Value}</span>\n    <a id="home" href="{BlogURL}" target="_self" title="{lang:Home}">{lang:Home}</a>\n  </div>\n</div>\n{MiscHidden}\n<script>\n  const homelink = document.querySelector(\'#home\');\n  // Persist some blitz parameters of the current url when navigating home.\n  homelink.onclick = function() {\n    const url = blogger.tools.path.decode(homelink.getAttribute(\'href\'));\n    const currentUrl = blogger.tools.path.decode();\n\n    for (let prop in currentUrl.params) {\n      if (!url.params[prop]) {\n        url.params[prop] = currentUrl.params[prop];\n      }\n    }\n    window.location.href = url.encode();\n    return false;\n  };\n\n  // Let\'s make the 404 look more interesting.\n  const fragment = document.createDocumentFragment();\n  const parts = \'110010100\'; // 404 in binary.\n  const length = parts.length;\n  let position = 0;\n  let current = [];\n  for (let i = 0; i < 55555; i++) { // Make it long enough to fill the screen.\n    if (position == length) {\n      if (Math.random() > 0.6) { // Only add explicit 404 occasionally.\n        current.push(\' \');\n        fragment.appendChild(document.createTextNode(current.join(\'\')));\n        current = [\' \'];\n        const fourOhFour = document.createElement(\'span\');\n        fourOhFour.innerText = \'404\';\n        fourOhFour.className = \'fourOhFour\';\n        fragment.appendChild(fourOhFour);\n      }\n      position = 0;\n    } else {\n      if (Math.random() > 0.6) { // Randomly add spaces to make uneven.\n        current.push(parts[position++]);\n      } else {\n        current.push(\' \');\n      }\n    }\n  }\n  document.getElementById(\'main\').appendChild(fragment);\n\x3c/script>\n{/template:ErrorMessage}\n'
        );
    blogger
        .templates()
        .compile(
            '{template:BasicCSS}\n{CoreCSS}\n{ButtonCSS}\n{RibbonCSS}\n{BubbleCSS}\n{LoadingCSS}\n{MessageCSS}\n{SearchCSS}\n{PrintCSS}\n{AttributionContainerCSS}\n{/template:BasicCSS}\n\n{template:CoreCSS}\n\n/* Begin: reset styles */\n\nbody,div,ul,ol,li,input,textarea,p,abbr {\n  margin:0;\n  outline: none;\n  padding:0;\n}\nol,ul {\n  list-style:none;\n}\nh1,h2,h3,h4,h5,h6 {\n  font-size: 100%;\n  font-weight: normal;\n  margin: 0;\n  padding: 0;\n}\nimg {\n  border: none;\n}\n\n/* End: reset */\n\n#chromefix {\n  -webkit-transform: perspective(1); /* Chrome 12/13/14 flicker fix. */\n}\n\nbody {\n  background-color: {color:Background};\n  {block:image:Background}\n  background-image: url({image:Background});\n  background-position: left top;\n  background-repeat: no-repeat;\n  {/block:image:Background}\n  {block:text:BodyBackgroundCSS}\n  background: {text:BodyBackgroundCSS}; /* Override everything. */\n  background-color: {color:Background};\n  {/block:text:BodyBackgroundCSS}\n}\n\nbody, input, textarea {\n  font-family: {font:Text};\n  font-size: 14px;\n}\n\na,\na:focus {\n  color: {color:Link};\n  font-family: {font:Link};\n  outline: none;\n  text-decoration: none;\n  {css-transition value="color .3s"}\n}\n\na:visited {\n  color: {color:Link Visited};\n}\n\na:hover {\n  color: {color:Link Hover};\n  text-decoration: underline;\n}\n\nabbr.published {\n  outline: none;\n  text-decoration: none;\n  border: none;\n}\n\n.title {\n  color: {color:Post Title};\n  font-family: {font:Post Title};\n  font-size: 14px;\n}\n\n.title a {\n  color: {color:Post Title};\n  font-family: {font:Post Title};\n}\n\n/* Way to prevent any css animations during dom manip. */\n.instant, .instant * {\n  {css-transition value="none !important"}\n  {css-crossbrowser property="animation-iteration-count" value="0 !important"}\n}\n\n.adsense {\n  margin: 0 auto;\n  text-align: center;\n}\n\n/* Admin restricted links - obviously verified on server, but for easy templates. */\n\n.blog-admin,\n.item-control {\n  display: none;\n}\n\n@media only screen and (min-width: 768px) and (max-width: 1024px) {\n  .blog-admin,\n  .item-control {\n    margin-left: 14px;\n  }\n}\n\n#injected-iframe {\n  z-index: 9999 !important;\n}\n\n{/template:CoreCSS}\n\n{template:RibbonCSS}\n\n.ribbon {\n  color: #eee;\n  cursor: default;\n  display: inline-block;\n  text-align: center;\n  width: 35px;\n}\na.ribbon {\n  color: #eee;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.ribbon .ribbon-piece {\n  background-color: {color:Ribbon};\n  {css-box-shadow value="0 0 5px rgba(0, 0, 0, 0.2)"}\n  {css-transition value="background-color 0.5s ease-in"}\n}\n\n/* On hover color change. */\na.ribbon:hover .ribbon-piece {\n  background-color: {color:Ribbon Hover};\n  color: #eee;\n}\n\n.ribbon .top {\n  border-bottom: solid 1px rgba(255, 255, 255, 0.6);\n  {css-border-radius value="1px 1px 0px 0px"}\n  font-size: 11px;\n  padding: 4px 0;\n  position: relative;\n  text-transform: uppercase;\n}\n\n.ribbon .bottom {\n  font-size: 17px;\n  padding: 5px 0;\n}\n\n.ribbon .tail {\n  height: 10px;\n  overflow: hidden;\n  position: relative;\n}\n\n.ribbon .tail .left,\n.ribbon .tail .right {\n  height: 10px;\n  position: absolute;\n  top: -10px;\n  width: 50px;\n}\n\n.ribbon .tail .left{\n  left: -9px;\n  {css-transform value="rotate(-25deg)"}\n}\n\n.ribbon .tail .right{\n  right: -9px;\n  {css-transform value="rotate(25deg)"}\n}\n\n/* Do this with a transform? */\n.ribbon.small {\n  width: 25px;\n}\n.ribbon.small .top {\n  font-size: 9px;\n  padding: 2px 0;\n}\n.ribbon.small .bottom {\n  font-size: 12px;\n  padding: 3px 0;\n}\n.ribbon.small .tail {\n  height: 6px;\n}\n.ribbon.small .tail .left,\n.ribbon.small .tail .right {\n  height: 6px;\n  top: -7px;\n  width: 40px;\n}\n.ribbon.small .tail .left {\n  left: -6px;\n}\n.ribbon.small .tail .right {\n  right: -6px;\n}\n\n{/template:RibbonCSS}\n\n{template:BubbleCSS}\n\n.bubble {\n  background-color: {color:Bubble};\n  background-position: center center;\n  border-radius: 3px;\n  border: solid 1px {color:Bubble};\n  color: white;\n  cursor: default;\n  display: inline-block;\n  font-size: 12px;\n  padding: 2px 0;\n  position: relative;\n  text-align: center;\n  {css-transition-property value="background-color, border-color"}\n  {css-transition-duration value="0.5s"}\n  {css-transition-timing-function value="ease-in"}\n  width: 26px;\n}\n\n.bubble.light {\n  background-color: {color:Bubble lighten="45%"};\n  border-color: {color:Bubble lighten="45%"};\n}\n\n.bubble.empty {\n  color: {color:Bubble};\n  border: solid 1px {color:Bubble lighten="20%"};\n  {css-box-shadow value="none"}\n  background-color: white;\n}\n\n.bubble .bubble-tail,\n.bubble.empty .bubble-tail:after {\n  border-color: {color:Bubble} transparent transparent transparent;\n  border-style:solid;\n  border-width: 5px;\n  bottom: -10px;\n  content: \'\';\n  height: 0;\n  left: 50%;\n  margin-left: -5px;\n  position: absolute;\n  {css-transition value="border-color 0.5s ease-in"}\n  width: 0;\n}\n\n.bubble.light .bubble-tail {\n  border-color: {color:Bubble lighten="45%"} transparent transparent transparent;\n}\n\n.bubble.empty .bubble-tail {\n  border-color: {color:Bubble lighten="20%"} transparent transparent transparent;\n}\n\n.bubble.empty .bubble-tail:after {\n  left: 0;\n  top: -6px;\n  border-color: white transparent transparent transparent;\n}\n\n/* On hover color change.\n.bubble:hover {\n  background-color: #d14836;\n  border-color: #d14836;\n}\n\n.bubble.empty:hover {\n  /*background-color: white;\n  border-color: #d14836;\n  color: #d14836;\n}\n\n.bubble:hover .bubble-tail {\n  border-color: #d14836 transparent transparent transparent !important;\n}\n*/\n\n{/template:BubbleCSS}\n\n{template:SharingCSS}\n\n.share-controls {\n  overflow: hidden;\n  text-align: center;\n  white-space: nowrap;\n}\n\n.share-controls span,\n.share-controls iframe {\n  height: 20px !important;\n}\n\n.share-controls .share-plusone,\n.share-controls .share-twitter,\n.share-controls .share-facebook {\n  /* PlusOne tries to reset a lot of settings, don\'t let it. */\n  background-repeat: no-repeat !important;\n  background-position: left center !important;\n  display: inline-block;\n  margin: 0;\n}\n\n.share-controls .share-plusone {\n  height: 20px;\n  /* Don\'t touch anything other than min-width, causes havoc with +1 */\n  min-width: 90px;\n  {css-transition value="min-width 0.3s"}\n}\n.share-controls .share-plusone.defer {\n  min-width: 34px;\n}\n.share-controls .share-plusone.delay {\n  min-width: 90px;\n}\n\n.share-controls .share-twitter {\n  height: 20px;\n  width: 110px;\n  {css-transition value="width 0.3s"}\n}\n.share-controls .share-twitter.defer {\n  width: 57px;\n}\n.share-controls .share-twitter.delay {\n  width: 110px;\n}\n\n.share-controls .share-facebook {\n  height: 20px;\n  width: 90px;\n  {css-transition value="width 0.3s"}\n}\n.share-controls .share-facebook.defer {\n  width: 51px;\n}\n.share-controls .share-facebook.delay {\n  width: 90px;\n}\n\n{/template:SharingCSS}\n\n{template:LoadingCSS}\n\nbody.loading #loading {\n  opacity: 0.75;\n  margin-bottom: 0;\n}\n\n#loading {\n  background-color: #000;\n  border-radius: 6px 6px 0px 0px;\n  border: solid 1px #666;\n  border-bottom: none;\n  bottom: 0;\n  box-shadow: 0 0 4px #333;\n  color: white;\n  font-size: 18px;\n  left: 50%;\n  margin-bottom: -50px;\n  margin-left: -60px;\n  opacity: 0;\n  padding: 5px 0px;\n  position: fixed;\n  text-align: center;\n  {css-transition value="opacity 0.5s, margin-bottom 0.5s"}\n  {css-transition-delay value="279ms"}\n  width: 120px;\n  z-index: 999;\n}\n\n#loading span {\n  background-repeat: no-repeat;\n  background-position: right center;\n  background-image: url(data:image/gif;base64,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);\n  display: inline-block;\n  height: 30px;\n  line-height: 30px;\n  padding-right: 30px;\n}\n\n#loading span:after {\n  content: \'...\';\n}\n\n.blogger-gear {\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-image: url(data:image/gif;base64,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);\n  display: inline-block;\n  height: 95px;\n  width: 95px;\n}\n\n{/template:LoadingCSS}\n\n{template:ButtonCSS}\n.kd-button {\n  background-color: #f5f5f5;\n  background-image: -webkit-gradient(linear,left top,left bottom,from(#f5f5f5),to(#f1f1f1));\n  background-image: -webkit-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -moz-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -ms-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: -o-linear-gradient(top,#f5f5f5,#f1f1f1);\n  background-image: linear-gradient(top,#f5f5f5,#f1f1f1);\n  border: 1px solid #DCDCDC;\n  border: 1px solid rgba(0,0,0,0.1);\n  {css-border-radius value="2px"}\n  {css-box-sizing value="content-box"}\n  color: #222;\n  cursor:default;\n  display: inline-block;\n  font-size: 11px;\n  font-weight: bold;\n  height: 27px;\n  line-height: 27px;\n  min-width: 54px;\n  padding: 0 8px;\n  text-align: center;\n  {css-transition value="all 0.218s"}\n  {css-user-select value="none"}\n}\n.kd-button:hover {\n  background-color: #f8f8f8;\n  background-image: -webkit-gradient(linear,left top,left bottom,from(#f8f8f8),to(#f1f1f1));\n  background-image: -webkit-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: -moz-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: -ms-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: -o-linear-gradient(top,#f8f8f8,#f1f1f1);\n  background-image: linear-gradient(top,#f8f8f8,#f1f1f1);\n  border: 1px solid #C6C6C6;\n  {css-box-shadow value="0px 1px 1px rgba(0,0,0,0.1)"}\n  color: #222;\n  {css-transition value="all 0.0s"}\n}\n.kd-button:active {\n  background-color: #f6f6f6;\n  background-image: -webkit-gradient(linear,left top,left bottom,from(#f6f6f6),to(#f1f1f1));\n  background-image: -webkit-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: -moz-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: -ms-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: -o-linear-gradient(top,#f6f6f6,#f1f1f1);\n  background-image: linear-gradient(top,#f6f6f6,#f1f1f1);\n  border: 1px solid #C6C6C6;\n  {css-box-shadow value="inset 0px 1px 2px rgba(0,0,0,0.1)"}\n  color: #333;\n}\n\n.kd-button:focus, .kd-button.right:focus, .kd-button.left:focus{\n  border: 1px solid #4d90fe;\n  outline: none;\n  z-index: 4 !important;\n}\n\n.kd-button.left {\n  {css-border-radius value="2px 0 0 2px"}\n  border-right-color: transparent;\n  margin-right: 0;\n}\n.kd-button.left:hover {\n  border-right: 1px solid #c6c6c6;\n}\n.kd-button.right {\n  {css-border-radius value="0 2px 2px 0"}\n  margin-left:-5px;\n}\n\n.kd-button.right:hover {\n  border-left: 1px solid #c6c6c6;\n}\n.kd-button img {\n  display: inline-block;\n  margin: -3px 0 0;\n  *margin:4px 0 0; /*IE7*/\n  opacity: 0.55;\n  vertical-align: middle;\n}\n\n.kd-button.selected img {\n  opacity: 0.9;\n}\n.kd-button:hover img {\n  opacity: 0.72;\n}\n.kd-button:active img {\n  opacity: 1.0;\n}\n/*disabled buttons*/\n.kd-button.disabled,\n.kd-button.disabled:hover,\n.kd-button.disabled:active {\n  background: #FFF;\n  border: 1px solid #f3f3f3;\n  border: 1px solid rgba(0,0,0,0.05);\n  color: #b8b8b8;\n  cursor: default;\n  pointer-events: none;\n}\n.kd-button.disabled:active{\n  {css-box-shadow value="inset 0px 1px 2px rgba(0,0,0,0.1)"}\n}\n.kd-button.disabled img {\n  opacity: 0.5;\n}\n.kd-button.small {\n  min-width: 36px;\n  padding: 0;\n  width: 36px;\n}\n{/template:ButtonCSS}\n\n{template:MessageCSS}\n#message {\n  position: fixed;\n  text-align: center;\n  top: 40%;\n  width: 100%;\n}\n#message span {\n  background-color: white;\n  border-radius: 6px;\n  color: #333;\n  box-shadow: 0 0 4px #666;\n  display: inline-block;\n  font-family: arial;\n  font-size: 16px;\n  padding: 15px;\n  white-space: no-wrap;\n}\n{/template:MessageCSS}\n\n{template:SearchCSS}\n\n.quick-search {\n  background-color: white;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  {css-border-radius value="5px"}\n  {css-box-shadow value="0 4px 16px rgba(0, 0, 0, 0.2)"}\n  padding: 5px;\n  width: 450px;\n  z-index: 10001;\n}\n\n.quick-search li {\n  cursor: pointer;\n}\n\n.quick-search .result {\n  border: solid 1px transparent;\n  clear: both;\n  font-size: 13px;\n  height: 48px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 7px;\n  position: relative;\n}\n\n.quick-search .title {\n  display: inline-block;\n  font-size: 15px;\n  left: 60px;\n  overflow: hidden;\n  position: absolute;\n  right: 130px;\n  text-overflow: ellipsis;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);\n  top: 5px;\n  white-space: nowrap;\n}\n\n.quick-search .date {\n  color: #dd4b39;\n  font-size: 15px;\n  margin-left: 5px;\n  position: absolute;\n  right: 5px;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  top: 5px;\n}\n\n.quick-search .snippet {\n  color: #888;\n  left: 60px;\n  line-height: 1.25;\n  max-height: 35px;\n  overflow: hidden;\n  position: absolute;\n  right: 5px;\n  text-align: justify;\n  top: 24px;\n}\n\n.quick-search .thumbnail {\n  {css-border-radius value="5px"}\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n  left: 5px;\n  margin-right: 7px;\n  position: absolute;\n  top: 5px;\n}\n\n.quick-search .result:hover,\n.quick-search .result.active {\n  background-color: #f9edbe;\n  border: solid 1px #f0c36d;\n  {css-box-shadow value="0 2px 4px rgba(0, 0, 0, 0.2)"}\n}\n\n.quick-search .result:hover .snippet,\n.quick-search .result.active .snippet {\n  color: #333;\n}\n\n.quick-search .result .term {\n  background-color: #f9edbe;\n  color: black;\n}\n\n.quick-search .result:hover .term,\n.quick-search .result:active .term {\n  background-color: transparent;\n}\n\n.quick-search .server {\n  border: solid 1px transparent;\n  margin: -1px;\n  padding: 10px;\n  text-align: center;\n}\n\n.quick-search li + .server {\n  border-top: solid 1px #ddd;\n}\n\n.quick-search .server:hover,\n.quick-search .server.active {\n  background-color: #eaeaea;\n  border: solid 1px #ccc;\n  {css-box-shadow value="0 2px 4px rgba(0, 0, 0, 0.2)"}\n}\n\n.quick-search .message {\n  color: #4d90fe;\n  display: block;\n  font-size: 16px;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\n.quick-search .search_query {\n  color: black;\n}\n\n.quick-search .count {\n  color: #222;\n  display: block;\n  font-size: 14px;\n}\n\n#search.searching {\n  background-image: url(data:image/gif;base64,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);\n  background-position: center right;\n  background-repeat: no-repeat;\n  {css-transition value="none"}\n}\n{/template:SearchCSS}\n\n{template:AttributionContainerCSS}\n#attribution-container {\n  padding: 8px;\n}\n{/template:AttributionContainerCSS}\n{template:CommentCSS}\n\n.comments {\n  clear: both;\n  margin-top: 10px;\n}\n\n.comments .comments-header,\n.comments .comments-footer {\n  text-align: center;\n}\n\n.comments .comments-header {\n  margin-bottom: 10px;\n}\n\n.comments .comments-header .comments-count {\n  top: -2px;\n}\n\n.comments .comments-header h3 {\n  display: inline-block;\n  padding: 5px;\n}\n\n@media only screen and (max-device-width: 1024px) {\n  .comments .comments-header h3 {\n    color: #222;\n    font-family: arial,sans-serif;\n    text-decoration: underline;\n  }\n}\n.comments .toggle-switch:hover h3 {\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n/* Added by blogger for ghosted/removed comments .*/\n.comments .deleted-comment {\n  font-style: italic;\n  opacity: 0.5;\n}\n\n/* While loading, hide the comment count, and then show an indicator. */\n.comments.loading .comments-header .comments-count .bubble-content {\n  visibility: hidden;\n}\n\n.comments.loading .comments-header .comments-count {\n  background-image: url(data:image/gif;base64,R0lGODlhEAAQAPQAAGZmZv///2lpadzc3K+vr/r6+ufn5319fZmZmfDw8Le3t8DAwHV1daOjo4eHh9LS0srKygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==);\n  background-position: center center;\n  background-repeat: no-repeat;\n  {css-transition value="none"}\n}\n\n.blogger-comments .comments-content {\n  background-color: whitesmoke;\n  font-size: 13px;\n  margin-bottom: 16px;\n  {css-border-radius value="10px"}\n  {css-transition value="all 0.5s ease-in"}\n}\n\n@media only screen and (max-device-width: 1024px) {\n  .blogger-comments .comments-content {\n    background-color: #f1f1f1;\n    border: 1px solid #bbb;\n    {css-border-radius value="0"}\n  }\n}\n.blogger-comments .comments-content .comment-actions {\n  color: #999;\n}\n.comments .comment .comment-actions a {\n  padding-top: 5px;\n  padding-right: 5px;\n}\n.comments .comment .comment-actions a:hover {\n  text-decoration: underline;\n}\n.blogger-comments .comments-content .secondary-link {\n  color: #69c;\n}\n.blogger-comments .comments-content .comment-thread {\n  list-style-type: none;\n  padding: 0;\n  text-align: left;\n}\n.blogger-comments .comments-content .inline-thread {\n  padding: 0.5em;\n}\n.blogger-comments .comments-content .comment-thread {\n  margin: 8px;\n}\n.blogger-comments .comments-content .comment-thread:empty {\n  display: none;\n}\n.blogger-comments .comments-content .comment-replies {\n  background-color: #ebebeb;\n  margin-top: 1em;\n  margin-left: 36px;\n  {css-border-radius value="10px"}\n}\n.blogger-comments .comments-content .comment {\n  border-bottom: 1px solid #e3e3e3;\n  margin-bottom: 16px;\n  padding-bottom: 8px;\n}\n.blogger-comments .comments-content .comment:first-child {\n  padding-top: 16px;\n}\n.blogger-comments .comments-content .comment:last-child {\n  border-bottom: 0;\n  padding-bottom: 0;\n}\n.blogger-comments .comments-content .comment-body {\n  position: relative;\n}\n.blogger-comments .comments-content .user {\n  font-style: normal;\n  font-weight: bold;\n}\n.blogger-comments .comments-content .datetime {\n  margin-left: 6px;\n}\n.blogger-comments .comments-content .comment-header,\n.blogger-comments .comments-content .comment-content {\n  margin: 0 0 8px;\n}\n.blogger-comments .comments-content .comment-content {\n  text-align: justify;\n}\n.blogger-comments .comments-content .owner-actions {\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.blogger-comments .comments-replybox {\n  border: none;\n  height: 250px;\n  width: 100%;\n}\n\n.blogger-comments .comment-replybox-single {\n  margin-top: 5px;\n  margin-left: 48px;\n}\n.blogger-comments .comment-replybox-thread {\n  margin-top: 5px;\n}\n\n.blogger-comments .comments-content .user,\n.blogger-comments .comments-content .user a {\n  color: {color:Text};\n}\n\n.blogger-comments .icon.blog-author {\n  width: 18px;\n  height: 18px;\n  display: inline-block;\n  background-repeat: no-repeat;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9sLFwMeCjjhcOMAAAD+SURBVDjLtZSvTgNBEIe/WRRnm3U8RC1neQdsm1zSBIU9VVF1FkUguQQsD9ITmD7ECZIJSE4OZo9stoVjC/zc7ky+zH9hXwVwDpTAWWLrgS3QAe8AZgaAJI5zYAmc8r0G4AHYHQKVwII8PZrZFsBFkeRCABYiMh9BRUhnSkPTNCtVXYXURi1FpBDgArj8QU1eVXUzfnjv7yP7kwu1mYrkWlU33vs1QNu2qU8pwN0UpKoqokjWwCztrMuBhEhmh8bD5UDqur75asbcX0BGUB9/HAMB+r32hznJgXy2v0sGLBcyAJ1EK3LFcbo1s91JeLwAbwGYu7TP/3ZGfnXYPgAVNngtqatUNgAAAABJRU5ErkJggg==);\n  margin: 0 0 -4px 6px;\n}\n\n.blogger-comments .comments-content .loadmore a {\n  background: #fafafa;\n  border-top: 1px solid #e3e3e3;\n  display: block;\n  padding: 10px 16px;\n  text-align: center;\n}\n\n.blogger-comments .thread-toggle {\n  cursor: pointer;\n  display: inline-block;\n  color: {color:Link};\n}\n\n.blogger-comments .continue {\n  cursor: pointer;\n}\n\n.blogger-comments .continue a {\n  color: #888;\n  display: block;\n  padding: 0.5em;\n  background: white;\n  border: 1px solid #CCC;\n  {css-box-shadow value="inset 1px 1px 3px #888"}\n}\n\n.blogger-comments .comments-content .loadmore:hover a {\n  background: #f1f1f1;\n  border-top: 1px solid #fff;\n}\n\n.blogger-comments .comments-content .loadmore {\n  cursor: pointer;\n  max-height: 3em;\n}\n\n.blogger-comments .comments-content .loadmore.loaded {\n  max-height: 0px;\n  opacity: 0;\n  overflow: hidden;\n  {css-transition value="all 0.5s ease-in"}\n}\n\n@media only screen and (max-device-width: 1024px) {\n  .blogger-comments .comments-content .loadmore a,\n  .blogger-comments .comments-content .loadmore:focus a {\n    background: none;\n    border-top: 1px solid #ccc;\n  }\n}\n.blogger-comments .thread-chrome.thread-collapsed {\n  display: none;\n}\n\n.blogger-comments .thread-toggle {\n  display: inline-block;\n}\n\n.blogger-comments .thread-toggle .thread-arrow {\n  display: inline-block;\n  height: 6px;\n  width: 7px;\n  overflow: visible;\n  margin: 0.3em;\n  padding-right: 4px;\n}\n\n.blogger-comments .thread-expanded .thread-arrow {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVR42mNgwAfKy8v/48I4FeA0AacVDFQBAP9wJkE/KhUMAAAAAElFTkSuQmCC") no-repeat scroll 0 0 transparent;\n}\n\n.blogger-comments .thread-collapsed .thread-arrow {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJUlEQVR42mNgAILy8vL/DLgASBKnApgkVgXIkhgKiNKJ005s4gDLbCZBiSxfygAAAABJRU5ErkJggg==") no-repeat scroll 0 0 transparent;\n}\n\n.blogger-comments .avatar-image-container {\n  float: left;\n  width: 36px;\n  max-height: 36px;\n  overflow: hidden;\n}\n\n.blogger-comments .avatar-image-container img {\n  width: 36px;\n}\n\n.blogger-comments .comment-block {\n  margin-left: 48px;\n  position: relative;\n}\n\n/* Responsive styles. */\n@media screen and (max-device-width: 480px) {\n  .blogger-comments .comments-content .comment-replies {\n    margin-left: 0;\n  }\n}\n{/template:CommentCSS}\n{template:CommonCSS}\n{BasicCSS}\n{HeaderCSS}\n{OverviewCSS}\n{ViewItemCSS}\n{PostCSS}\n{CommentCSS}\n{SharingCSS}\n{GadgetDockCSS}\n{/template:CommonCSS}\n\n{template:CSS}\n{CommonCSS}\n{ViewCSS}\n{CustomCSS}\n{text:Custom CSS}\n{/template:CSS}\n\x3c!-- Attributes {gadgetSidebar} --\x3e\n{template:GadgetDockCSS}\n{block:Gadgets}\n{block:IfNotgadgetSidebar}\n#gadget-dock {\n  background-color: #333;\n  width: 50px;\n  {css-box-shadow value="0 1px 3px rgba(0, 0, 0, 0.3)"};\n  {css-border-radius value="2px 0 0 2px"};\n  {block:IfNotMobile}\n  {css-transition value="right 0.15s ease-in-out"};\n  {/block:IfNotMobile}\n  position: fixed;\n  right: -40px;\n  top: 124px;\n  z-index: 3000;\n}\n\n{block:IfNotMobile}\n#gadget-dock:hover,\n{/block:IfNotMobile}\n#gadget-dock.gadget-notifying,\n#gadget-dock.gadget-opening {\n  right: 0;\n}\n\n/* expand the hover area */\n#gadget-dock:after {\n  content: \'\';\n  display: block;\n  width: 90px;\n  height: 110%;\n  position: absolute;\n  top: -5%;\n  left: -40px;\n  z-index: -100;\n}\n\n#gadget-dock.gadget-opening:after {\n  display: none;\n}\n\n.gadget-item {\n  position: relative;\n  z-index: 1;\n}\n\n.gadget-selected {\n  z-index: 0;\n}\n\n.gadget-item:empty {\n  display: none;\n}\n\n.gadget-menu {\n  cursor: pointer;\n  background-color: #333;\n  border-top: 1px solid #585858;\n  text-align: center;\n  z-index: 0;\n}\n\n.gadget-icons {\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n}\n\n.gadget-menu .gadget-title {\n  display: none;\n}\n\n.gadget-selected .gadget-menu {\n  background-color: white;\n  border-color: #ccc;\n}\n\n.gadget-item:first-child .gadget-menu {\n  border-top: 1px solid transparent;\n  {css-border-radius value="2px 0 0 0"}\n}\n\n.gadget-selected.gadget-item:first-child .gadget-menu {\n  border-color: #ccc;\n  {css-border-radius value="0"}\n}\n\n.gadget-item:last-child .gadget-menu {\n  {css-border-radius value="0 0 0 2px"}\n}\n\n.gadget-selected.gadget-item:last-child .gadget-menu {\n  {css-border-radius value="0"}\n}\n\n.gadget-icon, .gadget-icon-selected {\n  display: inline-block;\n  max-width: 30px;\n  max-height: 30px;\n  vertical-align: middle;\n}\n\n.gadget-icon-selected {\n  display: none;\n}\n\n.gadget-selected .gadget-icon {\n  display: none;\n}\n\n.gadget-selected .gadget-icon-selected {\n  display: inline-block;\n}\n{/block:IfNotgadgetSidebar}\n\n{block:IfgadgetSidebar}\n#gadget-dock {\n  background-color: #f9f9f9;\n  position: relative;\n  top: auto !important;\n  z-index: 3000;\n}\n\n.gadget-item {\n  border-width: 0 1px 0 0;\n  border-color: transparent;\n  border-style: solid;\n  cursor: pointer;\n  padding: 0 20px;\n  height: 46px;\n  line-height: 46px;\n  box-sizing: border-box;\n}\n\n.gadget-selected {\n  background-color: white;\n  border-width: 1px 1px 1px 0;\n  border-color: #ccc;\n}\n\n.gadget-menu {\n  border-width: 1px 0 1px 0;\n  border-color: #eaeaea transparent #fbfbfb transparent;\n  border-style: solid;\n}\n\n.gadget-item:first-child .gadget-menu {\n  border-color: transparent transparent #fbfbfb transparent;\n}\n\n.gadget-item:last-child .gadget-menu {\n  border-color: #eaeaea transparent transparent transparent;\n}\n\n.gadget-selected .gadget-menu {\n  border-style: none;\n}\n\n.gadget-menu .gadget-title {\n  color: #1c52ba;\n  font-size: 14px;\n  padding-left: 4px;\n  vertical-align: middle;\n}\n\n.gadget-item:hover .gadget-menu .gadget-title {\n  text-decoration: underline;\n}\n\n.gadget-selected .gadget-menu .gadget-title {\n  color: #545659;\n}\n\n.gadget-selected:hover .gadget-menu .gadget-title {\n  text-decoration: none;\n}\n\n.gadget-icons {\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n}\n\n.gadget-icon {\n  display: none;\n}\n\n.gadget-icon-selected {\n  display: inline-block;\n  opacity: 0.75;\n  max-width: 18px;\n  max-height: 18px;\n  vertical-align: top;\n}\n{/block:IfgadgetSidebar}\n\n.gadget-container {\n  background-color: white;\n  {css-box-shadow value="0 1px 3px rgba(0, 0, 0, 0.3)"};\n  line-height: 1.4em;\n  text-align: left;\n  visibility: hidden;\n  z-index: -1;\n  margin-left: 100%;\n  word-wrap: break-word;\n  max-width: 700px;\n}\n\n{block:IfNotgadgetSidebar}\n.gadget-container {\n  {block:IfNotMobile}\n  {css-transition value="right 0.15s ease-in-out, opacity 0.15s ease-in-out"};\n  {/block:IfNotMobile}\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  right: -100px;\n}\n\n{block:IfNotMobile}\n.gadget-container:hover,\n.gadget-item:hover .gadget-container,\n{/block:IfNotMobile}\n.gadget-selected .gadget-container {\n  visibility: visible;\n  right: 49px;\n  opacity: 1;\n}\n\n.gadget-selected .gadget-container {\n  border: 1px solid #ccc;\n  {css-border-radius value="2px 0 0 2px"};\n  cursor: auto;\n  z-index: -100;\n}\n\n.gadget-selected.gadget-dock-overflow-bottom .gadget-container {\n  position: fixed;\n  bottom: 27px;\n  top: auto;\n}\n\n.gadget-selected.gadget-dock-overflow-client-area .gadget-container {\n  position: fixed;\n  top: 0;\n  bottom: 24px;\n}\n{/block:IfNotgadgetSidebar}\n\n{block:IfgadgetSidebar}\n.gadget-container {\n  border: 1px solid #ccc;\n  cursor: auto;\n  position: absolute;\n  top: 0;\n  right: 199px;\n}\n\n.gadget-selected .gadget-container {\n  visibility: visible;\n}\n\n.gadget {\n  overflow-y: auto;\n  max-height: 600px;\n}\n{/block:IfgadgetSidebar}\n\n/* HACK: Because IE8 ignores max-width when "overflow-y: scroll" is set */\n/* the scroll-bar is shown by the child element of .gadget-container.   */\n.gadget {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n  /* IE scroll-bar */\n  scrollbar-arrow-color: white;\n  scrollbar-track-color: white;\n  scrollbar-face-color: #999;\n  scrollbar-highlight-color: #999;\n  scrollbar-shadow-color: #999;\n  scrollbar-3dlight-color: white;\n  scrollbar-darkshadow-color: white;\n}\n.gadget-selected.gadget-dock-overflow-client-area .gadget {\n  overflow-y: scroll;\n}\n\n.gadget::-webkit-scrollbar {\n  width: 14px;\n}\n\n.gadget::-webkit-scrollbar:hover {\n  background-color: #f3f3f3;\n}\n\n.gadget::-webkit-scrollbar-thumb {\n  border-width: 0 0 0 4px;\n  border-color: #999;\n  border-style: solid;\n}\n\n.gadget::-webkit-scrollbar-thumb:hover {\n  border-width: 0 0 0 12px;\n}\n\n.gadget::-webkit-scrollbar-button {\n  width: 14px;\n  height: 16px;\n}\n\n.gadget::-webkit-scrollbar-corner {\n  background-color: transparent;\n}\n\n\n.gadget-content {\n  display: block;\n  height: 0;\n  overflow: hidden;\n  position: relative;\n}\n\n.gadget-selected .gadget-content {\n  height: auto;\n}\n\n.gadget-container .gadget-title {\n  background-color: #333;\n  color: white;\n  display: block;\n  font-size: 14px;\n  padding: 1px 16px 0 16px;\n  height: 50px;\n  line-height: 50px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  position: relative;\n}\n\n.gadget-container .gadget-title:hover {\n  text-decoration: underline;\n}\n\n.gadget-selected .gadget-container .gadget-title {\n  background-color: transparent;\n  color: black;\n  font-size: 16px;\n  height: 40px;\n}\n\n.gadget-selected .gadget-container .gadget-title:hover {\n  text-decoration: none;\n}\n\n.gadget-content {\n  background-color: white;\n}\n\n.gadget-resize-detector {\n  background-color: transparent;\n  border-style: none;\n  margin: 0;\n  padding: 0;\n  outline: 0;\n  width: 0;\n  height: 100%;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: -1;\n}\n\n{/block:Gadgets}\n{/template:GadgetDockCSS}\n{template:HeaderCSS}\n\n#header-container {\n  height: 105px;\n}\n\n#header {\n  {block:IfNotMobile}\n  left: 0;\n  position: fixed;\n  top: 0;\n  {/block:IfNotMobile}\n  width: 100%;\n  z-index: 1000;\n}\n\n#header .header-bar {\n  {block:IfNotimage:Header} /* No custom image, put slight gradient. */\n  background-image: -moz-linear-gradient(\n      center top,\n      rgba(255, 255, 255, 0.1),\n      rgba(100, 100, 100, 0.05)\n  );\n  background-image: -webkit-gradient(\n      linear,\n      left top,\n      left bottom,\n      from(rgba(255, 255, 255, 0.3)),\n      to(rgba(255, 255, 255, 0.05))\n  );\n  {/block:IfNotimage:Header}\n  {block:image:Header}\n  background-image: url({image:Header});\n  background-position: left top;\n  background-repeat: no-repeat;\n  {/block:image:Header}\n  {block:text:HeaderBackgroundCSS}\n  background: {text:HeaderBackgroundCSS}; /* Override everything. */\n  {/block:text:HeaderBackgroundCSS}\n  background-attachment: scroll; /* Chrome, really? */\n  background-color: {color:Header Background};\n  {css-box-shadow value="0 0 5px 0px rgba(0, 0, 0, 0.3)"}\n  height: 65px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1001;\n}\n\n#header .header-bar .title {\n  display: block;\n  height: 65px;\n  line-height: 65px;\n  margin-left: 20px;\n  margin-right: 235px;\n  overflow: hidden;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#header .header-bar .title h1,\n#header .header-bar .title h3 {\n  display: inline;\n  height: 65px;\n  {block:IfNotimage:Header}\n  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.3);\n  {/block:IfNotimage:Header}\n  white-space: nowrap;\n}\n\n#header .header-bar .title h1 {\n  color: {color:Blog Title};\n  font-family: {font:Blog Title};\n  font-size: 28px;\n}\n\n#header .header-bar .title h3 {\n  color: {color:Blog Description};\n  font-family: {font:Blog Description};\n  font-size: 20px;\n  margin-left: 5px;\n}\n\n#header input#search {\n  background-color: #fafafa;\n  {css-border-radius value="3px"}\n  border: none;\n  {css-box-shadow value="inset 1px 1px 2px #bbb"}\n  font-size: 15px;\n  height: 30px;\n  margin: 0;\n  padding: 0px 7px;\n  right: 10px;\n  text-align: left;\n  text-transform: lowercase;\n  top: 18px;\n  {css-transition value="background-color 0.3s ease-in-out"};\n  width: 200px;\n  position: absolute;\n}\n\n#header input#search:focus {\n  background-color: white;\n}\n\n#header .header-drawer {\n  /* the drawer scrolls with the page initially, then gets fixed (.sticky) */\n  background-color: {color:Primary};\n  {css-box-shadow value="0 0 8px rgba(0, 0, 0, 0.5)"};\n  font-family: {font:Menu};\n  height: 35px;\n  margin-top: 31px; /* use margin to match back to un-scrolled */\n  position: absolute;\n  top: 34px; /* top here must match top when sticky */\n  width: 100%;\n  z-index: 1000;\n}\n\n{block:IfNotMobile}\n#header .header-drawer.sticky {\n  margin-top: 0px;\n  top: 34px; /* now stuck, just peeking out from the top */\n  {css-transition value="top 0.2s linear"}\n  {css-transition-delay value="0.3s"} /* don\'t surprise on quick hover */\n}\n\n#header:hover .header-drawer,\n#header .header-drawer.open {\n  margin-top: 0px;\n  top: 65px; /* animate back down to full unscrolled height */\n}\n{/block:IfNotMobile}\n\n/* Views and Pages */\n\n#header #views {\n  float: left;\n  position: relative;\n  z-index: 999;\n}\n\n#header .menu .menu-item,\n#header .menu .menu-heading {\n  border-radius: 4px;\n  {css-box-sizing value="border-box"}\n  color: {color:Menu Text};\n  cursor: pointer;\n  display: inline-block;\n  font-family: {font:Menu};\n  font-size: 15px;\n  font-weight: 100;\n  line-height: 30px;\n  height: 30px;\n  padding-left: 15px;\n  padding-right: 15px;\n  text-shadow: -1px -1px rgba(0, 0, 0, 0.1); /* subtle inset */\n  {css-transition value="background-color 0.2s ease-in-out, color 0.2s ease-in-out"}\n  {css-user-select value="none"};\n  width: 100%;\n}\n\n#header a.menu-item {\n  font-family: {font:Menu};\n}\n\n#views .menu-item {\n  text-transform: capitalize;\n}\n\n#header .menu .menu-heading {\n  {css-box-sizing value="border-box"}\n  height: 35px;\n  line-height: 35px;\n  margin-right: 15px;\n  position: relative;\n  width: auto;\n}\n\n#header .indicator {\n  /* instead of using a .heading::after actually put this in as elements\n     which will allow us to animate it rotating! */\n  border-color: {color:Menu Text} transparent transparent transparent;\n  border-style: solid;\n  border-width: 5px;\n  height: 0px;\n  margin: 0;\n  margin-top: -1px;\n  overflow: visible;\n  padding: 0;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  {css-transition value="all .3s linear"}\n  {css-crossbrowser property="transform-origin" value="center 2px"}\n}\n\n#header .menu:hover .indicator {\n  {css-transform value="rotate(180deg)"}\n}\n\n#header .menu ul {\n  {css-box-shadow value="2px 2px 4px rgba(0, 0, 0, 0.2)"}\n  max-height: 0px;\n  overflow: hidden;\n  padding: 0;\n  {css-transition value="all 0.3s linear"}\n  visibility: hidden;\n  width: 100%;\n\n}\n\n#header .menu:hover ul {\n  max-height: 500px;\n  opacity: 1;\n  {css-transition value="all 0.6s linear"} /* show slower than hide */\n  visibility: visible;\n}\n\n#header .menu li {\n  display: list-item;\n  margin: 0;\n  overflow: hidden;\n  padding: 0;\n  position: relative;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n\n#header .menu li a {\n  opacity: 0.99; /* Chrome12+ has different subpixel anti-aliasing rules, this looks worse, but prevents flicker. */\n}\n\n#header .menu .menu-background {\n  background-color: {color:Primary};\n  height: 100%;\n  left: 0;\n  opacity: 0.75;\n  position: absolute;\n  top: 0;\n  {css-transition value="opacity 0.3s ease-in"}\n  width: 100%;\n  z-index: -1; /* Negative isn\'t great... but otherwise the a needs to be positioned. */\n}\n\n#header .menu li:hover .menu-background {\n  opacity: 0.95;\n}\n\n#header .menu li {\n  {css-box-sizing value="border-box"}\n}\n\n#header .tabs li {\n  display: inline;\n  height: 35px;\n  line-height: 35px;\n  margin-left: 10px;\n}\n\n#header .tags li .menu-background {\n  display: none;\n}\n\n#header .tabs li .menu-item {\n  color: {color:Menu Text alpha="0.6"};\n  {css-transition value="color 286ms ease-in"}\n}\n\n#header .tabs li .menu-item:hover,\n#header .menu li .menu-item:hover,\n#header .tabs li .menu-item.current {\n  color: {color:Menu Text} !important;\n}\n\n#header .tabs .menu-heading {\n  display: none;\n}\n\n#header #pages {\n  float: left;\n  margin-left: 0px;\n  position: relative;\n}\n\n#header #pages:before {\n  border-left: solid 1px {color:Menu Text};\n  content: \'\';\n  height: 20px;\n  left: 0px;\n  opacity: 0.5;\n  position: absolute;\n  top: 8px;\n  z-index: 1000;\n}\n\n#header #pages.tabs ul {\n  margin-left: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n#header .admin-controls {\n  height: 35px;\n  position: absolute;\n  right: 10px;\n  top: 0px;\n}\n\n#header .admin-controls .dashboard {\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAVdEVYdENyZWF0aW9uIFRpbWUAMTEvNy8xMZe/cygAAADVSURBVCiRpZG9agJBFEbPxB/E1mCTV4iFldW+hZWIRdqAr2EtIX2a9Ja24jPoE1gKWqmIyUnhqqvuqpDTzB34Dtz5BjJQG+pMbak1deeeroqaKUbqNA7P1b66vSurzUQwjaP8dCG2gW+gkPUcYHcYjrL6BnwBxRsiwCuQP0gFtXdjzTQGahX1Q/1RNw+KK/VXHQY1ApZABHzeWRngHRgBlXwIYRyvX0l2ByyADZADnuMTYApMzgoDyol5DXRCCC9AHZin5c6+KkHg1Hopvl+RJT/Ev+Q/DML6Kx8BC7sAAAAASUVORK5CYII=);\n  /*background-size: 18px 18px;*/\n  display: block;\n  height: 35px;\n  opacity: 0.8;\n  position: absolute;\n  right: 0px;\n  top: 0;\n  width: 18px;\n}\n\n#header .admin-controls .new-post {\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAVdEVYdENyZWF0aW9uIFRpbWUAMTEvNy8xMZe/cygAAADaSURBVCiRhdIxS0JRGMbx/z1a0KdwcyxttcXRLxBIEFgOfp0W5yAn56DNxUm3oiXItUmEgmwo/Dd4g+7p3HzW8/w45305sCNqW31QB2pQd4K6euc2C7WjVv8Dh+rcYl7Us0oJaAA3QDM6CsBTCjTVR/9mqXbV/RgclYA39TTvFMBxvqU4a/X8V68w9HMCfKiX0WtA3VOv8tImAheJmUGtqSO1pQ5z8K72SjZLAE6AT2ANtIAV0FevUwggU2fAAXALLIGJeh9CSP4XlSowBqbAAnjNsuyr7IaffAOehB+C7e2WDgAAAABJRU5ErkJggg==);\n  /*background-size: 18px 18px;*/\n  display: block;\n  height: 35px;\n  opacity: 0.8;\n  position: absolute;\n  right: 24px;\n  top: 0;\n  width: 18px;\n}\n\n#header .admin-controls .dashboard:hover,\n#header .admin-controls .new-post:hover {\n  opacity: 1;\n}\n\n#header #follow-author {\n  height: 65px;\n  right: 0px;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  width: 300px;\n}\n\n{block:IfTablet}\n/* Style for search box */\n#header input#search {\n  background-color: #fff;\n  border: 1px solid #ddd;\n  -webkit-appearance: none;\n  -webkit-box-shadow: none;\n}\n\n#header .admin-controls .new-post { right: 50px; }\n#header .admin-controls .dashboard { right: 10px; }\nli.item { width: 75%; }\n{/block:IfTablet}\n\n{/template:HeaderCSS}\n/* Templates that effectively give us CSS mixins */\n\n/* expected params: [property, value]*/\n{template:css-mixin}\n{property}: {value};\n{/template:css-mixin}\n\n/* Cross-browser mixin. Expected params: [property, value] */\n{template:css-crossbrowser whitespace="collapse-breaks"}\n{css-mixin property=\'-moz-{property}\' value=\'{value}\'}\n{css-mixin property=\'-ms-{property}\' value=\'{value}\'}\n{css-mixin property=\'-o-{property}\' value=\'{value}\'}\n{css-mixin property=\'-webkit-{property}\' value=\'{value}\'}\n{css-mixin property=\'{property}\' value=\'{value}\'}\n{/template:css-crossbrowser}\n\n{template:css-box-sizing whitespace="trim"}\n{css-crossbrowser property=\'box-sizing\' value=\'{value}\'}\n{/template:css-box-sizing}\n\n{template:css-box-shadow whitespace="trim"}\n{css-crossbrowser property=\'box-shadow\' value=\'{value}\'}\n{/template:css-box-shadow}\n\n{template:css-border-radius whitespace="trim"}\n{css-crossbrowser property=\'border-radius\' value=\'{value}\'}\n{/template:css-border-radius}\n\n{template:css-border-image whitespace="trim"}\n{css-mixin property=\'-moz-border-image\' value=\'{value}\'}\n{css-mixin property=\'-ms-border-image\' value=\'{value}\'}\n{css-mixin property=\'-o-border-image\' value=\'{value}\'}\n/* If border-image is declared below -webkit-border-image */\n/* Webkit doesn\'t render correctly.                       */\n{css-mixin property=\'border-image\' value=\'{value}\'}\n{css-mixin property=\'-webkit-border-image\' value=\'{value}\'}\n{/template:css-border-image}\n\n/* Cross-browser transition. Expected params: [value | property,duration,timing] */\n{template:css-transition whitespace="collapse-breaks"}\n{block:value}\n{css-crossbrowser property=\'transition\' value=\'{value}\'}\n{/block:value}\n{block:IfNotvalue}\n{css-crossbrowser property=\'transition\' value=\'{property} {duration} {timing}\'}\n{/block:IfNotvalue}\n{/template:css-transition}\n\n{template:css-transition-property whitespace="trim"}\n{css-crossbrowser property=\'transition-property\' value=\'{value}\'}\n{/template:css-transition-property}\n\n{template:css-transition-delay whitespace="trim"}\n{css-crossbrowser property=\'transition-delay\' value=\'{value}\'}\n{/template:css-transition-delay}\n\n{template:css-transition-duration whitespace="trim"}\n{css-crossbrowser property=\'transition-duration\' value=\'{value}\'}\n{/template:css-transition-duration}\n\n{template:css-transition-timing-function whitespace="trim"}\n{css-crossbrowser property=\'transition-timing-function\' value=\'{value}\'}\n{/template:css-transition-timing-function}\n\n{template:css-transform whitespace="trim"}\n{css-crossbrowser property=\'transform\' value=\'{value}\'}\n{/template:css-transform}\n\n{template:css-user-select whitespace="trim"}\n{css-crossbrowser property=\'user-select\' value=\'{value}\'}\n{/template:css-user-select}\n\n{template:css-linear-gradient}\nbackground-image: -webkit-linear-gradient(top, {from}, {to});\nbackground-image:    -moz-linear-gradient(top, {from}, {to});\nbackground-image:     -ms-linear-gradient(top, {from}, {to});\nbackground-image:      -o-linear-gradient(top, {from}, {to});\nbackground-image:         linear-gradient(top, {from}, {to});\n{/template:css-linear-gradient}\n\n{template:css-diagonal-gradient}\nbackground-image: -webkit-linear-gradient(left top, {from}, {to});\nbackground-image:    -moz-linear-gradient(left top, {from}, {to});\nbackground-image:     -ms-linear-gradient(left top, {from}, {to});\nbackground-image:      -o-linear-gradient(left top, {from}, {to});\nbackground-image:         linear-gradient(left top, {from}, {to});\n{/template:css-diagonal-gradient}\n\n{template:css-radial-gradient}\nbackground-image: -webkit-radial-gradient(circle, {from}, {to});\nbackground-image:    -moz-radial-gradient(circle, {from}, {to});\nbackground-image:     -ms-radial-gradient(circle, {from}, {to});\nbackground-image:      -o-radial-gradient(circle, {from}, {to});\nbackground-image:         radial-gradient(circle, {from}, {to});\n{/template:css-radial-gradient}\n{template:OverviewCSS}\n\nbody.overview-open,\nbody.lightbox-open {\n  overflow: hidden;\n}\n\n/* overview background. */\n#overview .overview-backdrop,\n#lightbox .lightbox-backdrop {\n  background-color: black;\n  bottom: 0;\n  left: 0;\n  opacity: 0;\n  pointer-events: none;\n  position: fixed;\n  right: 0;\n  top: 0;\n  {css-transition value="all 1004ms ease-in"}\n  z-index: 3000;\n}\n\n#overview.open .overview-backdrop,\n#lightbox.open .lightbox-backdrop {\n  opacity: 0.7;\n}\n\n#overview.closing .overview-backdrop,\n#lightbox.closing .lightbox-backdrop {\n  opacity: 0;\n  {css-transition value="opacity 0.5s"}\n}\n\n.overview-panel,\n.lightbox-panel {\n  bottom: 0;\n  {css-box-sizing value="border-box"}\n  left: 20px;\n  pointer-events: none;\n  position: fixed;\n  right: 20px;\n  top: 50px;\n  {css-transition value="all 1009ms ease-in-out"}\n  z-index: 3001; /* Way up in the air. */\n}\n\n.lightbox-title {\n  bottom: 0;\n  display: table-cell;\n  font-family: {font:Post Title};\n  font-size: 20px;\n  height: 100%;\n  left: 60px;\n  line-height: 50px;\n  overflow: hidden;\n  position: absolute;\n  right: 60px;\n  text-align: center;\n  text-overflow: ellipsis;\n  top: 0;\n  white-space: nowrap;\n}\n\n.lightbox-contentwrap {\n  font-size: 14px;\n  margin: 0 auto;\n  max-width: 750px;\n}\n\n#overview.closing .overview-panel,\n#lightbox.closing .lightbox-panel {\n  opacity: 0;\n  {css-transition value="opacity 0.5s"}\n}\n\n/* Bounding box of our overview item. */\n.overview-panel .overview-wrap,\n.lightbox-panel .lightbox-wrap {\n  background-color: transparent;\n  {css-border-radius value="6px 6px 0px 0px"}\n  {block:browser:msie}\n  /* IE9 and IE10 don\'t support border-image */\n  {css-box-shadow value="0px 0px 20px 0px rgba(0, 0, 0, .6)"}\n  {css-box-sizing value="border-box"}\n  {/block:browser:msie}\n  {block:IfNotbrowser:msie}\n  {css-border-image value="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABTUlEQVRIx+2W3WrDMAyF47hJWzrY+z/mYKNtnNhLxlE5PZNhN3NuahB24qDP+nMUOn8EmW1dVony7UJ7NorMvxTXQKa87/42Mh3CBasFJhEQftdVTq17JhlgfvdkUQBkgx2wLhX3eoOtCQDOgGaDsrIeoIFcGARYHPdmiWGh9baXAM4GNDFYJKW9424PWBxQR2416BNwBJBdG5xYDgJMTuyKuHL7ZjIgxy2SmIs1iUYBTk6SzPRs8hNPBg4OLALQk7VnAV7JkowDLA40MXCgzIxk8QAZqS4vAvyiupugOFGGLpSxKZBydekBIAMfsX4T4CeU3Qk0CdAsntXCSO5l4DafVnmvxPBjlRuBbE4CTIHqji01i44AnRC7c6Xor5Ab5C4WPy6AF/BfgM2TZteyaFL4u1xtTS/v5r+n5j/g5i3GLk1U8zZxl0a4Sav/DRDkGFoKi/1vAAAAAElFTkSuQmCC) 12 / 12px repeat"}\n  {css-box-sizing value="content-box"}\n  background-clip: padding-box;\n  top: -12px;\n  {/block:IfNotbrowser:msie}\n  height: 100%;\n  left: 0;\n  margin: 0 auto;\n  max-width: 1000px;\n  overflow: hidden;\n  padding: 0px 1px; /* The controls the inset of the overview-inner. */\n  pointer-events: auto;\n  position: relative;\n  {css-transition value="left 0.5s linear"}\n  z-index: 3002;\n}\n\n.overview-panel.left .overview-wrap {\n  left: -110%;\n}\n\n.overview-panel.right .overview-wrap {\n  left: 110%;\n}\n\n/* This is the box that things can be draw in. */\n.overview-panel .overview-inner,\n.lightbox-panel .lightbox-inner {\n  background-color: #fafafa;\n  {css-border-radius value="6px 6px 0px 0px"}\n  bottom: 0px;\n  {css-box-sizing value="border-box"}\n  height: 100%;\n  position: relative;\n  width: 100%;\n}\n\n.overview-panel .article {\n  /* Defend against Chrome 12+ antialiasing bug. */\n  background-color: #fafafa;\n}\n\n/* Header section for the overview-inner. */\n.overview-panel .overview-header,\n.lightbox-panel .lightbox-header {\n  {css-border-radius value="6px 6px 0px 0px"}\n  {css-box-shadow value="0px 3px 3px rgba(200, 200, 200, .4)"}\n  {css-box-sizing value="border-box"}\n  height: 50px;\n  padding: 10px;\n  position: absolute;\n  top: 0px;\n  {css-transition value="box-shadow 0.2s linear"}\n  z-index: 5;\n  width: 100%;\n}\n\n.overview-header .share-controls {\n  float: left;\n  margin-left: 10px;\n  margin-top: 4px;\n}\n\n.overview-header .overview-controls-left {\n  float: left;\n}\n\n.overview-header .overview-controls-right,\n.lightbox-header .lightbox-controls-right {\n  float: right;\n}\n\n/* overview container where we put the real stuff. */\n.overview-panel .overview-content,\n.lightbox-panel .lightbox-content {\n  bottom: 0px;\n  {css-box-sizing value="border-box"}\n  overflow-y: scroll; /* Always show: comments may cause it to bounce. */\n  padding: 10px;\n  position: absolute;\n  top: 50px;\n  {css-transition value="all 1s linear"}\n  width: 100%;\n  z-index: 1;\n}\n\n.overview-panel.start .overview-header,\n.lightbox-panel.start .lightbox-header {\n  {css-box-shadow value="none"}\n  min-width: 200px; /* Stop any buttons wrapping. */\n}\n\n/* Custom webkit scrollbars */\n\n.overview-panel .overview-content::-webkit-scrollbar,\n.lightbox-panel .lightbox-content::-webkit-scrollbar {\n  background: transparent;\n  height: 10px;\n  width: 10px;\n}\n\n/* the start/end of bar  */\n.overview-panel .overview-content::-webkit-scrollbar-button:start:decrement,\n.overview-panel .overview-content::-webkit-scrollbar-button:end:increment,\n.lightbox-panel .lightbox-content::-webkit-scrollbar-button:start:decrement,\n.lightbox-panel .lightbox-content::-webkit-scrollbar-button:end:increment {\n  display: block;\n  height: 10px;\n  width: 10px;\n}\n\n/* the track background */\n.overview-panel.overview-content::-webkit-scrollbar-track-piece,\n.lightbox-panel.lightbox-content::-webkit-scrollbar-track-piece {\n  background-color: #eee;\n}\n\n/* the scrollbar itself */\n.overview-panel .overview-content::-webkit-scrollbar-thumb,\n.lightbox-panel .lightbox-content::-webkit-scrollbar-thumb {\n  background-color: #666;\n  height: 50px;\n  width: 50px;\n}\n\n.overview-panel.start .overview-content:not(:hover)::-webkit-scrollbar-thumb,\n.lightbox-panel.start .lightbox-content:not(:hover)::-webkit-scrollbar-thumb {\n  background-color: #eee;\n}\n\n.overview-panel .overview-content::-webkit-scrollbar-thumb:hover,\n.lightbox-panel .lightbox-content::-webkit-scrollbar-thumb:hover {\n  background-color: #333;\n  height: 50px;\n  width: 50px;\n}\n\n{/template:OverviewCSS}\n\n{template:ViewItemCSS}\n\nbody.viewitem-open {\n  overflow: hidden;\n}\n\n/* Ensure header drawer is visible. */\nbody.viewitem-open #header .header-drawer {\n  margin-top: 0px;\n  position: fixed;\n  top: 65px; /* animate back down to full unscrolled height */\n}\n\n/* While open, don\'t highlight the view menu. */\nbody.viewitem-open #header #views .menu-heading {\n  color: {color:Menu Text alpha="0.6"} !important;\n}\n\nbody.viewitem-open #header #views .menu-heading .indicator {\n  border-color: {color:Menu Text alpha="0.6"} transparent transparent transparent !important;\n}\n\nbody.viewitem-open .blogger-clickTrap.singleton-element {\n  display: none;\n}\n\n.viewitem-panel {\n  bottom: 0;\n  border-top: solid 1px {color:Primary};\n  {css-box-sizing value="border-box"}\n  left: 0;\n  margin-top: 0;\n  position: fixed;\n  right: 0;\n  top: 100px;\n  {css-transition value="margin-top 1s ease-in-out, bottom 1s ease-in-out"}\n  z-index: 999; /* Way up in the air. */\n}\n\n.viewitem-panel.new,\n.viewitem-panel.closing {\n  margin-top: -100%;\n  bottom: 100%;\n}\n\n/* Bounding box of our overview item. */\n.viewitem-panel .viewitem-wrap {\n  background-color: white;\n  {css-box-sizing value="border-box"}\n  height: 100%;\n  left: 0;\n  margin: 0;\n  overflow: hidden;\n  position: relative;\n  z-index: 9999;\n}\n\n/* Header section for the overview-inner. */\n.viewitem-panel .viewitem-header {\n  {css-box-sizing value="border-box"}\n  height: 50px;\n  padding: 10px;\n  position: absolute;\n  top: 0px;\n  z-index: 5;\n  width: 100%;\n}\n\n/* This is the box that things can be draw in. */\n.viewitem-panel .viewitem-inner {\n  bottom: 0px;\n  {css-box-sizing value="border-box"}\n  height: 100%;\n  overflow-y: scroll;\n  padding: 30px 0px;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* This allows us to be cute with continuous backgrounds */\n.viewitem-panel .viewitem-background {\n  background-color: {color:Background};\n  {block:image:Background}\n  background-image: url({image:Background});\n  background-position: left top;\n  background-repeat: no-repeat;\n  {/block:image:Background}\n  {block:text:BodyBackgroundCSS}\n  background: {text:BodyBackgroundCSS}; /* Override everything. */\n  background-color: {color:Background};\n  {/block:text:BodyBackgroundCSS}\n  background-attachment: scroll; /* Chrome, really? */\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  top: -100px; /* This should be the height of the header. */\n  width: 100%;\n}\n\n/* overview container where we put the real stuff. */\n.viewitem-panel .viewitem-content {\n  background-color: white;\n  background-clip: padding-box;\n  /* TODO(kiyono): re-enable box-shadow when the performance of box-shadow */\n  /* gets better.                                                          */\n  {block:browser:msie}\n  /* IE9 and IE10 don\'t support border-image */\n  {css-box-shadow value="0px 0px 2px 1px #ccc"}\n  {/block:browser:msie}\n  {block:IfNotbrowser:msie}\n  {css-border-image value="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAANUlEQVQIW2NkYGBgQ8JAJsMvEGYEEjxQzA0SBYKvQPwFJCEExIJAfBcqoQyk3+OVwGkUVssBP4wMT0ZBZV0AAAAASUVORK5CYII=) 2 / 2px repeat"}\n  border-width: 2px;\n  {/block:IfNotbrowser:msie}\n  padding: 20px 70px;\n  left: 8px; /* Align it with classic in center - why is ther an offset? */\n  max-width: 750px;\n  margin: 0px auto;\n  position: relative;\n}\n\n.viewitem-panel .article {\n  background-color: white; /* Chrome12+ anti-aliasing bug. */\n}\n\n.viewitem-panel button.close {\n  margin-right: 10px;\n}\n\n.viewitem-panel .blogger-gear {\n  position: absolute;\n  left: 50%;\n  margin-left: -47px;\n  margin-top: -47px;\n  top: 50%;\n}\n\n{/template:ViewItemCSS}\n{template:PostCSS}\n\n/* Styles here should be minimized to limit amount of explicit casing. */\n\n.article {\n  font-size: 14px;\n  margin: 0 auto;\n  max-width: 750px;\n  position: relative;\n  word-wrap: break-word;\n}\n\n/* Post Header */\n\n.article .article-header {\n  display: table;\n  text-align: center;\n  width: 100%;\n}\n\n.article .article-header .title {\n  font-size: 20px;\n  font-family: {font:Post Title};\n  width: 100%;\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  padding-right: 40px; /* Compensate for ribbon, to stay centered. */\n}\n\n.article .title .edit {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAA+UlEQVR42s3U2QmDQBAG4JRgKZbio4qieIAniniiYgkpwRIsISVYQkqwhMlMiHkIhITNhGRgYNeHz/1xncPhn0pV1dkwjNW2bYkNRAzCMIQ4jj+HdzBJEmiaBtq2hSzLxOFHcBgGGMcRuq4Tg5+Be9/gmQ2kxmdrnucSG9j3/TxNEy/IGvl3oKIokqZpC+sJdV1fHceBNE2vl5oDlC3LInBjAakw9tF13TPeNRljbwh8BlKZpnnGAXGkdRRFclEUd1gIpOj0cQijPa6VIAhOdV2LgXt03/cBoy8Ib57n0QvWsixz4XFG0XEuQlVVC8a23/6HX6A80DfrAlIMSJorw8fYAAAAAElFTkSuQmCC);\n  background-repeat: no-repeat;\n  background-position: center center;\n  cursor: pointer;\n  display: inline-block;\n  height: 21px;\n  opacity: 0.8;\n  position: relative;\n  top: 3px;\n  width: 21px;\n}\n\n.article .title .edit:hover {\n  opacity: 1;\n}\n\n.article .article-header .date {\n  float: left;\n  left: 0px;\n  margin: 0px 5px 5px 0px;\n  position: relative;\n  top: 5px;\n}\n\n/* Post Content */\n\n.article .article-content {\n  clear: both;\n  color: {color:Text};\n  line-height: 1.4;\n  margin-top: 10px;\n  margin: 10px auto 5px auto;\n  text-align: justify;\n}\n\n/* This shouldn\'t really be added at all... it is from feeds. */\n.article .article-content .blogger-post-footer {\n  display: none;\n}\n\n/* Restore a lot of the styles we reset globally. */\n.article-content ol {\n  list-style-type: decimal;\n  margin: 0.5em 0;\n  padding-left: 2em;\n}\n.article-content ul {\n  list-style-type: disc;\n  margin: 0.5em 0;\n  padding-left: 2em;\n}\n\n.article-content p {\n  margin: 1em 0;\n}\n\n/* Defaults from: http://www.w3.org/TR/CSS2/sample.html */\n.article-content h1,\n.article-content h2,\n.article-content h3,\n.article-content h4,\n.article-content h5,\n.article-content h6 {\n  font-weight: bolder;\n}\n.article-content h1 {\n  font-size: 2em;\n  margin: .67em 0;\n}\n.article-content h2 {\n  font-size: 1.5em;\n  margin: .75em 0;\n}\n.article-content h3 {\n  font-size: 1.17em;\n  margin: .83em 0;\n}\n.article-content h4 {\n  margin: 1.12em 0;\n}\n.article-content h5 {\n  font-size: .83em;\n  margin: 1.5em 0;\n}\n.article-content h6 {\n  font-size: .75em;\n  margin: 1.67em 0;\n}\n\n.article .article-content a {\n  display: inline;\n}\n\n.article .article-content img {\n  {css-box-sizing value="border-box"}\n  display: inline-block;\n  height: auto;\n  margin: 10px auto; /* Attempt to horizontally center. */\n  /* For Sally-Anne. Keep images to the width of the post. */\n  /* It\'s needed to avoid IE because of b/5420328 */\n  {block:IfNotbrowser:msie}\n  max-width: 100%;\n  {/block:IfNotbrowser:msie}\n}\n\n.article .article-content img:not(.deferred) {\n  padding: 8px;\n  /* TODO(kiyono): re-enable box-shadow when the performance of box-shadow */\n  /* gets better.                                                          */\n  {block:browser:msie}\n  /* IE9 and IE10 don\'t support border-image */\n  background-color: white;\n  border: 1px solid #ccc;\n  {css-box-shadow value="0 0 15px rgba(0, 0, 0, 0.2)"}\n  {/block:browser:msie}\n  {block:IfNotbrowser:msie}\n  {css-border-image value="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///+8yHYvAAAAEnRSTlMAAgEDBAUJBwYzCw0UChARDghnBteEAAAAhElEQVR4XnWRSxJDIQgEEx1Axd/L/Q8bKCuuyOzsohHxdZLS25LSOV2ULQdflgEiIDu9KqiIFILXXpeEx2ChXwdnKNxUGxc4dZbNfXjPufkp5H0Nwtymq/dltUIweNy9qmXt08EgydDZ6+dT+9Qh9AeGenhROFI0fPjMaCHx6uIlh9/xBSJuB3l0A/6JAAAAAElFTkSuQmCC) 9 / 9px stretch"}\n  border-width: 9px;\n  {/block:IfNotbrowser:msie}\n}\n\n/* Resize all images/videos in posts. */\n.article .article-content iframe,\n.article .article-content embed {\n  display: inline-block;\n  /* It\'s needed to avoid IE because of b/5420328 */\n  {block:IfNotbrowser:msie}\n  max-width: 100%;\n  {/block:IfNotbrowser:msie}\n}\n\n/* Post Footer */\n\n.article .article-footer {\n  clear: both;\n  text-align: center;\n}\n\n.article .article-footer .publish-info,\n.article .article-footer .geolocation-info,\n.article .article-footer .labels {\n  color: {color:Text lighten="30%"};\n  font-family: {font:Text};\n  padding: 5px 0;\n}\n\n.article .article-footer .publish-info .author a,\n.article .article-footer .publish-info .time {\n  color: {color:Text};\n}\n\n.article .article-footer .label:not(:last-child):after {\n  content: \',\';\n}\n\n.article .article-footer .share-controls {\n  display: inline-block;\n  margin: 10px 5px;\n  text-align: center;\n}\n\n/* AdSense */\n\n.article.has-ads {\n  padding-right: 220px;\n  min-height: 650px; /* To accomodate skyscraper */\n}\n\n.article .adsense-aside {\n  padding: 15px 5px 0 5px;\n  position: absolute;\n  right: 5px;\n  text-align: center;\n  top: 5px;\n  width: 200px;\n}\n\n.article .adsense-footer .adsense {\n  margin-top: 10px;\n  padding: 10px 0;\n}\n\n{/template:PostCSS}\n{template:PrintCSS}\n\n@media print {\n  /* Printing on white is cleaner. */\n  .article {\n    background-color: white !important;\n    margin: 0 !important;\n  }\n  .article img {\n    border: none !important;\n    box-shadow: none !important;\n  }\n\n  .ribbon.date .ribbon-piece {\n    display: none;\n  }\n  .ribbon.date {\n    display: inline-block;\n    height: 100%;\n    margin: 0 !important;\n    padding: 0;\n    position: static !important;\n    top: 0;\n    white-space: nowrap;\n    width: auto;\n  }\n  .ribbon.date:after{\n    content: attr(title);\n    color: {color:Post Title};\n    font-size: 20px;\n  }\n\n  /* Include the links to all anchors */\n  .article-content a:after {\n    content: " [" attr(href) "] ";\n    font-size: 90%;\n  }\n\n  /* Fix printing for the viewitem --------------------------------- */\n\n  /* Hide lots of things. */\n  .overview-open > *,\n  .overview-backdrop,\n  .overview-header,\n  .share-controls,\n  .adsense-aside,\n  .adsense-aside {\n    display: none !important;\n  }\n\n   /* Show the main content. */\n  .overview-open > #overview {\n    display: block !important;\n  }\n\n   /* Reset colors, padding, and positions. */\n  body.overview-open,\n  .overview-panel,\n  .overview-wrap,\n  .overview-inner,\n  .overview-content {\n    background-color: white !important;\n    border: none !important;\n    box-shadow: none !important;\n    margin: 0 !important;\n    overflow: visible !important;\n    padding: 0 !important;\n    position: static !important;\n  }\n   /* Ensure content positioned - but keep padding. */\n  .overview-panel .overview-content {\n    position: static !important;\n  }\n\n  /* Fix printing for the viewitem --------------------------------- */\n\n  /* Hide lots of things. */\n  .viewitem-open > *,\n  .viewitem-background,\n  .viewitem-header,\n  .share-controls {\n    display: none !important;\n  }\n\n   /* Show the main content. */\n  .viewitem-open > .viewitem-panel {\n    display: block !important;\n  }\n\n   /* Reset colors, padding, and positions. */\n  body.viewitem-open,\n  .viewitem-panel,\n  .viewitem-wrap,\n  .viewitem-inner,\n  .viewitem-content {\n    background-color: white !important;\n    border: none !important;\n    box-shadow: none !important;\n    margin: 0 !important;\n    overflow: visible !important;\n    padding: 0 !important;\n    position: static !important;\n  }\n\n   /* Ensure content positioned - but keep padding. */\n  .viewitem-panel .viewitem-content {\n    position: static !important;\n  }\n\n  /* View specific (eg Sidebar and Mosaic) fixes should go elsewhere */\n}\n\n{/template:PrintCSS}\n'
        );
    blogger.templates().template("CustomCSS", "");
    blogger.templates().template("ViewCSS", "");
    blogger
        .templates()
        .compile(
            '/* Copyright 2011 Google Inc. All Rights Reserved. */\n{template:ViewCSS}\n\n/*\n * For this view body has a class of:\n * \'touch\' on tablet\n * \'notouch\' desktop\n * \'animating\' if an animation is running\n */\n\nbody {\n  overflow-y: scroll; /* inevitable... skip the jitter */\n  overflow-x: hidden;\n}\n\n#content {\n  bottom: 0;\n  left: 0;\n  margin-top: 3px;\n  margin: 0 auto;\n  overflow: visible;\n  padding: 0;\n  position: relative;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.article {\n   padding: 10px;\n}\n\n.item {\n  background-color: white;\n  border: solid 1px #e3e3e3;\n  {css-box-sizing value="border-box"}\n  cursor: pointer;\n  overflow: hidden;\n  position: absolute;\n  z-index: 1;\n}\n\n.notouch .item {\n  /* Below 2 rules are for enabling hardware acceleration on transform. */\n  /* We may gain performance improvements.                              */\n  -webkit-transform: perspective(1);\n  -webkit-transform-style: preserve-3d;\n  transition-property: all, transform;\n  -moz-transition-property: all, -moz-transform;\n  -o-transition-property: all, -o-transform;\n  -o-transition-property: all, -ms-transform;\n  -webkit-transition-property: all, -webkit-transform;\n  {css-transition-duration value="0.6s, 0.3s"}\n  {css-transition-timing-function value="ease-in-out, ease-in"}\n}\n\n.tile {\n  background: #fff;\n  background-position: center center;\n  background-repeat: no-repeat;\n  {css-crossbrowser property="background-size" value="cover"}\n  display: table;\n  color: #666;\n  height: 100%;\n  padding: 10px;\n  width: 100%;\n}\n\n.tile .reblog-badge {\n  position: relative;\n  top: 3px;\n}\n\n.item.filtered {\n  opacity: 0;\n  visibility: hidden;\n}\n\n.item.open .tile {\n  display: none;\n}\n\n.notouch:not(.animating) .item:not(.open):hover{\n  {css-box-shadow value="0px 0px 8px #999"}\n  {css-transform value="scale(1.1)"}\n  /* Uncomment to delay hover animation - force long hover. */\n  /* transition-delay: 0.2s;\n  -moz-transition-delay: 0.2s;\n  -webkit-transition-delay: 0.2s; */\n  z-index: 999 !important;\n}\n\n.tile .banner {\n  color: {color:Post Title};\n  display:block;\n  margin-bottom: 10px;\n}\n\n.tile .banner .title {\n  font-size: 16px;\n  line-height: 1.2;\n  padding: 5px;\n}\n\n.tile.thumbnail {\n  padding: 0;\n}\n\n.tile.thumbnail .banner {\n  background-color: rgba(255, 255, 255, 0.8);\n  color: {color:Post Title};\n  padding: 2px 5px 5px 5px;\n  display: none;\n}\n\n.tile .banner .comments-count {\n  float: right;\n  margin-left: 5px;\n  margin-top: 3px;\n}\n\n.notouch .tile.thumbnail:hover .banner {\n  display: block;\n  /*float: left; if we want short titles to be a small rectangle */\n}\n\n.summary {\n  display: block;\n  overflow: hidden;\n  vertical-align: middle;\n}\n\n.touch .item.open {\n  z-index: 999 !important;\n  position: relative;\n  /* if we decide to put the transitions back for .touch MUST transform!\n  -webkit-transform: scale(1);\n  -moz-transform: scale(1);\n  -o-transform: scale(1);\n  transform: scale(1);*/\n}\n\n/* TODO(antin): remove the need for this */\n#virtualWall {\n  visibility: hidden;\n  position: absolute;\n  left: -10000px;\n  top: 0;\n  opacity: 0;\n}\n\n.virtualBrick {\n  border: solid 2px black;\n  {css-box-sizing value="border-box"}\n}\n\n{/template:ViewCSS}\n\x3c!-- Expected scope: Blog --\x3e\n{template:Main}\n{Header}\n{EmptyMessage}\n<div id="main" tabindex="0">\n  <div id="content" class="items hfeed"></div>\n</div>\n{GadgetDock}\n{Loading}\n{MiscHidden}\n{AttributionContainer}\n{/template:Main}\n\n\x3c!-- Expected scope: Post --\x3e\n{template:Item}\n<div class="item hentry {TagsAsClasses}" itemscope itemtype="http://schema.org/BlogPosting">\n  <div class="tile {block:PhotoURL}thumbnail{/block:PhotoURL}" style="{block:PhotoURL}background-image: url(\'{PhotoURL size=\'{size:thumbnail}\' square=\'true\'}\');{/block:PhotoURL}">\n    <div class="banner">\n      {CommentBubble}\n      <div class="title entry-title" itemprop="name">{ReblogBadge}{HTMLEscapedTitle}</div>\n    </div>\n    {block:IfNotPhotoURL}\n    <div class="summary entry-summary" itemprop="description">{Summary}</div>\n    {/block:IfNotPhotoURL}\n  </div>\n</div>\n{/template:Item}\n'
        ); /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var ha = this || self;
    function B(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.J = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
        a.base = function (d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g);
        };
    }
    function C(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, C);
        else {
            var b = Error().stack;
            b && (this.stack = b);
        }
        a && (this.message = String(a));
    }
    B(C, Error);
    C.prototype.name = "CustomError";
    function D(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        C.call(this, c + a[d]);
    }
    B(D, C);
    D.prototype.name = "AssertionError";
    function E(a, b, c) {
        if (!a) {
            var d = "Assertion failed";
            if (b) {
                d += ": " + b;
                var e = Array.prototype.slice.call(arguments, 2);
            }
            throw new D("" + d, e || []);
        }
    }
    var ia = Array.prototype.indexOf
        ? function (a, b) {
              E(null != a.length);
              return Array.prototype.indexOf.call(a, b, void 0);
          }
        : function (a, b) {
              if (typeof a === y) return typeof b !== y || 1 != b.length ? -1 : a.indexOf(b, 0);
              for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
              return -1;
          };
    function F(a) {
        return typeof a.className == y ? a.className : (a.getAttribute && a.getAttribute("class")) || "";
    }
    function G(a, b) {
        typeof a.className == y ? (a.className = b) : a.setAttribute && a.setAttribute("class", b);
    }
    function H(a, b) {
        a.classList ? (b = a.classList.contains(b)) : ((a = a.classList ? a.classList : F(a).match(/\S+/g) || []), (b = 0 <= ia(a, b)));
        return b;
    }
    function I(a, b) {
        if (a.classList) a.classList.add(b);
        else if (!H(a, b)) {
            var c = F(a);
            G(a, c + (0 < c.length ? " " + b : b));
        }
    }
    function J(a, b) {
        a.classList
            ? a.classList.remove(b)
            : H(a, b) &&
              G(
                  a,
                  Array.prototype.filter
                      .call(a.classList ? a.classList : F(a).match(/\S+/g) || [], function (c) {
                          return c != b;
                      })
                      .join(" ")
              );
    }
    function K() {
        var a = ha.navigator;
        return a && (a = a.userAgent) ? a : "";
    }
    var ja = -1 != K().toLowerCase().indexOf("webkit") && -1 == K().indexOf("Edge");
    function L(a, b) {
        this.width = a;
        this.height = b;
    }
    z = L.prototype;
    z.clone = function () {
        return new L(this.width, this.height);
    };
    z.toString = function () {
        return "(" + this.width + " x " + this.height + ")";
    };
    z.aspectRatio = function () {
        return this.width / this.height;
    };
    z.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    z.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    z.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    z.scale = function (a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this;
    };
    function M(a, b, c) {
        a.style.left = N(b, !1);
        a.style.top = N(c, !1);
    }
    function O(a, b, c) {
        if (b instanceof L) (c = b.height), (b = b.width);
        else if (void 0 == c) throw Error("missing height argument");
        a.style.width = N(b, !0);
        a.style.height = N(c, !0);
    }
    function N(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a;
    }
    function P(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = ja && !b && !c;
        if ((void 0 === b || d) && a.getBoundingClientRect) {
            try {
                var e = a.getBoundingClientRect();
            } catch (f) {
                e = { left: 0, top: 0, right: 0, bottom: 0 };
            }
            return new L(e.right - e.left, e.bottom - e.top);
        }
        return new L(b, c);
    }
    function ka(a, b) {
        this.o = a;
        this.blockSize = b;
        this.rows = [];
        this.j = [];
    }
    function Q(a, b, c) {
        a = a.rows[b];
        if (void 0 === c) {
            for (c = 0; c < a.length; c++) if (null == a[c]) return !1;
            return !0;
        }
        return null != a[c];
    }
    function R(a, b) {
        if (b.height && !(0 >= b.height)) {
            for (; a.rows.length < b.i + b.height; ) {
                for (var c = a.rows, d = c.push, e = a, f = [], g = 0; g < e.o; g++) f.push(null);
                d.call(c, f);
            }
            null == b.id && ((b.id = a.j.length), a.j.push(b));
            for (c = 0; c < b.height; c++) for (d = a.rows[b.i + c], e = 0; e < b.width; e++) d[b.column + e] = b.id;
        }
    }
    function S(a) {
        for (var b = 0; b < a.rows.length; b++) for (var c = 0; c < a.o; c++) a.rows[b][c] = null;
        for (b = 0; b < a.j.length; b++) R(a, a.j[b]);
    }
    function la(a) {
        S(a);
        var b;
        do {
            for (b = !1; ma(a); ) S(a), (b = !0);
            for (; na(a); ) S(a), (b = !0);
        } while (b);
    }
    function ma(a) {
        for (var b = !1, c = a.rows.length - 1; 0 <= c; c--) {
            for (var d = !0, e = 0; e < a.o; e++)
                if (Q(a, c, e)) {
                    d = !1;
                    break;
                }
            if (d) for (d = 0; d < a.j.length; d++) (e = a.j[d]), e.i > c && (e.i--, (b = !0));
        }
        return b;
    }
    function na(a) {
        for (var b = !1, c = 0; c < a.rows.length; c++)
            for (var d = 0; d < a.o; d++) {
                a: {
                    var e = a;
                    for (var f = c, g = d, h = null, k = null != f ? f : 0; k < e.rows.length; k++) {
                        for (var m = h ? h.right + 1 : e.o, n = h ? h.left : 0; n < m; n++)
                            if (!Q(e, k, n))
                                if (h) h.i == k && (h.width++, h.right++);
                                else {
                                    if (!f || f != k || (null != g && g != n)) h = { i: k, top: k, bottom: k, column: n, left: n, right: n, width: 1, height: 1 };
                                }
                            else if (h) {
                                e = h;
                                break a;
                            }
                        h && h.i != k && (h.height++, h.bottom++);
                    }
                    e = h;
                }
                if (e) {
                    f = g = null;
                    for (h = e.column; h < a.o; h++) {
                        a: {
                            f = e.i + e.height;
                            if (null != f && null != h)
                                for (; f < a.rows.length; f++)
                                    if ((k = a.j[a.rows[f][h]])) {
                                        f = k;
                                        break a;
                                    }
                            f = void 0;
                        }
                        if (f && ((k = f.position()), k.left >= e.left && k.right <= e.right)) {
                            g = f;
                            break;
                        }
                    }
                    if (g && ((g = !1), f && 0 < f.id && ((g = a.j[f.id - 1].position()), (g = g.top == e.top ? e.right < g.left : g.top > e.top)), !g)) {
                        b = a;
                        g = b.j[f.id];
                        for (h = 0; h < g.height; h++) for (k = b.rows[g.i + h], m = 0; m < g.width; m++) k[g.column + m] = null;
                        f.i = e.i;
                        R(a, f);
                        b = !0;
                    }
                }
            }
        return b;
    }
    function oa(a, b, c) {
        b = a.j[b];
        if (b.height != c || b.width != a.o) {
            b.A || (b.A = { width: b.width, height: b.height, i: b.i, column: b.column });
            for (var d = a.o, e = -1, f = 0; f < b.id; f++) e = Math.max(a.j[f].position().bottom + 1, e);
            e < b.i && (e = b.i);
            f = c - b.height;
            for (var g = b.position(), h = g.top; h <= g.bottom; h++)
                for (var k = 0; k < a.o; k++) {
                    var m = a.j[a.rows[h][k]];
                    m && m.id > b.id && (f = Math.max(f, c - (m.i - b.i)));
                }
            f += e - b.i;
            b.i = e;
            b.width = d;
            b.height = c;
            b.column = 0;
            for (c = b.id + 1; c < a.j.length; c++) a.j[c].i += f;
            la(a);
        }
    }
    function pa(a, b, c, d) {
        this.width = a;
        this.height = b;
        this.i = c;
        this.column = d;
    }
    pa.prototype.position = function () {
        return { top: this.i, right: this.column + this.width - 1, bottom: this.i + this.height - 1, left: this.column };
    };
    var qa = blogger.core.inherit;
    function T() {
        this.base();
        this.B = !1;
    }
    qa(T, blogger.core.BloggerView);
    z = T.prototype;
    z.defaults = { name: "mosaic", size: 160, imgSize: 320, minColumns: 2, maxColumns: 20, maxWidth: 2, maxHeight: 2, margin: 0, spacing: 5, scrollTimer: 700, animateTimer: 700, measureInterval: 1e3, autoCollapse: !0, pageSize: 10 };
    z.scope = function (a) {
        a.scope("size:thumbnail", this.settings.size * Math.max(this.settings.maxWidth, this.settings.maxHeight));
    };
    z.onInitComplete = function () {
        this.ui.settings.headless && ((this.settings.scrollTimer = 0), (this.settings.animateTimer = 0));
        this.resetDom();
        document.querySelector("#content").focus();
        ra(this);
        this.ui.select();
    };
	
	// modif unwanted scroll
	/*
    z.onResize = function () {
        clearTimeout(this.H);
        H(document.querySelector("body"), u) || (this.H = setTimeout(this.I.bind(this), 500));
    };
	*/
    z.onRender = function (a) {
        var b = this;
        if (a) {
            var c = [],
                d = 0,
                e = this.settings.spacing;
            a.forEach(function (m) {
                var n = sa(b),
                    x = $(b.template("Item", m))[0],
                    q = U(b, n);
                x.dataset.id = m.id;
                x.dataset.D = n.id;
                O(x, q.width, q.height);
                M(x, q.left, q.top);
                d = Math.max(d, q.top + q.height + 2 * e);
                m && c.push(x);
            });
            a = this.m.v;
            a = (a + 1) * e + a * this.m.size;
            if (0 < c.length) {
                var f = document.querySelector(".items"),
                    g = f.append,
                    h = g.apply;
                var k = c instanceof Array ? c : ca(ba(c));
                h.call(g, f, k);
                O(f, a, d);
            }
        }
    };
    function ta(a, b) {
        a = $(a.template("Post", b))[0];
        a.dataset.id = b.id;
        return a;
    }
    function ua(a) {
        a.G = setInterval(a.F.bind(a), a.settings.measureInterval);
    }
    z.I = function () {
        var a = document.querySelector(r);
        V(this);
        W(this);
        a && ((a = this.ui.find(a.dataset.id)), this.onSelect(a));
        this.maybeMore();
    };
    function W(a) {
        var b = va(a),
            c = !a.m || a.m.v != b.v;
        a.m = b;
        c && ra(a);
        X(a);
    }
    function X(a) {
        for (
            var b = Array.from(document.querySelectorAll(p)).filter(function (h) {
                    return !h.matches(l);
                }),
                c = a.settings.spacing,
                d = 0,
                e,
                f = 0;
            (e = a.u.j[f]);
            f++
        ) {
            var g = b[f];
            e = U(a, e);
            O(g, e.width, e.height);
            M(g, e.left, e.top);
            d = Math.max(d, e.top + e.height + 2 * c);
        }
        b = a.m.v;
        O(document.querySelector(".items"), (b + 1) * c + b * a.m.size, d);
    }
    function Y(a, b) {
        if (!b) return null;
        if (a.B)
            if (b) {
                a = 0;
                for (b = b.previousSibling; b; b = b.previousSibling) b.matches(l) || a++;
                b = a;
            } else b = 0;
        else b = b.dataset.D;
        return b;
    }
    z.F = function () {
        if (!H(document.querySelector("body"), u)) {
            var a = document.querySelector(r);
            if (a) {
                var b = Y(this, a);
                if (null != b) {
                    var c = -15;
                    Array.from(a.children).forEach(function (d) {
                        c += d.offsetHeight;
                    });
                    a = Math.ceil(c / (this.settings.spacing + this.m.size));
                    this.u.j[b].height != a && (oa(this.u, b, a), Z(this), X(this));
                }
            }
        }
    };
    function V(a) {
        clearInterval(a.G);
        document.querySelectorAll(r).forEach(function (b) {
            var c = Y(a, b);
            J(b, "open");
            (b = b.querySelector(".article")) && b.remove();
            b = a.u;
            var d = b.j[c];
            d.column = d.A.column;
            c = d.A.width;
            var e = d.A.height;
            d = b.j[d.id];
            if (d.height != e || d.width != b.width) {
                d.A || (d.A = { width: d.width, height: d.height, i: d.i, column: d.column });
                for (var f = -1, g = 0; g < d.id; g++) f = Math.max(b.j[g].position().bottom + 1, f);
                f < d.i && (f = d.i);
                g = e - d.height;
                for (var h = d.position(), k = h.top; k <= h.bottom; k++)
                    for (var m = 0; m < b.o; m++) {
                        var n = b.j[b.rows[k][m]];
                        n && n.id > d.id && (g = Math.max(g, e - (n.i - d.i)));
                    }
                g += f - d.i;
                d.i = f;
                d.width = c;
                d.height = e;
                for (c = d.id + 1; c < b.j.length; c++) b.j[c].i += g;
                la(b);
            }
        });
        Z(a);
    }
    function wa(a, b) {
        var c = Y(a, b),
            d = a.ui.find(b.dataset.id);
        if (d) {
            var e = xa(a, d) + 5;
            oa(a.u, c, Math.ceil(e / (a.settings.spacing + a.m.size)));
            Z(a);
            c = ta(a, d);
            I(b, "open");
            b.querySelectorAll(".article").forEach(function (f) {
                for (; f.firstChild; ) f.removeChild(f.firstChild);
            });
            try {
                b.append(c);
            } catch (f) {
                try {
                    b.append(c);
                } catch (g) {
                    a.log(t);
                }
            }
            ua(a);
            a.ui.notify("viewitem", d, c);
            a.ui.updated();
        }
    }
    function Z(a) {
        I(document.querySelector("body"), u);
        clearTimeout(a.C);
        a.C = setTimeout(function () {
            J(document.querySelector("body"), u);
        }, a.settings.animateTimer);
    }
    z.onSelect = function (a) {
        a = document.querySelector('.item[data-id="' + a.id + '"]');
        var b = !H(a, "open");
        this.settings.autoCollapse && V(this);
        b ? (wa(this, a), X(this), ya(this, a)) : this.ui.clearSelection();
    };
    z.onClearSelection = function () {
        var a = document.querySelector(r);
        V(this);
        W(this);
        ya(this, a);
    };
    function ya(a, b) {
        b = Y(a, b);
        if (null != b) {
            b = U(a, a.u.j[b]);
            var c = document.querySelector("#main").getBoundingClientRect().top + window.pageYOffset;
            c -= document.querySelector("#header .header-bar").getBoundingClientRect().height;
            b = b.top - a.settings.spacing + c;
            $("html, body").stop().animate({ scrollTop: b }, a.settings.scrollTimer);
        }
    }
    function ra(a) {
        a.m || (a.m = va(a));
        a.u = new ka(a.m.v, a.m.size);
        if (a.data.items() && a.data.items().length)
            for (
                var b = a.B
                        ? Array.from(document.querySelectorAll(p)).filter(function (d) {
                              return !d.matches(l);
                          }).length
                        : a.data.items().length,
                    c = 0;
                c < b;
                c++
            )
                sa(a);
    }
    function sa(a) {
        var b = a.u;
        var c = b.rows.length;
        for (var d = c - 1; 0 <= d && !Q(b, d); d--) c = d;
        if (c == b.rows.length) c = { i: c, column: 0, width: b.o };
        else {
            d = b.rows[c];
            for (var e = -1, f = 0, g = 0; g < d.length; g++)
                if (!Q(b, c, g)) 0 > e && (e = g), f++;
                else if (0 <= e) break;
            c = 0 <= e ? { i: c, column: e, width: f } : void 0;
        }
        a = new pa(Math.min(Math.floor(Math.random() * a.settings.maxWidth) + 1, c.width), Math.floor(Math.random() * a.settings.maxHeight) + 1, c.i, c.column);
        R(b, a);
        return a;
    }
    function va(a) {
        var b = document.querySelector("#main").clientWidth - 2 * a.settings.margin,
            c = Math.floor(b / a.settings.size);
        b - ((c + 1) * a.settings.spacing) / c > a.settings.size && c++;
        c = Math.max(c, a.settings.minColumns);
        c = Math.min(c, a.settings.maxColumns);
        return { size: Math.floor((b - (c + 1) * a.settings.spacing) / c), v: c };
    }
    function xa(a, b) {
        var c = document.querySelector("#virtualWall");
        c && c.remove();
        c = document.createElement("div");
        c.setAttribute("id", "virtualWall");
        var d = document.createElement("div");
        I(d, "virtualBrick");
        c.append(d);
        document.querySelector("body").append(c);
        var e = a.m.v;
        e = a.m.size * e + (e - 1) * a.settings.spacing;
        b = ta(a, b);
        d.style.width = N(e, !0);
        try {
            d.append(b);
        } catch (g) {
            try {
                d.append(b);
            } catch (h) {
                a.log(t);
            }
        }
        b: {
            E(b, "Node cannot be null or undefined.");
            a = 9 == b.nodeType ? b : b.ownerDocument || b.document;
            if (a.defaultView && a.defaultView.getComputedStyle && (a = a.defaultView.getComputedStyle(b, null))) {
                a = a.display || a.getPropertyValue("display") || "";
                break b;
            }
            a = "";
        }
        if ("none" != (a || (b.currentStyle ? b.currentStyle.display : null) || (b.style && b.style.display))) b = P(b);
        else {
            a = b.style;
            d = a.display;
            e = a.visibility;
            var f = a.position;
            a.visibility = "hidden";
            a.position = "absolute";
            a.display = "inline";
            b = P(b);
            a.display = d;
            a.position = f;
            a.visibility = e;
        }
        b = b.height - 20;
        c.remove();
        return b;
    }
    function U(a, b) {
        var c = a.m.size;
        a = a.settings.spacing;
        return { width: c * b.width + (b.width - 1) * a, height: c * b.height + (b.height - 1) * a, left: b.column * (c + a) + a, top: b.i * (c + a) + a };
    }
    z.onFilter = function (a) {
        this.preventMore(!0);
        V(this);
        this.B = !0;
        var b = a.map(function (c) {
            return c.id;
        });
        document.querySelectorAll(p).forEach(function (c) {
            b.includes(c.dataset.id) ? J(c, v) : I(c, v);
        });
        W(this);
        $("html,body").stop().animate({ scrollTop: 0 });
    };
    z.onClearFilter = function () {
        V(this);
        document.querySelectorAll(p).forEach(function (a) {
            J(a, v);
        });
        W(this);
        this.B = !1;
        this.preventMore(!1);
    };
    z.onItemClick = function (a) {
        var b = a.target.closest(p),
            c = b.dataset.id;
        if ((!H(b, "open") || a.target.matches(".item, .article")) && c && !a.metaKey) return a.stopPropagation(), a.preventDefault(), this.ui.select(c, $(b)), !1;
    };
    blogger.ui().registerView(T);
}.call(this));
