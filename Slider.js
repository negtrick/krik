// SLider https://www.jqueryscript.net/slideshow/Fullscreen-Product-Slideshow-with-Image-Zoom-Pan-Ap-Image-Fullscreen.html







/**
* @license ap-image-zoom.js v0.7
* Updated: 17.09.2014
* {DESCRIPTION}
* Copyright (c) 2014 armin pfaeffle
* Released under the MIT license
* http://armin-pfaeffle.de/licenses/mit
*/

;(function($) {

	var datakey = '__apiz__';
	var cssPrefix = 'apiz-';
	var eventPrefix = 'apiz';

	/**
	 * Makes the first character of str uppercase and returns that string.
	 */
	function ucfirst(str) {
		str += ''; // ensure that str is a string
		var c = str[0].toUpperCase();
		return c + str.substr(1);
	}

	/**
	 * Adds ucfirst() method to String class. Makes the first character
	 * of str uppercase and returns that string.
	 */
	if (!String.prototype.ucfirst) {
		String.prototype.ucfirst = function() {
			return ucfirst(this);
		};
	}

	/**
	 *
	 */
	jQuery.fn.tagName = function() {
		return this.prop("tagName").toLowerCase();
	};

	/**
	 * 2D Point class with properties x and y. Parses x and y to Float and applies
	 * Math.round() so x and y are Integer.
	 */
	function Point(x, y) {
		this.x = Math.round(parseFloat(x));
		this.y = Math.round(parseFloat(y));
	}

	/**
	 * 2D Size class with properties width and height. Both parameters are parsed to float and
	 * then rounded to Integer.
	 */
	function Size(width, height) {
		this.width = Math.round(parseFloat(width));
		this.height = Math.round(parseFloat(height));
	}

	/**
	 * Scale class with properties x, y and z. All three parameters are parsed to float.
	 */
	function Scale(x, y, z) {
		z = (typeof z !== 'undefined' ? z : 1);
		this.x = parseFloat(x);
		this.y = parseFloat(y);
		this.z = parseFloat(z);
	}

	/**
	 * Constructor for ApImageZoom plugin.
	 */
	function ApImageZoom(element, options) {
		// Do not remake the zoom plugin
		var data = $(element).data(datakey);
		if (data) {
			return data;
		}

		this.settings = $.extend({}, ApImageZoom.defaultSettings, options);
		this.$target = $(element);
		this.mode = (this.$target.tagName() == 'img' ? 'image' : 'container');
		this.imageUrl = (this.mode == 'image' ? this.$target.attr('src') : this.settings.imageUrl);
		this._init();

		// Save the instance
		this.$target.data(datakey, this);
		if (this.mode == 'container') {
			this.$image.data(datakey, this);
		}
	}

	/**
	 * ApImageZoom class.
	 */
	ApImageZoom.prototype = {

		/**
		 *
		 */
		_init: function() {
			var self = this;

			this.panning = false;
			this.pinching = false;

			this._addWrapper();
			this._setCssClasses();

			if (!this.imageUrl) {
				this._showError('Invalid image url!');
			}

			// Create a temporary hidden copy of image, so we obtain the real/natural size
			this.$image = $('<img />')
				.hide()
				.prependTo(this.$wrapper)
				.load(function() {
					self._obtainImageSizes();
					self._setConstraints();
					self._setup();
				})
				.error(function() {
					self._showError('Error loading image!');
				})
				.attr('src', this.imageUrl);
		},

		/**
		 *
		 */
		_addWrapper: function() {
			// Setup wrapper and overlay
			this.$wrapper = $('<div></div>').addClass(cssPrefix + 'wrapper');
			this.$overlay = $('<div></div>').addClass(cssPrefix + 'overlay');
			this.$wrapper.append(this.$overlay);

			// Add loading text/throbber
			this._addLoadingAnimation();

			// Hide image and move it into added wrapper or add wrapper target container
			if (this.mode == 'image') {
				this.imageIsVisible = this.$target.is(':visible');
				this.$target.hide().after(this.$wrapper).appendTo(this.$wrapper);
			}
			else {
				this.$wrapper.appendTo(this.$target);
			}
		},

		/**
		 *
		 */
		_removeWrapper: function() {
			if (this.mode == 'image') {
				this.$wrapper.after(this.$target);
				if (this.imageIsVisible) {
					this.$target.show();
				}
			}
			this.$wrapper.remove();
		},

		/**
		 *
		 */
		_addLoadingAnimation: function() {
			var $element;
			switch (this.settings.loadingAnimation) {
				// loadingAnimationData
				case 'text':
					$element = $('<div></div>').addClass(cssPrefix + 'loading-animation-text');
					$element.html(this.settings.loadingAnimationData);
					break;

				case 'throbber':
					$element = $('<div></div>').addClass(cssPrefix + 'throbber');
					var circles = ['one', 'two', 'three'];
					for (index in circles) {
						$element.append( $('<div></div>').addClass(cssPrefix + 'circle ' + cssPrefix + 'circle-' + circles[index]) );
					}
					break;

				case 'image':
					$element = $('<div></div>').addClass(cssPrefix + 'loading-animation-image');
					$element.css('background-image', 'url(\'' + this.settings.loadingAnimationData + '\')');
					break;
			}
			if ($element) {
				this.$loadingAnimation = $element;
				this.$wrapper.append($element);
			}
		},

		/**
		 *
		 */
		_obtainImageSizes: function() {
			var $image = (this.mode == 'image' ? this.$target : this.$image);
			this.originSize = new Size($image.width(), $image.height());
			this.naturalSize = new Size(this.$image.width(), this.$image.height());
		},

		/**
		 *
		 */
		_setup: function() {
			this._resetSize();
			this._center();
			this._bind();

			// Remove throbber and show image
			if (this.$loadingAnimation) {
				this.$loadingAnimation.fadeOut(200, function() {
					$(this).remove();
				});
			}
			this.$image.fadeIn(200);

			this._trigger('init');
		},

		/**
		 *
		 */
		_setCssClasses: function() {
			if (typeof this.settings.cssWrapperClass == 'string') {
				this.$wrapper.addClass(this.settings.cssWrapperClass);
			}
			this.$wrapper.addClass(cssPrefix + 'mode-' + this.mode);
			var cssClasses = {
				hammer: {
					status: !this.settings.disableHammerPlugin,
					enabled: 'hammer-enabled',
					disabled: 'hammer-disabled'
				},
				mouseWheel: {
					status: !this.settings.disableMouseWheelPlugin,
					enabled: 'mouse-wheel-enabled',
					disabled: 'mouse-wheel-disabled'
				},
				enabled: {
					status: !this.settings.disabled,
					enabled: 'enabled',
					disabled: 'disabled'
				},
				panEnabled: {
					status: !this.settings.disablePan,
					enabled: 'pan-enabled',
					disabled: 'pan-disabled'
				},
				zoomEnabled: {
					status: !this.settings.disableZoom,
					enabled: 'zoom-enabled',
					disabled: 'zoom-disabled'
				}
			};

			for (key in cssClasses) {
				var property = cssClasses[key];
				this.$wrapper
					.removeClass(cssPrefix + (property.status ? property.disabled : property.enabled))
					.addClass(cssPrefix + (property.status ? property.enabled : property.disabled));
			}
		},

		/**
		 *
		 */
		_bind: function() {
			var self = this;

			// Hammer: pan, pinch, swipe, tap, double-tap
			if (!this.settings.disableHammerPlugin && typeof Hammer == "function") {
				this.hammerManager = new Hammer.Manager( this.$overlay[0] );

				this.hammerManager.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
				this.hammerManager.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith( this.hammerManager.get('pan') );
				this.hammerManager.add(new Hammer.Swipe()).recognizeWith( this.hammerManager.get('pan') );
				this.hammerManager.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
				this.hammerManager.add(new Hammer.Tap());

				this.hammerManager.on("panstart panmove panend", function(evt) { self._onPan(evt); } );
				this.hammerManager.on("pinchstart pinchmove pinchend", function(evt) { self._onPinch(evt); } );
				this.hammerManager.on("swipe", function(evt) { self._onSwipe(evt); } );
				this.hammerManager.on("tap", function(evt) { self._onTap(evt); } );
				this.hammerManager.on("doubletap", function(evt) { self._onDoubleTap(evt); } );
			}

			// MouseWheel: zoom
			if (!this.settings.disableMouseWheelPlugin && typeof jQuery.fn.mousewheel == "function") {
				this.$overlay.on('mousewheel.apimagezoom', function(evt) { self._onMouseWheel(evt); } );
			}
		},

		/**
		 *
		 */
		_unbind: function() {
			if (this.hammerManager) {
				this.hammerManager.stop(true); // immediate stop recognition
				this.hammerManager.destroy();
				this._isPanning(false);
				this._isPinching(false);
			}
			this.$overlay.off('mousewheel.apimagezoom');
		},

		/**
		 *
		 */
		_onPan: function(evt) {
			if (this.settings.disabled || this.settings.disablePan) {
				return;
			}

			if (evt.type == 'panstart') {
				this._isPanning(true);
				this.panStart = {
					imagePosition: this._imagePosition(),
					cursorPosition: new Point(evt.pointers[0].screenX, evt.pointers[0].screenY)
				};
				this._trigger('panStart', [this.panStart.imagePosition]);
			}
			else if (evt.type == 'panend') {
				this._isPanning(false);
				this.$wrapper.removeClass(cssPrefix + 'is-panning');
				this._trigger('panEnd', [this._imagePosition()]);
			}
			else {
				var position = new Point(
					this.panStart.imagePosition.x + (evt.pointers[0].screenX - this.panStart.cursorPosition.x),
					this.panStart.imagePosition.y + (evt.pointers[0].screenY - this.panStart.cursorPosition.y)
				);
				var updatedPosition = this._move(position);
				this._trigger('panMove', [updatedPosition]);
			}
			evt.preventDefault();
		},

		/**
		 *
		 */
		_onPinch: function(evt) {
			if (this.settings.disabled || this.settings.disableZoom) {
				return;
			}

			if (evt.type == 'pinchstart') {
				this._isPinching(true);

				// Save center between two points for relative positioning of image
				var p1 = new Point(evt.pointers[0].pageX || 0, evt.pointers[0].pageY || 0);
				var p2 = new Point(evt.pointers[1].pageX || 0, evt.pointers[1].pageY || 0);
				var touchCenter = new Point( (p1.x + p2.x) / 2, (p1.y + p2.y) / 2 );

				var imageSize = this._imageSize();
				var relativeOrigin = new Scale(
					(touchCenter.x - this.$image.offset().left) / imageSize.width,
					(touchCenter.y - this.$image.offset().top) / imageSize.height
				);

				this.pinchStart = {
					imageSize: imageSize,
					imagePosition: this._imagePosition(),
					relativeOrigin: relativeOrigin
				};
				this._trigger('pinchStart', [imageSize, this.pinchStart.imagePosition]);
			}
			else if (evt.type == 'pinchend') {
				this._isPinching(false);
				this._trigger('pinchEnd', [this._imageSize(), this._imagePosition()]);
			}
			else {
				// Here we do NOT depend on the internal zoomTo method because while
				// pinching we have to depend on the values on pinch starts. zoomTo
				// calculates the values for zooming each step and does not depend on
				// the start values.
				var size = new Size(
					this.pinchStart.imageSize.width * evt.scale,
					this.pinchStart.imageSize.height * evt.scale
				);
				var updatedSize = this._resize(size);

				// Only update position if size has been changed
				if (updatedSize.width > -1) {
					var deltaWidth = updatedSize.width - this.pinchStart.imageSize.width;
					var deltaHeight = updatedSize.height - this.pinchStart.imageSize.height;
					var position = new Point(
						this.pinchStart.imagePosition.x - (deltaWidth * this.pinchStart.relativeOrigin.x),
						this.pinchStart.imagePosition.y - (deltaHeight * this.pinchStart.relativeOrigin.y)
					);
					var updatedPosition = this._move(position);
					this._trigger('pinchMove', [updatedSize, updatedPosition]);
				}
			}
			evt.preventDefault();
		},

		/**
		 *
		 */
		_onSwipe: function(evt) {
			if (this.settings.disabled) {
				return;
			}

			// Only trigger event
			var eventType;
			switch (evt.direction) {
				case  8: eventType = 'swipeTop'; break;
				case  4: eventType = 'swipeRight'; break;
				case 16: eventType = 'swipeBottom'; break;
				case  2: eventType = 'swipeLeft'; break;
			};
			if (eventType) {
				this._trigger(eventType, [evt]);
				evt.preventDefault();
			}
		},

		/**
		 *
		 */
		_onTap: function(evt) {
			if (this.settings.disabled) {
				return;
			}

			// TODO: Should be do any action here?

			this._trigger('tap', [evt]);
			evt.preventDefault();
		},

		/**
		 *
		 */
		_onDoubleTap: function(evt) {
			if (this.settings.disabled) {
				return;
			}

			var zoom;
			var imageSize = this._imageSize();
			switch (this.settings.doubleTap) {
				case 'open':
					window.open(this.imageUrl);
					break;

				case 'zoomMax':
					zoom = this.settings.maxZoom;
					break;

				case 'zoomToggle':
					if (imageSize.width == this.sizeConstraints.width.max) {
						this._resetSize();
						this._center();
					}
					else {
						zoom = this.settings.maxZoom;
					}
					break;
			}
			if (zoom) {
				var origin = new Scale(
					(evt.pointers[0].pageX - this.$image.offset().left) / imageSize.width,
					(evt.pointers[0].pageY - this.$image.offset().top) / imageSize.height
				);
				this._zoomTo(zoom, origin);
			}

			this._trigger('doubleTap', [evt]);
			evt.preventDefault();
		},

		/**
		 * Event handler for mouse wheel events.
		 */
		_onMouseWheel: function(evt) {
			if (this.settings.disabled || this.settings.disableZoom || this._isPinching()) {
				return;
			}

			var zoom = this._getZoom() + (this.settings.zoomStep * evt.deltaY);
			var imageSize = this._imageSize();
			var origin = new Scale(
				(evt.pageX - this.$image.offset().left) / imageSize.width,
				(evt.pageY - this.$image.offset().top) / imageSize.height
			);
			var sizeAndPosition = this._zoomTo(zoom, origin);

			this._trigger('mouseWheel', [sizeAndPosition.size, sizeAndPosition.position]);
			evt.preventDefault();
		},

		/**
		 *
		 */
		_setConstraints: function() {
			this.sizeConstraints = {
				width : {
					min: this.naturalSize.width * this.settings.minZoom,
					max: this.naturalSize.width * this.settings.maxZoom
				},
				height : {
					min: this.naturalSize.height * this.settings.minZoom,
					max: this.naturalSize.height * this.settings.maxZoom
				}
			};
		},

		/**
		 *
		 */
		_resetSize: function() {
			var updatedSize;
			if (typeof this.settings.initialZoom == 'float' || this.settings.initialZoom == parseFloat(this.settings.initialZoom)) {
				var zoom = parseFloat(this.settings.initialZoom);
				this._zoomTo(zoom);
			}
			else if (typeof this.settings.initialZoom == 'string') {
				var size = this.originSize;
				switch (this.settings.initialZoom) {
					case "auto":
						size = this._getAutoFitSize();
						break;

					case "min":
						size = new Size(this.sizeConstraints.width.min, this.sizeConstraints.height.min);
						break;

					case "max":
						size = new Size(this.sizeConstraints.width.max, this.sizeConstraints.height.max);
						break;
				}
				updatedSize = this._resize(size);
			}
			updatedSize = updatedSize || this._imageSize();
			this._trigger('resetSize', [updatedSize]);
		},

		/**
		 * Try to make size 100% width or 100% height so the whole image is visible
		 */
		_getAutoFitSize: function() {
			var overlaySize = this._overlaySize();
			var imageSize = this._imageSize();
			var isLandscapeFormat = (overlaySize.width / overlaySize.height) > 1;
			if (isLandscapeFormat) {
				size = new Size(imageSize.width * (overlaySize.height / imageSize.height), overlaySize.height);
			}
			else {
				size = new Size(overlaySize.width, imageSize.height * (overlaySize.width / imageSize.width));
			}
			return size;
		},

		/**
		 *
		 */
		_center: function(dimension) {
			var imageSize = this._imageSize();
			var overlaySize = this._overlaySize();
			var position = this._imagePosition();
			switch (dimension) {
				case 'x':
				case 'horizontal':
					position.x = (overlaySize.width - imageSize.width) / 2;
					break;
				case 'y':
				case 'vertical':
					position.y = (overlaySize.height - imageSize.height) / 2;
					break;
				default:
					position = new Point((overlaySize.width - imageSize.width) / 2, (overlaySize.height - imageSize.height) / 2);
			}
			var updatedPosition = this._move(position);
			this._trigger('center', [updatedPosition]);
		},

		/**
		 * Updates the position of the image considerungs position constraints, so image is
		 * always visible in overlay.
		 * Additionally it's possible that image is always centered horizontally, vertically
		 * or both, if image width or height is less than overlay width or height.
		 */
		_move: function(position) {
			var self = this;
			var overlaySize = this._overlaySize();
			var imageSize = this._imageSize();


			if (imageSize.width <= overlaySize.width) {
				var left = Math.min( Math.max(0, position.x), overlaySize.width - imageSize.width );
				if (self.settings.autoCenter == true || self.settings.autoCenter == 'both' || self.settings.autoCenter == 'horizontal') {
					left = Math.round( (overlaySize.width - imageSize.width) / 2 );
				}
			}
			else {
				var left = Math.max( Math.min(0, position.x), overlaySize.width - imageSize.width );
			}


			if (imageSize.height <= overlaySize.height) {
				var top = Math.min( Math.max(0, position.y), overlaySize.height - imageSize.height );
				if (self.settings.autoCenter == true || self.settings.autoCenter == 'both' || self.settings.autoCenter == 'vertical') {
					top = Math.round( (overlaySize.height - imageSize.height) / 2 );
				}
			}
			else {
				var top = Math.max( Math.min(0, position.y), overlaySize.height - imageSize.height );
			}

			var adjustedPosition = new Point(left, top);
			if (this._triggerHandler('beforePositionChange', [adjustedPosition]) === false) {
				return new Point(-1, -1);
			}
			else {
				this._imagePosition(adjustedPosition);
				this._trigger('positionChanged', [adjustedPosition])
				return adjustedPosition;
			}
		},

		/**
		 * Updates the size of the image considering the size constraints. After setting
		 * the new size is returned because it can differ from input size.
		 */
		_resize: function(size) {
			var adjustedSize = new Size(
				Math.max(Math.min(size.width, this.sizeConstraints.width.max), this.sizeConstraints.width.min),
				Math.max(Math.min(size.height, this.sizeConstraints.height.max), this.sizeConstraints.height.min)
			);
			if (this._triggerHandler('beforeSizeChange', [adjustedSize]) === false) {
				return new Size(-1, -1);
			}
			else {
				this._imageSize(adjustedSize);
				this._trigger('sizeChanged', [adjustedSize])
				return adjustedSize;
			}
		},

		/**
		 *
		 */
		_overlaySize: function() {
			return new Size(this.$overlay.width(), this.$overlay.height());
		},

		/**
		 * Getter and setter for image size.
		 */
		_imageSize: function(size) {
			if (size) {
				this.$image.width(size.width);
				this.$image.height(size.height);
			}
			else {
				return new Size(this.$image.width(), this.$image.height());
			}
		},

		/**
		 * Getter and setter for image position.
		 */
		_imagePosition: function(position) {
			if (position) {
				var overlaySize = this._overlaySize();
				var marginLeft = position.x - Math.round(overlaySize.width / 2);
				var marginTop = position.y - Math.round(overlaySize.height / 2);
				this.$image.css({
					marginLeft: marginLeft,
					marginTop: marginTop
				});
			}
			else {
				return new Point(
					this.$image.offset().left - this.$overlay.offset().left,
					this.$image.offset().top - this.$overlay.offset().top
				);
			}
		},

		/**
		 *
		 */
		_isPanning: function(value) {
			if ((value === true || value === false) && this.panning !== value) {
				this.panning = value;
				this.$wrapper.toggleClass(cssPrefix + 'is-panning');
			}
			else {
				return this.panning;
			}
		},

		/**
		 *
		 */
		_isPinching: function(value) {
			if ((value === true || value === false) && this.pinching !== value) {
				this.pinching = value;
				this.$wrapper.toggleClass(cssPrefix + 'is-pinching');
			}
			else {
				return this.pinching;
			}
		},

		/**
		 *
		 */
		_getZoom: function() {
			return this._imageSize().width / this.naturalSize.width;
		},

		/**
		 *
		 */
		_zoomTo: function(zoom, origin) {
			if (this.settings.disabled || this.settings.disableZoom) {
				return false;
			}

			// Update size
			var imageSize = this._imageSize();
			var newWidth =  this.naturalSize.width * zoom;
			var newHeight = parseInt(newWidth / imageSize.width * imageSize.height);
			var updatedSize = this._resize(new Size(newWidth, newHeight));

			// Only update position if size has been changed
			var updatedPosition = undefined;
			if (updatedSize.width > -1) {
				// if there is no origin given, we define it as center of the image
				if (!origin) {
					origin = new Scale(0.5, 0.5);
				}
				var deltaWidth = updatedSize.width - imageSize.width;
				var deltaHeight = updatedSize.height - imageSize.height;

				var imagePosition = this._imagePosition();
				var position = new Point(
					imagePosition.x - (deltaWidth * origin.x),
					imagePosition.y - (deltaHeight * origin.y)
				);
				updatedPosition = this._move(position);
			}
			return {
				size: updatedSize,
				position: updatedPosition
			};
		},

		/**
		 *
		 */
		_trigger: function(eventType, args) {
			var optionName = 'on' + eventType.ucfirst();
			if (typeof this.settings[optionName] == 'function') {
				var f = this.settings[optionName];
				f.apply(this.$target, args);
			}
			eventType = eventPrefix + eventType.ucfirst();
			this.$target.trigger(eventType, args);
		},

		/**
		 *
		 */
		_triggerHandler: function(eventType, args) {
			var optionName = 'on' + eventType.ucfirst(),
				callbackResult = undefined,
				result;
			if (typeof this.settings[optionName] == 'function') {
				var f = this.settings[optionName];
				callbackResult = f.apply(this.$target, args);
			}
			eventType = eventPrefix + eventType.ucfirst();
			result = ((result = this.$target.triggerHandler(eventType, args)) !== undefined ? result : callbackResult);
			return result;
		},

		/**
		 *
		 */
		_showError: function(message) {
			if (!this.$errorMessage) {
				this.$errorMessage = $('<div></div>').addClass(cssPrefix + 'error');
				this.$wrapper.append(this.$errorMessage);
			}
			if (this.$loadingAnimation) {
				this.$loadingAnimation.remove();
			}
			this.$errorMessage.html(message);
		},

		/**
		 *
		 */
		enable: function() {
			this.settings.disabled = false;
			this._setCssClasses();
		},

		/**
		 *
		 */
		disable: function() {
			this.settings.disabled = true;
			this._setCssClasses();

			// Stop hammer recognition
			if (this.hammerManager) {
				this.hammerManager.stop(true);
				this._isPanning(false);
				this._isPinching(false);
			}
		},

		/**
		 *
		 */
		isDisable: function() {
			return this.settings.disabled;
		},
		/**
		 *
		 */
		isPanning: function() {
			return this._isPanning();
		},

		/**
		 *
		 */
		isPinching: function() {
			return this._isPinching;
		},

		/**
		 *
		 */
		size: function() {
			return this._imageSize();
		},

		/**
		 *
		 */
		position: function() {
			return this._imagePosition();
		},

		/**
		 *
		 */
		reset: function() {
			this._resetSize();
			this._center();
		},

		/**
		 *
		 */
		resetSize: function() {
			this._resetSize();
		},

		/**
		 *
		 */
		center: function(dimension) {
			this._center(dimension);
		},

		/**
		 * Getter  and setter for zoom. Parameter origin is optional, but should be used for better
		 * usability experience.
		 */
		zoom: function(zoom, origin) {
			if (!zoom) {
				// return current zoom, rounded to 3 decimals
				var zoom = this._getZoom();
				return Math.round(zoom * 1000) / 1000;
			}
			else {
				this._zoomTo(zoom, origin);
			}
		},

		/**
		 * Increments the zoom by settings.zoomStep.
		 */
		zoomIn: function(origin) {
			var zoom = this._getZoom() + this.settings.zoomStep;
			return this._zoomTo(zoom, origin);
		},

		/**
		 * Descrements the zoom by settings.zoomStep.
		 */
		zoomOut: function(origin) {
			var zoom = this._getZoom() - this.settings.zoomStep;
			return this._zoomTo(zoom, origin);
		},

		/**
		 *
		 */
		option: function(key, value) {
			if (!key) {
				// Return copy of current settings
				return $.extend({}, this.settings);
			}
			else {
				var options;
				if (typeof key == 'string') {
					if (arguments.length === 1) {
						// Return specific value of settings
						return (this.settings[key] !== undefined ? this.settings[key] : null);
					}
					options = {};
					options[key] = value;
				} else {
					options = key;
				}
				this._setOptions(options);
				this._setCssClasses();
			}
		},

		/**
		 *
		 */
		_setOptions: function(options) {
			for (key in options) {
				var value = options[key];

				// Disable/modify plugin before we apply new settings
				if ($.inArray(key, ['disableHammerPlugin', 'disableMouseWheelPlugin']) > -1) {
					this._unbind();
				}
				else if ($.inArray(key, ['disabled', 'disablePan', 'disableZoom']) > -1 && this.hammerManager) {
					this.hammerManager.stop(true);
				}
				else if (key == 'cssWrapperClass' && typeof this.settings.cssWrapperClass == 'string') {
					this.$wrapper.removeClass(this.settings.cssWrapperClass);
				}

				// Apply option
				this.settings[key] = value;

				// Disable/modify plugin before we apply new settings
				if ($.inArray(key, ['disableHammerPlugin', 'disableMouseWheelPlugin']) > -1) {
					this._bind();
				}
				else if ($.inArray(key, ['disabled', 'disablePan', 'disableZoom']) > -1 && this.hammerManager) {
					this.hammerManager.stop(true);
				}
				else if (key == 'cssWrapperClass' && typeof this.settings.cssWrapperClass == 'string') {
					this.$wrapper.addClass(this.settings.cssWrapperClass);
				}
				else if ($.inArray(key, ['minZoom', 'maxZoom']) > -1) {
					// Update constraints and set current zoom again to apply new constraints
					this._setConstraints();
					var zoom = this._getZoom();
					this._zoomTo(zoom);
				}
				else if (key == 'autoCenter') {
					switch (value) {
						case true:
						case 'both':
							this._center();
							break;

						case 'horizontal':
						case 'vertical':
							this._center(value);
							break;
					}
				}
			}
		},

		/**
		 *
		 */
		destroy: function() {
			this._trigger('destroy');

			this._unbind();
			this._removeWrapper();

			this._isPanning(false);
			this._isPinching(false);

			this.$target.removeData(datakey);
			if (this.mode == 'container') {
				this.$image.removeData(datakey);
			}
		}
	};

	/**
	 *
	 */
	$.fn.apImageZoom = function( options ) {
		if (typeof options === 'string') {
			var instance, method, result, returnValues = [];
			var params = Array.prototype.slice.call(arguments, 1);
			this.each(function() {
				instance = $(this).data(datakey);
				if (!instance) {
					returnValues.push(undefined);
				}
				// Ignore private methods
				else if ((typeof (method = instance[options]) === 'function') && (options.charAt(0) !== '_')) {
					var result = method.apply(instance, params);
					if (result !== undefined) {
						returnValues.push(result);
					}
				}
			});
			// Return an array of values for the jQuery instances
			// Or the value itself if there is only one
			// Or keep chaining
			return returnValues.length ? (returnValues.length === 1 ? returnValues[0] : returnValues) : this;
		}
		return this.each(function() {
			new ApImageZoom(this, options);
		});
	};

	/**
	 * Default settings for ApZoomImage plugin.
	 */
	ApImageZoom.defaultSettings = {
		imageUrl: undefined,
		loadingAnimation: undefined,	// Options: undefined, 'text', 'throbber', 'image'
		loadingAnimationData: undefined,
		cssWrapperClass: undefined,
		initialZoom: 'auto',			// Options: value (float), 'none', 'auto', 'min', 'max'
		minZoom: 0.2,					// = 20%
		maxZoom: 1.0,					// = 100%
		zoomStep: 0.1,					// = 10% steps
		autoCenter : true,				// Options: true, 'both', 'horizontal', 'vertical'

		disableHammerPlugin: false,
		disableMouseWheelPlugin: false,

		disabled: false,
		disablePan: false,
		disableZoom: false,

		doubleTap: undefined			// Options: 'open', 'zoomMax', 'zoomToggle'
	};

}(jQuery));





/*!
* screenfull
* v1.2.0 - 2014-04-29
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;
		var valLength;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// new WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0, valLength = val.length; i < valLength; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		onchange: function () {},
		onerror: function () {},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return !!document[fn.fullscreenElement];
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return !!document[fn.fullscreenEnabled];
			}
		}
	});

	document.addEventListener(fn.fullscreenchange, function (e) {
		screenfull.onchange.call(screenfull, e);
	});

	document.addEventListener(fn.fullscreenerror, function (e) {
		screenfull.onerror.call(screenfull, e);
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();









/*! Hammer.JS - v2.0.2 - 2014-07-26
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e,f;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0,f=a.length;f>e;e++)b.call(c,a[e],e,a);else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0,g=e.length;g>f;f++)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]);return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==hb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0,e=a.length;e>d;d++)if(c&&a[d][c]==b||!c&&a[d]===b)return d;return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0,g=a.length;g>f;f++){var h=b?a[f][b]:a[f];s(e,h)<0&&d.push(a[f]),e[f]=h}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0,h=fb.length;h>g;g++)if(c=fb[g],e=c?c+f:b,e in a)return e;return d}function w(){return lb++}function x(b,c){var d=this;this.manager=b,this.callback=c,this.element=b.element,this.target=b.options.inputTarget,this.domHandler=function(a){l(b.options.enable,[b])&&d.handler(a)},this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(a,this.evWin,this.domHandler)}function y(a){var b;return new(b=ob?M:pb?N:nb?P:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&vb&&d-e===0,g=b&(xb|yb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=kb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY),b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,C(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===vb||f.eventType===xb)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=yb&&(i>ub||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=jb(l.x)>jb(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;c++)b[c]={clientX:ib(a.pointers[c].clientX),clientY:ib(a.pointers[c].clientY)};return{timeStamp:kb(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:ib(a[0].clientX),y:ib(a[0].clientY)};for(var c=0,d=0,e=0;b>e;e++)c+=a[e].clientX,d+=a[e].clientY;return{x:ib(c/b),y:ib(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?zb:jb(a)>=jb(b)?a>0?Ab:Bb:b>0?Cb:Db}function H(a,b,c){c||(c=Hb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Hb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ib)-I(a[1],a[0],Ib)}function K(a,b){return H(b[0],b[1],Ib)/H(a[0],a[1],Ib)}function L(){this.evEl=Kb,this.evWin=Lb,this.allow=!0,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Ob,this.evWin=Pb,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=Rb,this.targetIds={},x.apply(this,arguments)}function O(a,b){var c=t(a.touches),d=this.targetIds;if(b&(vb|wb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.targetTouches),h=t(a.changedTouches),i=[];if(b===vb)for(e=0,f=g.length;f>e;e++)d[g[e].identifier]=!0;for(e=0,f=h.length;f>e;e++)d[h[e].identifier]&&i.push(h[e]),b&(xb|yb)&&delete d[h[e].identifier];return i.length?[u(g.concat(i),"identifier",!0),i]:void 0}function P(){x.apply(this,arguments);var a=k(this.handler,this);this.touch=new N(this.manager,a),this.mouse=new L(this.manager,a)}function Q(a,b){this.manager=a,this.set(b)}function R(a){if(q(a,Xb))return Xb;var b=q(a,Yb),c=q(a,Zb);return b&&c?Yb+" "+Zb:b||c?b?Yb:Zb:q(a,Wb)?Wb:Vb}function S(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=$b,this.simultaneous={},this.requireFail=[]}function T(a){return a&dc?"cancel":a&bc?"end":a&ac?"move":a&_b?"start":""}function U(a){return a==Db?"down":a==Cb?"up":a==Ab?"left":a==Bb?"right":""}function V(a,b){var c=b.manager;return c?c.get(a):a}function W(){S.apply(this,arguments)}function X(){W.apply(this,arguments),this.pX=null,this.pY=null}function Y(){W.apply(this,arguments)}function Z(){S.apply(this,arguments),this._timer=null,this._input=null}function $(){W.apply(this,arguments)}function _(){W.apply(this,arguments)}function ab(){S.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function bb(a,b){return b=b||{},b.recognizers=m(b.recognizers,bb.defaults.preset),new cb(a,b)}function cb(a,b){b=b||{},this.options=i(b,bb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=y(this),this.touchAction=new Q(this,this.options.touchAction),db(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[2])},this)}function db(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function eb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var fb=["","webkit","moz","MS","ms","o"],gb=b.createElement("div"),hb="function",ib=Math.round,jb=Math.abs,kb=Date.now,lb=1,mb=/mobile|tablet|ip(ad|hone|od)|android/i,nb="ontouchstart"in a,ob=v(a,"PointerEvent")!==d,pb=nb&&mb.test(navigator.userAgent),qb="touch",rb="pen",sb="mouse",tb="kinect",ub=25,vb=1,wb=2,xb=4,yb=8,zb=1,Ab=2,Bb=4,Cb=8,Db=16,Eb=Ab|Bb,Fb=Cb|Db,Gb=Eb|Fb,Hb=["x","y"],Ib=["clientX","clientY"];x.prototype={handler:function(){},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(a,this.evWin,this.domHandler)}};var Jb={mousedown:vb,mousemove:wb,mouseup:xb},Kb="mousedown",Lb="mousemove mouseup";j(L,x,{handler:function(a){var b=Jb[a.type];b&vb&&0===a.button&&(this.pressed=!0),b&wb&&1!==a.which&&(b=xb),this.pressed&&this.allow&&(b&xb&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:sb,srcEvent:a}))}});var Mb={pointerdown:vb,pointermove:wb,pointerup:xb,pointercancel:yb,pointerout:yb},Nb={2:qb,3:rb,4:sb,5:tb},Ob="pointerdown",Pb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Ob="MSPointerDown",Pb="MSPointerMove MSPointerUp MSPointerCancel"),j(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Mb[d],f=Nb[a.pointerType]||a.pointerType,g=f==qb;e&vb&&(0===a.button||g)?b.push(a):e&(xb|yb)&&(c=!0);var h=s(b,a.pointerId,"pointerId");0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Qb={touchstart:vb,touchmove:wb,touchend:xb,touchcancel:yb},Rb="touchstart touchmove touchend touchcancel";j(N,x,{handler:function(a){var b=Qb[a.type],c=O.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:qb,srcEvent:a})}}),j(P,x,{handler:function(a,b,c){var d=c.pointerType==qb,e=c.pointerType==sb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(xb|yb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Sb=v(gb.style,"touchAction"),Tb=Sb!==d,Ub="compute",Vb="auto",Wb="manipulation",Xb="none",Yb="pan-x",Zb="pan-y";Q.prototype={set:function(a){a==Ub&&(a=this.compute()),Tb&&(this.manager.element.style[Sb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),R(a.join(" "))},preventDefaults:function(a){if(!Tb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,Xb),f=q(d,Zb),g=q(d,Yb);return e||f&&g||f&&c&Eb||g&&c&Fb?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var $b=1,_b=2,ac=4,bc=8,cc=bc,dc=16,ec=32;S.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=V(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=V(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=V(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=V(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?T(d):""),a)}var c=this,d=this.state;bc>d&&b(!0),b(),d>=bc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=ec)},canEmit:function(){for(var a=0;a<this.requireFail.length;a++)if(!(this.requireFail[a].state&(ec|$b)))return!1;return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(cc|dc|ec)&&(this.state=$b),this.state=this.process(b),void(this.state&(_b|ac|bc|dc)&&this.tryEmit(b))):(this.reset(),void(this.state=ec))},process:function(){},getTouchAction:function(){},reset:function(){}},j(W,S,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(_b|ac),e=this.attrTest(a);return d&&(c&yb||!e)?b|dc:d||e?c&xb?b|bc:b&_b?b|ac:_b:ec}}),j(X,W,{defaults:{event:"pan",threshold:10,pointers:1,direction:Gb},getTouchAction:function(){var a=this.options.direction;if(a===Gb)return[Xb];var b=[];return a&Eb&&b.push(Zb),a&Fb&&b.push(Yb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Eb?(e=0===f?zb:0>f?Ab:Bb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?zb:0>g?Cb:Db,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return W.prototype.attrTest.call(this,a)&&(this.state&_b||!(this.state&_b)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=U(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(Y,W,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Xb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&_b)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(Z,S,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Vb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(xb|yb)&&!f)this.reset();else if(a.eventType&vb)this.reset(),this._timer=e(function(){this.state=cc,this.tryEmit()},b.time,this);else if(a.eventType&xb)return cc;return ec},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===cc&&(a&&a.eventType&xb?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=kb(),this.manager.emit(this.options.event,this._input)))}}),j($,W,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Xb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&_b)}}),j(_,W,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Eb|Fb,pointers:1},getTouchAction:function(){return X.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Eb|Fb)?b=a.velocity:c&Eb?b=a.velocityX:c&Fb&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&jb(b)>this.options.velocity&&a.eventType&xb},emit:function(a){var b=U(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(ab,S,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Wb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&vb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=xb)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=cc,this.tryEmit()},b.interval,this),_b):cc}return ec},failTimeout:function(){return this._timer=e(function(){this.state=ec},this.options.interval,this),ec},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==cc&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),bb.VERSION="2.0.2",bb.defaults={domEvents:!1,touchAction:Ub,inputTarget:null,enable:!0,preset:[[$,{enable:!1}],[Y,{enable:!1},["rotate"]],[_,{direction:Eb}],[X,{direction:Eb},["swipe"]],[ab],[ab,{event:"doubletap",taps:2},["tap"]],[Z]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var fc=1,gc=2;cb.prototype={set:function(a){return h(this.options,a),this},stop:function(a){this.session.stopped=a?gc:fc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&cc)&&(e=b.curRecognizer=null);for(var f=0,g=d.length;g>f;f++)c=d[f],b.stopped===gc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(_b|ac|bc)&&(e=b.curRecognizer=c)}},get:function(a){if(a instanceof S)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&eb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0,e=c.length;e>d;d++)c[d](b)}},destroy:function(){this.element&&db(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(bb,{INPUT_START:vb,INPUT_MOVE:wb,INPUT_END:xb,INPUT_CANCEL:yb,STATE_POSSIBLE:$b,STATE_BEGAN:_b,STATE_CHANGED:ac,STATE_ENDED:bc,STATE_RECOGNIZED:cc,STATE_CANCELLED:dc,STATE_FAILED:ec,DIRECTION_NONE:zb,DIRECTION_LEFT:Ab,DIRECTION_RIGHT:Bb,DIRECTION_UP:Cb,DIRECTION_DOWN:Db,DIRECTION_HORIZONTAL:Eb,DIRECTION_VERTICAL:Fb,DIRECTION_ALL:Gb,Manager:cb,Input:x,TouchAction:Q,Recognizer:S,AttrRecognizer:W,Tap:ab,Pan:X,Swipe:_,Pinch:Y,Rotate:$,Press:Z,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==hb&&define.amd?define(function(){return bb}):"undefined"!=typeof module&&module.exports?module.exports=bb:a[c]=bb}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.map







/**
* @license ap-image-fullscreen.js v0.6.2
* Updated: 09.03.2016
* {DESCRIPTION}
* Copyright (c) 2014 armin pfaeffle
* Released under the MIT license
* http://armin-pfaeffle.de/licenses/mit
*/

;(function($) {

	var datakey = '__apifs__';
	var cssPrefix = 'apifs-';
	var eventNamespace = 'apifs';
	var triggerEventPrefix = 'apifs';


	/**
	 * Makes the first character of str uppercase and returns that string.
	 */
	function ucfirst(str) {
		str += ''; // ensure that str is a string
		var c = str[0].toUpperCase();
		return c + str.substr(1);
	}

	/**
	 * Adds ucfirst() method to String class. Makes the first character
	 * of str uppercase and returns that string.
	 */
	if (!String.prototype.ucfirst) {
		String.prototype.ucfirst = function() {
			return ucfirst(this);
		};
	}

	/**
	 *
	 */
	jQuery.fn.tagName = function() {
		return this.prop('tagName').toLowerCase();
	}


	/**
	 * Constructor for ApImageFullscreen plugin.
	 */
	function ApImageFullscreen(elements, options) {
		var self = this;
		var settings = $.extend(true, {}, ApImageFullscreen.defaultSettings, options);

		// Do not remake the fullscreen plugin
		// BUT if autoReassign = true, we remove the element from it's previous fullscreen instance,
		// so we can use it within this instance-
		// IMPORTANT: do NOT use jQuery's each() function here because we use return false
		var instance;
		for (index = 0; index < $(elements).length; index++) {
			if ((instance = $(elements).data(datakey)) !== undefined) {
				if (settings.autoReassign) {
					instance.remove($(elements));
				}
				else {
					return false;
				}
			}
		}

		this.$elements = $(elements);
		this.settings = settings;
		this._init();

		// Save the instance
		this.$elements.each(function() {
			$(this).data(datakey, self);
		});
	}

	/**
	 * ApImageFullscreen class.
	 */
	ApImageFullscreen.prototype = {

		/**
		 *
		 */
		_init: function() {
			this.currentIndex = -1;
			this.opened = false;
			this.usePseudeoFullscreenFallback = false;

			this._addContainer();
			this._obtainAndAppendImages();
			this._addButtons();
			this._bind();

			if (this.settings.autoOpen) {
				this.open();
			}
		},

		/**
		 *
		 */
		_addContainer: function() {
			this.$container = $(ApImageFullscreen.template).appendTo($('body'));
			this.$fullscreenElement = this.$container.find('.' + cssPrefix + 'fullscreen-element').attr('tabIndex', -1);
			this.$wrapper = this.$container.find('.' + cssPrefix + 'wrapper');
			this.$images = this.$container.find('.' + cssPrefix + 'images');
		},

		/**
		 *
		 */
		_removeContainer: function() {
			this.$container.remove();
		},

		/**
		 *
		 */
		_obtainAndAppendImages: function() {
			var self = this,
				imageUrl,
				$item,
				backgroundColor;

			this.$elements.each(function(index) {
				if ((imageUrl = self._obtainImageUrl(this)) !== undefined) {
					if (($item = self._addImage(imageUrl)) !== undefined) {
						// Apply background color if it is set
						if ((backgroundColor = $(this).data('background-color')) !== undefined) {
							$item.css('background-color', backgroundColor);
						}

						// Load image if necessary
						if (self.settings.lazyLoad === false || self.settings.lazyLoad == 'instant') {
							self._loadImages($item);
						}
					}
				}
			});
		},

		/**
		 *
		 */
		_obtainImageUrl: function(element) {
			switch ($(element).tagName()) {
				case 'img':
					return $(element).attr('src');

				case 'a':
					return $(element).attr('href');

				// TODO: Perhaps there are other elements to consider?
			}
			return undefined;
		},

		/**
		 *
		 */
		_addImage: function(element, index) {
			// Obtain image url and create item
			var imageUrl = (typeof element == 'string' ? element : this._obtainImageUrl(element));
			if (imageUrl) {
				var $item = $('<li></li>').data({imageUrl: imageUrl, loaded: false});

				var itemCount = this._getItemCount();
				if (itemCount > 0 && typeof index == 'number') {
					index = Math.min(Math.max(0, parseInt(index)), itemCount - 1);
					this._getItem(index).before($item);
				}
				else {
					this.$images.append($item);
				}
				return $item;
			}
			return undefined;
		},

		/**
		 *
		 */
		_loadImages: function($items) {
			var self = this;
			$items.each(function() {
				if ($(this).data('loaded') === false) {
					var options = $.extend({
						imageUrl: $(this).data('imageUrl'),
						onSwipeRight: function() {
							if (self.settings.enableSwipe) {
								self.previous();
							}
						},
						onSwipeLeft: function() {
							if (self.settings.enableSwipe) {
								self.next();
							}
						},
						onLoaded: function() {
							self._trigger('imageLoaded');
						}
					}, self.settings.imageZoom);

					$(this)
						.data('loaded', true)
						.apImageZoom(options);
				}
			});
		},

		/**
		 *
		 */
		_addButtons: function() {
			this._addButtonContainers();

			// The correct order of the button names is important because of later usage of "append"!
			var buttonNames = ['previous', 'next', 'close', 'download'];
			for (index in buttonNames) {
				var buttonName = buttonNames[index];
				var options;

				// First we have to check if there is a correct position for this button before we add it...
				if (typeof this.settings.buttons == 'object' && (options = this.settings.buttons[buttonName]) != undefined) {
					var position = options.position.split(',').map(function(s) { return s.trim().toLowerCase(); });
					if (['left', 'right'].indexOf(position[0]) > -1 && ['top', 'center', 'bottom'].indexOf(position[1]) > -1) {
						// ... then we can create the button and add it to the correct container
						var $button = $('<a></a>')
								.html(buttonName.ucfirst())
								.attr('href', '#' + buttonName)
								.addClass(cssPrefix + 'button')
								.addClass(cssPrefix + buttonName + '-button');
						if (typeof options.text === 'string') {
							$button.attr('alt', options.text).attr('title', options.text)
						}
						var containerClass = '.' + cssPrefix + 'buttons-' + position[0] + '-' + position[1];
						this.$wrapper.find(containerClass).append($button);
						this['$' + buttonName + 'Button'] = $button;

						// Assign button click: buttonName == name of called method
						$button.data('clickMethodName', buttonName);

						if (options.visible === false) {
							$button.hide();
						}

						var themeName = (typeof options.theme === 'string' ? options.theme : this.settings.defaultTheme);
						$button.addClass(cssPrefix + 'button-theme-' + themeName);
					}
				}
			}
			this._updateButtons();
		},

		/**
		 *
		 */
		_addButtonContainers: function() {
			var horizontal = ['left', 'right'];
			var vertical = ['top', 'center', 'bottom'];
			for (hIndex in horizontal) {
				for (vIndex in vertical) {
					$('<div></div>')
						.addClass(cssPrefix + 'buttons')
						.addClass(cssPrefix + 'buttons-' + horizontal[hIndex] + '-' + vertical[vIndex])
						.appendTo(this.$wrapper);
				}
			}
		},

		/**
		 *
		 */
		_updateButtons: function() {
			var disabledButtonClassName = cssPrefix + 'button-disabled';

			if (this.currentIndex == 0) {
				this.$previousButton.addClass(disabledButtonClassName);
			}
			else if (this.$previousButton.hasClass(disabledButtonClassName)) {
				this.$previousButton.removeClass(disabledButtonClassName);
			}

			if (this.currentIndex == this._getItemCount() - 1) {
				this.$nextButton.addClass(disabledButtonClassName);
			}
			else if (this.$nextButton.hasClass(disabledButtonClassName)) {
				this.$nextButton.removeClass(disabledButtonClassName);
			}
		},

		/**
		 *
		 */
		_bind: function() {
			var self = this;

			var buttonNames = ['previous', 'next', 'close', 'download'];
			for (index in buttonNames) {
				var $button = this['$' + buttonNames[index] + 'Button'];
				$button.on('click.' + eventNamespace, function() {
					if (!$(this).hasClass(cssPrefix + 'button-disabled')) {
						var f = self[$(this).data('clickMethodName')];
						if (typeof f == 'function') {
							f.apply(self);
						}
					}
					return false;
				});
			}

			var keyMap = {
				 9 : 'tab',
				'9+s' : 'shiftTab',
				27 : 'escape',
				32 : 'space',
				33 : 'pageUp',
				34 : 'pageDown',
				35 : 'end',
				36 : 'pos1',
				37 : 'left',
				38 : 'up',
				39 : 'right',
				40 : 'down'
			};
			this.$fullscreenElement
				.on('keydown.' + eventNamespace, function(evt) {

					// Deactivate every shortcut when element is closed
					if (!self.opened) {
						return;
					}

					if (evt.keyCode == 8) {
						self.close();
					}
					else if (evt.keyCode >= 48 && evt.keyCode <= 57 && self.settings.shortcuts.paging) {
						// If key is a number and paging is enabled then scroll to the corresponding page
						var index = evt.keyCode - 48;
						if (self.settings.shortcuts.zeroHandling != 'first') {
							index--;
							if (self.settings.shortcuts.zeroHandling == 'tenth' && index == -1) {
								index = 9;
							}
						}
						if (index >= 0 && index < self._getItemCount()) {
							self._show(index, true);
						}
						evt.preventDefault();
					}
					else {
						// .. else check if there is a action for the entered key
						var keyCode = evt.keyCode + (evt.shiftKey ? '+s' : '');
						var action;
						if (keyCode in self.settings.shortcuts) {
							action = self.settings.shortcuts[keyCode];
						}
						else if (keyCode in keyMap) {
							var key = keyMap[keyCode];
							action = self.settings.shortcuts[key];
						}
						if (action && self._handleKeyAction(action, evt)) {
							evt.preventDefault();
						}
					}
				});

			if (screenfull.enabled) {
				document.addEventListener(screenfull.raw.fullscreenchange, function () {
					if (!screenfull.isFullscreen) {
						self._onFullscreenClose();
					}
					else {
						// Fixing a resize problem when opening fullscreen
						self._resetItems(self.currentIndex);
					}
				});
			}
		},

		/**
		 *
		 */
		_handleKeyAction: function(action, evt) {
			if (typeof action == 'function') {
				var context = this._getCurrentItem();
				action.apply(context, evt);
			}
			else {
				switch (action) {
					case 'zoomIn':
						this._getCurrentItem().apImageZoom('zoomIn');
						return true;

					case 'zoomOut':
						this._getCurrentItem().apImageZoom('zoomOut');
						return true;

					case 'zoomToggle':
						this._getCurrentItem().apImageZoom('zoomToggle');
						return true;

					case 'next':
						this.next();
						return true;

					case 'previous':
						this.previous();
						return true;

					case 'first':
						this.first();
						return true;

					case 'last':
						this.last();
						return true;

					case 'close':
						this.close();
						return true;
				}
			}
			return false;
		},

		/**
		 *
		 */
		_unbind: function() {
			var buttonNames = ['previous', 'next', 'close', 'download'];
			for (index in buttonNames) {
				var $button = this['$' + buttonNames[index] + 'Button'];
				$button.off('click.' + eventNamespace);
			}

			this.$fullscreenElement.off('keydown.' + eventNamespace);
		},

		/**
		 *
		 */
		_show: function(index, animate) {
			var self = this;

			// Make index valid
			index = Math.min(Math.max(index, 0), this._getItemCount() - 1);
			if (this.currentIndex != index) {
				this.currentIndex = index;
				var $item = this._getItem(index);

				// Lazy load image method for after showing page
				var loadImage = function() {
					if (self.settings.lazyLoad == 'visible') {
						self._loadImages($item);
					}
				}

				// It's important to reset image BEFORE it is shown
				if (this.settings.resetOnScroll) {
					this._resetItems($item);
				}

				// Move images container to the right position, so it shows image with given index
				var left = (-1 * index * 100) + '%';
				if (animate === true) {
					this.$images
						.stop(true, false)
						.animate({left: left}, this.settings.slideDuration, loadImage);
				}
				else {
					this.$images.css('left', left);
					loadImage();
				}

				this.$fullscreenElement.focus();
				this._updateButtons();
			}
		},

		/**
		 *
		 */
		_getItem: function(index) {
			var $item = this.$images.children(':eq(' + index + ')');
			return $item;
		},

		/**
		 *
		 */
		_getCurrentItem: function() {
			var $item = this._getItem(this.currentIndex);
			return $item;
		},

		/**
		 *
		 */
		_getAllItems: function() {
			var $items = this.$images.children();
			return $items;
		},

		/**
		 *
		 */
		_getItemCount: function() {
			var count = this.$images.children().length;
			return count;
		},

		/**
		 *
		 */
		_resetItems: function($items) {
			var self = this;
			if ($items == undefined) {
				$items = this._getAllItems();
			}
			else if (typeof $items == 'number') {
				$items = this._getItem($items);
			}

			$items.each(function() {
				if ($(this).data('loaded') === true) {
					$(this).apImageZoom('reset');
					self._trigger('reset', [$(this)]);
				}
			});
		},

		/**
		 *
		 */
		_trigger: function(eventType, args, $context) {
			var optionName = 'on' + eventType.ucfirst(),
				f = this.settings[optionName];
			if (typeof f == 'function') {
				$context = ($context ? $context : this._getCurrentItem());
				f.apply($context, args);
			}
			eventType = triggerEventPrefix + eventType.ucfirst();
			this._getCurrentItem().trigger(eventType, args);
		},

		/**
		 *
		 */
		_triggerHandler: function(eventType, args, $context) {
			var optionName = 'on' + eventType.ucfirst(),
				f = this.settings[optionName],
				callbackResult = undefined,
				result;
			$context = ($context ? $context : this._getCurrentItem());
			if (typeof f == 'function') {
				callbackResult = f.apply($context, args);
			}
			eventType = triggerEventPrefix + eventType.ucfirst();
			result = ((result = $context.triggerHandler(eventType, args)) !== undefined ? result : callbackResult);
			return result;
		},

		/**
		 *
		 */
		open: function(index) {
			var self = this;

			// Do not allow calling open twice or open the fullscreen mode if there is no image
			if (this.opened || this._getItemCount() == 0) {
				return;
			}
			this.opened = true;

			// Load all images if necessary
			if (this.settings.lazyLoad !== false && this.settings.lazyLoad != 'instant' && this.settings.lazyLoad !== 'visible') {
				this._loadImages(this._getAllItems());
			}

			if (this.settings.enableScreenfull && typeof screenfull == 'object' && screenfull.enabled) {
				screenfull.request( this.$fullscreenElement[0] );
				$('html').removeClass(cssPrefix + 'pseudo-fullscreen').addClass(cssPrefix + 'screenfull');

				// Check if fullscreen is visible, because if not, we can do a fallback to pseudo fullscreen
				// see this why we need this check: https://github.com/sindresorhus/screenfull.js/issues/56
				this._validateVisibleFullscreen();
			}
			else {
				$('html').removeClass(cssPrefix + 'screenfull').addClass(cssPrefix + 'pseudo-fullscreen');
			}

			if (this.settings.resetOnOpen) {
				this._resetItems();
			}

			if (!index) {
				index = (this.currentIndex > -1 ? this.currentIndex : 0);
			}

			// Bad fix that let's the browser load the image a lil' bit later, so image size is
			// most time correct. The reason for this is that some IE version shows fullscreen
			// content, although the content has not correct size, so image is smaller than it
			// should be.
			setTimeout(function() {
				self._show(index, false);
			}, 100);

			this._trigger('open');
		},

		/**
		 *
		 */
		_validateVisibleFullscreen: function() {
			var self = this;
			setTimeout(function() {
				if (!self.$fullscreenElement.is(':visible')) {
					self.opened = false;
					$('html').removeClass(cssPrefix + 'screenfull');
					if (self._triggerHandler('pseudoFullscreenFallback') !== false) {
						self.opened = true;
						self.usePseudeoFullscreenFallback = true;
						$('html').addClass(cssPrefix + 'pseudo-fullscreen');
					}
				}
			}, this.settings.fullscreenVisibleCheckDuration);
		},

		/**
		 *
		 */
		close: function() {
			if (this.opened) {
				if (screenfull.isFullscreen || $('html').hasClass(cssPrefix + 'screenfull')) {
					screenfull.exit();
				}
				this._onFullscreenClose();
				this._trigger('close');
			}
		},

		/**
		 *
		 */
		_onFullscreenClose: function() {
			this.opened = false;
			$('html')
				.removeClass(cssPrefix + 'screenfull')
				.removeClass(cssPrefix + 'pseudo-fullscreen');
			this.currentIndex = -1;
			this._getAllItems().apImageZoom('destroy');
			this._getAllItems().each(function(index, element) {
				$(this).data('loaded', false);
			});
		},

		/**
		 *
		 */
		isOpen: function() {
			return this.opened;
		},

		/**
		 *
		 */
		next: function() {
			if (this.currentIndex < this._getItemCount() - 1) {
				this._show(this.currentIndex + 1, this.opened);
			}
		},

		/**
		 *
		 */
		previous: function() {
			if (this.currentIndex > 0) {
				this._show(this.currentIndex - 1, this.opened);
			}
		},

		/**
		 *
		 */
		first: function() {
			this._show(0, this.opened);
		},

		/**
		 *
		 */
		last: function() {
			this._show(this._getItemCount() - 1, this.opened);
		},

		/**
		 *
		 */
		add: function(element, index) {

			// TODO

			this._trigger('add');
		},

		/**
		 *
		 */
		remove: function($image) {

			// TODO

			this._trigger('remove');
		},

		/**
		 *
		 */
		download: function() {
			var url = this._getCurrentItem().find('img').attr('src');
			window.open(url);
			this._trigger('download');
		},

		/**
		 *
		 */
		option: function(key, value) {
			if (!key) {
				// Return copy of current settings
				return $.extend({}, this.settings);
			}
			else {
				var options;
				if (typeof key == 'string') {
					if (arguments.length === 1) {
						// Return specific value of settings
						return (this.settings[key] !== undefined ? this.settings[key] : null);
					}
					options = {};
					options[key] = value;
				} else {
					options = key;
				}
				this._setOptions(options);
			}
		},

		/**
		 *
		 */
		_setOptions: function(options) {
			for (key in options) {
				var value = options[key];

				// Disable/modify plugin before we apply new settings
				// TODO

				// Apply option
				this.settings[key] = value;

				// Disable/modify plugin before we apply new settings
				// TODO
			}
		},

		/**
		 *
		 */
		destroy: function() {
			this._trigger('destroy');

			if (this.opened) {
				this.close();
			}
			this._unbind();
			this._removeContainer();

			this.$elements.each(function() {
				$(this).removeData(datakey);
			});
		}



		// TODO: Remove in final version
		,_log: function(message) {
			if (!this.$log) {
				this.$log = $('<div></div>').addClass(cssPrefix + 'log').appendTo( $('body') );//this.$wrapper);
			}
			this.$log.append( $('<p></p>').html(message) );
		}


	};

	/**
	 *
	 */
	$.fn.apImageFullscreen = function( options ) {
		if (typeof options === 'string') {
			var instance, method, result, returnValues = [];
			var params = Array.prototype.slice.call(arguments, 1);
			this.each(function() {
				instance = $(this).data(datakey);
				if (!instance) {
					returnValues.push(undefined);
				}
				// Ignore private methods
				else if ((typeof (method = instance[options]) === 'function') && (options.charAt(0) !== '_')) {
					var result = method.apply(instance, params);
					if (result !== undefined) {
						returnValues.push(result);
					}
				}
			});
			// Return an array of values for the jQuery instances
			// Or the value itself if there is only one
			// Or keep chaining
			return returnValues.length ? (returnValues.length === 1 ? returnValues[0] : returnValues) : this;
		}
		else {
			var instance = new ApImageFullscreen(this, options);
			return (instance ? this : false);
		}
	};

	/**
	 * Default settings for ApImageFullscreen plugin.
	 */
	ApImageFullscreen.defaultSettings = {
		autoReassign: true,
		autoOpen: false,
		 // TODO images: [],
		imageZoom : {
			minZoom: 'contain',
			maxZoom: 1.0,
			loadingAnimation: 'throbber',
			loadingAnimationFadeOutDuration: 500,
			doubleTap: 'zoomToggle'
		},
		lazyLoad: 'visible',			// Options: false, 'instant', 'open', 'visible'
		slideDuration: 250,
		resetOnOpen: true,
		resetOnScroll: true,

		defaultTheme: 'dark',			// Themes: 'gray', 'contrast', 'light', 'dark'
		buttons: {						// Options for position: left|right, top|center|bottom
			close:    { visible: true, position: 'right, top', text: 'Close', theme: undefined },
			next:     { visible: true, position: 'right, bottom', text: 'Next', theme: undefined },
			previous: { visible: true, position: 'right, bottom', text: 'Previous', theme: undefined },
			download: { visible: true, position: 'left, bottom', text: 'Download', theme: undefined }
		},

		shortcuts: {					// Possible actions: zoomIn, zoomOut, zoomToggle, next, previous, first, last, close
			escape: 'close',
			space: 'zoomToggle',

			tab: 'next',
			shiftTab: 'previous',

			up: 'zoomIn',
			right: 'next',
			down: 'zoomOut',
			left: 'previous',

			pageDown: 'next',
			pageUp: 'previous',
			pos1: 'first',
			end: 'last',

			paging: true,
			zeroHandling: 'first'		// Options: first, tenth, none/false
		},

		enableScreenfull: true,
		fullscreenVisibleCheckDuration: 20, // in ms
		enableSwipe: true

		// TODO: Add option so this plugins auto-assigns click event on elements for opening fullscreen
	};

	/**
	 *
	 */
	ApImageFullscreen.template =
		'<div class="' + cssPrefix + 'container">' +
			'<div class="' + cssPrefix + 'fullscreen-element">' +
				'<div class="' + cssPrefix + 'wrapper ' + cssPrefix +'clearfix">' +
					'<ul class="' + cssPrefix + 'images">' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';

}(jQuery));
