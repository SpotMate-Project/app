import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const EditProfilePage: React.FC = () => {
  const navigation = useNavigation();

  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("@user_email");
        if (storedEmail) {
          const response = await fetch(
            "http://spotweb.hysu.kr:1030/user/info",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: storedEmail,
              }),
            }
          );
          const data = await response.json();
          if (data.success) {
            setEmail(data.data[0].email);
            setNickname(data.data[0].nickname);
            setProfileImage(data.data[0].imageUrl);
          }
        }
      } catch (error) {
        console.error("유저 정보가 없습니다:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한 필요", "카메라 권한이 필요합니다.");
      }
    };

    requestPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage(selectedImageUri);
    } else {
      console.log("이미지 수정이 취소되었습니다.");
    }
  };

  const saveProfile = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("@user_email");
      if (storedEmail) {
        const response = await fetch(
          "http://spotweb.hysu.kr:1030/user/update",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: storedEmail,
              nickname: nickname,
              imageUrl: profileImage,
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          Alert.alert("성공", "프로필이 업데이트되었습니다.");
          navigation.goBack();
        } else {
          Alert.alert("오류", "프로필 업데이트에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>회원정보 수정</Text>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../../assets/profile.png")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Nickname"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>수정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.verificationButton}
        onPress={() => navigation.navigate("EmailVerification")}
      >
        <Text style={styles.verificationButtonText}>비밀번호 변경</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 80,
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 5,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  input: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#555",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 20,
    width: "80%",
    textAlign: "center",
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#00BCD4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#fff",
  },
  verificationButton: {
    marginTop: 20,
    backgroundColor: "#00BCD4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  verificationButtonText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#fff",
  },
});

export default EditProfilePage;
