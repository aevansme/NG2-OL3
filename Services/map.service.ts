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

    public GetMockNearbyOrders(x: number, y: number, radius: number): void {        

        var orders = new Array<Order>();      
        orders.push(new Order("29927aa1-6fbd-45dc-ad79-4f6924cd9dc4", "4a436bec-111d-4f80-8e4d-4d9cdfae592e", 532643, 180969));
        orders.push(new Order("1fdab703-a847-4d4c-a891-23a5f4c54fb4", "26917528-0cbc-46c1-885d-ab7d91dba837", 533025, 181146));
        orders.push(new Order("d90fd9cb-75f8-4121-9d6b-b1d1a7fd8667", "643cdcc0-9b13-42c1-9449-273f42ef2d50", 532516, 181115));
        orders.push(new Order("c845e7e8-dcee-47df-b5ca-cb1ad7ebd592", "1c734db7-641c-4d59-bb8c-63347e9435c0", 532524, 181028));
        orders.push(new Order("804d6665-a6a3-4a46-8a06-4dc7f416e7d0", "99ec666a-a5de-44fa-98e3-a239d3cf853a", 532563, 181235));
        orders.push(new Order("632152ef-efdc-447f-8e11-e9f28e8e4153", "af8048ca-4393-43c9-81a9-bd1bae0474ff", 532649, 180929));
        orders.push(new Order("4e6c8a3c-8702-445f-a106-55985b93f419", "fb703fb9-987a-471b-9134-8939fb8cf687", 532546, 181004));
        orders.push(new Order("1e7dabe5-b423-4e80-8fa0-13bc54ce2b5c", "cd6c42fc-15d4-4540-af8b-bce518862789", 532567, 181105));
        orders.push(new Order("b855940a-f2c6-447a-858a-8870b4c002cc", "8a6e3b24-15a8-438c-9e77-4179ad5881a5", 532569, 181105));
        orders.push(new Order("a6301805-b930-42ad-96c7-34dd4a1c3450", "9962edea-bcc8-4340-b475-cf676acf547e", 532721, 180679));
        orders.push(new Order("0f382057-4da9-48ef-a081-f4b70e37b04b", "fc7fb080-bcd8-40c1-99e6-63f987a9da7d", 532600, 180768));
        orders.push(new Order("2449bbcb-7d3d-4dbc-8de4-15c12d83f360", "c9856e16-cac3-460c-b218-853e5126af57", 532616, 180857));
        orders.push(new Order("9b3851ee-4179-4e92-8f50-a9a622145969", "f44b168c-fb2b-47b2-a7a9-5d3203b72bd8", 532621, 180880));
        orders.push(new Order("37c44ee5-2960-46ad-b669-0661320cbe9d", "c16ff8ae-8209-4054-a30e-0510ad62e892", 532615, 180856));
        orders.push(new Order("fedbd1a8-ee7b-4be9-9bfd-37b269607e6d", "11f93a4f-2f50-4271-bd94-548841dda7ab", 532642, 180969));
        orders.push(new Order("befb7e7d-d108-43b5-a94c-781313186d3b", "38dd7ccc-22f8-4324-acdf-eb52a76abefa", 532642, 180966));
        orders.push(new Order("81d0e21a-1242-4238-a11c-04e3be256f7d", "2d4bbcb8-e5c9-487b-a641-21249361d842", 532659, 180803));
        orders.push(new Order("2091a913-f3fb-4007-bd98-b4d51e460a52", "88849f7a-2cea-4904-bd5d-c7298447fdb7", 532825, 181145));
        orders.push(new Order("f7142030-f4d1-4a78-a606-b629a3192690", "5e4c72be-888f-4954-a6cc-f53ba29b2d0e", 532650, 180691));
        orders.push(new Order("beb4f6c9-e1e3-4d87-931c-6da200e66b89", "376db2c6-70fd-4ca8-95c3-29e114326eea", 532702, 181006));
        orders.push(new Order("d606d6cd-0516-46d0-b5ed-817e59caf400", "d2df8195-8cb7-4dea-822d-575d9d8d9dbc", 532701, 180919));
        orders.push(new Order("1e92f925-788d-4e1d-8298-0bdb3eef365a", "f33ece12-eb3c-4bab-b0ce-11436005c47d", 532735, 180995));
        orders.push(new Order("ebd6289e-af0f-4bf6-b93e-fb358099b792", "10d0ea89-0d79-45c0-9284-a324c5903cd6", 532786, 181386));
        orders.push(new Order("816dc864-5191-4ce6-806c-f98aa1039df6", "ba15e281-3e45-4255-b8cf-4d7c2e54f47a", 532753, 181326));
        orders.push(new Order("1b0de08d-e94f-491b-a089-00f3e9a45283", "e5fab163-f003-40b1-b4b8-6352f6f83d4a", 532761, 180968));
        orders.push(new Order("d414cb1e-90cc-4bc4-b93e-21be3d443769", "40d13185-ea96-436f-b2a4-32f8dfc8bb44", 532721, 180679));
        orders.push(new Order("5e167ebf-ed91-4992-a54d-d1bdc8709f50", "186ec0be-b67e-43a0-a96c-4ac34a0a4f16", 532794, 181022));
        orders.push(new Order("6cffa906-d50e-46ec-aada-b404431995e2", "831c58e2-75a8-4960-9641-7aaf3cbce7db", 532786, 180839));
        orders.push(new Order("e074eee6-4d7e-49fb-a5e6-503ba6d21610", "c45d7178-730d-4cae-8e47-ad09564ad76c", 532818, 181325));
        orders.push(new Order("5754bbac-5886-41a2-9aae-4133fd03c101", "94ae3cf7-79e4-454e-b9f5-e8c68efedf69", 532818, 181324));
        orders.push(new Order("95fde4f0-0f93-4bac-8176-8a3da4ba21b2", "b090ee4a-4c3e-4c26-838c-83dcbbe739b8", 532796, 180786));
        orders.push(new Order("dfc9f099-faad-4878-9e26-004c285008d4", "f7625e8f-6173-4afd-905b-c98cf745a731", 532824, 181145));
        orders.push(new Order("7f428de1-c77e-41fe-933a-5829f46c4a95", "5b90d20a-0be2-4f03-856f-cac820490439", 532810, 180748));
        orders.push(new Order("69024c2b-3e48-4016-a675-f9f9baebeef5", "a3d68474-1d4a-467a-9bb8-877b54f967cf", 532827, 181002));
        orders.push(new Order("ba808060-9810-4851-a964-5ba46f353ada", "090163a5-8b3f-41c4-b427-307228a16ce8", 532944, 181057));
        orders.push(new Order("0602a5a5-7718-4659-b5fd-2cb650b9b11f", "7682504d-9206-45f9-8c5d-13ef3f20833a", 532947, 181012));
        orders.push(new Order("f9293ca4-a12d-4489-b582-99770ca79ef2", "292aae10-2d25-4313-83c8-949855d275e3", 532831, 181061));
        orders.push(new Order("76ea83ae-e662-4ae7-bbdd-44b28d81e6f4", "8c197b5b-0bc3-4a8d-99fc-c39ff2db84e5", 532811, 180749));
        orders.push(new Order("3f747db7-a458-4c29-97bf-c4660cf195dc", "84a21594-d738-4bf2-9293-0da3c8f72c90", 532814, 180749));
        orders.push(new Order("1ba7c7ff-a4ce-498e-b611-f99d894ad941", "ffdf2338-2273-49ab-a003-d0088d2f58a8", 532813, 180749));
        orders.push(new Order("9dd82a5d-beb0-4f55-b69b-f0b9250f9c1f", "14011d01-cdaf-48a6-82b9-e6b3adf92aec", 532811, 180749));
        orders.push(new Order("31b04929-fd72-4685-bd11-255657566660", "9763088b-f62d-41d0-9b20-da58d7b302fc", 532859, 181048));
        orders.push(new Order("5eee4db4-5920-4128-9edb-eb3852f24a09", "93528690-0a4f-4b21-ab6f-d9a82a9429aa", 532872, 181076));
        orders.push(new Order("2f40ea4e-c9c7-4d7f-9514-5e4d2bfdfb80", "62e0ca22-2670-46d7-9bff-13f18e6fd4cc", 532882, 181027));
        orders.push(new Order("b830045e-3d8f-46ec-9447-0005d71711b3", "780b7b68-c6ce-4bfb-8bd0-ba941fb7321c", 532894, 181367));
        orders.push(new Order("33af4750-7cd7-43e3-91b6-65340374fc6d", "6c6f3fe9-3549-4525-8fc8-e73be21fa3da", 532903, 181062));
        orders.push(new Order("ce7ee2f3-34e4-4707-8900-e1a58643ec38", "f6c90071-ec4f-419c-a0e1-73e91e0f61e2", 532911, 181403));
        orders.push(new Order("1adb868a-0f2a-454a-8dad-f0437e576c82", "d5e3f324-816c-4714-93b7-60af14d873ee", 532924, 181099));
        orders.push(new Order("11c7785d-a802-48b2-b857-f5560fc0ae7b", "4fd09d8b-925c-416d-9be0-3aee0f266310", 532920, 180965));
        orders.push(new Order("0c5304d3-dfb9-4d0c-b4de-5cc9a88d39b6", "2a4caffd-512d-443c-b32e-32c1ebaafc3f", 532938, 181179));
        orders.push(new Order("628a669e-9d6b-47cf-acad-0b71d161b828", "f68b5a87-42dc-41a6-8521-f43e2e017b73", 532956, 181354));
        orders.push(new Order("17a4b44e-5674-4eb6-b774-791a55aa9ea8", "4b53f66d-c93d-4b57-a0d0-94a5dfcad3ba", 532930, 180718));
        orders.push(new Order("de6f0e67-2a62-4f91-b819-f3352ef05392", "e5188073-533d-4106-b8d0-6c65f9cf241a", 532938, 181178));
        orders.push(new Order("f1d260b9-29f6-4882-8532-e3cb097d9266", "a53cfd05-9aed-4b8c-8d53-d1f8a9877c42", 532934, 181424));
        orders.push(new Order("4deb425e-7091-4835-b57e-2f60ac84f1fc", "8485bd79-2c4d-4583-bc15-6ef01e901c92", 532983, 181108));
        orders.push(new Order("918296e1-8405-4579-a770-84dccb72e5d1", "9a06555d-a883-4dab-9b7e-f610500443a9", 532983, 181053));
        orders.push(new Order("7e8538a9-f7c4-4c29-82b0-c39886a9152e", "44d43d03-8b4f-468e-8638-83d33af35fc4", 532989, 181348));
        orders.push(new Order("bb76fbcf-496b-4505-b55d-618788c2d4f6", "540eb2b1-9429-4e1a-872c-0e12514fdeee", 532988, 181349));
        orders.push(new Order("e845f578-ebc7-4fd6-b4b7-fab0c09675c6", "4945712d-d65c-4a92-ac13-0a6883fe4624", 532991, 181395));
        orders.push(new Order("286ed845-afd1-4e95-af18-9bfb50b7f1af", "b3526073-10db-4879-b384-b1b1a79e0555", 532949, 180635));
        orders.push(new Order("9fe0dbb4-d960-4086-af4e-add3421a7e2c", "372a1c55-974e-4098-a990-c58b2acbfbd5", 533024, 181145));
        orders.push(new Order("f52faf1f-b473-418e-a0c9-3613f6b28fd2", "6d40046c-54ae-4029-a82d-413fcbfc543f", 533023, 181195));
        orders.push(new Order("69dc8a9d-435c-4572-a2df-f1d74b7cfbc3", "66310ee6-77d4-421c-920a-c98be60eb891", 533028, 181006));
        orders.push(new Order("5ef130b7-d58b-4b42-8d0b-13f492138cec", "64181fa7-691d-4fd7-a50a-64d96763ced8", 533030, 180919));
        orders.push(new Order("da89f04a-7972-4328-a90c-ac83bb09562c", "eb51dbd5-fae9-4bda-bfeb-7d142dfcc60f", 533074, 181329));
        orders.push(new Order("4f74d975-f322-4d72-8e65-22735a39c180", "97a5a8ed-7dcf-488e-8768-85227fa5b162", 533031, 180968));
        orders.push(new Order("5ebb7fe9-2341-4996-8a8c-a8eabbe3b80c", "2a78d4b8-86b7-4cec-ab13-c7a4a1a5ecbe", 533045, 181046));
        orders.push(new Order("ca885b8b-71a7-4fa2-a64c-af79d80c4d81", "6bc3846b-1015-4ec8-aa1e-018434fbb45c", 533033, 180711));
        orders.push(new Order("c48f4bde-24b5-4293-99f2-7135ac95cb7d", "8be2e524-07d7-4156-a0b6-a92a5f43083b", 533058, 181307));
        orders.push(new Order("ffe56a0a-dc77-4e2b-9d95-857d2960dc2a", "c3e889bf-51ad-4621-96ad-be007c94c24f", 533065, 181097));
        orders.push(new Order("07243650-08f3-4131-812d-3ec79c091106", "f0242acc-bdf7-43d6-b7cc-a63256103de6", 533063, 180985));
        orders.push(new Order("2ae8846e-8bc0-483f-8b76-2942d0178f27", "b0ac8d30-7519-42d5-bf4f-ab56b47b84d1", 533065, 181097));
        orders.push(new Order("8d994355-8669-4f49-b5c1-9f5313efca12", "30487642-fdc5-4c89-9994-e3c970d812e4", 533079, 181396));
        orders.push(new Order("6bb88b94-47df-4553-a302-e92c438d8a0a", "a34a4d21-fe94-46f7-9aed-dc797531bedb", 533092, 181330));
        orders.push(new Order("1ad1cada-61af-45af-ac2d-72da18fb6dc0", "fd419264-35c5-40bb-b7a8-218e7f1bde9a", 533083, 180795));
        orders.push(new Order("8b0998c6-d6b4-46c5-b70f-bed250b885e8", "3ddc944d-7ee6-411b-80fc-7b996ff93e0b", 533104, 181157));
        orders.push(new Order("ffcbd5e5-67fd-4ba7-a838-297e5b34db96", "e070e1a0-bcc8-4fd2-ac46-061a566cd195", 533115, 181348));
        orders.push(new Order("4cc467a8-17d0-44c6-979e-30e36ae77037", "d3866381-2127-4eb9-ba81-8adfe785cce8", 533121, 181114));
        orders.push(new Order("163097d4-f88e-454e-b5b6-bb1017beec3c", "9d9f7e7d-7896-41ad-854b-a65e3a979b12", 533130, 181411));
        orders.push(new Order("efee621d-d87e-48f4-b516-6a307acf3573", "91c96ba1-10c2-4e41-8d29-edbcbccc54a7", 533126, 180791));
        orders.push(new Order("b19e6b64-b21c-4d75-8837-721a5d32e615", "d84680c5-2225-4ca3-b305-f8d30b0beaf1", 533129, 181411));
        orders.push(new Order("3422c47f-25e1-4eaa-a047-1955a0612c67", "7688bc14-c2a5-4d05-bb36-6f5371e673cc", 533163, 181279));
        orders.push(new Order("e1cbf017-b149-4e34-b396-a4df49f46b5b", "376b2e13-d643-4407-a09b-2028f7eb9fe3", 533159, 181337));
        orders.push(new Order("31c3b220-0176-4c13-9b8d-2b4c328d3ee6", "45ec0764-92cc-4afa-a06a-fc487ca2de20", 533162, 180827));
        orders.push(new Order("ff4bcc7c-45a2-41d7-94c9-9f399757a58d", "125ca915-6c06-4c41-8613-2f7e7e47df3d", 533162, 180826));
        orders.push(new Order("225f146a-6825-494a-bafe-a4159bab8355", "515929ae-ba32-401a-b844-a0a55d32239f", 533176, 180882));
        orders.push(new Order("f14fcb9b-476a-49dc-803c-a28b33709ba0", "020d2a78-2ba5-4e9d-a500-5cc460d80fe4", 533198, 181340));
        orders.push(new Order("9b839919-57a8-49c4-90b7-a65fd124ea8d", "f33a3072-d0d4-4220-9cc1-6b03a26634ba", 533203, 180971));
        orders.push(new Order("7a29db72-993b-44c2-b976-169ccc33b672", "a4e45e8d-3bbe-4a6f-a463-9cfaf75dd03a", 533200, 180813));
        orders.push(new Order("84e6ab4e-9ea4-421f-8f1a-73ecfdcdc80f", "4d53c674-726d-47c4-bdd0-db7816df6594", 533215, 181306));
        orders.push(new Order("f0913e72-2283-4419-b512-433cb43b8a52", "62ac0aff-ad6f-4f6c-914d-cce4a4efe065", 533241, 181366));
        orders.push(new Order("cd8798df-aac2-4d4f-adbd-1874e17748f2", "f2ea74fe-6666-44ba-9425-786fbe6579c3", 533265, 181206));
        orders.push(new Order("17d687ba-8158-44f8-a4a9-3d29fbef8c70", "8248079c-b9f0-4cf6-97d6-6db5849e9909", 533267, 181003));
        orders.push(new Order("776fe518-a00e-45bc-aa58-39f197f3ef45", "990b5a0b-969e-4adf-861e-9aa81b9d4f4c", 533266, 180784));
        orders.push(new Order("47b4c386-2ab7-4875-93ac-6b9ca5c43ed4", "b4561ed7-2319-4733-9087-7b0e7e8c7b51", 533239, 181372));
        orders.push(new Order("d79d4684-a41f-4010-8344-c61ba9c1e64c", "b4561ed7-2319-4733-9087-7b0e7e8c7b51", 533239, 181372));
        orders.push(new Order("808c507b-4d24-4026-b001-946d3c6f9471", "04a920a7-67e0-4b7a-a7d6-ea772677cddc", 533294, 181157));
        orders.push(new Order("87938a70-6899-4879-8098-ff5d75e9808b", "4b1afbf9-3228-400e-84c5-c7b5c21b6a51", 533295, 180956));
        orders.push(new Order("57f427cc-c8a7-4e59-928f-a7bb1325a076", "e8527a17-7aa2-400d-930b-ab75a84db7e0", 533304, 181256));
        orders.push(new Order("44ebb5b6-280c-44a8-92e3-4643a3990368", "84ef79f1-7e9b-42c4-8c70-3c38f3aaa31f", 533296, 180858));
        orders.push(new Order("28a74728-8f67-40f1-b363-084a2736a7c4", "a4fc1493-2446-4192-a579-699f35593900", 533356, 181071));
        
        this.initializeMap(x, y, radius, orders);
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
