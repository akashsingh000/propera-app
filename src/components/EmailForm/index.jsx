import axios from 'axios';
import React, { useEffect, useReducer, useRef } from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DFlexButton } from '../../styles';
import { ButtonText, ErrorText, FormContainer, Input, SubmitButton, SuccessContainer, SuccessText, Underline } from '../../styles/HomeStyled';
import { config } from '../../utils/config';
import { showToast } from "../ToastProvider/toast";

const initialState = {
  email: '',
  error: '',
  isSubmitting: false,
  isSubmitted: false
};


const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUBMIT':
      return { ...state, isSubmitting: action.payload };
    case 'UPDATE_EMAIL':
      return { ...state, email: action.payload, error: '' };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isSubmitting: false };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...initialState, isSubmitted: true };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const SubmitIcon = <Icon name="arrow-right" size={18} color="#000" />


const EmailForm = ({ onClose }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, error, isSubmitting, isSubmitted } = state;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid email address' });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await axios.post(`${config.BASE_URL}/MobileMail.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000
      });
      if (response.data.trim() === 'success') {
        dispatch({ type: 'SUBMIT_SUCCESS' });
        showToast.success('Thank you for subscribing!');
      } else {
        showToast.error('There was an error sending the email. Please try again.');
        dispatch({ type: "SET_SUBMIT", payload: false });
      }
    } catch (err) {
      console.log({ err });
      dispatch({ type: 'SET_ERROR', payload: 'Submission failed. Please try again.' });
      showToast.error('Submission failed. Please try again.');
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSubmitted, fadeAnim]);

  const handleReset = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      dispatch({ type: 'RESET_FORM' });
    });
  };

  if (isSubmitted) {
    return (
      <Animated.View style={{ opacity: fadeAnim }} >
        <SuccessContainer>
          <SuccessText>You’re on the list! Get ready for something extraordinary.{"\n"}Your exclusive invite will arrive as soon as
            the doors open.</SuccessText>
        </SuccessContainer>
      </Animated.View>
    );
  }

  return (
    <FormContainer>
      <Input
        placeholder="Enter your email"
        placeholderTextColor={'#999'}
        value={email}
        onChangeText={(text) => dispatch({ type: 'UPDATE_EMAIL', payload: text })}
        keyboardType="email-address"
        autoCapitalize="none"
        underlineColorAndroid='transparent'
        borderWidth={0}
      />
      <Underline />
      {error ? <ErrorText>{error}</ErrorText> : null}

      <SubmitButton
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <DFlexButton>
            <ButtonText>Register</ButtonText>
            {SubmitIcon}
          </DFlexButton>
        )}
      </SubmitButton>
    </FormContainer>
  );
};


export default EmailForm;