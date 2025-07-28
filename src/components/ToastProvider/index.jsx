import React from 'react';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

const MinimalToast = styled.View`
  padding: 8px 16px;  // Reduced vertical padding
  border-radius: 12px; // Increased border radius
  margin-horizontal: 20px;
  align-items: center;
  justify-content: center;
  max-height: 40px;    // Set minimum height
  background-color: ${({ type }) => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'info': 
      default: return '#2196F3';
    }
  }};
`;

const ToastText = styled.Text`
  color: white;
  font-size: 14px;
  text-align: center;  // Ensure text centering
`;

export const ToastProvider = ({ children }) => (
  <>
    {children}
    <Toast />
  </>
);

export const toastConfig = {
  success: ({ text1 }) => (
    <MinimalToast type="success">
      <ToastText>{text1}</ToastText>
    </MinimalToast>
  ),
  error: ({ text1 }) => (
    <MinimalToast type="error">
      <ToastText>{text1}</ToastText>
    </MinimalToast>
  ),
  info: ({ text1 }) => (
    <MinimalToast type="info">
      <ToastText>{text1}</ToastText>
    </MinimalToast>
  )
};