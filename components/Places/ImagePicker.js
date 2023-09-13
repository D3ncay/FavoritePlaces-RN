import { PermissionStatus, launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = () => {

    const [cameraPermisionInfo, requestPermission] = useCameraPermissions(); //for iOS

    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {  // for iOS
        if (cameraPermisionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (cameraPermisionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions', 'You need to grant camera permissions to use this app');
            return false;
        }

        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri)
    }

    let imagePreview = <Text>No image taken yet</Text>

    imagePreview = pickedImage ? <Image style={styles.image} source={{ uri: pickedImage }} /> : imagePreview

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton onPress={takeImageHandler} icon='camera' >Take Image</OutlinedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImagePicker;
