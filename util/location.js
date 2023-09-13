// const GOOGLE_API_KEY = 'AIzaSyAVipr1CsTMRSTezo0bbNBte1quTB6ia84'

export const getMapPreview = (lat, lng) => {
    console.log(lat + ' ' + lng)
    // const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap
    // &markers=color:red%7Clabel:S%7C${lat},${lng}
    // &key=${GOOGLE_API_KEY}&signature=YOUR_SIGNATURE`;
    const imagePreviewUrl = `Latitude: ${lat},\nLongitude: ${lng}`;
    return imagePreviewUrl;
}