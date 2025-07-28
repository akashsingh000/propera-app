import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, RefreshControl, ScrollView } from 'react-native';
import EmailForm from '../components/EmailForm';
import MainLayout from '../components/Layouts/overlay';
import { EmailBox, LogoWrapper, StyledText } from '../styles/HomeStyled';

const HomeScreen = () => {
    const [showForm, setShowForm] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [shouldRenderForm, setShouldRenderForm] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const handleShowForm = () => {
        setShouldRenderForm(true);
        setShowForm(true);
    };
    const handleHideForm = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            setShowForm(false);
            setShouldRenderForm(false);
        });
    };

    useEffect(() => {
        fadeAnim.setValue(0);
        if (showForm) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }
    }, [showForm, fadeAnim]);

    const onRefresh = () => {
        setRefreshing(true);
        setShowForm(false);
        setShouldRenderForm(false);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    return (
        <MainLayout>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: '100%' }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#000000']}
                        tintColor="#000000"
                        title="Refreshing..."
                        titleColor="#000000"
                    />
                }
            >
                <LogoWrapper>
                    <Image source={require('../assets/images/propera-logo.png')} style={{ width: '100%', height: '100%' }} />
                </LogoWrapper>
                <EmailBox touchable={!showForm} onPress={!showForm ? handleShowForm : undefined}>
                    <Animated.View style={[{ opacity: fadeAnim }, { display: shouldRenderForm ? 'flex' : 'none' }]}>
                        <EmailForm onClose={handleHideForm} />
                    </Animated.View>
                    <StyledText style={{ display: shouldRenderForm ? 'none' : 'flex' }}>
                        Exclusive access! Enter your email and be among the first to experience Propera
                    </StyledText>
                </EmailBox>
            </ScrollView>
        </MainLayout>
    );
};

export default HomeScreen;
