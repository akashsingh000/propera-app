import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "../utils/fonts";
import { SizeConfig } from "../utils/size";

export const LogoWrapper = styled.View`
  width: ${SizeConfig.width * 50}px;
  height: ${SizeConfig.width * 50}px;
  background-color: #faf0e6;
  border-radius: ${SizeConfig.width * 50}px;
  padding: ${SizeConfig.width * 5}px;
  margin-top: ${SizeConfig.width * 40}px;
`;

export const EmailBox = styled(({ touchable, ...props }) => {
  const Component = touchable ? TouchableOpacity : View;
  return <Component {...props} />;
})`
  width: ${SizeConfig.width * 90}px;
  background-color: #faf0e6cc;
  font-size: 20px;
  line-height: 1.4px;
  border-radius: 8px;
  text-align: center;
  padding: 16px 16px;
  margin-top: ${SizeConfig.width * 8}px;
`;
export const StyledText = styled.Text`
  color: #000;
  font-size: 15px;
  text-align: center;
  line-height: 20px;
  font-family: ${Fonts.regular};
`;
export const ContactContainer = styled.View`
  margin-top: ${SizeConfig.width * 5}px;
  position: absolute;
  bottom: ${SizeConfig.width * 15}px;
  width: 100%;
`;

export const ContactText = styled.Text`
  color: white;
  font-size: 13px;
  text-align: center;
  font-family: ${Fonts.regular};
`;

export const LinkText = styled.Text`
  color: #fff;
`;

export const FormContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled(TextInput)`
  height: 30px;
  padding: 0 5px;
  font-size: 13px;
  color: #000;
  width: 100%;
  font-family: ${Fonts.regular};
  text-decoration: none;
`;

export const Underline = styled.View`
  height: 1px;
  margin-bottom: 5px;
  background-color: #808080;
  width: 100%;
`;

export const ErrorText = styled(Text)`
  color: #ff6b6b;
  margin-bottom: 15px;
  font-size: 10px;
  font-family: ${Fonts.regular};
  align-self: flex-start;
`;

export const SubmitButton = styled(TouchableOpacity)`
  height: 40px;
  background: ${(props) => (props.isPressed ? "#231F20" : "transparent")};
  border: 1px solid #000000;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
`;

export const SuccessContainer = styled(View)`
  align-items: center;
  padding: 12px 16px;
`;

export const SuccessText = styled(Text)`
  font-size: 15px;
  color: #000;
  font-family: ${Fonts.regular};
  line-height: 20px;
  text-align: center;
`;

export const ResetButton = styled(TouchableOpacity)`
  background-color: #231f20;
  padding: 12px 24px;
  border-radius: 8px;
`;

export const ResetButtonText = styled(Text)`
  color: white;
  font-family: ${Fonts.regular};
  font-size: 10px;
`;

export const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 48px;
  background: ${(props) => (props.isPressed ? "#231F20" : "transparent")};
  border: 2px solid #000000;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const ButtonContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  font-family: "Inter-SemiBold"; /* Make sure to load this font */
  font-size: 13px;
  color: ${(props) => (props.isPressed ? "#FFFFFF" : "#231F20")};
  font-family: ${Fonts.semiBold};
  margin-right: 8px;
`;

export const ErrorBox = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
