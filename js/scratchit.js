/*
 * 
 * 
 *
 * Copyright (c) 2015 Michelle Anderson
 * Licensed under the MIT license.
 */
;(function ($, window, document, undefined) {
    var x, y;
    var defaults = {
        propertyName: "value"
    };

    /**
     * ScratchIt
     * @constructor
     * @param {Object} element
     * @param {Object} options (Optional)
     */
    function ScratchIt(element, options) {
        this.$element = $(element);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = 'scratchIt';

        this.isScratching === undefined && this.init();

    }

    ScratchIt.prototype = {

        init: function () {

            this.canvas = this.$element.find('canvas');
            this.context = this.canvas[0].getContext('2d');

            var context = this.context;
            this.context.fillStyle = "#C4B178";
            this.context.fillRect(0, 0, this.canvas[0].width, this.canvas[0].height);

            this.scratchedImage = this.$element.find('img').first();
            var scratchedImage = this.scratchedImage[0];

            window.onload = function () {
                context.drawImage(scratchedImage, 0, 0);
                context.globalCompositeOperation = "destination-out";
            };

            this.context.strokeStyle = "#F00";
            this.context.lineJoin = "round";
            this.context.lineWidth = 20;

            this.offsetxy = this.canvas.offset();

            this.canvas.on({
                'mousedown.scratchit': $.proxy(this.onDown, this),
                'mousemove.scratchit': $.proxy(this.onMove, this),
                'mouseup.scratchit': $.proxy(this.onUp, this),
                'touchstart.scratchit': $.proxy(this.onDown, this),
                'touchmove.scratchit': $.proxy(this.onMove, this),
                'touchend.scratchit': $.proxy(this.onUp, this)
            });
        },

        onDown: function (e) {
            e.preventDefault();
            var context = this.context;
            context.beginPath();
            x = e.pageX == undefined?(e.originalEvent.touches.pageX + document.body.scrollLeft): e.pageX;
            y = (e.pageY == undefined?(e.originalEvent.touches.pageY + document.body.scrollTop): e.pageY) - this.offsetxy.top;
            context.moveTo(x, y);
            this.isScratching = true;

        },
        onMove: function (e) {
            e.preventDefault();
            var context = this.context;
            if (!this.isScratching) {
                return;
            }
            x = e.pageX == undefined?(e.originalEvent.touches[0].pageX + document.body.scrollLeft): e.pageX;
            y = (e.pageY == undefined?(e.originalEvent.touches[0].pageY + document.body.scrollTop): e.pageY) - this.offsetxy.top;
            context.lineTo(x, y);
            context.stroke();
        },
        onUp: function () {
            this.isScratching = false;
            var context = this.context;
            var imgData = context.getImageData(0, 0, this.canvas[0].width, this.canvas[0].height);
            var allPX = imgData.width * imgData.height;
            var Num = 0;
            for (var i = 0; i < allPX; i++) {
                if (imgData.data[i * 4 + 3] == 0) {
                    Num++;
                }
            }
            if (Num >= allPX * 2 / 3) {
                context.beginPath();
                context.fillStyle = 'rgba(0, 0, 0, 1)';
                this.context.fillRect(0, 0, this.canvas[0].width, this.canvas[0].height);
            }
        },

        onLoad: function () {

        }

    };

    $.fn.scratchIt = function (options) {
        return this.each(function () {
            if (!$.data(this, 'scratchIt')) {
                $.data(this, 'ScratchIt',
                    new ScratchIt(this, options));
            }

        });
    };
})(jQuery, window, document);
