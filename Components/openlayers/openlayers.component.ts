import {Component} from '@angular/core';
import {MapService} from '/services/map.service';

declare var ol: any;

@Component({
  template: require('./openlayers.component.html'),
  styles: [ require('./openlayers.component.css') ]
})
export class OLComponent {
    private ol: any;           

    public constructor(public mapService: MapService) {
      // ---- Uncomment to configure different base maps ---- 
      //  this.baseMaps = {
      // OpenStreetMap: new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      // }),
      // Esri: new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      //   attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      // }),
      // CartoDB: new L.TileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      // })
    //};
  }

    public ngOnInit(): void {
        this.mapService.MainMap = new ol.Map({
            view: new ol.View({
                projection: this.mapService.GetProjection(),
                center: [this.mapService.X, this.mapService.Y],
                zoom: this.mapService.ZoomLevel,
                resolutions: this.mapService.Resolutions
            }),
            layers: [
                new ol.layer.Tile({ source: new ol.source.OSM()}), 
                this.getCentrePointVectorLayer(), // the centre point feature
                this.getCircleVectorLayer(), // the bounding circle of the search
                this.getPointVectorLayer_Clustered(), // the actual points and clustered features
                this.getPointVectorLayer_Unclustered() // the actual points and clustered features         
            ],
            controls: ol.control.defaults({
                zoom: true,              
            }),
            target: "map"
          });         
    }

    /**layer with clustering only at smallest scales with minimum distance buffer */
    private getPointVectorLayer_Unclustered(): any {         
        var thisClass = this;
        var clusterFeatures = new ol.source.Cluster({
            distance: 1,
            source: this.mapService.PointFeatures
        });         
        var vectorLayer = new ol.layer.Vector({
            source: clusterFeatures,            
            maxResolution: 0.25,
            style: function (feature) {
                return thisClass.getPointVectorLayerStyle(feature, thisClass);                
            } 
        });
        return vectorLayer;
    } 

    /**layer with clustering only at larger scales with normal distance buffer */
    private getPointVectorLayer_Clustered(): any {         
        var thisClass = this;
        var clusterFeatures = new ol.source.Cluster({
            distance: 50,
            source: this.mapService.PointFeatures
        });         
        var vectorLayer = new ol.layer.Vector({
            source: clusterFeatures,            
            minResolution: 0.25,
            style: function (feature) {
                return thisClass.getPointVectorLayerStyle(feature, thisClass);               
            } 
        });
        return vectorLayer;
    } 

    private getPointVectorLayerStyle(feature: any, thisClass: any): any {      
        var styleCache = {};      
        var featureCount = feature.get("features").length;
        var style = styleCache[featureCount];
        if (!style) {
            if (featureCount === 1) {
                style = thisClass.getSinglePointStyle();
            } else {
                style = thisClass.getClusterPointStyle(featureCount);
            }    
            styleCache[featureCount] = style;
        }
        return style;                        
    }

    private getCentrePointVectorLayer(): any {        
        var vectorLayer = new ol.layer.Vector({
            source: this.mapService.CentreFeatures,
            style: this.getCentrePointStyle()                    
        });
        return vectorLayer;
    }

    private getCircleVectorLayer(): any {    
        var vectorLayer = new ol.layer.Vector({
            source: this.mapService.CircleFeatures,
            style: this.getCircleStyle()
        });
        return vectorLayer;
    }

    private getSinglePointStyle(): any {
        return new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: [0.5, 1],
                opacity: 1.0,
                src: '/images/marker.png'
            }))
        });
    } 

    private getCentrePointStyle(): any {
        return new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: [0.5, 1],
                opacity: 1.0,
                src: '/images/location.png'
            }))
        });
    }     

    private getClusterPointStyle(featureCount: number): any {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 20,
                stroke: new ol.style.Stroke({
                    color: '#fff'
                }),
                fill: new ol.style.Fill({
                    color: '#3399CC'
                })
            }),
            text: new ol.style.Text({
                text: featureCount.toString(),
                fill: new ol.style.Fill({
                    color: '#fff'
                })
            })
        });
    }   

    private getCircleStyle(): any {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#3399CC',
                width: 1
            }),             
        });
    }     

     
}
