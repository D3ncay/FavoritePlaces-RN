import { Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { getMapPreview } from "../../util/location";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const LocationPicker = () => {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const navigation = useNavigation();

    const [pickedLocation, setPickedLocation] = useState();

    const verifyPermissions = async () => {

        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions', 'You need to grant location permissions to use this app');
            return false;
        }

        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })

        console.log(location.coords.latitude, location.coords.longitude)

    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picket yet</Text>;

    if (pickedLocation) {
        locationPreview = <Text>There should be a map preview, but I can't show you it because it's paid. So let me show you coordinates.{`\n`}{`\n`}<Text style={styles.locationCoordinatesText}>{getMapPreview(pickedLocation.lat, pickedLocation.lng)}</Text> </Text>
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    locationCoordinatesText:{
        textAlign: 'center',
    }
})
