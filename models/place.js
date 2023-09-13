class Place{
    constructor(title, imageUri, address, location){
        thid.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location; // {lat: 0.114124, lng" 123.231}
        this.id = new Date().toString() + Math.random().toString();
    }
}