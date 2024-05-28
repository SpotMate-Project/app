
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

const Agree: React.FC = () =>  {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Spotmate</Text>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.sectionHeaderText}>회원 가입</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>주소</Text>
        <TextInput style={styles.input} placeholder="서울특별시" />
      </View>
      <View style={styles.horizontalGroup}>
        <View style={styles.smallInputGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput style={styles.smallInput} placeholder="홍길동" />
        </View>
        <View style={styles.smallInputGroup}>
          <Text style={styles.label}>전화번호</Text>
          <TextInput style={styles.smallInput} placeholder="010-1234-5678" />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput style={styles.input} placeholder="PassWord" secureTextEntry={true} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>이메일 인증</Text>
        <TextInput style={styles.input} placeholder="Test@Test.com" keyboardType="email-address" />
      </View>
      <View style={styles.horizontalGroup}>
        <TextInput style={styles.smallInput} placeholder="Number" />
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.buttonText}>인증하기</Text>
        </TouchableOpacity>
      </View>
    
        
      
       
    
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>회원가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontFamily: 'Jua',
    fontSize: 30,
    textAlign: 'center',
    color: '#00BCD4',
    marginVertical: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 1,
    marginLeft: 280,
  },
  logo: {
    width: 100,
    height: 50,
  },
  sectionHeaderText: {
    fontFamily: 'Jua',
    fontSize: 24,
    textAlign: 'left',
    color: '#17CCC6',
    marginVertical: 5,
  },
  inputGroup: {
    marginVertical: 10,
  },
  horizontalGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  smallInputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontFamily: 'Jua',
    fontSize: 18,
    color: '#000',
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#00BCD4',
    padding: 8,
    fontSize: 14,
    fontFamily: 'Jua',
    borderRadius: 5,
  },
  smallInput: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#00BCD4',
    padding: 8,
    fontSize: 14,
    fontFamily: 'Jua',
    borderRadius: 5,
  },
  verifyButton: {
    backgroundColor: '#17CCC6',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'Jua',
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxLabel: {
    fontFamily: 'Jua',
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#17CCC6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    fontFamily: 'Jua',
    fontSize: 20,
    color: '#fff',
  },
});

export default Agree;