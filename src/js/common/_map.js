(function() {

	if ($('#score-map').length <= 0) return;

	class Map {

		constructor() {
			this._mapDiv = document.getElementById('score-map');
			this._icon = 'img/marker.png';
			// this._iconActive = 'img/marker-active.png';

			this._init();
		}

		_init() {
			this._createMap();
			this._getItems(this._addMarkers.bind(this));
		}

		_createMap() {
			let center = {
				lat: +this._mapDiv.getAttribute('data-center-lat'),
				lng: +this._mapDiv.getAttribute('data-center-lng')
			};

			this._map = new google.maps.Map(this._mapDiv, {
				center: center,
				zoom: 9,
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false
			});
		}

		_getItems(callback) {
			let xhr = new XMLHttpRequest();
			let path = this._mapDiv.getAttribute('data-items');

			xhr.onload = function() {
				if (xhr.status == 200) callback(this.responseText);
			};

			xhr.open('GET', path, true);

			xhr.send();
		}

		_addMarkers(data) {

			let that = this;

			that._items = JSON.parse(data).addresses;

			that._activeWindow = null;

			for (let i = 0; i < that._items.length; i++) {
				// create marker
				let marker = new google.maps.Marker({
					position: that._items[i].position,
					map: that._map,
					icon: {
						url: that._icon,
						scaledSize: new google.maps.Size(28, 36),
						anchor: new google.maps.Point(14, 36)
					}
				});

				//create popup
				let infoWindow = new google.maps.InfoWindow({
					content: that._createContent(that._items[i].content)
				});

				// show current popup on marker click and close other popups
				marker.addListener('click', () => {
					if (that._activeWindow) that._activeWindow.close();
					infoWindow.open(that._map, marker);
					that._activeWindow = infoWindow;
				});
			}
		}

		_createContent(data) {
			let time = (info) => {
				let infoBox = '';

				for (let i = 0; i < info.length; i++) {
					infoBox += `<div>${info[i]}</div>`;
				}

				return infoBox;
			};

			return `<div class="map-infowindow">
				<div class="map-infowindow__address">${data.address}</div>
				<div class="map-infowindow__time">
					${time(data.time)}
				</div>
			</div>`;
		}

	}

	new Map();

})();