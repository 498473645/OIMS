package
{
	import flash.display.Sprite;
	import flash.events.IOErrorEvent;
	import flash.events.MouseEvent;
	import flash.events.ProgressEvent;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.events.Event;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import cn.com.oims.flash.util.BMPDecoder;
	import flash.display.Loader;
	import flash.system.System;
	import flash.display.PixelSnapping;
	import flash.ui.ContextMenu;
	import flash.ui.ContextMenuItem;
	import flash.utils.ByteArray;
	import flash.external.ExternalInterface;
	import cn.com.adobe.images.PNGEncoder;
	import cn.com.adobe.images.JPGEncoder;
	import flash.geom.Rectangle;
	import flash.geom.Matrix;
	import flash.display.Stage;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	
	/**
	 * ...
	 * @author liuzhengyong
	 */
	public class paint extends Sprite
	{
		private var _lineWidth:Number = 1;
		private var _lineColor:uint = 0xFF0000;
		private var _drawFlag:Boolean = false;
		private var _bitmapData:BitmapData;
		private var _bitmap:Bitmap;
		private var _firstTime:Boolean = true;
		private var _zoomRate:Number = 1;
		private var _swfLoadComplete:String;
		private var _photoNotFound:String;
		private var _myZoom:String;
		private var _tip:String;
		private var _tipWidth:Number;
		private var _originalWidth:Number;
		private var _originalHeight:Number;
		
		public function paint()
		{
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			_swfLoadComplete = stage.loaderInfo.parameters['swfLoadComplete']; //swf文件加载完成时调用的js方法
			_photoNotFound = stage.loaderInfo.parameters['photoNotFound']; //图片路径错误回调函数
			_myZoom = stage.loaderInfo.parameters['myZoom'];
			this.loaderInfo.addEventListener(Event.COMPLETE, swfLoadComplete);
			jsCallAs();
			stage.showDefaultContextMenu = false;
			stage.addEventListener(Event.RESIZE, myResize)
		}
		
		private function myResize(e:Event):void
		{
			if (!_firstTime)
			{
				var paintSprite:Sprite = getChildAt(0) as Sprite;
				_zoomRate = Math.min(stage.stageWidth / _bitmap.width, stage.stageHeight / _bitmap.height);
				paintSprite.width = _bitmap.width * _zoomRate;
				paintSprite.height = _bitmap.height * _zoomRate;
			}
		}
		
		/**
		 * 该SWF文件加载完毕
		 * @param	e
		 */
		private function swfLoadComplete(e:Event):void
		{
			ExternalInterface.call(_swfLoadComplete, 'swf文件加载完成');
		}
		
		/**
		 * 加载绘图图片
		 * @param	param {url:,[tip],[tipWidth]}
		 */
		public function loadPhoto(param:Object):void
		{
			if (param.hasOwnProperty('url'))
			{
				_tip = param.hasOwnProperty('tip') ? param.tip : '';
				_tipWidth = param.hasOwnProperty('tipWidth') ? param.tipWidth : 0;
				var url:String = param.url;
				if (url.substr(-3, 3).toLocaleLowerCase() == 'bmp')
				{
					loadBMPFile(url);
				}
				else
				{
					loadUnBMPFile(url);
				}
			}
		}
		
		/**
		 * 加载bmp格式的图片
		 * @param	url bmp格式的图片路径
		 */
		public function loadBMPFile(url:String):void
		{
			var loader:URLLoader = new URLLoader();
			//指定loader以二进制返回数据
			loader.dataFormat = URLLoaderDataFormat.BINARY;
			loader.load(new URLRequest(url));
			loader.addEventListener(Event.COMPLETE, loadBMPComplete);
			loader.addEventListener(IOErrorEvent.IO_ERROR, ioError);
		}
		
		/**
		 * bmp图片加载完成
		 * @param	e
		 */
		public function loadBMPComplete(e:Event):void
		{
			var loader:URLLoader = e.target as URLLoader;
			var decoder:BMPDecoder = new BMPDecoder();
			//将二进制数据转换成BitmapData
			_bitmapData = decoder.decode(loader.data);
			(loader.data as ByteArray).clear();
			//用来显示效果的Bitmap获取位图数据，图片平滑
			_bitmap = new Bitmap(_bitmapData, 'auto', true);
			_originalWidth = _bitmap.width;
			_originalHeight = _bitmap.height;
			initPaint();
		}
		
		/**
		 * 加载非bmp文件
		 * @param	url 非bmp格式的图片路径
		 */
		private function loadUnBMPFile(url:String):void
		{
			var load:Loader = new Loader();
			load.load(new URLRequest(url));
			load.contentLoaderInfo.addEventListener(Event.COMPLETE, loadUnBMPFileComplete);
			load.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, ioError);
		}
		
		/**
		 * 非bmp图片加载完成
		 * @param	e
		 */
		private function loadUnBMPFileComplete(e:Event):void
		{
			var temLoader:Loader = e.target.loader as Loader;
			_bitmapData = new BitmapData(temLoader.width, temLoader.height, false);
			_bitmapData.draw(temLoader);
			_bitmap = new Bitmap(_bitmapData, 'auto', true);
			(e.target.content.bitmapData as BitmapData).dispose();
			temLoader.unload();
			_originalWidth = _bitmap.width;
			_originalHeight = _bitmap.height;
			initPaint();
		}
		
		private function ioError(e:IOErrorEvent):void
		{
			if (_photoNotFound != null)
			{
				ExternalInterface.call(_photoNotFound, e.toString());
			}
		}
		
		/**
		 * 初始化绘图面板
		 */
		private function initPaint():void
		{
			var paintSprite:Sprite;
			if (_firstTime) //首次创建绘图
			{
				paintSprite = new Sprite();
				//创建画图层
				paintSprite.addChild(createPaintSprite(_bitmap.width, _bitmap.height));
				//创建提示文本
				addChild(createTextField());
				_firstTime = false;
			}
			else
			{
				paintSprite = getChildAt(0) as Sprite;
				//清空画图层
				clear();
				//清空图片数据
				var bitmap:Bitmap = paintSprite.getChildAt(0) as Bitmap;
				bitmap.bitmapData.dispose();
				paintSprite.removeChildAt(0);
				removeChildAt(1);
				addChild(createTextField());
			}
			//添加图片
			paintSprite.addChildAt(_bitmap, 0);
			//调整宽高比，根据flash窗口尺寸使图片在等比缩放时保持最佳效果
			_zoomRate = Math.min(stage.stageWidth / _bitmap.width, stage.stageHeight / _bitmap.height);
			paintSprite.width = _bitmap.width * _zoomRate;
			paintSprite.height = _bitmap.height * _zoomRate;
			addChildAt(paintSprite, 0); //将绘图区域放置到第一个
			paintSprite.stage.scaleMode = StageScaleMode.NO_SCALE; //设置绘图区域为不可拉伸
		}
		
		/**
		 * 创建提示文本
		 * @return 文本
		 */
		private function createTextField():TextField
		{
			var _txt:TextField = new TextField();
			_txt.text = _tip || '';
			_txt.width = _tipWidth || 45;
			_txt.height = 24;
			var txtFormat:TextFormat = new TextFormat();
			txtFormat.size = 20;
			_txt.setTextFormat(txtFormat);
			return _txt;
		}
		
		/**
		 * 创建绘图层
		 * @param	width 绘图层宽度
		 * @param	height 绘图层高度
		 * @return 绘图层
		 */
		private function createPaintSprite(width:Number, height:Number):Sprite
		{
			var canvas:Sprite = new Sprite();
			canvas.graphics.beginFill(0xffffff,0);
			canvas.graphics.drawRect(0, 0, width, height);
			canvas.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			canvas.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
			canvas.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
			canvas.addEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
			return canvas;
		}
		
		/**
		 * 添加js调用方法
		 */
		private function jsCallAs():void
		{
			ExternalInterface.addCallback('clear', clear);
			ExternalInterface.addCallback('loadPhoto', loadPhoto);
			ExternalInterface.addCallback('save', save);
			ExternalInterface.addCallback('setPenColor', setPenColor);
			ExternalInterface.addCallback('setPenSize', setPenSize);
		}
		
		public function setPenColor(color:String):void
		{
			_lineColor = colorHex(color);
		}
		
		private function colorHex(color:String):uint 
		{
			if (color.match(/^(rgb|RGB)/)!=null)
			{
				var c:Array = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
				var strHex:String = '#';
				for (var i:int = 0; i < c.length; i++) 
				{
					var hex:String = Number(c[i]).toString(16);
					if (hex == "0") {
						hex += hex;
					}
					strHex += hex;
				}
				if (strHex.length != 7) {
					strHex = '#FF0000';
				}
				return new uint(strHex.replace('#','0x'));
			}else if (color.indexOf('#')==0) 
			{
				return new uint(color.replace('#','0x'));
			}else 
			{
				return new uint(color);
			}
		}
		
		public function setPenSize(size:int):void
		{
			_lineWidth = size;
		}
		
		/**
		 */
		public function save(url:String, param:Object):void
		{
			var paramStr:String = '';
			for (var i:String in param)
			{
				paramStr += i + '=' + param[i] + '&';
			}
			paramStr = paramStr.length > 0 ? '?' + paramStr.substring(0, paramStr.length - 1) : '';
			url += paramStr;
			var request:URLRequest = new URLRequest(url);
			request.contentType = 'application/octet-stream';
			request.method = 'POST';
			var imageData:BitmapData = new BitmapData(_bitmap.width, _bitmap.height);
			imageData.draw(getChildAt(0));
			request.data = PNGEncoder.encode(imageData);
			
			var urlLoader:URLLoader = new URLLoader();
			urlLoader.dataFormat = URLLoaderDataFormat.BINARY;
			urlLoader.addEventListener(Event.COMPLETE, saveComplete);
			urlLoader.load(request);
		}
		
		private function saveComplete():void
		{
			ExternalInterface.call('saveComplete', true);
		}
		
		public function clear():void
		{
			var canvas:Sprite = (this.getChildAt(0) as Sprite).getChildAt(1) as Sprite;
			if (canvas != null)
			{
				canvas.graphics.clear();
				canvas.graphics.beginFill(0xffffff,0);
				canvas.graphics.drawRect(0, 0, _bitmap.width, _bitmap.height);
				canvas.graphics.lineStyle(_lineWidth, _lineColor);
			}
		}
		
		private function onMouseDown(e:MouseEvent):void
		{
			var canvas:Sprite = e.target as Sprite;
			canvas.graphics.moveTo(this.mouseX / _zoomRate, this.mouseY / _zoomRate);
			canvas.graphics.lineStyle(this._lineWidth, _lineColor);
			_drawFlag = true;
		}
		
		private function onMouseMove(e:MouseEvent):void
		{
			if (_drawFlag)
			{
				var canvas:Sprite = e.target as Sprite;
				canvas.graphics.lineTo(this.mouseX / _zoomRate, this.mouseY / _zoomRate);
				canvas.graphics.moveTo(this.mouseX / _zoomRate, this.mouseY / _zoomRate);
			}
		}
		
		private function onMouseUp(e:MouseEvent):void
		{
			_drawFlag = false;
		}
		
		private function onMouseOut(e:MouseEvent):void
		{
			_drawFlag = false;
		}
	}

}