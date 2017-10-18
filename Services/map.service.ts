import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Order } from '../models/Order';

declare let ol: any;
declare let Config: any;
declare let proj4: any;

@Injectable()
export class MapService {     
    public MainMap: any;
    public PointFeatures: any;
    public CentreFeatures: any;
    public CircleFeatures: any;
    public Distance: number;
    public X: number;
    public Y: number;
    public ZoomLevel: number;
    public Resolutions: number[];    

    constructor(public httpService: HttpService) {      
        this.MainMap = null;
        this.PointFeatures = new ol.source.Vector({ 
            source: new ol.source.Vector({ projection: this.GetProjection() })
        });
        this.CentreFeatures = new ol.source.Vector({ 
            source: new ol.source.Vector({ projection: this.GetProjection() })
        });
        this.CircleFeatures = new ol.source.Vector({ 
            source: new ol.source.Vector({ projection: this.GetProjection() })
        });
        this.X = 311460;    // centre of UK, default
        this.Y = 526181;    // centre of UK, default
        this.ZoomLevel = 0; // zoomed right out, default        
        this.Resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625];
     }
    
    public GetNearbyOrders(x: number, y: number, radius: number): void {        
        var url = Config.DATA_SERVICE_API_URL + "/api/Orders/GetNearbyOrders?X=" + x + "&y=" + y + "&distance=" + radius;
        this.httpService.CallApiHttpGet(url, orders => {
          this.initializeMap(x, y, radius, orders);                          
        });        
    }    

    public GetProjection(): any {
        proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs');
        var projection = ol.proj.get('EPSG:27700');        
        return projection;
    }

    private initializeMap(x: number, y: number, radius: number, orders: Order[]): void {
        this.X = x;
        this.Y = y;
        this.Distance = radius;
        this.ZoomLevel = this.getZoomLevelFromRadius(radius); 
        this.addPointFeatures(orders); 
        this.addCircleFeature(x, y, radius);
        this.addCentrePointFeature(x, y);
        if (this.MainMap == null) return;  // valid for async call for data only  
        this.MainMap.getView().setCenter([x, y]);
        this.MainMap.getView().setZoom(this.ZoomLevel); 
    }   

    private addPointFeatures(orders: Order[]) {        
        this.PointFeatures.clear();
        var features = [];
        for (var order of orders) {
            var feature = new ol.Feature({
              geometry: new ol.geom.Point([order.CentroidX, order.CentroidY]),
              orderId: order.OrderId,
              siteId: order.SiteId        
            });
            features.push(feature);      
        }        
        this.PointFeatures.addFeatures(features);        
    } 

    private addCentrePointFeature(x: number, y: number): void {
        var feature = new ol.Feature({
            geometry: new ol.geom.Point([x, y]),
            id: "centre point"                   
        });
        this.CentreFeatures.clear();
        this.CentreFeatures.addFeature(feature);
    } 

    private addCircleFeature(x: number, y: number, radius: number): void {
        var feature = new ol.Feature({
            geometry: new ol.geom.Circle([x, y], radius),
            id: "buffer"                   
        });
        this.CircleFeatures.clear();
        this.CircleFeatures.addFeature(feature);
    } 

    private getZoomLevelFromRadius(radius: number): number {       
        if (radius <= 50) return 14;
        if (radius > 50 && radius <= 100) return 13;
        if (radius > 100 && radius <= 200) return 12;
        if (radius > 200 && radius <= 400) return 11;
        if (radius > 400 && radius <= 800) return 10;
        if (radius > 800 && radius <= 1600) return 9;
        if (radius > 1600 && radius <= 3200) return 8;
        if (radius > 3200 && radius <= 6400) return 7;
        if (radius > 6400 && radius <= 12800) return 6;
        if (radius > 12800 && radius <= 25600) return 5;
        if (radius > 25600 && radius <= 51200) return 4;
        if (radius > 51200 && radius <= 102400) return 3;
        if (radius > 102400 && radius <= 204800) return 2;
        if (radius > 204800 && radius <= 409600) return 1;
        return 0;                
    }   
}
