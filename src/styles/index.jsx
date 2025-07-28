import styled from 'styled-components/native';
import { SizeConfig } from '../utils/size';


// Background image with full screen
export const Background = styled.ImageBackground.attrs({
  source: require('../assets/images/img1.jpg'),
  resizeMode: 'cover',
})`
  flex: 1;
`;

// Full screen overlay
export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  align-items: center;
  padding: ${SizeConfig.width * 5}px;
`;

export const LogoCircle = styled.TouchableOpacity`
width: ${SizeConfig.width * 8}px;
height: ${SizeConfig.width * 8}px;
background-color: #FAF0E6CC;
border-radius: ${SizeConfig.width * 50}px;
align-items: center;
justify-content: center;
overflow: hidden;
`

export const FooterLogoContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;    
gap: ${SizeConfig.width * 4}px;
margin-top: ${SizeConfig.width * 5}px;
`

export const DFlexButton = styled.View`
display: flex;
flex-direction: row;
align-items: center;
gap: ${SizeConfig.width * 2}px;`